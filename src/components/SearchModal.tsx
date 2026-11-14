import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Play, Music, Sparkles, Loader2, PlayCircle } from 'lucide-react';
import { usePlayerStore } from '../store/playerStore';
import { THEMES } from '../data/worlds';
import { ARTISTS_CATALOG } from '../data/artistsData';
import { getLocalVibeTracks } from '../utils/vibeRecommender';
import { handleArtworkError } from '../utils/mediaHelpers';

export interface SearchResultItem {
  id: string;
  title: string;
  artist: string;
  duration?: string;
  thumbnail: string;
  source: 'youtube' | 'station';
}

interface SearchModalProps {
  onPlayCustomVideoId: (
    videoId: string,
    title?: string,
    artist?: string,
    thumbnail?: string,
    contextQueue?: Array<{ id: string; title: string; artist: string; thumbnail: string; duration?: string | number }>,
    queueStartIndex?: number,
    isVibeRadioMode?: boolean,
    initialDuration?: string | number
  ) => void;
  onPlaySearchQuery?: (query: string, title?: string, artist?: string, thumbnail?: string) => void;
}

const QUICK_TAGS = [
  'aaj kal tanha main kahan hoon',
  'Arijit Singh',
  'Diljit Dosanjh',
  'Kishore Kumar',
  'Taylor Swift',
  'Sidhu Moosewala',
  'Atif Aslam',
  '90s Bollywood',
  'Lo-Fi Hindi',
];

function extractYouTubeId(urlOrText: string): string | null {
  const trimmed = urlOrText.trim();
  const match = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/
  );
  if (match) return match[1];
  if (/^[\w-]{11}$/.test(trimmed) && !trimmed.includes(' ')) return trimmed;
  return null;
}

