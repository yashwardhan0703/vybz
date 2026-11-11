import { usePlayerStore } from '../store/playerStore';

interface TodayPlaylistBoardProps {
  onPlayAt: (index: number) => void;
}

export default function TodayPlaylistBoard({ onPlayAt }: TodayPlaylistBoardProps) {
  const { currentWorld, trackIndex, isPlaying } = usePlayerStore();

  const previewTracks = currentWorld.tracks?.slice(0, 5) || [];

  return (
    <aside
      aria-label="Today's Playlist Chalkboard"
      className="hidden lg:block absolute right-6 xl:right-10 top-1/2 -translate-y-1/2 z-20 w-60 xl:w-64 select-none"
    >
      {/* Hanging rope shadow & pin */}
      <div className="mx-auto h-3 w-1 rounded-t bg-stone-700/60 shadow" />

      {/* Wooden Framed Blackboard */}
      <div className="relative rounded-xl border-[6px] border-[#3e271c] bg-[#141816]/95 p-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-md">
        {/* Subtle chalkboard texture grain */}
        <div className="absolute inset-0 rounded-lg bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:8px_8px] pointer-events-none" />

        {/* Chalkboard Header */}
        <h2 className="relative text-center font-chalk text-[1.85rem] font-bold tracking-wide text-white/95 drop-shadow-[0_2px_4px_rgba(255,255,255,0.2)]">
          Today's Playlist
        </h2>

        {/* Chalk Divider */}
        <div className="my-2 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

        {/* Numbered Songs List */}
        <ul className="relative mt-2 space-y-1.5 font-sans">
          {previewTracks.map((track, i) => {
            const isActive = i === trackIndex;
            // Short clean title without artist
            const cleanTitle = track.title.split('-')[0].trim();

            return (
              <li key={`${currentWorld.id}-${i}`}>
                <button
                  type="button"
                  onClick={() => onPlayAt(i)}
                  className={`flex w-full items-center gap-2 rounded-lg px-2 py-1 text-left transition-all ${isActive
                    ? 'bg-white/15 text-white font-semibold shadow-inner'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                >
                  <span className="font-mono text-xs text-white/50 w-4 tabular-nums">
                    {i + 1}.
                  </span>
                  <span translate="no" className="notranslate truncate text-sm tracking-wide">
                    {cleanTitle}
                  </span>
                  {isActive && (
                    <span className="ml-auto text-xs text-teal-300 animate-pulse">
                      {isPlaying ? '▶' : '⏸'}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Bottom Chalk Doodles */}
        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-white/40 font-mono tracking-widest pt-2 border-t border-white/10">
          <span className="cursor-pointer hover:text-white/70" title="Previous">⏮</span>
          <span className="cursor-pointer hover:text-white/70" title="Pause">⏸</span>
          <span className="cursor-pointer hover:text-white/70" title="Next">⏭</span>
          <span className="text-white/30">♫</span>
        </div>
      </div>
    </aside>
  );
}

