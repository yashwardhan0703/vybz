import { useState, useCallback } from 'react';
import { usePlayerStore } from '../store/playerStore';
import KineticLyrics from './KineticLyrics';

export default function CenterHero() {
  const { currentWorld } = usePlayerStore();
  const [quoteIndex, setQuoteIndex] = useState(0);

  const currentQuotes = currentWorld.quotes || [
    { title: currentWorld.pillTitle, sub: currentWorld.pillSub },
  ];

  const activeQuote = currentQuotes[quoteIndex % currentQuotes.length] || {
    title: currentWorld.pillTitle,
    sub: currentWorld.pillSub,
  };

  const handleNextQuote = useCallback(() => {
    setQuoteIndex((prev) => (prev + 1) % currentQuotes.length);
  }, [currentQuotes.length]);

  return (
    <div className="flex flex-col items-center text-center w-full max-w-2xl px-2 sm:px-4">
      {/* Big Bold Hindi Title */}
      <h1
        translate="no"
        className="notranslate font-deva text-[clamp(2.4rem,9vw,4.4rem)] font-extrabold leading-none tracking-tight text-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.92)]"
        aria-label={currentWorld.nameHindi}
      >
        {currentWorld.nameHindi}
      </h1>

      {/* Subtitle */}
      <div className="mt-2.5 sm:mt-3 flex items-center gap-3 max-w-sm px-4">
        <span className="h-px w-6 bg-gradient-to-r from-transparent to-white/40" />
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-white/70 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-[0.68rem] truncate">
          {currentWorld.subtitle}
        </span>
        <span className="h-px w-6 bg-gradient-to-l from-transparent to-white/40" />
      </div>

      {/* Instagram-Style Dynamic Synced Kinetic Lyrics with Shayari Fallback */}
      <KineticLyrics
        onNextQuote={handleNextQuote}
        activeQuote={activeQuote}
        subQuote={currentWorld.subQuote}
      />
    </div>
  );
}

