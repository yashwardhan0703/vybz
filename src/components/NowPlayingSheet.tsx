import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronDown,
  Heart,
  ListMusic,
  Loader2,
  Pause,
  Play,
  Plus,
  Repeat,
  Repeat1,
  Shuffle,
  SkipBack,
  SkipForward,
  Sparkles,
  Check,
  Share2,
} from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { formatTime, handleArtworkError, shareTrackOrApp } from '../utils/mediaHelpers';

interface NowPlayingSheetProps {
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (sec: number) => void;
  onPlayQueueIndex: (index: number) => void;
}

/**
 * Full-screen expandable Now Playing overlay for Mobile (with swipe gestures)
 * and Desktop/Tablet split view (Artwork + Controls alongside Live Up-Next Queue).
 */
export default function NowPlayingSheet({
  onPlay,
  onPause,
  onNext,
  onPrev,
  onSeek,
  onPlayQueueIndex,
}: NowPlayingSheetProps) {
  const {
    isNowPlayingOpen,
    setNowPlayingOpen,
    isPlaying,
    isLoading,
    isTuning,
    isShuffle,
    repeatMode,
    currentTime,
    duration,
    currentTrackId,
    trackTitle,
    trackArtist,
    trackThumbnail,
    trackIndex,
    currentWorld,
    viewMode,
    toggleViewMode,
    likedSongs,
    toggleLike,
    userPlaylists,
    addToPlaylist,
    playbackQueue,
    playbackQueueIndex,
    toggleShuffle,
    cycleRepeat,
  } = usePlayerStore();

  const [mobilePanel, setMobilePanel] = useState<'player' | 'queue'>('player');
  const [showPlaylistPicker, setShowPlaylistPicker] = useState(false);
  const [addedToPlaylistId, setAddedToPlaylistId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleShareCurrentTrack = async () => {
    const res = await shareTrackOrApp(displayTitle, displayArtist);
    if (res === 'copied') {
      setToastMessage('Link copied to clipboard!');
      setTimeout(() => setToastMessage(null), 2500);
    }
  };

  // Mobile gesture & browser back button integration
  useEffect(() => {
    if (!isNowPlayingOpen) return;
    if (!window.location.hash.includes('now-playing')) {
      window.history.pushState({ modal: 'now-playing' }, '', '#now-playing');
    }
    const onPopState = () => setNowPlayingOpen(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (window.location.hash.includes('now-playing')) {
          window.history.back();
        } else {
          setNowPlayingOpen(false);
        }
      }
    };
    window.addEventListener('popstate', onPopState);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('popstate', onPopState);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isNowPlayingOpen, setNowPlayingOpen]);

  const handleClose = useCallback(() => {
    setShowPlaylistPicker(false);
    if (window.location.hash.includes('now-playing')) {
      window.history.back();
    } else {
      setNowPlayingOpen(false);
    }
  }, [setNowPlayingOpen]);

  if (!isNowPlayingOpen) return null;

  const activeTrack = currentWorld.tracks?.[trackIndex] || currentWorld.tracks?.[0];
  const displayTitle =
    trackTitle && trackTitle !== 'Tuning in…'
      ? trackTitle
      : activeTrack?.title || currentWorld.nameHindi;
  const displayArtist = trackArtist || activeTrack?.artist || currentWorld.name;
  const displayThumbnail =
    trackThumbnail ||
    (activeTrack?.id ? `https://img.youtube.com/vi/${activeTrack.id}/mqdefault.jpg` : currentWorld.bg);

  const songId = currentTrackId || activeTrack?.id || 'song';
  const isLiked = likedSongs.some((s) => s.id === songId);
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const themeColor = viewMode === 'studio' ? '#f59e0b' : currentWorld.themeColor || '#fbbf24';

  const queueItems =
    playbackQueue.length > 0
      ? playbackQueue
      : (currentWorld.tracks || []).map((t) => ({
          id: t.id,
          title: t.title,
          artist: t.artist || currentWorld.name,
          thumbnail: `https://img.youtube.com/vi/${t.id}/mqdefault.jpg`,
        }));
  const activeQueueIndex =
    playbackQueue.length > 0 ? playbackQueueIndex : trackIndex;

  // Touch swipe handlers: swipe down to close, horizontal swipe on artwork to change track
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleArtworkTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dy) > 75 && dy > 0 && Math.abs(dy) > Math.abs(dx)) {
      handleClose();
      return;
    }
    if (Math.abs(dx) > 65 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) onNext();
      else onPrev();
    }
  };

  const handleHeaderTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    if (dy > 60) {
      handleClose();
    }
  };

  const handleSaveToPlaylist = (playlistId: string) => {
    addToPlaylist(playlistId, {
      id: songId,
      title: displayTitle,
      artist: displayArtist,
      thumbnail: displayThumbnail,
      duration: duration > 0 ? formatTime(duration) : undefined,
    });
    setAddedToPlaylistId(playlistId);
    setTimeout(() => {
      setAddedToPlaylistId(null);
      setShowPlaylistPicker(false);
    }, 650);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Now Playing Full Screen"
      className="fixed inset-0 z-50 flex flex-col bg-[#070a10] text-white animate-fade-in overflow-hidden"
    >
      {/* Subtle ambient background accent matching VYBZ identity */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background: `radial-gradient(circle at 50% 15%, ${themeColor}33, transparent 60%)`,
        }}
      />

      {/* Top Bar (Swipe down handle on mobile) */}
      <header
        onTouchStart={handleTouchStart}
        onTouchEnd={handleHeaderTouchEnd}
        className="relative z-10 flex items-center justify-between px-4 pt-[max(0.75rem,env(safe-area-inset-top))] pb-3 sm:px-8 border-b border-white/5 shrink-0"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Minimize Now Playing"
          className="grid size-10 place-items-center rounded-full bg-white/5 text-white/80 hover:bg-white/10 hover:text-white active:scale-95 transition-all"
        >
          <ChevronDown size={22} />
        </button>

        <div className="min-w-0 px-3 text-center">
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-amber-400">
            Now Playing • vybz
          </p>
          <p translate="no" className="notranslate truncate text-xs font-medium text-white/70">
            {viewMode === 'vibe' ? currentWorld.nameHindi : 'VYBZ Music Engine'}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Mobile Queue Toggle */}
          <button
            type="button"
            onClick={() => setMobilePanel((p) => (p === 'player' ? 'queue' : 'player'))}
            aria-label="Toggle Up Next Queue"
            className={`md:hidden grid size-10 place-items-center rounded-full border transition-all active:scale-95 ${
              mobilePanel === 'queue'
                ? 'border-amber-400/60 bg-amber-400/20 text-amber-300'
                : 'border-white/10 bg-white/5 text-white/80 hover:bg-white/10'
            }`}
          >
            <ListMusic size={18} />
          </button>

          {/* Switch to Ambient Vibe Mode */}
          <button
            type="button"
            onClick={() => {
              handleClose();
              toggleViewMode();
            }}
            aria-label="Toggle Vibe Mode"
            className="hidden sm:flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/15 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-400/25 transition-colors"
          >
            <Sparkles size={13} />
            <span>{viewMode === 'vibe' ? 'Discovery' : 'Vibe Mode'}</span>
          </button>
        </div>
      </header>

      {/* Main Content Area: Responsive Split on md+ and Full Proportional Height on Mobile */}
      <div className="relative z-10 flex-1 min-h-0 flex flex-col md:grid md:grid-cols-12 md:gap-8 px-4 py-3 sm:px-8 sm:py-6 pb-[max(1rem,env(safe-area-inset-bottom))] overflow-hidden">
        {/* LEFT / PLAYER PANEL (Proportionally filled on mobile, left column on desktop) */}
        <div
          className={`w-full md:col-span-6 lg:col-span-5 flex-1 min-h-0 flex-col justify-between max-w-md mx-auto ${
            mobilePanel === 'queue' ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Square Album Artwork - Expands proportionally to fill available vertical space */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleArtworkTouchEnd}
            className="flex-1 min-h-[170px] max-h-[48vh] flex items-center justify-center py-2 sm:py-4 select-none cursor-grab active:cursor-grabbing"
          >
            <div className="relative w-full max-w-[min(82vw,340px)] aspect-square overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
              <img
                src={displayThumbnail}
                alt={displayTitle}
                onError={handleArtworkError}
                className="size-full object-cover"
              />
            </div>
          </div>

          {/* Bottom Controls Area - Anchored cleanly at the bottom */}
          <div className="w-full shrink-0 space-y-3 sm:space-y-4 pt-1 pb-1">
            {/* Track Info + Like & Add to Playlist */}
            <div className="w-full flex items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <h2 translate="no" className="notranslate truncate text-lg sm:text-xl font-bold text-white leading-tight">
                  {displayTitle}
                </h2>
                <p translate="no" className="notranslate truncate text-xs sm:text-sm text-white/60 mt-0.5">
                  {displayArtist}
                </p>
              </div>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    toggleLike({
                      id: songId,
                      title: displayTitle,
                      artist: displayArtist,
                      thumbnail: displayThumbnail,
                      duration: duration > 0 ? formatTime(duration) : undefined,
                    })
                  }
                  aria-label={isLiked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}
                  className="grid size-10 place-items-center rounded-full text-white/65 hover:bg-white/5 hover:text-rose-500 active:scale-90 transition-all"
                >
                  <Heart size={22} className={isLiked ? 'fill-rose-500 text-rose-500' : ''} />
                </button>

                <button
                  type="button"
                  onClick={() => setShowPlaylistPicker((prev) => !prev)}
                  aria-label="Add to Playlist"
                  className="grid size-10 place-items-center rounded-full text-white/65 hover:bg-white/5 hover:text-amber-400 active:scale-90 transition-all"
                >
                  <Plus size={22} />
                </button>

                <button
                  type="button"
                  onClick={handleShareCurrentTrack}
                  aria-label="Share song"
                  title="Share to WhatsApp / Copy link"
                  className="grid size-10 place-items-center rounded-full text-white/65 hover:bg-white/5 hover:text-amber-400 active:scale-90 transition-all"
                >
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            {/* Toast Notification */}
            {toastMessage && (
              <div className="flex items-center justify-center">
                <span className="rounded-full bg-amber-400 px-3.5 py-1 text-xs font-bold text-black shadow-lg animate-fade-in">
                  {toastMessage}
                </span>
              </div>
            )}

            {/* Inline Quick Playlist Picker */}
            {showPlaylistPicker && (
              <div className="w-full rounded-2xl border border-white/10 bg-[#0e1420] p-3 shadow-xl">
                <p className="text-[0.7rem] font-semibold uppercase tracking-wider text-amber-400 mb-2">
                  Save to Playlist
                </p>
                {userPlaylists.length === 0 ? (
                  <p className="text-xs text-white/50 py-2">
                    No playlists yet. Create one from the Library tab!
                  </p>
                ) : (
                  <div className="max-h-32 space-y-1 overflow-y-auto">
                    {userPlaylists.map((pl) => (
                      <button
                        key={pl.id}
                        type="button"
                        onClick={() => handleSaveToPlaylist(pl.id)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium text-white/85 hover:bg-white/10 transition-colors"
                      >
                        <span className="truncate">{pl.name}</span>
                        {addedToPlaylistId === pl.id ? (
                          <Check size={14} className="text-emerald-400 shrink-0" />
                        ) : (
                          <span className="text-[0.65rem] text-white/40 shrink-0">
                            {pl.tracks.length} tracks
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Seek Bar */}
            <div className="w-full">
              <input
                type="range"
                min={0}
                max={duration > 0 ? Math.floor(duration) : 100}
                value={Math.min(Math.floor(currentTime), duration > 0 ? Math.floor(duration) : 100)}
                aria-label="Seek track"
                onChange={(e) => onSeek(Number(e.target.value))}
                className="world-range h-3 sm:h-4 w-full cursor-pointer"
                style={{
                  '--world-primary': themeColor,
                  '--range-progress': `${progress}%`,
                } as React.CSSProperties}
              />
              <div className="mt-1 flex items-center justify-between font-mono text-[0.68rem] tabular-nums text-white/50">
                <span>{formatTime(currentTime)}</span>
                <span>{duration > 0 ? formatTime(duration) : '0:00'}</span>
              </div>
            </div>

            {/* Playback Controls (Shuffle, Prev, Play/Pause, Next, Repeat) */}
            <div className="w-full flex items-center justify-between px-1 sm:px-3">
              <button
                type="button"
                onClick={toggleShuffle}
                aria-label="Toggle Shuffle"
                aria-pressed={isShuffle}
                className="grid size-11 place-items-center rounded-full hover:bg-white/5 active:scale-90 transition-all"
                style={{ color: isShuffle ? themeColor : 'rgba(255,255,255,0.65)' }}
              >
                <Shuffle size={20} />
              </button>

              <button
                type="button"
                onClick={onPrev}
                aria-label="Previous track"
                className="grid size-12 place-items-center rounded-full text-white hover:bg-white/5 active:scale-90 transition-all"
              >
                <SkipBack size={26} fill="currentColor" />
              </button>

              <button
                type="button"
                onClick={isPlaying ? onPause : onPlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="grid size-16 sm:size-[4.25rem] place-items-center rounded-full text-black shadow-[0_8px_30px_rgba(245,158,11,0.5)] hover:scale-105 active:scale-95 transition-all"
                style={{ backgroundColor: themeColor }}
              >
                {isLoading || isTuning ? (
                  <Loader2 size={28} className="animate-spin text-black" />
                ) : isPlaying ? (
                  <Pause size={28} fill="currentColor" />
                ) : (
                  <Play size={28} fill="currentColor" className="translate-x-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={onNext}
                aria-label="Next track"
                className="grid size-12 place-items-center rounded-full text-white hover:bg-white/5 active:scale-90 transition-all"
              >
                <SkipForward size={26} fill="currentColor" />
              </button>

              <button
                type="button"
                onClick={cycleRepeat}
                aria-label={`Repeat mode: ${repeatMode}`}
                className="grid size-11 place-items-center rounded-full hover:bg-white/5 active:scale-90 transition-all"
                style={{ color: repeatMode !== 'none' ? themeColor : 'rgba(255,255,255,0.65)' }}
              >
                {repeatMode === 'one' ? <Repeat1 size={20} /> : <Repeat size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT / UP-NEXT QUEUE PANEL */}
        <div
          className={`w-full md:col-span-6 lg:col-span-7 md:flex md:flex-col md:h-full md:max-h-[75dvh] rounded-2xl border border-white/10 bg-[#0b1019] p-3 sm:p-5 ${
            mobilePanel === 'queue' ? 'flex flex-col flex-1 min-h-0 h-full' : 'hidden md:flex'
          }`}
        >
            <div className="flex items-center justify-between pb-3 border-b border-white/10 shrink-0">
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-[0.2em] text-amber-400">
                  Up Next
                </p>
                <h3 className="text-base font-bold text-white mt-0.5">
                  Playing Queue ({queueItems.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setMobilePanel('player')}
                className="md:hidden rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 hover:bg-white/20"
              >
                Back to Player
              </button>
            </div>

            {queueItems.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center py-12 text-center text-white/40">
                <ListMusic size={32} className="mb-2" />
                <p className="text-sm">Queue is empty. Play a song to populate Up Next!</p>
              </div>
            ) : (
              <ul className="mt-3 flex-1 space-y-1.5 overflow-y-auto pr-1">
                {queueItems.map((track, idx) => {
                  const isActive = track.id === songId && idx === activeQueueIndex;
                  return (
                    <li key={`${track.id}-${idx}`}>
                      <button
                        type="button"
                        onClick={() => onPlayQueueIndex(idx)}
                        className={`flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors ${
                          isActive
                            ? 'border border-amber-400/40 bg-amber-400/15 text-white'
                            : 'text-white/75 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <span
                          className={`w-5 shrink-0 text-center font-mono text-xs tabular-nums ${
                            isActive ? 'font-bold text-amber-400' : 'text-white/35'
                          }`}
                        >
                          {isActive && isPlaying ? '▶' : idx + 1}
                        </span>

                        <div className="size-10 shrink-0 overflow-hidden rounded-lg bg-white/10 aspect-square">
                          <img
                            src={track.thumbnail || `https://img.youtube.com/vi/${track.id}/mqdefault.jpg`}
                            alt=""
                            loading="lazy"
                            onError={handleArtworkError}
                            className="size-full object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            translate="no"
                            className={`notranslate truncate text-xs sm:text-sm font-semibold ${
                              isActive ? 'text-amber-300' : 'text-white'
                            }`}
                          >
                            {track.title}
                          </p>
                          <p translate="no" className="notranslate truncate text-[0.68rem] text-white/50">
                            {track.artist}
                          </p>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
  );
}

