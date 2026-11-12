import { useEffect, useState } from 'react';
import { Sparkles, Radio, X } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';

export const CURRENT_CLIENT_VERSION = '2.2.0-pure-native';

export default function VersionManager() {
  const { setActiveCategory, setViewMode } = usePlayerStore();
  const [showWhatsNew, setShowWhatsNew] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Check if user has already seen the "175 Songs" announcement
    const hasSeen = localStorage.getItem('vybz_seen_v2_175');
    if (!hasSeen) {
      // Small delay for smooth entry animation after app loads
      const timer = window.setTimeout(() => {
        setShowWhatsNew(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 2. Active Version Verifier (Fixes iOS PWA Standalone Cache Freeze)
    const verifyVersionWithServer = async () => {
      try {
        const res = await fetch(`/api/version?t=${Date.now()}`, {
          cache: 'no-store',
          headers: { 'Cache-Control': 'no-cache', Pragma: 'no-cache' },
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.version && data.version !== CURRENT_CLIENT_VERSION) {
            console.log(`[VersionManager] New version detected: ${data.version}. Invalidating cache...`);
            // Clean Service Worker cache immediately
            if ('caches' in window) {
              const keys = await caches.keys();
              await Promise.all(keys.map((k) => caches.delete(k)));
            }
            if ('serviceWorker' in navigator) {
              const reg = await navigator.serviceWorker.getRegistration();
              if (reg) {
                await reg.update();
              }
            }
            // Reload page to run new code without user having to delete app
            window.location.reload();
          }
        }
      } catch {
        // Offline or network error, ignore gracefully
      }
    };

    // Run version check immediately on launch
    verifyVersionWithServer();

    // Specifically targets iOS Safari / PWA when returning from background or lockscreen
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        verifyVersionWithServer();
      }
    };

    // iOS WebKit BFCache restore event
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        verifyVersionWithServer();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pageshow', handlePageShow);

    // Periodic check every 4 minutes
    const intervalId = window.setInterval(verifyVersionWithServer, 4 * 60 * 1000);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pageshow', handlePageShow);
      clearInterval(intervalId);
    };
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('vybz_seen_v2_175', 'true');
    setShowWhatsNew(false);
  };

  const handleExploreVibes = () => {
    localStorage.setItem('vybz_seen_v2_175', 'true');
    setShowWhatsNew(false);
    setViewMode('studio');
    setActiveCategory('vibes');
  };

  if (!showWhatsNew) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-amber-500/30 bg-[#0e1420] p-6 text-white shadow-[0_20px_60px_rgba(0,0,0,0.9)] sm:p-7">
        {/* Glow backdrop */}
        <div className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-orange-500/15 blur-3xl" />

        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Close"
          className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
        >
          <X size={16} />
        </button>

        {/* Badge & Title */}
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-[11px] font-bold tracking-wider text-amber-400 uppercase">
            <Sparkles size={12} />
            Mega Update Live
          </span>
        </div>

        <h3 className="mt-3 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
          175 Songs Across 7 Mood Stations! 🎵
        </h3>
        <p className="mt-1.5 text-xs text-white/70 sm:text-sm">
          Aapke har ek mood ke liye curated, high-quality audio experience ab live hai.
        </p>

        {/* Feature Cards Grid */}
        <div className="mt-4 space-y-2 text-xs">
          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-2.5 transition hover:bg-white/[0.06]">
            <span className="text-xl">📿</span>
            <div className="flex-1">
              <span className="font-bold text-amber-400">सूफी और सुकून:</span>
              <p className="text-[11px] text-white/60">Nusrat Fateh Ali Khan & Jagjit Singh Ghazals</p>
            </div>
            <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">25 Songs</span>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-2.5 transition hover:bg-white/[0.06]">
            <span className="text-xl">☕</span>
            <div className="flex-1">
              <span className="font-bold text-orange-400">चाय टपरी:</span>
              <p className="text-[11px] text-white/60">Kishore Kumar, Rafi & Desi Acoustic Retro</p>
            </div>
            <span className="rounded bg-orange-500/20 px-2 py-0.5 text-[10px] font-bold text-orange-300">25 Songs</span>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-2.5 transition hover:bg-white/[0.06]">
            <span className="text-xl">✂️</span>
            <div className="flex-1">
              <span className="font-bold text-yellow-400">डीलक्स सैलून:</span>
              <p className="text-[11px] text-white/60">90s Haircut, Champi aur Romantic Bollywood</p>
            </div>
            <span className="rounded bg-yellow-500/20 px-2 py-0.5 text-[10px] font-bold text-yellow-300">25 Songs</span>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-2.5 transition hover:bg-white/[0.06]">
            <span className="text-xl">🚚</span>
            <div className="flex-1">
              <span className="font-bold text-pink-400">हाईवे ढाबा:</span>
              <p className="text-[11px] text-white/60">Daler Mehndi & High Energy Punjabi Hits</p>
            </div>
            <span className="rounded bg-pink-500/20 px-2 py-0.5 text-[10px] font-bold text-pink-300">25 Songs</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-5 flex gap-2.5">
          <button
            type="button"
            onClick={handleExploreVibes}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-3 text-xs font-bold text-black shadow-lg shadow-amber-500/20 transition hover:brightness-110 active:scale-98"
          >
            <Radio size={15} />
            <span>Vibe Stations Suno 🎧</span>
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded-xl border border-white/10 px-4 py-3 text-xs font-semibold text-white/70 transition hover:bg-white/5 hover:text-white"
          >
            Baad Me
          </button>
        </div>
      </div>
    </div>
  );
}

