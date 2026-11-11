const INDIA_CHART_PLAYLISTS = [
  'VLPL4fGSI1pDJn40WjZ6utkIuj2rNg-7iGsq', // Top 100 Music Videos India (YouTube Music Charts)
  'VLPL4fGSI1pDJn5oibdgJt8Hy0-dr2B7kSs2', // Daily Top Music Videos - India fallback
];

function extractMovieAndTitle(rawTitle) {
  let title = rawTitle.trim();
  let movie = 'YouTube India Chart';

  const fromMatch = title.match(/\s*[[(]From\s+["'“]?([^"”)\]]+)["'”]?[\])]\s*/i);
  if (fromMatch) {
    movie = fromMatch[1].trim();
    title = title.replace(fromMatch[0], ' ').replace(/\s{2,}/g, ' ').trim();
  }

  return { title, movie };
}

function assignRankTag(rank) {
  if (rank === 1) return '🔥 #1 YouTube India';
  if (rank <= 5) return '⚡ Top 5 India';
  if (rank <= 10) return '📈 Top 10 Trending';
  return '🎵 Trending India';
}

/**
 * Fetches live Top 25 Indian songs from YouTube Music's official India charts.
 */
export async function fetchLiveIndiaTop25() {
  for (const browseId of INDIA_CHART_PLAYLISTS) {
    try {
      const res = await fetch('https://music.youtube.com/youtubei/v1/browse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          'Accept-Language': 'en-IN,en;q=0.9',
        },
        body: JSON.stringify({
          context: {
            client: {
              clientName: 'WEB_REMIX',
              clientVersion: '1.20241101.01.00',
              hl: 'en',
              gl: 'IN',
            },
          },
          browseId,
        }),
      });

      if (!res.ok) continue;
      const data = await res.json();

      const twoCol =
        data?.contents?.twoColumnBrowseResultsRenderer?.secondaryContents?.sectionListRenderer
          ?.contents?.[0]?.musicPlaylistShelfRenderer?.contents || [];
      const oneCol =
        data?.contents?.singleColumnBrowseResultsRenderer?.tabs?.[0]?.tabRenderer?.content
          ?.sectionListRenderer?.contents?.[0]?.musicPlaylistShelfRenderer?.contents || [];
      const items = twoCol.length ? twoCol : oneCol;

      const results = [];
      const seenTitles = new Set();

      for (const item of items) {
        if (results.length >= 25) break;
        const r = item?.musicResponsiveListItemRenderer;
        if (!r) continue;

        const id = r.playlistItemData?.videoId;
        const cols = (r.flexColumns || []).map((c) =>
          (c?.musicResponsiveListItemFlexColumnRenderer?.text?.runs || [])
            .map((t) => t.text)
            .join('')
        );
        const fixed = (r.fixedColumns || []).map((c) =>
          (c?.musicResponsiveListItemFixedColumnRenderer?.text?.runs || [])
            .map((t) => t.text)
            .join('')
        );

        const rawTitle = cols[0] || '';
        const singers = cols[1] || 'YouTube Music India';
        const duration = fixed[0] || '3:30';

        if (!id || id.length !== 11 || !rawTitle) continue;

        const lower = rawTitle.toLowerCase();
        if (
          lower.includes('glimpse') ||
          lower.includes('teaser') ||
          lower.includes('trailer') ||
          lower.includes('promo') ||
          lower.includes('8k video') ||
          lower.includes('jukebox')
        ) {
          continue;
        }

        const { title, movie } = extractMovieAndTitle(rawTitle);
        const norm = title.toLowerCase().replace(/\s*\(.*?\)\s*/g, '').trim();
        if (!norm || seenTitles.has(norm)) continue;
        seenTitles.add(norm);

        const rank = results.length + 1;
        results.push({
          rank,
          id,
          title,
          movie,
          singers,
          duration,
          tag: assignRankTag(rank),
          thumbnail: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
        });
      }

      if (results.length >= 10) {
        return {
          results,
          source: 'YouTube Music India Charts',
          updatedAt: Date.now(),
        };
      }
    } catch {
      // Try next chart playlist
    }
  }

  return null;
}
