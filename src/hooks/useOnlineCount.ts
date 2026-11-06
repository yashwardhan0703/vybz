import { useEffect, useState } from 'react';

const BASE = 312;
const RANGE = 40;

export function useOnlineCount() {
  const [count, setCount] = useState(() => BASE + Math.floor(Math.random() * RANGE));

  useEffect(() => {
    const drift = () => {
      setCount((prev) => {
        const delta = Math.floor(Math.random() * 7) - 3;
        const next = prev + delta;
        return Math.max(BASE - RANGE, Math.min(BASE + RANGE * 2, next));
      });
    };
    const id = setInterval(drift, 4000 + Math.random() * 3000);
    return () => clearInterval(id);
  }, []);

  return count;
}
