import { useEffect, useState } from 'react';
import { Sparkles, RefreshCw, DownloadCloud, Zap, Music2, CheckCircle2, ExternalLink, X } from 'lucide-react';

function parseVersionNumbers(v: string): number[] {
  return (v || '').split('.').map((p) => parseInt(p, 10) || 0);
}

function isNewerVersion(current: string, target: string): boolean {
  const c = parseVersionNumbers(current);
  const t = parseVersionNumbers(target);
  for (let i = 0; i < Math.max(c.length, t.length); i++) {
    const cv = c[i] || 0;
    const tv = t[i] || 0;
    if (tv > cv) return true;
    if (tv < cv) return false;
  }
  return false;
}

export default function UpdateNotification() {
  const [hasWebUpdate, setHasWebUpdate] = useState(false);
  const [hasApkUpdate, setHasApkUpdate] = useState(false);
  const [apkTargetVersion, setApkTargetVersion] = useState('3.4.1');
  const [apkDownloadUrl, setApkDownloadUrl] = useState('https://vybzmusic.online/vybz.apk');
  const [isUpdating, setIsUpdating] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [dismissedWeb, setDismissedWeb] = useState(false);
  const [dismissedApk, setDismissedApk] = useState(false);

  // 1. Android APK native in-app live update check (fetches live version.json bypassing cache)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ua = navigator.userAgent;
    const isVybZApp = /VybZApp/i.test(ua) || Boolean((window as unknown as { VybZNative?: unknown }).VybZNative);
    if (!isVybZApp) return;

    // Detect installed version via native bridge first, fallback to UserAgent
    let installed = '2.9.0';
    if (typeof (window as any).VybZNative?.getAppVersion === 'function') {
      try {
        const nativeV = (window as any).VybZNative.getAppVersion();
        if (nativeV) installed = nativeV;
      } catch {}
    } else {
      const match = ua.match(/VybZApp\/([\d.]+)/);
      if (match && match[1]) {
        installed = match[1];
      }
    }

    const checkLiveVersion = async () => {
      try {
        // Dynamic /api/apk-version is never precached by ServiceWorker, guaranteeing a fresh check
        let res = await fetch(`/api/apk-version?t=${Date.now()}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            Pragma: 'no-cache',
          },
        }).catch(() => null);

        if (!res || !res.ok) {
          res = await fetch(`/version.json?t=${Date.now()}`, {
            cache: 'no-store',
            headers: {
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              Pragma: 'no-cache',
            },
          }).catch(() => null);
        }

        if (!res || !res.ok) return;
        const data = await res.json();
        if (data && data.latestVersion) {
          const target = data.latestVersion;
          setApkTargetVersion(target);
          if (data.apkUrl) setApkDownloadUrl(data.apkUrl);

          // Loop & Harassment Protection:
          // Check if user already dismissed or recently downloaded this version
          const dismissedKey = `vybz_apk_dismissed_v${target}`;
          const downloadedKey = `vybz_apk_downloaded_v${target}`;
          const sessionDismissedKey = `vybz_apk_sess_dismissed_v${target}`;

          const isDismissed = localStorage.getItem(dismissedKey) === 'true';
          const isSessionDismissed = sessionStorage.getItem(sessionDismissedKey) === 'true';
          const downloadTs = parseInt(localStorage.getItem(downloadedKey) || '0', 10);
          const recentlyDownloaded = Date.now() - downloadTs < 24 * 60 * 60 * 1000;

          // Special check: If installed version is already >= target, no update needed!
          const needsUpdate = isNewerVersion(installed, target);

          if (needsUpdate && !isDismissed && !isSessionDismissed && !recentlyDownloaded) {
            setHasApkUpdate(true);
          } else {
            setHasApkUpdate(false);
          }
        }
      } catch (err) {
        console.warn('[UpdateNotification] Live version check:', err);
      }
    };

    checkLiveVersion();
    const handleVis = () => {
      if (document.visibilityState === 'visible') {
        checkLiveVersion();
      }
    };
    document.addEventListener('visibilitychange', handleVis);
    return () => document.removeEventListener('visibilitychange', handleVis);
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

  const handleDismissApk = () => {
    setDismissedApk(true);
    setHasApkUpdate(false);
    try {
      localStorage.setItem(`vybz_apk_dismissed_v${apkTargetVersion}`, 'true');
      sessionStorage.setItem(`vybz_apk_sess_dismissed_v${apkTargetVersion}`, 'true');
    } catch {}
  };

  const triggerApkDownload = () => {
    setIsUpdating(true);
    setDownloadStarted(true);

    try {
      localStorage.setItem(`vybz_apk_downloaded_v${apkTargetVersion}`, Date.now().toString());
      sessionStorage.setItem(`vybz_apk_sess_dismissed_v${apkTargetVersion}`, 'true');
    } catch {}

    const downloadTarget = apkDownloadUrl || `https://vybzmusic.online/vybz-v${apkTargetVersion}.apk`;

    // 0. Native Android IPC trigger (100% reliable inside VybZ APK WebView)
    if (typeof window !== 'undefined' && (window as any).VybZNative?.downloadApk) {
      try {
        (window as any).VybZNative.downloadApk(downloadTarget);
      } catch {}
    }

    // 1. Direct navigation trigger
    try {
      window.location.href = downloadTarget;
    } catch {}

    // 2. Open in system external browser
    try {
      window.open(downloadTarget, '_system');
    } catch {}

    // 3. Fallback via anchor
    try {
      const link = document.createElement('a');
      link.href = downloadTarget;
      link.setAttribute('download', 'vybz.apk');
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {}

    setTimeout(() => {
      setIsUpdating(false);
    }, 2500);
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
  // CASE 1: OPTIONAL CENTER MODAL FOR OUTDATED ANDROID APK
  // ========================================================
  if (hasApkUpdate && !dismissedApk) {
    return (
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-fade-in select-none">
        <div className="relative w-full max-w-[calc(100vw-1.5rem)] sm:max-w-md max-h-[85dvh] flex flex-col overflow-y-auto rounded-2xl sm:rounded-3xl border border-amber-400/40 bg-[#0d131f] p-5 sm:p-6 text-center shadow-[0_25px_60px_rgba(0,0,0,0.95)] [-webkit-overflow-scrolling:touch]">
          {/* Dismiss Button */}
          <button
            type="button"
            onClick={handleDismissApk}
            className="absolute top-3.5 right-3.5 z-10 grid size-8 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={16} />
          </button>

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
            <span>New Version v{apkTargetVersion} Available</span>
          </div>

          {/* Heading */}
          <h2 className="mt-3 text-xl sm:text-2xl font-black text-white leading-snug">
            VybZ Super-Smooth Update 🚀
          </h2>

          <p className="mt-1.5 text-xs sm:text-sm text-white/70 leading-relaxed">
            Essential performance update for <span className="text-amber-300 font-semibold">100% lag-free</span> and <span className="text-amber-300 font-semibold">smooth</span> playback:
          </p>

          {/* Feature Highlights */}
          <div className="my-4 space-y-2 text-left">
            <div className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] p-2.5">
              <div className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-amber-400/15 text-amber-400">
                <Zap size={13} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">60 / 120 FPS Buttery Smooth</p>
                <p className="text-[11px] text-white/55">Ultra-fast scrolling with zero lag or freezes.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] p-2.5">
              <div className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-amber-400/15 text-amber-400">
                <Music2 size={13} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Continuous Background Playback</p>
                <p className="text-[11px] text-white/55">Music keeps playing while multitasking or screen locked.</p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-white/[0.03] p-2.5">
              <div className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-emerald-400/15 text-emerald-400">
                <CheckCircle2 size={13} />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Clean Notification Dismiss</p>
                <p className="text-[11px] text-white/55">Closing or swiping away the app cleanly clears the player notification.</p>
              </div>
            </div>
          </div>

          {/* Action Button: Direct Link for 100% Android WebView & Browser compatibility */}
          <a
            href={apkDownloadUrl || `https://vybzmusic.online/vybz-v${apkTargetVersion}.apk`}
            download="vybz.apk"
            target="_system"
            onClick={triggerApkDownload}
            className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 py-3.5 text-sm font-black text-black shadow-[0_10px_30px_rgba(245,158,11,0.4)] transition hover:brightness-110 active:scale-95 no-underline cursor-pointer"
          >
            <DownloadCloud size={18} className={isUpdating ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'} />
            <span>{isUpdating ? 'Starting Download...' : downloadStarted ? 'Download Again 🚀' : 'Update Now (1-Click) 🚀'}</span>
          </a>

          {/* Download Instructions / Fallback */}
          {downloadStarted && (
            <div className="mt-3.5 animate-fade-in rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-2.5 text-center">
              <p className="text-xs font-semibold text-emerald-300">
                ✓ Download started!
              </p>
              <p className="text-[11px] text-white/70 mt-0.5">
                Tap your notification bar or open Downloads to install the update.
              </p>
            </div>
          )}

          {/* Secondary Button to Continue without Updating */}
          <button
            type="button"
            onClick={handleDismissApk}
            className="mt-2.5 py-1.5 px-4 text-xs font-medium text-white/50 hover:text-amber-300 transition-colors"
          >
            Continue to VybZ Music →
          </button>

          {/* External Browser Fallback Link */}
          <div className="mt-2 text-center">
            <a
              href={apkDownloadUrl || "https://vybzmusic.online/vybz.apk"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[11px] text-white/40 hover:text-amber-300 transition-colors underline"
            >
              <span>Download not starting? Open in Chrome</span>
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
        <span className="hidden sm:inline">New VybZ Music update ready!</span>
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
