import { X, Radio } from 'lucide-react';
import { WORLDS } from '../data/worlds';
import { usePlayerStore } from '../store/playerStore';

export default function WorldSwitcher() {
  const { currentWorldId, setWorld, toggleWorldSwitcher, isWorldSwitcherOpen } = usePlayerStore();

  if (!isWorldSwitcherOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={toggleWorldSwitcher}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-label="Choose a salon station"
        className="fixed inset-x-0 bottom-0 z-50 max-h-[82dvh] overflow-y-auto rounded-t-3xl bg-[#120d09]/95 px-4 pb-8 pt-5 backdrop-blur-2xl border-t border-amber-500/20 shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.95)]"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <Radio size={14} />
              <span>डीलक्स सैलून रेडियो</span>
            </div>
            <h2 className="mt-0.5 font-deva text-xl font-bold text-white">
              सैलून स्टेशन्स (Stations)
            </h2>
          </div>
          <button
            onClick={toggleWorldSwitcher}
            aria-label="Close salon stations"
            className="grid size-10 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {WORLDS.map((w) => {
            const isActive = w.id === currentWorldId;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => {
                  if (w.id !== currentWorldId) {
                    setWorld(w.id);
                  }
                  toggleWorldSwitcher();
                }}
                className={`flex items-center gap-3.5 rounded-2xl border p-3.5 text-left transition-all active:scale-[0.98] ${
                  isActive
                    ? 'border-amber-400/80 bg-amber-400/15 shadow-[0_0_20px_rgba(251,191,36,0.15)]'
                    : 'border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.08]'
                }`}
                style={{
                  '--world-primary': w.themeColor,
                } as React.CSSProperties}
              >
                {/* Station Badge */}
                <div
                  className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/10 text-xl font-bold shadow-md"
                  style={{ background: w.themeColor }}
                  aria-hidden="true"
                >
                  ✂️
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="block font-deva text-base font-bold text-white">
                      {w.nameHindi}
                    </span>
                    <span className="text-xs text-white/50">
                      ({w.name})
                    </span>
                  </div>
                  <span className="block truncate font-deva text-xs text-white/60">
                    {w.tagline}
                  </span>
                </div>

                {isActive && (
                  <span className="shrink-0 rounded-full bg-amber-400/20 px-2 py-0.5 font-deva text-[0.65rem] font-bold text-amber-300">
                    चालू है ▶
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
