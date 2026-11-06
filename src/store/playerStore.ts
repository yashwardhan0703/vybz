import { create } from 'zustand';
import { WORLDS, DEFAULT_WORLD_ID } from '../data/worlds';
import type { World } from '../data/worlds';
import {
  getStoredLikedSongs,
  saveStoredLikedSongs,
  getStoredUserPlaylists,
  saveStoredUserPlaylists,
  getStoredRecentHistory,
  saveStoredRecentHistory,
  getStoredViewMode,
  saveStoredViewMode,
  type StoredTrack,
  type UserPlaylist,
} from '../utils/localStorageHelper';

export type RepeatMode = 'none' | 'one' | 'all';
export type ViewMode = 'studio' | 'vibe';
export type StudioTab = 'explore' | 'artists' | 'playlists' | 'favorites';

interface PlayerState {
  // Mode & Tabs
  viewMode: ViewMode;
  activeTab: StudioTab;
  activeArtistId: string | null;

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

  // Actions - Modes & Nav
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
  setActiveTab: (tab: StudioTab) => void;
  setActiveArtistId: (artistId: string | null) => void;

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
  closeAll: () => void;
}

const initialWorld = WORLDS.find((w) => w.id === DEFAULT_WORLD_ID) ?? WORLDS[0];
const initialTrack = initialWorld.tracks?.[0];

export const usePlayerStore = create<PlayerState>((set, get) => ({
  viewMode: getStoredViewMode(),
  activeTab: 'explore',
  activeArtistId: null,

  currentWorldId: initialWorld.id,
  currentWorld: initialWorld,

  likedSongs: getStoredLikedSongs(),
  userPlaylists: getStoredUserPlaylists(),
  recentHistory: getStoredRecentHistory(),

  isTuning: false,
  tuningProgress: 0,

  isPlaying: false,
  isLoading: false,
  isShuffle: false,
  repeatMode: 'none',
  volume: 80,
  isMuted: false,
  currentTime: 0,
  duration: 0,
  trackIndex: 0,
  trackCount: initialWorld.tracks?.length ?? 0,
  currentTrackId: '',
  trackTitle: initialTrack?.title ?? initialWorld.nameHindi,
  trackArtist: initialTrack?.artist ?? initialWorld.name,
  trackThumbnail: initialTrack?.id ? `https://img.youtube.com/vi/${initialTrack.id}/mqdefault.jpg` : '',

  isTrackListOpen: false,
  isWorldSwitcherOpen: false,
  isSearchOpen: false,

  setViewMode: (mode) => {
    saveStoredViewMode(mode);
    set({ viewMode: mode });
  },

  toggleViewMode: () => {
    const next = get().viewMode === 'studio' ? 'vibe' : 'studio';
    saveStoredViewMode(next);
    set({ viewMode: next });
  },

  setActiveTab: (tab) => set({ activeTab: tab, activeArtistId: null }),
  setActiveArtistId: (artistId) => set({ activeArtistId: artistId }),

  setWorld: (worldId) =>
    set(() => {
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

  toggleShuffle: () => set((s) => ({ isShuffle: !s.isShuffle })),

  cycleRepeat: () =>
    set((s) => {
      const next: RepeatMode =
        s.repeatMode === 'none' ? 'all' : s.repeatMode === 'all' ? 'one' : 'none';
      return { repeatMode: next };
    }),

  setVolume: (vol) => set({ volume: Math.max(0, Math.min(100, Math.round(vol))) }),
  toggleMute: () => set((s) => ({ isMuted: !s.isMuted })),

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

  closeAll: () =>
    set({
      isTrackListOpen: false,
      isWorldSwitcherOpen: false,
      isSearchOpen: false,
    }),
}));
