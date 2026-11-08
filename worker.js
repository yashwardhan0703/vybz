export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // 1. YouTube Search API Endpoint
    if (url.pathname === '/api/search') {
      const query = url.searchParams.get('q');
      if (!query) {
        return new Response(JSON.stringify({ error: 'Missing query parameter q' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      try {
        const videos = [];

        // 1. First attempt: Direct YouTube HTML Search
        try {
          const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
          const ytRes = await fetch(ytUrl, {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept-Language': 'en-US,en;q=0.9',
            },
          });

          const html = await ytRes.text();
          const match =
            html.match(/var ytInitialData = ({.*?});<\/script>/) ||
            html.match(/ytInitialData\s*=\s*({.+?});/);

          if (match) {
            const json = JSON.parse(match[1]);
            const contents =
              json.contents?.twoColumnSearchResultsRenderer?.primaryContents
                ?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer
                ?.contents || [];

            for (const item of contents) {
              const vr = item.videoRenderer;
              if (vr && vr.videoId) {
                const title = vr.title?.runs?.[0]?.text || '';
                const artist = vr.ownerText?.runs?.[0]?.text || 'YouTube';
                const duration = vr.lengthText?.simpleText || '';
                const thumbnail =
                  vr.thumbnail?.thumbnails?.slice(-1)[0]?.url ||
                  `https://img.youtube.com/vi/${vr.videoId}/mqdefault.jpg`;

                videos.push({
                  id: vr.videoId,
                  title,
                  artist,
                  duration,
                  thumbnail,
                });
              }
            }
          }
        } catch {
          // HTML scrape failed or challenged, proceed to InnerTube fallback
        }

        // 2. High-reliability fallback: YouTube InnerTube API (Never blocked on Cloudflare Edge)
        if (videos.length === 0) {
          try {
            const innerTubeRes = await fetch('https://www.youtube.com/youtubei/v1/search', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'User-Agent':
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              },
              body: JSON.stringify({
                context: {
                  client: {
                    clientName: 'WEB',
                    clientVersion: '2.20240101.01.00',
                    hl: 'en',
                    gl: 'IN',
                  },
                },
                query,
              }),
            });

            if (innerTubeRes.ok) {
              const itData = await innerTubeRes.json();
              const itContents =
                itData.contents?.twoColumnSearchResultsRenderer?.primaryContents
                  ?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer
                  ?.contents || [];

              for (const item of itContents) {
                const vr = item.videoRenderer;
                if (vr && vr.videoId) {
                  const title = vr.title?.runs?.[0]?.text || '';
                  const artist = vr.ownerText?.runs?.[0]?.text || 'YouTube';
                  const duration = vr.lengthText?.simpleText || '';
                  const thumbnail =
                    vr.thumbnail?.thumbnails?.slice(-1)[0]?.url ||
                    `https://img.youtube.com/vi/${vr.videoId}/mqdefault.jpg`;

                  videos.push({
                    id: vr.videoId,
                    title,
                    artist,
                    duration,
                    thumbnail,
                  });
                }
              }
            }
          } catch {
            // Both methods failed
          }
        }

        return new Response(JSON.stringify({ results: videos.slice(0, 20) }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: String(err) }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // 2. YouTube Watch-Next / Related Video API Endpoint
    if (url.pathname === '/api/related') {
      const videoId = url.searchParams.get('v');
      const currentTitle = (url.searchParams.get('title') || '').toLowerCase();
      if (!videoId) {
        return new Response(JSON.stringify({ error: 'Missing videoId' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      try {
        const ytRes = await fetch('https://www.youtube.com/youtubei/v1/next', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
          body: JSON.stringify({
            context: {
              client: {
                clientName: 'WEB',
                clientVersion: '2.20240101.01.00',
                hl: 'en',
                gl: 'IN',
              },
            },
            videoId,
          }),
        });

        const nextData = await ytRes.json();
        const relatedVideos = [];

        function cleanTitle(t) {
          return t
            .toLowerCase()
            .replace(/official\s*(video|audio|music\s*video|lyric\s*video|hd)/gi, '')
            .replace(/full\s*(video|song|audio)/gi, '')
            .replace(/[[({].*?[\])}]/g, '')
            .replace(/[^a-z0-9]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        }

        const normalizedCurrentTitle = cleanTitle(currentTitle);

        function isDuplicate(candTitle, curTitleNorm) {
          if (!curTitleNorm) return false;
          const candNorm = cleanTitle(candTitle);
          if (candNorm === curTitleNorm) return true;
          if (candNorm.includes(curTitleNorm) || curTitleNorm.includes(candNorm)) return true;
          return false;
        }

        const sections =
          nextData?.contents?.twoColumnWatchNextResults?.secondaryResults?.secondaryResults
            ?.results || [];

        for (const item of sections) {
          let id = '';
          let title = '';
          let artist = 'YouTube Music';

          // Support both modern lockupViewModel and legacy compactVideoRenderer
          if (item.lockupViewModel) {
            const vm = item.lockupViewModel;
            id = vm.contentId || '';
            title = vm.metadata?.lockupMetadataViewModel?.title?.content || '';
            artist =
              vm.metadata?.lockupMetadataViewModel?.metadata?.contentMetadataViewModel
                ?.metadataRows?.[0]?.metadataParts?.[0]?.text?.content || 'YouTube Music';
          } else if (item.compactVideoRenderer) {
            const cvr = item.compactVideoRenderer;
            id = cvr.videoId || '';
            title = cvr.title?.simpleText || cvr.title?.runs?.[0]?.text || '';
            artist = cvr.shortBylineText?.runs?.[0]?.text || 'YouTube Music';
          }

          if (!id || id === videoId || id.length !== 11) continue;
          if (!title) continue;

          const lowerTitle = title.toLowerCase();
          if (
            lowerTitle.includes('jukebox') ||
            lowerTitle.includes('all songs') ||
            lowerTitle.includes('non stop') ||
            lowerTitle.includes('episode') ||
            lowerTitle.includes('podcast') ||
            lowerTitle.includes('trailer') ||
            lowerTitle.includes('teaser') ||
            lowerTitle.includes('interview') ||
            lowerTitle.includes('full movie') ||
            lowerTitle.includes('reaction')
          ) {
            continue;
          }

          if (isDuplicate(title, normalizedCurrentTitle)) continue;
          if (relatedVideos.some((rv) => isDuplicate(rv.title, title))) continue;

          relatedVideos.push({
            id,
            title,
            artist,
            thumbnail: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
          });
        }

        // Search fallback if /next recommendations returned too few results
        if (relatedVideos.length < 5 && currentTitle) {
          try {
            const searchFallbackRes = await fetch('https://www.youtube.com/youtubei/v1/search', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'User-Agent':
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              },
              body: JSON.stringify({
                context: {
                  client: {
                    clientName: 'WEB',
                    clientVersion: '2.20240101.01.00',
                    hl: 'en',
                    gl: 'IN',
                  },
                },
                query: `${currentTitle} songs`,
              }),
            });

            if (searchFallbackRes.ok) {
              const itData = await searchFallbackRes.json();
              const itContents =
                itData.contents?.twoColumnSearchResultsRenderer?.primaryContents
                  ?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer
                  ?.contents || [];

              for (const item of itContents) {
                const vr = item.videoRenderer;
                if (vr && vr.videoId && vr.videoId !== videoId) {
                  const t = vr.title?.runs?.[0]?.text || '';
                  if (!t || isDuplicate(t, normalizedCurrentTitle)) continue;
                  if (relatedVideos.some((rv) => isDuplicate(rv.title, t))) continue;

                  relatedVideos.push({
                    id: vr.videoId,
                    title: t,
                    artist: vr.ownerText?.runs?.[0]?.text || 'YouTube Music',
                    thumbnail:
                      vr.thumbnail?.thumbnails?.slice(-1)[0]?.url ||
                      `https://img.youtube.com/vi/${vr.videoId}/mqdefault.jpg`,
                  });
                }
              }
            }
          } catch {}
        }

        return new Response(JSON.stringify({ results: relatedVideos.slice(0, 20) }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: String(err) }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // 3. Static Assets serving via Cloudflare Assets
    if (env && env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      return env.ASSETS.fetch(request);
    }

    return fetch(request);
  },
};
