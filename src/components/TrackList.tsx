import { useEffect, useCallback } from 'react';
import { X, Music } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';

interface TrackListProps {
  onPlayAt: (index: number) => void;
}

export default function TrackList({ onPlayAt }: TrackListProps) {
  const { isTrackListOpen, toggleTrackList, trackIndex, currentWorld, isPlaying } = usePlayerStore();

  // Mobile gesture & browser back button handling
  useEffect(() => {
    if (!isTrackListOpen) return;
    if (!window.location.hash.includes('queue')) {
      window.history.pushState({ modal: 'queue' }, '', '#queue');
    }

    const handlePopState = () => {
      toggleTrackList();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isTrackListOpen, toggleTrackList]);

  const handleClose = useCallback(() => {
    if (window.location.hash.includes('queue')) {
      window.history.back();
    } else {
      toggleTrackList();
    }
  }, [toggleTrackList]);

  if (!isTrackListOpen) return null;

  const tracks = currentWorld.tracks || [];
  const themeColor = currentWorld.themeColor || '#2dd4bf';

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-label="Track list"
        className="fixed inset-x-0 bottom-0 z-50 max-h-[75dvh] overflow-y-auto rounded-t-3xl bg-[#0c1013]/95 px-4 pb-8 pt-5 backdrop-blur-2xl border-t border-white/10 shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.95)]"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.26em] text-teal-400">
              Now in Queue
            </p>
            <h2 translate="no" className="notranslate mt-0.5 font-deva text-lg font-bold text-white">
              {currentWorld.nameHindi}
              <span className="ml-2 font-mono text-xs font-normal text-white/40">
                {tracks.length} tracks
              </span>
            </h2>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close track list"
            className="grid size-9 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {tracks.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12 text-white/40">
            <Music size={36} aria-hidden="true" />
            <p className="text-sm">Press Play to load tracks</p>
          </div>
        ) : (
          <ul className="space-y-1.5">
            {tracks.map((track, i) => {
              const isActive = i === trackIndex;
              return (
                <li key={`${currentWorld.id}-${track.id}-${i}`}>
                  <button
                    type="button"
                    onClick={() => {
                      onPlayAt(i);
                      toggleTrackList();
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                      isActive
                        ? 'bg-white/10 text-white border border-teal-400/40 shadow-sm'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span
                      className={`w-6 shrink-0 font-mono text-xs tabular-nums ${
                        isActive ? 'text-teal-400 font-bold' : 'text-white/30'
                      }`}
                    >
                      {isActive && isPlaying ? '▶' : i + 1}
                    </span>

                    {/* Thumbnail */}
                    <div className="size-9 shrink-0 overflow-hidden rounded bg-white/10">
                      <img
                        src={`https://img.youtube.com/vi/${track.id}/default.jpg`}
                        alt=""
                        className="size-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = currentWorld.bg;
                        }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p translate="no" className={`notranslate truncate text-sm ${isActive ? 'font-semibold text-white' : 'text-white/90'}`}>
                        {track.title}
                      </p>
                      {track.artist && (
                        <p translate="no" className="notranslate truncate text-xs text-white/50">
                          {track.artist}
                        </p>
                      )}
                    </div>

                    {isActive && (
                      <span className="shrink-0">
                        <span className="flex items-end gap-0.5 h-4">
                          {[0, 1, 2].map((b) => (
                            <span
                              key={b}
                              className="w-0.5 rounded-sm"
                              style={{
                                backgroundColor: themeColor,
                                animation: isPlaying ? `bar-dance 0.8s ease-in-out infinite` : 'none',
                                animationDelay: `${b * 0.2}s`,
                                height: isPlaying ? '100%' : '40%',
                              }}
                            />
                          ))}
                        </span>
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
