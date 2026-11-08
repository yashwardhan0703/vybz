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

function AppLayout() {
  const { currentWorld, isPlaying, viewMode, setViewMode } = usePlayerStore();
  const playerContainerRef = useRef<HTMLDivElement | null>(null);
  const { play, pause, next, prev, seekTo, playAt, playCustomVideoId, playSearchQuery } =
    useYouTube(playerContainerRef);

  // Sync Vibe / Studio mode with browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      const currentMode = usePlayerStore.getState().viewMode;
      if (hash === '#vibe' && currentMode !== 'vibe') {
        setViewMode('vibe');
      } else if (!hash.includes('vibe') && currentMode === 'vibe') {
        setViewMode('studio');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [setViewMode]);

  return (
    <div
      data-world-id={currentWorld.id}
      className="relative flex h-[100dvh] w-full flex-col overflow-hidden select-none bg-black text-white"
      style={{
        '--world-primary': currentWorld.themeColor || '#f59e0b',
      } as React.CSSProperties}
    >
      {/* ========================================================
          MODE 1: UNIQUE INDIAN MUSIC PLAYER (Top 25 + Popular Artists)
         ======================================================== */}
      {viewMode === 'studio' && (
        <UniqueIndianPlayer
          key="view-studio"
          onPlayCustomVideoId={playCustomVideoId}
          onPlayAt={playAt}
          onPlay={play}
          onPause={pause}
        />
      )}

      {/* ========================================================
          MODE 2: RETRO AMBIENT VIBE VIEW (Chai Tapri / Salon / Bartan Time)
         ======================================================== */}
      {viewMode === 'vibe' && (
        <div key="view-vibe" className="relative flex flex-1 flex-col overflow-hidden animate-fade-in">
          {/* 1. Cinematic Background Image */}
          <WorldBackground />

          {/* 2. Top Header Navigation */}
          <Header />

          {/* 3. Main Center Hero & Right Chalkboard */}
          <main className="relative flex flex-1 flex-col items-center justify-center px-4 pb-28 pt-4">
            {/* Center Title, Subtitle, Dialogue Pill & Sub-quote */}
            <CenterHero />

            {/* Right Wall: Hanging "Today's Playlist" Chalkboard */}
            <TodayPlaylistBoard onPlayAt={playAt} />
          </main>
        </div>
      )}

      {/* ========================================================
          PERSISTENT ACROSS BOTH MODES (Music never stops)
         ======================================================== */}

      {/* Bottom Floating Music Player with Like/Favorite Button */}
      <BottomPlayer
        onPlay={play}
        onPause={pause}
        onNext={next}
        onPrev={prev}
        onSeek={seekTo}
      />

      {/* Modals & Overlays */}
      <PlaylistsModal />
      <TrackList onPlayAt={playAt} />
      <SearchModal
        onPlayCustomVideoId={playCustomVideoId}
        onPlaySearchQuery={playSearchQuery}
      />
      <RadioTuningOverlay />

      {/* Persistent YouTube mount with >= 200px dimensions placed behind UI (-z-50) for Android MediaSession compatibility */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 right-0 -z-50 h-[240px] w-[240px] opacity-[0.001] overflow-hidden"
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
