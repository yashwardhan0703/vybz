import { useState, useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { usePlayerStore } from '../store/playerStore';
import { getTrackLyrics, type LyricData } from '../utils/lyricsHelper';

export default function KineticLyrics() {
  const { trackTitle, trackArtist, currentTime, isPlaying, duration } = usePlayerStore(
    useShallow((s) => ({
      trackTitle: s.trackTitle,
      trackArtist: s.trackArtist,
      currentTime: s.currentTime,
      isPlaying: s.isPlaying,
      duration: s.duration,
    }))
  );

  const [lyricData, setLyricData] = useState<LyricData | null>(null);

  // Automatically fetch lyrics whenever song title, artist, or duration changes
  useEffect(() => {
    if (!trackTitle || !trackTitle.trim()) {
      setLyricData(null);
      return;
    }

    let isCurrent = true;

    getTrackLyrics(trackTitle, trackArtist, duration)
      .then((data) => {
        if (!isCurrent) return;
        setLyricData(data);
      })
      .catch(() => {
        if (!isCurrent) return;
        setLyricData(null);
      });

    return () => {
      isCurrent = false;
    };
  }, [trackTitle, trackArtist, duration]);

  const syncedLines = lyricData?.synced || [];
  const hasSyncedLyrics = syncedLines.length > 0;

  // Active line index matched to current audio playback time
  const activeIndex = useMemo(() => {
    if (!hasSyncedLyrics) return -1;
    let found = -1;
    for (let i = 0; i < syncedLines.length; i++) {
      if (currentTime >= syncedLines[i].time) {
        found = i;
      } else {
        break;
      }
    }
    return found;
  }, [hasSyncedLyrics, syncedLines, currentTime]);

  // Window of lines to show (Instagram style: 1 previous, 1 active, 2 upcoming)
  const visibleLines = useMemo(() => {
    if (!hasSyncedLyrics) return [];

    if (activeIndex === -1) {
      // Intro state before first line sung
      return syncedLines.slice(0, 3).map((l, i) => ({
        ...l,
        status: i === 0 ? ('intro' as const) : ('upcoming' as const),
      }));
    }

    const start = Math.max(0, activeIndex - 1);
    const end = Math.min(syncedLines.length, activeIndex + 3);
    const slice = syncedLines.slice(start, end);

    return slice.map((line) => {
      let status: 'prev' | 'active' | 'next' | 'far-next' = 'active';
      const actualIdx = syncedLines.indexOf(line);
      if (actualIdx < activeIndex) status = 'prev';
      else if (actualIdx === activeIndex) status = 'active';
      else if (actualIdx === activeIndex + 1) status = 'next';
      else status = 'far-next';
      return { ...line, status };
    });
  }, [hasSyncedLyrics, syncedLines, activeIndex]);

  // If no lyrics are found for this song, keep the UI 100% clean (return null)
  if (!hasSyncedLyrics) {
    return null;
  }

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center mt-3 sm:mt-4 px-3 pointer-events-none">
      <div className="w-full flex flex-col items-center text-center space-y-1.5 sm:space-y-2 min-h-[90px] sm:min-h-[110px] justify-center transition-all duration-500 ease-out">
        {activeIndex === -1 ? (
          // Soft intro note when music starts before vocals
          <div className="flex flex-col items-center justify-center space-y-1.5 py-2 animate-pulse">
            <span className="text-[11px] sm:text-xs font-deva text-white/50 tracking-wider">
              {isPlaying ? '🎵 धुन बज रही है... (Intro)' : 'Play दबाकर धुन शुरू करें'}
            </span>
            <p className="text-xs sm:text-sm text-white/30 italic font-deva truncate max-w-sm">
              &ldquo;{syncedLines[0]?.text}&rdquo;
            </p>
          </div>
        ) : (
          visibleLines.map((line) => {
            const isActive = line.status === 'active';
            const isPrev = line.status === 'prev';
            const isNext = line.status === 'next';

            return (
              <div
                key={`${line.time}-${line.text}`}
                className={`w-full transition-all duration-500 ease-out select-none px-2 ${
                  isActive
                    ? 'scale-105 opacity-100 font-semibold z-10 py-0.5'
                    : isPrev
                      ? 'scale-95 opacity-30 font-normal'
                      : isNext
                        ? 'scale-98 opacity-50 font-normal'
                        : 'scale-90 opacity-20 font-light'
                }`}
              >
                <p
                  translate="no"
                  className={`notranslate leading-snug tracking-wide transition-all ${
                    isActive
                      ? 'font-deva text-sm sm:text-base md:text-lg text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]'
                      : 'font-deva text-xs sm:text-sm text-white/60 drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]'
                  }`}
                >
                  {line.text}
                </p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
