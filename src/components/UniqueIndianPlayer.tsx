import { useState, useEffect, useMemo, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';
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
  encodeSharedPlaylist,
} from '../utils/mediaHelpers';
import {
  navigateTo,
  parseRoute,
  WORLD_ID_TO_SLUG,
  findWorldBySlug,
} from '../utils/navigation';
import AmbientMixer from './AmbientMixer';
import DownloadLandingPage from './DownloadLandingPage';
import LegalInfoModal, { type LegalTab } from './LegalInfoModal';

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
  accentGradient: 'from-amber-400 via-orange-400 to-amber-500',
  badgeBg: 'bg-amber-400/10 border-amber-400/30 text-amber-300',
  borderGlow: 'border-amber-400/25',
  heroGrad: 'from-amber-500/10 via-[#0e1420] to-[#070a10]',
};

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

function getInitialArtist(): Artist | null {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname;
  if (path.startsWith('/artist/')) {
    const artId = path.replace('/artist/', '').replace(/\/+$/, '');
    return ARTISTS_CATALOG.find((a) => a.id === artId) || null;
  }
  const hash = window.location.hash;
  if (hash.startsWith('#artist/')) {
    const artId = hash.replace('#artist/', '');
    return ARTISTS_CATALOG.find((a) => a.id === artId) || null;
  }
  return null;
}

function getInitialVibeWorld(): ThemeWorld | null {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname;
  if (path.startsWith('/vibes/') || path.startsWith('/vibe/')) {
    const slug = path.split('/')[2]?.replace(/\/+$/, '');
    if (slug) {
      return findWorldBySlug(slug) || null;
    }
  }
  return null;
}

export function getVibeIcon(world: ThemeWorld | { id: string; icon?: string } | null | undefined): string {
  if (!world) return '🎵';
  if ('icon' in world && world.icon) return world.icon;
  switch (world.id) {
    case 'chai_tapri':
      return '☕';
    case 'sufi_ghazal':
      return '🕊️';
    case 'deluxe_salon':
      return '✂️';
    case 'monsoon_barish':
    case 'monsoon_baarish':
      return '🌧️';
    case 'highway_dhaba':
      return '🌙';
    case 'corporate_majdoor':
    case 'corporate_chill':
      return '💻';
    case 'bartan_time':
      return '🍽️';
    case 'alfaaz_ehsaas':
      return '✍️';
    case 'hostel_ki_raat':
      return '🎸';
    case 'train_ki_khidki':
      return '🚂';
    default:
      return '🎵';
  }
}

function isGenuineTrack(song: ArtistSong, artistName?: string): boolean {
  if (!song || !song.title || !song.id) return false;
  const t = song.title.toLowerCase();
  const a = (artistName || '').toLowerCase();
  // Filter dummy titles
  if (
    /\bhit\s+\d+\b/i.test(t) ||
    t.includes('essential hit') ||
    (song.album && song.album.toLowerCase().includes('essential hits'))
  ) {
    return false;
  }
  // Check cross-artist copied songs
  const crossArtistSongs: Record<string, string[]> = {
    'kun faya kun': ['a.r. rahman', 'mohit chauhan', 'javed ali'],
    'chaiyya chaiyya': ['a.r. rahman', 'sukhwinder singh'],
    'tum hi ho': ['arijit singh', 'mithoon'],
  };
  for (const [forbiddenTitle, allowedArtists] of Object.entries(crossArtistSongs)) {
    if (t.includes(forbiddenTitle)) {
      const allowed = allowedArtists.some((aa) => a.includes(aa));
      if (!allowed) return false;
    }
  }
  return true;
}

