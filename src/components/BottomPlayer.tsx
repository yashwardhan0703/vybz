import { useEffect, useCallback } from 'react';
import {
  SkipBack, SkipForward, Play, Pause, Shuffle, Repeat, Repeat1,
  Volume2, VolumeX, ListMusic, Loader2, Heart,
} from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';

interface BottomPlayerProps {
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSeek: (sec: number) => void;
}

function fmt(sec: number) {
  if (!isFinite(sec) || sec <= 0) return '0:00';
  const total = Math.floor(sec);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = (total % 60).toString().padStart(2, '0');
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s}`;
  }
  return `${m}:${s}`;
}

export default function BottomPlayer({ onPlay, onPause, onNext, onPrev, onSeek }: BottomPlayerProps) {
  const {
    isPlaying, isLoading, isTuning,
    isShuffle, repeatMode,
    volume, isMuted,
    currentTime, duration,
    trackIndex, trackCount,
    currentTrackId,
    trackTitle, trackArtist, trackThumbnail,
    currentWorld,
    likedSongs, toggleLike,
    viewMode,
    toggleShuffle, cycleRepeat,
    setVolume, toggleMute,
    toggleTrackList,
  } = usePlayerStore();

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const themeColor = viewMode === 'studio' ? '#f59e0b' : (currentWorld.themeColor || '#fbbf24');

  // Keyboard shortcuts
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (isPlaying) {
          onPause();
        } else {
          onPlay();
        }
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
  const displayTitle = trackTitle && trackTitle !== 'Tuning in…' ? trackTitle : activeTrack?.title || currentWorld.nameHindi;
  const displayArtist = trackArtist || activeTrack?.artist || `${currentWorld.name} • ${trackIndex + 1}/${trackCount || currentWorld.tracks?.length || 5}`;
  const displayThumbnail = trackThumbnail || (activeTrack?.id ? `https://img.youtube.com/vi/${activeTrack.id}/mqdefault.jpg` : currentWorld.bg);

  return (
    <div
      aria-label="Now playing"
      className="absolute inset-x-0 bottom-2.5 sm:bottom-4 z-40 px-2 sm:px-6 flex justify-center select-none pointer-events-none"
    >
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0c1017]/95 backdrop-blur-md p-2.5 sm:p-3.5 shadow-2xl pointer-events-auto">

        {/* Top Section: Track Info & Playback Controls */}
        <div className="flex items-center justify-between gap-2 sm:gap-3">
          {/* Left: Thumbnail & Song Info */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <div className="relative size-10 sm:size-12 shrink-0 overflow-hidden rounded-lg bg-white/10 shadow-md">
              <img
                src={displayThumbnail}
                alt=""
                className="size-full object-cover"
                onError={(e) => {
                  const el = e.currentTarget;
                  el.onerror = null;
                  el.src = currentWorld.bg;
                }}
              />
            </div>

            <div className="min-w-0 flex-1">
              <p translate="no" className="notranslate truncate text-xs sm:text-sm font-semibold text-white leading-snug">
                {displayTitle}
              </p>
              <p translate="no" className="notranslate truncate text-[0.62rem] sm:text-[0.68rem] text-white/50 mt-0.5">
                {displayArtist}
              </p>
            </div>

            {/* Like / Favorite Button */}
            <button
              type="button"
              onClick={() => {
                const songId = currentTrackId || activeTrack?.id || 'song';
                toggleLike({
                  id: songId,
                  title: displayTitle,
                  artist: displayArtist,
                  thumbnail: displayThumbnail,
                  duration: duration > 0 ? fmt(duration) : undefined,
                });
              }}
              aria-label="Save to Liked Songs"
              className="p-1 sm:p-1.5 text-white/40 hover:text-rose-500 transition-colors shrink-0"
            >
              <Heart
                size={15}
                className={
                  likedSongs.some((s) => s.id === (currentTrackId || activeTrack?.id))
                    ? 'fill-rose-500 text-rose-500'
                    : ''
                }
              />
            </button>
          </div>

          {/* Right: Previous, Circular Teal Play/Pause, Next */}
          <div className="flex shrink-0 items-center gap-0.5 sm:gap-2">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous track"
              className="grid size-8 sm:size-9 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white active:scale-95"
            >
              <SkipBack size={16} fill="currentColor" />
            </button>

            {/* Circular Mint/Teal Play Button */}
            <button
              type="button"
              onClick={isPlaying ? onPause : onPlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="grid size-10 sm:size-12 place-items-center rounded-full text-black shadow-[0_4px_20px_rgba(245,158,11,0.4)] transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: themeColor }}
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
              className="grid size-8 sm:size-9 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white active:scale-95"
            >
              <SkipForward size={16} fill="currentColor" />
            </button>
          </div>
        </div>

        {/* Middle Section: Seek Bar with exact timestamps */}
        <div className="mt-2 sm:mt-2.5 flex items-center gap-2">
          <span className="min-w-6 sm:min-w-7 font-mono text-[0.58rem] sm:text-[0.62rem] tabular-nums text-white/50">
            {fmt(currentTime)}
          </span>

          <input
            type="range"
            min={0}
            max={duration > 0 ? Math.floor(duration) : 100}
            value={Math.min(Math.floor(currentTime), duration > 0 ? Math.floor(duration) : 100)}
            aria-label="Seek track"
            onChange={(e) => onSeek(Number(e.target.value))}
            className="world-range h-3.5 sm:h-4 flex-1 cursor-pointer"
            style={{
              '--world-primary': themeColor,
              '--range-progress': `${progress}%`,
            } as React.CSSProperties}
          />

          <span className="min-w-7 sm:min-w-8 text-right font-mono text-[0.58rem] sm:text-[0.62rem] tabular-nums text-white/50">
            {duration > 0 ? fmt(duration) : '0:00'}
          </span>
        </div>

        {/* Bottom Section: Tracks, Shuffle, Repeat, Volume */}
        <div className="mt-1.5 sm:mt-2 flex items-center justify-between border-t border-white/5 pt-1.5 sm:pt-2 text-[0.62rem] sm:text-[0.68rem] text-white/70">
          <div className="flex items-center gap-2.5 sm:gap-6">
            {/* Tracks */}
            <button
              type="button"
              onClick={toggleTrackList}
              className="flex items-center gap-1 sm:gap-1.5 hover:text-white transition-colors"
            >
              <ListMusic size={13} />
              <span className="hidden xs:inline">Tracks</span>
            </button>

            {/* Shuffle */}
            <button
              type="button"
              onClick={toggleShuffle}
              className={`flex items-center gap-1 sm:gap-1.5 transition-colors ${
                isShuffle ? 'font-semibold' : 'hover:text-white'
              }`}
              style={{ color: isShuffle ? themeColor : undefined }}
            >
              <Shuffle size={13} />
              <span className="hidden xs:inline">Shuffle</span>
            </button>

            {/* Repeat */}
            <button
              type="button"
              onClick={cycleRepeat}
              className={`flex items-center gap-1 sm:gap-1.5 transition-colors ${
                repeatMode !== 'none' ? 'font-semibold' : 'hover:text-white'
              }`}
              style={{ color: repeatMode !== 'none' ? themeColor : undefined }}
            >
              {repeatMode === 'one' ? <Repeat1 size={13} /> : <Repeat size={13} />}
              <span className="hidden xs:inline">Repeat</span>
            </button>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={isMuted ? 0 : volume}
              aria-label="Volume"
              onChange={(e) => setVolume(Number(e.target.value))}
              className="world-range h-3 w-12 sm:w-20 cursor-pointer"
              style={{
                '--world-primary': themeColor,
                '--range-progress': `${isMuted ? 0 : volume}%`,
              } as React.CSSProperties}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

