import { X, Play, FolderPlus, Music2, Sparkles } from 'lucide-react';
import type { StoredTrack } from '../utils/localStorageHelper';
import { handleArtworkError } from '../utils/mediaHelpers';

export interface SharedPlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  playlistName: string;
  tracks: StoredTrack[];
  onPlayAll: () => void;
  onSaveToLibrary: () => void;
}

export default function SharedPlaylistModal({
  isOpen,
  onClose,
  playlistName,
  tracks,
  onPlayAll,
  onSaveToLibrary,
}: SharedPlaylistModalProps) {
  if (!isOpen || !tracks || tracks.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-fade-in select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl border border-amber-400/40 bg-[#0d131f] p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.95)] max-h-[90dvh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-xl bg-amber-400/15 text-amber-400">
              <Sparkles size={14} />
            </span>
            <div>
              <h3 className="text-base font-bold text-white">Shared Playlist</h3>
              <p className="text-[11px] text-amber-300 font-medium">Friend shared a mix with you!</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-8 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X size={16} />
          </button>
        </div>

        {/* Playlist Info Banner */}
        <div className="my-4 flex items-center gap-3.5 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-3.5 shrink-0">
          <div className="size-14 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black/50">
            {tracks[0]?.thumbnail ? (
              <img
                src={tracks[0].thumbnail}
                alt=""
                onError={handleArtworkError}
                className="size-full object-cover"
              />
            ) : (
              <div className="grid size-full place-items-center text-amber-400">
                <Music2 size={24} />
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="truncate text-base font-bold text-white">{playlistName}</h4>
            <p className="text-xs text-white/60">{tracks.length} tracks included</p>
          </div>
        </div>

        {/* Scrollable Song List Preview */}
        <div className="flex-1 overflow-y-auto min-h-0 space-y-1.5 pr-1 my-1 max-h-56 divide-y divide-white/5">
          {tracks.slice(0, 20).map((t, idx) => (
            <div key={`${t.id}-${idx}`} className="flex items-center gap-2.5 py-2 px-1">
              <span className="w-5 font-mono text-[11px] text-white/40 text-center shrink-0">
                {idx + 1}
              </span>
              <div className="size-9 rounded-lg overflow-hidden bg-black/40 shrink-0">
                <img
                  src={t.thumbnail}
                  alt=""
                  onError={handleArtworkError}
                  className="size-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-white">{t.title}</p>
                <p className="truncate text-[10px] text-white/50">{t.artist}</p>
              </div>
            </div>
          ))}
          {tracks.length > 20 && (
            <p className="text-center text-[11px] text-white/40 py-1.5">
              + {tracks.length - 20} more tracks
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-3 border-t border-white/10 space-y-2 shrink-0">
          <button
            type="button"
            onClick={onPlayAll}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 py-3 text-sm font-bold text-black shadow-lg hover:brightness-110 active:scale-[0.98] transition cursor-pointer"
          >
            <Play size={16} fill="black" /> Play Playlist Now
          </button>

          <button
            type="button"
            onClick={onSaveToLibrary}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] py-2.5 text-xs font-semibold text-white hover:border-amber-400/40 hover:bg-white/[0.08] active:scale-[0.98] transition cursor-pointer"
          >
            <FolderPlus size={14} className="text-amber-400" /> Save to My Playlists
          </button>
        </div>
      </div>
    </div>
  );
}
