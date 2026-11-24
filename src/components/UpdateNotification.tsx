import { useEffect, useState, useCallback } from 'react';
import { Sparkles, Zap, X } from 'lucide-react';

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
  const [hasApkUpdate, setHasApkUpdate] = useState(false);
  const [apkTargetVersion, setApkTargetVersion] = useState('3.5.0');
  const [apkDownloadUrl, setApkDownloadUrl] = useState('https://vybzmusic.online/vybz.apk');
  const [isUpdating, setIsUpdating] = useState(false);
  const [dismissedSession, setDismissedSession] = useState(false);
  const [promptCount, setPromptCount] = useState(1);
  const [isReadyInCache, setIsReadyInCache] = useState(false);

  // 1. Android APK native in-app live update check & silent background cache
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const ua = navigator.userAgent;
    const isVybZApp = /VybZApp/i.test(ua) || Boolean((window as unknown as { VybZNative?: unknown }).VybZNative);
    if (!isVybZApp) return;

    // Register global listener for native download completion
    (window as any).VybZUpdateManager = {
      onDownloadComplete: (ver: string) => {
        if (ver === apkTargetVersion) {
          setIsReadyInCache(true);
        }
      },
    };

    // Detect installed version via native bridge first, fallback to UserAgent
    let installed = '3.4.1';
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

          const needsUpdate = isNewerVersion(installed, target);
          if (!needsUpdate) {
            setHasApkUpdate(false);
            return;
          }

          // Trigger native silent download immediately in background (0s user wait!)
          if (typeof (window as any).VybZNative?.startSilentDownload === 'function') {
            try {
              (window as any).VybZNative.startSilentDownload(data.apkUrl || 'https://vybzmusic.online/vybz.apk', target);
            } catch {}
          }

          // Check if already ready in phone cache
          if (typeof (window as any).VybZNative?.isApkReady === 'function') {
            try {
              const ready = (window as any).VybZNative.isApkReady(target);
              if (ready) setIsReadyInCache(true);
            } catch {}
          }

          // Retrieve Dynamic Count (1, 2, 3 or 4+)
          const countKey = `vybz_apk_prompt_count_v${target}`;
          const currentCount = parseInt(localStorage.getItem(countKey) || '1', 10);
          setPromptCount(currentCount);

          // Check if dismissed in this listening session
          const sessionDismissedKey = `vybz_apk_sess_dismissed_v${target}`;
          const isSessionDismissed = sessionStorage.getItem(sessionDismissedKey) === 'true';

          setDismissedSession(isSessionDismissed);
          setHasApkUpdate(true);
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
  }, [apkTargetVersion]);

  // Handle Dismiss (Increments the Dynamic Count for next app launch)
  const handleDismiss = useCallback(() => {
    setDismissedSession(true);
    try {
      const countKey = `vybz_apk_prompt_count_v${apkTargetVersion}`;
      const nextCount = promptCount + 1;
      localStorage.setItem(countKey, nextCount.toString());
      setPromptCount(nextCount);
      sessionStorage.setItem(`vybz_apk_sess_dismissed_v${apkTargetVersion}`, 'true');
    } catch {}
  }, [apkTargetVersion, promptCount]);

  // Trigger 1-Tap Install / Download
  const handleTriggerUpdate = useCallback(() => {
    setIsUpdating(true);

    try {
      sessionStorage.setItem(`vybz_apk_sess_dismissed_v${apkTargetVersion}`, 'true');
    } catch {}

    // 1. If native silent installer exists in APK: Instant 0s install
    if (typeof (window as any).VybZNative?.installDownloadedApk === 'function') {
      try {
        (window as any).VybZNative.installDownloadedApk(apkTargetVersion);
        setTimeout(() => setIsUpdating(false), 2000);
        return;
      } catch {}
    }

    // 2. Fallback for older APKs: Direct native download
    const downloadTarget = apkDownloadUrl || `https://vybzmusic.online/vybz.apk`;
    if (typeof (window as any).VybZNative?.downloadApk === 'function') {
      try {
        (window as any).VybZNative.downloadApk(downloadTarget);
        setTimeout(() => setIsUpdating(false), 2500);
        return;
      } catch {}
    }

    // 3. Fallback for browser
    try {
      window.location.href = downloadTarget;
    } catch {}

    setTimeout(() => {
      setIsUpdating(false);
    }, 2500);
  }, [apkDownloadUrl, apkTargetVersion]);

  if (!hasApkUpdate) return null;

  // ========================================================
  // DYNAMIC 1, 2, 3 CONTENT SETUP
  // ========================================================
  let modalTitle = '✦ Nayi Vibe Ready Hai 🎧';
  let modalSubtitle = 'Thoda extra sukoon aur makkhan playback add kiya hai.';
  let primaryBtn = 'Chalo Lagayein ⚡';
  let secondaryBtn = 'Baad Me';

  if (promptCount === 2) {
    modalTitle = '✦ Thoda Aur Smooth Banayein? ✨';
    modalSubtitle = isReadyInCache
      ? 'Downloaded & ready. Bas ek tap ki deri hai.'
      : 'Thoda extra sukoon aur lag-free playback ready hai.';
    primaryBtn = isReadyInCache ? '⚡ Update Karo (0s)' : '⚡ Update Karo';
    secondaryBtn = 'Abhi Gaana Suno';
  } else if (promptCount === 3) {
    modalTitle = '✦ Chhota Upgrade, Badi Vibe ☕';
    modalSubtitle = 'Zero wait time. Ek tap me aur fresh ho jayega VybZ.';
    primaryBtn = '1 Tap Me Update ⚡';
    secondaryBtn = 'Rehne Do';
  }

  // ========================================================
  // CASE A: 4th TIME ONWARDS (PERSISTENT GLOWING TOP BADGE)
  // Non-intrusive: Never blocks screen, music flows 100%
  // ========================================================
  if (promptCount >= 4) {
    return (
      <aside
        aria-label="App update available"
        className="fixed top-2.5 sm:top-3.5 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto animate-fade-in"
      >
        <button
          type="button"
          onClick={handleTriggerUpdate}
          className="group relative flex items-center gap-2 rounded-full border border-amber-400/60 bg-gradient-to-r from-amber-500/20 via-orange-500/25 to-amber-500/20 px-4 py-1.5 text-xs font-bold text-amber-300 shadow-[0_8px_25px_rgba(245,158,11,0.4)] backdrop-blur-md transition-all hover:border-amber-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-amber-400" />
          </span>
          <span className="tracking-wide">✦ Nayi Vibe Aayi Hai • Tap karo ⚡</span>
        </button>
      </aside>
    );
  }

  // ========================================================
  // CASE B: 1st, 2nd, 3rd GENTLE CENTER REMINDER POPUP
  // (Shows once per listening session if dismissed)
  // ========================================================
  if (dismissedSession) {
    // If dismissed in this session, show subtle top pill so user still has access
    return (
      <aside
        aria-label="App update available"
        className="fixed top-2.5 sm:top-3.5 left-1/2 -translate-x-1/2 z-[9999] pointer-events-auto animate-fade-in"
      >
        <button
          type="button"
          onClick={handleTriggerUpdate}
          className="group relative flex items-center gap-2 rounded-full border border-amber-400/40 bg-black/60 px-3.5 py-1 text-[11px] font-bold text-amber-300/90 shadow-md backdrop-blur-md transition-all hover:border-amber-300 active:scale-95 cursor-pointer"
        >
          <Sparkles size={11} className="text-amber-400 animate-spin" />
          <span>✦ Nayi Vibe Ready Hai • Tap karo ⚡</span>
        </button>
      </aside>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dynamic-update-title"
      aria-describedby="dynamic-update-desc"
      className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in select-none"
    >
      <div className="relative w-full max-w-[340px] sm:max-w-[380px] rounded-3xl border border-amber-400/40 bg-gradient-to-b from-[#121826] to-[#080c14] p-6 text-center shadow-[0_20px_60px_rgba(0,0,0,0.95)]">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-3.5 right-3.5 grid size-7 place-items-center rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X size={15} />
        </button>

        {/* Ambient Gold Glow Behind Icon */}
        <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 size-40 rounded-full bg-amber-400/25 blur-3xl" />

        {/* Glowing Logo Icon */}
        <div className="relative mx-auto mb-3.5 flex size-14 items-center justify-center rounded-2xl border border-amber-400/40 bg-amber-400/10 shadow-[0_0_25px_rgba(245,158,11,0.3)]">
          <img src="/logo.png" alt="VybZ Music" className="size-10 object-contain drop-shadow" />
          <span className="absolute -bottom-1 -right-1 flex size-5 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 text-black shadow-md">
            <Zap size={11} fill="currentColor" />
          </span>
        </div>

        {/* Heading */}
        <h2 id="dynamic-update-title" className="text-lg sm:text-xl font-black text-white leading-snug">
          {modalTitle}
        </h2>

        {/* Subtitle */}
        <p id="dynamic-update-desc" className="mt-1.5 text-xs sm:text-sm text-white/70 leading-relaxed">
          {modalSubtitle}
        </p>

        {/* Primary Action Button */}
        <div className="mt-5 space-y-2">
          <button
            type="button"
            onClick={handleTriggerUpdate}
            disabled={isUpdating}
            className="group relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 py-3 text-sm font-black text-black shadow-[0_8px_25px_rgba(245,158,11,0.4)] transition hover:brightness-110 active:scale-95 cursor-pointer disabled:opacity-70"
          >
            <span>{isUpdating ? 'Starting...' : primaryBtn}</span>
          </button>

          {/* Secondary Dismiss Button */}
          <button
            type="button"
            onClick={handleDismiss}
            className="w-full py-2 text-xs font-semibold text-white/50 hover:text-white/80 transition-colors cursor-pointer"
          >
            {secondaryBtn}
          </button>
        </div>
      </div>
    </div>
  );
}
