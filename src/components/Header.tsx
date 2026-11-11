import { useState, useEffect } from 'react';
import { ListMusic, LayoutGrid, Share2, Search, Disc3 } from 'lucide-react';
import { useOnlineCount } from '../hooks/useOnlineCount';
import { usePlayerStore } from '../store/playerStore';

function useRealtimeClock() {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12 || 12;
      setTimeStr(`${hours}:${minutes}:${seconds} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeStr;
}

export default function Header() {
  const time = useRealtimeClock();
  const count = useOnlineCount();
  const { toggleWorldSwitcher, toggleTrackList, toggleSearch, toggleViewMode, currentWorld } = usePlayerStore();

  // Keyboard shortcut Ctrl+K or / to open search
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if ((e.ctrlKey && e.key.toLowerCase() === 'k') || e.key === '/') {
        e.preventDefault();
        toggleSearch();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [toggleSearch]);

  const shareText = `🎵 ${currentWorld.nameHindi} - ${currentWorld.subtitle}\n"${currentWorld.subQuote}"\nSunoo yeh playlist abhi vybz par!\nhttps://vybz.in/theme/${currentWorld.id}`;

  return (
    <header className="relative z-30 flex items-center justify-between gap-2 px-3 sm:px-8 pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-4">
      {/* Top Left: Live Digital Clock */}
      <div className="font-mono text-[0.65rem] sm:text-sm font-semibold tracking-wider text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] shrink-0">
        {time || '7:28:13 pm'}
      </div>

      {/* Top Center: Online Counter */}
      <button
        type="button"
        onClick={toggleWorldSwitcher}
        aria-label="Online listeners"
        className="hidden sm:flex items-center gap-1.5 sm:gap-2 rounded-full px-2 sm:px-3 py-1 font-mono text-[0.65rem] sm:text-xs font-medium tracking-wide text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] hover:text-white transition-opacity shrink-0"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex size-full rounded-full bg-amber-400" />
        </span>
        <span className="tabular-nums font-bold">{count}</span>
        <span className="text-white/60">Online</span>
      </button>

      {/* Top Right: Search, Tracks, PlayLists, Share */}
      <nav aria-label="Quick actions" className="flex items-center gap-2 xs:gap-3 sm:gap-5 shrink-0">
        {/* Top 25 Music Player button */}
        <button
          type="button"
          onClick={toggleViewMode}
          aria-label="Open Top 25 Music Player"
          className="group flex flex-col items-center gap-0.5 text-amber-300 transition-colors hover:text-amber-200 focus-visible:outline-none"
        >
          <Disc3 size={17} className="transition-transform group-hover:scale-110 animate-spin text-amber-400" style={{ animationDuration: '6s' }} />
          <span className="text-[0.62rem] font-bold tracking-wider">Top 25</span>
        </button>

        {/* Search (Spotify style) */}
        <button
          type="button"
          onClick={toggleSearch}
          aria-label="Search any song"
          className="group flex flex-col items-center gap-0.5 text-white/80 transition-colors hover:text-white focus-visible:outline-none"
        >
          <Search size={17} className="transition-transform group-hover:scale-110" />
          <span className="text-[0.62rem] font-medium tracking-wider">Search</span>
        </button>

        {/* Tracks */}
        <button
          type="button"
          onClick={toggleTrackList}
          aria-label="Open track list"
          className="group flex flex-col items-center gap-0.5 text-white/80 transition-colors hover:text-white focus-visible:outline-none"
        >
          <ListMusic size={17} className="transition-transform group-hover:scale-110" />
          <span className="text-[0.62rem] font-medium tracking-wider">Tracks</span>
        </button>

        {/* PlayLists */}
        <button
          type="button"
          onClick={toggleWorldSwitcher}
          aria-label="Open playlists themes"
          className="group flex flex-col items-center gap-0.5 text-white/80 transition-colors hover:text-white focus-visible:outline-none"
        >
          <LayoutGrid size={17} className="transition-transform group-hover:scale-110" />
          <span className="text-[0.62rem] font-medium tracking-wider">PlayLists</span>
        </button>

        {/* Share in green */}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Share playlist"
          className="group flex flex-col items-center gap-0.5 text-[#22c55e] transition-colors hover:text-[#4ade80] focus-visible:outline-none"
        >
          <Share2 size={17} className="transition-transform group-hover:scale-110" />
          <span className="text-[0.62rem] font-medium tracking-wider">Share</span>
        </a>
      </nav>
    </header>
  );
}
