import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
import { fetchLiveIndiaTop25 } from './src/utils/ytTop25Fetcher.js';

function youtubeSearchPlugin(): Plugin {
  return {
    name: 'youtube-search-api',
    configureServer(server) {
      server.middlewares.use('/api/top25', async (_req, res) => {
        try {
          const chart = await fetchLiveIndiaTop25();
          if (!chart) {
            res.statusCode = 502;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Unable to fetch live India chart' }));
            return;
          }
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(chart));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: String(err) }));
        }
      });

      server.middlewares.use('/api/search', async (req, res) => {
        try {
          const url = new URL(req.url || '', 'http://localhost');
          const query = url.searchParams.get('q');
          if (!query) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Missing query parameter q' }));
            return;
          }

          const videos: Array<{
            id: string;
            title: string;
            artist: string;
            duration: string;
            thumbnail: string;
          }> = [];

          // 1. Try HTML scraping
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
            // Proceed to InnerTube
          }

          // 2. High-reliability fallback: InnerTube API
          if (videos.length === 0) {
            try {
              const itRes = await fetch('https://www.youtube.com/youtubei/v1/search', {
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

              if (itRes.ok) {
                const itData = (await itRes.json()) as any;
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
              // Both failed
            }
          }

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ results: videos.slice(0, 20) }));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: String(err) }));
        }
      });

      server.middlewares.use('/api/related', async (req, res) => {
        try {
          const url = new URL(req.url || '', 'http://localhost');
          const videoId = url.searchParams.get('v');
          const currentTitle = (url.searchParams.get('title') || '').toLowerCase();
          if (!videoId) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Missing videoId parameter v' }));
            return;
          }

          // Use YouTube InnerTube next API (100% reliable watch-next recommendations)
          const ytRes = await fetch('https://www.youtube.com/youtubei/v1/next', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept-Language': 'en-US,en;q=0.9',
            },
            body: JSON.stringify({
              context: {
                client: {
                  clientName: 'WEB',
                  clientVersion: '2.20240101.01.00',
                },
              },
              videoId,
            }),
          });

          const data = (await ytRes.json()) as any;
          const sec =
            data.contents?.twoColumnWatchNextResults?.secondaryResults?.secondaryResults?.results ||
            [];

          const stopWords = new Set([
            'video',
            'official',
            'lyrical',
            'lyrics',
            'audio',
            'song',
            'songs',
            'full',
            'hd',
            'remix',
            'slowed',
            'reverb',
            'feat',
            'music',
            'mms',
            'track',
            'from',
            'version',
            'lofi',
            'original',
            'soundtrack',
            'ost',
            'tseries',
            'zeemusic',
            'sonymusic',
            'status',
            'mashup',
            'edit',
            '4k',
            '8k',
            'film',
            'movie',
          ]);

          const getCoreWords = (str: string) =>
            str
              .toLowerCase()
              .replace(/\(.*?\)/g, ' ')
              .replace(/\[.*?\]/g, ' ')
              .replace(/[^a-z0-9\s]/g, ' ')
              .split(/\s+/)
              .filter((w) => w.length > 2 && !stopWords.has(w));

          const isDuplicate = (cand: string, curr: string) => {
            const w1 = getCoreWords(cand);
            const w2 = getCoreWords(curr);
            if (w1.length === 0 || w2.length === 0) return false;

            const prefix1 = w1.slice(0, 2).join(' ');
            const prefix2 = w2.slice(0, 2).join(' ');
            if (prefix1.length > 4 && prefix1 === prefix2) return true;

            const shared = w1.filter((w) => w2.includes(w));
            if (shared.length >= Math.min(w1.length, w2.length) * 0.5) return true;
            return false;
          };

          const relatedVideos: Array<{
            id: string;
            title: string;
            artist: string;
            thumbnail: string;
          }> = [];

          for (const item of sec) {
            let id = '';
            let title = '';
            let artist = 'YouTube Music';

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
            // Filter out long jukebox compilations and non-music videos
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

            // Filter out duplicates of the current song
            if (currentTitle && isDuplicate(title, currentTitle)) {
              continue;
            }

            // Also avoid duplicate titles within the new related list itself
            if (relatedVideos.some((rv) => isDuplicate(rv.title, title))) {
              continue;
            }

            relatedVideos.push({
              id,
              title,
              artist,
              thumbnail: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
            });
          }

          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ results: relatedVideos.slice(0, 20) }));
        } catch (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: String(err) }));
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    youtubeSearchPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'VybZ – Indian Music Player',
        short_name: 'VybZ',
        description:
          'Modern Indian music player with Top 25 Trending Indian songs, real-time lyrics search, popular artists, and ambient vibe mode.',
        theme_color: '#070a10',
        background_color: '#070a10',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        icons: [
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/zustand')
          ) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (
            id.includes('src/data/artistsData') ||
            id.includes('src/data/worlds') ||
            id.includes('src/data/trendingSongs')
          ) {
            return 'catalog-data';
          }
        },
      },
    },
  },
});
