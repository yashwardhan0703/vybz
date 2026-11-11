import { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Heart,
  Plus,
  Search,
  Sparkles,
  Flame,
  Mic2,
  FolderHeart,
  Shuffle,
  ChevronRight,
  TrendingUp,
  LayoutGrid,
  ChevronDown,
  Volume2,
  Loader2,
  Trash2,
  Download,
  Clock,
  RefreshCw,
  Radio,
  Share2,
} from 'lucide-react';
import { usePlayerStore, type PlayerCategory } from '../store/playerStore';
import type { TrendingTrack } from '../data/trendingSongs';
import { ARTISTS_CATALOG, type Artist, type ArtistSong } from '../data/artistsData';
import { WORLDS, type ThemeWorld } from '../data/worlds';
import type { StoredTrack, UserPlaylist } from '../utils/localStorageHelper';
import type { QueueTrack } from '../hooks/useYouTube';
import {
  SAFE_ARTWORK_FALLBACK,
  handleArtworkError,
  cleanSongTitle,
  shareTrackOrApp,
} from '../utils/mediaHelpers';

interface UniqueIndianPlayerProps {
  onPlayCustomVideoId: (
    videoId: string,
    title?: string,
    artist?: string,
    thumbnail?: string,
    contextQueue?: QueueTrack[],
    queueStartIndex?: number,
    isVibeRadioMode?: boolean,
    initialDuration?: string | number
  ) => void;
  onPlayAt: (index: number) => void;
  onPlay: () => void;
  onPause: () => void;
}

const themeStyles = {
  accentGradient: 'from-amber-400 via-amber-500 to-orange-500',
  badgeBg: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
  borderGlow: 'border-amber-500/30',
  heroGrad: 'from-[#191107] via-[#120d06] to-[#080c14]',
};

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function getArtistFromHash(): Artist | null {
  if (typeof window === 'undefined') return null;
  const hash = window.location.hash;
  if (hash.startsWith('#artist/')) {
    const artId = hash.replace('#artist/', '');
    return ARTISTS_CATALOG.find((a) => a.id === artId) || null;
  }
  return null;
}

function getCachedArtistTracks(artistId: string): ArtistSong[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const cached = localStorage.getItem(`vybz_art_v3_${artistId}`);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length >= 5) return parsed;
    }
  } catch {}
  return null;
}

