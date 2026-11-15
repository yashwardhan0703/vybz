import { useState } from 'react';
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
} from 'lucide-react';

interface DownloadLandingPageProps {
  onBackToPlayer: () => void;
}

export default function DownloadLandingPage({ onBackToPlayer }: DownloadLandingPageProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [downloadStarted, setDownloadStarted] = useState(false);

  const apkUrl = 'https://vybzmusic.online/vybz-v2.9.3.apk';

  const triggerDownload = () => {
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
      q: 'What are the main advantages of the APK over the Web version?',
      a: 'The native Android APK offers uninterrupted background audio playback when your screen is locked or while multitasking in WhatsApp/Instagram, plus full 60/120 FPS hardware acceleration and persistent media notification controls.',
    },
    {
      q: 'Can I still use VybZ without installing the APK?',
      a: 'Absolutely! You can use the web player directly in Chrome or Safari at vybzmusic.online with full access to Daily Top 25 Trending Indian songs and 10 ambient vibe radio stations.',
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#070a10] text-white selection:bg-amber-400 selection:text-black">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#070a10]/85 px-4 sm:px-8 py-3.5 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToPlayer}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-all active:scale-95"
          >
            <ArrowLeft size={14} />
            <span className="hidden xs:inline">Web Player</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-xl bg-amber-400/10 border border-amber-400/30 p-1 flex items-center justify-center">
              <img src="/logo.png" alt="VybZ Music" className="size-full object-contain" />
            </div>
            <span className="font-extrabold text-base tracking-tight text-white">
              VybZ <span className="text-amber-400 font-black">Music</span>
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={triggerDownload}
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3.5 py-1.5 text-xs font-bold text-black shadow-md hover:brightness-110 active:scale-95 transition-all"
        >
          <DownloadCloud size={14} />
          <span>Download APK</span>
        </button>
      </nav>

      {/* Main Container */}
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 py-8 sm:py-12 space-y-12">
        {/* HERO SECTION */}
        <header className="relative text-center space-y-5">
          {/* Subtle Ambient Radial Glow */}
          <div className="pointer-events-none absolute left-1/2 -top-12 -translate-x-1/2 size-72 rounded-full bg-amber-500/15 blur-3xl" />

          {/* Version & Security Badges */}
          <div className="relative inline-flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-bold text-amber-300">
              <Sparkles size={12} className="animate-pulse text-amber-400" />
              Official Release v2.9.3
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300">
              <ShieldCheck size={13} />
              Verified Safe & Clean
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
              5.0 MB
            </span>
          </div>

          {/* Main Title */}
          <h1 className="relative text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Download VybZ Music APK
          </h1>

          <p className="mx-auto max-w-xl text-sm sm:text-base text-white/70 leading-relaxed">
            The ad-free Indian music player built for uninterrupted listening. Stream Daily Top 25 Trending hits & 10 ambient mood stations with continuous background audio on Android.
          </p>

          {/* Primary Download CTA */}
          <div className="pt-2 flex flex-col items-center justify-center gap-3">
            <button
              type="button"
              onClick={triggerDownload}
              className="group relative flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 px-8 py-4 text-base font-black text-black shadow-[0_15px_35px_rgba(245,158,11,0.35)] transition-all hover:scale-[1.02] hover:brightness-110 active:scale-95"
            >
              <DownloadCloud size={20} className="group-hover:scale-110 transition-transform" />
              <span>Download APK (v2.9.3 • 5.0 MB)</span>
            </button>

            {downloadStarted && (
              <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
                <CheckCircle2 size={13} />
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

        {/* 3-STEP INSTALLATION GUIDE */}
        <section aria-labelledby="guide-heading" className="rounded-3xl border border-amber-400/20 bg-[#0c121e]/80 p-5 sm:p-7 shadow-xl space-y-4">
          <div className="text-center sm:text-left">
            <h2 id="guide-heading" className="text-lg sm:text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Smartphone size={20} className="text-amber-400" />
              How to Install in 3 Easy Steps
            </h2>
            <p className="text-xs text-white/60 mt-1">
              Follow these simple steps after downloading the APK file to your phone:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 space-y-2">
              <span className="grid size-7 place-items-center rounded-xl bg-amber-400 text-black font-extrabold text-xs">
                1
              </span>
              <h3 className="text-sm font-bold text-white">Tap Downloaded File</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Open the downloaded <code className="text-amber-300 font-mono text-[11px]">vybz-v2.9.3.apk</code> from your notifications or Downloads folder.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 space-y-2">
              <span className="grid size-7 place-items-center rounded-xl bg-amber-400 text-black font-extrabold text-xs">
                2
              </span>
              <h3 className="text-sm font-bold text-white">Expand Prompt</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                If Android shows a security check for web downloads, tap <strong className="text-white">&apos;More details ∨&apos;</strong> to expand it.
              </p>
            </div>

            <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-4 space-y-2">
              <span className="grid size-7 place-items-center rounded-xl bg-emerald-400 text-black font-extrabold text-xs">
                3
              </span>
              <h3 className="text-sm font-bold text-white">Install Anyway</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Tap <strong className="text-amber-300">&apos;Install anyway&apos;</strong> to complete installation and start listening instantly!
              </p>
            </div>
          </div>
        </section>

        {/* KEY FEATURES */}
        <section aria-labelledby="features-heading" className="space-y-4">
          <div className="text-center">
            <h2 id="features-heading" className="text-2xl font-bold text-white">
              Why Install the VybZ Android App?
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Built specifically for music lovers who want pure audio with zero interruptions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
            <div className="rounded-2xl border border-white/10 bg-[#0f1522] p-4 space-y-2 hover:border-amber-400/40 transition-colors">
              <div className="size-9 rounded-xl bg-amber-400/15 text-amber-400 grid place-items-center">
                <Music2 size={18} />
              </div>
              <h3 className="text-sm font-bold text-white">Continuous Background Play</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Music never pauses when you lock your screen, switch apps, or chat on WhatsApp.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0f1522] p-4 space-y-2 hover:border-amber-400/40 transition-colors">
              <div className="size-9 rounded-xl bg-amber-400/15 text-amber-400 grid place-items-center">
                <Zap size={18} />
              </div>
              <h3 className="text-sm font-bold text-white">60 / 120 FPS Buttery Smooth</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Ultra-lightweight native architecture with zero lag, instant scrolling, and smooth sheets.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0f1522] p-4 space-y-2 hover:border-amber-400/40 transition-colors">
              <div className="size-9 rounded-xl bg-amber-400/15 text-amber-400 grid place-items-center">
                <Radio size={18} />
              </div>
              <h3 className="text-sm font-bold text-white">10 Ambient Vibe Stations</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Chai Tapri, Sufi Sukoon, Deluxe Salon, Monsoon Baarish, Hostel Ki Raat & more.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0f1522] p-4 space-y-2 hover:border-amber-400/40 transition-colors">
              <div className="size-9 rounded-xl bg-emerald-400/15 text-emerald-400 grid place-items-center">
                <ShieldCheck size={18} />
              </div>
              <h3 className="text-sm font-bold text-white">100% Ad-Free & Free Forever</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Zero audio ads between songs, zero subscription paywalls, and zero forced logins.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0f1522] p-4 space-y-2 hover:border-amber-400/40 transition-colors">
              <div className="size-9 rounded-xl bg-amber-400/15 text-amber-400 grid place-items-center">
                <Sparkles size={18} />
              </div>
              <h3 className="text-sm font-bold text-white">Live Synced Lyrics</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Real-time timestamped karaoke-style lyrics synced to every track automatically.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0f1522] p-4 space-y-2 hover:border-amber-400/40 transition-colors">
              <div className="size-9 rounded-xl bg-amber-400/15 text-amber-400 grid place-items-center">
                <FileCheck size={18} />
              </div>
              <h3 className="text-sm font-bold text-white">Ultra-Compact (5.0 MB)</h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Consumes almost zero storage space on your device and minimal RAM usage.
              </p>
            </div>
          </div>
        </section>

        {/* TECHNICAL SPECIFICATIONS TABLE */}
        <section aria-labelledby="specs-heading" className="rounded-3xl border border-white/10 bg-[#0c121e]/90 p-5 sm:p-7 space-y-4">
          <h2 id="specs-heading" className="text-lg sm:text-xl font-bold text-white">
            App Specifications & Package Details
          </h2>

          <div className="divide-y divide-white/5 text-xs sm:text-sm">
            <div className="flex items-center justify-between py-2.5">
              <span className="text-white/60">App Name</span>
              <span className="font-semibold text-white">VybZ Music</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-white/60">Package Name</span>
              <span className="font-mono text-amber-300 text-xs">com.vybz.music</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-white/60">Latest Release</span>
              <span className="font-semibold text-white">v2.9.3 (Build 7)</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-white/60">Download Size</span>
              <span className="font-semibold text-white">5.0 MB (5,195,165 bytes)</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-white/60">Minimum OS Required</span>
              <span className="font-semibold text-white">Android 8.0 (Oreo) or higher</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-white/60">License & Ads</span>
              <span className="font-semibold text-emerald-400">100% Free • Zero Audio Ads</span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-white/60">Signing Keystore</span>
              <span className="font-semibold text-white">Official RSA Production Certificate (Valid to 2054)</span>
            </div>
          </div>
        </section>

        {/* FAQS ACCORDION */}
        <section aria-labelledby="faq-heading" className="space-y-4">
          <div className="text-center">
            <h2 id="faq-heading" className="text-2xl font-bold text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Everything you need to know about downloading and installing VybZ Music.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            {faqs.map((faq, i) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-white/10 bg-[#0f1522] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                  className="flex w-full items-center justify-between p-4 text-left text-sm font-semibold text-white hover:text-amber-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition-transform ${openFaqIndex === i ? 'rotate-180 text-amber-400' : 'text-white/50'}`}
                  />
                </button>
                {openFaqIndex === i && (
                  <div className="border-t border-white/5 px-4 pb-4 pt-2 text-xs text-white/70 leading-relaxed animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* BOTTOM CTA BAR */}
        <div className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-[#0e1420] to-[#070a10] p-6 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Ready for Pure Indian Music?</h3>
          <p className="text-xs text-white/70 max-w-md mx-auto">
            Get the official VybZ Music APK now and enjoy uninterrupted playback anywhere, anytime.
          </p>
          <button
            type="button"
            onClick={triggerDownload}
            className="rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-3 text-sm font-bold text-black shadow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            Download VybZ APK (v2.9.3)
          </button>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-white/10 pt-6 text-center text-xs text-white/40 space-y-2 pb-12">
          <p>© 2026 VybZ Music • Official India Audio Hub • https://vybzmusic.online</p>
          <div className="flex items-center justify-center gap-3">
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
