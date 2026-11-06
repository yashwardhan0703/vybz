import { useEffect, useMemo } from 'react';

interface ChampiEffectProps {
  isActive: boolean;
  onDone: () => void;
}

export default function ChampiEffect({ isActive, onDone }: ChampiEffectProps) {
  const particles = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 35 + ((i * 13) % 30),
      y: 20 + ((i * 17) % 30),
    }));
  }, []);

  useEffect(() => {
    if (!isActive) return;

    const timer = setTimeout(() => {
      onDone();
    }, 1800);

    return () => clearTimeout(timer);
  }, [isActive, onDone]);

  if (!isActive) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden">
      {/* Gentle screen vibration vignette */}
      <div className="absolute inset-0 border-8 border-amber-500/20 bg-amber-500/5 animate-pulse" />

      {/* Floating massage wave indicators */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-400/50 bg-amber-400/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${40 + p.id * 15}px`,
            height: `${40 + p.id * 15}px`,
            animation: 'ping 1.2s cubic-bezier(0, 0, 0.2, 1) infinite',
            animationDelay: `${p.id * 0.15}s`,
          }}
        />
      ))}

      {/* Retro Champi Toast Banner */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 rounded-full border border-amber-400/60 bg-black/85 px-4 py-1.5 font-deva text-xs font-bold text-amber-300 shadow-xl backdrop-blur-md">
        💆‍♂️ उस्ताद जी की स्पेशल नवरत्न चंपी चालू है... सुकून लो!
      </div>
    </div>
  );
}
