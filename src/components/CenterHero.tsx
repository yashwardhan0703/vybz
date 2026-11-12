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
      {/* 1. Big Bold Hindi Title */}
      <h1
        translate="no"
        className="notranslate font-deva text-[clamp(2.4rem,9vw,4.4rem)] font-extrabold leading-none tracking-tight text-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.92)]"
        aria-label={currentWorld.nameHindi}
      >
        {currentWorld.nameHindi}
      </h1>

      {/* 2. Subtitle */}
      <div className="mt-2.5 sm:mt-3 flex items-center gap-3 max-w-sm px-4">
        <span className="h-px w-6 bg-gradient-to-r from-transparent to-white/40" />
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-white/70 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-[0.68rem] truncate">
          {currentWorld.subtitle}
        </span>
        <span className="h-px w-6 bg-gradient-to-l from-transparent to-white/40" />
      </div>

      {/* 3. Original Dialogue / Shayari Card (Always Visible, Exactly Like Image 2) */}
      <div className="mt-4 flex flex-col items-center text-center animate-fade-in w-full">
        <button
          type="button"
          onClick={handleNextQuote}
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
          className="notranslate mt-3 font-serif text-xs sm:text-sm italic tracking-wide text-white/85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] max-w-md px-4 leading-relaxed"
        >
          &ldquo;{currentWorld.subQuote}&rdquo;
        </p>
      </div>

      {/* 4. Automatic Synced Lyrics (Directly Underneath, Pure White Minimalist, No Yellow Glow) */}
      <KineticLyrics />
    </div>
  );
}