export default function UniqueIndianPlayer({
  onPlayCustomVideoId,
  onPlay,
  onPause,
}: UniqueIndianPlayerProps) {
  const {
    activeCategory,
    setActiveCategory,
    likedSongs,
    toggleLike,
    userPlaylists,
    createPlaylist,
    deletePlaylist,
    addToPlaylist,
    removeFromPlaylist,
    recentHistory,
    toggleSearch,
    viewMode,
    setViewMode,
    currentTrackId,
    isPlaying,
    currentWorld,
    setWorld,
    top25Tracks,
    isTop25Refreshing,
    refreshLiveTop25,
  } = usePlayerStore();

  const [shareToast, setShareToast] = useState<string | null>(null);

  // Handler for playing a Vibe Station directly and entering its ambient visual world
  const handlePlayVibeStation = (world: ThemeWorld) => {
    setWorld(world.id);
    const first = world.tracks?.[0];
    if (first && (currentTrackId !== first.id || !isPlaying)) {
      const q: QueueTrack[] = (world.tracks || []).map((t) => ({
        id: t.id,
        title: t.title,
        artist: t.artist || world.name,
        thumbnail: `https://img.youtube.com/vi/${t.id}/mqdefault.jpg`,
      }));
      onPlayCustomVideoId(
        first.id,
        first.title,
        first.artist || world.name,
        `https://img.youtube.com/vi/${first.id}/mqdefault.jpg`,
        q,
        0,
        false
      );
    }
    if (viewMode !== 'vibe') {
      setViewMode('vibe');
      window.location.hash = 'vibe';
    }
  };

  const handleShareTrack = async (title?: string, artist?: string) => {
    const res = await shareTrackOrApp(title, artist);
    if (res === 'copied') {
      setShareToast('Link copied! Ready to share with friends 🎉');
      setTimeout(() => setShareToast(null), 3000);
    }
  };

  // Lazy-initialize artist from URL hash to avoid synchronous setState in useEffect
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(getArtistFromHash);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);

  // 5-by-5 Pagination State for Top 25
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [isExpandAll, setIsExpandAll] = useState<boolean>(false);

  // 5-by-5 Pagination State & Dynamic Search for Selected Artist
  const [artistPage, setArtistPage] = useState<number>(1);
  const [isArtistExpandAll, setIsArtistExpandAll] = useState<boolean>(false);
  const [artistTracksMap, setArtistTracksMap] = useState<Record<string, ArtistSong[]>>({});
  const [isSearchingArtist, setIsSearchingArtist] = useState<boolean>(false);

  // Progressive Display for Popular Artists
  const [displayedArtistsCount, setDisplayedArtistsCount] = useState<number>(12);

  // Playlist creation & modal state
  const [playlistModalSong, setPlaylistModalSong] = useState<StoredTrack | null>(null);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState('');
  const [isCreatingNewPl, setIsCreatingNewPl] = useState(false);

  // PWA install prompt
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallApp = async () => {
    if (!installPrompt) return;
    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      if (choice?.outcome === 'accepted') {
        setInstallPrompt(null);
      }
    } catch {}
  };

  // Auto-sync live YouTube India Top 25 chart on app mount
  useEffect(() => {
    refreshLiveTop25();
  }, [refreshLiveTop25]);

  // Listen to browser Back / Forward events for #artist/...
  useEffect(() => {
    const handlePopState = () => {
      const nextArtist = getArtistFromHash();
      setSelectedArtist(nextArtist);
      setArtistPage(1);
      setIsArtistExpandAll(false);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openArtist = (artist: Artist) => {
    window.history.pushState({ type: 'artist', artistId: artist.id }, '', `#artist/${artist.id}`);
    setSelectedArtist(artist);
    setSelectedPlaylistId(null);
    setArtistPage(1);
    setIsArtistExpandAll(false);
  };

  const closeArtist = () => {
    if (window.location.hash.startsWith('#artist/')) {
      window.history.back();
    } else {
      setSelectedArtist(null);
    }
  };

  const selectedArtistId = selectedArtist?.id;
  const selectedArtistName = selectedArtist?.name;

  // Auto-search real YouTube songs when an artist is selected (if not already having 20 curated tracks)
  useEffect(() => {
    if (!selectedArtistId || !selectedArtistName) return;
    if (selectedArtist?.topTracks && selectedArtist.topTracks.length >= 20) return;
    if (getCachedArtistTracks(selectedArtistId)) return;

    let isMounted = true;
    const fetchArtistSongs = async () => {
      setIsSearchingArtist(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(selectedArtistName + ' songs hit')}`
        );
        if (!res.ok) throw new Error('Search failed');
        const data = await res.json();
        if (!isMounted) return;

        if (Array.isArray(data.results) && data.results.length > 0) {
          const stopWords = [
            'jukebox',
            'all songs',
            'non stop',
            'full album',
            'compilation',
            'podcast',
            'mashup 1 hour',
            'interview',
          ];
          const cleanResults: ArtistSong[] = data.results
            .filter((item: { title?: string }) => {
              const titleLower = (item.title || '').toLowerCase();
              return !stopWords.some((sw) => titleLower.includes(sw));
            })
            .map((item: { id: string; title: string; artist?: string; duration?: string }) => ({
              id: item.id,
              title: cleanSongTitle(item.title),
              album: item.artist || selectedArtistName,
              duration: item.duration || '3:45',
            }))
            .slice(0, 20);

          if (cleanResults.length >= 3) {
            setArtistTracksMap((prev) => ({ ...prev, [selectedArtistId]: cleanResults }));
            try {
              localStorage.setItem(
                `vybz_art_v3_${selectedArtistId}`,
                JSON.stringify(cleanResults)
              );
            } catch {}
          }
        }
      } catch {
        // Curated fallback remains active
      } finally {
        if (isMounted) {
          setIsSearchingArtist(false);
        }
      }
    };

    fetchArtistSongs();

    return () => {
      isMounted = false;
    };
  }, [selectedArtistId, selectedArtistName, selectedArtist?.topTracks]);

  const handleSelectCategory = (cat: PlayerCategory) => {
    setActiveCategory(cat);
    setSelectedPlaylistId(null);
    if (selectedArtist) {
      closeArtist();
    }
  };

  // Toggle Play / Pause trending song (with continuous Top 25 queue)
  const handleTogglePlayTrending = (track: TrendingTrack, index?: number) => {
    if (!track) return;
    if (currentTrackId === track.id) {
      if (isPlaying) onPause();
      else onPlay();
      return;
    }
    const trendingQueue: QueueTrack[] = top25Tracks.map((t) => ({
      id: t.id,
      title: `${t.title} (${t.movie})`,
      artist: t.singers,
      thumbnail: t.thumbnail,
      duration: t.duration,
    }));
    const trackIdx =
      index !== undefined ? index : top25Tracks.findIndex((t) => t.id === track.id);
    onPlayCustomVideoId(
      track.id,
      `${track.title} (${track.movie})`,
      track.singers,
      track.thumbnail,
      trendingQueue,
      Math.max(0, trackIdx),
      false,
      track.duration
    );
  };

  // Toggle Play / Pause stored track (with context queue)
  const handleTogglePlayStored = (
    track: StoredTrack,
    index?: number,
    sourceList: StoredTrack[] = likedSongs
  ) => {
    if (!track) return;
    if (currentTrackId === track.id) {
      if (isPlaying) onPause();
      else onPlay();
      return;
    }
    const queue: QueueTrack[] = sourceList.map((t) => ({
      id: t.id,
      title: t.title,
      artist: t.artist,
      thumbnail: t.thumbnail,
      duration: t.duration,
    }));
    const lIdx = index !== undefined ? index : sourceList.findIndex((t) => t.id === track.id);
    onPlayCustomVideoId(
      track.id,
      track.title,
      track.artist,
      track.thumbnail,
      queue,
      Math.max(0, lIdx),
      false,
      track.duration
    );
  };

  // Toggle Play / Pause user playlist
  const handleTogglePlayPlaylist = (playlist: UserPlaylist, startIndex: number = 0) => {
    if (!playlist || playlist.tracks.length === 0) return;
    const track = playlist.tracks[startIndex] || playlist.tracks[0];
    if (currentTrackId === track.id) {
      if (isPlaying) onPause();
      else onPlay();
      return;
    }
    const plQueue: QueueTrack[] = playlist.tracks.map((t) => ({
      id: t.id,
      title: t.title,
      artist: t.artist,
      thumbnail: t.thumbnail,
      duration: t.duration,
    }));
    onPlayCustomVideoId(
      track.id,
      track.title,
      track.artist,
      track.thumbnail,
      plQueue,
      startIndex,
      false,
      track.duration
    );
  };

  // Toggle Play / Pause artist top track
  const handleTogglePlayArtist = (artist: Artist, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const tracksList = (artist ? artistTracksMap[artist.id] : null) || artist.topTracks || [];
    if (!tracksList || tracksList.length === 0) return;
    const first = tracksList[0];
    if (first) {
      handleTogglePlayArtistSong(first.id, first.title, artist.name, 0, tracksList);
    }
  };

  // Toggle Play / Pause individual artist song
  const handleTogglePlayArtistSong = (
    songId: string,
    songTitle: string,
    artistName: string,
    songIndex?: number,
    artistTracks?: ArtistSong[]
  ) => {
    if (currentTrackId === songId) {
      if (isPlaying) onPause();
      else onPlay();
      return;
    }
    const tracksList =
      artistTracks ||
      (selectedArtist ? artistTracksMap[selectedArtist.id] || selectedArtist.topTracks : []);
    const artistQueue: QueueTrack[] = tracksList.map((t) => ({
      id: t.id,
      title: t.title,
      artist: artistName,
      thumbnail: `https://img.youtube.com/vi/${t.id}/mqdefault.jpg`,
      duration: t.duration,
    }));
    const sIdx = songIndex !== undefined ? songIndex : tracksList.findIndex((t) => t.id === songId);
    const targetTrack = tracksList[sIdx];
    onPlayCustomVideoId(
      songId,
      songTitle,
      artistName,
      `https://img.youtube.com/vi/${songId}/mqdefault.jpg`,
      artistQueue,
      Math.max(0, sIdx),
      false,
      targetTrack?.duration
    );
  };

  const handleSelectPage = (pageNum: number) => {
    setIsExpandAll(false);
    setSelectedPage(pageNum);
  };

  const handleLoadMoreArtists = () => {
    setDisplayedArtistsCount((prev) => Math.min(prev + 12, ARTISTS_CATALOG.length));
  };

  const startIdx = (selectedPage - 1) * 5;
  const visibleTrendingSongs = isExpandAll
    ? top25Tracks
    : top25Tracks.slice(startIdx, startIdx + 5);

  const currentArtistTracks: ArtistSong[] =
    (selectedArtist?.topTracks && selectedArtist.topTracks.length >= 20
      ? selectedArtist.topTracks
      : (selectedArtist ? artistTracksMap[selectedArtist.id] || getCachedArtistTracks(selectedArtist.id) : null) ||
        (selectedArtist?.topTracks && selectedArtist.topTracks.length > 0
          ? selectedArtist.topTracks
          : []));

  const artistStartIdx = (artistPage - 1) * 5;
  const visibleArtistTracks = isArtistExpandAll
    ? currentArtistTracks
    : currentArtistTracks.slice(artistStartIdx, artistStartIdx + 5);

  const visibleArtists =
    activeCategory === 'artists'
      ? ARTISTS_CATALOG
      : ARTISTS_CATALOG.slice(0, displayedArtistsCount);

  const inspectedPlaylist = selectedPlaylistId
    ? userPlaylists.find((p) => p.id === selectedPlaylistId) || null
    : null;

  const sidebarItems: Array<{
    id: PlayerCategory;
    label: string;
    shortLabel: string;
    icon: React.ReactNode;
    badge?: number;
  }> = [
    { id: 'all', label: 'Discover Home', shortLabel: 'Home', icon: <LayoutGrid size={18} /> },
    { id: 'trending', label: 'Top 25 Hits', shortLabel: 'Top 25', icon: <Flame size={18} /> },
    {
      id: 'vibes',
      label: 'Mood & Vibe Stations',
      shortLabel: 'Vibes',
      icon: <Radio size={18} />,
      badge: WORLDS.length,
    },
    { id: 'artists', label: 'Popular Artists', shortLabel: 'Artists', icon: <Mic2 size={18} /> },
    {
      id: 'playlists',
      label: 'My Playlists',
      shortLabel: 'Playlists',
      icon: <FolderHeart size={18} />,
      badge: userPlaylists.length,
    },
    {
      id: 'favorites',
      label: 'Liked Songs',
      shortLabel: 'Liked',
      icon: (
        <Heart
          size={18}
          className={likedSongs.length > 0 ? 'fill-rose-500 text-rose-500' : ''}
        />
      ),
      badge: likedSongs.length,
    },
  ];

  return (
    <div className="relative flex flex-1 min-h-0 overflow-hidden bg-[#070a10] text-white">
      {/* Background radial glow & acoustic dot matrix */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.11),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(rgba(245,158,11,0.2)_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* ========================================================
          TABLET (Compact Rail) & DESKTOP SIDEBAR (md:flex)
         ======================================================== */}
      <aside
        aria-label="Primary Sidebar"
        className="hidden md:flex md:w-20 lg:w-60 xl:w-64 shrink-0 flex-col border-r border-white/10 bg-[#080c13]/95 z-20"
      >
        {/* Brand Header inside Sidebar */}
        <div className="flex items-center justify-center lg:justify-start gap-3 px-3 lg:px-5 pt-5 pb-4 border-b border-white/5">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-amber-400/10 p-1 border border-amber-400/25 shadow-md">
            <img
              src="/logo.png"
              alt="vybz logo"
              className="size-full object-contain filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]"
            />
          </div>
          <div className="hidden lg:block min-w-0">
            <h1 className="text-xl font-black tracking-tight text-white lowercase leading-none">
              vybz<span className="text-amber-400">.</span>
            </h1>
            <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-widest text-white/45 truncate">
              Indian Audio Hub
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav aria-label="Main sections" className="flex-1 overflow-y-auto px-2 lg:px-3 py-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = activeCategory === item.id && !selectedArtist;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectCategory(item.id)}
                title={item.label}
                aria-current={isActive ? 'page' : undefined}
                className={`flex w-full flex-col lg:flex-row items-center justify-center lg:justify-between gap-1 lg:gap-3 rounded-xl px-2 lg:px-3.5 py-2.5 transition-colors ${
                  isActive
                    ? 'bg-amber-400/15 text-amber-300 border border-amber-400/30 font-semibold'
                    : 'text-white/65 hover:bg-white/5 hover:text-white border border-transparent'
                }`}
              >
                <span className="flex flex-col lg:flex-row items-center gap-1 lg:gap-3 min-w-0">
                  <span className={isActive ? 'text-amber-400' : ''}>{item.icon}</span>
                  <span className="lg:hidden text-[0.6rem] font-medium truncate max-w-full">
                    {item.shortLabel}
                  </span>
                  <span className="hidden lg:inline text-sm truncate">{item.label}</span>
                </span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="hidden lg:inline-flex rounded-full bg-white/10 px-2 py-0.5 font-mono text-[0.65rem] text-white/70">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Quick Playlists Jump List on lg+ */}
          {userPlaylists.length > 0 && (
            <div className="hidden lg:block pt-5 mt-4 border-t border-white/5">
              <div className="flex items-center justify-between px-3 mb-2">
                <span className="font-mono text-[0.62rem] uppercase tracking-widest text-white/40">
                  Your Playlists
                </span>
                <button
                  type="button"
                  onClick={() => {
                    handleSelectCategory('playlists');
                    setIsCreatingNewPl(true);
                  }}
                  aria-label="New playlist"
                  className="text-white/45 hover:text-amber-400 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
              <div className="space-y-0.5">
                {userPlaylists.slice(0, 6).map((pl) => (
                  <button
                    key={pl.id}
                    type="button"
                    onClick={() => {
                      setActiveCategory('playlists');
                      setSelectedPlaylistId(pl.id);
                      if (selectedArtist) closeArtist();
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-xs transition-colors ${
                      selectedPlaylistId === pl.id
                        ? 'bg-white/10 text-amber-300 font-semibold'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="truncate">{pl.name}</span>
                    <span className="ml-2 font-mono text-[0.62rem] text-white/35 shrink-0">
                      {pl.tracks.length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>
      </aside>

      {/* ========================================================
          RIGHT CONTENT COLUMN (Top Header + Main Scroll Canvas)
         ======================================================== */}
      <div className="relative z-10 flex flex-1 min-w-0 flex-col overflow-hidden">
        {/* TOP HEADER BAR */}
        <header className="relative z-20 flex items-center justify-between gap-2 border-b border-white/10 bg-[#090d14]/95 px-3 sm:px-6 lg:px-8 pt-[max(0.6rem,env(safe-area-inset-top))] pb-2.5 sm:py-3 shrink-0">
          {/* Mobile Brand Lockup (< md) */}
          <div className="flex md:hidden items-center gap-2 min-w-0">
            <div className="flex size-8 items-center justify-center rounded-xl bg-amber-400/10 p-0.5 border border-amber-400/25 shrink-0">
              <img
                src="/logo.png"
                alt="vybz logo"
                className="size-full object-contain filter drop-shadow-[0_2px_6px_rgba(245,158,11,0.5)]"
              />
            </div>
            <h1 className="text-lg font-black tracking-tight text-white lowercase truncate">
              vybz<span className="text-amber-400">.</span>
            </h1>
          </div>

          {/* Search Bar Trigger (md+ spacious bar, compact icon on < md) */}
          <button
            type="button"
            onClick={toggleSearch}
            className="hidden md:flex items-center gap-2.5 rounded-full border border-white/10 bg-[#0e1420] px-4 py-2 hover:border-amber-400/40 hover:bg-[#131b2a] transition-colors flex-1 max-w-md text-left"
          >
            <Search size={15} className="text-amber-400 shrink-0" />
            <span className="truncate text-xs text-white/55">
              Search songs, artists, or lyrics...
            </span>
            <kbd className="ml-auto rounded bg-white/10 px-1.5 py-0.5 text-[0.6rem] font-mono text-white/45 shrink-0">
              /
            </kbd>
          </button>

          {/* Right Header Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 ml-auto">
            {installPrompt && (
              <button
                type="button"
                onClick={handleInstallApp}
                aria-label="Install VybZ App"
                className="flex items-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/15 px-2.5 sm:px-3 py-1.5 text-[0.7rem] sm:text-xs font-semibold text-amber-300 hover:bg-amber-400/25 active:scale-95 transition-all"
              >
                <Download size={13} className="text-amber-400 shrink-0" />
                <span className="hidden xs:inline">Install</span>
              </button>
            )}

            {/* Mobile Search Icon */}
            <button
              type="button"
              onClick={toggleSearch}
              aria-label="Search songs and lyrics"
              className="md:hidden grid size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-amber-400 hover:bg-white/10 active:scale-95 transition-transform"
            >
              <Search size={16} />
            </button>
          </div>
        </header>

        {/* SCROLLABLE DISCOVERY MAIN CONTENT */}
        <main className="relative z-10 flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="mx-auto w-full max-w-[1440px] space-y-6 sm:space-y-8 pb-6">
            {/* ========================================================
                ARTIST DETAIL VIEW
               ======================================================== */}
            {selectedArtist ? (
              <div className="space-y-6">
                <button
                  type="button"
                  onClick={closeArtist}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-amber-300 hover:bg-white/10 transition-colors"
                >
                  ← Back to artists
                </button>

                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0e141f] p-4 sm:p-7 shadow-xl">
                  <div className="size-24 sm:size-36 rounded-full overflow-hidden border-4 border-amber-400/40 shadow-xl shrink-0 aspect-square bg-black/40">
                    <img
                      src={selectedArtist.avatar}
                      alt={selectedArtist.name}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={handleArtworkError}
                      className="size-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                      <span
                        className={`inline-block rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-[0.68rem] sm:text-xs font-semibold border ${themeStyles.badgeBg}`}
                      >
                        Trending Artist • Top {currentArtistTracks.length || 20} Songs
                      </span>
                      {isSearchingArtist && (
                        <span className="flex items-center gap-1 rounded-full bg-amber-400/10 border border-amber-400/20 px-2.5 py-0.5 text-[0.62rem] text-amber-300">
                          <Loader2 size={10} className="animate-spin" />
                          Syncing tracks...
                        </span>
                      )}
                    </div>
                    <h2
                      translate="no"
                      className="notranslate mt-2 text-2xl sm:text-4xl font-black text-white leading-tight break-words"
                    >
                      {selectedArtist.name}
                    </h2>
                    <p className="mt-1 text-xs sm:text-sm text-amber-300/90 font-medium">{selectedArtist.tagline}</p>
                    <p className="mt-2 text-xs sm:text-[0.82rem] text-white/70 max-w-2xl leading-relaxed">
                      Stream {selectedArtist.name}&apos;s all-time Top 20 blockbuster hits, Bollywood classics, romantic anthems, and iconic melodies in high-definition ad-free audio.
                    </p>
                    <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
                      <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[0.62rem] font-mono text-white/60">
                        #Top20Hits
                      </span>
                      <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[0.62rem] font-mono text-white/60">
                        #BollywoodMusic
                      </span>
                      <span className="rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[0.62rem] font-mono text-white/60">
                        #AdFreeAudio
                      </span>
                      <span className="rounded-md bg-amber-400/10 border border-amber-400/25 px-2 py-0.5 text-[0.62rem] font-mono text-amber-300">
                        #VybZExclusive
                      </span>
                    </div>
                    <div className="mt-4 flex flex-col xs:flex-row items-stretch xs:items-center justify-center sm:justify-start gap-2.5">
                      <button
                        type="button"
                        onClick={() => handleTogglePlayArtist(selectedArtist)}
                        className={`flex items-center justify-center gap-2 rounded-full bg-gradient-to-r ${themeStyles.accentGradient} px-5 sm:px-6 py-2.5 text-xs font-bold text-black shadow hover:scale-105 active:scale-95 transition-transform`}
                      >
                        {currentArtistTracks[0] &&
                        currentTrackId === currentArtistTracks[0].id &&
                        isPlaying ? (
                          <>
                            <Pause size={14} fill="black" /> Pause Top 20
                          </>
                        ) : (
                          <>
                            <Play size={14} fill="black" /> Play All 20 Songs
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (currentArtistTracks.length === 0) return;
                          const r = Math.floor(Math.random() * currentArtistTracks.length);
                          const t = currentArtistTracks[r];
                          handleTogglePlayArtistSong(
                            t.id,
                            t.title,
                            selectedArtist.name,
                            r,
                            currentArtistTracks
                          );
                        }}
                        className="flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 active:scale-95 transition-colors"
                      >
                        <Shuffle size={13} /> Shuffle
                      </button>
                    </div>
                  </div>
                </div>

                {/* 5-BY-5 ARTIST SONGS CONTAINER */}
                <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0c121b] p-3 sm:p-6 shadow-xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-white/5">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-white">Top Songs</h3>
                        <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[0.62rem] sm:text-[0.65rem] font-bold text-amber-300">
                          {isArtistExpandAll
                            ? `All ${currentArtistTracks.length}`
                            : `Page ${artistPage}/4 (${artistStartIdx + 1}-${Math.min(artistStartIdx + 5, currentArtistTracks.length)})`}
                        </span>
                      </div>
                      <p className="text-[0.7rem] sm:text-xs text-white/45 mt-0.5">
                        5-song chunks for instant loading across devices
                      </p>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5 touch-pan-x">
                      {[
                        { page: 1, label: '1-5' },
                        { page: 2, label: '6-10' },
                        { page: 3, label: '11-15' },
                        { page: 4, label: '16-20' },
                      ].map(({ page, label }) => {
                        const isActive = !isArtistExpandAll && artistPage === page;
                        return (
                          <button
                            key={`art-page-${page}`}
                            type="button"
                            onClick={() => {
                              setIsArtistExpandAll(false);
                              setArtistPage(page);
                            }}
                            className={`rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-1 text-[0.65rem] sm:text-xs font-mono font-bold transition-colors shrink-0 ${
                              isActive
                                ? 'bg-amber-400 text-black shadow'
                                : 'border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {label}
                          </button>
                        );
                      })}
                      <button
                        type="button"
                        onClick={() => setIsArtistExpandAll((prev) => !prev)}
                        className={`rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-1 text-[0.65rem] sm:text-xs font-mono font-bold transition-colors shrink-0 ${
                          isArtistExpandAll
                            ? 'bg-amber-400 text-black shadow'
                            : 'border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {isArtistExpandAll ? '5-by-5' : 'All 20'}
                      </button>
                    </div>
                  </div>

                  {visibleArtistTracks.length === 0 ? (
                    <div className="py-10 text-center text-sm text-white/45">
                      No tracks available for this artist yet.
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {visibleArtistTracks.map((song, i) => {
                        if (!song) return null;
                        const overallIndex = isArtistExpandAll ? i : artistStartIdx + i;
                        const isSongCurrent = currentTrackId === song.id;
                        return (
                          <div
                            key={`${song.id || 'artist-song'}-${overallIndex}`}
                            className={`group flex items-center justify-between p-2 sm:p-3 rounded-xl transition-colors gap-2 ${
                              isSongCurrent ? 'bg-amber-500/10' : 'hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                              <span className="w-5 text-center font-mono text-xs text-white/40 shrink-0">
                                {overallIndex + 1}
                              </span>
                              <div className="size-10 sm:size-11 rounded-lg overflow-hidden bg-black/40 shadow shrink-0 aspect-square">
                                <img
                                  src={`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`}
                                  alt=""
                                  loading="lazy"
                                  decoding="async"
                                  onError={(e) => {
                                    const el = e.currentTarget;
                                    el.onerror = null;
                                    el.src = selectedArtist.avatar || SAFE_ARTWORK_FALLBACK;
                                  }}
                                  className="size-full object-cover"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p
                                  translate="no"
                                  onClick={() =>
                                    handleTogglePlayArtistSong(
                                      song.id,
                                      song.title,
                                      selectedArtist.name,
                                      overallIndex,
                                      currentArtistTracks
                                    )
                                  }
                                  className={`notranslate truncate text-xs sm:text-sm font-semibold cursor-pointer transition-colors ${
                                    isSongCurrent
                                      ? 'text-amber-300'
                                      : 'text-white group-hover:text-amber-300'
                                  }`}
                                >
                                  {song.title}
                                </p>
                                <p
                                  translate="no"
                                  className="notranslate truncate text-[0.68rem] sm:text-xs text-white/50"
                                >
                                  {song.album || selectedArtist.name}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                              {song.duration && (
                                <span className="font-mono text-[0.68rem] sm:text-xs text-white/40 hidden xs:inline">
                                  {song.duration}
                                </span>
                              )}
                              <button
                                type="button"
                                aria-label={`Play ${song.title}`}
                                onClick={() =>
                                  handleTogglePlayArtistSong(
                                    song.id,
                                    song.title,
                                    selectedArtist.name,
                                    overallIndex,
                                    currentArtistTracks
                                  )
                                }
                                className="grid size-8 sm:size-9 place-items-center rounded-full bg-white/10 text-white group-hover:bg-amber-400 group-hover:text-black transition-colors"
                              >
                                {isSongCurrent && isPlaying ? (
                                  <Pause size={13} fill="currentColor" />
                                ) : (
                                  <Play size={13} fill="currentColor" className="ml-0.5" />
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Artist Pagination Bar */}
                  <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-white/5">
                    {!isArtistExpandAll && artistPage > 1 ? (
                      <button
                        type="button"
                        onClick={() => setArtistPage((p) => Math.max(1, p - 1))}
                        className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 text-[0.7rem] sm:text-xs font-semibold text-white/80 hover:bg-white/10 transition-colors"
                      >
                        ← Prev 5
                      </button>
                    ) : (
                      <div />
                    )}

                    <div className="flex items-center gap-2">
                      {!isArtistExpandAll &&
                        artistPage < 4 &&
                        currentArtistTracks.length > artistPage * 5 && (
                          <button
                            type="button"
                            onClick={() => setArtistPage((p) => Math.min(4, p + 1))}
                            className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3.5 sm:px-5 py-1.5 text-[0.7rem] sm:text-xs font-bold text-black shadow hover:scale-102 active:scale-98 transition-transform"
                          >
                            <span>
                              Next 5 ({artistPage * 5 + 1}-
                              {Math.min((artistPage + 1) * 5, currentArtistTracks.length)})
                            </span>
                            <ChevronRight size={13} />
                          </button>
                        )}

                      <button
                        type="button"
                        onClick={() => setIsArtistExpandAll((prev) => !prev)}
                        className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 sm:px-4 py-1.5 text-[0.7rem] sm:text-xs font-semibold text-amber-300 hover:bg-amber-400/20 transition-colors"
                      >
                        {isArtistExpandAll ? 'Show 5' : 'All 20'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* ========================================================
                    RECENTLY PLAYED STRIP (Shown on Discover Home)
                   ======================================================== */}
                {activeCategory === 'all' && recentHistory.length > 0 && (
                  <section className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock size={15} className="text-amber-400" />
                        <h2 className="text-sm sm:text-base font-bold text-white">
                          Jump Back In
                        </h2>
                      </div>
                      <span className="font-mono text-[0.62rem] text-white/40 uppercase tracking-wider">
                        Recent
                      </span>
                    </div>

                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                      {recentHistory.slice(0, 4).map((track, idx) => {
                        const isCur = currentTrackId === track.id;
                        return (
                          <button
                            key={`recent-${track.id}-${idx}`}
                            type="button"
                            onClick={() => handleTogglePlayStored(track, idx, recentHistory)}
                            className={`group flex items-center gap-3 rounded-xl border p-2 text-left transition-all ${
                              isCur
                                ? 'border-amber-400/40 bg-amber-400/10'
                                : 'border-white/5 bg-[#0d131e] hover:border-white/15 hover:bg-[#131b2b]'
                            }`}
                          >
                            <div className="size-11 shrink-0 overflow-hidden rounded-lg bg-black/40 aspect-square">
                              <img
                                src={track.thumbnail}
                                alt=""
                                loading="lazy"
                                onError={handleArtworkError}
                                className="size-full object-cover"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p
                                translate="no"
                                className={`notranslate truncate text-xs font-semibold ${
                                  isCur ? 'text-amber-300' : 'text-white'
                                }`}
                              >
                                {track.title}
                              </p>
                              <p translate="no" className="notranslate truncate text-[0.65rem] text-white/50">
                                {track.artist}
                              </p>
                            </div>
                            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-amber-400 text-black opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                              {isCur && isPlaying ? (
                                <Pause size={12} fill="black" />
                              ) : (
                                <Play size={12} fill="black" className="ml-0.5" />
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* ========================================================
                    SECTION 1: TOP 25 TRENDING INDIAN SONGS
                   ======================================================== */}
                {(activeCategory === 'all' || activeCategory === 'trending') && (
                  <section className="space-y-4">
                    {/* Billboard Banner */}
                    <div
                      className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border ${themeStyles.borderGlow} bg-gradient-to-r ${themeStyles.heroGrad} p-4 sm:p-7 shadow-xl`}
                    >
                      <div className="relative z-10 max-w-2xl">
                        <div className="flex items-center gap-2 flex-wrap text-[0.62rem] sm:text-xs font-bold uppercase tracking-widest text-amber-300">
                          <TrendingUp size={13} />
                          <span>Official VybZ India Chart • Top 25 Daily</span>
                        </div>
                        <h2 className="mt-1 sm:mt-2 text-xl sm:text-3xl font-black text-white leading-tight">
                          Top 25 Trending on vybz
                        </h2>
                        <p className="mt-1 text-xs sm:text-sm text-white/75 max-w-xl leading-relaxed">
                          Official real-time Indian music charts streaming today&apos;s top daily trending songs across Bollywood, Punjabi, and Indian Pop. 100% ad-free with zero buffer.
                        </p>

                        <div className="mt-3.5 sm:mt-5 flex items-center gap-2.5 flex-wrap">
                          <button
                            type="button"
                            onClick={() =>
                              top25Tracks[0] && handleTogglePlayTrending(top25Tracks[0], 0)
                            }
                            className={`flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r ${themeStyles.accentGradient} px-5 py-2 sm:py-2.5 text-xs font-bold text-black shadow hover:scale-105 active:scale-95 transition-transform`}
                          >
                            {top25Tracks[0] &&
                            currentTrackId === top25Tracks[0].id &&
                            isPlaying ? (
                              <>
                                <Pause size={14} fill="black" /> <span>Pause #1</span>
                              </>
                            ) : (
                              <>
                                <Play size={14} fill="black" /> <span>Play #1 Song</span>
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (top25Tracks.length === 0) return;
                              const r = Math.floor(Math.random() * top25Tracks.length);
                              handleTogglePlayTrending(top25Tracks[r], r);
                            }}
                            className="flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 sm:py-2.5 text-xs font-semibold text-white hover:bg-white/10 active:scale-95 transition-colors"
                          >
                            <Shuffle size={13} /> <span>Shuffle</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => refreshLiveTop25(true)}
                            disabled={isTop25Refreshing}
                            title="Fetch latest live YouTube India hits"
                            className="flex items-center justify-center gap-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-2 sm:py-2.5 text-xs font-semibold text-amber-300 hover:bg-amber-400/20 active:scale-95 transition-colors disabled:opacity-60"
                          >
                            <RefreshCw
                              size={12}
                              className={isTop25Refreshing ? 'animate-spin' : ''}
                            />
                            <span>{isTop25Refreshing ? 'Syncing...' : 'Refresh'}</span>
                          </button>
                        </div>

                        {/* Live Trending SEO Pill Badges */}
                        <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center gap-1.5 flex-wrap">
                          <span className="text-[0.62rem] uppercase font-mono font-bold tracking-wider text-amber-300 mr-1">
                            🔥 Hot Today:
                          </span>
                          {top25Tracks.slice(0, 5).map((song) => (
                            <span
                              key={`hot-${song.id}`}
                              className="rounded-full bg-black/40 border border-white/10 px-2.5 py-0.5 text-[0.62rem] text-white/80 font-medium"
                            >
                              {song.title} {song.movie ? `(${song.movie})` : ''}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 5-BY-5 CHART CONTAINER */}
                    <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0a0e17] p-3 sm:p-6 shadow-xl">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 pb-3 border-b border-white/5">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base sm:text-lg font-bold text-white">Top 25 Hits</h3>
                            <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[0.6rem] sm:text-[0.65rem] font-bold text-amber-300">
                              {isExpandAll
                                ? 'All 25'
                                : `Page ${selectedPage}/5 (${startIdx + 1}-${startIdx + visibleTrendingSongs.length})`}
                            </span>
                          </div>
                          <p className="text-[0.68rem] sm:text-xs text-white/45 mt-0.5">
                            Tap any track to stream continuously
                          </p>
                        </div>

                        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5 touch-pan-x">
                          {[
                            { page: 1, label: '1-5' },
                            { page: 2, label: '6-10' },
                            { page: 3, label: '11-15' },
                            { page: 4, label: '16-20' },
                            { page: 5, label: '21-25' },
                          ].map(({ page, label }) => {
                            const isActive = !isExpandAll && selectedPage === page;
                            return (
                              <button
                                key={`batch-${page}`}
                                type="button"
                                onClick={() => handleSelectPage(page)}
                                className={`rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-1 text-[0.65rem] sm:text-xs font-mono font-bold transition-colors shrink-0 ${
                                  isActive
                                    ? 'bg-amber-400 text-black shadow'
                                    : 'border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                                }`}
                              >
                                {label}
                              </button>
                            );
                          })}
                          <button
                            type="button"
                            onClick={() => setIsExpandAll((prev) => !prev)}
                            className={`rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-1 text-[0.65rem] sm:text-xs font-mono font-bold transition-colors shrink-0 ${
                              isExpandAll
                                ? 'bg-amber-400 text-black shadow'
                                : 'border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {isExpandAll ? '5-by-5' : 'All 25'}
                          </button>
                        </div>
                      </div>

                      {/* 5-SONG LIST */}
                      <div className="divide-y divide-white/5 mt-2">
                        {visibleTrendingSongs.map((song, sIdx) => {
                          if (!song) return null;
                          const isCurrent = currentTrackId === song.id;
                          const isLiked = likedSongs.some((t) => t.id === song.id);

                          return (
                            <div
                              key={`chart-song-${song.id || sIdx}-${song.rank}`}
                              className={`group flex items-center justify-between p-2 sm:p-3 rounded-xl transition-colors ${
                                isCurrent
                                  ? 'bg-amber-500/10 border border-amber-500/30'
                                  : 'hover:bg-white/5'
                              }`}
                            >
                              <div className="flex items-center gap-2 sm:gap-3.5 min-w-0 flex-1">
                                <div className="w-6 sm:w-8 text-center shrink-0">
                                  {song.rank === 1 ? (
                                    <span className="inline-flex items-center justify-center size-6 sm:size-7 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 font-black text-[0.65rem] sm:text-xs text-black shadow">
                                      #1
                                    </span>
                                  ) : song.rank === 2 ? (
                                    <span className="inline-flex items-center justify-center size-6 sm:size-7 rounded-full bg-gradient-to-tr from-slate-200 to-slate-400 font-black text-[0.65rem] sm:text-xs text-black shadow">
                                      #2
                                    </span>
                                  ) : song.rank === 3 ? (
                                    <span className="inline-flex items-center justify-center size-6 sm:size-7 rounded-full bg-gradient-to-tr from-amber-700 to-orange-500 font-black text-[0.65rem] sm:text-xs text-white shadow">
                                      #3
                                    </span>
                                  ) : (
                                    <span className="font-mono text-xs sm:text-sm font-black text-white/40">
                                      #{song.rank}
                                    </span>
                                  )}
                                </div>

                                <div className="relative size-10 sm:size-12 shrink-0 overflow-hidden rounded-lg sm:rounded-xl bg-black/40 aspect-square shadow">
                                  <img
                                    src={song.thumbnail}
                                    alt={song.title}
                                    loading="lazy"
                                    decoding="async"
                                    onError={handleArtworkError}
                                    className="size-full object-cover"
                                  />
                                  {isCurrent && isPlaying && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                                      <Volume2 size={14} className="text-amber-400 animate-pulse" />
                                    </div>
                                  )}
                                </div>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1.5 sm:gap-2">
                                    <p
                                      translate="no"
                                      onClick={() =>
                                        handleTogglePlayTrending(song, song.rank - 1)
                                      }
                                      className={`notranslate truncate text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                                        isCurrent
                                          ? 'text-amber-300'
                                          : 'text-white group-hover:text-amber-300'
                                      }`}
                                    >
                                      {song.title}
                                    </p>
                                    <span
                                      translate="no"
                                      className="notranslate hidden lg:inline-block rounded-md bg-white/5 px-1.5 py-0.5 text-[0.62rem] text-white/60 shrink-0"
                                    >
                                      {song.movie}
                                    </span>
                                  </div>
                                  <p
                                    translate="no"
                                    className="notranslate truncate text-[0.68rem] sm:text-xs text-white/50"
                                  >
                                    {song.singers}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-1 sm:gap-2.5 shrink-0 ml-1.5 sm:ml-2">
                                <span className="hidden xl:inline-block rounded-full bg-amber-400/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-amber-300 border border-amber-400/20">
                                  {song.tag}
                                </span>

                                <span className="font-mono text-xs text-white/40 hidden sm:inline-block">
                                  {song.duration}
                                </span>

                                <button
                                  type="button"
                                  onClick={() =>
                                    toggleLike({
                                      id: song.id,
                                      title: song.title,
                                      artist: song.singers,
                                      thumbnail: song.thumbnail,
                                      duration: song.duration,
                                    })
                                  }
                                  aria-label={isLiked ? 'Unlike' : 'Like'}
                                  className={`grid size-8 place-items-center rounded-full transition-colors ${
                                    isLiked
                                      ? 'text-rose-500'
                                      : 'text-white/35 hover:text-white'
                                  }`}
                                >
                                  <Heart size={15} fill={isLiked ? 'currentColor' : 'none'} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    setPlaylistModalSong({
                                      id: song.id,
                                      title: song.title,
                                      artist: song.singers,
                                      thumbnail: song.thumbnail,
                                    })
                                  }
                                  aria-label="Add to Playlist"
                                  className="grid size-8 place-items-center rounded-full text-white/45 hover:text-amber-300 transition-colors"
                                >
                                  <Plus size={15} />
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleTogglePlayTrending(song, song.rank - 1)}
                                  aria-label={isCurrent && isPlaying ? 'Pause song' : 'Play song'}
                                  className="grid size-8 sm:size-9 place-items-center rounded-full bg-white/10 text-white group-hover:bg-amber-400 group-hover:text-black transition-colors shadow shrink-0"
                                >
                                  {isCurrent && isPlaying ? (
                                    <Pause size={13} fill="currentColor" />
                                  ) : (
                                    <Play size={13} fill="currentColor" className="ml-0.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* 5-BY-5 PAGINATION */}
                      <div className="mt-3 sm:mt-5 flex items-center justify-between gap-2 pt-3 border-t border-white/5">
                        {!isExpandAll && selectedPage > 1 ? (
                          <button
                            type="button"
                            onClick={() => setSelectedPage((p) => Math.max(1, p - 1))}
                            className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3.5 sm:px-4 py-1.5 text-[0.7rem] sm:text-xs font-semibold text-white/80 hover:bg-white/10 transition-colors"
                          >
                            ← Prev 5
                          </button>
                        ) : (
                          <div />
                        )}

                        <div className="flex items-center gap-1.5 sm:gap-2">
                          {!isExpandAll && selectedPage < 5 && (
                            <button
                              type="button"
                              onClick={() => setSelectedPage((p) => Math.min(5, p + 1))}
                              className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3.5 sm:px-5 py-1.5 text-[0.7rem] sm:text-xs font-bold text-black shadow hover:scale-102 active:scale-98 transition-transform"
                            >
                              <span>
                                Next 5 ({selectedPage * 5 + 1}-{(selectedPage + 1) * 5})
                              </span>
                              <ChevronRight size={13} />
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => setIsExpandAll((prev) => !prev)}
                            className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 sm:px-4 py-1.5 text-[0.7rem] sm:text-xs font-semibold text-amber-300 hover:bg-amber-400/20 transition-colors"
                          >
                            {isExpandAll ? 'Show 5' : 'All 25'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* ========================================================
                    MOOD & VIBE STATIONS (SEO & Nostalgic Radios)
                   ======================================================== */}
                {(activeCategory === 'all' || activeCategory === 'vibes') && (
                  <section className="space-y-3.5">
                    {activeCategory === 'vibes' ? (
                      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-400/30 bg-gradient-to-r from-amber-500/15 via-[#0d131f] to-orange-500/10 p-4 sm:p-7 shadow-xl">
                        <div className="relative z-10 max-w-2xl">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300">
                            <Radio size={14} />
                            <span>Desi Ambient Radios • 7 Iconic Indian Atmospheres</span>
                          </div>
                          <h2 className="mt-1 sm:mt-2 text-xl sm:text-3xl font-black text-white leading-tight">
                            Mood & Vibe Stations
                          </h2>
                          <p className="mt-1 text-xs sm:text-sm text-white/75 leading-relaxed">
                            Handcrafted aesthetic soundscapes and nostalgic music for every Indian mood. Tap any station to start audio and enter its full-screen visual world.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles size={16} className="text-amber-400" />
                          <h2 className="text-sm sm:text-base font-bold text-white">
                            Curated Mood & Vibe Stations
                          </h2>
                          <span className="rounded-full bg-amber-400/15 border border-amber-400/30 px-2 py-0.5 text-[0.62rem] font-bold text-amber-300">
                            Ambient Radios
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleSelectCategory('vibes')}
                          className="text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 active:scale-95"
                        >
                          See All (7) →
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
                      {(activeCategory === 'all' ? WORLDS.slice(0, 4) : WORLDS).map((world) => {
                        const isCurrentWorld = currentWorld.id === world.id;
                        return (
                          <div
                            key={`vibe-${world.id}`}
                            onClick={() => handlePlayVibeStation(world)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handlePlayVibeStation(world);
                              }
                            }}
                            className={`group relative overflow-hidden rounded-2xl border p-3 sm:p-3.5 flex flex-col justify-between transition-all select-none cursor-pointer hover:scale-[1.02] active:scale-[0.99] ${
                              isCurrentWorld
                                ? 'border-amber-400/60 bg-[#141b2a] shadow-lg shadow-amber-500/15 ring-1 ring-amber-400/30'
                                : 'border-white/10 bg-[#0d131f] hover:border-amber-400/40 hover:bg-[#121927]'
                            }`}
                          >
                            {/* Background ambient subtle image accent */}
                            <div
                              className="pointer-events-none absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity bg-cover bg-center"
                              style={{ backgroundImage: `url(${world.bg})` }}
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0d131f] via-[#0d131f]/85 to-transparent" />

                            <div className="relative z-10">
                              <div className="flex items-center justify-between">
                                <span
                                  className="size-7 sm:size-8 grid place-items-center rounded-xl text-sm shadow"
                                  style={{
                                    backgroundColor: `${world.themeColor}25`,
                                    border: `1px solid ${world.themeColor}50`,
                                  }}
                                >
                                  {world.id === 'chai_tapri'
                                    ? '☕'
                                    : world.id === 'monsoon_barish'
                                      ? '🌧️'
                                      : world.id === 'highway_dhaba'
                                        ? '🌙'
                                        : world.id === 'deluxe_salon'
                                          ? '✂️'
                                          : world.id === 'sufi_ghazal'
                                            ? '🕊️'
                                            : world.id === 'corporate_majdoor'
                                              ? '💻'
                                              : '🧹'}
                                </span>
                                <span className="font-mono text-[0.6rem] uppercase tracking-wider text-white/40">
                                  {world.tracks.length} Songs
                                </span>
                              </div>

                              <h3 className="mt-2 text-sm sm:text-base font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                                {world.nameHindi}
                              </h3>
                              <p className="font-mono text-[0.68rem] text-amber-400/90 font-medium truncate mt-0.5">
                                {world.name}
                              </p>
                              <p className="text-[0.68rem] sm:text-xs text-white/55 line-clamp-2 mt-1 leading-relaxed">
                                {world.tagline || world.subtitle}
                              </p>
                            </div>

                            <div className="relative z-10 mt-3 pt-2.5 border-t border-white/5">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePlayVibeStation(world);
                                }}
                                className={`w-full flex items-center justify-center gap-1.5 rounded-xl py-1.5 sm:py-2 px-3 text-xs font-bold transition-all shadow-md ${
                                  isCurrentWorld && isPlaying
                                    ? 'bg-amber-400 text-black shadow-amber-400/30'
                                    : 'bg-white/10 text-white group-hover:bg-amber-400 group-hover:text-black active:scale-95'
                                }`}
                              >
                                {isCurrentWorld && isPlaying ? (
                                  <>
                                    <Sparkles size={13} className="shrink-0" />
                                    <span>Playing & Open Vibe</span>
                                  </>
                                ) : (
                                  <>
                                    <Play size={12} fill="currentColor" className="shrink-0" />
                                    <span>Play Vibe</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* ========================================================
                    SECTION 2: POPULAR INDIAN ARTISTS
                   ======================================================== */}
                {(activeCategory === 'all' || activeCategory === 'artists') && (
                  <section className="space-y-4">
                    <div className="flex items-end justify-between gap-2">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                          Popular Artists
                        </h2>
                        <p className="text-xs text-white/50 mt-0.5">
                          The voices and composers defining Indian sound
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-amber-400 shrink-0">
                        {visibleArtists.length} / {ARTISTS_CATALOG.length}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 xs:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2.5 sm:gap-4">
                      {visibleArtists.map((artist, aIdx) => {
                        if (!artist) return null;
                        return (
                          <div
                            key={artist.id || `artist-${aIdx}`}
                            onClick={() => openArtist(artist)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                openArtist(artist);
                              }
                            }}
                            className="group relative flex flex-col rounded-xl sm:rounded-2xl border border-white/5 bg-[#0e1420] p-2.5 sm:p-3.5 transition-colors hover:border-amber-400/40 hover:bg-[#131c2b] cursor-pointer shadow-md"
                          >
                            <div className="relative aspect-square w-full overflow-hidden rounded-full shadow-lg bg-black/40 border-2 border-white/10 group-hover:border-amber-400 transition-colors">
                              <img
                                src={artist.avatar}
                                alt={artist.name}
                                loading="lazy"
                                decoding="async"
                                referrerPolicy="no-referrer"
                                onError={handleArtworkError}
                                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />

                              <button
                                type="button"
                                onClick={(e) => handleTogglePlayArtist(artist, e)}
                                aria-label={`Play ${artist.name}`}
                                className="absolute bottom-1 right-1 grid size-8 sm:size-10 place-items-center rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-black shadow opacity-100 sm:opacity-0 sm:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:scale-105 active:scale-95"
                              >
                                {artist.topTracks?.[0] &&
                                currentTrackId === artist.topTracks[0].id &&
                                isPlaying ? (
                                  <Pause size={14} fill="black" />
                                ) : (
                                  <Play size={14} fill="black" className="ml-0.5" />
                                )}
                              </button>
                            </div>

                            <div className="mt-2.5 min-w-0 text-center">
                              <h3
                                translate="no"
                                className="notranslate truncate text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors"
                              >
                                {artist.name}
                              </h3>
                              <p className="mt-0.5 text-[0.65rem] sm:text-[0.7rem] text-white/50 font-medium">
                                Artist
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {activeCategory !== 'artists' &&
                      displayedArtistsCount < ARTISTS_CATALOG.length && (
                        <div className="flex justify-center pt-1">
                          <button
                            type="button"
                            onClick={handleLoadMoreArtists}
                            className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                          >
                            <ChevronDown size={14} className="text-amber-400" />
                            <span>Show More Artists (+12)</span>
                            <span className="text-[0.62rem] text-white/40">
                              {displayedArtistsCount}/{ARTISTS_CATALOG.length}
                            </span>
                          </button>
                        </div>
                      )}
                  </section>
                )}

                {/* ========================================================
                    SECTION 3: MY PLAYLISTS (Browser Storage + Track Inspection)
                   ======================================================== */}
                {((activeCategory === 'all' && userPlaylists.length > 0) ||
                  activeCategory === 'playlists') && (
                  <section className="space-y-4">
                    <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-3">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white">My Playlists</h2>
                        <p className="text-xs text-white/50 mt-0.5">
                          Saved locally in your browser cache
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsCreatingNewPl(true)}
                        className="self-start xs:self-auto flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-black shadow hover:scale-105 active:scale-95 transition-transform"
                      >
                        <Plus size={15} /> Create Playlist
                      </button>
                    </div>

                    {isCreatingNewPl && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (!newPlaylistTitle.trim()) return;
                          createPlaylist(newPlaylistTitle.trim());
                          setNewPlaylistTitle('');
                          setIsCreatingNewPl(false);
                        }}
                        className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2.5 rounded-2xl border border-amber-500/40 bg-[#0e1622] p-3.5 sm:p-4 shadow-xl"
                      >
                        <input
                          type="text"
                          value={newPlaylistTitle}
                          onChange={(e) => setNewPlaylistTitle(e.target.value)}
                          placeholder="Playlist name (e.g. Chai Beats, Late Night)..."
                          autoFocus
                          className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none py-1"
                        />
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            type="submit"
                            className="rounded-full bg-amber-400 px-4 py-1.5 text-xs font-bold text-black"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsCreatingNewPl(false)}
                            className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/70 hover:text-white"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Inspected Playlist Detail Card */}
                    {inspectedPlaylist ? (
                      <div className="rounded-2xl border border-amber-400/30 bg-[#0c121b] p-4 sm:p-6 space-y-4">
                        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                          <div>
                            <button
                              type="button"
                              onClick={() => setSelectedPlaylistId(null)}
                              className="text-xs font-medium text-amber-400 hover:underline mb-1 block"
                            >
                              ← Back to all playlists
                            </button>
                            <h3 className="text-lg sm:text-xl font-bold text-white">
                              {inspectedPlaylist.name}
                            </h3>
                            <p className="text-xs text-white/50">
                              {inspectedPlaylist.tracks.length} tracks
                            </p>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              disabled={inspectedPlaylist.tracks.length === 0}
                              onClick={() => handleTogglePlayPlaylist(inspectedPlaylist, 0)}
                              className="flex items-center gap-1.5 rounded-full bg-amber-400 px-4 py-2 text-xs font-bold text-black disabled:opacity-40"
                            >
                              <Play size={13} fill="black" /> Play All
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                deletePlaylist(inspectedPlaylist.id);
                                setSelectedPlaylistId(null);
                              }}
                              aria-label="Delete playlist"
                              className="grid size-9 place-items-center rounded-full bg-white/10 text-rose-400 hover:bg-rose-500/20"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>

                        {inspectedPlaylist.tracks.length === 0 ? (
                          <div className="py-8 text-center text-xs sm:text-sm text-white/45">
                            Playlist is empty. Tap &ldquo;+&rdquo; on any song to add tracks here!
                          </div>
                        ) : (
                          <div className="divide-y divide-white/5">
                            {inspectedPlaylist.tracks.map((tr, tIdx) => {
                              const isCur = currentTrackId === tr.id;
                              return (
                                <div
                                  key={`${inspectedPlaylist.id}-${tr.id}-${tIdx}`}
                                  className="flex items-center justify-between gap-2 py-2.5 px-2 rounded-xl hover:bg-white/5"
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleTogglePlayPlaylist(inspectedPlaylist, tIdx)
                                    }
                                    className="flex items-center gap-3 min-w-0 flex-1 text-left"
                                  >
                                    <span className="w-5 font-mono text-xs text-white/40 text-center shrink-0">
                                      {tIdx + 1}
                                    </span>
                                    <div className="size-10 rounded-lg overflow-hidden bg-black/40 shrink-0 aspect-square">
                                      <img
                                        src={tr.thumbnail}
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
                                          isCur ? 'text-amber-300' : 'text-white'
                                        }`}
                                      >
                                        {tr.title}
                                      </p>
                                      <p translate="no" className="notranslate truncate text-[0.68rem] text-white/50">
                                        {tr.artist}
                                      </p>
                                    </div>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => removeFromPlaylist(inspectedPlaylist.id, tr.id)}
                                    aria-label="Remove from playlist"
                                    className="grid size-8 place-items-center rounded-full text-white/40 hover:text-rose-400 transition-colors shrink-0"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ) : userPlaylists.length === 0 ? (
                      <div className="rounded-2xl border border-dashed border-white/15 bg-[#0c121b]/60 p-8 text-center">
                        <FolderHeart size={28} className="mx-auto text-white/30 mb-2" />
                        <p className="text-sm text-white/60">
                          No playlists yet. Create your own mood mix!
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                        {userPlaylists.map((pl) => (
                          <div
                            key={pl.id}
                            onClick={() => setSelectedPlaylistId(pl.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setSelectedPlaylistId(pl.id);
                              }
                            }}
                            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0e1420] p-4 sm:p-5 hover:border-amber-400/40 hover:bg-[#121a29] transition-colors shadow-md cursor-pointer"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <h3 className="truncate text-base sm:text-lg font-bold text-white">
                                  {pl.name}
                                </h3>
                                <p className="text-xs text-white/50 mt-0.5">
                                  {pl.tracks.length} tracks
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deletePlaylist(pl.id);
                                }}
                                aria-label={`Delete ${pl.name}`}
                                className="grid size-7 place-items-center rounded-full text-white/30 hover:bg-white/10 hover:text-rose-400 transition-colors shrink-0"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                            <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                              <button
                                type="button"
                                disabled={pl.tracks.length === 0}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleTogglePlayPlaylist(pl, 0);
                                }}
                                className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:underline disabled:opacity-40"
                              >
                                {pl.tracks[0] &&
                                currentTrackId === pl.tracks[0].id &&
                                isPlaying ? (
                                  <>
                                    <Pause size={13} fill="currentColor" /> Pause Playlist
                                  </>
                                ) : (
                                  <>
                                    <Play size={13} fill="currentColor" /> Play Playlist
                                  </>
                                )}
                              </button>
                              <span className="text-[0.65rem] text-white/40">Open tracks →</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                )}

                {/* ========================================================
                    SECTION 4: LIKED SONGS
                   ======================================================== */}
                {((activeCategory === 'all' && likedSongs.length > 0) ||
                  activeCategory === 'favorites') && (
                  <section className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl sm:rounded-3xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-[#0e1420] to-black p-4 sm:p-7 shadow-md">
                      <div>
                        <span className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-widest text-rose-400">
                          Your Favorites
                        </span>
                        <h2 className="text-xl sm:text-3xl font-black text-white mt-0.5 sm:mt-1">
                          Liked Songs
                        </h2>
                        <p className="text-xs text-white/55 mt-0.5">
                          {likedSongs.length} songs saved in your browser
                        </p>
                      </div>

                      {likedSongs.length > 0 && (
                        <button
                          type="button"
                          onClick={() => handleTogglePlayStored(likedSongs[0], 0)}
                          className="self-start sm:self-auto flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-5 sm:px-6 py-2 sm:py-2.5 text-xs font-bold text-white shadow hover:scale-105 active:scale-95 transition-transform"
                        >
                          {currentTrackId === likedSongs[0].id && isPlaying ? (
                            <>
                              <Pause size={14} fill="white" /> Pause Favorites
                            </>
                          ) : (
                            <>
                              <Play size={14} fill="white" /> Play Favorites
                            </>
                          )}
                        </button>
                      )}
                    </div>

                    {likedSongs.length > 0 ? (
                      <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-[#0d131f] p-2 sm:p-3 shadow-md">
                        {likedSongs.slice(0, 15).map((track, i) => {
                          if (!track) return null;
                          const isCur = currentTrackId === track.id;
                          return (
                            <div
                              key={`liked-${track.id}-${i}`}
                              className="group flex items-center justify-between gap-2 p-2 sm:p-3 rounded-xl hover:bg-white/5 transition-colors"
                            >
                              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                                <span className="w-5 text-center font-mono text-xs text-white/40 shrink-0">
                                  {i + 1}
                                </span>
                                <div className="size-10 sm:size-11 rounded-lg overflow-hidden bg-black/40 aspect-square shrink-0 shadow">
                                  <img
                                    src={track.thumbnail}
                                    alt=""
                                    loading="lazy"
                                    decoding="async"
                                    referrerPolicy="no-referrer"
                                    onError={handleArtworkError}
                                    className="size-full object-cover"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p
                                    translate="no"
                                    className={`notranslate truncate text-xs sm:text-sm font-semibold transition-colors ${
                                      isCur
                                        ? 'text-amber-300'
                                        : 'text-white group-hover:text-amber-300'
                                    }`}
                                  >
                                    {track.title}
                                  </p>
                                  <p
                                    translate="no"
                                    className="notranslate truncate text-[0.68rem] sm:text-xs text-white/50"
                                  >
                                    {track.artist}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => toggleLike(track)}
                                  aria-label="Remove from liked songs"
                                  className="grid size-8 place-items-center rounded-full text-rose-500 hover:text-white transition-colors"
                                >
                                  <Heart size={15} fill="currentColor" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleTogglePlayStored(track, i)}
                                  aria-label={isCur && isPlaying ? 'Pause song' : 'Play song'}
                                  className="grid size-8 place-items-center rounded-full bg-white/10 text-white group-hover:bg-amber-400 group-hover:text-black transition-colors"
                                >
                                  {isCur && isPlaying ? (
                                    <Pause size={13} fill="currentColor" />
                                  ) : (
                                    <Play size={13} fill="currentColor" className="ml-0.5" />
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="rounded-3xl border border-white/10 bg-[#0d131f]/70 p-8 sm:p-12 text-center flex flex-col items-center justify-center max-w-md mx-auto my-6 shadow-xl">
                        <div className="size-16 rounded-2xl bg-rose-500/10 border border-rose-500/25 grid place-items-center mb-4 shadow-inner text-rose-400">
                          <Heart size={28} />
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white">No Liked Songs Yet</h3>
                        <p className="text-xs text-white/50 mt-1 max-w-xs leading-relaxed">
                          Tap the heart icon on any song while listening to build your personal offline favorites collection.
                        </p>
                        <button
                          type="button"
                          onClick={() => handleSelectCategory('trending')}
                          className="mt-5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-5 py-2 text-xs font-bold text-black shadow hover:scale-105 active:scale-95 transition-transform"
                        >
                          Explore Top 25 Trending Hits
                        </button>
                      </div>
                    )}
                  </section>
                )}
              </>
            )}

            {/* ========================================================
                SLIM & STREAMLINED FOOTER (Home & Vibes Discovery)
               ======================================================== */}
            {(activeCategory === 'all' || activeCategory === 'vibes') && (
              <footer className="mt-12 border-t border-white/5 pt-8 pb-6 text-white/50 space-y-6 select-none">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
                  {/* Column 1: Brand Info */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-xl bg-amber-400 text-black font-black grid place-items-center text-sm shadow">
                        V
                      </div>
                      <div>
                        <span className="text-sm font-black text-white tracking-tight">
                          vybz<span className="text-amber-400">.</span>
                        </span>
                        <p className="font-mono text-[0.55rem] uppercase tracking-widest text-amber-400/80">
                          Indian Audio Hub
                        </p>
                      </div>
                    </div>
                    <p className="text-[0.72rem] text-white/50 leading-relaxed">
                      Ad-free modern Indian music player. Daily Top 25 trending hits, 50+ iconic Bollywood artists, and 7 ambient vibe stations.
                    </p>
                    <div className="flex items-center gap-2 text-[0.68rem] text-amber-400/90 font-medium">
                      <span>⚡ 100% Ad-Free</span>
                      <span>•</span>
                      <span>🎧 0ms Buffer</span>
                      <span>•</span>
                      <span>📱 PWA & APK</span>
                    </div>
                  </div>

                  {/* Column 2: Exact Live Ambient Vibe Stations */}
                  <div className="space-y-2">
                    <h3 className="font-mono text-[0.68rem] uppercase tracking-wider text-white/90 font-bold">
                      Mood & Vibe Stations (7)
                    </h3>
                    <ul className="space-y-1 text-[0.72rem] text-white/50">
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            const w = WORLDS.find((x) => x.id === 'chai_tapri');
                            if (w) handlePlayVibeStation(w);
                          }}
                          className="hover:text-amber-300 transition-colors text-left"
                        >
                          ☕ Chai Tapri Radio (Garam Chai & Purane Gaane)
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            const w = WORLDS.find((x) => x.id === 'deluxe_salon');
                            if (w) handlePlayVibeStation(w);
                          }}
                          className="hover:text-amber-300 transition-colors text-left"
                        >
                          ✂️ Deluxe 90s Salon (Ustaad Ji Specials)
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            const w = WORLDS.find((x) => x.id === 'monsoon_barish');
                            if (w) handlePlayVibeStation(w);
                          }}
                          className="hover:text-amber-300 transition-colors text-left"
                        >
                          🌧️ Monsoon Baarish (Rain & Romantic Geeta)
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            const w = WORLDS.find((x) => x.id === 'highway_dhaba');
                            if (w) handlePlayVibeStation(w);
                          }}
                          className="hover:text-amber-300 transition-colors text-left"
                        >
                          🌙 Late Night Highway Dhaba (Truck Radio)
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            const w = WORLDS.find((x) => x.id === 'sufi_ghazal');
                            if (w) handlePlayVibeStation(w);
                          }}
                          className="hover:text-amber-300 transition-colors text-left"
                        >
                          🕊️ Sufi & Sukoon (Qawwali & Roohani Ghazal)
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            const w = WORLDS.find((x) => x.id === 'corporate_majdoor');
                            if (w) handlePlayVibeStation(w);
                          }}
                          className="hover:text-amber-300 transition-colors text-left"
                        >
                          💻 Corporate Chill (Lo-Fi Study & Focus)
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => {
                            const w = WORLDS.find((x) => x.id === 'bartan_time');
                            if (w) handlePlayVibeStation(w);
                          }}
                          className="hover:text-amber-300 transition-colors text-left"
                        >
                          🧹 Bartan Time (Jhaadu, Pocha & Gaane)
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3: Top Artist Discographies */}
                  <div className="space-y-2">
                    <h3 className="font-mono text-[0.68rem] uppercase tracking-wider text-white/90 font-bold">
                      Top Artists (20 Hits Each)
                    </h3>
                    <ul className="grid grid-cols-2 gap-x-2 gap-y-1 text-[0.72rem] text-white/50">
                      {ARTISTS_CATALOG.slice(0, 10).map((a) => (
                        <li key={`footer-art-${a.id}`}>
                          <button
                            type="button"
                            onClick={() => openArtist(a)}
                            className="hover:text-amber-300 transition-colors text-left truncate w-full"
                          >
                            {a.name}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 4: Platform Actions */}
                  <div className="space-y-2.5">
                    <h3 className="font-mono text-[0.68rem] uppercase tracking-wider text-white/90 font-bold">
                      Quick Share & App
                    </h3>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => handleShareTrack()}
                        className="flex items-center justify-center gap-1.5 rounded-lg border border-amber-400/30 bg-amber-400/10 py-1.5 px-3 text-xs font-semibold text-amber-300 hover:bg-amber-400/20 active:scale-95 transition-all shadow-sm"
                      >
                        <Share2 size={13} /> Share VybZ with Friends
                      </button>
                      {installPrompt && (
                        <button
                          type="button"
                          onClick={handleInstallApp}
                          className="flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-1.5 px-3 text-xs font-medium text-white hover:bg-white/10 active:scale-95 transition-all"
                        >
                          <Download size={13} /> Install Web App (PWA)
                        </button>
                      )}
                      <p className="text-[0.65rem] text-white/40 leading-relaxed">
                        Install VybZ directly as a standalone app on Android or iOS.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[0.68rem] text-white/35">
                  <p>© 2026 VybZ Music • Official India Audio Hub • https://www.vybzmusic.online</p>
                  <div className="flex items-center gap-3">
                    <span>Crafted for Indian Music Lovers ❤️</span>
                    <span>•</span>
                    <span>No Ads</span>
                  </div>
                </div>
              </footer>
            )}
          </div>
        </main>
      </div>

      {/* Floating Share Toast */}
      {shareToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <span className="rounded-full bg-amber-400 px-4 py-1.5 text-xs font-bold text-black shadow-xl animate-fade-in flex items-center gap-1.5">
            <Sparkles size={13} /> {shareToast}
          </span>
        </div>
      )}

      {/* ========================================================
          ADD TO PLAYLIST MODAL
         ======================================================== */}
      {playlistModalSong && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setPlaylistModalSong(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Add to Playlist"
            className="w-full max-w-sm rounded-2xl border border-white/15 bg-[#0e1422] p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-bold text-white">Add to Playlist</h3>
            <p translate="no" className="notranslate text-xs text-white/50 mt-0.5 truncate">
              {playlistModalSong.title}
            </p>

            {userPlaylists.length === 0 ? (
              <p className="mt-4 text-xs text-white/55">
                No playlists found. Create one in &ldquo;My Playlists&rdquo; first!
              </p>
            ) : (
              <div className="mt-4 max-h-60 space-y-2 overflow-y-auto">
                {userPlaylists.map((pl) => (
                  <button
                    key={pl.id}
                    type="button"
                    onClick={() => {
                      addToPlaylist(pl.id, playlistModalSong);
                      setPlaylistModalSong(null);
                    }}
                    className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-white/5 p-3 text-left hover:border-amber-400/40 hover:bg-white/10 transition-colors"
                  >
                    <span className="truncate text-sm font-semibold text-white">{pl.name}</span>
                    <ChevronRight size={16} className="text-white/40 shrink-0" />
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setPlaylistModalSong(null)}
              className="mt-4 w-full rounded-xl bg-white/10 py-2 text-xs font-semibold text-white hover:bg-white/20"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
