import { useState } from 'react';
import { Scissors, Zap, Wind, Droplets, Volume2 } from 'lucide-react';
import { salonAudio } from '../utils/salonAudio';

interface AmbientMixerProps {
  onTriggerSnip?: () => void;
  onTriggerSpray?: () => void;
}

export default function AmbientMixer({ onTriggerSnip, onTriggerSpray }: AmbientMixerProps) {
  const [isTrimmerOn, setIsTrimmerOn] = useState(salonAudio.isTrimmerActive);
  const [isFanOn, setIsFanOn] = useState(salonAudio.isFanActive);
  const [trimmerVol, setTrimmerVol] = useState(salonAudio.trimmerVolume);
  const [showControls, setShowControls] = useState(false);

  const handleSnip = () => {
    salonAudio.playScissorSnip();
    onTriggerSnip?.();
  };

  const handleSpray = () => {
    salonAudio.playWaterSpray();
    onTriggerSpray?.();
  };

  const toggleTrimmer = () => {
    const active = salonAudio.toggleTrimmer();
    setIsTrimmerOn(active);
  };

  const toggleFan = () => {
    const active = salonAudio.toggleFan();
    setIsFanOn(active);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Quick Action Sound Pills */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {/* Scissor Snip Button */}
        <button
          type="button"
          onClick={handleSnip}
          aria-label="Snip scissors sound"
          className="group flex items-center gap-1.5 rounded-full border border-world-fg/15 bg-black/40 px-3 py-1.5 text-xs text-world-fg/80 backdrop-blur-md transition-all active:scale-90 hover:bg-world-fg/10 hover:text-world-fg"
          title="Play scissor snip (कैंची की कट-कट)"
        >
          <Scissors size={14} className="transition-transform group-hover:rotate-45 text-amber-400" />
          <span className="font-deva text-[0.78rem]">कैंची कट-कट</span>
        </button>

        {/* Trimmer Buzz Button */}
        <button
          type="button"
          onClick={toggleTrimmer}
          aria-pressed={isTrimmerOn}
          aria-label="Toggle hair trimmer hum"
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs backdrop-blur-md transition-all active:scale-90 ${
            isTrimmerOn
              ? 'border-amber-400/80 bg-amber-400/20 text-amber-300 font-semibold shadow-[0_0_12px_rgba(251,191,36,0.3)] animate-pulse'
              : 'border-world-fg/15 bg-black/40 text-world-fg/80 hover:bg-world-fg/10 hover:text-world-fg'
          }`}
          title="Toggle electric trimmer hum (ट्रिमर)"
        >
          <Zap size={14} className={isTrimmerOn ? 'text-amber-400' : 'text-world-fg/60'} />
          <span className="font-deva text-[0.78rem]">
            {isTrimmerOn ? 'ट्रिमर ON' : 'ट्रिमर'}
          </span>
        </button>

        {/* Water Spray Button */}
        <button
          type="button"
          onClick={handleSpray}
          aria-label="Spray water mist"
          className="group flex items-center gap-1.5 rounded-full border border-world-fg/15 bg-black/40 px-3 py-1.5 text-xs text-world-fg/80 backdrop-blur-md transition-all active:scale-90 hover:bg-world-fg/10 hover:text-world-fg"
          title="Spray water mist (पानी का फुहारा)"
        >
          <Droplets size={14} className="text-cyan-400 transition-transform group-hover:-translate-y-0.5" />
          <span className="font-deva text-[0.78rem]">स्प्रे फुहारा</span>
        </button>

        {/* Fan Ambience Button */}
        <button
          type="button"
          onClick={toggleFan}
          aria-pressed={isFanOn}
          aria-label="Toggle ceiling fan hum"
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs backdrop-blur-md transition-all active:scale-90 ${
            isFanOn
              ? 'border-teal-400/80 bg-teal-400/20 text-teal-300 font-semibold'
              : 'border-world-fg/15 bg-black/40 text-world-fg/80 hover:bg-world-fg/10 hover:text-world-fg'
          }`}
          title="Toggle salon fan sound (पंखा)"
        >
          <Wind size={14} className={isFanOn ? 'animate-spin text-teal-400' : 'text-world-fg/60'} />
          <span className="font-deva text-[0.78rem]">
            {isFanOn ? 'पंखा ON' : 'पंखा'}
          </span>
        </button>

        {/* Ambient Settings Toggle */}
        <button
          type="button"
          onClick={() => setShowControls(!showControls)}
          aria-label="Barbershop ambient sound levels"
          className="grid size-8 place-items-center rounded-full border border-world-fg/15 bg-black/40 text-world-fg/60 transition-colors hover:text-world-fg"
          title="Ambient volume controls"
        >
          <Volume2 size={14} />
        </button>
      </div>

      {/* Expandable Trimmer & Ambient Volume Slider */}
      {showControls && (
        <div className="mt-2 flex w-full max-w-xs items-center gap-3 rounded-2xl border border-white/10 bg-black/75 px-3 py-2 text-xs text-neutral-300 backdrop-blur-xl">
          <span className="font-deva text-xs whitespace-nowrap text-amber-400">ट्रिमर आवाज़:</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={trimmerVol}
            onChange={(e) => {
              const val = Number(e.target.value);
              setTrimmerVol(val);
              salonAudio.trimmerVolume = val;
            }}
            className="world-range h-4 flex-1 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
}

