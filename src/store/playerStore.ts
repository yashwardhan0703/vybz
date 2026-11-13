import { create } from 'zustand';
import { WORLDS, DEFAULT_WORLD_ID } from '../data/worlds';
import type { World } from '../data/worlds';
import { TOP_25_TRENDING_INDIAN, type TrendingTrack } from '../data/trendingSongs';
import {
  getStoredLikedSongs,
  saveStoredLikedSongs,
  getStoredUserPlaylists,
  saveStoredUserPlaylists,
  getStoredRecentHistory,
  saveStoredRecentHistory,
  getStoredViewMode,
  saveStoredViewMode,
  getStoredPlaybackState,
  saveStoredPlaybackState,
  type StoredTrack,
  type UserPlaylist,
  type PersistedQueueTrack,
} from '../utils/localStorageHelper';

export type RepeatMode = 'none' | 'one' | 'all';
export type ViewMode = 'studio' | 'vibe';
export type StudioTab = 'explore' | 'artists' | 'playlists' | 'favorites';
export type PlayerCategory = 'all' | 'trending' | 'vibes' | 'artists' | 'playlists' | 'favorites';

interface PlayerState {
  // Mode & Tabs
  viewMode: ViewMode;
  activeTab: StudioTab;
  activeCategory: PlayerCategory;
  activeArtistId: string | null;

  // Live Queue State (mirrored from YouTube engine for UI)
  playbackQueue: PersistedQueueTrack[];
  playbackQueueIndex: number;

  // Live Top 25 India Chart
  top25Tracks: TrendingTrack[];
  top25LastUpdated: number | null;
  isTop25Refreshing: boolean;
  refreshLiveTop25: (force?: boolean) => Promise<void>;

  // World (Ambient Vibe Mode)
  currentWorldId: string;
  currentWorld: World;

  // Local Personalized Data (100% in browser cache/storage)
  likedSongs: StoredTrack[];
  userPlaylists: UserPlaylist[];
  recentHistory: StoredTrack[];

  // Preload & Tuning State
  isTuning: boolean;
  tuningProgress: number;

  // Player state
  isPlaying: boolean;
  isLoading: boolean;
  isShuffle: boolean;
  repeatMode: RepeatMode;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  trackIndex: number;
  trackCount: number;
  currentTrackId: string;
  trackTitle: string;
  trackArtist: string;
  trackThumbnail: string;

  // UI state
  isTrackListOpen: boolean;
  isWorldSwitcherOpen: boolean;
  isSearchOpen: boolean;
  isNowPlayingOpen: boolean;

  // Actions - Modes & Nav
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
  setActiveTab: (tab: StudioTab) => void;
  setActiveCategory: (category: PlayerCategory) => void;
  setActiveArtistId: (artistId: string | null) => void;
  setPlaybackQueue: (queue: PersistedQueueTrack[], index?: number) => void;

  // Actions - World
  setWorld: (worldId: string) => void;

  // Actions - Personal Library (Cache/localStorage)
  toggleLike: (track: StoredTrack) => void;
  createPlaylist: (name: string, description?: string) => void;
  deletePlaylist: (playlistId: string) => void;
  addToPlaylist: (playlistId: string, track: StoredTrack) => void;
  removeFromPlaylist: (playlistId: string, trackId: string) => void;
  addToRecent: (track: StoredTrack) => void;

  // Actions - Playback
  setIsTuning: (tuning: boolean) => void;
  setTuningProgress: (progress: number) => void;
  setIsPlaying: (playing: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  setVolume: (vol: number) => void;
  toggleMute: () => void;
  setCurrentTime: (t: number) => void;
  setDuration: (d: number) => void;
  setTrackInfo: (index: number, count: number, title: string, artist: string, thumbnail: string, videoId?: string) => void;
  toggleTrackList: () => void;
  toggleWorldSwitcher: () => void;
  toggleSearch: () => void;
  setSearchOpen: (open: boolean) => void;
  setNowPlayingOpen: (open: boolean) => void;
  toggleNowPlaying: () => void;
  closeAll: () => void;
}

const TOP25_CACHE_KEY = 'vybz_live_top25_v1';
const TOP25_TTL_MS = 30 * 60 * 1000;

function getCachedTop25(): { tracks: TrendingTrack[]; updatedAt: number | null } {
  if (typeof window === 'undefined') {
    return { tracks: TOP_25_TRENDING_INDIAN, updatedAt: null };
  }
  try {
    const raw = localStorage.getItem(TOP25_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed?.results) && parsed.results.length >= 10) {
        return { tracks: parsed.results, updatedAt: parsed.updatedAt || null };
      }
    }
  } catch {}
  return { tracks: TOP_25_TRENDING_INDIAN, updatedAt: null };
}

const initialTop25 = getCachedTop25();

const persistedState = typeof window !== 'undefined' ? getStoredPlaybackState() : null;
const initialWorld =
  (persistedState?.currentWorldId && WORLDS.find((w) => w.id === persistedState.currentWorldId)) ||
  WORLDS.find((w) => w.id === DEFAULT_WORLD_ID) ||
  WORLDS[0];