export default function SearchModal({ onPlayCustomVideoId }: SearchModalProps) {
  const { isSearchOpen, setSearchOpen, currentWorld } = usePlayerStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiOffline, setApiOffline] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const themeColor = currentWorld.themeColor || '#2dd4bf';

  // Auto focus input when opened & handle mobile / browser back button
  useEffect(() => {
    if (isSearchOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
        setSelectedIndex(0);
      }, 50);

      // Push #search to history so pressing back closes modal
      if (!window.location.hash.includes('search')) {
        window.history.pushState({ modal: 'search' }, '', '#search');
      }

      const handlePopState = () => {
        setSearchOpen(false);
      };

      window.addEventListener('popstate', handlePopState);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isSearchOpen, setSearchOpen]);

  const closeSearch = useCallback(() => {
    if (window.location.hash.includes('search')) {
      window.history.back();
    } else {
      setSearchOpen(false);
    }
  }, [setSearchOpen]);

  // Execute YouTube Live Search (supports song titles, movie names, and lyrics)
  const executeSearch = useCallback(async (searchQuery: string) => {
    const q = searchQuery.trim();
    if (!q) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setApiOffline(false);

    // 1. Direct YouTube link or ID check
    const directYtId = extractYouTubeId(q);
    if (directYtId) {
      setResults([
        {
          id: directYtId,
          title: `Direct YouTube Video (${directYtId})`,
          artist: 'YouTube',
          thumbnail: `https://img.youtube.com/vi/${directYtId}/mqdefault.jpg`,
          source: 'youtube',
        },
      ]);
      setIsLoading(false);
      return;
    }

    const fetchedResults: SearchResultItem[] = [];

    // 2. Fetch from our YouTube Search backend API
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.results) && data.results.length > 0) {
          for (const item of data.results) {
            fetchedResults.push({
              id: item.id,
              title: item.title,
              artist: item.artist,
              duration: item.duration,
              thumbnail: item.thumbnail || `https://img.youtube.com/vi/${item.id}/mqdefault.jpg`,
              source: 'youtube',
            });
          }
        }
      } else {
        setApiOffline(true);
      }
    } catch {
      setApiOffline(true);
    }

    // 3. Match from Live Top 25 Trending Indian Hits
    const lower = q.toLowerCase();
    usePlayerStore.getState().top25Tracks.forEach((track) => {
      if (
        track.title.toLowerCase().includes(lower) ||
        track.singers.toLowerCase().includes(lower) ||
        track.movie.toLowerCase().includes(lower)
      ) {
        if (!fetchedResults.some((fr) => fr.id === track.id)) {
          fetchedResults.unshift({
            id: track.id,
            title: track.title,
            artist: `${track.singers} • ${track.movie}`,
            duration: track.duration,
            thumbnail: track.thumbnail,
            source: 'station',
          });
        }
      }
    });

    // 4. Match from Popular Indian Artists top tracks
    ARTISTS_CATALOG.forEach((artist) => {
      if (artist.name.toLowerCase().includes(lower)) {
        artist.topTracks?.forEach((t) => {
          if (!fetchedResults.some((fr) => fr.id === t.id)) {
            fetchedResults.push({
              id: t.id,
              title: t.title,
              artist: `${artist.name} • ${t.album || 'Top Track'}`,
              duration: t.duration,
              thumbnail: `https://img.youtube.com/vi/${t.id}/mqdefault.jpg`,
              source: 'station',
            });
          }
        });
      }
    });

    // 5. Match from station tracks if any matching
    THEMES.forEach((theme) => {
      theme.tracks.forEach((t) => {
        if (
          t.title.toLowerCase().includes(lower) ||
          t.artist.toLowerCase().includes(lower)
        ) {
          if (!fetchedResults.some((fr) => fr.id === t.id)) {
            fetchedResults.unshift({
              id: t.id,
              title: t.title,
              artist: `${t.artist} • ${theme.nameHindi}`,
              thumbnail: `https://img.youtube.com/vi/${t.id}/mqdefault.jpg`,
              source: 'station',
            });
          }
        }
      });
    });

    setResults(fetchedResults);
    setSelectedIndex(0);
    setIsLoading(false);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    if (!val.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    debounceTimerRef.current = setTimeout(() => {
      executeSearch(val);
    }, 280);
  };

  const handleSelectTrack = useCallback(
    (item: SearchResultItem, _index?: number) => {
      if (!item.id) return;
      // Pre-populate instant same-vibe queue (0ms wait, zero duplicate versions of this song)
      const localVibe = getLocalVibeTracks(item.id, item.title, item.artist);
      const radioQueue = [
        {
          id: item.id,
          title: item.title,
          artist: item.artist,
          thumbnail: item.thumbnail,
          duration: item.duration,
        },
        ...localVibe,
      ];
      onPlayCustomVideoId(
        item.id,
        item.title,
        item.artist,
        item.thumbnail,
        radioQueue,
        0,
        true, // isVibeRadioMode
        item.duration // exact known duration
      );
      closeSearch();
    },
    [onPlayCustomVideoId, closeSearch]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      closeSearch();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(results.length - 1, prev + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(0, prev - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results.length > 0 && selectedIndex >= 0 && selectedIndex < results.length) {
        handleSelectTrack(results[selectedIndex], selectedIndex);
      } else if (query.trim()) {
        executeSearch(query.trim());
      }
    }
  };

  if (!isSearchOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={closeSearch}
        aria-hidden="true"
      />

      {/* Spotify & YouTube style Spotlight Search Dialog */}
      <div
        role="dialog"
        aria-label="YouTube Music & Lyrics Search"
        className="fixed inset-x-2.5 top-[max(0.75rem,env(safe-area-inset-top))] sm:top-14 z-50 mx-auto w-auto sm:w-[94vw] max-w-2xl sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 flex flex-col max-h-[calc(100dvh-1.5rem)] sm:max-h-[80dvh] overflow-hidden rounded-2xl border border-white/15 bg-[#0e1215]/98 shadow-[0_30px_90px_rgba(0,0,0,0.98)] backdrop-blur-2xl"
      >
        {/* Top Search Input Box */}
        <div className="flex items-center gap-2 sm:gap-3 border-b border-white/10 px-3 py-2.5 sm:px-5 sm:py-3.5">
          <Search size={18} className="shrink-0 text-white/50" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Search song, artist, or lyrics..."
            className="flex-1 bg-transparent font-sans text-[16px] sm:text-base text-white placeholder-white/40 outline-none"
          />
          {isLoading && (
            <Loader2 size={16} className="shrink-0 animate-spin text-teal-400" />
          )}
          {query && !isLoading && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setResults([]);
                inputRef.current?.focus();
              }}
              className="text-white/40 hover:text-white p-1"
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={closeSearch}
            aria-label="Close search"
            className="rounded-lg bg-white/10 px-2.5 py-1 text-xs font-medium text-white/70 hover:bg-white/20 hover:text-white shrink-0 active:scale-95 transition-all"
          >
            <span className="sm:hidden font-sans">Cancel</span>
            <span className="hidden sm:inline font-mono text-[0.65rem]">ESC</span>
          </button>
        </div>

        {/* Quick Discovery Tags (shown when query is empty) */}
        {!query && (
          <div className="p-4 sm:p-5 overflow-y-auto">
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white/50 mb-3">
              <Sparkles size={13} style={{ color: themeColor }} />
              <span>Try Searching By Lyrics or Song Name</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {QUICK_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setQuery(tag);
                    executeSearch(tag);
                  }}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition-all hover:border-white/30 hover:bg-white/15 hover:text-white active:scale-95"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        {query && (
          <div className="flex-1 min-h-0 overflow-y-auto p-1.5 sm:p-3 divide-y divide-white/5">
            {apiOffline && (
              <div className="mb-2 rounded-xl border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-[0.7rem] text-amber-200/90">
                Live search unreachable — showing cached library &amp; Top 25 matches.
              </div>
            )}
            {results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={() => handleSelectTrack(item, idx)}
                  className={`group flex items-center justify-between gap-2.5 sm:gap-3 rounded-xl p-2 sm:p-3 cursor-pointer transition-all ${
                    isSelected ? 'bg-white/15 text-white' : 'hover:bg-white/10 text-white/90'
                  }`}
                >
                  {/* Left: Thumbnail & Song Info */}
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <div className="relative size-10 sm:size-12 shrink-0 overflow-hidden rounded-lg bg-neutral-800 shadow aspect-square">
                      <img
                        src={item.thumbnail}
                        alt=""
                        loading="lazy"
                        className="size-full object-cover"
                        onError={handleArtworkError}
                      />
                      {/* Play overlay icon on hover */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Play size={16} fill="white" className="text-white" />
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs sm:text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                        {item.title}
                      </p>
                      <p className="truncate text-[0.68rem] sm:text-xs text-white/55 mt-0.5 flex items-center gap-1.5">
                        <PlayCircle size={11} className="text-red-400 shrink-0" />
                        <span className="truncate">{item.artist}</span>
                      </p>
                    </div>
                  </div>

                  {/* Right: Badge & Duration & Play button */}
                  <div className="flex items-center gap-2 shrink-0">
                    {item.duration && (
                      <span className="font-mono text-[0.65rem] sm:text-xs text-white/40 tabular-nums hidden xs:inline">
                        {item.duration}
                      </span>
                    )}
                    <button
                      type="button"
                      aria-label="Play song"
                      className="grid size-8 sm:size-9 place-items-center rounded-full bg-white/10 text-white group-hover:bg-amber-400 group-hover:text-black transition-colors"
                    >
                      <Play size={13} fill="currentColor" className="ml-0.5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {results.length === 0 && !isLoading && (
              <div className="py-10 text-center">
                <Music size={32} className="mx-auto text-white/20 mb-2" />
                <p className="text-sm text-white/60">
                  No matching songs found. Try different words or lyrics!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-2 text-[0.68rem] text-white/40 shrink-0">
          <div className="hidden sm:flex items-center gap-2">
            <span>Navigation:</span>
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">↑</kbd>
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">↓</kbd>
            <span>Play:</span>
            <kbd className="rounded bg-white/10 px-1.5 py-0.5 font-mono">Enter</kbd>
          </div>
          <span className="ml-auto sm:ml-0">YouTube Real-Time Search &amp; Playback</span>
        </div>
      </div>
    </>
  );
}
