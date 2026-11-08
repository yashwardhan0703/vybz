import { useState } from 'react';
import {
  Play,
  Heart,
  Plus,
  Trash2,
  Sparkles,
  Disc3,
  Clock,
  Mic2,
  FolderPlus,
  ListMusic,
} from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { ARTISTS_CATALOG } from '../data/artistsData';
import { THEMES } from '../data/worlds';
import type { StoredTrack } from '../utils/localStorageHelper';

interface StudioViewProps {
  onPlayCustomVideoId: (videoId: string, title?: string, artist?: string, thumbnail?: string) => void;
  onPlayAt: (index: number) => void;
}

export default function StudioView({ onPlayCustomVideoId }: StudioViewProps) {
  const {
    activeTab,
    setActiveTab,
    activeArtistId,
    setActiveArtistId,
    likedSongs,
    toggleLike,
    userPlaylists,
    createPlaylist,
    deletePlaylist,
    removeFromPlaylist,
    recentHistory,
    currentTrackId,
    isPlaying,
    setWorld,
    toggleViewMode,
  } = usePlayerStore();

  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);

  const selectedArtist = ARTISTS_CATALOG.find((a) => a.id === activeArtistId);
  const selectedPlaylist = userPlaylists.find((p) => p.id === selectedPlaylistId);

  // Play a stored track
  const handlePlayTrack = (track: StoredTrack) => {
    onPlayCustomVideoId(track.id, track.title, track.artist, track.thumbnail);
  };

  // Play an entire playlist from the start
  const handlePlayPlaylistAll = (tracks: StoredTrack[]) => {
    if (tracks.length === 0) return;
    handlePlayTrack(tracks[0]);
  };

  const handleCreateNewPlaylist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlaylistName.trim()) return;
    createPlaylist(newPlaylistName.trim());
    setNewPlaylistName('');
    setIsCreatingPlaylist(false);
  };

  return (
    <div className="flex-1 overflow-y-auto px-4 pb-32 pt-6 sm:px-8">
      {/* ========================================================
          1. ARTIST DETAIL VIEW (When an artist is clicked)
         ======================================================== */}
      {activeArtistId && selectedArtist && (
        <div className="animate-fade-in space-y-6">
          <button
            type="button"
            onClick={() => setActiveArtistId(null)}
            className="flex items-center gap-1.5 text-xs text-teal-400 hover:underline"
          >
            ← Back to all artists
          </button>

          {/* Artist Header Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-transparent p-6 sm:p-10">
            <div className="absolute inset-0 z-0 opacity-25">
              <img src={selectedArtist.banner || selectedArtist.avatar} alt="" className="size-full object-cover" />
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <img
                src={selectedArtist.avatar}
                alt={selectedArtist.name}
                className="size-28 sm:size-36 rounded-full object-cover border-4 border-teal-400/40 shadow-[0_0_30px_rgba(45,212,191,0.25)]"
              />
              <div>
                <span className="rounded-full bg-teal-500/20 px-3 py-1 text-xs font-semibold text-teal-300">
                  Verified Artist
                </span>
                <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-white">
                  {selectedArtist.name}
                </h1>
                <p className="mt-1 text-sm text-white/60">{selectedArtist.tagline}</p>
                <p className="mt-1 text-xs font-mono text-white/40">
                  {selectedArtist.monthlyListeners || 'Verified Artist'}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      const first = selectedArtist.topTracks[0];
                      if (first) {
                        handlePlayTrack({
                          id: first.id,
                          title: first.title,
                          artist: selectedArtist.name,
                          thumbnail: `https://img.youtube.com/vi/${first.id}/mqdefault.jpg`,
                        });
                      }
                    }}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 px-6 py-2.5 text-xs font-bold text-black shadow-lg hover:scale-105 active:scale-95 transition-all"
                  >
                    <Play size={16} fill="black" /> Play Top Tracks
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Artist Top Tracks */}
          <div className="space-y-2">
            <h2 className="text-lg font-bold text-white">Top Popular Releases</h2>
            <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-[#0d1115]/90 p-2 sm:p-4">
              {selectedArtist.topTracks.map((song, i) => {
                const isCurrent = currentTrackId === song.id;
                const isSongLiked = likedSongs.some((s) => s.id === song.id);

                return (
                  <div
                    key={`${song.id}-${i}`}
                    className={`group flex items-center justify-between gap-3 rounded-xl p-3 transition-colors hover:bg-white/10 ${
                      isCurrent ? 'bg-white/10 text-teal-300' : 'text-white/80'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="w-5 text-center font-mono text-xs text-white/40">
                        {isCurrent && isPlaying ? '▶' : i + 1}
                      </span>
                      <img
                        src={`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`}
                        alt=""
                        className="size-11 rounded-lg object-cover shadow"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white group-hover:text-teal-300 transition-colors">
                          {song.title}
                        </p>
                        <p className="truncate text-xs text-white/45">
                          {selectedArtist.name} {song.album ? `• ${song.album}` : ''}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {song.plays && (
                        <span className="hidden sm:inline font-mono text-xs text-white/35">
                          {song.plays}
                        </span>
                      )}
                      {song.duration && (
                        <span className="font-mono text-xs text-white/45">{song.duration}</span>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          toggleLike({
                            id: song.id,
                            title: song.title,
                            artist: selectedArtist.name,
                            thumbnail: `https://img.youtube.com/vi/${song.id}/mqdefault.jpg`,
                          })
                        }
                        className="text-white/40 hover:text-rose-500 transition-colors"
                      >
                        <Heart
                          size={16}
                          className={isSongLiked ? 'fill-rose-500 text-rose-500' : ''}
                        />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handlePlayTrack({
                            id: song.id,
                            title: song.title,
                            artist: selectedArtist.name,
                            thumbnail: `https://img.youtube.com/vi/${song.id}/mqdefault.jpg`,
                          })
                        }
                        className="grid size-8 place-items-center rounded-full bg-white/10 text-white group-hover:bg-teal-400 group-hover:text-black transition-all"
                      >
                        <Play size={14} fill="currentColor" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          2. EXPLORE TAB (Home / Trending / Mixes / Recent)
         ======================================================== */}
      {activeTab === 'explore' && !activeArtistId && (
        <div className="space-y-8 animate-fade-in">
          {/* Hero Welcome Banner */}
          <div className="relative overflow-hidden rounded-3xl border border-teal-500/20 bg-gradient-to-r from-teal-950/40 via-neutral-900/60 to-black p-6 sm:p-8 backdrop-blur-xl">
            <div className="relative z-10 max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-400/30 bg-teal-400/10 px-3 py-1 text-xs font-semibold text-teal-300">
                <Sparkles size={12} /> Unlimited Audio Engine
              </span>
              <h2 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
                Listen to Any Song, Anywhere, Anytime.
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-white/60">
                Search by lyrics, title, or artist. Enjoy 100% ad-free Bollywood, Punjabi, and Global hits with no subscription needed.
              </p>
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    // Play first song
                    handlePlayTrack({
                      id: 'P1fIdFRnfqw',
                      title: 'What Jhumka? - Rocky Aur Rani',
                      artist: 'Saregama Music',
                      thumbnail: 'https://img.youtube.com/vi/P1fIdFRnfqw/mqdefault.jpg',
                    });
                  }}
                  className="flex items-center gap-2 rounded-full bg-teal-400 px-5 py-2.5 text-xs font-bold text-black shadow-lg hover:scale-105 active:scale-95 transition-all"
                >
                  <Play size={14} fill="black" /> Quick Play Mix
                </button>
                <button
                  type="button"
                  onClick={toggleViewMode}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition-all"
                >
                  ✨ Switch to Ambient Vibe Mode
                </button>
              </div>
            </div>
          </div>

          {/* Top Artists Row */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Mic2 size={18} className="text-teal-400" />
                Featured Artists
              </h3>
              <button
                type="button"
                onClick={() => setActiveTab('artists')}
                className="text-xs text-teal-400 hover:underline"
              >
                View all →
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {ARTISTS_CATALOG.slice(0, 6).map((artist) => (
                <div
                  key={artist.id}
                  onClick={() => setActiveArtistId(artist.id)}
                  className="group flex flex-col items-center rounded-2xl border border-white/5 bg-[#0e1317]/80 p-4 text-center cursor-pointer transition-all hover:border-teal-500/30 hover:bg-[#121920] hover:scale-[1.02]"
                >
                  <div className="relative size-20 sm:size-24 overflow-hidden rounded-full border-2 border-white/10 group-hover:border-teal-400 transition-colors shadow">
                    <img src={artist.avatar} alt={artist.name} className="size-full object-cover" />
                  </div>
                  <h4 className="mt-3 truncate w-full text-xs sm:text-sm font-semibold text-white group-hover:text-teal-300 transition-colors">
                    {artist.name}
                  </h4>
                  <p className="text-[0.65rem] text-white/45 mt-0.5">Artist</p>
                </div>
              ))}
            </div>
          </div>

          {/* Ambient Vibe Stations Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Disc3 size={18} className="text-amber-400" />
                Curated Vibe Stations
              </h3>
              <span className="text-xs text-white/40">Switch ambiance anytime</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {THEMES.map((th) => (
                <div
                  key={th.id}
                  onClick={() => {
                    setWorld(th.id);
                    toggleViewMode();
                  }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e1317] p-4 cursor-pointer transition-all hover:scale-[1.02] hover:border-white/25"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="grid size-12 shrink-0 place-items-center rounded-xl text-lg font-bold shadow"
                      style={{ backgroundColor: `${th.themeColor}33`, color: th.themeColor }}
                    >
                      ☕
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="font-deva text-base font-bold text-white">{th.nameHindi}</h4>
                      <p className="truncate text-xs text-white/50">{th.subtitle}</p>
                    </div>
                    <button
                      type="button"
                      className="grid size-8 place-items-center rounded-full bg-white/10 text-white group-hover:bg-teal-400 group-hover:text-black transition-colors"
                    >
                      <Play size={14} fill="currentColor" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Played History (Saved locally in user browser) */}
          {recentHistory.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Clock size={18} className="text-sky-400" />
                Recently Played
                <span className="text-xs font-normal text-white/40 font-mono">
                  (Saved in your browser)
                </span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                {recentHistory.slice(0, 6).map((item) => (
                  <div
                    key={`recent-${item.id}`}
                    onClick={() => handlePlayTrack(item)}
                    className="group flex items-center gap-3 rounded-xl border border-white/5 bg-[#0e1317]/80 p-2.5 cursor-pointer hover:bg-white/10 transition-colors"
                  >
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="size-11 rounded-lg object-cover shadow shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs sm:text-sm font-semibold text-white group-hover:text-teal-300 transition-colors">
                        {item.title}
                      </p>
                      <p className="truncate text-xs text-white/45">{item.artist}</p>
                    </div>
                    <button
                      type="button"
                      className="grid size-7 shrink-0 place-items-center rounded-full bg-white/10 text-white group-hover:bg-teal-400 group-hover:text-black transition-colors"
                    >
                      <Play size={12} fill="currentColor" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          3. ARTISTS TAB (Full Artists Catalog)
         ======================================================== */}
      {activeTab === 'artists' && !activeArtistId && (
        <div className="space-y-6 animate-fade-in">
          <div>
            <h2 className="text-2xl font-bold text-white">Popular Artists</h2>
            <p className="text-xs text-white/50 mt-1">
              Select an artist to explore their discography and play top hits
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {ARTISTS_CATALOG.map((artist) => (
              <div
                key={artist.id}
                onClick={() => setActiveArtistId(artist.id)}
                className="group flex flex-col items-center rounded-2xl border border-white/5 bg-[#0d1115]/80 p-5 text-center cursor-pointer transition-all hover:border-teal-400/40 hover:bg-[#121820] hover:scale-[1.02]"
              >
                <div className="relative size-24 sm:size-32 overflow-hidden rounded-full border-2 border-white/10 group-hover:border-teal-400 transition-colors shadow-lg">
                  <img src={artist.avatar} alt={artist.name} className="size-full object-cover" />
                </div>
                <h3 className="mt-3 truncate w-full text-sm font-bold text-white group-hover:text-teal-300 transition-colors">
                  {artist.name}
                </h3>
                <p className="text-xs text-white/50 mt-0.5 truncate w-full">{artist.tagline}</p>
                <span className="mt-2 text-[0.62rem] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full">
                  {artist.monthlyListeners || 'Artist'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================
          4. PLAYLISTS TAB (Local User Playlists in Browser)
         ======================================================== */}
      {activeTab === 'playlists' && (
        <div className="space-y-6 animate-fade-in">
          {/* Header with Create Button */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Your Playlists</h2>
              <p className="text-xs text-white/50 mt-0.5">
                Saved 100% locally in your browser storage (Zero server load)
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsCreatingPlaylist(true)}
              className="flex items-center gap-1.5 rounded-full bg-teal-400 px-4 py-2 text-xs font-bold text-black shadow hover:scale-105 active:scale-95 transition-all"
            >
              <Plus size={15} /> Create Playlist
            </button>
          </div>

          {/* Create Modal Input */}
          {isCreatingPlaylist && (
            <form
              onSubmit={handleCreateNewPlaylist}
              className="flex items-center gap-3 rounded-2xl border border-teal-500/30 bg-[#0e141a] p-4 shadow-xl"
            >
              <FolderPlus size={20} className="text-teal-400 shrink-0" />
              <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="Give your playlist a name (e.g. Gym Beats, Late Night Vibes)..."
                autoFocus
                className="flex-1 bg-transparent text-sm text-white placeholder-white/40 outline-none"
              />
              <button
                type="submit"
                className="rounded-full bg-teal-400 px-4 py-1.5 text-xs font-bold text-black hover:brightness-110"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsCreatingPlaylist(false)}
                className="rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/60 hover:text-white"
              >
                Cancel
              </button>
            </form>
          )}

          {/* Selected Playlist Detail */}
          {selectedPlaylistId && selectedPlaylist ? (
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setSelectedPlaylistId(null)}
                className="text-xs text-teal-400 hover:underline"
              >
                ← Back to all playlists
              </button>

              <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#0e1317] p-6">
                <div>
                  <h3 className="text-2xl font-bold text-white">{selectedPlaylist.name}</h3>
                  <p className="text-xs text-white/50 mt-1">
                    {selectedPlaylist.tracks.length} tracks • Created in browser
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handlePlayPlaylistAll(selectedPlaylist.tracks)}
                    disabled={selectedPlaylist.tracks.length === 0}
                    className="flex items-center gap-2 rounded-full bg-teal-400 px-5 py-2 text-xs font-bold text-black disabled:opacity-50"
                  >
                    <Play size={14} fill="black" /> Play All
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deletePlaylist(selectedPlaylist.id);
                      setSelectedPlaylistId(null);
                    }}
                    className="rounded-full p-2 text-white/40 hover:bg-rose-500/20 hover:text-rose-400"
                    title="Delete playlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Playlist Tracks Table */}
              <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-[#0c1014] p-3">
                {selectedPlaylist.tracks.map((t, idx) => (
                  <div
                    key={`${t.id}-${idx}`}
                    className="group flex items-center justify-between p-2.5 hover:bg-white/5 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="w-5 text-center font-mono text-xs text-white/40">
                        {idx + 1}
                      </span>
                      <img src={t.thumbnail} alt="" className="size-10 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs sm:text-sm font-semibold text-white">
                          {t.title}
                        </p>
                        <p className="truncate text-[0.7rem] text-white/50">{t.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handlePlayTrack(t)}
                        className="grid size-7 place-items-center rounded-full bg-white/10 text-white hover:bg-teal-400 hover:text-black"
                      >
                        <Play size={12} fill="currentColor" />
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFromPlaylist(selectedPlaylist.id, t.id)}
                        className="p-1.5 text-white/30 hover:text-rose-400"
                        title="Remove from playlist"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}

                {selectedPlaylist.tracks.length === 0 && (
                  <div className="py-12 text-center text-white/40 text-sm">
                    This playlist is currently empty. Use the Search bar above to find and add tracks!
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Playlists Grid */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userPlaylists.map((pl) => (
                <div
                  key={pl.id}
                  onClick={() => setSelectedPlaylistId(pl.id)}
                  className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0d1115]/80 p-5 cursor-pointer transition-all hover:border-teal-400/40 hover:bg-[#121820]"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-12 place-items-center rounded-xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 text-teal-400 shadow">
                      <ListMusic size={22} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                        {pl.name}
                      </h4>
                      <p className="text-xs text-white/45">{pl.tracks.length} tracks</p>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-3 text-[0.7rem] text-white/40">
                    <span>Stored in Browser</span>
                    <span className="text-teal-400 font-medium">Open →</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          5. FAVORITES (LIKED SONGS) TAB
         ======================================================== */}
      {activeTab === 'favorites' && (
        <div className="space-y-6 animate-fade-in">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-3xl border border-rose-500/30 bg-gradient-to-r from-rose-950/40 via-neutral-900 to-black p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <div className="grid size-16 sm:size-20 place-items-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 text-white shadow-[0_0_30px_rgba(244,63,94,0.35)]">
                <Heart size={32} fill="white" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                  Personal Library
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Liked Songs</h2>
                <p className="text-xs text-white/50 mt-1 font-mono">
                  {likedSongs.length} songs • Cached in browser
                </p>
              </div>
            </div>

            {likedSongs.length > 0 && (
              <button
                type="button"
                onClick={() => handlePlayPlaylistAll(likedSongs)}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-2.5 text-xs font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
              >
                <Play size={14} fill="white" /> Play Favorites
              </button>
            )}
          </div>

          {/* Liked Songs List */}
          <div className="divide-y divide-white/5 rounded-2xl border border-white/10 bg-[#0c1014] p-2 sm:p-3">
            {likedSongs.map((track, index) => {
              const isCurrent = currentTrackId === track.id;

              return (
                <div
                  key={`liked-${track.id}`}
                  className={`group flex items-center justify-between gap-3 rounded-xl p-3 transition-colors hover:bg-white/10 ${
                    isCurrent ? 'bg-white/10 text-teal-300' : 'text-white/85'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span className="w-5 text-center font-mono text-xs text-white/40">
                      {index + 1}
                    </span>
                    <img
                      src={track.thumbnail}
                      alt=""
                      className="size-11 rounded-lg object-cover shadow"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-white group-hover:text-teal-300 transition-colors">
                        {track.title}
                      </p>
                      <p className="truncate text-xs text-white/45">{track.artist}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleLike(track)}
                      className="text-rose-500 hover:text-white transition-colors"
                      title="Unlike track"
                    >
                      <Heart size={16} fill="currentColor" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePlayTrack(track)}
                      className="grid size-8 place-items-center rounded-full bg-white/10 text-white group-hover:bg-teal-400 group-hover:text-black transition-all"
                    >
                      <Play size={14} fill="currentColor" />
                    </button>
                  </div>
                </div>
              );
            })}

            {likedSongs.length === 0 && (
              <div className="py-16 text-center">
                <Heart size={36} className="mx-auto text-white/20 mb-3" />
                <h3 className="text-base font-semibold text-white">No liked songs yet</h3>
                <p className="text-xs text-white/50 mt-1 max-w-sm mx-auto">
                  Click the heart icon on any song while listening to save it to your local favorites!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
