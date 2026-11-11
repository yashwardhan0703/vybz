import { useEffect, useState } from 'react';
import { Sparkles, RefreshCw, X } from 'lucide-react';

export default function UpdateNotification() {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
      return;
    }

    let intervalId: number | undefined;

    navigator.serviceWorker.ready
      .then((registration) => {
        // 1. If an updated worker is already waiting to activate
        if (registration.waiting) {
          setHasUpdate(true);
        }

        // 2. Listen for newly found updates
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (!installingWorker) return;

          installingWorker.addEventListener('statechange', () => {
            if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
              setHasUpdate(true);
            }
          });
        });

        // 3. Check for updates on visibility change (when user returns to app/tab)
        const checkUpdate = () => {
          registration.update().catch(() => {});
        };

        const handleVisibilityChange = () => {
          if (document.visibilityState === 'visible') {
            checkUpdate();
          }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        // 4. Periodic update check every 5 minutes
        intervalId = window.setInterval(checkUpdate, 5 * 60 * 1000);

        return () => {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
          if (intervalId) clearInterval(intervalId);
        };
      })
      .catch(() => {});

    // Listen for controllerchange: when the new service worker activates, reload
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
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((reg) => {
        if (reg?.waiting) {
          reg.waiting.postMessage({ type: 'SKIP_WAITING' });
        } else {
          window.location.reload();
        }
      }).catch(() => {
        window.location.reload();
      });
    } else {
      window.location.reload();
    }
  };

  if (!hasUpdate || dismissed) {
    return null;
  }

  return (
    <aside
      aria-label="App update notification"
      className="fixed top-3 left-1/2 -translate-x-1/2 z-[9999] flex max-w-[92vw] items-center gap-2.5 rounded-full border border-amber-400/40 bg-[#0e1420]/95 px-3.5 py-1.5 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all sm:gap-3 sm:px-4 sm:py-2"
    >
      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-amber-400">
        <Sparkles size={13} className="animate-pulse" />
      </div>

      <div className="flex items-center gap-1.5 text-xs font-medium text-white/90">
        <span className="hidden sm:inline">Naya VybZ update ready hai!</span>
        <span className="sm:hidden">Update ready!</span>
      </div>

      <button
        type="button"
        onClick={handleUpdate}
        disabled={isUpdating}
        className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-[11px] font-bold text-black shadow-md transition hover:brightness-110 active:scale-95 disabled:opacity-60"
      >
        <RefreshCw size={11} className={isUpdating ? 'animate-spin' : ''} />
        <span>{isUpdating ? 'Updating...' : 'Update ⚡'}</span>
      </button>

      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss update notification"
        className="flex size-5 shrink-0 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white"
      >
        <X size={12} />
      </button>
    </aside>
  );
}