function getCachedArtistTracks(artistId: string, artistName?: string): ArtistSong[] | null {
  if (typeof window === 'undefined') return null;
  try {
    const cached = localStorage.getItem(`vybz_art_v5_${artistId}`);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length >= 3) {
        const genuine = parsed.filter((t) => isGenuineTrack(t, artistName));
        if (genuine.length >= 3) return genuine;
      }
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
    setViewMode,
    currentTrackId,
    isPlaying,
    currentWorld,
    setWorld,
    top25Tracks,
    isTop25Refreshing,
    refreshLiveTop25,
  } = usePlayerStore(
    useShallow((s) => ({
      activeCategory: s.activeCategory,
      setActiveCategory: s.setActiveCategory,
      likedSongs: s.likedSongs,
      toggleLike: s.toggleLike,
      userPlaylists: s.userPlaylists,
      createPlaylist: s.createPlaylist,
      deletePlaylist: s.deletePlaylist,
      addToPlaylist: s.addToPlaylist,
      removeFromPlaylist: s.removeFromPlaylist,
      recentHistory: s.recentHistory,
      toggleSearch: s.toggleSearch,
      setViewMode: s.setViewMode,
      currentTrackId: s.currentTrackId,
      isPlaying: s.isPlaying,
      currentWorld: s.currentWorld,
      setWorld: s.setWorld,
      top25Tracks: s.top25Tracks,
      isTop25Refreshing: s.isTop25Refreshing,
      refreshLiveTop25: s.refreshLiveTop25,
    }))
  );

  const mainScrollRef = useRef<HTMLElement | null>(null);

  // Lazy-initialize artist and vibe world from URL pathname to avoid synchronous setState in useEffect
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(getInitialArtist);
  const [selectedVibeWorld, setSelectedVibeWorld] = useState<ThemeWorld | null>(getInitialVibeWorld);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [isDownloadPage, setIsDownloadPage] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const p = window.location.pathname.replace(/\/+$/, '');
    return p === '/download' || p === '/app';
  });
  const [legalModalTab, setLegalModalTab] = useState<LegalTab | null>(() => {
    if (typeof window === 'undefined') return null;
    const p = window.location.pathname.replace(/\/+$/, '').replace(/^\//, '');
    if (p === 'about' || p === 'faq' || p === 'privacy' || p === 'terms') return p;
    if (p === 'dmca' || p === 'disclaimer') return 'disclaimer';
    return null;
  });

  // Pagination & Display State for Selected Vibe Station (Defaults to true for full 25 continuous scroll)
  const [vibePage, setVibePage] = useState<number>(1);
  const [isVibeExpandAll, setIsVibeExpandAll] = useState<boolean>(true);

  // Automatically reset scroll position to top whenever changing tab, artist, vibe, or playlist
  useEffect(() => {
    const el = mainScrollRef.current;
    if (el) {
      el.scrollTop = 0;
      const raf = requestAnimationFrame(() => {
        if (el) el.scrollTop = 0;
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [activeCategory, selectedArtist?.id, selectedVibeWorld?.id, selectedPlaylistId]);

  // Listen for mobile bottom nav category selections to reset sub-views and scroll to top
  useEffect(() => {
    const handleCategorySelect = () => {
      setSelectedPlaylistId(null);
      setSelectedArtist(null);
      setSelectedVibeWorld(null);
      const el = mainScrollRef.current;
      if (el) {
        el.scrollTop = 0;
        requestAnimationFrame(() => {
          if (el) el.scrollTop = 0;
        });
      }
    };
    const handleScrollTop = () => {
      const el = mainScrollRef.current;
      if (el) {
        el.scrollTop = 0;
        requestAnimationFrame(() => {
          if (el) el.scrollTop = 0;
        });
      }
    };
    window.addEventListener('vybz-category-select', handleCategorySelect);
    window.addEventListener('vybz-scroll-top', handleScrollTop);
    return () => {
      window.removeEventListener('vybz-category-select', handleCategorySelect);
      window.removeEventListener('vybz-scroll-top', handleScrollTop);
    };
  }, []);

  // Handler for opening a Vibe Station with dedicated hero UI & smart seamless playback
  const handlePlayVibeStation = (world: ThemeWorld, userExplicitPlay: boolean = false) => {
    const slug = WORLD_ID_TO_SLUG[world.id] || world.id;
    navigateTo(`/vibes/${slug}`);
    setSelectedVibeWorld(world);
    setSelectedArtist(null);
    setSelectedPlaylistId(null);
    setVibePage(1);
    setIsVibeExpandAll(true);

    // If user clicked just to view/select the vibe (userExplicitPlay is false),
    // NEVER auto-play! Simply navigate to the vibe page.
    if (!userExplicitPlay) {
      mainScrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const isSameWorld = currentWorld.id === world.id;
    const hasActiveAudio = Boolean(currentTrackId);

    // If this vibe is already loaded and active, NEVER restart from 0:00!
    if (isSameWorld && hasActiveAudio) {
      if (isPlaying) {
        onPause();
      } else {
        onPlay();
      }
      mainScrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    // User explicitly pressed Play: switch world and start fresh from track 1 with full 25 queue
    setWorld(world.id);
    const first = world.tracks?.[0];
    if (first) {
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
    mainScrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  };

  const closeVibeWorld = () => {
    setSelectedVibeWorld(null);
    handleSelectCategory('vibes');
  };

  const handleShareTrack = (title?: string, artist?: string, customUrl?: string, artworkUrl?: string, vibeName?: string) => {
    const st = usePlayerStore.getState();
    st.openShareModal({
      title: title || st.trackTitle,
      artist: artist || st.trackArtist,
      artworkUrl: artworkUrl || st.trackThumbnail || selectedArtist?.avatar,
      vibeName: vibeName || selectedVibeWorld?.name,
      customUrl: customUrl || (typeof window !== 'undefined' ? window.location.href : undefined),
    });
  };

  const handleSharePlaylist = (pl: UserPlaylist) => {
    if (!pl.tracks.length) return;
    const encoded = encodeSharedPlaylist(pl.name, pl.tracks);
    const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://vybzmusic.online'}/?playlist=${encoded}`;
    usePlayerStore.getState().openShareModal({
      title: pl.name,
      artist: `${pl.tracks.length} tracks • VybZ Playlist`,
      artworkUrl: pl.tracks[0]?.thumbnail,
      vibeName: 'PLAYLIST',
      customUrl: shareUrl,
      isPlaylist: true,
    });
  };

  const handleShareFavorites = () => {
    if (!likedSongs.length) return;
    const encoded = encodeSharedPlaylist('My Liked Songs', likedSongs);
    const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : 'https://vybzmusic.online'}/?playlist=${encoded}`;
    usePlayerStore.getState().openShareModal({
      title: 'My Liked Songs',
      artist: `${likedSongs.length} tracks • Favorites`,
      artworkUrl: likedSongs[0]?.thumbnail,
      vibeName: 'FAVORITES',
      customUrl: shareUrl,
      isPlaylist: true,
    });
  };

  // 5-by-5 Pagination State & Dynamic Search for Selected Artist (Defaults to true so user sees all 20 songs instantly)
  const [artistPage, setArtistPage] = useState<number>(1);
  const [isArtistExpandAll, setIsArtistExpandAll] = useState<boolean>(true);
  const [artistTracksMap, setArtistTracksMap] = useState<Record<string, ArtistSong[]>>({});
  const [isSearchingArtist, setIsSearchingArtist] = useState<boolean>(false);

  // Progressive YouTube-style auto-scroll rendering for Popular Artists (infinite scroll with zero blank frames)
  const [artistDisplayLimit, setArtistDisplayLimit] = useState<number>(12);
  const artistSentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeCategory === 'artists') {
      setArtistDisplayLimit(12);
    } else {
      setArtistDisplayLimit(6);
    }
  }, [activeCategory]);

  // YouTube-Style Auto-Scroll Sentinel for Artists Tab
  useEffect(() => {
    if (activeCategory !== 'artists') return;
    const sentinel = artistSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && artistDisplayLimit < ARTISTS_CATALOG.length) {
          setArtistDisplayLimit((prev) => Math.min(prev + 12, ARTISTS_CATALOG.length));
        }
      },
      { root: mainScrollRef.current, rootMargin: '350px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [activeCategory, artistDisplayLimit]);

  // Playlist creation & modal state
  const [playlistModalSong, setPlaylistModalSong] = useState<StoredTrack | null>(null);
  const [newPlaylistTitle, setNewPlaylistTitle] = useState('');
  const [isCreatingNewPl, setIsCreatingNewPl] = useState(false);

  // PWA install prompt & Platform detection
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isNativeApp] = useState(() => {
    if (typeof window === 'undefined') return false;
    return Boolean((window as any).VybZNative || navigator.userAgent.includes('VybZApp'));
  });
  const [isAndroid] = useState(() => {
    if (typeof window === 'undefined') return false;
    return /Android/i.test(navigator.userAgent) && !navigator.userAgent.includes('VybZApp') && !(window as any).VybZNative;
  });
  const [isIOS] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
    );
  });
  const [isStandalone] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true
    );
  });
  const [showIOSInstallModal, setShowIOSInstallModal] = useState(false);
  const [showAndroidInstallModal, setShowAndroidInstallModal] = useState(false);

  const iosBrowserType = useMemo<'chrome' | 'google' | 'inapp' | 'safari'>(() => {
    if (typeof window === 'undefined') return 'safari';
    const ua = navigator.userAgent;
    if (/CriOS/i.test(ua)) return 'chrome';
    if (/GSA/i.test(ua)) return 'google';
    if (/FBAN|FBAV|Instagram|WhatsApp|Line|Twitter/i.test(ua)) return 'inapp';
    return 'safari';
  }, []);

  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      // For desktop PC, keep standard PWA install prompt
      if (!/Android/i.test(navigator.userAgent)) {
        e.preventDefault();
        setInstallPrompt(e as BeforeInstallPromptEvent);
      }
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = async () => {
    // 1. Android Mobile Browser -> Direct APK download + Contextual Guide Drawer
    if (isAndroid) {
      const apkUrl = 'https://vybzmusic.online/vybz.apk';
      try {
        const link = document.createElement('a');
        link.href = apkUrl;
        link.setAttribute('download', 'vybz.apk');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch {
        window.location.href = apkUrl;
      }
      setShowAndroidInstallModal(true);
      return;
    }

    // 2. iOS Safari / Chrome on iOS -> Show sleek iOS "Add to Home Screen" instructions
    if (isIOS) {
      setShowIOSInstallModal(true);
      return;
    }

    // 3. Desktop PC (Chrome / Edge) -> Native PWA installation or navigate to /download
    if (installPrompt) {
      try {
        await installPrompt.prompt();
        const choice = await installPrompt.userChoice;
        if (choice?.outcome === 'accepted') {
          setInstallPrompt(null);
        }
      } catch {
        navigateTo('/download');
        setIsDownloadPage(true);
      }
    } else {
      navigateTo('/download');
      setIsDownloadPage(true);
    }
  };

  // Hide install button if already in native APK or installed as standalone PWA
  const showInstallBtn = !isNativeApp && !isStandalone;

  // Auto-sync live YouTube India Top 25 chart on app mount
  useEffect(() => {
    refreshLiveTop25();
  }, [refreshLiveTop25]);

  // Synchronize initial route from URL (e.g. direct load on /top-25, /vibes/chai-tapri, /artists, etc.)
  useEffect(() => {
    const route = parseRoute();
    if (route.isDownload) {
      setIsDownloadPage(true);
    }
    if (route.category && route.category !== 'download' && route.category !== activeCategory) {
      setActiveCategory(route.category);
    }
    if (route.vibeSlug) {
      const targetWorld = findWorldBySlug(route.vibeSlug) || (route.worldId ? WORLDS.find((w) => w.id === route.worldId) : null) || null;
      if (targetWorld) {
        setSelectedVibeWorld(targetWorld);
      }
    }
    if (route.artistId) {
      const targetArtist = ARTISTS_CATALOG.find((a) => a.id === route.artistId) || null;
      if (targetArtist) {
        setSelectedArtist(targetArtist);
        setArtistPage(1);
        setIsArtistExpandAll(true);
      }
    }
    // Ensure document.title & meta tags are synced
    navigateTo(window.location.pathname, { replace: true });
  }, []);

  // Listen to browser Back / Forward events for all routes
  useEffect(() => {
    const handlePopState = () => {
      const cleanP = window.location.pathname.replace(/\/+$/, '');
      setIsDownloadPage(cleanP === '/download' || cleanP === '/app');
      const legalSlug = cleanP.replace(/^\//, '');
      if (['about', 'faq', 'privacy', 'terms', 'dmca', 'disclaimer'].includes(legalSlug)) {
        setLegalModalTab(legalSlug === 'dmca' ? 'disclaimer' : (legalSlug as LegalTab));
      } else {
        setLegalModalTab(null);
      }
      const route = parseRoute();
      if (route.artistId) {
        const nextArtist = ARTISTS_CATALOG.find((a) => a.id === route.artistId) || null;
        setSelectedArtist((prev) => (prev?.id === nextArtist?.id ? prev : nextArtist));
        setArtistPage(1);
        setIsArtistExpandAll(true);
      } else {
        setSelectedArtist(null);
      }
      if (route.category && route.category !== 'download') {
        setActiveCategory(route.category);
      }
      if (route.vibeSlug) {
        const targetWorld = findWorldBySlug(route.vibeSlug) || (route.worldId ? WORLDS.find((w) => w.id === route.worldId) : null) || null;
        setSelectedVibeWorld(targetWorld);
      } else {
        setSelectedVibeWorld(null);
      }
      setSelectedPlaylistId(null);
      mainScrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [setActiveCategory, setWorld, currentWorld.id]);

  const openLegalModal = (tab: LegalTab) => {
    setLegalModalTab(tab);
    navigateTo(`/${tab}`);
  };

  const closeLegalModal = () => {
    setLegalModalTab(null);
    if (selectedVibeWorld) {
      const slug = WORLD_ID_TO_SLUG[selectedVibeWorld.id] || selectedVibeWorld.id;
      navigateTo(`/vibes/${slug}`, { replace: true });
    } else if (selectedArtist) {
      navigateTo(`/artist/${selectedArtist.id}`, { replace: true });
    } else if (isDownloadPage) {
      navigateTo('/download', { replace: true });
    } else {
      navigateTo('/', { replace: true });
    }
  };

  const openArtist = (artist: Artist) => {
    navigateTo(`/artist/${artist.id}`);
    setSelectedArtist(artist);
    setSelectedVibeWorld(null);
    setSelectedPlaylistId(null);
    setArtistPage(1);
    setIsArtistExpandAll(true);
    mainScrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  };

  const closeArtist = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigateTo('/artists');
      setSelectedArtist(null);
    }
    mainScrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  };

  const selectedArtistId = selectedArtist?.id;
  const selectedArtistName = selectedArtist?.name;

  // Auto-search real YouTube songs when an artist is selected (if fewer than 8 genuine curated tracks)
  useEffect(() => {
    if (!selectedArtistId || !selectedArtistName) return;
    const genuineCurated = (selectedArtist?.topTracks || []).filter((t) =>
      isGenuineTrack(t, selectedArtistName)
    );
    if (genuineCurated.length >= 8) return;
    if (artistTracksMap[selectedArtistId] && artistTracksMap[selectedArtistId].length >= 3) return;
    const cached = getCachedArtistTracks(selectedArtistId, selectedArtistName);
    if (cached && cached.length >= 3) {
      setArtistTracksMap((prev) => ({ ...prev, [selectedArtistId]: cached }));
      return;
    }

    let isMounted = true;
    const fetchArtistSongs = async () => {
      setIsSearchingArtist(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(selectedArtistName + ' songs audio')}`
        );
        if (!res.ok) throw new Error('Search failed');
        const data = await res.json();
        if (!isMounted) return;

        if (Array.isArray(data.results) && data.results.length > 0) {
          const stopWords = [
            'jukebox',
            'all songs',
            'non stop',
            'nonstop',
            'full album',
            'compilation',
            'podcast',
            'interview',
            'mashup 1 hour',
            'top 50',
            'top 20',
            'top 30',
          ];
          const cleanResults: ArtistSong[] = data.results
            .filter((item: { title?: string; duration?: string }) => {
              const titleLower = (item.title || '').toLowerCase();
              if (stopWords.some((sw) => titleLower.includes(sw))) return false;
              if (item.duration) {
                const parts = item.duration.split(':');
                if (parts.length > 2) return false;
                if (parts.length === 2 && parseInt(parts[0], 10) >= 10) return false;
              }
              return true;
            })
            .map((item: { id: string; title: string; artist?: string; duration?: string }) => ({
              id: item.id,
              title: cleanSongTitle(item.title),
              album: selectedArtistName,
              duration: item.duration || '3:45',
            }))
            .filter((t: ArtistSong) => isGenuineTrack(t, selectedArtistName))
            .slice(0, 20);

          if (cleanResults.length >= 3) {
            setArtistTracksMap((prev) => ({ ...prev, [selectedArtistId]: cleanResults }));
            try {
              localStorage.setItem(
                `vybz_art_v5_${selectedArtistId}`,
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
    const pathMap: Record<PlayerCategory, string> = {
      all: '/',
      trending: '/top-25',
      vibes: '/vibes',
      artists: '/artists',
      playlists: '/playlists',
      favorites: '/liked',
    };
    navigateTo(pathMap[cat] || '/');
    setActiveCategory(cat);
    setSelectedPlaylistId(null);
    if (selectedArtist) {
      setSelectedArtist(null);
    }
    if (selectedVibeWorld) {
      setSelectedVibeWorld(null);
    }
    mainScrollRef.current?.scrollTo({ top: 0, behavior: 'instant' });
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
    const genuineCurated = (artist.topTracks || []).filter((t) => isGenuineTrack(t, artist.name));
    const tracksList =
      (selectedArtist?.id === artist.id ? currentArtistTracks : null) ||
      (artist ? artistTracksMap[artist.id] || getCachedArtistTracks(artist.id, artist.name) : null) ||
      genuineCurated;
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
      (selectedArtist ? currentArtistTracks : []);
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

  // Toggle Play / Pause individual vibe station song
  const handleTogglePlayVibeSong = (
    songId: string,
    songTitle: string,
    artistName?: string,
    songIndex?: number,
    vibeTracksList?: { id: string; title: string; artist?: string }[]
  ) => {
    if (currentTrackId === songId) {
      if (isPlaying) onPause();
      else onPlay();
      return;
    }
    const tracksList = vibeTracksList || (selectedVibeWorld?.tracks || []);
    const vibeQueue: QueueTrack[] = tracksList.map((t) => ({
      id: t.id,
      title: t.title,
      artist: t.artist || selectedVibeWorld?.name || 'VybZ Music',
      thumbnail: `https://img.youtube.com/vi/${t.id}/mqdefault.jpg`,
    }));
    const sIdx = songIndex !== undefined ? songIndex : tracksList.findIndex((t) => t.id === songId);
    const targetTrack = tracksList[sIdx];
    onPlayCustomVideoId(
      songId,
      targetTrack?.title || songTitle,
      targetTrack?.artist || artistName || selectedVibeWorld?.name,
      `https://img.youtube.com/vi/${songId}/mqdefault.jpg`,
      vibeQueue,
      Math.max(0, sIdx),
      false
    );
  };

  // Top 25: Home page shows Top 5 preview; dedicated /top-25 shows all 25 hits continuously
  const visibleTrendingSongs =
    activeCategory === 'all'
      ? top25Tracks.slice(0, 5)
      : top25Tracks;

  const currentArtistTracks: ArtistSong[] = useMemo(() => {
    if (!selectedArtist) return [];
    const genuineCurated = (selectedArtist.topTracks || []).filter((t) =>
      isGenuineTrack(t, selectedArtist.name)
    );
    const dynamic =
      artistTracksMap[selectedArtist.id] ||
      getCachedArtistTracks(selectedArtist.id, selectedArtist.name);

    if (genuineCurated.length >= 8) {
      return genuineCurated;
    }
    if (dynamic && dynamic.length > 0) {
      return dynamic;
    }
    return genuineCurated;
  }, [selectedArtist, artistTracksMap]);

  const artistStartIdx = (artistPage - 1) * 5;
  const visibleArtistTracks = isArtistExpandAll
    ? currentArtistTracks
    : currentArtistTracks.slice(artistStartIdx, artistStartIdx + 5);

  const currentVibeTracks = useMemo(() => {
    return selectedVibeWorld?.tracks || [];
  }, [selectedVibeWorld]);

  const vibeStartIdx = (vibePage - 1) * 5;
  const visibleVibeTracks = isVibeExpandAll
    ? currentVibeTracks
    : currentVibeTracks.slice(vibeStartIdx, vibeStartIdx + 5);

  // Popular Artists: Home page shows Top 6 preview; dedicated /artists uses progressive batching
  const visibleArtists =
    activeCategory === 'artists'
      ? ARTISTS_CATALOG.slice(0, artistDisplayLimit)
      : ARTISTS_CATALOG.slice(0, 6);

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

  if (isDownloadPage) {
    return (
      <DownloadLandingPage
        onBackToPlayer={() => {
          setIsDownloadPage(false);
          navigateTo('/', { replace: false });
        }}
      />
    );
  }

  return (
    <div className="relative flex flex-1 min-h-0 overflow-hidden bg-[#070a10] text-white">
      {/* Lightweight GPU-friendly dark ambient backdrop */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-amber-500/[0.04] via-transparent to-black/40" />

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
            <h1 className="text-xl font-black tracking-tight text-white leading-none">
              vybz <span className="text-amber-400">music</span>
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
                      navigateTo('/playlists');
                      setActiveCategory('playlists');
                      setSelectedPlaylistId(pl.id);
                      if (selectedArtist) setSelectedArtist(null);
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
            <h1 className="text-lg font-black tracking-tight text-white truncate">
              vybz <span className="text-amber-400">music</span>
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
            {/* Share VybZ App */}
            <button
              type="button"
              onClick={() => {
                usePlayerStore.getState().openShareModal({
                  title: 'VybZ Music',
                  artist: '100% Ad-Free Indian Music Streaming',
                  vibeName: 'VYBZ MUSIC',
                  customUrl: 'https://vybzmusic.online',
                  isAppShare: true,
                });
              }}
              aria-label="Share VybZ Music with friends"
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 hover:border-amber-400/40 hover:bg-white/10 px-2.5 sm:px-3 py-1.5 text-[0.72rem] sm:text-xs font-semibold text-white/80 hover:text-white transition-all active:scale-95 cursor-pointer"
            >
              <Share2 size={13} className="text-amber-400 shrink-0" />
              <span className="hidden xs:inline">Share</span>
            </button>

            {showInstallBtn && (
              <button
                type="button"
                onClick={handleInstallClick}
                aria-label={isAndroid ? 'Download VybZ Android APK' : isIOS ? 'Install VybZ on iOS' : 'Install VybZ App'}
                className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-2.5 sm:px-3.5 py-1.5 text-[0.72rem] sm:text-xs font-bold text-black shadow-md hover:brightness-110 active:scale-95 transition-all"
              >
                <Download size={13} className="shrink-0" />
                <span className="hidden xs:inline">
                  {isAndroid ? 'Download APK' : 'Install App'}
                </span>
                <span className="xs:hidden">
                  {isAndroid ? 'APK' : 'App'}
                </span>
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

        {/* SCROLLABLE DISCOVERY MAIN CONTENT (Zero-lag native scrolling without GPU layer clipping) */}
        <main ref={mainScrollRef} className="relative z-10 flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-5 [-webkit-overflow-scrolling:touch] [overscroll-behavior:contain]">
          <div className="mx-auto w-full max-w-[1440px] space-y-6 sm:space-y-8 pb-6">
            {/* ========================================================
                ARTIST DETAIL VIEW
               ======================================================== */}
            {selectedArtist ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={closeArtist}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-amber-300 hover:bg-white/10 transition-colors"
                  >
                    ← Back to artists
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleShareTrack(
                        `${selectedArtist.name} Top 20 Songs`,
                        selectedArtist.name,
                        `https://vybzmusic.online/artist/${selectedArtist.id}`,
                        selectedArtist.avatar,
                        'POPULAR ARTIST'
                      )
                    }
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Share2 size={13} className="text-amber-400" /> Share Artist
                  </button>
                </div>

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

                  {isSearchingArtist ? (
                    <div className="divide-y divide-white/5 py-1">
                      {Array.from({ length: 5 }).map((_, sIdx) => (
                        <div
                          key={`artist-track-skel-${sIdx}`}
                          className="flex items-center justify-between p-2 sm:p-3 rounded-xl gap-2"
                        >
                          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                            <div className="w-5 h-3 rounded shimmer-skeleton shrink-0" />
                            <div className="size-10 sm:size-11 rounded-lg shimmer-skeleton shrink-0" />
                            <div className="space-y-1.5 flex-1 min-w-0">
                              <div className="h-3.5 w-36 sm:w-52 rounded shimmer-skeleton" />
                              <div className="h-2.5 w-24 sm:w-32 rounded shimmer-skeleton opacity-60" />
                            </div>
                          </div>
                          <div className="size-8 rounded-full shimmer-skeleton shrink-0" />
                        </div>
                      ))}
                    </div>
                  ) : visibleArtistTracks.length === 0 ? (
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
            ) : selectedVibeWorld ? (
              <div className="space-y-6 animate-fade-in">
                {/* Back button & Share */}
                <div className="flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={closeVibeWorld}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-amber-300 hover:bg-white/10 transition-colors"
                  >
                    ← Back to all vibes
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const slug = WORLD_ID_TO_SLUG[selectedVibeWorld.id] || selectedVibeWorld.id;
                      handleShareTrack(
                        `${selectedVibeWorld.nameHindi} (${selectedVibeWorld.name}) Radio`,
                        'VybZ Music',
                        `https://vybzmusic.online/vibes/${slug}`,
                        selectedVibeWorld.bg,
                        selectedVibeWorld.name
                      );
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <Share2 size={13} className="text-amber-400" /> Share Vibe
                  </button>
                </div>

                {/* HERO BANNER */}
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0e141f] p-4 sm:p-7 shadow-2xl">
                  {/* Atmospheric Background Art */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-30 scale-105 filter blur-[1px] transition-all"
                    style={{ backgroundImage: `url(${selectedVibeWorld.bg})` }}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0e141f] via-[#0e141f]/85 to-transparent" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0e141f] via-transparent to-[#0e141f]/80" />

                  <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 sm:gap-6">
                    {/* Visual Icon Badge */}
                    <div
                      className="size-24 sm:size-32 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-400/50 shadow-2xl shrink-0 flex flex-col items-center justify-center p-3 text-center bg-black/60 backdrop-blur-md"
                      style={{
                        boxShadow: `0 8px 32px ${selectedVibeWorld.themeColor}30`,
                      }}
                    >
                      <span className="text-4xl sm:text-5xl drop-shadow">
                        {getVibeIcon(selectedVibeWorld)}
                      </span>
                      <span className="mt-1 font-mono text-[0.62rem] font-bold uppercase tracking-wider text-amber-300">
                        {selectedVibeWorld.tracks?.length || 25} Songs
                      </span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                        <span className="inline-block rounded-full px-2.5 sm:px-3 py-0.5 sm:py-1 text-[0.68rem] sm:text-xs font-semibold border bg-amber-400/15 border-amber-400/30 text-amber-300">
                          {selectedVibeWorld.pillTitle || 'Curated Mood Station'} • 25 Iconic Songs
                        </span>
                        <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[0.62rem] font-mono text-white/60">
                          100% Ad-Free
                        </span>
                      </div>

                      <h2
                        translate="no"
                        className="notranslate mt-2 text-2xl sm:text-4xl font-black text-white leading-tight break-words"
                      >
                        {selectedVibeWorld.nameHindi}
                        <span className="ml-2 text-lg sm:text-2xl text-amber-400 font-semibold">
                          ({selectedVibeWorld.name})
                        </span>
                      </h2>

                      <p className="mt-1 text-xs sm:text-sm text-amber-300/90 font-medium">
                        {selectedVibeWorld.subtitle}
                      </p>

                      <p className="mt-2 text-xs sm:text-[0.82rem] text-white/70 max-w-2xl leading-relaxed italic">
                        &ldquo;{selectedVibeWorld.subQuote}&rdquo;
                      </p>

                      {/* Action buttons */}
                      <div className="mt-4 flex flex-col xs:flex-row items-stretch xs:items-center justify-center sm:justify-start gap-2.5">
                        <button
                          type="button"
                          onClick={() => handlePlayVibeStation(selectedVibeWorld, true)}
                          className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-5 sm:px-6 py-2.5 text-xs font-bold text-black shadow hover:scale-105 active:scale-95 transition-transform"
                        >
                          {currentWorld.id === selectedVibeWorld.id && isPlaying ? (
                            <>
                              <Pause size={14} fill="black" /> Pause Radio
                            </>
                          ) : currentWorld.id === selectedVibeWorld.id && currentTrackId ? (
                            <>
                              <Play size={14} fill="black" /> Resume Radio
                            </>
                          ) : (
                            <>
                              <Play size={14} fill="black" /> Play All 25 Songs
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const tracks = selectedVibeWorld.tracks || [];
                            if (tracks.length === 0) return;
                            const r = Math.floor(Math.random() * tracks.length);
                            const t = tracks[r];
                            const q: QueueTrack[] = tracks.map((x) => ({
                              id: x.id,
                              title: x.title,
                              artist: x.artist || selectedVibeWorld.name,
                              thumbnail: `https://img.youtube.com/vi/${x.id}/mqdefault.jpg`,
                            }));
                            onPlayCustomVideoId(
                              t.id,
                              t.title,
                              t.artist || selectedVibeWorld.name,
                              `https://img.youtube.com/vi/${t.id}/mqdefault.jpg`,
                              q,
                              r,
                              false
                            );
                          }}
                          className="flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 active:scale-95 transition-colors"
                        >
                          <Shuffle size={13} /> Shuffle Vibe
                        </button>

                        {/* ENTER FULLSCREEN VISUAL MODE */}
                        <button
                          type="button"
                          onClick={() => {
                            window.location.hash = '#vibe';
                            setViewMode('vibe');
                          }}
                          className="flex items-center justify-center gap-1.5 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-2.5 text-xs font-bold text-amber-300 hover:bg-amber-400/20 active:scale-95 transition-all shadow-md shadow-amber-500/10"
                        >
                          <Sparkles size={13} className="text-amber-400 animate-spin" />
                          <span>Fullscreen Cinematic Visual</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Optional Embedded Ambient Controls (e.g. Deluxe Salon Champi/Scissor/Trimmer) */}
                  {selectedVibeWorld.id === 'deluxe_salon' && (
                    <div className="relative z-10 mt-5 pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-amber-300">
                        <Sparkles size={13} />
                        <span>Interactive Ustaad Ji Salon Tools</span>
                      </div>
                      <AmbientMixer />
                    </div>
                  )}
                </div>

                {/* 25 TRACKS CONTAINER */}
                <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0c121b] p-3 sm:p-6 shadow-xl space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-white/5">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-white">25 Curated Tracks</h3>
                        <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[0.62rem] sm:text-[0.65rem] font-bold text-amber-300">
                          {isVibeExpandAll
                            ? `All ${currentVibeTracks.length}`
                            : `Page ${vibePage}/5 (${vibeStartIdx + 1}-${Math.min(vibeStartIdx + 5, currentVibeTracks.length)})`}
                        </span>
                      </div>
                      <p className="text-[0.7rem] sm:text-xs text-white/45 mt-0.5">
                        Selected timeless anthems & vibes for this mood
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
                        const isActive = !isVibeExpandAll && vibePage === page;
                        return (
                          <button
                            key={`vibe-page-${page}`}
                            type="button"
                            onClick={() => {
                              setIsVibeExpandAll(false);
                              setVibePage(page);
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
                        onClick={() => setIsVibeExpandAll((prev) => !prev)}
                        className={`rounded-lg sm:rounded-xl px-2 sm:px-2.5 py-1 text-[0.65rem] sm:text-xs font-mono font-bold transition-colors shrink-0 ${
                          isVibeExpandAll
                            ? 'bg-amber-400 text-black shadow'
                            : 'border border-white/10 bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {isVibeExpandAll ? '5-by-5' : 'All 25'}
                      </button>
                    </div>
                  </div>

                  {visibleVibeTracks.length === 0 ? (
                    <div className="py-10 text-center text-sm text-white/45">
                      No tracks available in this station yet.
                    </div>
                  ) : (
                    <div className="divide-y divide-white/5">
                      {visibleVibeTracks.map((song, i) => {
                        if (!song) return null;
                        const overallIndex = isVibeExpandAll ? i : vibeStartIdx + i;
                        const isSongCurrent = currentTrackId === song.id;
                        return (
                          <div
                            key={`${song.id || 'vibe-song'}-${overallIndex}`}
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
                                  onError={handleArtworkError}
                                  className="size-full object-cover"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p
                                  translate="no"
                                  onClick={() =>
                                    handleTogglePlayVibeSong(
                                      song.id,
                                      song.title,
                                      song.artist || selectedVibeWorld.name,
                                      overallIndex,
                                      currentVibeTracks
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
                                  {song.artist || selectedVibeWorld.name}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                              <button
                                type="button"
                                aria-label={`Play ${song.title}`}
                                onClick={() =>
                                  handleTogglePlayVibeSong(
                                    song.id,
                                    song.title,
                                    song.artist || selectedVibeWorld.name,
                                    overallIndex,
                                    currentVibeTracks
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

                  {/* Vibe Pagination Bar */}
                  <div className="flex items-center justify-between gap-2 pt-2.5 border-t border-white/5">
                    {!isVibeExpandAll && vibePage > 1 ? (
                      <button
                        type="button"
                        onClick={() => setVibePage((p) => Math.max(1, p - 1))}
                        className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1.5 text-[0.7rem] sm:text-xs font-semibold text-white/80 hover:bg-white/10 transition-colors"
                      >
                        ← Prev 5
                      </button>
                    ) : (
                      <div />
                    )}

                    <div className="flex items-center gap-2">
                      {!isVibeExpandAll &&
                        vibePage < 5 &&
                        currentVibeTracks.length > vibePage * 5 && (
                          <button
                            type="button"
                            onClick={() => setVibePage((p) => Math.min(5, p + 1))}
                            className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3.5 sm:px-5 py-1.5 text-[0.7rem] sm:text-xs font-bold text-black shadow hover:scale-102 active:scale-98 transition-transform"
                          >
                            <span>
                              Next 5 ({vibePage * 5 + 1}-
                              {Math.min((vibePage + 1) * 5, currentVibeTracks.length)})
                            </span>
                            <ChevronRight size={13} />
                          </button>
                        )}

                      <button
                        type="button"
                        onClick={() => setIsVibeExpandAll((prev) => !prev)}
                        className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 sm:px-4 py-1.5 text-[0.7rem] sm:text-xs font-semibold text-amber-300 hover:bg-amber-400/20 transition-colors"
                      >
                        {isVibeExpandAll ? 'Show 5' : 'All 25'}
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

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                      {recentHistory.slice(0, 4).map((track, idx) => {
                        const isCur = currentTrackId === track.id;
                        return (
                          <button
                            key={`recent-${track.id}-${idx}`}
                            type="button"
                            onClick={() => handleTogglePlayStored(track, idx, recentHistory)}
                            className={`group flex items-center gap-3 rounded-2xl border p-2.5 text-left transition-all ${
                              isCur
                                ? 'border-amber-400/50 bg-[#141b2a] shadow-md ring-1 ring-amber-400/25'
                                : 'border-white/10 bg-[#0f1522] hover:border-amber-400/35 hover:bg-[#131b2a] shadow-sm'
                            }`}
                          >
                            <div className="relative size-11 sm:size-12 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-amber-500/20 via-[#131b29] to-[#0a0f18] aspect-square border border-white/5 flex items-center justify-center">
                              <Sparkles size={14} className="absolute text-amber-400/40" />
                              <img
                                src={track.thumbnail}
                                alt=""
                                loading="eager"
                                onError={handleArtworkError}
                                className="relative z-10 size-full object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p
                                translate="no"
                                className={`notranslate truncate text-xs sm:text-sm font-semibold transition-colors ${
                                  isCur ? 'text-amber-300' : 'text-white group-hover:text-amber-300'
                                }`}
                              >
                                {track.title}
                              </p>
                              <p translate="no" className="notranslate truncate text-[0.68rem] text-white/50 mt-0.5">
                                {track.artist}
                              </p>
                            </div>
                            <span className="grid size-7 sm:size-8 shrink-0 place-items-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-md opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all group-hover:scale-105 active:scale-95">
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
                      className="relative overflow-hidden rounded-3xl border border-amber-400/25 bg-gradient-to-br from-amber-500/12 via-[#0e1420] to-[#070a10] p-4 sm:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.5)]"
                    >
                      <div className="pointer-events-none absolute -right-10 -top-10 size-64 sm:size-80 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.18)_0%,transparent_70%)]" />
                      <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-[0.62rem] sm:text-xs font-bold uppercase tracking-widest text-amber-300">
                          <TrendingUp size={13} className="text-amber-400" />
                          <span>Official VybZ India Chart • Top 25 Daily</span>
                        </div>
                        <h2 className="mt-2 text-xl sm:text-3xl font-black text-white leading-tight tracking-tight">
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
                            className={`flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r ${themeStyles.accentGradient} px-5 py-2.5 text-xs font-bold text-black shadow-[0_10px_25px_rgba(245,158,11,0.35)] hover:scale-105 hover:brightness-110 active:scale-95 transition-all`}
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

                    {/* TOP 25 CHART CONTAINER */}
                    <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-[#0a0e17] p-3 sm:p-6 shadow-xl">
                      <div className="flex items-center justify-between gap-2.5 pb-3 border-b border-white/5">
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-white">
                            {activeCategory === 'all' ? 'Top 25 Trending Hits' : 'Top 25 India Chart'}
                          </h3>
                          <p className="text-[0.68rem] sm:text-xs text-white/45 mt-0.5">
                            {activeCategory === 'all'
                              ? "India's daily trending chart • Tap to stream"
                              : 'Rank 1 to 25 • Continuous Official India Daily Streaming'}
                          </p>
                        </div>

                        {activeCategory === 'all' ? (
                          <button
                            type="button"
                            onClick={() => handleSelectCategory('trending')}
                            className="text-xs sm:text-sm font-semibold text-white/60 hover:text-amber-300 transition-colors flex items-center gap-0.5 active:scale-95 py-1 px-1.5"
                          >
                            <span>Show all</span>
                            <ChevronRight size={15} />
                          </button>
                        ) : (
                          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-medium text-white/70">
                            <span className="size-1.5 rounded-full bg-emerald-400" />
                            Live Daily Hits
                          </span>
                        )}
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

                      {/* BOTTOM ACTION (Only on dedicated chart page) */}
                      {activeCategory === 'trending' && (
                        <div className="mt-3 sm:mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/45 px-1 py-1">
                          <span className="flex items-center gap-1.5">
                            <span className="inline-block size-2 rounded-full bg-emerald-400" />
                            Official India Daily Chart • 25 Tracks
                          </span>
                          <button
                            type="button"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="text-amber-400/80 hover:text-amber-300 transition-colors font-medium"
                          >
                            Back to top ↑
                          </button>
                        </div>
                      )}
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
                            <span>Desi Ambient Radios • {WORLDS.length} Iconic Indian Atmospheres</span>
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
                      <div className="flex items-center justify-between gap-2.5 pb-1">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <Sparkles size={16} className="text-amber-400" />
                            <h2 className="text-base sm:text-lg font-bold text-white">
                              Curated Mood & Vibe Stations
                            </h2>
                          </div>
                          <p className="text-[0.68rem] sm:text-xs text-white/45 mt-0.5">
                            Handcrafted Indian soundscapes & nostalgic ambient radios
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSelectCategory('vibes')}
                          className="text-xs sm:text-sm font-semibold text-white/60 hover:text-amber-300 transition-colors flex items-center gap-0.5 active:scale-95 py-1 px-1.5"
                        >
                          <span>Show all</span>
                          <ChevronRight size={15} />
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3.5">
                      {(activeCategory === 'all' ? WORLDS.slice(0, 4) : WORLDS).map((world) => {
                        const isCurrentWorld = currentWorld.id === world.id;
                        return (
                          <div
                            key={`vibe-${world.id}`}
                            onClick={() => handlePlayVibeStation(world, false)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handlePlayVibeStation(world, false);
                              }
                            }}
                            className={`group relative overflow-hidden rounded-3xl border p-3 sm:p-4 flex flex-col justify-between transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.99] ${
                              isCurrentWorld
                                ? 'border-amber-400/60 bg-[#141b2a] shadow-xl shadow-amber-500/15 ring-1 ring-amber-400/30'
                                : 'border-white/10 bg-[#0f1522] hover:border-amber-400/40 hover:bg-[#131b2a] shadow-md'
                            }`}
                          >
                            {/* Background ambient subtle image accent */}
                            <div
                              className="pointer-events-none absolute inset-0 opacity-20 group-hover:opacity-35 transition-opacity bg-cover bg-center"
                              style={{ backgroundImage: `url(${world.bg})` }}
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f1522] via-[#0f1522]/85 to-transparent" />

                            <div className="relative z-10">
                              <div className="flex items-center justify-between">
                                <span
                                  className="size-8 sm:size-9 grid place-items-center rounded-2xl text-sm shadow-md"
                                  style={{
                                    backgroundColor: `${world.themeColor}25`,
                                    border: `1px solid ${world.themeColor}50`,
                                  }}
                                >
                                  {getVibeIcon(world)}
                                </span>
                                <span className="font-mono text-[0.6rem] sm:text-xs uppercase tracking-wider text-amber-300/80 font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/5">
                                  {world.tracks.length} Songs
                                </span>
                              </div>

                              <h3 className="mt-2.5 text-sm sm:text-base font-bold text-white leading-snug group-hover:text-amber-300 transition-colors">
                                {world.nameHindi}
                              </h3>
                              <p className="font-mono text-[0.65rem] sm:text-xs text-amber-400/90 font-medium truncate mt-0.5">
                                {world.name}
                              </p>
                              <p className="text-[0.62rem] sm:text-xs text-white/55 line-clamp-1 sm:line-clamp-2 mt-1 leading-relaxed">
                                {world.tagline || world.subtitle}
                              </p>
                            </div>

                            <div className="relative z-10 mt-3 pt-2.5 border-t border-white/5">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handlePlayVibeStation(world, true);
                                }}
                                className={`w-full flex items-center justify-center gap-1.5 rounded-xl py-2 px-3 text-xs font-bold transition-all shadow-md ${
                                  isCurrentWorld && isPlaying
                                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-amber-400/30'
                                    : isCurrentWorld && currentTrackId
                                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                                      : 'bg-white/10 text-white group-hover:bg-gradient-to-r group-hover:from-amber-400 group-hover:to-orange-500 group-hover:text-black active:scale-95'
                                }`}
                              >
                                {isCurrentWorld && isPlaying ? (
                                  <>
                                    <Pause size={11} fill="currentColor" className="shrink-0" />
                                    <span>Pause</span>
                                  </>
                                ) : isCurrentWorld && currentTrackId ? (
                                  <>
                                    <Play size={11} fill="currentColor" className="shrink-0" />
                                    <span>Resume</span>
                                  </>
                                ) : (
                                  <>
                                    <Play size={11} fill="currentColor" className="shrink-0" />
                                    <span>Play Vibe</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {activeCategory === 'vibes' && (
                      <div className="mt-3 sm:mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/45 px-1 py-1">
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block size-2 rounded-full bg-emerald-400" />
                          Desi Ambient Radios • 10 Unique Stations
                        </span>
                        <button
                          type="button"
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          className="text-amber-400/80 hover:text-amber-300 transition-colors font-medium"
                        >
                          Back to top ↑
                        </button>
                      </div>
                    )}
                  </section>
                )}

                {/* ========================================================
                    SECTION 2: POPULAR INDIAN ARTISTS
                   ======================================================== */}
                {(activeCategory === 'all' || activeCategory === 'artists') && (
                  <section className="space-y-4">
                    {activeCategory === 'artists' ? (
                      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-amber-400/30 bg-gradient-to-r from-amber-500/15 via-[#0d131f] to-orange-500/10 p-4 sm:p-7 shadow-xl">
                        <div className="relative z-10 max-w-2xl">
                          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300">
                            <Mic2 size={14} />
                            <span>Indian Music Legends • {ARTISTS_CATALOG.length} Curated Artists</span>
                          </div>
                          <h2 className="mt-1 sm:mt-2 text-xl sm:text-3xl font-black text-white leading-tight">
                            Popular Indian Artists
                          </h2>
                          <p className="mt-1 text-xs sm:text-sm text-white/75 leading-relaxed">
                            From Bollywood playback legends and classical masters to modern Punjabi icons and Indie sensations. Tap any artist to explore their 20 top curated hits.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2.5 pb-1">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <Mic2 size={16} className="text-amber-400" />
                            <h2 className="text-base sm:text-lg font-bold text-white">
                              Popular Artists
                            </h2>
                          </div>
                          <p className="text-[0.68rem] sm:text-xs text-white/45 mt-0.5">
                            The iconic voices and composers defining Indian sound
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleSelectCategory('artists')}
                          className="text-xs sm:text-sm font-semibold text-white/60 hover:text-amber-300 transition-colors flex items-center gap-0.5 active:scale-95 py-1 px-1.5"
                        >
                          <span>Show all</span>
                          <ChevronRight size={15} />
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3.5">
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
                            className="group relative flex flex-col rounded-xl sm:rounded-2xl border border-white/5 bg-[#0e1420] p-2 sm:p-3.5 transition-colors hover:border-amber-400/40 hover:bg-[#131c2b] cursor-pointer shadow-md"
                          >
                            <div className="relative aspect-square w-full overflow-hidden rounded-full shadow-md bg-gradient-to-tr from-amber-500/15 via-[#131b29] to-[#0c121d] border-2 border-white/10 group-hover:border-amber-400 transition-colors">
                              {/* Glowing fallback icon so it never looks black */}
                              <div className="absolute inset-0 grid place-items-center text-amber-400/35">
                                <Mic2 size={20} className="opacity-40" />
                              </div>
                              <img
                                src={artist.avatar}
                                alt={artist.name}
                                loading={aIdx < 12 ? 'eager' : 'lazy'}
                                decoding="async"
                                referrerPolicy="no-referrer"
                                onError={handleArtworkError}
                                className="relative z-10 size-full object-cover transition-transform duration-300 group-hover:scale-105"
                              />

                              <button
                                type="button"
                                onClick={(e) => handleTogglePlayArtist(artist, e)}
                                aria-label={`Play ${artist.name}`}
                                className="absolute bottom-1 right-1 grid size-7 sm:size-9 place-items-center rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-black shadow opacity-100 sm:opacity-0 sm:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:scale-105 active:scale-95"
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

                    {/* YouTube-Style Infinite Auto-Scroll Sentinel & Glowing Shimmer Skeleton Grid */}
                    {activeCategory === 'artists' && artistDisplayLimit < ARTISTS_CATALOG.length && (
                      <div ref={artistSentinelRef} className="pt-2 pb-3">
                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 sm:gap-3.5">
                          {Array.from({ length: 6 }).map((_, sIdx) => (
                            <div
                              key={`artist-auto-skel-${sIdx}`}
                              className="flex flex-col items-center rounded-xl sm:rounded-2xl border border-white/5 bg-[#0e1420]/70 p-2 sm:p-3.5 shadow-sm space-y-2.5"
                            >
                              <div className="size-20 sm:size-24 rounded-full shimmer-skeleton border border-white/5" />
                              <div className="h-3 w-16 sm:w-20 rounded shimmer-skeleton" />
                              <div className="h-2 w-10 rounded shimmer-skeleton opacity-50" />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {activeCategory === 'artists' && (
                      <div className="mt-3 sm:mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-white/45 px-1 py-1">
                        <span className="flex items-center gap-1.5">
                          <span className="inline-block size-2 rounded-full bg-emerald-400" />
                          Showing {Math.min(artistDisplayLimit, ARTISTS_CATALOG.length)} of {ARTISTS_CATALOG.length} Curated Artists
                        </span>
                        <button
                          type="button"
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          className="text-amber-400/80 hover:text-amber-300 transition-colors font-medium"
                        >
                          Back to top ↑
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
                              disabled={inspectedPlaylist.tracks.length === 0}
                              onClick={() => handleSharePlaylist(inspectedPlaylist)}
                              aria-label={`Share ${inspectedPlaylist.name}`}
                              className="flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/20 transition-colors disabled:opacity-40 cursor-pointer"
                            >
                              <Share2 size={13} /> Share
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
                              <div className="flex items-center gap-1">
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSharePlaylist(pl);
                                  }}
                                  aria-label={`Share ${pl.name}`}
                                  className="grid size-7 place-items-center rounded-full text-white/40 hover:bg-white/10 hover:text-amber-400 transition-colors shrink-0"
                                >
                                  <Share2 size={13} />
                                </button>
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
                        <div className="self-start sm:self-auto flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleTogglePlayStored(likedSongs[0], 0)}
                            className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-5 sm:px-6 py-2 sm:py-2.5 text-xs font-bold text-white shadow hover:scale-105 active:scale-95 transition-transform"
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
                          <button
                            type="button"
                            onClick={handleShareFavorites}
                            aria-label="Share liked songs"
                            className="flex items-center justify-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 sm:py-2.5 text-xs font-bold text-white shadow hover:bg-white/20 active:scale-95 transition-transform cursor-pointer"
                          >
                            <Share2 size={13} /> Share
                          </button>
                        </div>
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
                SLIM & STREAMLINED FOOTER (All Routes)
               ======================================================== */}
            <footer className="mt-8 sm:mt-10 border-t border-white/5 pt-6 sm:pt-8 pb-3 text-white/50 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
                  {/* Column 1: Brand Info */}
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2">
                      <div className="size-7 rounded-xl bg-amber-400 text-black font-black grid place-items-center text-sm shadow">
                        V
                      </div>
                      <div>
                        <span className="text-sm font-black text-white tracking-tight">
                          vybz <span className="text-amber-400">music</span>
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
                      Mood & Vibe Stations ({WORLDS.length})
                    </h3>
                    <ul className="space-y-1 text-[0.72rem] text-white/50">
                      {WORLDS.map((w) => (
                        <li key={`footer-vibe-${w.id}`}>
                          <button
                            type="button"
                            onClick={() => handlePlayVibeStation(w, false)}
                            className="hover:text-amber-300 transition-colors text-left flex items-center gap-1.5"
                          >
                            <span>{getVibeIcon(w)}</span>
                            <span>{w.nameHindi} ({w.name})</span>
                          </button>
                        </li>
                      ))}
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
                      {showInstallBtn && (
                        <button
                          type="button"
                          onClick={handleInstallClick}
                          className="flex items-center justify-center gap-1.5 rounded-lg border border-amber-400/40 bg-amber-400/15 py-1.5 px-3 text-xs font-semibold text-amber-300 hover:bg-amber-400/25 active:scale-95 transition-all shadow-sm"
                        >
                          <Download size={13} className="text-amber-400" />
                          <span>{isAndroid ? 'Download Android App (APK)' : isIOS ? 'Install on iPhone (Web App)' : 'Install Desktop App'}</span>
                        </button>
                      )}
                      <p className="text-[0.65rem] text-white/40 leading-relaxed">
                        {isAndroid
                          ? 'Get the official 60FPS background audio Android APK directly.'
                          : isIOS
                          ? 'Add VybZ directly to your iPhone Home Screen via Safari.'
                          : 'Install VybZ as a desktop app on your PC.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4 flex flex-col gap-3 text-[0.68rem] text-white/35">
                  {/* Row 1: Legal & Information Links (Fully responsive: centered & wrapped on mobile, neat row on desktop) */}
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 sm:gap-x-4 gap-y-1.5 text-white/45">
                    <button
                      type="button"
                      onClick={() => openLegalModal('about')}
                      className="hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      About VybZ
                    </button>
                    <span className="text-white/20 hidden sm:inline">•</span>
                    <button
                      type="button"
                      onClick={() => openLegalModal('faq')}
                      className="hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      FAQ & Devices
                    </button>
                    <span className="text-white/20 hidden sm:inline">•</span>
                    <button
                      type="button"
                      onClick={() => openLegalModal('privacy')}
                      className="hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                    <span className="text-white/20 hidden sm:inline">•</span>
                    <button
                      type="button"
                      onClick={() => openLegalModal('terms')}
                      className="hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      Terms of Service
                    </button>
                    <span className="text-white/20 hidden sm:inline">•</span>
                    <button
                      type="button"
                      onClick={() => openLegalModal('disclaimer')}
                      className="hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      DMCA & Disclaimer
                    </button>
                  </div>

                  {/* Row 2: Copyright & Badges */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
                    <p>© 2026 VybZ Music • Official India Audio Hub • https://vybzmusic.online</p>
                    <div className="flex items-center gap-3">
                      <span>Crafted for Indian Music Lovers ❤️</span>
                      <span>•</span>
                      <span>No Ads</span>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsDownloadPage(true);
                          navigateTo('/download');
                        }}
                        className="hover:text-amber-300 underline transition-colors"
                      >
                        Android APK (v3.5.2)
                      </button>
                    </div>
                  </div>
                </div>
              </footer>
          </div>
        </main>
      </div>

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

      {/* iOS PWA Install Modal Sheet */}
      {showIOSInstallModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setShowIOSInstallModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Install VybZ on iOS"
            className="w-full max-w-sm rounded-3xl border border-white/15 bg-[#0f1522] p-5 sm:p-6 shadow-2xl text-white space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-2xl bg-amber-400/10 border border-amber-400/30 p-1.5 shadow">
                <img src="/logo.png" alt="VybZ" className="size-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-white">Install VybZ on iOS</h3>
                <p className="text-xs text-amber-300 font-medium">
                  {iosBrowserType === 'chrome'
                    ? 'Google Chrome for iOS'
                    : iosBrowserType === 'google' || iosBrowserType === 'inapp'
                    ? 'In-App Browser Detected'
                    : 'Apple Safari Web App'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowIOSInstallModal(false)}
                className="grid size-7 place-items-center rounded-full bg-white/10 text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-white/80 py-1">
              {iosBrowserType === 'chrome' ? (
                <>
                  <div className="flex items-start gap-3 rounded-xl bg-white/5 p-2.5">
                    <span className="grid size-6 place-items-center rounded-full bg-amber-400 text-black font-bold text-xs shrink-0">
                      1
                    </span>
                    <p className="leading-relaxed">
                      Chrome ke address bar me <strong className="text-white">Share button (⬆️)</strong> ya bottom toolbar me <strong className="text-white">3-dots (⋯)</strong> menu par tap karein.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl bg-white/5 p-2.5">
                    <span className="grid size-6 place-items-center rounded-full bg-amber-400 text-black font-bold text-xs shrink-0">
                      2
                    </span>
                    <p className="leading-relaxed">
                      Menu me scroll karke <strong className="text-white">&apos;Add to Home Screen&apos; (+)</strong> select karein.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl bg-white/5 p-2.5">
                    <span className="grid size-6 place-items-center rounded-full bg-amber-400 text-black font-bold text-xs shrink-0">
                      3
                    </span>
                    <p className="leading-relaxed">
                      Top-right me <strong className="text-white">&apos;Add&apos;</strong> dabayein. VybZ aapke iPhone par standalone ad-free app ban jayega!
                    </p>
                  </div>
                </>
              ) : iosBrowserType === 'google' || iosBrowserType === 'inapp' ? (
                <>
                  <div className="flex items-start gap-3 rounded-xl bg-white/5 p-2.5">
                    <span className="grid size-6 place-items-center rounded-full bg-amber-400 text-black font-bold text-xs shrink-0">
                      1
                    </span>
                    <p className="leading-relaxed">
                      Apple in-app browsers se direct install allow nahi karta. Screen ke top ya bottom me <strong className="text-white">3-dots (⋯) ya Share</strong> par tap karein.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl bg-white/5 p-2.5">
                    <span className="grid size-6 place-items-center rounded-full bg-amber-400 text-black font-bold text-xs shrink-0">
                      2
                    </span>
                    <p className="leading-relaxed">
                      Menu me se <strong className="text-white">&apos;Open in Safari&apos;</strong> (ya &apos;Open in Chrome&apos;) select karein.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl bg-white/5 p-2.5">
                    <span className="grid size-6 place-items-center rounded-full bg-amber-400 text-black font-bold text-xs shrink-0">
                      3
                    </span>
                    <p className="leading-relaxed">
                      Safari khulte hi <strong className="text-white">Share (⬆️)</strong> dabakar <strong className="text-white">&apos;Add to Home Screen&apos;</strong> karein!
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3 rounded-xl bg-white/5 p-2.5">
                    <span className="grid size-6 place-items-center rounded-full bg-amber-400 text-black font-bold text-xs shrink-0">
                      1
                    </span>
                    <p className="leading-relaxed">
                      Safari ke bottom toolbar me <strong className="text-white">Share button</strong> (square box with arrow up <span className="inline-block px-1 bg-white/10 rounded">⎋</span>) par tap karein.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl bg-white/5 p-2.5">
                    <span className="grid size-6 place-items-center rounded-full bg-amber-400 text-black font-bold text-xs shrink-0">
                      2
                    </span>
                    <p className="leading-relaxed">
                      Menu ko neeche scroll karein aur <strong className="text-white">&apos;Add to Home Screen&apos; (+)</strong> par tap karein.
                    </p>
                  </div>
                  <div className="flex items-start gap-3 rounded-xl bg-white/5 p-2.5">
                    <span className="grid size-6 place-items-center rounded-full bg-amber-400 text-black font-bold text-xs shrink-0">
                      3
                    </span>
                    <p className="leading-relaxed">
                      Top right me <strong className="text-white">&apos;Add&apos;</strong> dabayein. VybZ aapke iPhone par standalone ad-free app ban jayega!
                    </p>
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowIOSInstallModal(false)}
              className="w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-2.5 text-xs font-bold text-black shadow active:scale-95 transition-transform"
            >
              Samajh Gaya (Done)
            </button>
          </div>
        </div>
      )}

      {/* Android APK Download & Quick Installation Guide Modal */}
      {showAndroidInstallModal && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fade-in"
          onClick={() => setShowAndroidInstallModal(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Download VybZ Android APK"
            className="w-full max-w-sm rounded-3xl border border-amber-400/30 bg-[#0f1522] p-5 sm:p-6 shadow-2xl text-white space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-2xl bg-amber-400/10 border border-amber-400/30 p-1.5 shadow">
                <img src="/logo.png" alt="VybZ Music" className="size-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-base font-bold text-white">Downloading VybZ Music</h3>
                <p className="text-xs text-amber-300 font-medium">
                  Official Android APK (v3.3.0)
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowAndroidInstallModal(false)}
                className="grid size-7 place-items-center rounded-full bg-white/10 text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Quick 3-Step Guide (100% English) */}
            <div className="space-y-2.5 text-xs text-white/80 py-1">
              <div className="flex items-start gap-3 rounded-xl bg-white/5 p-2.5">
                <span className="grid size-6 place-items-center rounded-full bg-amber-400 text-black font-bold text-xs shrink-0">
                  1
                </span>
                <p className="leading-relaxed">
                  <strong className="text-white">Download in progress...</strong> Check your notification bar or Downloads folder once complete.
                </p>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-white/5 p-2.5">
                <span className="grid size-6 place-items-center rounded-full bg-amber-400 text-black font-bold text-xs shrink-0">
                  2
                </span>
                <p className="leading-relaxed">
                  If Android displays a security check, tap <strong className="text-white">&apos;More details ∨&apos;</strong> to expand it.
                </p>
              </div>

              <div className="flex items-start gap-3 rounded-xl bg-white/5 p-2.5">
                <span className="grid size-6 place-items-center rounded-full bg-amber-400 text-black font-bold text-xs shrink-0">
                  3
                </span>
                <p className="leading-relaxed">
                  Tap <strong className="text-amber-300">&apos;Install anyway&apos;</strong> to enjoy 100% ad-free 60 FPS background music!
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 flex items-center justify-between text-[11px] text-white/60">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                ✓ Verified & Malware-Free
              </span>
              <span>No Login Required</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-1">
              <a
                href="https://vybzmusic.online/vybz.apk"
                download="vybz.apk"
                className="flex-1 rounded-xl border border-amber-400/30 bg-amber-400/10 py-2.5 text-center text-xs font-semibold text-amber-300 hover:bg-amber-400/20 active:scale-95 transition-all"
              >
                Download Again ⟳
              </a>
              <button
                type="button"
                onClick={() => setShowAndroidInstallModal(false)}
                className="flex-1 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 py-2.5 text-xs font-bold text-black shadow active:scale-95 transition-transform"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Legal & Info Transparency Modal */}
      <LegalInfoModal
        isOpen={!!legalModalTab}
        activeTab={legalModalTab || 'about'}
        onTabChange={openLegalModal}
        onClose={closeLegalModal}
      />
    </div>
  );
}
