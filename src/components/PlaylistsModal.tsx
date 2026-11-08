import { useEffect, useCallback } from 'react';
import { X, Check } from 'lucide-react';
import { THEMES } from '../data/worlds';
import { usePlayerStore } from '../store/playerStore';

export default function PlaylistsModal() {
  const { currentWorldId, setWorld, toggleWorldSwitcher, isWorldSwitcherOpen } = usePlayerStore();

  // Mobile gesture & browser back button handling
  useEffect(() => {
    if (!isWorldSwitcherOpen) return;
    if (!window.location.hash.includes('themes')) {
      window.history.pushState({ modal: 'themes' }, '', '#themes');
    }

    const handlePopState = () => {
      toggleWorldSwitcher();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isWorldSwitcherOpen, toggleWorldSwitcher]);

  const handleClose = useCallback(() => {
    if (window.location.hash.includes('themes')) {
      window.history.back();
    } else {
      toggleWorldSwitcher();
    }
  }, [toggleWorldSwitcher]);

  if (!isWorldSwitcherOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-label="Choose a theme playlist"
        className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-md -translate-y-1/2 rounded-2xl border border-white/10 bg-[#0e1215]/95 p-5 shadow-[0_25px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:p-6"
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <h2 className="font-deva text-xl font-bold text-white">
              थीम प्लेलिस्ट (PlayLists)
            </h2>
            <p className="text-xs text-white/50 mt-0.5">
              Select your ambient mood
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close playlists modal"
            className="grid size-8 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Themes Grid */}
        <div className="mt-4 space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {THEMES.map((theme) => {
            const isActive = theme.id === currentWorldId;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => {
                  if (theme.id !== currentWorldId) {
                    setWorld(theme.id);
                  }
                  toggleWorldSwitcher();
                }}
                className={`w-full flex items-center justify-between gap-3 rounded-xl border p-3 text-left transition-all ${
                  isActive
                    ? 'border-teal-400/80 bg-teal-400/15 shadow-[0_0_20px_rgba(45,212,191,0.15)]'
                    : 'border-white/5 bg-white/[0.03] hover:border-white/15 hover:bg-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="size-10 rounded-lg shrink-0 border border-white/10 overflow-hidden shadow"
                    style={{ backgroundColor: theme.themeColor }}
                  >
                    <img
                      src={theme.bg}
                      alt=""
                      className="size-full object-cover opacity-80"
                    />
                  </div>

                  <div className="min-w-0">
                    <span translate="no" className="notranslate block font-deva text-base font-bold text-white leading-tight">
                      {theme.nameHindi}
                    </span>
                    <span className="block text-[0.68rem] text-white/50 truncate font-mono">
                      {theme.subtitle}
                    </span>
                  </div>
                </div>

                {isActive && (
                  <span className="size-6 rounded-full bg-teal-400 grid place-items-center text-black shrink-0">
                    <Check size={14} strokeWidth={3} />
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

