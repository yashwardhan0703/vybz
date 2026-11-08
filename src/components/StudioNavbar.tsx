import { useState, useEffect } from 'react';
import { Search, Compass, Mic2, FolderHeart, Heart, Sparkles, Download } from 'lucide-react';
import { usePlayerStore, type StudioTab } from '../store/playerStore';

export default function StudioNavbar() {
  const {
    activeTab,
    setActiveTab,
    toggleSearch,
    viewMode,
    toggleViewMode,
    likedSongs,
    currentWorld,
  } = usePlayerStore();

  const [installPrompt, setInstallPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallApp = async () => {
    if (!installPrompt) return;
    try {
      installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice?.outcome === 'accepted') {
        setInstallPrompt(null);
      }
    } catch {}
  };

  const navItems: Array<{ id: StudioTab; label: string; icon: React.ReactNode }> = [
    { id: 'explore', label: 'Explore', icon: <Compass size={16} /> },
    { id: 'artists', label: 'Artists', icon: <Mic2 size={16} /> },
    { id: 'playlists', label: 'Playlists', icon: <FolderHeart size={16} /> },
    {
      id: 'favorites',
      label: 'Favorites',
      icon: (
        <span className="relative flex items-center">
          <Heart size={16} className={likedSongs.length > 0 ? 'fill-rose-500 text-rose-500' : ''} />
          {likedSongs.length > 0 && (
            <span className="absolute -top-1.5 -right-2 grid size-3.5 place-items-center rounded-full bg-rose-500 text-[0.55rem] font-bold text-white">
              {likedSongs.length}
            </span>
          )}
        </span>
      ),
    },
  ];

  return (
    <header className="relative z-30 flex items-center justify-between border-b border-white/5 bg-[#080c10]/85 px-4 py-3 backdrop-blur-xl sm:px-8">
      {/* Brand & Logo */}
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-amber-400/10 p-0.5 border border-amber-400/25 shadow-md">
          <img src="/logo.png" alt="vybz logo" className="size-full object-contain filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]" />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-sm font-bold tracking-wider text-white">
            VYBZ <span className="text-amber-400">MUSIC</span>
          </h1>
          <p className="text-[0.6rem] text-white/40 tracking-wider">
            UNLIMITED • AD-FREE • LYRICS SEARCH
          </p>
        </div>
      </div>

      {/* Center: Unique Navigation Pills */}
      <nav
        aria-label="Studio navigation"
        className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] p-1 shadow-inner"
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-teal-500/20 to-emerald-500/20 text-teal-300 border border-teal-500/30 shadow-[0_0_15px_rgba(45,212,191,0.2)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              <span className="hidden md:inline">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Right: Search & Vibe Mode Switcher */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* 1-Click PWA Install Button */}
        {installPrompt && (
          <button
            type="button"
            onClick={handleInstallApp}
            aria-label="Install VybZ App"
            className="flex items-center gap-1.5 rounded-full border border-amber-400/50 bg-amber-400/15 px-3 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-400/25 transition-all active:scale-95 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
          >
            <Download size={13} className="text-amber-400" />
            <span className="hidden sm:inline">Install App</span>
          </button>
        )}

        {/* Quick Search trigger button */}
        <button
          type="button"
          onClick={toggleSearch}
          aria-label="Search songs"
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 hover:border-white/20 hover:text-white transition-all active:scale-95"
        >
          <Search size={14} className="text-teal-400" />
          <span className="hidden lg:inline text-xs">Search songs or lyrics...</span>
          <kbd className="hidden sm:inline rounded bg-white/10 px-1.5 py-0.5 text-[0.6rem] font-mono text-white/40">
            /
          </kbd>
        </button>

        {/* The Requested VIBE MODE Toggle Button */}
        <button
          type="button"
          onClick={toggleViewMode}
          aria-label="Toggle Vibe Mode"
          className={`group flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all active:scale-95 ${
            viewMode === 'vibe'
              ? 'border border-amber-400/60 bg-amber-400/20 text-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.3)]'
              : 'border border-teal-400/50 bg-gradient-to-r from-teal-500 to-emerald-500 text-black shadow-[0_0_25px_rgba(45,212,191,0.4)] hover:brightness-110'
          }`}
        >
          <Sparkles
            size={14}
            className={viewMode === 'vibe' ? 'text-amber-400 animate-spin' : 'text-black'}
          />
          <span>{viewMode === 'vibe' ? 'Exit Vibe Mode' : '✨ Vibe Mode'}</span>
          <span className="hidden xl:inline text-[0.62rem] opacity-75">
            ({currentWorld.nameHindi})
          </span>
        </button>
      </div>
    </header>
  );
}

