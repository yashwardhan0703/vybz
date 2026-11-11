import { useEffect, useCallback } from 'react';
import { X, Music } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { handleArtworkError } from '../utils/mediaHelpers';

interface TrackListProps {
  onPlayAt: (index: number) => void;
}

export default function TrackList({ onPlayAt }: TrackListProps) {
  const {
    isTrackListOpen,
    toggleTrackList,
    trackIndex,
    currentWorld,
    isPlaying,
    playbackQueue,
    playbackQueueIndex,
    currentTrackId,
    viewMode,
  } = usePlayerStore();

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

  const tracks =
    playbackQueue.length > 0
      ? playbackQueue
      : (currentWorld.tracks || []).map((t) => ({
          id: t.id,
          title: t.title,
          artist: t.artist || currentWorld.name,
          thumbnail: `https://img.youtube.com/vi/${t.id}/mqdefault.jpg`,
        }));
  const activeIdx = playbackQueue.length > 0 ? playbackQueueIndex : trackIndex;
  const themeColor = viewMode === 'studio' ? '#f59e0b' : currentWorld.themeColor || '#2dd4bf';

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
        className="fixed inset-x-0 bottom-0 md:inset-x-auto md:right-6 md:bottom-24 md:w-[420px] z-50 max-h-[78dvh] md:max-h-[65dvh] overflow-y-auto rounded-t-3xl md:rounded-2xl bg-[#0c1017]/98 px-4 pb-[max(2rem,env(safe-area-inset-bottom))] md:pb-5 pt-5 backdrop-blur-2xl border-t md:border border-white/10 shadow-[0_-20px_60px_-10px_rgba(0,0,0,0.95)]"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.26em] text-amber-400">
              Now in Queue
            </p>
            <h2 translate="no" className="notranslate mt-0.5 font-deva text-lg font-bold text-white">
              {playbackQueue.length > 0 ? 'Up Next' : currentWorld.nameHindi}
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
              const isActive =
                i === activeIdx || (currentTrackId && track.id === currentTrackId && i === activeIdx);
              return (
                <li key={`${track.id}-${i}`}>
                  <button
                    type="button"
                    onClick={() => {
                      onPlayAt(i);
                      handleClose();
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${
                      isActive
                        ? 'bg-amber-400/15 text-white border border-amber-400/40 shadow-sm'
                        : 'text-white/75 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span
                      className={`w-6 shrink-0 font-mono text-xs tabular-nums ${
                        isActive ? 'text-amber-400 font-bold' : 'text-white/30'
                      }`}
                    >
                      {isActive && isPlaying ? '▶' : i + 1}
                    </span>

                    {/* Thumbnail */}
                    <div className="size-10 shrink-0 overflow-hidden rounded-lg bg-white/10 aspect-square">
                      <img
                        src={track.thumbnail || `https://img.youtube.com/vi/${track.id}/mqdefault.jpg`}
                        alt=""
                        loading="lazy"
                        className="size-full object-cover"
                        onError={handleArtworkError}
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
