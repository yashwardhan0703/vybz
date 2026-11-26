import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import { useShallow } from 'zustand/react/shallow';
import { useYouTube } from './hooks/useYouTube';
import { usePlayerStore } from './store/playerStore';
import WorldBackground from './components/WorldBackground';
import Header from './components/Header';
import CenterHero from './components/CenterHero';
import TodayPlaylistBoard from './components/TodayPlaylistBoard';
import BottomPlayer from './components/BottomPlayer';
import PlaylistsModal from './components/PlaylistsModal';
import TrackList from './components/TrackList';
import SearchModal from './components/SearchModal';
import UniqueIndianPlayer from './components/UniqueIndianPlayer';
import RadioTuningOverlay from './components/RadioTuningOverlay';
import MobileBottomNav from './components/MobileBottomNav';
import NowPlayingSheet from './components/NowPlayingSheet';
import ShareModal from './components/ShareModal';
import SharedPlaylistModal from './components/SharedPlaylistModal';
import UpdateNotification from './components/UpdateNotification';
import VersionManager from './components/VersionManager';
import { decodeSharedPlaylist } from './utils/mediaHelpers';
import type { StoredTrack } from './utils/localStorageHelper';

function AppLayout() {
  const { currentWorld, isPlaying, viewMode, setViewMode, shareModal, closeShareModal } = usePlayerStore(
    useShallow((s) => ({
      currentWorld: s.currentWorld,
      isPlaying: s.isPlaying,
      viewMode: s.viewMode,
      setViewMode: s.setViewMode,
      shareModal: s.shareModal,
      closeShareModal: s.closeShareModal,
    }))
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [sharedPlaylistData, setSharedPlaylistData] = useState<{
    name: string;
    tracks: StoredTrack[];
  } | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Detect shared playlist from URL (?playlist=... or ?sp=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const encoded = searchParams.get('playlist') || searchParams.get('sp') || searchParams.get('shared_playlist');
      if (encoded) {
        const decoded = decodeSharedPlaylist(encoded);
        if (decoded && decoded.tracks.length > 0) {
          setSharedPlaylistData(decoded);
        }
        // Clean up URL parameter cleanly
        const cleanUrl = window.location.pathname + window.location.hash;
        window.history.replaceState({}, '', cleanUrl || '/');
      }
    } catch (e) {
      console.warn('[App] Failed to parse shared playlist URL:', e);
    }
  }, []);
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const {
    play,
    pause,
    next,
    prev,
    seekTo,
    playAt,
    playFromQueueIndex,
    playCustomVideoId,
    playSearchQuery,
    loadMoreQueueTracks,
  } = useYouTube(playerContainerRef);

  // Auto-heal single-page app chunk mismatches across updates without user having to clear cache
  useEffect(() => {
    const handleChunkError = (e: ErrorEvent | PromiseRejectionEvent) => {
      const msg = 'message' in e ? e.message : ((e as PromiseRejectionEvent).reason?.message || String((e as PromiseRejectionEvent).reason || ''));
      if (/Failed to fetch dynamically imported module|ChunkLoadError|Loading chunk/i.test(msg)) {
        if (!sessionStorage.getItem('chunk_heal_retry')) {
          sessionStorage.setItem('chunk_heal_retry', '1');
          window.location.reload();
        }
      }
    };
    window.addEventListener('error', handleChunkError);
    window.addEventListener('unhandledrejection', handleChunkError);
    return () => {
      window.removeEventListener('error', handleChunkError);
      window.removeEventListener('unhandledrejection', handleChunkError);
    };
  }, []);

  // Sync Vibe / Studio mode with browser back/forward buttons without breaking modal hashes
  useEffect(() => {
    // Initial mount check: unless URL hash explicitly requests #vibe, always default to Home (studio)
    if (typeof window !== 'undefined') {
      const initialHash = window.location.hash;
      if (initialHash !== '#vibe' && usePlayerStore.getState().viewMode === 'vibe') {
        setViewMode('studio');
      }
    }

    const handlePopState = () => {
      const hash = window.location.hash;
      const currentMode = usePlayerStore.getState().viewMode;
      const isModalHash =
        hash.includes('search') ||
        hash.includes('queue') ||
        hash.includes('themes') ||
        hash.includes('now-playing');

      if (hash === '#vibe' && currentMode !== 'vibe') {
        setViewMode('vibe');
      } else if (!hash.includes('vibe') && !isModalHash && currentMode === 'vibe') {
        setViewMode('studio');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setViewMode]);

  const isStudio = viewMode === 'studio';

  return (
    <div
      data-world-id={currentWorld.id}
      className={
        isStudio
          ? 'relative flex min-h-[100dvh] w-full flex-col bg-[#070a10] text-white'
          : 'relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#070a10] text-white'
      }
      style={{
        '--world-primary': currentWorld.themeColor || '#f59e0b',
      } as React.CSSProperties}
    >
      {/* ========================================================
          PRIMARY CONTENT AREA (Never overlapped by player)
         ======================================================== */}
      <div
        className={
          isStudio
            ? 'relative flex flex-1 min-w-0 flex-col'
            : 'relative flex flex-1 min-h-0 flex-col overflow-hidden'
        }
      >
        {viewMode === 'studio' && (
          <UniqueIndianPlayer
            key="view-studio"
            onPlayCustomVideoId={playCustomVideoId}
            onPlayAt={playAt}
            onPlay={play}
            onPause={pause}
          />
        )}

        {viewMode === 'vibe' && (
          <div key="view-vibe" className="relative flex flex-1 min-h-0 flex-col overflow-hidden animate-fade-in">
            {/* 1. Cinematic Background Image */}
            <WorldBackground />

            {/* 2. Top Header Navigation */}
            <Header />

            {/* 3. Main Center Hero & Right Chalkboard */}
            <main className="relative flex-1 min-h-0 overflow-y-auto flex flex-col items-center justify-center px-4 py-6">
              <CenterHero />
              <TodayPlaylistBoard onPlayAt={playAt} />
            </main>
          </div>
        )}
      </div>

      {/* ========================================================
          DOCKED PERSISTENT PLAYER + MOBILE NAVIGATION
         ======================================================== */}
      <div className={isStudio ? 'fixed bottom-0 inset-x-0 z-40 flex flex-col' : 'relative z-40 shrink-0 flex flex-col'}>
        <BottomPlayer
          onPlay={play}
          onPause={pause}
          onNext={next}
          onPrev={prev}
          onSeek={seekTo}
        />

        {isStudio && <MobileBottomNav />}
      </div>

      {/* Modals & Expandable Full-Screen Now Playing Sheet */}
      <NowPlayingSheet
        onPlay={play}
        onPause={pause}
        onNext={next}
        onPrev={prev}
        onSeek={seekTo}
        onPlayQueueIndex={playFromQueueIndex}
        onLoadMoreQueue={loadMoreQueueTracks}
      />
      <PlaylistsModal />
      <TrackList onPlayAt={playFromQueueIndex} />
      <SearchModal
        onPlayCustomVideoId={playCustomVideoId}
        onPlaySearchQuery={playSearchQuery}
      />
      <RadioTuningOverlay />
      <ShareModal
        isOpen={shareModal.isOpen}
        onClose={closeShareModal}
        title={shareModal.title}
        artist={shareModal.artist}
        artworkUrl={shareModal.artworkUrl}
        vibeName={shareModal.vibeName}
        customUrl={shareModal.customUrl}
        isPlaylist={shareModal.isPlaylist}
        isAppShare={shareModal.isAppShare}
        onToast={showToast}
      />
      <SharedPlaylistModal
        isOpen={Boolean(sharedPlaylistData)}
        onClose={() => setSharedPlaylistData(null)}
        playlistName={sharedPlaylistData?.name || 'Shared Playlist'}
        tracks={sharedPlaylistData?.tracks || []}
        onPlayAll={() => {
          if (!sharedPlaylistData || sharedPlaylistData.tracks.length === 0) return;
          const first = sharedPlaylistData.tracks[0];
          const plQueue = sharedPlaylistData.tracks.map((t) => ({
            id: t.id,
            title: t.title,
            artist: t.artist,
            thumbnail: t.thumbnail,
          }));
          playCustomVideoId(first.id, first.title, first.artist, first.thumbnail, plQueue, 0, false);
          showToast(`Playing "${sharedPlaylistData.name}"! 🎶`);
          setSharedPlaylistData(null);
        }}
        onSaveToLibrary={() => {
          if (!sharedPlaylistData || sharedPlaylistData.tracks.length === 0) return;
          usePlayerStore.getState().saveImportedPlaylist(sharedPlaylistData.name, sharedPlaylistData.tracks);
          showToast(`Saved "${sharedPlaylistData.name}" to My Playlists! 🎵`);
          setSharedPlaylistData(null);
        }}
      />
      <UpdateNotification />
      <VersionManager />

      {/* Floating Share / Action Toast */}
      {toastMessage && (
        <aside
          aria-live="polite"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[10001] flex items-center gap-2 rounded-full border border-amber-400/40 bg-[#0d131f]/95 px-4 py-2 text-xs font-semibold text-amber-300 shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md animate-fade-in pointer-events-none"
        >
          <Sparkles size={14} className="text-amber-400 animate-pulse" />
          <span>{toastMessage}</span>
        </aside>
      )}

      {/* Persistent YouTube mount placed in active viewport layer for continuous background auto-play */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-1 right-1 z-0 size-1 opacity-[0.002] overflow-hidden"
      >
        <div ref={playerContainerRef} className="size-full" />
      </div>

      {/* Screen Reader live status */}
      <p aria-live="polite" className="sr-only">
        {isPlaying ? `Now playing: ${currentWorld.nameHindi} - ${currentWorld.name}` : `Paused`}
      </p>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error('App Crash intercepted by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-[100dvh] w-full flex-col items-center justify-center bg-[#070a10] px-6 text-center text-white">
          <div className="rounded-3xl border border-amber-500/30 bg-[#0e1420] p-8 shadow-2xl max-w-md">
            <span className="text-3xl">☕</span>
            <h2 className="mt-3 text-xl font-bold text-white">Chai Thandi Ho Gayi!</h2>
            <p className="mt-2 text-xs text-white/60">
              An unexpected render glitch occurred. Click below to reload cleanly.
            </p>
            {this.state.error && (
              <pre className="mt-3 max-h-40 overflow-auto rounded bg-red-950/60 p-2 text-left font-mono text-[0.65rem] text-red-300">
                {this.state.error.message}
                {'\n'}
                {this.state.error.stack}
              </pre>
            )}
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="mt-5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-6 py-2.5 text-xs font-bold text-black shadow hover:scale-105 active:scale-95 transition-transform"
            >
              Reload Player
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppLayout />
    </ErrorBoundary>
  );
}
