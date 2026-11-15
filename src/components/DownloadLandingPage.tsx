import { useState, useEffect, useMemo } from 'react';
import {
  DownloadCloud,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Music2,
  Smartphone,
  Sparkles,
  ArrowLeft,
  ChevronDown,
  Radio,
  FileCheck,
  Play,
  Monitor,
  Apple,
  Share2,
  Laptop,
} from 'lucide-react';

interface DownloadLandingPageProps {
  onBackToPlayer: () => void;
}

type DeviceMode = 'android' | 'ios' | 'desktop';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function DownloadLandingPage({ onBackToPlayer }: DownloadLandingPageProps) {
  // 1. Device Auto-Detection (Default view based on user OS)
  const detectedDevice = useMemo<DeviceMode>(() => {
    if (typeof window === 'undefined') return 'desktop';
    const ua = navigator.userAgent || '';
    if (/Android/i.test(ua)) return 'android';
    if (/iPhone|iPad|iPod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
      return 'ios';
    }
    return 'desktop';
  }, []);

  const [selectedDevice, setSelectedDevice] = useState<DeviceMode>(detectedDevice);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [pwaInstalled, setPwaInstalled] = useState(false);

  // Sync with detected device on mount
  useEffect(() => {
    setSelectedDevice(detectedDevice);
  }, [detectedDevice]);

  // Listen for native Desktop PWA install prompt
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setPwaInstalled(true);
    }
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const apkUrl = 'https://vybzmusic.online/vybz-v2.9.3.apk';

  const triggerApkDownload = () => {
    setDownloadStarted(true);
    try {
      const link = document.createElement('a');
      link.href = apkUrl;
      link.setAttribute('download', 'vybz-v2.9.3.apk');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch {
      window.location.href = apkUrl;
    }
  };

  const handleDesktopInstall = async () => {
    if (installPrompt) {
      try {
        await installPrompt.prompt();
        const choice = await installPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setPwaInstalled(true);
        }
      } catch {
        onBackToPlayer();
      }
    } else {
      // Fallback: Launch the Web Player directly
      onBackToPlayer();
    }
  };

  const faqs = [
    {
      q: 'Is VybZ Music APK safe to install on Android?',
      a: 'Yes, 100% safe. VybZ is an ultra-lightweight client built with zero malicious code, zero trackers, and zero dangerous permissions. It never accesses your camera, contacts, or storage. The APK is cryptographically signed with our verified RSA production release keystore.',
    },
    {
      q: 'Why does Android show a "Harmful app blocked" or caution prompt?',
      a: 'Google Play Protect displays a generic warning for all direct third-party web downloads that are not downloaded through the Google Play Store. Simply tap "More details ∨" and then "Install anyway" to proceed safely.',
    },
    {
      q: 'How does VybZ work on PC / Desktop?',
      a: 'On Windows, Mac, or Chromebook, VybZ installs as a standalone Desktop PWA. It creates a desktop icon, pins to your Windows taskbar, and opens in its own borderless window with no browser tabs or address bar.',
    },
    {
      q: 'How do I install VybZ on my iPhone or iPad?',
      a: 'iOS does not use APK files. Simply open vybzmusic.online in Apple Safari, tap the Share button (⬆️), and select "Add to Home Screen". VybZ instantly installs as a full-screen, ad-free standalone app on your iPhone.',
    },
    {
      q: 'Can I use VybZ in my browser without downloading anything?',
      a: 'Absolutely! You can stream directly in Chrome, Edge, or Safari at vybzmusic.online with full access to Daily Top 25 Trending Indian songs and 10 ambient vibe stations with zero sign-up required.',
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#070a10] text-white selection:bg-amber-400 selection:text-black">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#070a10]/85 px-3 sm:px-6 lg:px-8 py-3 backdrop-blur-xl">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={onBackToPlayer}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all active:scale-95 shrink-0"
          >
            <ArrowLeft size={13} />
            <span className="hidden xs:inline">Web Player</span>
          </button>
          <div className="flex items-center gap-2 truncate">
            <div className="size-7 sm:size-8 rounded-xl bg-amber-400/10 border border-amber-400/30 p-1 flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="VybZ Music" className="size-full object-contain" />
            </div>
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-white truncate">
              VybZ <span className="text-amber-400 font-black">Music</span>
            </span>
          </div>
        </div>

        {/* Top Right Action Button */}
        {selectedDevice === 'android' ? (
          <button
            type="button"
            onClick={triggerApkDownload}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 sm:px-4 py-1.5 text-xs font-bold text-black shadow-md hover:brightness-110 active:scale-95 transition-all shrink-0"
          >
            <DownloadCloud size={14} />
            <span className="hidden xs:inline">Download APK</span>
            <span className="xs:hidden">APK</span>
          </button>
        ) : selectedDevice === 'desktop' ? (
          <button
            type="button"
            onClick={handleDesktopInstall}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 sm:px-4 py-1.5 text-xs font-bold text-black shadow-md hover:brightness-110 active:scale-95 transition-all shrink-0"
          >
            <Laptop size={14} />
            <span>{pwaInstalled ? 'Open App' : 'Install App'}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onBackToPlayer}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 sm:px-4 py-1.5 text-xs font-bold text-black shadow-md hover:brightness-110 active:scale-95 transition-all shrink-0"
          >
            <Play size={12} fill="currentColor" />
            <span>Open Player</span>
          </button>
        )}
      </nav>

      {/* Main Container */}
      <div className="mx-auto w-full max-w-4xl px-3 sm:px-6 py-6 sm:py-10 space-y-10 sm:space-y-12">
        {/* DEVICE SELECTOR TABS (Smart Adaptive) */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center rounded-2xl border border-white/10 bg-[#0e1420] p-1 shadow-lg max-w-full overflow-x-auto">
            <button
              type="button"
              onClick={() => setSelectedDevice('android')}
              className={`flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                selectedDevice === 'android'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Smartphone size={14} />
              <span>Android (APK)</span>
              {detectedDevice === 'android' && (
                <span className="hidden sm:inline text-[9px] uppercase px-1 py-0.2 rounded bg-black/30 font-mono">
                  Your Device
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setSelectedDevice('ios')}
              className={`flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                selectedDevice === 'ios'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Apple size={14} />
              <span>iPhone / iOS</span>
              {detectedDevice === 'ios' && (
                <span className="hidden sm:inline text-[9px] uppercase px-1 py-0.2 rounded bg-black/30 font-mono">
                  Your Device
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setSelectedDevice('desktop')}
              className={`flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-2 text-xs font-bold transition-all shrink-0 ${
                selectedDevice === 'desktop'
                  ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              <Monitor size={14} />
              <span>PC / Mac</span>
              {detectedDevice === 'desktop' && (
                <span className="hidden sm:inline text-[9px] uppercase px-1 py-0.2 rounded bg-black/30 font-mono">
                  Your Device
                </span>
              )}
            </button>
          </div>
        </div>

        {/* ========================================================
            CASE A: ANDROID VIEW (Official Release APK)
           ======================================================== */}
        {selectedDevice === 'android' && (
          <div className="space-y-10 animate-fade-in">
            {/* Hero Section */}
            <header className="relative text-center space-y-4 sm:space-y-5">
              <div className="pointer-events-none absolute left-1/2 -top-10 -translate-x-1/2 size-60 sm:size-72 rounded-full bg-amber-500/15 blur-3xl" />

              <div className="relative inline-flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
                  <Sparkles size={12} className="animate-pulse text-amber-400" />
                  Official Release v2.9.3
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
                  <ShieldCheck size={13} />
                  Verified Safe & Clean
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">
                  5.0 MB
                </span>
              </div>

              <h1 className="relative text-2xl xs:text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight px-2">
                Download VybZ Music APK
              </h1>

              <p className="mx-auto max-w-xl text-xs sm:text-base text-white/70 leading-relaxed px-2">
                Stream Daily Top 25 Trending Indian songs and 10 curated mood stations with uninterrupted background playback on Android.
              </p>

              <div className="pt-2 flex flex-col items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={triggerApkDownload}
                  className="group relative flex w-full max-w-xs sm:max-w-md items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 py-3.5 sm:py-4 px-6 text-sm sm:text-base font-black text-black shadow-[0_15px_35px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] hover:brightness-110 active:scale-95"
                >
                  <DownloadCloud size={20} className="group-hover:scale-110 transition-transform shrink-0" />
                  <span className="truncate">Download APK (v2.9.3 • 5.0 MB)</span>
                </button>

                {downloadStarted && (
                  <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300">
                    <CheckCircle2 size={13} className="shrink-0" />
                    <span>Download started! Check your notification bar to install.</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={onBackToPlayer}
                  className="inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-amber-300 transition-colors pt-1"
                >
                  <span>Prefer listening in your browser?</span>
                  <span className="underline font-semibold text-amber-400 flex items-center gap-0.5">
                    Open Web Player <Play size={10} fill="currentColor" />
                  </span>
                </button>
              </div>
            </header>

            {/* 3-Step Guide */}
            <section aria-labelledby="android-guide" className="rounded-3xl border border-amber-400/20 bg-[#0c121e]/80 p-4 sm:p-7 shadow-xl space-y-4">
              <div className="text-center sm:text-left">
                <h2 id="android-guide" className="text-base sm:text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                  <Smartphone size={18} className="text-amber-400 shrink-0" />
                  <span>How to Install in 3 Easy Steps</span>
                </h2>
                <p className="text-xs text-white/60 mt-0.5">
                  Follow these quick steps after downloading the APK to your phone:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3.5 space-y-1.5">
                  <span className="grid size-6 place-items-center rounded-xl bg-amber-400 text-black font-extrabold text-xs">
                    1
                  </span>
                  <h3 className="text-sm font-bold text-white">Tap Downloaded File</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Tap the completed <code className="text-amber-300 font-mono text-[11px]">vybz-v2.9.3.apk</code> from your notifications or Downloads folder.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3.5 space-y-1.5">
                  <span className="grid size-6 place-items-center rounded-xl bg-amber-400 text-black font-extrabold text-xs">
                    2
                  </span>
                  <h3 className="text-sm font-bold text-white">Expand Prompt</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    If Android displays a security check for web downloads, tap <strong className="text-white">&apos;More details ∨&apos;</strong>.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3.5 space-y-1.5">
                  <span className="grid size-6 place-items-center rounded-xl bg-emerald-400 text-black font-extrabold text-xs">
                    3
                  </span>
                  <h3 className="text-sm font-bold text-white">Install Anyway</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Tap <strong className="text-amber-300">&apos;Install anyway&apos;</strong> to complete installation and enjoy 100% ad-free music!
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            CASE B: IPHONE / IOS VIEW (Safari Add to Home Screen)
           ======================================================== */}
        {selectedDevice === 'ios' && (
          <div className="space-y-10 animate-fade-in">
            {/* Hero Section */}
            <header className="relative text-center space-y-4 sm:space-y-5">
              <div className="pointer-events-none absolute left-1/2 -top-10 -translate-x-1/2 size-60 sm:size-72 rounded-full bg-amber-500/15 blur-3xl" />

              <div className="relative inline-flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
                  <Apple size={13} className="text-amber-400" />
                  Apple Safari Standalone Web App
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">
                  No App Store Needed
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">
                  100% Free
                </span>
              </div>

              <h1 className="relative text-2xl xs:text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight px-2">
                Add VybZ to iPhone & iPad
              </h1>

              <p className="mx-auto max-w-xl text-xs sm:text-base text-white/70 leading-relaxed px-2">
                iOS does not support APK files. Instead, install VybZ directly to your iPhone Home Screen via Safari for a full-screen, ad-free app experience.
              </p>

              <div className="pt-2 flex flex-col items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={onBackToPlayer}
                  className="group relative flex w-full max-w-xs sm:max-w-md items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 py-3.5 sm:py-4 px-6 text-sm sm:text-base font-black text-black shadow-[0_15px_35px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] hover:brightness-110 active:scale-95"
                >
                  <Play size={18} fill="currentColor" className="shrink-0" />
                  <span>Open VybZ Player in Safari</span>
                </button>
              </div>
            </header>

            {/* 3-Step iOS Safari Guide */}
            <section aria-labelledby="ios-guide" className="rounded-3xl border border-amber-400/20 bg-[#0c121e]/80 p-4 sm:p-7 shadow-xl space-y-4">
              <div className="text-center sm:text-left">
                <h2 id="ios-guide" className="text-base sm:text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                  <Share2 size={18} className="text-amber-400 shrink-0" />
                  <span>How to Add to iPhone Home Screen in Safari</span>
                </h2>
                <p className="text-xs text-white/60 mt-0.5">
                  Takes less than 10 seconds and consumes zero iPhone storage:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3.5 space-y-1.5">
                  <span className="grid size-6 place-items-center rounded-xl bg-amber-400 text-black font-extrabold text-xs">
                    1
                  </span>
                  <h3 className="text-sm font-bold text-white">Tap Share in Safari</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    In Safari&apos;s bottom toolbar, tap the <strong className="text-white">Share button (⬆️ / ⎋)</strong>.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3.5 space-y-1.5">
                  <span className="grid size-6 place-items-center rounded-xl bg-amber-400 text-black font-extrabold text-xs">
                    2
                  </span>
                  <h3 className="text-sm font-bold text-white">Select Add to Home</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Scroll down the Safari action sheet and select <strong className="text-white">&apos;Add to Home Screen&apos; (+)</strong>.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3.5 space-y-1.5">
                  <span className="grid size-6 place-items-center rounded-xl bg-emerald-400 text-black font-extrabold text-xs">
                    3
                  </span>
                  <h3 className="text-sm font-bold text-white">Tap Add & Enjoy</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Tap <strong className="text-amber-300">&apos;Add&apos;</strong> in top-right. VybZ icon will appear on your iPhone screen!
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            CASE C: DESKTOP / PC / MAC VIEW (Desktop PWA Window)
           ======================================================== */}
        {selectedDevice === 'desktop' && (
          <div className="space-y-10 animate-fade-in">
            {/* Hero Section */}
            <header className="relative text-center space-y-4 sm:space-y-5">
              <div className="pointer-events-none absolute left-1/2 -top-10 -translate-x-1/2 size-60 sm:size-72 rounded-full bg-amber-500/15 blur-3xl" />

              <div className="relative inline-flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
                  <Laptop size={13} className="text-amber-400" />
                  Standalone Desktop App for PC & Mac
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-xs text-emerald-300">
                  Pins to Taskbar & Desktop
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">
                  No Browser Tabs
                </span>
              </div>

              <h1 className="relative text-2xl xs:text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight px-2">
                VybZ Music for PC & Mac
              </h1>

              <p className="mx-auto max-w-xl text-xs sm:text-base text-white/70 leading-relaxed px-2">
                Enjoy VybZ in a dedicated, distraction-free desktop window with zero browser tabs, full keyboard shortcuts, and crystal-clear audio.
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleDesktopInstall}
                  className="group relative flex w-full max-w-xs sm:max-w-xs items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 py-3.5 sm:py-4 px-6 text-sm sm:text-base font-black text-black shadow-[0_15px_35px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] hover:brightness-110 active:scale-95"
                >
                  <Laptop size={18} className="shrink-0" />
                  <span>{pwaInstalled ? 'Launch Desktop App' : 'Install Desktop App (PWA)'}</span>
                </button>

                <button
                  type="button"
                  onClick={triggerApkDownload}
                  className="flex w-full max-w-xs sm:max-w-xs items-center justify-center gap-2 rounded-2xl border border-amber-400/30 bg-amber-400/10 py-3.5 sm:py-4 px-6 text-sm font-bold text-amber-300 hover:bg-amber-400/20 active:scale-95 transition-all"
                >
                  <Smartphone size={16} />
                  <span>Download Android APK (5.0 MB)</span>
                </button>
              </div>

              {downloadStarted && (
                <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 mt-2">
                  <CheckCircle2 size={13} className="shrink-0" />
                  <span>Android APK downloaded! You can transfer it to your phone via USB or WhatsApp.</span>
                </div>
              )}
            </header>

            {/* 3-Step Desktop PWA Guide */}
            <section aria-labelledby="pc-guide" className="rounded-3xl border border-amber-400/20 bg-[#0c121e]/80 p-4 sm:p-7 shadow-xl space-y-4">
              <div className="text-center sm:text-left">
                <h2 id="pc-guide" className="text-base sm:text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
                  <Monitor size={18} className="text-amber-400 shrink-0" />
                  <span>How the Desktop App Works</span>
                </h2>
                <p className="text-xs text-white/60 mt-0.5">
                  Installs via Chrome, Edge, or Brave into a native Windows / Mac window:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3.5 space-y-1.5">
                  <span className="grid size-6 place-items-center rounded-xl bg-amber-400 text-black font-extrabold text-xs">
                    1
                  </span>
                  <h3 className="text-sm font-bold text-white">Click Install App</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Click the install button or tap the install icon (⊕) in your browser&apos;s address bar.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3.5 space-y-1.5">
                  <span className="grid size-6 place-items-center rounded-xl bg-amber-400 text-black font-extrabold text-xs">
                    2
                  </span>
                  <h3 className="text-sm font-bold text-white">Confirm Installation</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    Tap <strong className="text-white">&apos;Install&apos;</strong> in the dialog. Windows will pin VybZ to your taskbar.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-3.5 space-y-1.5">
                  <span className="grid size-6 place-items-center rounded-xl bg-emerald-400 text-black font-extrabold text-xs">
                    3
                  </span>
                  <h3 className="text-sm font-bold text-white">Opens Dedicated Window</h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    VybZ launches in its own native window without address bar or browser clutter!
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SHARED VALUE PROPOSITIONS & FEATURES */}
        <section aria-labelledby="features-heading" className="space-y-4 pt-4">
          <div className="text-center">
            <h2 id="features-heading" className="text-xl sm:text-2xl font-bold text-white">
              Why Music Lovers Choose VybZ
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Crafted specifically for Indian music enthusiasts with zero compromises.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
            <div className="rounded-2xl border border-white/10 bg-[#0f1522] p-4 space-y-1.5 hover:border-amber-400/40 transition-colors">
              <div className="size-9 rounded-xl bg-amber-400/15 text-amber-400 grid place-items-center">
                <Music2 size={18} />
              </div>
              <h3 className="text-sm font-bold text-white">Background Audio Play</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Music keeps playing seamlessly while your phone is locked or while multitasking in other apps.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0f1522] p-4 space-y-1.5 hover:border-amber-400/40 transition-colors">
              <div className="size-9 rounded-xl bg-amber-400/15 text-amber-400 grid place-items-center">
                <Zap size={18} />
              </div>
              <h3 className="text-sm font-bold text-white">60 / 120 FPS Buttery Smooth</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Hardware-accelerated interface with instant responsive scrolling and responsive safe insets.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0f1522] p-4 space-y-1.5 hover:border-amber-400/40 transition-colors">
              <div className="size-9 rounded-xl bg-amber-400/15 text-amber-400 grid place-items-center">
                <Radio size={18} />
              </div>
              <h3 className="text-sm font-bold text-white">10 Ambient Vibe Stations</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Chai Tapri, Sufi Sukoon, Deluxe Salon, Monsoon Baarish, Hostel Ki Raat & more.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0f1522] p-4 space-y-1.5 hover:border-amber-400/40 transition-colors">
              <div className="size-9 rounded-xl bg-emerald-400/15 text-emerald-400 grid place-items-center">
                <ShieldCheck size={18} />
              </div>
              <h3 className="text-sm font-bold text-white">100% Ad-Free & Free Forever</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Zero audio ads between songs, zero subscription paywalls, and zero forced sign-ups.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0f1522] p-4 space-y-1.5 hover:border-amber-400/40 transition-colors">
              <div className="size-9 rounded-xl bg-amber-400/15 text-amber-400 grid place-items-center">
                <Sparkles size={18} />
              </div>
              <h3 className="text-sm font-bold text-white">Live Synced Karaoke Lyrics</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Real-time timestamped lyrics automatically synced to every trending track.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0f1522] p-4 space-y-1.5 hover:border-amber-400/40 transition-colors">
              <div className="size-9 rounded-xl bg-amber-400/15 text-amber-400 grid place-items-center">
                <FileCheck size={18} />
              </div>
              <h3 className="text-sm font-bold text-white">Zero Bloat & Lightweight</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Only 5.0 MB download on Android and pure PWA on PC/iOS with minimal RAM usage.
              </p>
            </div>
          </div>
        </section>

        {/* TECHNICAL SPECIFICATIONS TABLE */}
        <section aria-labelledby="specs-heading" className="rounded-3xl border border-white/10 bg-[#0c121e]/90 p-4 sm:p-7 space-y-4">
          <h2 id="specs-heading" className="text-base sm:text-lg font-bold text-white">
            App Specifications & Cross-Platform Support
          </h2>

          <div className="divide-y divide-white/5 text-xs sm:text-sm">
            <div className="flex items-center justify-between py-2.5">
              <span className="text-white/60">App Name</span>
              <span className="font-semibold text-white">VybZ Music</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-white/60">Android Package</span>
              <span className="font-mono text-amber-300 text-xs">com.vybz.music (v2.9.3)</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-white/60">Android APK Size</span>
              <span className="font-semibold text-white">5.0 MB (5,195,165 bytes)</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-white/60">Desktop Support</span>
              <span className="font-semibold text-white">Windows 10/11, macOS, ChromeOS (PWA)</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-white/60">iPhone / iOS Support</span>
              <span className="font-semibold text-white">Safari Web App (iOS 14.0+)</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-white/60">License & Ads</span>
              <span className="font-semibold text-emerald-400">100% Free • Zero Audio Ads</span>
            </div>
          </div>
        </section>

        {/* FAQS ACCORDION */}
        <section aria-labelledby="faq-heading" className="space-y-4">
          <div className="text-center">
            <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Everything you need to know about downloading and installing VybZ Music.
            </p>
          </div>

          <div className="space-y-2.5 pt-1">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-white/10 bg-[#0f1522] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="flex w-full items-center justify-between p-3.5 sm:p-4 text-left text-xs sm:text-sm font-semibold text-white hover:text-amber-300 transition-colors"
                >
                  <span className="pr-2">{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition-transform ${openFaqIndex === i ? 'rotate-180 text-amber-400' : 'text-white/50'}`}
                  />
                </button>
                {openFaqIndex === i && (
                  <div className="border-t border-white/5 px-3.5 sm:px-4 pb-3.5 pt-2 text-xs text-white/70 leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA BAR */}
        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-[#0e1420] to-[#070a10] p-5 sm:p-7 text-center space-y-3.5">
          <h3 className="text-lg sm:text-xl font-bold text-white">Ready for Pure Indian Music?</h3>
          <p className="text-xs text-white/70 max-w-md mx-auto">
            Experience the cleanest, most nostalgic Indian music streamer today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={selectedDevice === 'android' ? triggerApkDownload : onBackToPlayer}
              className="rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-xs sm:text-sm font-bold text-black shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              {selectedDevice === 'android' ? 'Download VybZ APK (v2.9.3)' : 'Open VybZ Web Player'}
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-white/10 pt-6 text-center text-xs text-white/40 space-y-2 pb-12">
          <p>© 2026 VybZ Music • Official India Audio Hub • https://vybzmusic.online</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button type="button" onClick={onBackToPlayer} className="hover:text-amber-300 underline">
              Open Web Player
            </button>
            <span>•</span>
            <span>Zero Ads</span>
            <span>•</span>
            <span>Background Play</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
