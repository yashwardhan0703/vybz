import { useState, useEffect, useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Sparkles, Music2, Quote } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { getTrackLyrics, type LyricData } from '../utils/lyricsHelper';

interface KineticLyricsProps {
  onNextQuote?: () => void;
  activeQuote: { title: string; sub: string };
  subQuote: string;
}

export default function KineticLyrics({
  onNextQuote,
  activeQuote,
  subQuote,
}: KineticLyricsProps) {
  const { trackTitle, trackArtist, currentTime, isPlaying } = usePlayerStore(
    useShallow((s) => ({
      trackTitle: s.trackTitle,
      trackArtist: s.trackArtist,
      currentTime: s.currentTime,
      isPlaying: s.isPlaying,
    }))
  );

  const [lyricData, setLyricData] = useState<LyricData | null>(null);
  const [isLoadingLyrics, setIsLoadingLyrics] = useState(false);
  // Default to true (Lyrics Mode). User can toggle to Shayari mode anytime.
  const [preferLyrics, setPreferLyrics] = useState(true);

  // Fetch lyrics whenever song title or artist changes
  useEffect(() => {
    if (!trackTitle || !trackTitle.trim()) {
      setLyricData(null);
      return;
    }

    let isCurrent = true;
    setIsLoadingLyrics(true);

    getTrackLyrics(trackTitle, trackArtist)
      .then((data) => {
        if (!isCurrent) return;
        setLyricData(data);
        setIsLoadingLyrics(false);
      })
      .catch(() => {
        if (!isCurrent) return;
        setLyricData(null);
        setIsLoadingLyrics(false);
      });

    return () => {
      isCurrent = false;
    };
  }, [trackTitle, trackArtist]);

  const syncedLines = lyricData?.synced || [];
  const hasSyncedLyrics = syncedLines.length > 0;

  // Active line index based on current playback time
  const activeIndex = useMemo(() => {
    if (!hasSyncedLyrics) return -1;
    // Find the latest line whose time <= currentTime
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

  // Window of lines to show (Instagram Stories style: 1 previous, 1 active, 2 upcoming)
  const visibleLines = useMemo(() => {
    if (!hasSyncedLyrics) return [];
    if (activeIndex === -1) {
      // Intro state: show first 3 lines dimmed
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

  // If user explicitly chose Shayari mode OR lyrics are not available
  const showShayari = !preferLyrics || (!isLoadingLyrics && !hasSyncedLyrics);

  return (
    <div className="relative w-full max-w-xl mx-auto flex flex-col items-center justify-center mt-4 sm:mt-6 px-3">
      {/* Mode Switcher Pill */}
      {hasSyncedLyrics && (
        <div className="mb-3 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setPreferLyrics((prev) => !prev)}
            aria-label="Toggle Lyrics or Shayari mode"
            className="group flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[0.68rem] sm:text-xs font-mono font-medium text-white/70 backdrop-blur-md hover:border-amber-400/40 hover:text-white transition-all active:scale-95 shadow-md"
          >
            {preferLyrics ? (
              <>
                <Sparkles size={11} className="text-amber-400 animate-spin" />
                <span className="text-amber-300 font-semibold">Instagram Lyrics Mode</span>
                <span className="text-white/40 ml-1">| Tap for Shayari</span>
              </>
            ) : (
              <>
                <Quote size={11} className="text-amber-400" />
                <span className="text-white/85">Shayari Mode</span>
                <span className="text-amber-300 ml-1 font-semibold">| Tap for Lyrics 🎙️</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* 1. DYNAMIC INSTAGRAM-STYLE KINETIC LYRICS VIEW */}
      {!showShayari && hasSyncedLyrics ? (
        <div className="w-full flex flex-col items-center text-center space-y-2 sm:space-y-3 min-h-[140px] sm:min-h-[160px] justify-center transition-all duration-500 ease-out">
          {activeIndex === -1 ? (
            <div className="flex flex-col items-center justify-center space-y-2 py-4 animate-pulse">
              <div className="flex items-center gap-2 rounded-full border border-amber-400/30 bg-black/50 px-4 py-1.5 backdrop-blur-md">
                <Music2 size={15} className="text-amber-400 animate-bounce" />
                <span className="text-xs sm:text-sm font-medium text-amber-300 tracking-wide font-deva">
                  {isPlaying ? 'धुन बज रही है... (Intro Melody)' : 'Play दबाकर धुन शुरू करें'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/40 italic font-deva truncate max-w-sm">
                Next: &ldquo;{syncedLines[0]?.text}&rdquo;
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
                      ? 'scale-105 sm:scale-110 opacity-100 font-extrabold z-10 py-1'
                      : isPrev
                        ? 'scale-95 opacity-35 font-medium'
                        : isNext
                          ? 'scale-98 opacity-55 font-medium'
                          : 'scale-90 opacity-25 font-normal'
                  }`}
                >
                  <p
                    translate="no"
                    className={`notranslate leading-snug tracking-wide transition-all ${
                      isActive
                        ? 'font-deva text-base sm:text-xl lg:text-2xl text-white drop-shadow-[0_4px_24px_rgba(251,191,36,0.85)] filter'
                        : 'font-deva text-xs sm:text-sm md:text-base text-white/80'
                    }`}
                    style={
                      isActive
                        ? {
                            textShadow:
                              '0 0 20px rgba(251, 191, 36, 0.75), 0 2px 10px rgba(0, 0, 0, 0.95)',
                          }
                        : undefined
                    }
                  >
                    {line.text}
                  </p>
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* 2. AESTHETIC SHAYARI / DIALOGUE QUOTES FALLBACK */
        <div className="flex flex-col items-center text-center animate-fade-in w-full">
          <button
            type="button"
            onClick={onNextQuote}
            aria-label="Click for next dialogue"
            className="group flex items-center gap-2.5 rounded-full border border-white/15 bg-black/55 py-2 pl-2.5 pr-5 shadow-[0_10px_30px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all active:scale-95 hover:border-amber-400/40 hover:bg-black/75 max-w-sm sm:max-w-md"
            title="Click to change dialogue quote"
          >
            <span className="grid size-7 sm:size-8 place-items-center rounded-full bg-amber-400/20 font-serif text-sm sm:text-base font-bold leading-none text-amber-300 shadow-inner group-hover:scale-110 transition-transform shrink-0">
              ”
            </span>

            <span className="text-left min-w-0 flex-1">
              <span
                translate="no"
                className="notranslate block font-deva text-xs sm:text-sm font-bold leading-tight text-white group-hover:text-amber-200 transition-colors truncate"
              >
                {activeQuote.title}
              </span>
              <span className="block font-mono text-[0.55rem] sm:text-[0.62rem] uppercase tracking-widest text-amber-400/75 truncate">
                {activeQuote.sub}
              </span>
            </span>
          </button>

          <p
            translate="no"
            className="notranslate mt-3.5 font-serif text-xs sm:text-sm italic tracking-wide text-white/85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] max-w-md px-4 leading-relaxed"
          >
            &ldquo;{subQuote}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
}
