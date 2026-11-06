import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { RotateCcw, Scissors, Sparkles } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { salonAudio } from '../utils/salonAudio';

interface LetterData {
  char: string;
  dx: number;
  dy: number;
  rot: number;
  delay: number;
}

function getGraphemes(text: string): string[] {
  if (typeof Intl !== 'undefined' && 'Segmenter' in Intl) {
    const segmenter = new Intl.Segmenter('hi', { granularity: 'grapheme' });
    return Array.from(segmenter.segment(text), (s) => s.segment);
  }
  return Array.from(text);
}

function makeLetterData(char: string, i: number): LetterData {
  const seed = i * 7 + (char.codePointAt(0) || 65);
  const rnd = (min: number, max: number) => min + (((seed * 13 + i * 7) % 100) / 100) * (max - min);
  return {
    char,
    dx: rnd(-18, 18),
    dy: rnd(-10, 10),
    rot: rnd(-20, 20),
    delay: i * 14,
  };
}

interface AnimatedTitleProps {
  onTriggerChampi?: () => void;
}

export default function AnimatedTitle({ onTriggerChampi }: AnimatedTitleProps) {
  const { currentWorld } = usePlayerStore();
  const [trimProgress, setTrimProgress] = useState(0);
  const [trimmedCount, setTrimmedCount] = useState(0);
  const [prevWorldId, setPrevWorldId] = useState(currentWorld.id);
  const holdRef = useRef<{ timer: ReturnType<typeof setInterval> | null; progress: number }>({
    timer: null,
    progress: 0,
  });

  // Reset trimmed count when world changes
  if (prevWorldId !== currentWorld.id) {
    setPrevWorldId(currentWorld.id);
    setTrimmedCount(0);
    setTrimProgress(0);
  }

  const letters = useMemo(() => {
    const chars = getGraphemes(currentWorld.nameHindi);
    return chars.map((c, i) => makeLetterData(c, i));
  }, [currentWorld.nameHindi]);

  const endHold = useCallback(() => {
    if (holdRef.current.timer) {
      clearInterval(holdRef.current.timer);
      holdRef.current.timer = null;
    }
    setTrimProgress(0);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    const hold = holdRef.current;
    return () => {
      if (hold.timer) {
        clearInterval(hold.timer);
        hold.timer = null;
      }
    };
  }, []);

  const startHold = useCallback(() => {
    endHold();
    salonAudio.playScissorSnip();
    holdRef.current.progress = 0;
    let snipCounter = 0;

    holdRef.current.timer = setInterval(() => {
      holdRef.current.progress += 2;
      snipCounter += 1;
      if (snipCounter % 12 === 0) {
        salonAudio.playScissorSnip();
      }
      setTrimProgress(holdRef.current.progress);
      if (holdRef.current.progress >= 100) {
        endHold();
        salonAudio.playScissorSnip();
        setTrimmedCount((prev) => Math.min(prev + 1, Math.max(1, letters.length - 2)));
      }
    }, 20);
  }, [endHold, letters.length]);

  const resetTrim = useCallback(() => {
    endHold();
    setTrimmedCount(0);
  }, [endHold]);

  const handleChampiClick = () => {
    salonAudio.playWaterSpray();
    onTriggerChampi?.();
  };

  const visibleLetters = letters.slice(trimmedCount);

  return (
    <div className="flex flex-col items-center">
      <h1
        className="relative font-deva text-[clamp(2.6rem,13vw,4.4rem)] font-extrabold leading-[0.95] tracking-tight text-world-fg drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
        aria-label={currentWorld.nameHindi}
      >
        <span className="relative inline-flex flex-wrap justify-center gap-x-0.5">
          {visibleLetters.map((l, i) => (
            <span
              key={`${currentWorld.id}-${l.char}-${trimmedCount + i}`}
              className="animate-letter-appear inline-block"
              style={{
                '--dx': `${l.dx}px`,
                '--dy': `${l.dy}px`,
                '--rot': `${l.rot}deg`,
                '--delay': `${l.delay}ms`,
              } as React.CSSProperties}
            >
              {l.char === ' ' ? '\u00A0' : l.char}
            </span>
          ))}
        </span>
      </h1>

      <div className="mt-2.5 flex w-full max-w-sm items-center gap-2 px-2">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent to-world-fg/30" />
        <span className="font-deva text-[0.72rem] font-medium tracking-wide text-world-fg/75 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)] sm:text-xs">
          {currentWorld.tagline}
        </span>
        <span className="h-px flex-1 bg-gradient-to-l from-transparent to-world-fg/30" />
      </div>

      {/* Barbershop interactive actions */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {/* Hold to Trim Button */}
        <button
          type="button"
          aria-label="Hold to trim the title with scissors"
          onMouseDown={startHold}
          onMouseUp={endHold}
          onMouseLeave={endHold}
          onTouchStart={startHold}
          onTouchEnd={endHold}
          onTouchCancel={endHold}
          onPointerCancel={endHold}
          className="relative flex select-none touch-none items-center gap-2.5 overflow-hidden rounded-full border border-amber-500/30 bg-black/60 py-1.5 pl-2 pr-4 shadow-lg backdrop-blur-md transition-transform active:scale-95"
          title="उस्ताद जी, थोड़े छोटे कर दो (Hold to trim)"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 bg-amber-400/30 transition-none"
            style={{ width: `${trimProgress}%` }}
          />
          <span className="relative grid size-8 shrink-0 place-items-center rounded-full bg-amber-400 text-black shadow-md">
            <Scissors size={15} />
          </span>
          <span className="relative text-left">
            <span className="block font-deva text-[0.88rem] font-bold leading-tight text-amber-100">
              थोड़ा छोटा कर दो
            </span>
            <span className="block font-mono text-[0.52rem] uppercase tracking-wider text-amber-200/60">
              Hold for haircut
            </span>
          </span>
        </button>

        {/* Head Massage / Champi Button */}
        <button
          type="button"
          onClick={handleChampiClick}
          aria-label="Head massage champi"
          className="flex items-center gap-2 rounded-full border border-teal-500/30 bg-black/60 px-3.5 py-2 text-teal-300 backdrop-blur-md transition-all hover:bg-teal-500/10 active:scale-95 shadow-lg"
          title="उस्ताद जी, चंपी कर दो (Head Massage)"
        >
          <Sparkles size={15} className="text-teal-400 animate-spin" />
          <span className="font-deva text-[0.85rem] font-bold">चंपी कराओ</span>
        </button>

        {/* Reset trim */}
        {trimmedCount > 0 && (
          <button
            type="button"
            onClick={resetTrim}
            aria-label="Reset title"
            className="flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-xs text-white/80 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
          >
            <RotateCcw size={13} aria-hidden="true" />
            <span className="font-deva text-xs font-semibold">वापस लाओ</span>
          </button>
        )}
      </div>
    </div>
  );
}
