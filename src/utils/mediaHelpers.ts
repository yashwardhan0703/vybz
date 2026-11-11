import type React from 'react';

/** Offline-safe inline SVG fallback artwork that never triggers network retries. */
export const SAFE_ARTWORK_FALLBACK =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Crect width='120' height='120' fill='%23111827'/%3E%3Ccircle cx='60' cy='46' r='22' fill='%23f59e0b' opacity='0.85'/%3E%3Cpath d='M24 106 A36 36 0 0 1 96 106 Z' fill='%23f59e0b' opacity='0.55'/%3E%3C/svg%3E";

/** Safe image error handler preventing infinite fallback loops. */
export function handleArtworkError(e: React.SyntheticEvent<HTMLImageElement>) {
  const el = e.currentTarget;
  el.onerror = null;
  el.src = SAFE_ARTWORK_FALLBACK;
}

/** Formats seconds into m:ss or h:mm:ss display string. */
export function formatTime(sec: number): string {
  if (!isFinite(sec) || sec <= 0) return '0:00';
  const total = Math.floor(sec);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = (total % 60).toString().padStart(2, '0');
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s}`;
  }
  return `${m}:${s}`;
}

/** Strips noisy YouTube suffixes like [Official Video] or label tails. */
export function cleanSongTitle(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(
      /[([][^\])]*?(official|video|audio|lyrics|lyrical|full song|teaser|trailer|4k|hd|remix|slowed|reverb)[^\])]*?[\])]/gi,
      ''
    )
    .replace(
      /\s*\|\s*(t-series|zee music company|sony music india|tips official|yrf|speed records|saregama|white hill).*$/gi,
      ''
    )
    .replace(/\s*\|\s*$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

