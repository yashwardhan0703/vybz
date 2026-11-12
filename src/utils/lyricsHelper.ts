export interface LyricLine {
  time: number; // in seconds
  text: string;
}

export interface LyricData {
  synced: LyricLine[];
  plain?: string;
  hasSynced: boolean;
}

const lyricsCache = new Map<string, LyricData>();

/**
 * Parses standard LRC text (e.g. "[01:23.45] Some lyric text") into LyricLine array
 */
export function parseLrc(lrcText: string): LyricLine[] {
  if (!lrcText || typeof lrcText !== 'string') return [];
  const lines = lrcText.split('\n');
  const result: LyricLine[] = [];
  const timeRegex = /\[(\d{1,2}):(\d{2})(?:\.(\d{1,3}))?\]/g;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    // Skip metadata tags like [ti:Title], [ar:Artist], [by:...], etc.
    if (/^\[(ti|ar|al|by|length|offset|re|ve):/i.test(trimmed)) continue;

    const matches = Array.from(trimmed.matchAll(timeRegex));
    if (matches.length === 0) continue;

    // Clean text by removing all timestamp tags
    const text = trimmed.replace(timeRegex, '').trim();
    // Don't include empty musical gaps if they have no text (or mark as instrumental break)
    if (!text) continue;

    for (const match of matches) {
      const min = parseInt(match[1], 10);
      const sec = parseInt(match[2], 10);
      const msStr = match[3] || '0';
      const ms = parseFloat(`0.${msStr}`);
      const totalSec = min * 60 + sec + ms;
      result.push({ time: totalSec, text });
    }
  }

  // Sort chronologically
  result.sort((a, b) => a.time - b.time);
  return result;
}

/**
 * Clean artist and track title for higher match rate
 */
function cleanQueryString(str: string): string {
  return str
    .replace(/[([][^\])]*?(official|video|audio|lyrics|lyrical|full song|teaser|trailer|4k|hd|remix|slowed|reverb)[^\])]*?[\])]/gi, '')
    .replace(/[-|].*$/, '')
    .trim();
}

/**
 * Fetches lyrics from our backend /api/lyrics endpoint with caching
 */
export async function getTrackLyrics(trackTitle: string, trackArtist?: string): Promise<LyricData | null> {
  if (!trackTitle || !trackTitle.trim()) return null;
  const cleanTrack = cleanQueryString(trackTitle);
  const cleanArtist = cleanQueryString(trackArtist || '');
  const cacheKey = `${cleanTrack.toLowerCase()}___${cleanArtist.toLowerCase()}`;

  if (lyricsCache.has(cacheKey)) {
    return lyricsCache.get(cacheKey)!;
  }

  try {
    const res = await fetch(
      `/api/lyrics?track=${encodeURIComponent(cleanTrack)}&artist=${encodeURIComponent(cleanArtist)}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!data) return null;

    let synced: LyricLine[] = [];
    if (data.syncedLyrics) {
      synced = parseLrc(data.syncedLyrics);
    }

    const lyricData: LyricData = {
      synced,
      plain: data.plainLyrics || undefined,
      hasSynced: synced.length > 0,
    };

    lyricsCache.set(cacheKey, lyricData);
    return lyricData;
  } catch {
    return null;
  }
}

