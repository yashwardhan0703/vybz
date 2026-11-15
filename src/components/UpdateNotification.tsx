import { useEffect, useState } from 'react';
import { Sparkles, RefreshCw, DownloadCloud, X } from 'lucide-react';

export default function UpdateNotification() {
  const [hasWebUpdate, setHasWebUpdate] = useState(false);
  const [hasApkUpdate, setHasApkUpdate] = useState(false);
  const [apkTargetVersion, setApkTargetVersion] = useState('2.9.0');
  const [isUpdating, setIsUpdating] = useState(false);
  const [dismissed, setDismissed] = useState(false);

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
        setApkTargetVersion(latest);
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

  const handleUpdate = () => {
    setIsUpdating(true);
    if (hasApkUpdate) {
      window.location.href = 'https://vybzmusic.online/VybZ.apk';
      setTimeout(() => setIsUpdating(false), 3000);
      return;
    }

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

  const showNotification = (hasApkUpdate || hasWebUpdate) && !dismissed;
  if (!showNotification) return null;

  return (
    <aside
      aria-label="App update notification"
      className="fixed top-3 left-1/2 -translate-x-1/2 z-[9999] flex max-w-[94vw] items-center gap-2.5 rounded-full border border-amber-400/40 bg-[#0e1420]/95 px-3.5 py-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all sm:gap-3 sm:px-4 sm:py-2"
    >
      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-400">
        <Sparkles size={13} className="animate-pulse" />
      </div>

      <div className="flex items-center gap-1.5 text-xs font-medium text-white/90">
        {hasApkUpdate ? (
          <>
            <span className="hidden sm:inline">VybZ App v{apkTargetVersion} ready! (Smooth 60FPS & Background Fix)</span>
            <span className="sm:hidden">App v{apkTargetVersion} Ready!</span>
          </>
        ) : (
          <>
            <span className="hidden sm:inline">Naya VybZ Music update ready hai!</span>
            <span className="sm:hidden">Update ready!</span>
          </>
        )}
      </div>

      <button
        type="button"
        onClick={handleUpdate}
        disabled={isUpdating}
        className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-[11px] font-bold text-black shadow-md transition hover:brightness-110 active:scale-95 disabled:opacity-60 shrink-0"
      >
        {hasApkUpdate ? (
          <>
            <DownloadCloud size={12} className={isUpdating ? 'animate-bounce' : ''} />
            <span>{isUpdating ? 'Downloading...' : 'Update APK ⚡'}</span>
          </>
        ) : (
          <>
            <RefreshCw size={11} className={isUpdating ? 'animate-spin' : ''} />
            <span>{isUpdating ? 'Updating...' : 'Update ⚡'}</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss update notification"
        className="flex size-5 shrink-0 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white shrink-0"
      >
        <X size={12} />
      </button>
    </aside>
  );
}

