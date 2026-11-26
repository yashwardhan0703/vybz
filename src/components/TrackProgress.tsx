import { useShallow } from 'zustand/react/shallow';
import { usePlayerStore } from '../store/playerStore';
import { formatTime } from '../utils/mediaHelpers';

interface MiniProgressStripProps {
  themeColor: string;
}

/**
 * Isolated 2px top progress bar for BottomPlayer so 250ms currentTime ticks
 * never re-render the rest of BottomPlayer.
 */
export function MiniProgressStrip({ themeColor }: MiniProgressStripProps) {
  const { currentTime, duration } = usePlayerStore(
    useShallow((s) => ({ currentTime: s.currentTime, duration: s.duration }))
  );
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <div className="h-[2px] w-full bg-white/10">
      <div
        className="h-full transition-[width] duration-200"
        style={{ width: `${progress}%`, backgroundColor: themeColor }}
      />
    </div>
  );
}

interface TrackSeekBarProps {
  themeColor: string;
  onSeek: (sec: number) => void;
  variant?: 'bar' | 'sheet';
}

/**
 * Isolated seek bar + time labels so 250ms playback progress ticks only repaint
 * the range input and clock digits.
 */
export function TrackSeekBar({ themeColor, onSeek, variant = 'bar' }: TrackSeekBarProps) {
  const { currentTime, duration } = usePlayerStore(
    useShallow((s) => ({ currentTime: s.currentTime, duration: s.duration }))
  );
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const maxDur = duration > 0 ? Math.floor(duration) : 100;
  const clampedCur = Math.min(Math.floor(currentTime), maxDur);

  if (variant === 'sheet') {
    return (
      <div className="w-full">
        <input
          type="range"
          min={0}
          max={maxDur}
          value={clampedCur}
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
    );
  }

  return (
    <div className="mt-1.5 flex w-full max-w-lg items-center gap-2.5">
      <span className="min-w-8 text-right font-mono text-[0.65rem] tabular-nums text-white/50">
        {formatTime(currentTime)}
      </span>
      <input
        type="range"
        min={0}
        max={maxDur}
        value={clampedCur}
        aria-label="Seek track"
        onChange={(e) => onSeek(Number(e.target.value))}
        className="world-range h-3 flex-1 cursor-pointer"
        style={{
          '--world-primary': themeColor,
          '--range-progress': `${progress}%`,
        } as React.CSSProperties}
      />
      <span className="min-w-8 font-mono text-[0.65rem] tabular-nums text-white/50">
        {duration > 0 ? formatTime(duration) : '0:00'}
      </span>
    </div>
  );
}