const initialTrack = initialWorld.tracks?.[0];

export const usePlayerStore = create<PlayerState>((set, get) => ({
  viewMode: persistedState?.viewMode || getStoredViewMode(),
  activeTab: 'explore',
  activeCategory: 'all',
  activeArtistId: null,

  playbackQueue: persistedState?.queue ?? [],
  playbackQueueIndex: persistedState?.queueIndex ?? 0,

  top25Tracks: initialTop25.tracks,
  top25LastUpdated: initialTop25.updatedAt,
  isTop25Refreshing: false,

  refreshLiveTop25: async (force = false) => {
    const state = get();
    if (state.isTop25Refreshing) return;
    if (
      !force &&
      state.top25LastUpdated &&
      Date.now() - state.top25LastUpdated < TOP25_TTL_MS
    ) {
      return;
    }

    set({ isTop25Refreshing: true });
    try {
      let res = await fetch('/api/top25');
      if (!res.ok) {
        res = await fetch('https://vybzmusic.online/api/top25');
      }
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data?.results) && data.results.length >= 10) {
          const updatedAt = data.updatedAt || Date.now();
          set({
            top25Tracks: data.results,
            top25LastUpdated: updatedAt,
          });
          try {
            localStorage.setItem(
              TOP25_CACHE_KEY,
              JSON.stringify({ results: data.results, updatedAt })
            );
          } catch {}
        }
      }
    } catch {
      // Keep fallback or cached chart cleanly when offline
    } finally {
      set({ isTop25Refreshing: false });
    }
  },

  currentWorldId: initialWorld.id,
  currentWorld: initialWorld,

  likedSongs: getStoredLikedSongs(),
  userPlaylists: getStoredUserPlaylists(),
  recentHistory: getStoredRecentHistory(),

  isTuning: false,
  tuningProgress: 0,

  isPlaying: false,
  isLoading: false,
  isShuffle: persistedState?.isShuffle ?? false,
  repeatMode: persistedState?.repeatMode ?? 'none',
  volume: persistedState?.volume ?? 80,
  isMuted: persistedState?.isMuted ?? false,
  currentTime: persistedState?.currentTime ?? 0,
  duration: persistedState?.duration ?? 0,
  trackIndex: persistedState?.queueIndex ?? 0,
  trackCount:
    persistedState?.queue && persistedState.queue.length > 0
      ? persistedState.queue.length
      : initialWorld.tracks?.length ?? 0,
  currentTrackId: persistedState?.currentTrackId ?? (initialTrack?.id || ''),
  trackTitle: persistedState?.trackTitle ?? initialTrack?.title ?? initialWorld.nameHindi,
  trackArtist: persistedState?.trackArtist ?? initialTrack?.artist ?? initialWorld.name,
  trackThumbnail:
    persistedState?.trackThumbnail ??
    (initialTrack?.id ? `https://img.youtube.com/vi/${initialTrack.id}/mqdefault.jpg` : ''),

  isTrackListOpen: false,
  isWorldSwitcherOpen: false,
  isSearchOpen: false,
  isNowPlayingOpen: false,

  setViewMode: (mode) => {
    saveStoredViewMode(mode);
    set({ viewMode: mode });
  },

  toggleViewMode: () => {
    const next = get().viewMode === 'studio' ? 'vibe' : 'studio';
    saveStoredViewMode(next);
    if (typeof window !== 'undefined') {
      if (next === 'vibe') {
        window.history.pushState({ mode: 'vibe' }, '', '#vibe');
      } else if (window.location.hash === '#vibe') {
        window.history.back();
      }
    }
    set({ viewMode: next });
  },

  setActiveTab: (tab) => set({ activeTab: tab, activeArtistId: null }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  setActiveArtistId: (artistId) => set({ activeArtistId: artistId }),
  setPlaybackQueue: (queue, index) =>
    set((s) => ({
      playbackQueue: queue,
      playbackQueueIndex: index !== undefined ? Math.max(0, index) : s.playbackQueueIndex,
    })),

  setWorld: (worldId) =>
    set((state) => {
      if (state.currentWorldId === worldId) {
        return {}; // Already in this world, do NOT reset playback state!
      }
      const world = WORLDS.find((w) => w.id === worldId) ?? WORLDS[0];
      const track = world.tracks?.[0];
      return {
        currentWorldId: world.id,
        currentWorld: world,
        isPlaying: false,
        isLoading: false,
        isTuning: false,
        tuningProgress: 0,
        trackIndex: 0,
        trackCount: world.tracks?.length ?? 0,
        currentTrackId: track?.id || '',
        trackTitle: track?.title ?? world.nameHindi,
        trackArtist: track?.artist ?? world.name,
        trackThumbnail: track?.id ? `https://img.youtube.com/vi/${track.id}/mqdefault.jpg` : '',
        currentTime: 0,
        duration: 0,
      };
    }),

  toggleLike: (track) => {
    const current = get().likedSongs;
    const exists = current.some((s) => s.id === track.id);
    const updated = exists
      ? current.filter((s) => s.id !== track.id)
      : [{ ...track, addedAt: Date.now() }, ...current];
    saveStoredLikedSongs(updated);
    set({ likedSongs: updated });
  },

  createPlaylist: (name, description) => {
    const newPlaylist: UserPlaylist = {
      id: `pl-${Date.now()}`,
      name: name.trim() || 'My Playlist',
      description: description || '',
      createdAt: Date.now(),
      tracks: [],
    };
    const updated = [newPlaylist, ...get().userPlaylists];
    saveStoredUserPlaylists(updated);
    set({ userPlaylists: updated });
  },

  deletePlaylist: (playlistId) => {
    const updated = get().userPlaylists.filter((p) => p.id !== playlistId);
    saveStoredUserPlaylists(updated);
    set({ userPlaylists: updated });
  },

  addToPlaylist: (playlistId, track) => {
    const updated = get().userPlaylists.map((pl) => {
      if (pl.id !== playlistId) return pl;
      if (pl.tracks.some((t) => t.id === track.id)) return pl;
      return { ...pl, tracks: [...pl.tracks, track] };
    });
    saveStoredUserPlaylists(updated);
    set({ userPlaylists: updated });
  },

  removeFromPlaylist: (playlistId, trackId) => {
    const updated = get().userPlaylists.map((pl) => {
      if (pl.id !== playlistId) return pl;
      return { ...pl, tracks: pl.tracks.filter((t) => t.id !== trackId) };
    });
    saveStoredUserPlaylists(updated);
    set({ userPlaylists: updated });
  },

  addToRecent: (track) => {
    const filtered = get().recentHistory.filter((t) => t.id !== track.id);
    const updated = [track, ...filtered];
    saveStoredRecentHistory(updated);
    set({ recentHistory: updated });
  },

  setIsTuning: (tuning) => set({ isTuning: tuning }),
  setTuningProgress: (progress) => set({ tuningProgress: progress }),
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  toggleShuffle: () =>
    set((s) => {
      const next = !s.isShuffle;
      saveStoredPlaybackState({ isShuffle: next });
      return { isShuffle: next };
    }),

  cycleRepeat: () =>
    set((s) => {
      const next: RepeatMode =
        s.repeatMode === 'none' ? 'all' : s.repeatMode === 'all' ? 'one' : 'none';
      saveStoredPlaybackState({ repeatMode: next });
      return { repeatMode: next };
    }),

  setVolume: (vol) => {
    const v = Math.max(0, Math.min(100, Math.round(vol)));
    saveStoredPlaybackState({ volume: v });
    set({ volume: v });
  },
  toggleMute: () =>
    set((s) => {
      const next = !s.isMuted;
      saveStoredPlaybackState({ isMuted: next });
      return { isMuted: next };
    }),

  setCurrentTime: (t) => set({ currentTime: Math.max(0, t) }),
  setDuration: (d) => set({ duration: Math.max(0, d) }),

  setTrackInfo: (index, count, title, artist, thumbnail, videoId) => {
    const state = get();
    const trackId = videoId !== undefined ? videoId : state.currentTrackId;
    set({
      trackIndex: Math.max(0, index),
      trackCount: Math.max(0, count),
      trackTitle: title,
      trackArtist: artist,
      trackThumbnail: thumbnail,
      currentTrackId: trackId,
    });
    // Record to browser recent history
    if (trackId && title) {
      state.addToRecent({
        id: trackId,
        title,
        artist,
        thumbnail,
      });
    }
  },

  toggleTrackList: () =>
    set((s) => ({
      isTrackListOpen: !s.isTrackListOpen,
      isWorldSwitcherOpen: false,
      isSearchOpen: false,
    })),

  toggleWorldSwitcher: () =>
    set((s) => ({
      isWorldSwitcherOpen: !s.isWorldSwitcherOpen,
      isTrackListOpen: false,
      isSearchOpen: false,
    })),

  toggleSearch: () =>
    set((s) => ({
      isSearchOpen: !s.isSearchOpen,
      isTrackListOpen: false,
      isWorldSwitcherOpen: false,
    })),

  setSearchOpen: (open) =>
    set({
      isSearchOpen: open,
      isTrackListOpen: false,
      isWorldSwitcherOpen: false,
    }),

  setNowPlayingOpen: (open) =>
    set({
      isNowPlayingOpen: open,
      isTrackListOpen: false,
      isWorldSwitcherOpen: false,
      isSearchOpen: false,
    }),

  toggleNowPlaying: () =>
    set((s) => ({
      isNowPlayingOpen: !s.isNowPlayingOpen,
      isTrackListOpen: false,
      isWorldSwitcherOpen: false,
      isSearchOpen: false,
    })),

  closeAll: () =>
    set({
      isTrackListOpen: false,
      isWorldSwitcherOpen: false,
      isSearchOpen: false,
      isNowPlayingOpen: false,
    }),
}));
