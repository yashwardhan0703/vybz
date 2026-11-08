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
} from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { TOP_25_TRENDING_INDIAN, type TrendingTrack } from '../data/trendingSongs';
import { ARTISTS_CATALOG, type Artist, type ArtistSong } from '../data/artistsData';
import type { StoredTrack, UserPlaylist } from '../utils/localStorageHelper';
import type { QueueTrack } from '../hooks/useYouTube';

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

// Zero-network, offline-safe SVG avatar fallback that NEVER fails and NEVER triggers infinite loop
const SAFE_SVG_FALLBACK = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%231f2937'/%3E%3Ccircle cx='50' cy='38' r='20' fill='%23f59e0b'/%3E%3Cpath d='M20 90 A30 30 0 0 1 80 90 Z' fill='%23f59e0b' opacity='0.7'/%3E%3C/svg%3E";

function cleanSongTitle(raw: string): string {
  if (!raw) return '';
  return raw
    .replace(/[([][^\])]*?(official|video|audio|lyrics|lyrical|full song|teaser|trailer|4k|hd|remix|slowed|reverb)[^\])]*?[\])]/gi, '')
    .replace(/\s*\|\s*(t-series|zee music company|sony music india|tips official|yrf|speed records|saregama|white hill).*$/gi, '')
    .replace(/\s*\|\s*$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// Consistent warm acoustic Indian audio styling
const themeStyles = {
  accent: '#f59e0b',
  accentGradient: 'from-amber-400 via-amber-500 to-orange-500',
  badgeBg: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
  borderGlow: 'border-amber-500/30',
  heroGrad: 'from-[#191107] via-[#120d06] to-[#080c14]',
};

export default function UniqueIndianPlayer({
  onPlayCustomVideoId,
  onPlay,
  onPause,
}: UniqueIndianPlayerProps) {
  const {
    likedSongs,
    toggleLike,
    userPlaylists,
    createPlaylist,
    addToPlaylist,
    toggleSearch,
    toggleViewMode,
    currentTrackId,
    isPlaying,
    currentWorld,
  } = usePlayerStore();

  // Navigation & Category
  const [activeCategory, setActiveCategory] = useState<'all' | 'trending' | 'artists' | 'playlists' | 'favorites'>('all');
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  // Sync selected artist with browser history & URL hash (#artist/pritam)
  // This enables native mobile back gesture & browser back button!
  useEffect(() => {
    // 1. Initial load from hash if present
    const hash = window.location.hash;
    if (hash.startsWith('#artist/')) {
      const artId = hash.replace('#artist/', '');
      const found = ARTISTS_CATALOG.find((a) => a.id === artId);
      if (found) {
        setSelectedArtist(found);
      }
    }

    // 2. Listen to browser Back / Forward events (popstate)
    const handlePopState = () => {
      const currentHash = window.location.hash;
      if (currentHash.startsWith('#artist/')) {
        const artId = currentHash.replace('#artist/', '');
        const found = ARTISTS_CATALOG.find((a) => a.id === artId);
        setSelectedArtist(found || null);
      } else {
        setSelectedArtist(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openArtist = (artist: Artist) => {
    window.history.pushState({ type: 'artist', artistId: artist.id }, '', `#artist/${artist.id}`);
    setSelectedArtist(artist);
  };

  const closeArtist = () => {
    if (window.location.hash.startsWith('#artist/')) {
      window.history.back();
    } else {
      setSelectedArtist(null);
    }
  };

  // 5-by-5 Pagination State for Top 25
  const [selectedPage, setSelectedPage] = useState<number>(1);
  const [isExpandAll, setIsExpandAll] = useState<boolean>(false);

  // 5-by-5 Pagination State & Dynamic Search for Selected Artist
  const [artistPage, setArtistPage] = useState<number>(1);
  const [isArtistExpandAll, setIsArtistExpandAll] = useState<boolean>(false);
  const [artistTracksMap, setArtistTracksMap] = useState<Record<string, ArtistSong[]>>({});
  const [isSearchingArtist, setIsSearchingArtist] = useState<boolean>(false);

  // Progressive Display for Popular Artists (Initial 12, load more +12)
  const [displayedArtistsCount, setDisplayedArtistsCount] = useState<number>(12);

  // Auto-search real YouTube songs when an artist is selected (Cached in localStorage for instant 0ms reload)
  useEffect(() => {
    if (!selectedArtist) return;
    const artistId = selectedArtist.id;
    setArtistPage(1);
    setIsArtistExpandAll(false);

    // 1. Check in-memory state or localStorage cache first
    const cacheKey = `vybz_art_v3_${artistId}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length >= 5) {
          setArtistTracksMap((prev) => ({ ...prev, [artistId]: parsed }));
          return;
        }
      }
    } catch {
      // Ignore cache read errors
    }

    // 2. Fetch live YouTube search for this artist
    let isMounted = true;
    setIsSearchingArtist(true);

    const fetchArtistSongs = async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(selectedArtist.name + ' songs hit')}`);
        if (!res.ok) throw new Error('Search failed');
        const data = await res.json();
        if (!isMounted) return;

        if (Array.isArray(data.results) && data.results.length > 0) {
          const stopWords = ['jukebox', 'all songs', 'non stop', 'full album', 'compilation', 'podcast', 'mashup 1 hour', 'interview'];
          const cleanResults: ArtistSong[] = data.results
            .filter((item: any) => {
              const titleLower = (item.title || '').toLowerCase();
              return !stopWords.some((sw) => titleLower.includes(sw));
            })
            .map((item: any) => ({
              id: item.id,
              title: cleanSongTitle(item.title),
              album: item.artist || selectedArtist.name,
              duration: item.duration || '3:45',
            }))
            .slice(0, 20);

          if (cleanResults.length >= 3) {
            setArtistTracksMap((prev) => ({ ...prev, [artistId]: cleanResults }));
            try {
              localStorage.setItem(cacheKey, JSON.stringify(cleanResults));
            } catch {
              // Ignore cache write errors
            }
          }
        }
      } catch {
        // Fallback remains active
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
  }, [selectedArtist?.id]);

  // Playlist creation
  const [playlistModalSong, setPlaylistModalSong] = useState<StoredTrack | null>(null);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState('');
  const [isCreatingNewPl, setIsCreatingNewPl] = useState(false);

  // Safe image error handler to prevent browser call-stack crashes
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    el.onerror = null; // Break any possible infinite loop
    el.src = SAFE_SVG_FALLBACK;
  };

  // Toggle Play / Pause trending song (with continuous Top 25 queue)
  const handleTogglePlayTrending = (track: TrendingTrack, index?: number) => {
    if (!track) return;
    if (currentTrackId === track.id) {
      if (isPlaying) {
        onPause();
      } else {
        onPlay();
      }
      return;
    }
    const trendingQueue: QueueTrack[] = TOP_25_TRENDING_INDIAN.map((t) => ({
      id: t.id,
      title: `${t.title} (${t.movie})`,
      artist: t.singers,
      thumbnail: t.thumbnail,
      duration: t.duration,
    }));
    const trackIdx =
      index !== undefined ? index : TOP_25_TRENDING_INDIAN.findIndex((t) => t.id === track.id);
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

  // Toggle Play / Pause stored track (with Liked Songs queue)
  const handleTogglePlayStored = (track: StoredTrack, index?: number) => {
    if (!track) return;
    if (currentTrackId === track.id) {
      if (isPlaying) {
        onPause();
      } else {
        onPlay();
      }
      return;
    }
    const likedQueue: QueueTrack[] = likedSongs.map((t) => ({
      id: t.id,
      title: t.title,
      artist: t.artist,
      thumbnail: t.thumbnail,
      duration: t.duration,
    }));
    const lIdx = index !== undefined ? index : likedSongs.findIndex((t) => t.id === track.id);
    onPlayCustomVideoId(
      track.id,
      track.title,
      track.artist,
      track.thumbnail,
      likedQueue,
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
      if (isPlaying) {
        onPause();
      } else {
        onPlay();
      }
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
      if (isPlaying) {
        onPause();
      } else {
        onPlay();
      }
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

  // Page Switcher (5 per page)
  const handleSelectPage = (pageNum: number) => {
    setIsExpandAll(false);
    setSelectedPage(pageNum);
  };

  // Load More Artists (Instant & synchronous, no async race condition)
  const handleLoadMoreArtists = () => {
    setDisplayedArtistsCount((prev) => Math.min(prev + 12, ARTISTS_CATALOG.length));
  };

  // Visible songs: Either 5-song batch or all 25
  const startIdx = (selectedPage - 1) * 5;
  const visibleTrendingSongs = isExpandAll
    ? TOP_25_TRENDING_INDIAN
    : TOP_25_TRENDING_INDIAN.slice(startIdx, startIdx + 5);

  // Selected Artist Tracks (From dynamic search or curated tracks)
  const currentArtistTracks: ArtistSong[] =
    (selectedArtist ? artistTracksMap[selectedArtist.id] : null) ||
    (selectedArtist?.topTracks && selectedArtist.topTracks.length > 0 ? selectedArtist.topTracks : []);

  const artistStartIdx = (artistPage - 1) * 5;
  const visibleArtistTracks = isArtistExpandAll
    ? currentArtistTracks
    : currentArtistTracks.slice(artistStartIdx, artistStartIdx + 5);

  // Visible artists: If user clicked 'Popular Artists' tab, show all 50; otherwise progressive slice
  const visibleArtists =
    activeCategory === 'artists'
      ? ARTISTS_CATALOG
      : ARTISTS_CATALOG.slice(0, displayedArtistsCount);

  return (
    <div className="relative flex flex-1 flex-col overflow-hidden bg-[#070a10] text-white">
      {/* ========================================================
          FAST HARDWARE-ACCELERATED BACKGROUND (Zero Filter/Zero Blur)
         ======================================================== */}
      {/* 1. Fast CSS radial radiant glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(245,158,11,0.12),transparent_70%)]" />

      {/* 2. Soundwave acoustic dot matrix pattern */}
      <div className="pointer-events-none absolute inset-0 opacity-15 [background-image:radial-gradient(rgba(245,158,11,0.2)_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* ========================================================
          1. TOP APP BAR (Solid Dark Surface - Fast 60 FPS Render)
         ======================================================== */}
      <header className="relative z-30 flex items-center justify-between border-b border-white/10 bg-[#090d14] px-3.5 pt-[max(0.6rem,env(safe-area-inset-top))] pb-2.5 sm:px-8 sm:py-3 shadow-md">
        {/* Brand & Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <div
            className="relative flex size-8 sm:size-10 items-center justify-center rounded-xl sm:rounded-2xl bg-amber-400/10 p-0.5 border border-amber-400/25 shadow-md shrink-0 group hover:scale-105 transition-transform"
          >
            <img
              src="/logo.png"
              alt="vybz logo"
              className="size-full object-contain filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.5)]"
            />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-white lowercase">
                vybz<span className={`bg-gradient-to-r ${themeStyles.accentGradient} bg-clip-text text-transparent font-black`}>.</span>
              </h1>
              <span className={`hidden sm:inline-block rounded-full px-1.5 sm:px-2 py-0.5 text-[0.55rem] sm:text-[0.62rem] font-bold uppercase tracking-wider border ${themeStyles.badgeBg} shrink-0`}>
                Top 25 Live
              </span>
            </div>
            <p className="hidden md:block text-[0.58rem] sm:text-[0.65rem] text-white/50 tracking-wider font-mono truncate">
              DESI MUSIC STREAMING • REAL-TIME ENGINE
            </p>
          </div>
        </div>

        {/* Center: Real-Time Lyrics Search */}
        <div
          onClick={toggleSearch}
          className="group hidden md:flex items-center gap-2.5 rounded-2xl border border-white/10 bg-[#0e1420] px-3.5 py-2 cursor-pointer hover:border-amber-400/40 hover:bg-[#131b2a] transition-colors flex-1 max-w-xs lg:max-w-md mx-3 lg:mx-6"
        >
          <Search size={15} className="text-amber-400 group-hover:scale-105 transition-transform shrink-0" />
          <span className="truncate text-xs text-white/50 font-sans">
            Search lyrics: &ldquo;aaj kal tanha main kahan hoon&rdquo;...
          </span>
          <kbd className="ml-auto rounded-lg bg-white/10 px-1.5 py-0.5 text-[0.6rem] font-mono text-white/40 shrink-0">
            /
          </kbd>
        </div>

        {/* Right Actions: Mobile Search + Vibe Mode Switch */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Search Button for Mobile */}
          <button
            type="button"
            onClick={toggleSearch}
            className="md:hidden grid size-8 sm:size-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-amber-400 hover:bg-white/10 active:scale-95 transition-transform"
            title="Search songs & lyrics"
            aria-label="Search songs"
          >
            <Search size={16} />
          </button>

          {/* VIBE MODE BUTTON */}
          <button
            type="button"
            onClick={toggleViewMode}
            className="group flex items-center gap-1 sm:gap-1.5 rounded-xl sm:rounded-2xl border border-amber-400/40 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/10 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[0.7rem] sm:text-xs font-bold text-amber-300 shadow hover:border-amber-400 active:scale-95 transition-transform shrink-0"
            title="Switch to ambient retro world (Chai Tapri / Salon / Bartan Time)"
          >
            <Sparkles size={13} className="text-amber-400 group-hover:rotate-12 transition-transform shrink-0" />
            <span className="sm:hidden">Vibe</span>
            <span className="hidden sm:inline">Vibe Mode</span>
            <span translate="no" className="notranslate hidden xl:inline text-[0.65rem] opacity-75 font-normal">
              ({currentWorld.nameHindi})
            </span>
          </button>
        </div>
      </header>

      {/* ========================================================
          2. HORIZONTAL CATEGORY NAVIGATION BAR
         ======================================================== */}
      <nav
        aria-label="Categories"
        className="relative z-20 flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar border-b border-white/5 bg-[#080c14] px-3.5 py-2 sm:px-8 sm:py-2.5 touch-pan-x"
      >
        <button
          type="button"
          onClick={() => {
            setActiveCategory('all');
            setSelectedArtist(null);
          }}
          className={`flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[0.7rem] sm:text-xs font-bold transition-colors shrink-0 ${
            activeCategory === 'all' && !selectedArtist
              ? `bg-gradient-to-r ${themeStyles.accentGradient} text-black shadow`
              : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          <LayoutGrid size={13} />
          <span>All</span>
          <span className="hidden xs:inline">Music</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveCategory('trending');
            setSelectedArtist(null);
          }}
          className={`flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[0.7rem] sm:text-xs font-bold transition-colors shrink-0 ${
            activeCategory === 'trending' && !selectedArtist
              ? `bg-gradient-to-r ${themeStyles.accentGradient} text-black shadow`
              : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Flame size={13} />
          <span>Top 25</span>
          <span className="hidden xs:inline">Trending Hits</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveCategory('artists');
            setSelectedArtist(null);
          }}
          className={`flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[0.7rem] sm:text-xs font-bold transition-colors shrink-0 ${
            (activeCategory === 'artists' || selectedArtist)
              ? `bg-gradient-to-r ${themeStyles.accentGradient} text-black shadow`
              : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Mic2 size={13} />
          <span>Artists</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveCategory('playlists');
            setSelectedArtist(null);
          }}
          className={`flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[0.7rem] sm:text-xs font-bold transition-colors shrink-0 ${
            activeCategory === 'playlists' && !selectedArtist
              ? `bg-gradient-to-r ${themeStyles.accentGradient} text-black shadow`
              : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          <FolderHeart size={13} />
          <span>Playlists</span>
          {userPlaylists.length > 0 && <span className="opacity-75">({userPlaylists.length})</span>}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveCategory('favorites');
            setSelectedArtist(null);
          }}
          className={`flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 text-[0.7rem] sm:text-xs font-bold transition-colors shrink-0 ${
            activeCategory === 'favorites' && !selectedArtist
              ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow'
              : 'border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Heart size={13} className={likedSongs.length > 0 ? 'fill-rose-500 text-rose-500' : ''} />
          <span>Liked</span>
          {likedSongs.length > 0 && <span className="opacity-75">({likedSongs.length})</span>}
        </button>
      </nav>

      {/* ========================================================
          3. SCROLLABLE MAIN CONTENT AREA (Hardware-Accelerated)
         ======================================================== */}
      <main className="relative z-10 flex-1 overflow-y-auto px-3 sm:px-8 pb-48 sm:pb-36 pt-3.5 sm:pt-6 space-y-5 sm:space-y-8 will-change-scroll">
        {/* ========================================================
            ARTIST DETAIL VIEW
           ======================================================== */}
        {selectedArtist ? (
          <div className="space-y-6">
            <button
              type="button"
              onClick={closeArtist}
              className="flex items-center gap-1.5 text-xs text-amber-400 hover:underline"
            >
              ← Back to all artists
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0e141f] p-4 sm:p-8 shadow-xl">
              <img
                src={selectedArtist.avatar}
                alt={selectedArtist.name}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={handleImageError}
                className="size-28 sm:size-40 rounded-full object-cover border-4 border-amber-400/40 shadow-xl shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                  <span className={`inline-block rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-[0.68rem] sm:text-xs font-semibold ${themeStyles.badgeBg}`}>
                    Trending Artist • Top {currentArtistTracks.length || 20} Songs
                  </span>
                  {isSearchingArtist && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 text-[0.62rem] text-amber-300">
                      <Loader2 size={10} className="animate-spin" />
                      Live YouTube search...
                    </span>
                  )}
                </div>
                <h2 translate="no" className="notranslate mt-1.5 sm:mt-2 text-2xl sm:text-4xl font-black text-white leading-tight">
                  {selectedArtist.name}
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-white/60">{selectedArtist.tagline}</p>
                <div className="mt-3 sm:mt-4 flex flex-col xs:flex-row items-center justify-center sm:justify-start gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleTogglePlayArtist(selectedArtist)}
                    className={`flex items-center justify-center gap-2 rounded-full bg-gradient-to-r ${themeStyles.accentGradient} px-5 sm:px-6 py-2 sm:py-2.5 text-xs font-bold text-black shadow hover:scale-105 active:scale-95 transition-transform`}
                  >
                    {currentArtistTracks[0] && currentTrackId === currentArtistTracks[0].id && isPlaying ? (
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
                      handleTogglePlayArtistSong(t.id, t.title, selectedArtist.name, r, currentArtistTracks);
                    }}
                    className="flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10 active:scale-95 transition-colors"
                  >
                    <Shuffle size={13} /> Shuffle {selectedArtist.name}
                  </button>
                </div>
              </div>
            </div>

            {/* 5-BY-5 ARTIST SONGS CONTAINER */}
            <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0c121b] p-3 sm:p-6 shadow-xl space-y-3">
              {/* Header: Title + 5-Batch Jump Pills */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base sm:text-lg font-bold text-white">Top 20 Songs</h3>
                    <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[0.62rem] sm:text-[0.65rem] font-bold text-amber-300">
                      {isArtistExpandAll
                        ? `All ${currentArtistTracks.length}`
                        : `Page ${artistPage}/4 (${artistStartIdx + 1} - ${Math.min(artistStartIdx + 5, currentArtistTracks.length)})`}
                    </span>
                  </div>
                  <p className="text-[0.7rem] sm:text-xs text-white/40 mt-0.5">
                    Trending 5-5 songs chunk for instant loading & zero lag
                  </p>
                </div>

                {/* 5-Batch Jump Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  <span className="text-[0.68rem] text-white/40 mr-1 hidden sm:inline shrink-0">Batches:</span>
                  {[
                    { page: 1, label: '1 - 5' },
                    { page: 2, label: '6 - 10' },
                    { page: 3, label: '11 - 15' },
                    { page: 4, label: '16 - 20' },
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
                        className={`rounded-xl px-2.5 py-1 text-[0.68rem] sm:text-xs font-mono font-bold transition-colors shrink-0 ${
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
                    className={`rounded-xl px-2.5 py-1 text-[0.68rem] sm:text-xs font-mono font-bold transition-colors shrink-0 ${
                      isArtistExpandAll
                        ? 'bg-amber-400 text-black shadow'
                        : 'border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {isArtistExpandAll ? '5-by-5' : 'All 20'}
                  </button>
                </div>
              </div>

              {/* Artist Songs List */}
              <div className="divide-y divide-white/5">
                {visibleArtistTracks.map((song, i) => {
                  if (!song) return null;
                  const overallIndex = isArtistExpandAll ? i : artistStartIdx + i;
                  const isSongCurrent = currentTrackId === song.id;
                  return (
                    <div
                      key={`${song.id || 'artist-song'}-${overallIndex}`}
                      className="group flex items-center justify-between p-2.5 sm:p-3 rounded-xl hover:bg-white/5 transition-colors gap-2"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                        <span className="w-5 text-center font-mono text-xs text-white/40 shrink-0">
                          {overallIndex + 1}
                        </span>
                        <img
                          src={`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            const el = e.currentTarget;
                            el.onerror = null;
                            el.src = selectedArtist.avatar || SAFE_SVG_FALLBACK;
                          }}
                          className="size-10 sm:size-11 rounded-lg object-cover shadow shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <p translate="no" className="notranslate truncate text-xs sm:text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                            {song.title}
                          </p>
                          <p translate="no" className="notranslate truncate text-[0.68rem] sm:text-xs text-white/50">{song.album || selectedArtist.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                        {song.duration && (
                          <span className="font-mono text-[0.68rem] sm:text-xs text-white/40 hidden xs:inline">{song.duration}</span>
                        )}
                        <button
                          type="button"
                          onClick={() => handleTogglePlayArtistSong(song.id, song.title, selectedArtist.name, overallIndex, currentArtistTracks)}
                          className="grid size-8 place-items-center rounded-full bg-white/10 text-white group-hover:bg-amber-400 group-hover:text-black transition-colors"
                        >
                          {isSongCurrent && isPlaying ? (
                            <Pause size={13} fill="currentColor" />
                          ) : (
                            <Play size={13} fill="currentColor" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Prev / Next Pagination Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-white/5">
                {!isArtistExpandAll && artistPage > 1 ? (
                  <button
                    type="button"
                    onClick={() => setArtistPage((p) => Math.max(1, p - 1))}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 sm:px-4 py-1.5 sm:py-2 text-[0.7rem] sm:text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    ← Prev 5
                  </button>
                ) : <div />}

                <div className="flex items-center gap-2">
                  {!isArtistExpandAll && artistPage < 4 && currentArtistTracks.length > artistPage * 5 && (
                    <button
                      type="button"
                      onClick={() => setArtistPage((p) => Math.min(4, p + 1))}
                      className="group flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3.5 sm:px-5 py-1.5 sm:py-2 text-[0.7rem] sm:text-xs font-bold text-black shadow hover:scale-102 active:scale-98 transition-transform"
                    >
                      <span className="hidden sm:inline">Next 5 Songs ({artistPage * 5 + 1} - {Math.min((artistPage + 1) * 5, currentArtistTracks.length)})</span>
                      <span className="sm:hidden">Next 5 ({artistPage * 5 + 1} - {Math.min((artistPage + 1) * 5, currentArtistTracks.length)})</span>
                      <ChevronRight size={14} />
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setIsArtistExpandAll((prev) => !prev)}
                    className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 sm:px-4 py-1.5 sm:py-2 text-[0.7rem] sm:text-xs font-semibold text-amber-300 hover:bg-amber-400/20 transition-colors"
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
                SECTION 1: TOP 25 TRENDING INDIAN SONGS (5-by-5 Progressive Loading)
               ======================================================== */}
            {(activeCategory === 'all' || activeCategory === 'trending') && (
              <section className="space-y-4 sm:space-y-5">
                {/* Big Trending Billboard Banner */}
                <div className={`relative overflow-hidden rounded-2xl sm:rounded-3xl border ${themeStyles.borderGlow} bg-gradient-to-r ${themeStyles.heroGrad} p-3.5 sm:p-7 shadow-xl`}>
                  <div className="relative z-10 max-w-2xl">
                    <div className="flex items-center gap-1.5 text-[0.62rem] sm:text-xs font-bold uppercase tracking-widest text-amber-300">
                      <TrendingUp size={13} />
                      <span>Official vybz India Chart • Top 25</span>
                    </div>
                    <h2 className="mt-1 sm:mt-2 text-lg sm:text-2xl md:text-3xl font-black text-white leading-tight">
                      Top 25 Trending on vybz
                    </h2>
                    <p className="mt-0.5 sm:mt-1 text-[0.7rem] sm:text-xs text-white/60">
                      Top 5 songs listed below for ultra-fast, snappy 0-lag playback.
                    </p>

                    <div className="mt-3 sm:mt-4 flex items-center gap-2 sm:gap-3 flex-wrap">
                      <button
                        type="button"
                        onClick={() => handleTogglePlayTrending(TOP_25_TRENDING_INDIAN[0], 0)}
                        className={`flex items-center justify-center gap-1.5 sm:gap-2 rounded-full bg-gradient-to-r ${themeStyles.accentGradient} px-4 sm:px-6 py-2 sm:py-2.5 text-xs font-bold text-black shadow hover:scale-105 active:scale-95 transition-transform`}
                      >
                        {currentTrackId === TOP_25_TRENDING_INDIAN[0].id && isPlaying ? (
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
                          const r = Math.floor(Math.random() * TOP_25_TRENDING_INDIAN.length);
                          handleTogglePlayTrending(TOP_25_TRENDING_INDIAN[r], r);
                        }}
                        className="flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold text-white hover:bg-white/10 active:scale-95 transition-colors"
                      >
                        <Shuffle size={13} /> <span>Shuffle</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 5-BY-5 CHART CONTAINER */}
                <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0a0e17] p-2.5 sm:p-6 shadow-xl">
                  {/* Header: Title + Batch / Page Selector */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-2.5 sm:pb-4 border-b border-white/5">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm sm:text-lg font-bold text-white">Top 25 Hits</h3>
                        <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[0.6rem] sm:text-[0.65rem] font-bold text-amber-300">
                          {isExpandAll ? 'All 25' : `Page ${selectedPage}/5 (${startIdx + 1} - ${startIdx + visibleTrendingSongs.length})`}
                        </span>
                      </div>
                      <p className="text-[0.68rem] sm:text-xs text-white/40 mt-0.5">
                        Super-fast loading with 5-track chunks for smooth browsing
                      </p>
                    </div>

                    {/* Quick 5-Batch Jump Pills */}
                    <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5 touch-pan-x">
                      {[
                        { page: 1, label: '1 - 5' },
                        { page: 2, label: '6 - 10' },
                        { page: 3, label: '11 - 15' },
                        { page: 4, label: '16 - 20' },
                        { page: 5, label: '21 - 25' },
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

                  {/* 5-SONG PROGRESSIVE LIST */}
                  <div className="divide-y divide-white/5 mt-2">
                    {visibleTrendingSongs.map((song, sIdx) => {
                      if (!song) return null;
                      const isCurrent = currentTrackId === song.id;
                      const isLiked = likedSongs.some((t) => t.id === song.id);

                      return (
                        <div
                          key={`chart-song-${song.id || sIdx}-${song.rank}`}
                          className={`group flex items-center justify-between p-2 sm:p-3.5 rounded-xl sm:rounded-2xl transition-colors ${
                            isCurrent
                              ? 'bg-amber-500/10 border border-amber-500/30'
                              : 'hover:bg-white/5'
                          }`}
                        >
                          {/* Left: Rank Badge + Thumbnail + Song Info */}
                          <div className="flex items-center gap-2 sm:gap-3.5 min-w-0 flex-1">
                            {/* Rank Badge with Crown/Color */}
                            <div className="w-5 sm:w-8 text-center shrink-0">
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

                            {/* Thumbnail */}
                            <div className="relative shrink-0">
                              <img
                                src={song.thumbnail}
                                alt={song.title}
                                loading="lazy"
                                decoding="async"
                                onError={handleImageError}
                                className="size-10 sm:size-12 rounded-lg sm:rounded-xl object-cover shadow-md bg-black/40"
                              />
                              {isCurrent && isPlaying && (
                                <div className="absolute inset-0 flex items-center justify-center rounded-lg sm:rounded-xl bg-black/75">
                                  <Volume2 size={14} className="text-amber-400 animate-pulse" />
                                </div>
                              )}
                            </div>

                            {/* Title + Movie + Singers */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-1.5 sm:gap-2">
                                <p
                                  translate="no"
                                  onClick={() => handleTogglePlayTrending(song, song.rank - 1)}
                                  className={`notranslate truncate text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                                    isCurrent
                                      ? 'text-amber-300'
                                      : 'text-white group-hover:text-amber-300'
                                  }`}
                                >
                                  {song.title}
                                </p>
                                <span translate="no" className="notranslate hidden md:inline-block rounded-md bg-white/5 px-1.5 py-0.5 text-[0.62rem] text-white/60">
                                  {song.movie}
                                </span>
                              </div>
                              <p translate="no" className="notranslate truncate text-[0.68rem] sm:text-xs text-white/50">{song.singers}</p>
                            </div>
                          </div>

                          {/* Right: Tag, Duration, Like, Add to playlist, Play */}
                          <div className="flex items-center gap-1 sm:gap-3 shrink-0 ml-1.5 sm:ml-2">
                            <span className="hidden lg:inline-block rounded-full bg-amber-400/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-amber-300 border border-amber-400/20">
                              {song.tag}
                            </span>

                            <span className="font-mono text-xs text-white/40 hidden sm:inline-block">
                              {song.duration}
                            </span>

                            {/* Like heart */}
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
                              title={isLiked ? 'Unlike' : 'Like'}
                              className={`p-1 sm:p-1.5 transition-colors ${
                                isLiked ? 'text-rose-500' : 'text-white/30 hover:text-white'
                              }`}
                            >
                              <Heart size={15} fill={isLiked ? 'currentColor' : 'none'} />
                            </button>

                            {/* Add to playlist */}
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
                              title="Add to Playlist"
                              className="p-1 sm:p-1.5 text-white/40 hover:text-amber-300 transition-colors"
                            >
                              <Plus size={15} />
                            </button>

                            {/* Play / Pause button */}
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

                  {/* 5-BY-5 PAGINATION / MORE CONTROLS */}
                  <div className="mt-3 sm:mt-5 flex items-center justify-between gap-2 pt-2.5 border-t border-white/5">
                    {/* Previous 5 Button */}
                    {!isExpandAll && selectedPage > 1 ? (
                      <button
                        type="button"
                        onClick={() => setSelectedPage((p) => Math.max(1, p - 1))}
                        className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 sm:py-2 text-[0.68rem] sm:text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white active:scale-95 transition-all"
                      >
                        ← Prev 5
                      </button>
                    ) : <div />}

                    {/* Next 5 / Expand Buttons */}
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      {!isExpandAll && selectedPage < 5 && (
                        <button
                          type="button"
                          onClick={() => setSelectedPage((p) => Math.min(5, p + 1))}
                          className="group flex items-center gap-1 sm:gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 sm:px-5 py-1.5 sm:py-2 text-[0.68rem] sm:text-xs font-bold text-black shadow hover:scale-102 active:scale-98 transition-transform"
                        >
                          <span>Next 5 ({selectedPage * 5 + 1} - {(selectedPage + 1) * 5})</span>
                          <ChevronRight size={13} />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => setIsExpandAll((prev) => !prev)}
                        className="rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 sm:px-4 py-1.5 sm:py-2 text-[0.68rem] sm:text-xs font-semibold text-amber-300 hover:bg-amber-400/20 active:scale-95 transition-colors"
                      >
                        {isExpandAll ? 'Show 5' : 'All 25'}
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* ========================================================
                SECTION 2: POPULAR INDIAN ARTISTS (Progressive Load 6 + 6)
               ======================================================== */}
            {(activeCategory === 'all' || activeCategory === 'artists') && (
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Popular Artists</h2>
                    <p className="text-xs text-white/50 mt-0.5">
                      The voices and composers defining Indian sound
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-amber-400">
                    Showing {visibleArtists.length} of {ARTISTS_CATALOG.length}
                  </span>
                </div>

                {/* Artists Grid: Circular photos with hover & touch play button */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-4">
                  {visibleArtists.map((artist, aIdx) => {
                    if (!artist) return null;
                    return (
                      <div
                        key={artist.id || `artist-${aIdx}`}
                        onClick={() => openArtist(artist)}
                        className="group relative flex flex-col rounded-xl sm:rounded-2xl border border-white/5 bg-[#0e1420] p-2.5 sm:p-4 transition-colors hover:border-amber-400/40 hover:bg-[#131c2b] cursor-pointer shadow-md"
                      >
                        {/* Circular Avatar Container with Hover & Touch Play Button */}
                        <div className="relative aspect-square w-full overflow-hidden rounded-full shadow-lg bg-black/40 border-2 border-white/10 group-hover:border-amber-400 transition-colors">
                          <img
                            src={artist.avatar}
                            alt={artist.name}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            onError={handleImageError}
                            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />

                          {/* Floating Play / Pause Button on Hover & Touch */}
                          <button
                            type="button"
                            onClick={(e) => handleTogglePlayArtist(artist, e)}
                            title={`Play ${artist.name}`}
                            className="absolute bottom-1 right-1 grid size-8 sm:size-10 place-items-center rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-black shadow opacity-100 sm:opacity-0 sm:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:scale-105 active:scale-95"
                          >
                            {artist.topTracks?.[0] && currentTrackId === artist.topTracks[0].id && isPlaying ? (
                              <Pause size={14} fill="black" />
                            ) : (
                              <Play size={14} fill="black" className="ml-0.5" />
                            )}
                          </button>
                        </div>

                        {/* Name & Subtitle */}
                        <div className="mt-2 sm:mt-3 min-w-0 text-center">
                          <h3 translate="no" className="notranslate truncate text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                            {artist.name}
                          </h3>
                          <p className="mt-0.5 text-[0.65rem] sm:text-[0.7rem] text-[#b3b3b3] font-medium">Artist</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Load More Artists Button (Instant, zero timeout, zero race condition) */}
                {activeCategory !== 'artists' && displayedArtistsCount < ARTISTS_CATALOG.length && (
                  <div className="flex justify-center pt-2">
                    <button
                      type="button"
                      onClick={handleLoadMoreArtists}
                      className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                    >
                      <ChevronDown size={14} className="text-amber-400" />
                      <span>Show More Artists (+12)</span>
                      <span className="text-[0.62rem] text-white/40">
                        {displayedArtistsCount} of {ARTISTS_CATALOG.length}
                      </span>
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* ========================================================
                SECTION 3: MY PLAYLISTS (Browser Storage)
               ======================================================== */}
            {(activeCategory === 'all' || activeCategory === 'playlists') && (
              <section className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">My Playlists</h2>
                    <p className="text-xs text-white/50 mt-0.5">
                      Saved 100% in your browser cache (Zero server load)
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCreatingNewPl(true)}
                    className="self-start sm:self-auto flex items-center gap-1.5 rounded-full bg-amber-400 px-3.5 sm:px-4 py-2 text-xs font-bold text-black shadow hover:scale-105 active:scale-95 transition-transform"
                  >
                    <Plus size={15} /> Create Playlist
                  </button>
                </div>

                {/* Create Playlist Form */}
                {isCreatingNewPl && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newPlaylistTitle.trim()) return;
                      createPlaylist(newPlaylistTitle.trim());
                      setNewPlaylistTitle('');
                      setIsCreatingNewPl(false);
                    }}
                    className="flex items-center gap-3 rounded-2xl border border-amber-500/40 bg-[#0e1622] p-4 shadow-xl"
                  >
                    <input
                      type="text"
                      value={newPlaylistTitle}
                      onChange={(e) => setNewPlaylistTitle(e.target.value)}
                      placeholder="Playlist name (e.g. My Chai Beats, Late Night)..."
                      autoFocus
                      className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
                    />
                    <button
                      type="submit"
                      className="rounded-full bg-amber-400 px-4 py-1.5 text-xs font-bold text-black"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCreatingNewPl(false)}
                      className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/60 hover:text-white"
                    >
                      Cancel
                    </button>
                  </form>
                )}

                {/* User Playlists Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userPlaylists.map((pl) => (
                    <div
                      key={pl.id}
                      className="flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0e1420] p-5 hover:border-amber-400/40 transition-colors shadow-md"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-white">{pl.name}</h3>
                        <p className="text-xs text-white/50 mt-1">{pl.tracks.length} tracks</p>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
                        <button
                          type="button"
                          disabled={pl.tracks.length === 0}
                          onClick={() => handleTogglePlayPlaylist(pl, 0)}
                          className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:underline disabled:opacity-40"
                        >
                          {pl.tracks[0] && currentTrackId === pl.tracks[0].id && isPlaying ? (
                            <>
                              <Pause size={13} fill="currentColor" /> Pause Playlist
                            </>
                          ) : (
                            <>
                              <Play size={13} fill="currentColor" /> Play Playlist
                            </>
                          )}
                        </button>
                        <span className="text-[0.65rem] text-white/30 font-mono">In Browser Storage</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ========================================================
                SECTION 4: LIKED SONGS
               ======================================================== */}
            {(activeCategory === 'all' || activeCategory === 'favorites') && (
              <section className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl sm:rounded-3xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-[#0e1420] to-black p-4 sm:p-8 shadow-md">
                  <div>
                    <span className="text-[0.65rem] sm:text-xs font-bold uppercase tracking-widest text-rose-400">
                      Your Favorites
                    </span>
                    <h2 className="text-xl sm:text-3xl font-black text-white mt-0.5 sm:mt-1">Liked Songs</h2>
                    <p className="text-xs text-white/50 mt-0.5 sm:mt-1">
                      {likedSongs.length} songs cached in your browser
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

                <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-[#0d131f] p-3 shadow-md">
                  {likedSongs.slice(0, 10).map((track, i) => {
                    if (!track) return null;
                    return (
                      <div
                        key={`liked-${track.id}-${i}`}
                        className="group flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1">
                          <span className="w-5 text-center font-mono text-xs text-white/40">
                            {i + 1}
                          </span>
                          <img
                            src={track.thumbnail}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            onError={handleImageError}
                            className="size-11 rounded-lg object-cover shadow"
                          />
                          <div className="min-w-0 flex-1">
                            <p translate="no" className="notranslate truncate text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                              {track.title}
                            </p>
                            <p translate="no" className="notranslate truncate text-xs text-white/50">{track.artist}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleLike(track)}
                            className="text-rose-500 hover:text-white transition-colors"
                          >
                            <Heart size={16} fill="currentColor" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleTogglePlayStored(track, i)}
                            className="grid size-8 place-items-center rounded-full bg-white/10 text-white group-hover:bg-amber-400 group-hover:text-black transition-colors"
                          >
                            {currentTrackId === track.id && isPlaying ? (
                              <Pause size={14} fill="currentColor" />
                            ) : (
                              <Play size={14} fill="currentColor" />
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {likedSongs.length === 0 && (
                    <div className="py-12 text-center text-white/40 text-sm">
                      No liked songs yet! Click the heart ❤️ button on any song while listening to save it here.
                    </div>
                  )}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* ========================================================
          ADD TO PLAYLIST MODAL
         ======================================================== */}
      {playlistModalSong && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setPlaylistModalSong(null)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-white/15 bg-[#0e1422] p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-bold text-white">Add to Playlist</h3>
            <p translate="no" className="notranslate text-xs text-white/50 mt-0.5 truncate">{playlistModalSong.title}</p>

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
                  <ChevronRight size={16} className="text-white/40" />
                </button>
              ))}
            </div>

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
