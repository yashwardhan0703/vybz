import { useEffect, useCallback, useRef } from 'react';
import {
  SkipBack,
  SkipForward,
  Play,
  Pause,
  Shuffle,
  Repeat,
  Repeat1,
  ListMusic,
  Loader2,
  Heart,
  Maximize2,
  ChevronUp,
  Share2,
} from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { usePlayerStore } from '../store/playerStore';
import { formatTime, handleArtworkError } from '../utils/mediaHelpers';
import { MiniProgressStrip, TrackSeekBar } from './TrackProgress';

interface BottomPlayerProps {
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (sec: number) => void;
}

export default function BottomPlayer({
  onPlay,
  onPause,
  onNext,
  onPrev,
  onSeek,
}: BottomPlayerProps) {
  const {
    isPlaying,
    isLoading,
    isTuning,
    isShuffle,
    repeatMode,
    volume,
    trackIndex,
    trackCount,
    currentTrackId,
    trackTitle,
    trackArtist,
    trackThumbnail,
    currentWorld,
    likedSongs,
    toggleLike,
    viewMode,
    toggleShuffle,
    cycleRepeat,
    setVolume,
    toggleMute,
    toggleTrackList,
    setNowPlayingOpen,
  } = usePlayerStore(
    useShallow((s) => ({
      isPlaying: s.isPlaying,
      isLoading: s.isLoading,
      isTuning: s.isTuning,
      isShuffle: s.isShuffle,
      repeatMode: s.repeatMode,
      volume: s.volume,
      trackIndex: s.trackIndex,
      trackCount: s.trackCount,
      currentTrackId: s.currentTrackId,
      trackTitle: s.trackTitle,
      trackArtist: s.trackArtist,
      trackThumbnail: s.trackThumbnail,
      currentWorld: s.currentWorld,
      likedSongs: s.likedSongs,
      toggleLike: s.toggleLike,
      viewMode: s.viewMode,
      toggleShuffle: s.toggleShuffle,
      cycleRepeat: s.cycleRepeat,
      setVolume: s.setVolume,
      toggleMute: s.toggleMute,
      toggleTrackList: s.toggleTrackList,
      setNowPlayingOpen: s.setNowPlayingOpen,
    }))
  );

  const touchStartYRef = useRef<number | null>(null);
  const themeColor = viewMode === 'studio' ? '#f59e0b' : currentWorld.themeColor || '#fbbf24';

  // Global desktop keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (isPlaying) onPause();
        else onPlay();
      } else if (e.code === 'KeyM') {
        e.preventDefault();
        toggleMute();
      } else if (e.code === 'ArrowRight' && !e.shiftKey) {
        e.preventDefault();
        onNext();
      } else if (e.code === 'ArrowLeft' && !e.shiftKey) {
        e.preventDefault();
        onPrev();
      } else if (e.code === 'ArrowUp') {
        e.preventDefault();
        setVolume(Math.min(100, volume + 5));
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        setVolume(Math.max(0, volume - 5));
      }
    },
    [isPlaying, onPause, onPlay, toggleMute, onNext, onPrev, setVolume, volume]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const activeTrack = currentWorld.tracks?.[trackIndex] || currentWorld.tracks?.[0];
  const displayTitle =
    trackTitle && trackTitle !== 'Tuning in…'
      ? trackTitle
      : activeTrack?.title || currentWorld.nameHindi;
  const displayArtist =
    trackArtist ||
    activeTrack?.artist ||
    `${currentWorld.name} • ${trackIndex + 1}/${trackCount || currentWorld.tracks?.length || 5}`;
  const displayThumbnail =
    trackThumbnail ||
    (activeTrack?.id ? `https://img.youtube.com/vi/${activeTrack.id}/mqdefault.jpg` : currentWorld.bg);

  const songId = currentTrackId || activeTrack?.id || 'song';
  const isLiked = likedSongs.some((s) => s.id === songId);

  const handleToggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const curDuration = usePlayerStore.getState().duration;
    toggleLike({
      id: songId,
      title: displayTitle,
      artist: displayArtist,
      thumbnail: displayThumbnail,
      duration: curDuration > 0 ? formatTime(curDuration) : undefined,
    });
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    usePlayerStore.getState().openShareModal({
      title: displayTitle,
      artist: displayArtist,
      artworkUrl: displayThumbnail,
    });
  };

  return (
    <section
      aria-label="Now playing"
      className="relative z-40 shrink-0 border-t border-white/10 bg-[#090d14]/95 backdrop-blur-xl select-none"
    >
      {/* ========================================================
          MOBILE COMPACT MINI-PLAYER (< 768px) — Tap or swipe up to expand
         ======================================================== */}
      <div
        className={`md:hidden relative ${viewMode === 'vibe' ? 'pb-[max(0.75rem,env(safe-area-inset-bottom))]' : ''}`}
        onTouchStart={(e) => {
          touchStartYRef.current = e.touches[0].clientY;
        }}
        onTouchEnd={(e) => {
          if (touchStartYRef.current === null) return;
          const dy = e.changedTouches[0].clientY - touchStartYRef.current;
          touchStartYRef.current = null;
          if (dy < -40) {
            setNowPlayingOpen(true);
          }
        }}
      >
        {/* Top thin progress track */}
        <MiniProgressStrip themeColor={themeColor} />

        <div className="flex items-center justify-between gap-2 px-3 py-2">
          {/* Left: Tappable track trigger to open Full-Screen Now Playing */}
          <button
            type="button"
            onClick={() => setNowPlayingOpen(true)}
            aria-label="Expand Now Playing"
            className="flex flex-1 min-w-0 items-center gap-2.5 text-left active:opacity-80"
          >
            <div className="size-10 shrink-0 overflow-hidden rounded-lg bg-white/10 aspect-square shadow">
              <img
                src={displayThumbnail}
                alt=""
                onError={handleArtworkError}
                className="size-full object-cover"
              />
            </div>

            <div className="min-w-0 flex-1">
              <p translate="no" className="notranslate truncate text-xs font-semibold text-white leading-tight">
                {displayTitle}
              </p>
              <p translate="no" className="notranslate truncate text-[0.65rem] text-white/55 mt-0.5">
                {displayArtist}
              </p>
            </div>
          </button>

          {/* Right: Touch-friendly controls (Like, Prev, Play/Pause, Next, Expand) */}
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              type="button"
              onClick={handleToggleLike}
              aria-label={isLiked ? 'Unlike song' : 'Like song'}
              className="grid size-9 place-items-center rounded-full text-white/60 hover:text-rose-500 active:scale-95 transition-all"
            >
              <Heart size={16} className={isLiked ? 'fill-rose-500 text-rose-500' : ''} />
            </button>

            {/* Back / Previous Song (compact on small screens, expanded on xs+) */}
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous track"
              className="hidden xs:grid size-9 place-items-center rounded-full text-white/80 hover:text-white active:scale-95 transition-all"
              title="Previous Song"
            >
              <SkipBack size={16} fill="currentColor" />
            </button>

            {/* Play / Pause */}
            <button
              type="button"
              onClick={isPlaying ? onPause : onPlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="grid size-10 place-items-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-[0_3px_12px_rgba(245,158,11,0.4)] active:scale-95 transition-all"
            >
              {isLoading || isTuning ? (
                <Loader2 size={16} className="animate-spin text-black" />
              ) : isPlaying ? (
                <Pause size={16} fill="currentColor" />
              ) : (
                <Play size={16} fill="currentColor" className="translate-x-0.5" />
              )}
            </button>

            {/* Next Song */}
            <button
              type="button"
              onClick={onNext}
              aria-label="Next track"
              className="grid size-9 place-items-center rounded-full text-white/80 hover:text-white active:scale-95 transition-all"
              title="Next Song"
            >
              <SkipForward size={16} fill="currentColor" />
            </button>

            {/* Open Full Player Sheet (compact on small screens, full bar tap expands on all) */}
            <button
              type="button"
              onClick={() => setNowPlayingOpen(true)}
              aria-label="Open Full Player"
              className="hidden xs:grid size-8 place-items-center rounded-full text-white/45 hover:text-white active:scale-95"
              title="Expand Player"
            >
              <ChevronUp size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          TABLET & DESKTOP PERSISTENT PLAYER BAR (>= 768px)
         ======================================================== */}
      <div className="hidden md:grid grid-cols-12 items-center gap-4 px-5 py-2.5 lg:px-7">
        {/* Left Zone (30%): Artwork + Info + Like */}
        <div className="col-span-4 lg:col-span-3 flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setNowPlayingOpen(true)}
            aria-label="Expand Now Playing"
            className="group relative size-12 shrink-0 overflow-hidden rounded-xl bg-white/10 aspect-square shadow-md"
          >
            <img
              src={displayThumbnail}
              alt=""
              onError={handleArtworkError}
              className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          <div className="min-w-0 flex-1">
            <button
              type="button"
              onClick={() => setNowPlayingOpen(true)}
              className="block w-full text-left"
            >
              <p translate="no" className="notranslate truncate text-sm font-semibold text-white hover:text-amber-300 transition-colors">
                {displayTitle}
              </p>
            </button>
            <p translate="no" className="notranslate truncate text-[0.72rem] text-white/55 mt-0.5">
              {displayArtist}
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleLike}
            aria-label={isLiked ? 'Remove from Liked Songs' : 'Save to Liked Songs'}
            className="grid size-8 shrink-0 place-items-center rounded-full text-white/45 hover:bg-white/5 hover:text-rose-500 transition-colors"
          >
            <Heart size={16} className={isLiked ? 'fill-rose-500 text-rose-500' : ''} />
          </button>
        </div>

        {/* Center Zone (40–50%): Playback Controls + Seekbar */}
        <div className="col-span-5 lg:col-span-6 flex flex-col items-center">
          <div className="flex items-center gap-3 lg:gap-4">
            <button
              type="button"
              onClick={toggleShuffle}
              aria-label="Shuffle"
              aria-pressed={isShuffle}
              className="grid size-8 place-items-center rounded-full text-white/60 hover:bg-white/5 hover:text-white transition-colors"
              style={{ color: isShuffle ? themeColor : undefined }}
            >
              <Shuffle size={15} />
            </button>

            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous track"
              className="grid size-8 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white active:scale-95 transition-all"
            >
              <SkipBack size={17} fill="currentColor" />
            </button>

            <button
              type="button"
              onClick={isPlaying ? onPause : onPlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="grid size-11 place-items-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-[0_4px_18px_rgba(245,158,11,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              {isLoading || isTuning ? (
                <Loader2 size={18} className="animate-spin text-black" />
              ) : isPlaying ? (
                <Pause size={18} fill="currentColor" />
              ) : (
                <Play size={18} fill="currentColor" className="translate-x-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={onNext}
              aria-label="Next track"
              className="grid size-8 place-items-center rounded-full text-white/80 hover:bg-white/10 hover:text-white active:scale-95 transition-all"
            >
              <SkipForward size={17} fill="currentColor" />
            </button>

            <button
              type="button"
              onClick={cycleRepeat}
              aria-label={`Repeat: ${repeatMode}`}
              className="grid size-8 place-items-center rounded-full text-white/60 hover:bg-white/5 hover:text-white transition-colors"
              style={{ color: repeatMode !== 'none' ? themeColor : undefined }}
            >
              {repeatMode === 'one' ? <Repeat1 size={15} /> : <Repeat size={15} />}
            </button>
          </div>

          <TrackSeekBar themeColor={themeColor} onSeek={onSeek} variant="bar" />
        </div>

        {/* Right Zone (25%): Queue, Volume, Expand */}
        <div className="col-span-3 flex items-center justify-end gap-2 lg:gap-3">
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share current song"
            title="Share to WhatsApp / Copy link"
            className="grid size-8 place-items-center rounded-lg text-white/65 hover:bg-white/10 hover:text-amber-400 transition-colors"
          >
            <Share2 size={16} />
          </button>

          <button
            type="button"
            onClick={toggleTrackList}
            aria-label="Open Up Next Queue"
            title="Queue"
            className="grid size-8 place-items-center rounded-lg text-white/65 hover:bg-white/10 hover:text-white transition-colors"
          >
            <ListMusic size={17} />
          </button>

          <button
            type="button"
            onClick={() => setNowPlayingOpen(true)}
            aria-label="Expand Full Screen Player"
            title="Now Playing"
            className="grid size-8 place-items-center rounded-lg text-white/65 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Maximize2 size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
