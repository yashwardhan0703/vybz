import { useEffect, useState, useCallback } from 'react';
import { Sparkles, Radio, X } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';

export const CURRENT_CLIENT_VERSION = '2.6.8-pwa-silent-autoupdate';

export default function VersionManager() {
  const { setActiveCategory, setViewMode, isPlaying } = usePlayerStore();
  const [showWhatsNew, setShowWhatsNew] = useState(false);
  const [hasPendingUpdate, setHasPendingUpdate] = useState(false);

  // 1. Check if user has already seen the "250 Songs" announcement
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasSeen = localStorage.getItem('vybz_seen_v3_250');
    if (!hasSeen) {
      const timer = window.setTimeout(() => {
        setShowWhatsNew(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // 2. High-reliability silent update execution
  const executeSilentUpdate = useCallback(async (forced = false) => {
    if (typeof window === 'undefined') return;

    try {
      // Loop protection guard (minimum 12s between update reloads)
      const lastTs = parseInt(sessionStorage.getItem('vybz_update_reload_ts') || '0', 10);
      if (!forced && Date.now() - lastTs < 12000) {
        return;
      }
      sessionStorage.setItem('vybz_update_reload_ts', Date.now().toString());

      // 1. Purge all CacheStorage caches
      if ('caches' in window) {
        try {
          const keys = await caches.keys();
          await Promise.all(keys.map((k) => caches.delete(k)));
        } catch {}
      }

      // 2. Refresh / update Service Workers
      if ('serviceWorker' in navigator) {
        try {
          const registrations = await navigator.serviceWorker.getRegistrations();
          for (const reg of registrations) {
            await reg.update().catch(() => {});
          }
        } catch {}
      }

      // 3. Clean reload bypassing browser memory cache
      const cleanUrl = window.location.origin + window.location.pathname + window.location.search;
      window.location.replace(cleanUrl);
    } catch {
      window.location.reload();
    }
  }, []);

  // 3. Automatically execute pending update when user pauses music or track ends
  useEffect(() => {
    if (!isPlaying && hasPendingUpdate) {
      executeSilentUpdate();
    }
  }, [isPlaying, hasPendingUpdate, executeSilentUpdate]);

  // 4. Active Version Verifier (Fixes iOS Safari / Android PWA Standalone Cache Freeze)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const verifyVersionWithServer = async () => {
      try {
        // Trigger Service Worker background check
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker
            .getRegistrations()
            .then((regs) => {
              for (const r of regs) {
                r.update().catch(() => {});
              }
            })
            .catch(() => {});
        }

        const res = await fetch(`/api/version?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.version && data.version !== CURRENT_CLIENT_VERSION) {
            console.log(
              `[VersionManager] New version detected: ${data.version} (current: ${CURRENT_CLIENT_VERSION})`
            );
            const currentlyPlaying = usePlayerStore.getState().isPlaying;
            if (currentlyPlaying) {
              setHasPendingUpdate(true);
            } else {
              executeSilentUpdate();
            }
          }
        }
      } catch {
        // Offline or network error, ignore gracefully
      }
    };

    // Controller change listener: when Workbox activates new SW and claims clients
    let refreshing = false;
    const handleControllerChange = () => {
      if (refreshing) return;
      refreshing = true;
      const currentlyPlaying = usePlayerStore.getState().isPlaying;
      if (currentlyPlaying) {
        setHasPendingUpdate(true);
      } else {
        executeSilentUpdate();
      }
    };

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);
    }

    // Run version check immediately on launch
    verifyVersionWithServer();

    // Targets iOS Safari / PWA when returning from background or lockscreen
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

    // Tab focus / app switch event
    const handleFocus = () => {
      verifyVersionWithServer();
    };

    // Device online reconnection event
    const handleOnline = () => {
      verifyVersionWithServer();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('online', handleOnline);

    // Periodic check every 60 seconds
    const intervalId = window.setInterval(verifyVersionWithServer, 60 * 1000);

    return () => {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
      }
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('online', handleOnline);
      clearInterval(intervalId);
    };
  }, [executeSilentUpdate]);

  const handleDismiss = () => {
    localStorage.setItem('vybz_seen_v3_250', 'true');
    setShowWhatsNew(false);
  };

  const handleExploreVibes = () => {
    localStorage.setItem('vybz_seen_v3_250', 'true');
    setShowWhatsNew(false);
    setViewMode('studio');
    setActiveCategory('vibes');
  };

  return (
    <>
      {/* 1. Floating Update Available Pill (Only visible if music is currently playing) */}
      {hasPendingUpdate && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[10001] animate-bounce pointer-events-auto">
          <button
            type="button"
            onClick={() => executeSilentUpdate(true)}
            className="flex items-center gap-2 rounded-full border border-amber-400/80 bg-[#0e1420]/95 px-4 py-2 text-xs font-bold text-amber-300 shadow-[0_10px_35px_rgba(0,0,0,0.9)] backdrop-blur-xl transition hover:bg-amber-400 hover:text-black active:scale-95"
            title="Naya version ready hai! Tap to refresh"
          >
            <Sparkles size={14} className="text-amber-400 animate-spin" />
            <span>Naya Update Ready Hai • Tap to Refresh</span>
          </button>
        </div>
      )}

      {/* 2. What's New Modal (Only for 1st time viewers of 250 songs) */}
      {showWhatsNew && (
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
              <span className="inline-flex items-center gap-1 rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 text-[11px] font-bold tracking-wider text-sky-400 uppercase">
                <Sparkles size={12} />
                Mega Update Live
              </span>
            </div>

            <h3 className="mt-3 text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              250 Songs Across 10 Mood Stations! 🎵
            </h3>
            <p className="mt-1.5 text-xs text-white/70 sm:text-sm">
              Alfaaz &amp; Ehsaas, Hostel Ki Raat, aur Train Ki Khidki samet 10 curated stations live hain.
            </p>

            {/* Feature Cards Grid */}
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center gap-3 rounded-xl border border-sky-500/20 bg-sky-500/5 p-2.5 transition hover:bg-sky-500/10">
                <span className="text-xl">🌙</span>
                <div className="flex-1">
                  <span className="font-bold text-sky-400">अल्फ़ाज़ और अहसास:</span>
                  <p className="text-[11px] text-white/60">Jhol, Khasara, Faasle &amp; Viral Urdu Indie</p>
                </div>
                <span className="rounded bg-sky-500/20 px-2 py-0.5 text-[10px] font-bold text-sky-300">New • 25 Songs</span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-orange-500/20 bg-orange-500/5 p-2.5 transition hover:bg-orange-500/10">
                <span className="text-xl">🎸</span>
                <div className="flex-1">
                  <span className="font-bold text-orange-400">होस्टल की रात:</span>
                  <p className="text-[11px] text-white/60">Lucky Ali, Maggi Jam &amp; 2 AM Nostalgia</p>
                </div>
                <span className="rounded bg-orange-500/20 px-2 py-0.5 text-[10px] font-bold text-orange-300">New • 25 Songs</span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-2.5 transition hover:bg-emerald-500/10">
                <span className="text-xl">🚂</span>
                <div className="flex-1">
                  <span className="font-bold text-emerald-400">ट्रेन की खिड़की:</span>
                  <p className="text-[11px] text-white/60">Chaiyya Chaiyya, Window Seat &amp; Safar Hits</p>
                </div>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300">New • 25 Songs</span>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-2.5 transition hover:bg-white/[0.06]">
                <span className="text-xl">☕</span>
                <div className="flex-1">
                  <span className="font-bold text-amber-400">चाय टपरी:</span>
                  <p className="text-[11px] text-white/60">Kishore Kumar, Rafi &amp; Desi Acoustic Retro</p>
                </div>
                <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">25 Songs</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-5 flex gap-2.5">
              <button
                type="button"
                onClick={handleExploreVibes}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-400 via-amber-400 to-orange-500 py-3 text-xs font-bold text-black shadow-lg shadow-sky-500/20 transition hover:brightness-110 active:scale-98"
              >
                <Radio size={15} />
                <span>10 Vibe Stations Suno 🎧</span>
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
      )}
    </>
  );
}
