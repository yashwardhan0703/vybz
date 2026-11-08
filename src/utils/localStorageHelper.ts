export interface StoredTrack {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration?: string;
  addedAt?: number;
}

export interface UserPlaylist {
  id: string;
  name: string;
  description?: string;
  createdAt: number;
  tracks: StoredTrack[];
}

const LIKED_SONGS_KEY = 'vybz_music_liked_songs';
const USER_PLAYLISTS_KEY = 'vybz_music_user_playlists';
const RECENT_HISTORY_KEY = 'vybz_music_recent_history';
const VIEW_MODE_KEY = 'vybz_music_view_mode';

const LEGACY_LIKED_KEY = 'aura_music_liked_songs';
const LEGACY_PLAYLISTS_KEY = 'aura_music_user_playlists';
const LEGACY_HISTORY_KEY = 'aura_music_recent_history';
const LEGACY_VIEW_MODE_KEY = 'aura_music_view_mode';

export function getStoredLikedSongs(): StoredTrack[] {
  try {
    const raw = localStorage.getItem(LIKED_SONGS_KEY) || localStorage.getItem(LEGACY_LIKED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredLikedSongs(songs: StoredTrack[]): void {
  try {
    localStorage.setItem(LIKED_SONGS_KEY, JSON.stringify(songs));
  } catch { }
}

export function getStoredUserPlaylists(): UserPlaylist[] {
  try {
    const raw = localStorage.getItem(USER_PLAYLISTS_KEY) || localStorage.getItem(LEGACY_PLAYLISTS_KEY);
    if (raw) return JSON.parse(raw);
    // Default initial starter playlist
    const initial: UserPlaylist[] = [
      {
        id: 'favorites-mix',
        name: 'My vybz Mix',
        description: 'Your favorite tracks in one spot',
        createdAt: Date.now(),
        tracks: [
          {
            id: 'P1fIdFRnfqw',
            title: 'What Jhumka? - Rocky Aur Rani',
            artist: 'Saregama Music',
            thumbnail: 'https://img.youtube.com/vi/P1fIdFRnfqw/mqdefault.jpg',
          },
          {
            id: '9YhzTM-KHkM',
            title: 'Ilahi',
            artist: 'Arijit Singh',
            thumbnail: 'https://img.youtube.com/vi/9YhzTM-KHkM/mqdefault.jpg',
          },
          {
            id: 'QKfGl39ZJWI',
            title: 'Pardesi Pardesi',
            artist: 'Udit Narayan, Alka Yagnik',
            thumbnail: 'https://img.youtube.com/vi/QKfGl39ZJWI/mqdefault.jpg',
          },
        ],
      },
    ];
    saveStoredUserPlaylists(initial);
    return initial;
  } catch {
    return [];
  }
}

export function saveStoredUserPlaylists(playlists: UserPlaylist[]): void {
  try {
    localStorage.setItem(USER_PLAYLISTS_KEY, JSON.stringify(playlists));
  } catch { }
}

export function getStoredRecentHistory(): StoredTrack[] {
  try {
    const raw = localStorage.getItem(RECENT_HISTORY_KEY) || localStorage.getItem(LEGACY_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredRecentHistory(history: StoredTrack[]): void {
  try {
    // Keep max 30 recent tracks
    localStorage.setItem(RECENT_HISTORY_KEY, JSON.stringify(history.slice(0, 30)));
  } catch { }
}

export function getStoredViewMode(): 'studio' | 'vibe' {
  try {
    const raw = localStorage.getItem(VIEW_MODE_KEY) || localStorage.getItem(LEGACY_VIEW_MODE_KEY);
    return raw === 'vibe' ? 'vibe' : 'studio';
  } catch {
    return 'studio';
  }
}

export function saveStoredViewMode(mode: 'studio' | 'vibe'): void {
  try {
    localStorage.setItem(VIEW_MODE_KEY, mode);
  } catch { }
}

export interface PersistedQueueTrack {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration?: string | number;
}

export interface PersistedPlaybackState {
  currentTrackId: string;
  sourceUrl?: string;
  trackTitle: string;
  trackArtist: string;
  trackThumbnail: string;
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  repeatMode: 'none' | 'one' | 'all';
  isShuffle: boolean;
  viewMode: 'studio' | 'vibe';
  currentWorldId: string;
  queue: PersistedQueueTrack[];
  queueIndex: number;
  isVibeRadioMode: boolean;
  updatedAt: number;
}

const PLAYBACK_STATE_KEY = 'vybz_music_playback_state';

export function getStoredPlaybackState(): PersistedPlaybackState | null {
  try {
    const raw = localStorage.getItem(PLAYBACK_STATE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedPlaybackState;
    if (parsed && typeof parsed.currentTrackId === 'string' && parsed.currentTrackId) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveStoredPlaybackState(patch: Partial<PersistedPlaybackState>): void {
  try {
    const existing = getStoredPlaybackState();
    const currentTrackId = patch.currentTrackId ?? existing?.currentTrackId ?? '';
    const updated: PersistedPlaybackState = {
      currentTrackId,
      sourceUrl:
        patch.sourceUrl ??
        (currentTrackId ? `https://www.youtube.com/watch?v=${currentTrackId}` : existing?.sourceUrl ?? ''),
      trackTitle: patch.trackTitle ?? existing?.trackTitle ?? '',
      trackArtist: patch.trackArtist ?? existing?.trackArtist ?? '',
      trackThumbnail: patch.trackThumbnail ?? existing?.trackThumbnail ?? '',
      currentTime: Math.max(0, patch.currentTime ?? existing?.currentTime ?? 0),
      duration: Math.max(0, patch.duration ?? existing?.duration ?? 0),
      isPlaying: patch.isPlaying !== undefined ? patch.isPlaying : (existing?.isPlaying ?? false),
      volume: patch.volume !== undefined ? patch.volume : (existing?.volume ?? 80),
      isMuted: patch.isMuted !== undefined ? patch.isMuted : (existing?.isMuted ?? false),
      repeatMode: patch.repeatMode ?? existing?.repeatMode ?? 'none',
      isShuffle: patch.isShuffle !== undefined ? patch.isShuffle : (existing?.isShuffle ?? false),
      viewMode: patch.viewMode ?? existing?.viewMode ?? 'studio',
      currentWorldId: patch.currentWorldId ?? existing?.currentWorldId ?? 'tapri',
      queue: patch.queue ?? existing?.queue ?? [],
      queueIndex: patch.queueIndex ?? existing?.queueIndex ?? 0,
      isVibeRadioMode:
        patch.isVibeRadioMode !== undefined
          ? patch.isVibeRadioMode
          : (existing?.isVibeRadioMode ?? false),
      updatedAt: Date.now(),
    };
    localStorage.setItem(PLAYBACK_STATE_KEY, JSON.stringify(updated));
  } catch {}
}

export function clearStoredPlaybackState(): void {
  try {
    localStorage.removeItem(PLAYBACK_STATE_KEY);
  } catch {}
}

