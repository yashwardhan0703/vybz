import { useState, useEffect } from 'react';
import { Smartphone, X, Play } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';

export default function IOSBackgroundTip() {
  const [show, setShow] = useState(false);
  const isPlaying = usePlayerStore((s) => s.isPlaying);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Only show on iOS (iPhone/iPad) in Web/Safari/PWA mode (never in Android APK)
    const isIOS =
      (/iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) &&
      !(window as any).VybZNative;

    if (!isIOS) return;

    // Check if user already dismissed the hint
    const alreadySeen = localStorage.getItem('vybz_ios_bg_tip_seen');
    if (alreadySeen) return;

    // Show only when user starts listening to a song
    if (isPlaying) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isPlaying]);

  const handleDismiss = () => {
    setShow(false);
    try {
      localStorage.setItem('vybz_ios_bg_tip_seen', '1');
    } catch {}
  };

  if (!show) return null;

  return (
    <div
      role="alert"
      className="fixed top-4 inset-x-3 sm:inset-x-auto sm:right-4 sm:max-w-md z-[9999] animate-in fade-in slide-in-from-top-4 duration-300 pointer-events-auto"
    >
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900/95 border border-amber-500/30 p-4 shadow-2xl backdrop-blur-xl ring-1 ring-amber-500/20">
        {/* Amber accent glow */}
        <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-amber-500/15 blur-2xl pointer-events-none" />

        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
            <Smartphone className="size-5" />
          </div>

          <div className="flex-1 min-w-0 pr-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <span>iPhone Tip</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300">Lockscreen Audio</span>
            </h4>
            <p className="mt-1 text-xs text-neutral-300 leading-relaxed">
              Screen lock ya app switch (WhatsApp) karne par gaana ruke, toh <strong>Lock Screen</strong> ya <strong>Control Center</strong> se bas ek baar <span className="inline-flex items-center gap-0.5 font-bold text-amber-300"><Play className="size-3 fill-amber-300 inline" /> Play</span> dabayein — background me bajta rahega!
            </p>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={handleDismiss}
                className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold shadow-md transition-colors"
              >
                Samajh gaya
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Close"
            className="text-neutral-400 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
