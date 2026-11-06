import { useState } from 'react';
import {
  Play,
  Heart,
  Plus,
  Search,
  Home,
  Music2,
  Trash2,
  Sparkles,
  Globe,
  Radio,
} from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { ARTISTS_CATALOG, type Artist } from '../data/artistsData';
import type { StoredTrack } from '../utils/localStorageHelper';

interface SpotifyLayoutProps {
  onPlayCustomVideoId: (videoId: string, title?: string, artist?: string, thumbnail?: string) => void;
}

export default function SpotifyLayout({ onPlayCustomVideoId }: SpotifyLayoutProps) {
  const {
    likedSongs,
    toggleLike,
    userPlaylists,
    createPlaylist,
    deletePlaylist,
    removeFromPlaylist,
    toggleSearch,
    viewMode,
    toggleViewMode,
    currentTrackId,
    isPlaying,
    activeArtistId,
    setActiveArtistId,
    currentWorld,
  } = usePlayerStore();

  const [hoveredArtistId, setHoveredArtistId] = useState<string | null>(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [isCreatingPlaylist, setIsCreatingPlaylist] = useState(false);
  const [playlistNameInput, setPlaylistNameInput] = useState('');

  const selectedArtist = ARTISTS_CATALOG.find((a) => a.id === activeArtistId);
  const selectedPlaylist = userPlaylists.find((p) => p.id === selectedPlaylistId);

  const handlePlayArtist = (artist: Artist, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const first = artist.topTracks[0];
    if (first) {
      onPlayCustomVideoId(
        first.id,
        first.title,
        artist.name,
        `https://img.youtube.com/vi/${first.id}/mqdefault.jpg`
      );
    }
  };

  const handlePlayTrack = (track: StoredTrack) => {
    onPlayCustomVideoId(track.id, track.title, track.artist, track.thumbnail);
  };

  const handleCreatePlaylistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playlistNameInput.trim()) return;
    createPlaylist(playlistNameInput.trim());
    setPlaylistNameInput('');
    setIsCreatingPlaylist(false);
  };

  return (
    <div className="flex flex-1 overflow-hidden bg-black text-white select-none">
      {/* ========================================================
          1. LEFT SIDEBAR ("Your Library" - exactly like Spotify screenshot)
         ======================================================== */}
      <aside
        aria-label="Your Library"
        className="hidden md:flex w-72 lg:w-80 flex-col gap-2 p-2 shrink-0 select-none"
      >
        {/* Top Mini Pill (Home & Search Trigger) */}
        <div className="rounded-xl bg-[#121212] p-4 space-y-4">
          <button
            type="button"
            onClick={() => {
              setActiveArtistId(null);
              setSelectedPlaylistId(null);
            }}
            className="flex items-center gap-4 text-sm font-bold text-white hover:text-white transition-colors"
          >
            <Home size={22} className="text-white" />
            <span>Home</span>
          </button>
          <button
            type="button"
            onClick={toggleSearch}
            className="flex items-center gap-4 text-sm font-bold text-[#b3b3b3] hover:text-white transition-colors w-full text-left"
          >
            <Search size={22} />
            <span>Search</span>
          </button>
        </div>

        {/* Library Card Container */}
        <div className="flex flex-1 flex-col justify-between overflow-hidden rounded-xl bg-[#121212] p-3">
          <div className="space-y-4 overflow-y-auto pr-1">
            {/* Library Header */}
            <div className="flex items-center justify-between px-1">
              <button
                type="button"
                onClick={() => {
                  setActiveArtistId(null);
                  setSelectedPlaylistId(null);
                }}
                className="flex items-center gap-2 text-[#b3b3b3] hover:text-white transition-colors font-bold text-sm"
              >
                <Music2 size={20} />
                <span>Your Library</span>
              </button>
              <button
                type="button"
                onClick={() => setIsCreatingPlaylist(true)}
                className="grid size-8 place-items-center rounded-full text-[#b3b3b3] hover:bg-[#1f1f1f] hover:text-white transition-colors"
                title="Create playlist"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Create playlist prompt input */}
            {isCreatingPlaylist && (
              <form
                onSubmit={handleCreatePlaylistSubmit}
                className="rounded-xl bg-[#242424] p-3 space-y-2 border border-white/10"
              >
                <input
                  type="text"
                  autoFocus
                  value={playlistNameInput}
                  onChange={(e) => setPlaylistNameInput(e.target.value)}
                  placeholder="My Playlist #1"
                  className="w-full rounded-lg bg-[#181818] px-3 py-1.5 text-xs text-white placeholder-[#777] outline-none border border-white/10 focus:border-[#1ed760]"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingPlaylist(false)}
                    className="text-xs text-[#b3b3b3] hover:text-white px-2 py-1"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-white text-black px-3 py-1 text-xs font-bold hover:scale-105"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}

            {/* Liked Songs Entry */}
            <div
              onClick={() => {
                setSelectedPlaylistId('liked-songs');
                setActiveArtistId(null);
              }}
              className={`flex items-center gap-3 rounded-lg p-2 cursor-pointer transition-colors ${
                selectedPlaylistId === 'liked-songs' ? 'bg-[#282828]' : 'hover:bg-[#1a1a1a]'
              }`}
            >
              <div className="grid size-12 shrink-0 place-items-center rounded-md bg-gradient-to-br from-[#450af5] to-[#c4efd9] shadow">
                <Heart size={20} fill="white" className="text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">Liked Songs</p>
                <p className="text-xs text-[#b3b3b3]">
                  Playlist • {likedSongs.length} songs
                </p>
              </div>
            </div>

            {/* User Created Playlists */}
            {userPlaylists.map((pl) => (
              <div
                key={pl.id}
                onClick={() => {
                  setSelectedPlaylistId(pl.id);
                  setActiveArtistId(null);
                }}
                className={`group flex items-center justify-between rounded-lg p-2 cursor-pointer transition-colors ${
                  selectedPlaylistId === pl.id ? 'bg-[#282828]' : 'hover:bg-[#1a1a1a]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="grid size-12 shrink-0 place-items-center rounded-md bg-[#282828] text-[#b3b3b3] shadow">
                    <Music2 size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-white">{pl.name}</p>
                    <p className="text-xs text-[#b3b3b3]">
                      Playlist • {pl.tracks.length} tracks
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePlaylist(pl.id);
                    if (selectedPlaylistId === pl.id) setSelectedPlaylistId(null);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-1 text-[#b3b3b3] hover:text-rose-400 transition-opacity"
                  title="Delete playlist"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}

            {/* Spotify-style "Create your first playlist" banner */}
            {userPlaylists.length === 0 && (
              <div className="rounded-xl bg-[#242424] p-4 space-y-3">
                <p className="text-sm font-bold text-white leading-tight">
                  Create your first playlist
                </p>
                <p className="text-xs text-[#b3b3b3] leading-normal">
                  It&apos;s easy, we&apos;ll help you
                </p>
                <button
                  type="button"
                  onClick={() => setIsCreatingPlaylist(true)}
                  className="rounded-full bg-white px-4 py-1.5 text-xs font-bold text-black hover:scale-105 active:scale-95 transition-transform"
                >
                  Create playlist
                </button>
              </div>
            )}
          </div>

          {/* Sidebar Footer info */}
          <div className="pt-4 border-t border-white/5 space-y-3 text-[0.65rem] text-[#b3b3b3]">
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <span className="hover:underline cursor-pointer">Legal</span>
              <span className="hover:underline cursor-pointer">Safety & Privacy</span>
              <span className="hover:underline cursor-pointer">Cookies</span>
              <span className="hover:underline cursor-pointer">About Ads</span>
            </div>
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-full border border-white/20 px-3 py-1 font-semibold text-white hover:border-white transition-colors"
            >
              <Globe size={13} />
              <span>English</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================
          2. MAIN CONTENT AREA (Header + Popular Artists Grid)
         ======================================================== */}
      <main className="flex-1 flex flex-col overflow-hidden m-2 ml-0 rounded-xl bg-[#121212] relative">
        {/* Top Navbar Header (Spotify exact search + Vibe Mode switch) */}
        <header className="sticky top-0 z-20 flex items-center justify-between bg-[#121212]/95 px-4 py-3 backdrop-blur-md border-b border-white/5">
          {/* Home Icon + Search Pill in Center */}
          <div className="flex items-center gap-3 flex-1 max-w-xl">
            <button
              type="button"
              onClick={() => {
                setActiveArtistId(null);
                setSelectedPlaylistId(null);
              }}
              className="grid size-10 shrink-0 place-items-center rounded-full bg-[#1f1f1f] text-white hover:scale-105 transition-transform"
              title="Home"
            >
              <Home size={18} />
            </button>

            {/* Centered Spotify Search Pill */}
            <div
              onClick={toggleSearch}
              className="group flex flex-1 items-center gap-3 rounded-full bg-[#1f1f1f] px-4 py-2.5 cursor-pointer border border-transparent hover:border-white/20 transition-all shadow-inner"
            >
              <Search size={18} className="text-[#b3b3b3] group-hover:text-white transition-colors" />
              <span className="text-sm text-[#b3b3b3] font-sans truncate">
                What do you want to play? (Search songs or lyrics)
              </span>
              <kbd className="hidden sm:inline ml-auto rounded bg-white/10 px-1.5 py-0.5 text-[0.62rem] font-mono text-[#777]">
                /
              </kbd>
            </div>
          </div>

          {/* Right: The "✨ Vibe Mode" Toggle Button requested by user */}
          <div className="flex items-center gap-2 sm:gap-3 ml-3">
            <button
              type="button"
              onClick={toggleViewMode}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition-all shadow-lg active:scale-95 ${
                viewMode === 'vibe'
                  ? 'bg-amber-400 text-black shadow-amber-400/20'
                  : 'bg-white text-black hover:scale-105'
              }`}
              title="Switch to Ambient Barbershop / Cafe background mode"
            >
              <Sparkles size={14} className="text-black" />
              <span>{viewMode === 'vibe' ? 'Exit Vibe Mode' : '✨ Vibe Mode'}</span>
              <span className="hidden xl:inline text-[0.65rem] opacity-70">
                ({currentWorld.nameHindi})
              </span>
            </button>

            {/* Install / Logo badge */}
            <div className="hidden lg:flex size-9 items-center justify-center rounded-full bg-[#1f1f1f] text-[#1ed760] font-bold text-xs shadow">
              <Radio size={16} />
            </div>
          </div>
        </header>

        {/* Scrollable Content View */}
        <div className="flex-1 overflow-y-auto px-6 py-6 pb-32">
          {/* A. If viewing Liked Songs */}
          {selectedPlaylistId === 'liked-songs' && (
            <div className="space-y-6 animate-fade-in">
              <button
                type="button"
                onClick={() => setSelectedPlaylistId(null)}
                className="text-xs text-[#b3b3b3] hover:text-white"
              >
                ← Back
              </button>
              <div className="flex items-end gap-6 pb-6 border-b border-white/10">
                <div className="grid size-36 place-items-center rounded-xl bg-gradient-to-br from-[#450af5] to-[#c4efd9] shadow-2xl shrink-0">
                  <Heart size={56} fill="white" className="text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white">Playlist</p>
                  <h1 className="text-4xl sm:text-5xl font-black text-white mt-1">Liked Songs</h1>
                  <p className="text-xs text-[#b3b3b3] mt-2">
                    {likedSongs.length} songs • Cached in browser storage
                  </p>
                </div>
              </div>

              <div className="divide-y divide-white/5">
                {likedSongs.map((t, idx) => {
                  const isCurrent = currentTrackId === t.id;
                  return (
                    <div
                      key={`liked-${t.id}-${idx}`}
                      className={`group flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-white/10 ${
                        isCurrent ? 'bg-white/10 text-[#1ed760]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className="w-5 text-center font-mono text-xs text-[#b3b3b3]">
                          {isCurrent && isPlaying ? '▶' : idx + 1}
                        </span>
                        <img src={t.thumbnail} alt="" className="size-10 rounded object-cover shadow" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">{t.title}</p>
                          <p className="truncate text-xs text-[#b3b3b3]">{t.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => toggleLike(t)}
                          className="text-[#1ed760] hover:text-white"
                        >
                          <Heart size={16} fill="currentColor" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePlayTrack(t)}
                          className="grid size-8 place-items-center rounded-full bg-[#1ed760] text-black shadow hover:scale-105"
                        >
                          <Play size={14} fill="black" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {likedSongs.length === 0 && (
                  <div className="py-16 text-center text-[#b3b3b3] text-sm">
                    No liked songs yet! Click the heart icon while playing any song to save it here.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* B. If viewing a custom user playlist */}
          {selectedPlaylistId && selectedPlaylistId !== 'liked-songs' && selectedPlaylist && (
            <div className="space-y-6 animate-fade-in">
              <button
                type="button"
                onClick={() => setSelectedPlaylistId(null)}
                className="text-xs text-[#b3b3b3] hover:text-white"
              >
                ← Back
              </button>
              <div className="flex items-end gap-6 pb-6 border-b border-white/10">
                <div className="grid size-36 place-items-center rounded-xl bg-[#282828] text-white shadow-2xl shrink-0">
                  <Music2 size={56} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-white">Playlist</p>
                  <h1 className="text-4xl sm:text-5xl font-black text-white mt-1">{selectedPlaylist.name}</h1>
                  <p className="text-xs text-[#b3b3b3] mt-2">
                    {selectedPlaylist.tracks.length} tracks • Created in browser
                  </p>
                </div>
              </div>

              <div className="divide-y divide-white/5">
                {selectedPlaylist.tracks.map((t, idx) => {
                  const isCurrent = currentTrackId === t.id;
                  return (
                    <div
                      key={`pl-track-${t.id}-${idx}`}
                      className={`group flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-white/10 ${
                        isCurrent ? 'bg-white/10 text-[#1ed760]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className="w-5 text-center font-mono text-xs text-[#b3b3b3]">
                          {isCurrent && isPlaying ? '▶' : idx + 1}
                        </span>
                        <img src={t.thumbnail} alt="" className="size-10 rounded object-cover shadow" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">{t.title}</p>
                          <p className="truncate text-xs text-[#b3b3b3]">{t.artist}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => removeFromPlaylist(selectedPlaylist.id, t.id)}
                          className="text-[#b3b3b3] hover:text-rose-400 p-1"
                          title="Remove from playlist"
                        >
                          <Trash2 size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handlePlayTrack(t)}
                          className="grid size-8 place-items-center rounded-full bg-[#1ed760] text-black shadow hover:scale-105"
                        >
                          <Play size={14} fill="black" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {selectedPlaylist.tracks.length === 0 && (
                  <div className="py-16 text-center text-[#b3b3b3] text-sm">
                    This playlist is empty. Use Search to find any song and add it here!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* B. If viewing a specific Artist profile */}
          {activeArtistId && selectedArtist && (
            <div className="space-y-6 animate-fade-in">
              <button
                type="button"
                onClick={() => setActiveArtistId(null)}
                className="text-xs text-[#b3b3b3] hover:text-white"
              >
                ← Back to Popular Artists
              </button>

              <div className="flex items-end gap-6 pb-6 border-b border-white/10">
                <img
                  src={selectedArtist.avatar}
                  alt={selectedArtist.name}
                  className="size-36 sm:size-44 rounded-full object-cover shadow-2xl border-4 border-white/10 shrink-0"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#1ed760]">
                    Verified Artist
                  </p>
                  <h1 className="text-4xl sm:text-5xl font-black text-white mt-1">
                    {selectedArtist.name}
                  </h1>
                  <p className="text-sm text-[#b3b3b3] mt-2">{selectedArtist.tagline}</p>
                  <button
                    type="button"
                    onClick={() => handlePlayArtist(selectedArtist)}
                    className="mt-4 flex items-center gap-2 rounded-full bg-[#1ed760] px-6 py-2.5 text-xs font-bold text-black shadow-lg hover:scale-105 active:scale-95 transition-transform"
                  >
                    <Play size={16} fill="black" /> Play Top Hits
                  </button>
                </div>
              </div>

              {/* Artist Tracks */}
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white mb-3">Popular Releases</h3>
                {selectedArtist.topTracks.map((song, i) => (
                  <div
                    key={song.id}
                    className="group flex items-center justify-between p-3 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="w-5 text-center font-mono text-xs text-[#b3b3b3]">
                        {i + 1}
                      </span>
                      <img
                        src={`https://img.youtube.com/vi/${song.id}/mqdefault.jpg`}
                        alt=""
                        className="size-10 rounded object-cover shadow"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-white">{song.title}</p>
                        <p className="truncate text-xs text-[#b3b3b3]">
                          {selectedArtist.name} {song.album ? `• ${song.album}` : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {song.duration && (
                        <span className="font-mono text-xs text-[#b3b3b3]">{song.duration}</span>
                      )}
                      <button
                        type="button"
                        onClick={() =>
                          onPlayCustomVideoId(
                            song.id,
                            song.title,
                            selectedArtist.name,
                            `https://img.youtube.com/vi/${song.id}/mqdefault.jpg`
                          )
                        }
                        className="grid size-8 place-items-center rounded-full bg-[#1ed760] text-black shadow hover:scale-105"
                      >
                        <Play size={14} fill="black" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* C. DEFAULT: THE EXACT "POPULAR ARTISTS" GRID FROM THE USER'S SCREENSHOT */}
          {!activeArtistId && !selectedPlaylistId && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white tracking-tight">
                  Popular artists
                </h2>
                <button
                  type="button"
                  onClick={toggleSearch}
                  className="text-xs font-bold text-[#b3b3b3] hover:underline"
                >
                  Show all
                </button>
              </div>

              {/* Exact Spotify 2-Row Circular Avatar Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-3">
                {ARTISTS_CATALOG.map((artist) => {
                  const isHovered = hoveredArtistId === artist.id;

                  return (
                    <div
                      key={artist.id}
                      onClick={() => setActiveArtistId(artist.id)}
                      onMouseEnter={() => setHoveredArtistId(artist.id)}
                      onMouseLeave={() => setHoveredArtistId(null)}
                      className="group relative flex flex-col rounded-lg p-3 cursor-pointer transition-colors hover:bg-[#181818]"
                    >
                      {/* Circular Avatar Container with Spotify Hover Green Play Button */}
                      <div className="relative aspect-square w-full overflow-hidden rounded-full shadow-lg">
                        <img
                          src={artist.avatar}
                          alt={artist.name}
                          className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Floating Green Circular Play Button on bottom-right (Exact Spotify UI) */}
                        <button
                          type="button"
                          onClick={(e) => handlePlayArtist(artist, e)}
                          aria-label={`Play ${artist.name}`}
                          className={`absolute bottom-1 right-1 grid size-10 place-items-center rounded-full bg-[#1ed760] text-black shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-all duration-200 hover:scale-110 active:scale-95 ${
                            isHovered
                              ? 'opacity-100 translate-y-0'
                              : 'opacity-0 translate-y-2 pointer-events-none'
                          }`}
                        >
                          <Play size={18} fill="black" className="ml-0.5" />
                        </button>
                      </div>

                      {/* Artist Title & Type */}
                      <div className="mt-3">
                        <p className="truncate text-sm font-bold text-white leading-snug">
                          {artist.name}
                        </p>
                        <p className="mt-0.5 text-xs text-[#b3b3b3]">Artist</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
