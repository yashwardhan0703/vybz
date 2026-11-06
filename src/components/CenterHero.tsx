import { useState, useCallback } from 'react';
import { usePlayerStore } from '../store/playerStore';

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
    <div className="flex flex-col items-center text-center">
      {/* Big Bold Hindi Title */}
      <h1
        translate="no"
        className="notranslate font-deva text-[clamp(2.6rem,11vw,4.6rem)] font-extrabold leading-none tracking-tight text-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.92)] select-none"
        aria-label={currentWorld.nameHindi}
      >
        {currentWorld.nameHindi}
      </h1>

      {/* Subtitle */}
      <div className="mt-3 flex items-center gap-3 max-w-sm px-4">
        <span className="h-px w-6 bg-gradient-to-r from-transparent to-white/40" />
        <span className="font-mono text-[0.62rem] uppercase tracking-[0.28em] text-white/70 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-[0.68rem]">
          {currentWorld.subtitle}
        </span>
        <span className="h-px w-6 bg-gradient-to-l from-transparent to-white/40" />
      </div>

      {/* Interactive Dialogue Pill */}
      <div className="mt-5">
        <button
          type="button"
          onClick={handleNextQuote}
          aria-label="Click for next dialogue"
          className="group flex items-center gap-2.5 rounded-full border border-white/15 bg-black/55 py-1.5 pl-2 pr-4.5 shadow-[0_10px_30px_rgba(0,0,0,0.85)] backdrop-blur-md transition-all active:scale-95 hover:border-white/30 hover:bg-black/70"
          title="Click to change quote"
        >
          {/* Quote Icon circle */}
          <span className="grid size-7 place-items-center rounded-full bg-white/10 font-serif text-sm font-bold leading-none text-white/90 shadow-inner group-hover:bg-white/20">
            ”
          </span>

          <span className="text-left">
            <span translate="no" className="notranslate block font-deva text-[0.84rem] font-bold leading-tight text-white">
              {activeQuote.title}
            </span>
            <span className="block font-mono text-[0.52rem] uppercase tracking-widest text-white/50">
              {activeQuote.sub}
            </span>
          </span>
        </button>
      </div>

      {/* Sub-quote */}
      <p translate="no" className="notranslate mt-4 font-serif text-xs italic tracking-wide text-white/85 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] sm:text-sm">
        “{currentWorld.subQuote}”
      </p>
    </div>
  );
}

