import { useEffect, useState } from 'react';
import { usePlayerStore } from '../store/playerStore';

export default function WorldBackground() {
  const { currentWorld } = usePlayerStore();
  const [loadedUrl, setLoadedUrl] = useState<string | null>(null);

  useEffect(() => {
    let isCurrent = true;
    const img = new Image();
    img.src = currentWorld.bg;

    img.onload = () => {
      if (isCurrent) {
        setLoadedUrl(currentWorld.bg);
      }
    };

    img.onerror = () => {
      if (isCurrent) {
        setLoadedUrl(null);
      }
    };

    return () => {
      isCurrent = false;
    };
  }, [currentWorld.bg]);

  const isLoaded = loadedUrl === currentWorld.bg;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {/* Dark warm base color */}
      <div className="absolute inset-0 bg-[#0d0f11]" />

      {/* Full-bleed aesthetic background image */}
      <img
        src={currentWorld.bg}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000"
        style={{ opacity: isLoaded ? 0.78 : 0.4 }}
      />

      {/* Cinematic Vignette & Ambient Warm Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center,
            rgba(0,0,0,0.2) 0%,
            rgba(0,0,0,0.5) 60%,
            rgba(0,0,0,0.85) 100%)`,
        }}
      />

      {/* Top and Bottom soft dark gradients for optimal contrast of header & player */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/60 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
    </div>
  );
}
