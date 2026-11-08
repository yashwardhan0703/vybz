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

