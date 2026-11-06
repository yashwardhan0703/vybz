import { TOP_25_TRENDING_INDIAN } from '../data/trendingSongs';
import { ARTISTS_CATALOG } from '../data/artistsData';
import type { QueueTrack } from '../hooks/useYouTube';

// Words that indicate song vibes
const VIBE_CATEGORIES = {
  romantic: [
    'arijit', 'atif', 'mohith', 'kk', 'shreya', 'jasleen', 'sachet', 'ranjha',
    'kesariya', 'tum hi ho', 'channa', 'jeena', 'love', 'dil', 'pyaar', 'tanha',
    'bheegi', 'khud ko', 'ishq', 'hona', 'tera', 'suroor', 'deewana', 'humsafar'
  ],
  party: [
    'badshah', 'honey singh', 'shubh', 'anirudh', 'what jhumka', 'blue eyes',
    'brown rang', 'cheques', 'baller', 'jugnu', 'dj waley', 'hukum', 'party', 'beat'
  ],
  nostalgia_90s: [
    'udit', 'alka', 'kumar sanu', 'lata', 'mohra', 'ddlj', 'dhadkan', 'pardesi',
    'kuch kuch', 'tip tip', 'chura ke', 'dheere dheere', 'kishore', 'rafi'
  ],
  indie_lofi: [
    'anuv jain', 'prateek kuhad', 'kasoor', 'baarishein', 'husn', 'alag aasmaan',
    'lo-fi', 'lofi', 'acoustic', 'chill', 'sukoon'
  ],
  sufi_soul: [
    'ar rahman', 'rahman', 'kun faya', 'tajdar', 'chaiyya', 'jai ho', 'namo namo',
    'iktara', 'kailash', 'sufi', 'maula'
  ],
};

function detectVibe(title: string, artist: string): keyof typeof VIBE_CATEGORIES {
  const combined = `${title} ${artist}`.toLowerCase();
  for (const [vibe, keywords] of Object.entries(VIBE_CATEGORIES) as [keyof typeof VIBE_CATEGORIES, string[]][]) {
    if (keywords.some((kw) => combined.includes(kw))) {
      return vibe;
    }
  }
  return 'romantic'; // Default popular vibe in Indian music
}

const STOP_WORDS = new Set([
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

// Clean title words to detect duplicates
function extractCoreKeywords(t: string): string[] {
  return t
    .toLowerCase()
    .replace(/\(.*?\)/g, ' ')
    .replace(/\[.*?\]/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

// Detect if candidate is the exact same song upload/cover
export function isDuplicateSong(candidateTitle: string, currentTitle: string): boolean {
  const w1 = extractCoreKeywords(candidateTitle);
  const w2 = extractCoreKeywords(currentTitle);
  if (w1.length === 0 || w2.length === 0) return false;

  const prefix1 = w1.slice(0, 2).join(' ');
  const prefix2 = w2.slice(0, 2).join(' ');
  if (prefix1.length > 4 && prefix1 === prefix2) return true;

  const shared = w1.filter((w) => w2.includes(w));
  if (shared.length >= Math.min(w1.length, w2.length) * 0.5) return true;
  return false;
}

// Curated vibe-matched tracks (offline/fallback safe)
export function getLocalVibeTracks(currentId: string, title: string, artist: string): QueueTrack[] {
  const vibe = detectVibe(title, artist);
  const keywords = VIBE_CATEGORIES[vibe];
  const results: QueueTrack[] = [];

  // Match from Top 25
  TOP_25_TRENDING_INDIAN.forEach((t) => {
    if (t.id === currentId || isDuplicateSong(t.title, title)) return;
    const comb = `${t.title} ${t.singers} ${t.movie}`.toLowerCase();
    if (keywords.some((kw) => comb.includes(kw))) {
      results.push({
        id: t.id,
        title: `${t.title} (${t.movie})`,
        artist: t.singers,
        thumbnail: t.thumbnail,
        duration: t.duration,
      });
    }
  });

  // Match from Popular Artists
  ARTISTS_CATALOG.forEach((a) => {
    const comb = `${a.name} ${a.tagline}`.toLowerCase();
    if (keywords.some((kw) => comb.includes(kw))) {
      a.topTracks.forEach((st) => {
        if (st.id === currentId || isDuplicateSong(st.title, title)) return;
        if (!results.some((r) => r.id === st.id)) {
          results.push({
            id: st.id,
            title: st.title,
            artist: a.name,
            thumbnail: `https://img.youtube.com/vi/${st.id}/mqdefault.jpg`,
            duration: st.duration,
          });
        }
      });
    }
  });

  // Fallback to other top tracks if count is low
  if (results.length < 5) {
    TOP_25_TRENDING_INDIAN.forEach((t) => {
      if (t.id !== currentId && !isDuplicateSong(t.title, title) && !results.some((r) => r.id === t.id)) {
        results.push({
          id: t.id,
          title: `${t.title} (${t.movie})`,
          artist: t.singers,
          thumbnail: t.thumbnail,
          duration: t.duration,
        });
      }
    });
  }

  return results.slice(0, 15);
}

// Fetch YouTube Up Next related songs with duplicate song filter
export async function fetchRelatedVibeQueue(
  videoId: string,
  title: string,
  artist: string
): Promise<QueueTrack[]> {
  try {
    const res = await fetch(
      `/api/related?v=${encodeURIComponent(videoId)}&title=${encodeURIComponent(title)}`
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.results) && data.results.length > 0) {
        const queue: QueueTrack[] = [];
        for (const item of data.results) {
          if (item.id === videoId || isDuplicateSong(item.title, title)) continue;
          queue.push({
            id: item.id,
            title: item.title,
            artist: item.artist,
            thumbnail: item.thumbnail || `https://img.youtube.com/vi/${item.id}/mqdefault.jpg`,
          });
        }
        if (queue.length > 0) {
          return queue;
        }
      }
    }
  } catch {
    // API endpoint unavailable (e.g. offline) -> fallback below
  }

  // Fallback to local smart vibe classification
  return getLocalVibeTracks(videoId, title, artist);
}
