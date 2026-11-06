import { useEffect, useState, useCallback, useRef } from 'react';
import { RotateCw } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';

export default function QuoteDisplay() {
  const { currentWorld } = usePlayerStore();
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [prevWorldId, setPrevWorldId] = useState(currentWorld.id);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset during render if world changed
  if (prevWorldId !== currentWorld.id) {
    setPrevWorldId(currentWorld.id);
    setIndex(0);
    setVisible(true);
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Periodic rotation
  useEffect(() => {
    const totalQuotes = currentWorld.quotes?.length || 0;
    if (totalQuotes <= 1) return;

    const interval = setInterval(() => {
      setVisible(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setIndex((i) => (i + 1) % totalQuotes);
        setVisible(true);
      }, 400);
    }, 7000);

    return () => {
      clearInterval(interval);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentWorld.quotes?.length, currentWorld.id]);

  const nextQuote = useCallback(() => {
    const totalQuotes = currentWorld.quotes?.length || 0;
    if (totalQuotes <= 1) return;

    setVisible(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIndex((i) => (i + 1) % totalQuotes);
      setVisible(true);
    }, 300);
  }, [currentWorld.quotes?.length]);

  const rawQuote = currentWorld.quotes?.[index] ?? currentWorld.quotes?.[0] ?? '';
  const quote = typeof rawQuote === 'object' && rawQuote !== null ? `${rawQuote.title} • ${rawQuote.sub}` : (rawQuote || '');
  if (!quote) return null;

  return (
    <div className="mb-auto mt-auto pb-56 text-center sm:pb-60">
      <button
        type="button"
        onClick={nextQuote}
        aria-label="Show another quote"
        className="mx-auto flex min-h-11 max-w-[24rem] items-center justify-center gap-2 rounded-full px-4 text-center transition-opacity"
      >
        <span
          className="font-quote text-sm leading-[1.5] text-world-fg/85 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)] sm:text-[0.95rem]"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        >
          "{quote}"
        </span>
        <RotateCw
          size={12}
          className="shrink-0 text-world-fg/35"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
