import { useEffect, useState } from 'react';
import { Sparkles, RefreshCw, DownloadCloud, Zap, Music2, CheckCircle2, ExternalLink } from 'lucide-react';

export default function UpdateNotification() {
  const [hasWebUpdate, setHasWebUpdate] = useState(false);
  const [hasApkUpdate, setHasApkUpdate] = useState(false);
  const [apkTargetVersion] = useState('2.9.0');
  const [isUpdating, setIsUpdating] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [dismissedWeb, setDismissedWeb] = useState(false);

  // 1. Android APK native in-app update check (compares installed VybZApp UA version with latest)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ua = navigator.userAgent;
    const match = ua.match(/VybZApp\/([\d.]+)/);
    if (match && match[1]) {
      const installed = match[1];
      const latest = '2.9.0';
      if (installed !== latest) {
        setHasApkUpdate(true);
      }
    }
  }, []);

  // 2. Web PWA Service Worker update check
  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    let intervalId: number | undefined;

    navigator.serviceWorker.ready
      .then((registration) => {
        if (registration.waiting) {
          setHasWebUpdate(true);
        }

        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (!installingWorker) return;

          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setHasWebUpdate(true);
            }
          });
        });

        const checkUpdate = () => {
          registration.update().catch(() => {});
        };

        const handleVisibilityChange = () => {
          if (document.visibilityState === 'visible') {
            checkUpdate();
          }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        intervalId = window.setInterval(checkUpdate, 5 * 60 * 1000);

        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          if (intervalId) clearInterval(intervalId);
        };
      })
      .catch(() => {});

    let refreshing = false;
    const handleControllerChange = () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    };

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);
    return () => {
      if (intervalId) clearInterval(intervalId);
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
    };
  }, []);

  const triggerApkDownload = () => {
    setIsUpdating(true);
    setDownloadStarted(true);

    const apkUrl = 'https://vybzmusic.online/VybZ.apk';

    // 1. Trigger via standard download anchor (works on Android Chrome and WebViews with DownloadListener)
    try {
      const link = document.createElement('a');
      link.href = apkUrl;
      link.setAttribute('download', 'VybZ.apk');
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {}

    // 2. Also dispatch location change after 200ms to guarantee OS trigger
    setTimeout(() => {
      try {
        window.location.href = apkUrl;
      } catch {}
    }, 250);

    setTimeout(() => {
      setIsUpdating(false);
    }, 3000);
  };

  const handleWebUpdate = () => {
    setIsUpdating(true);
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .getRegistration()
        .then((reg) => {
          if (reg?.waiting) {
            reg.waiting.postMessage({ type: 'SKIP_WAITING' });
          } else {
            window.location.reload();
          }
        })
        .catch(() => {
          window.location.reload();
        });
    } else {
      window.location.reload();
    }
  };

  // ========================================================
  // CASE 1: MANDATORY CENTER MODAL FOR OUTDATED ANDROID APK
  // ========================================================
  if (hasApkUpdate) {
    return (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in select-none">
        <div className="relative w-full max-w-sm sm:max-w-md overflow-hidden rounded-3xl border border-amber-400/40 bg-[#0d131f] p-6 text-center shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
          {/* Ambient Gold Glow Behind Icon */}
          <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 size-48 rounded-full bg-amber-400/20 blur-3xl" />

          {/* Glowing App Icon Badge */}
          <div className="relative mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl border border-amber-400/40 bg-amber-400/10 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
            <img src="/logo.png" alt="VybZ Music" className="size-11 object-contain drop-shadow" />
            <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-black shadow-md">
              <Zap size={11} fill="currentColor" />
            </span>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 font-mono text-[11px] font-bold text-amber-300">
            <Sparkles size={11} className="animate-spin text-amber-400" />
            <span>Naya Version v{apkTargetVersion} Available</span>
          </div>

          {/* Heading */}
          <h2 className="mt-3 text-xl sm:text-2xl font-black text-white leading-snug">
            VybZ Super-Smooth Update! 🚀
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm text-white/70 leading-relaxed">
            Aapki app ko <span className="text-amber-300 font-semibold">100% lag-free</span> aur <span className="text-amber-300 font-semibold">smooth</span> banane ke liye yeh zaroori update hai:
          </p>

          {/* Feature Highlights (Simple, clear language) */}
          <div className="my-4 space-y-2 text-left">
            <div className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] p-2.5">
              <div className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-amber-400/15 text-amber-400">
                <Zap size={13} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">60 / 120 FPS Buttery Smooth</p>
                <p className="text-[11px] text-white/55">App ab bina kisi lag ya freeze ke super-fast chalegi.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] p-2.5">
              <div className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-amber-400/15 text-amber-400">
                <Music2 size={13} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Continuous Background Playback</p>
                <p className="text-[11px] text-white/55">WhatsApp chalate waqt ya screen lock par gana nahi rukega.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] p-2.5">
              <div className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-emerald-400/15 text-emerald-400">
                <CheckCircle2 size={13} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Clean Notification Dismiss</p>
                <p className="text-[11px] text-white/55">App band (swipe-away) karte hi notification apne aap hat jayegi.</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={triggerApkDownload}
            disabled={isUpdating}
            className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 py-3.5 text-sm font-black text-black shadow-[0_10px_30px_rgba(245,158,11,0.4)] transition hover:brightness-110 active:scale-95 disabled:opacity-75"
          >
            <DownloadCloud size={18} className={isUpdating ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'} />
            <span>{isUpdating ? 'Downloading APK...' : downloadStarted ? 'Dobara Download Karein 🚀' : 'Abhi Update Karein (1-Click) 🚀'}</span>
          </button>

          {/* Download Instructions / Fallback */}
          {downloadStarted && (
            <div className="mt-3.5 animate-fade-in rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-2.5 text-center">
              <p className="text-xs font-semibold text-emerald-300">
                ✓ Download shuru ho gaya hai!
              </p>
              <p className="text-[11px] text-white/70 mt-0.5">
                Phone ke notification bar par tap karke <strong>'Install / Update'</strong> dabayein.
              </p>
            </div>
          )}

          {/* External Browser Fallback Link */}
          <div className="mt-3 text-center">
            <a
              href="https://vybzmusic.online/VybZ.apk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[11px] text-white/50 hover:text-amber-300 transition-colors underline"
            >
              <span>Download shuru na ho to Chrome me kholen</span>
              <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ========================================================
  // CASE 2: SLEEK TOP PILL FOR WEB / PWA UPDATES
  // ========================================================
  if (!hasWebUpdate || dismissedWeb) {
    return null;
  }

  return (
    <aside
      aria-label="App update notification"
      className="fixed top-3 left-1/2 -translate-x-1/2 z-[9999] flex max-w-[94vw] items-center gap-2.5 rounded-full border border-amber-400/40 bg-[#0e1420]/95 px-3.5 py-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all sm:gap-3 sm:px-4 sm:py-2"
    >
      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-400">
        <Sparkles size={13} className="animate-pulse" />
      </div>

      <div className="flex items-center gap-1.5 text-xs font-medium text-white/90">
        <span className="hidden sm:inline">Naya VybZ Music update ready hai!</span>
        <span className="sm:hidden">Update ready!</span>
      </div>

      <button
        type="button"
        onClick={handleWebUpdate}
        disabled={isUpdating}
        className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-[11px] font-bold text-black shadow-md transition hover:brightness-110 active:scale-95 disabled:opacity-60 shrink-0"
      >
        <RefreshCw size={11} className={isUpdating ? 'animate-spin' : ''} />
        <span>{isUpdating ? 'Updating...' : 'Update ⚡'}</span>
      </button>

      <button
        type="button"
        onClick={() => setDismissedWeb(true)}
        aria-label="Dismiss update notification"
        className="flex size-5 shrink-0 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white shrink-0"
      >
        ×
      </button>
    </aside>
  );
}
