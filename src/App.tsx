import { Component, useEffect, useRef, type ReactNode } from 'react';
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
import UpdateNotification from './components/UpdateNotification';

function AppLayout() {
  const { currentWorld, isPlaying, viewMode, setViewMode } = usePlayerStore();
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
  } = useYouTube(playerContainerRef);

  // Sync Vibe / Studio mode with browser back/forward buttons without breaking modal hashes
  useEffect(() => {
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

  return (
    <div
      data-world-id={currentWorld.id}
      className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#070a10] text-white"
      style={{
        '--world-primary': currentWorld.themeColor || '#f59e0b',
      } as React.CSSProperties}
    >
      {/* ========================================================
          PRIMARY CONTENT AREA (Never overlapped by player)
         ======================================================== */}
      <div className="relative flex flex-1 min-h-0 flex-col overflow-hidden">
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
      <BottomPlayer
        onPlay={play}
        onPause={pause}
        onNext={next}
        onPrev={prev}
        onSeek={seekTo}
      />

      {viewMode === 'studio' && <MobileBottomNav />}

      {/* Modals & Expandable Full-Screen Now Playing Sheet */}
      <NowPlayingSheet
        onPlay={play}
        onPause={pause}
        onNext={next}
        onPrev={prev}
        onSeek={seekTo}
        onPlayQueueIndex={playFromQueueIndex}
      />
      <PlaylistsModal />
      <TrackList onPlayAt={playFromQueueIndex} />
      <SearchModal
        onPlayCustomVideoId={playCustomVideoId}
        onPlaySearchQuery={playSearchQuery}
      />
      <RadioTuningOverlay />
      <UpdateNotification />

      {/* Persistent YouTube mount with full opacity placed behind UI (-z-50) for Android MediaSession compatibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 right-0 -z-50 h-[240px] w-[240px] opacity-100 overflow-hidden"
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
