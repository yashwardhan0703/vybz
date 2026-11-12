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
 * Strips English translations or explanations in parentheses
 * e.g. "Husn-e-janaan ki taareef mumkin nahin (The beauty of the beloved cannot be described)"
 * -> "Husn-e-janaan ki taareef mumkin nahin"
 * "Afreen afreen, afreen afreen (Wow, wow, wow, wow)"
 * -> "Afreen afreen, afreen afreen"
 */
export function cleanLyricText(text: string): string {
  if (!text) return '';
  return text
    .replace(/\s*\([A-Za-z0-9\s,.'’!?–-]{4,}\)\s*$/g, '')
    .replace(/^\[(music|applause|instrumental)\]/gi, '')
    .trim();
}

/**
 * Parses standard LRC text into LyricLine array with clean, pure text
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

    // Clean text by removing timestamp tags and trailing English translations
    const rawText = trimmed.replace(timeRegex, '').trim();
    const text = cleanLyricText(rawText);
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
    .replace(
      /[([][^\])]*?(official|video|audio|lyrics|lyrical|full song|teaser|trailer|4k|hd|remix|slowed|reverb)[^\])]*?[\])]/gi,
      ''
    )
    .replace(/[-|].*$/, '')
    .trim();
}

/**
 * Fetches lyrics from our backend /api/lyrics endpoint with caching and duration matching
 */
export async function getTrackLyrics(
  trackTitle: string,
  trackArtist?: string,
  duration?: number
): Promise<LyricData | null> {
  if (!trackTitle || !trackTitle.trim()) return null;
  const cleanTrack = cleanQueryString(trackTitle);
  const cleanArtist = cleanQueryString(trackArtist || '');
  const durRounded = duration && duration > 0 ? Math.round(duration) : 0;
  const cacheKey = `${cleanTrack.toLowerCase()}___${cleanArtist.toLowerCase()}___${durRounded}`;

  if (lyricsCache.has(cacheKey)) {
    return lyricsCache.get(cacheKey)!;
  }

  try {
    const url = `/api/lyrics?track=${encodeURIComponent(cleanTrack)}&artist=${encodeURIComponent(
      cleanArtist
    )}&duration=${durRounded}`;
    const res = await fetch(url);
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
