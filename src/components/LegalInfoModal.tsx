import { useEffect } from 'react';
import { X, ShieldCheck, HelpCircle, FileText, AlertCircle, Info, Sparkles, Smartphone, Laptop, Globe, Mail } from 'lucide-react';

export type LegalTab = 'about' | 'faq' | 'privacy' | 'terms' | 'disclaimer';

interface LegalInfoModalProps {
  isOpen: boolean;
  activeTab: LegalTab;
  onTabChange: (tab: LegalTab) => void;
  onClose: () => void;
}

export default function LegalInfoModal({
  isOpen,
  activeTab,
  onTabChange,
  onClose,
}: LegalInfoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="VybZ Legal & Information"
        className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-xl -translate-y-1/2 rounded-2xl border border-amber-500/25 bg-[#120e0c]/95 p-5 sm:p-6 shadow-[0_25px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl text-neutral-200 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-150"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-amber-400/15 text-amber-400">
              <Sparkles size={15} />
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                VybZ Music — Legal & Information
              </h2>
              <p className="text-[0.68rem] text-white/40">
                Official transparency, terms & platform guidelines
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="grid size-8 place-items-center rounded-full bg-white/5 text-white/70 hover:bg-white/15 hover:text-white transition-all cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tab Buttons (Horizontal scroll on very small screens, clean row on sm+) */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-3 border-b border-white/5 scrollbar-none text-[0.72rem]">
          <button
            type="button"
            onClick={() => onTabChange('about')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'about'
                ? 'bg-amber-400 text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <Info size={13} />
            <span>About VybZ</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('faq')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'faq'
                ? 'bg-amber-400 text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <HelpCircle size={13} />
            <span>FAQ & Devices</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('privacy')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'privacy' || activeTab === 'terms'
                ? 'bg-amber-400 text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck size={13} />
            <span>Privacy & Terms</span>
          </button>

          <button
            type="button"
            onClick={() => onTabChange('disclaimer')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'disclaimer'
                ? 'bg-amber-400 text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <AlertCircle size={13} />
            <span>DMCA & Disclaimer</span>
          </button>
        </div>

        {/* Tab Content (Scrollable) */}
        <div className="overflow-y-auto py-4 pr-1 text-xs leading-relaxed space-y-4 text-white/80 scrollbar-thin scrollbar-thumb-white/10">
          {/* TAB 1: ABOUT VYBZ */}
          {activeTab === 'about' && (
            <div className="space-y-3.5">
              <div className="rounded-xl border border-amber-500/20 bg-amber-400/5 p-3.5">
                <h3 className="text-sm font-semibold text-amber-300 flex items-center gap-1.5">
                  <Sparkles size={14} /> Our Soul & Mission
                </h3>
                <p className="mt-1 text-white/70 text-[0.75rem] leading-relaxed">
                  VybZ Music is India's ambient mood and cultural audio hub. We believe that music should match how you feel right now — whether it's cutting chai at a morning tapri, late-night hostel guitar jams, rain tapping on a train window, or classic 90s salon champi memories.
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider">What Makes VybZ Different:</h4>
                <ul className="space-y-1.5 text-white/70 text-[0.72rem]">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span><strong>10 Curated Indian Vibe Radios:</strong> Smart continuous auto-queues tuned to authentic moods (Chai Tapri, Hostel Ki Raat, Monsoon, Sufi Sukoon, etc.).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span><strong>Daily India Top 25 Chart:</strong> Real-time trending hits across Bollywood, Punjabi, and Pop.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span><strong>50+ Iconic Indian Artists:</strong> 20 curated master hits per artist for seamless discovery.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span><strong>100% Ad-Free Audio Experience:</strong> Zero commercial interruptions or subscription paywalls.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2 border-t border-white/5">
                <h4 className="font-semibold text-white text-xs uppercase tracking-wider mb-2">Supported Devices:</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[0.7rem]">
                  <div className="rounded-lg bg-white/5 p-2 flex items-center gap-2">
                    <Smartphone size={14} className="text-amber-400 shrink-0" />
                    <span>Android (APK & PWA)</span>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2 flex items-center gap-2">
                    <Smartphone size={14} className="text-amber-400 shrink-0" />
                    <span>iPhone / iOS (PWA)</span>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2 flex items-center gap-2">
                    <Laptop size={14} className="text-amber-400 shrink-0" />
                    <span>PC & Mac (Desktop)</span>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2 flex items-center gap-2">
                    <Globe size={14} className="text-amber-400 shrink-0" />
                    <span>Tablets & Web</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FAQ & DEVICES */}
          {activeTab === 'faq' && (
            <div className="space-y-3">
              <div className="rounded-lg bg-white/5 p-3">
                <h4 className="font-semibold text-amber-300 text-[0.75rem]">Q: Is VybZ Music completely free?</h4>
                <p className="mt-1 text-white/70 text-[0.72rem]">
                  Yes! VybZ Music is 100% free to stream with zero subscriptions, zero hidden charges, and zero audio ad breaks.
                </p>
              </div>

              <div className="rounded-lg bg-white/5 p-3">
                <h4 className="font-semibold text-amber-300 text-[0.75rem]">Q: How do I play songs in the background on my phone?</h4>
                <p className="mt-1 text-white/70 text-[0.72rem]">
                  For Android, install the official VybZ Android APK (v3.3.0) directly from our website. It features an active foreground audio service that keeps playing when your screen is locked. On iOS, add VybZ to your Home Screen from Safari.
                </p>
              </div>

              <div className="rounded-lg bg-white/5 p-3">
                <h4 className="font-semibold text-amber-300 text-[0.75rem]">Q: Where does the music stream come from?</h4>
                <p className="mt-1 text-white/70 text-[0.72rem]">
                  All audio and video playback is delivered directly through the official YouTube IFrame Player API. We do not store or host any audio files.
                </p>
              </div>

              <div className="rounded-lg bg-white/5 p-3">
                <h4 className="font-semibold text-amber-300 text-[0.75rem]">Q: Where are my Liked Songs and Custom Playlists saved?</h4>
                <p className="mt-1 text-white/70 text-[0.72rem]">
                  Your playlists, liked songs, and volume settings are saved privately in your device's browser local cache. No login or cloud tracking required!
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: PRIVACY & TERMS */}
          {(activeTab === 'privacy' || activeTab === 'terms') && (
            <div className="space-y-3.5">
              <div>
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck size={14} /> Privacy Policy
                </h3>
                <p className="mt-1 text-white/70 text-[0.72rem] leading-relaxed">
                  We value your privacy above all. VybZ Music does not require account registration, and we never collect, store, sell, or rent your personal information to third parties.
                </p>
                <ul className="mt-1.5 space-y-1 text-white/60 text-[0.7rem] list-disc list-inside">
                  <li><strong>Local Storage:</strong> Your playlists, playback history, and theme settings stay strictly on your device.</li>
                  <li><strong>Analytics:</strong> Only standard, anonymous aggregated usage metrics (e.g. general page visits) may be processed to monitor uptime and network latency.</li>
                </ul>
              </div>

              <div className="pt-2 border-t border-white/5">
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText size={14} /> Terms of Service
                </h3>
                <p className="mt-1 text-white/70 text-[0.72rem] leading-relaxed">
                  By accessing or using VybZ Music, you agree to these Terms of Service. VybZ is provided free of charge strictly for personal, non-commercial listening and cultural music discovery.
                </p>
                <ul className="mt-1.5 space-y-1 text-white/60 text-[0.7rem] list-disc list-inside">
                  <li>You agree not to attempt to extract, scrape, or redistribute raw audio streams.</li>
                  <li>Playback relies on YouTube services and is subject to the <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">YouTube Terms of Service</a>.</li>
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: DMCA & DISCLAIMER */}
          {activeTab === 'disclaimer' && (
            <div className="space-y-3.5">
              <div className="rounded-xl border border-amber-500/25 bg-amber-400/5 p-3.5">
                <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle size={14} /> Content & Copyright Disclaimer
                </h3>
                <p className="mt-1 text-white/75 text-[0.72rem] leading-relaxed">
                  VybZ Music is an independent ambient music discovery client. <strong>VybZ Music does not host, store, copy, or distribute any audio, video, or media files on its servers.</strong>
                </p>
              </div>

              <div className="space-y-2 text-white/70 text-[0.72rem] leading-relaxed">
                <p>
                  All media playback is powered by and streamed directly from YouTube via the official <strong>YouTube IFrame Player API</strong> in strict accordance with the YouTube API Services Terms of Service.
                </p>
                <p>
                  All copyrights, master recordings, trademarks, artist names, lyrics, and cover artwork belong exclusively to their respective record labels, artists, producers, and copyright owners (including T-Series, Zee Music Company, Sony Music India, Saregama, YRF, Tips, Universal Music, and others).
                </p>
              </div>

              <div className="pt-2 border-t border-white/5">
                <h4 className="text-xs font-semibold text-white flex items-center gap-1.5">
                  <Mail size={13} className="text-amber-400" /> Copyright Inquiries & Takedown Notices:
                </h4>
                <p className="mt-1 text-white/60 text-[0.72rem]">
                  If you are a copyright owner, publisher, or legal agent and wish to have any query addressed, please reach out to us at:
                </p>
                <p className="mt-1 font-mono text-[0.75rem] text-amber-300 bg-white/5 px-2.5 py-1 rounded-md inline-block">
                  support@vybzmusic.online
                </p>
                <p className="mt-1 text-[0.65rem] text-white/40">
                  We honor all legitimate verification and takedown requests promptly within 24 to 48 hours.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer info bar inside modal */}
        <div className="mt-2 border-t border-white/10 pt-3 flex items-center justify-between text-[0.68rem] text-white/40">
          <span>© 2026 VybZ Music Platform</span>
          <button
            type="button"
            onClick={onClose}
            className="text-amber-400 font-semibold hover:underline cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </>
  );
}
