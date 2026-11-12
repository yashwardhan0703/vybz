import { fetchLiveIndiaTop25 } from './src/utils/ytTop25Fetcher.js';

function getRouteMetadata(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/';

  if (clean === '/top-25' || clean === '/top25') {
    return {
      title: 'Top 25 Trending Indian Songs Today | VybZ Music',
      description: "Stream today's official Daily Top 25 Trending Indian songs across Bollywood, Punjabi, and Pop. 100% ad-free with zero buffer.",
    };
  }

  if (clean === '/vibes' || clean === '/vibe') {
    return {
      title: '10 Curated Indian Mood & Vibe Radio Stations | VybZ Music',
      description: 'Explore 10 nostalgic Indian ambient vibe radio stations: Chai Tapri, Alfaaz & Ehsaas, Hostel Ki Raat, Train Ki Khidki, Deluxe Salon, Monsoon Baarish, Sufi Sukoon, and more on VybZ Music.',
    };
  }

  const vibeMap = {
    'chai-tapri': {
      title: 'Chai Tapri Radio – Garam Chai & Purane Retro Gaane | VybZ Music',
      desc: 'Listen to 25 nostalgic Chai Tapri retro songs on VybZ Music. Kishore Kumar, Rafi, and warm desi acoustic vibes.',
    },
    'chai_tapri': {
      title: 'Chai Tapri Radio – Garam Chai & Purane Retro Gaane | VybZ Music',
      desc: 'Listen to 25 nostalgic Chai Tapri retro songs on VybZ Music. Kishore Kumar, Rafi, and warm desi acoustic vibes.',
    },
    'sufi-sukoon': {
      title: 'Sufi & Sukoon Radio – Roohani Ghazal & Qawwali Hits | VybZ Music',
      desc: 'Stream 25 soul-soothing Sufi ghazals and qawwalis by Nusrat Fateh Ali Khan and Jagjit Singh on VybZ Music.',
    },
    'sufi_ghazal': {
      title: 'Sufi & Sukoon Radio – Roohani Ghazal & Qawwali Hits | VybZ Music',
      desc: 'Stream 25 soul-soothing Sufi ghazals and qawwalis by Nusrat Fateh Ali Khan and Jagjit Singh on VybZ Music.',
    },
    'deluxe-salon': {
      title: 'Deluxe 90s Salon Radio – Haircut, Champi & Retro Bollywood | VybZ Music',
      desc: '25 retro 90s Bollywood classics for cutting, shaving, and champi vibes on Deluxe Salon Radio by VybZ Music.',
    },
    'deluxe_salon': {
      title: 'Deluxe 90s Salon Radio – Haircut, Champi & Retro Bollywood | VybZ Music',
      desc: '25 retro 90s Bollywood classics for cutting, shaving, and champi vibes on Deluxe Salon Radio by VybZ Music.',
    },
    'monsoon-baarish': {
      title: 'Monsoon Baarish Radio – Rain & Romantic Bollywood Hits | VybZ Music',
      desc: 'Stream 25 romantic monsoon and rain Bollywood songs on VybZ Music. 100% ad-free with zero buffer.',
    },
    'monsoon-barish': {
      title: 'Monsoon Baarish Radio – Rain & Romantic Bollywood Hits | VybZ Music',
      desc: 'Stream 25 romantic monsoon and rain Bollywood songs on VybZ Music. 100% ad-free with zero buffer.',
    },
    'highway-dhaba': {
      title: 'Late Night Highway Dhaba Radio – Punjabi & Retro Hits | VybZ Music',
      desc: 'Daler Mehndi, high-energy Punjabi hits, and late-night highway truck radio on VybZ Music.',
    },
    'highway_dhaba': {
      title: 'Late Night Highway Dhaba Radio – Punjabi & Retro Hits | VybZ Music',
      desc: 'Daler Mehndi, high-energy Punjabi hits, and late-night highway truck radio on VybZ Music.',
    },
    'corporate-chill': {
      title: 'Corporate Chill Radio – Lo-Fi Indian Beats for Work & Study | VybZ Music',
      desc: 'Indian lo-fi chill beats and soothing instrumental melodies for coding, study, and focus on VybZ Music.',
    },
    'corporate_chill': {
      title: 'Corporate Chill Radio – Lo-Fi Indian Beats for Work & Study | VybZ Music',
      desc: 'Indian lo-fi chill beats and soothing instrumental melodies for coding, study, and focus on VybZ Music.',
    },
    'bartan-time': {
      title: 'Bartan Time Radio – Jhaadu, Pocha & High Energy Dance Hits | VybZ Music',
      desc: 'Zingaat, London Thumakda, and 25 energetic Bollywood dance hits for daily chores on VybZ Music.',
    },
    'bartan_time': {
      title: 'Bartan Time Radio – Jhaadu, Pocha & High Energy Dance Hits | VybZ Music',
      desc: 'Zingaat, London Thumakda, and 25 energetic Bollywood dance hits for daily chores on VybZ Music.',
    },
    'alfaaz-ehsaas': {
      title: 'Alfaaz & Ehsaas Radio – Poetic Urdu Indie & Acoustic Hits | VybZ Music',
      desc: 'Stream 25 viral Urdu indie and acoustic songs like Jhol, Khasara, and Faasle on VybZ Music. 100% ad-free with zero buffer.',
    },
    'alfaaz_ehsaas': {
      title: 'Alfaaz & Ehsaas Radio – Poetic Urdu Indie & Acoustic Hits | VybZ Music',
      desc: 'Stream 25 viral Urdu indie and acoustic songs like Jhol, Khasara, and Faasle on VybZ Music. 100% ad-free with zero buffer.',
    },
    'hostel-ki-raat': {
      title: 'Hostel Ki Raat Radio – Maggi Jam & College Nostalgia Songs | VybZ Music',
      desc: 'Stream 25 nostalgic college hostel songs, midnight guitar jams, and Lucky Ali classics on VybZ Music.',
    },
    'hostel_ki_raat': {
      title: 'Hostel Ki Raat Radio – Maggi Jam & College Nostalgia Songs | VybZ Music',
      desc: 'Stream 25 nostalgic college hostel songs, midnight guitar jams, and Lucky Ali classics on VybZ Music.',
    },
    'train-ki-khidki': {
      title: 'Train Ki Khidki Radio – Window Seat Safar & Travel Classics | VybZ Music',
      desc: 'Stream 25 nostalgic train journey classics like Chaiyya Chaiyya, Yun Hi Chala Chal, and Kishore Kumar travel hits on VybZ Music.',
    },
    'train_ki_khidki': {
      title: 'Train Ki Khidki Radio – Window Seat Safar & Travel Classics | VybZ Music',
      desc: 'Stream 25 nostalgic train journey classics like Chaiyya Chaiyya, Yun Hi Chala Chal, and Kishore Kumar travel hits on VybZ Music.',
    },
  };

  if (clean.startsWith('/vibes/') || clean.startsWith('/vibe/')) {
    const slug = clean.split('/')[2];
    const v = vibeMap[slug];
    if (v) return { title: v.title, description: v.desc };

    const formatted = slug
      .split(/[-_]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      title: `${formatted} Radio – Indian Ambient Vibe Station | VybZ Music`,
      description: `Stream ${formatted} ambient vibe music on VybZ Music. 100% ad-free with zero buffer.`,
    };
  }

  if (clean === '/artists') {
    return {
      title: '50 Popular Bollywood & Punjabi Artists – Top 20 Hits Each | VybZ Music',
      description: 'Discover 50 legendary Indian artists including Arijit Singh, Pritam, A.R. Rahman, Shreya Ghoshal, Diljit Dosanjh, and more on VybZ Music.',
    };
  }

  if (clean.startsWith('/artist/')) {
    const artId = clean.replace('/artist/', '').trim();
    const artName = artId
      .split(/[-_]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      title: `${artName} – Top 20 Songs & Hits | VybZ Music`,
      description: `Stream top 20 verified hit songs by ${artName} on VybZ Music. 100% ad-free with zero buffer.`,
    };
  }

  if (clean === '/playlists') {
    return {
      title: 'My Playlists – Custom Indian Music Mixes | VybZ Music',
      description: 'Create and organize your favorite Bollywood, Punjabi, and Retro playlists on VybZ Music.',
    };
  }

  if (clean === '/liked') {
    return {
      title: 'Liked Songs – Favorite Indian Tracks | VybZ Music',
      description: 'Your personal collection of liked songs and favorite tracks on VybZ Music.',
    };
  }

  // Any custom or newly added route (e.g. /my-new-vibe, /retro, /example)
  const customSlug = clean.replace(/^\//, '').trim();
  if (customSlug) {
    const v = vibeMap[customSlug];
    if (v) return { title: v.title, description: v.desc };

    const formatted = customSlug
      .split(/[-_]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      title: `${formatted} | VybZ Music`,
      description: `Explore ${formatted} on VybZ Music – Indian Music Player & Ambient Vibe Hub.`,
    };
  }

  return null;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // -1. Live Version Endpoint for zero-lag iOS/Android/PWA cache busting
    if (url.pathname === '/api/version') {
      return new Response(JSON.stringify({ version: '2.6.0-ten-mood-stations', timestamp: Date.now() }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
    }

    // 0. Live YouTube Music India Top 25 Chart Endpoint
    if (url.pathname === '/api/top25') {
      try {
        const chart = await fetchLiveIndiaTop25();
        if (!chart) {
          return new Response(JSON.stringify({ error: 'Unable to fetch live India chart' }), {
            status: 502,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }
        return new Response(JSON.stringify(chart), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=1800',
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
      const response = await env.ASSETS.fetch(request);
      const headers = new Headers(response.headers);

      // Cache hashed static assets (JS chunks, CSS, fonts) for 1 year (instant 0ms repeat load)
      if (url.pathname.startsWith('/assets/')) {
        headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      }

      // SPA Fallback & Dynamic Route SEO Metadata for clean routes
      const isCleanRoute = !url.pathname.includes('.') && !url.pathname.startsWith('/api/');
      if (
        (response.status === 404 || url.pathname === '/') &&
        isCleanRoute &&
        (request.method === 'GET' || request.method === 'HEAD')
      ) {
        const indexReq = new Request(new URL('/', request.url), { method: 'GET' });
        const indexRes = await env.ASSETS.fetch(indexReq);
        let html = await indexRes.text();

        const meta = getRouteMetadata(url.pathname);
        if (meta) {
          html = html
            .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
            .replace(
              /<meta name="description" content=".*?" \/>/,
              `<meta name="description" content="${meta.description}" />`
            )
            .replace(
              /<meta property="og:title" content=".*?" \/>/,
              `<meta property="og:title" content="${meta.title}" />`
            )
            .replace(
              /<meta property="og:description" content=".*?" \/>/,
              `<meta property="og:description" content="${meta.description}" />`
            )
            .replace(
              /<meta property="og:url" content=".*?" \/>/,
              `<meta property="og:url" content="https://vybzmusic.online${url.pathname}" />`
            )
            .replace(
              /<meta name="twitter:title" content=".*?" \/>/,
              `<meta name="twitter:title" content="${meta.title}" />`
            )
            .replace(
              /<meta name="twitter:description" content=".*?" \/>/,
              `<meta name="twitter:description" content="${meta.description}" />`
            )
            .replace(
              /<link rel="canonical" href=".*?" \/>/,
              `<link rel="canonical" href="https://vybzmusic.online${url.pathname === '/' ? '/' : url.pathname}" />`
            );
        }

        const h = new Headers(indexRes.headers);
        h.set('Content-Type', 'text/html; charset=utf-8');
        h.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        h.set('Pragma', 'no-cache');
        h.set('Expires', '0');
        return new Response(request.method === 'HEAD' ? null : html, {
          status: 200,
          headers: h,
        });
      }

      // Root HTML, Service Worker & Manifest: NEVER stale cache (always check fresh live version)
      if (
        url.pathname === '/' ||
        url.pathname.endsWith('.html') ||
        url.pathname.endsWith('sw.js') ||
        url.pathname.endsWith('registerSW.js') ||
        url.pathname.endsWith('.webmanifest')
      ) {
        headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
        headers.set('Pragma', 'no-cache');
        headers.set('Expires', '0');
        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      }

      return response;
    }

    return fetch(request);
  },
};
