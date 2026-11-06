import { Radio, Signal } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';

export default function RadioTuningOverlay() {
  const { isTuning, tuningProgress, currentWorld } = usePlayerStore();

  if (!isTuning) return null;

  return (
    <div
      role="status"
      aria-live="assertive"
      className="pointer-events-none fixed inset-x-3 top-20 z-50 mx-auto max-w-md animate-fade-in sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2"
    >
      <div className="overflow-hidden rounded-2xl border border-amber-500/40 bg-black/90 p-3.5 shadow-[0_15px_50px_rgba(0,0,0,0.95)] backdrop-blur-2xl">
        {/* Top Frequency Bar */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold">
            <Radio size={15} className="animate-pulse" />
            <span className="font-deva text-xs">
              लाइव रेडियो ट्यूनिंग...
            </span>
          </div>

          <div className="flex items-center gap-1 text-[0.62rem] font-mono text-amber-300">
            <Signal size={12} className="text-amber-400 animate-pulse" />
            <span>98.3 MHz</span>
          </div>
        </div>

        {/* Vintage Radio Dial Ruler */}
        <div className="relative mt-2.5 h-6 w-full overflow-hidden rounded-lg border border-amber-500/20 bg-neutral-950 px-2 flex items-center justify-between font-mono text-[0.55rem] text-amber-200/40">
          <span>88</span>
          <span>92</span>
          <span className="text-amber-400 font-bold">98.3</span>
          <span>102</span>
          <span>108</span>

          {/* Red Tuning Dial Needle */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 shadow-[0_0_8px_red] transition-all duration-150 ease-out"
            style={{ left: `${Math.min(95, 20 + tuningProgress * 0.75)}%` }}
          />
        </div>

        {/* Tuning Progress Meter */}
        <div className="mt-2.5 flex items-center justify-between gap-3 text-[0.68rem]">
          <span className="font-deva text-amber-200/80 truncate">
            {currentWorld.nameHindi} के अगले गाने प्री-लोड हो रहे हैं...
          </span>
          <span className="font-mono text-amber-400 font-bold tabular-nums">
            {Math.round(tuningProgress)}%
          </span>
        </div>

        {/* Thin Progress bar */}
        <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-150"
            style={{ width: `${tuningProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

