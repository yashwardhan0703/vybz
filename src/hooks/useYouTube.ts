/// <reference types="youtube" />
import { useEffect, useRef, useCallback } from 'react';
import { usePlayerStore } from '../store/playerStore';
import { TOP_25_TRENDING_INDIAN } from '../data/trendingSongs';
import { fetchRelatedVibeQueue, getLocalVibeTracks } from '../utils/vibeRecommender';

export interface QueueTrack {
  id: string;
  title: string;
  artist: string;
  thumbnail: string;
  duration?: string | number;
}

export function parseDurationToSeconds(d?: string | number): number {
  if (d === undefined || d === null) return 0;
  if (typeof d === 'number') return isFinite(d) && d > 0 ? d : 0;
  if (typeof d !== 'string') return 0;
  const cleaned = d.trim();
  if (!cleaned) return 0;
  const parts = cleaned.split(':').map((p) => Number(p));
  if (parts.some((n) => isNaN(n))) return 0;
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  if (parts.length === 1) {
    return parts[0];
  }
  return 0;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
  }
}

let apiLoaded = false;
let apiLoading = false;

function loadYouTubeAPI(): Promise<void> {
  if (typeof window !== 'undefined' && window.YT && window.YT.Player) {
    apiLoaded = true;
    return Promise.resolve();
  }
  if (apiLoaded) return Promise.resolve();
  if (apiLoading) {
    return new Promise((res) => {
      const orig = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        orig?.();
        apiLoaded = true;
        res();
      };
    });
  }
  apiLoading = true;
  return new Promise((res) => {
    window.onYouTubeIframeAPIReady = () => {
      apiLoaded = true;
      apiLoading = false;
      res();
    };
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  });
}

export function useYouTube(mountId: string) {
  const playerRef = useRef<YT.Player | null>(null);
  const isReadyRef = useRef(false);
  const intervalRef = useRef<number | null>(null);
  const activeCustomTrackRef = useRef<{
    videoId: string;
    title: string;
    artist: string;
    thumbnail: string;
    duration?: string | number;
  } | null>(null);
  const queueRef = useRef<QueueTrack[]>([]);
  const queueIndexRef = useRef<number>(-1);
  const isVibeRadioModeRef = useRef<boolean>(false);
  const playNextTrackRef = useRef<() => void>(() => {});
  const currentWorldRef = useRef(usePlayerStore.getState().currentWorld);
  const repeatModeRef = useRef(usePlayerStore.getState().repeatMode);
  const isShuffleRef = useRef(usePlayerStore.getState().isShuffle);
  const volumeRef = useRef(usePlayerStore.getState().volume);
  const isMutedRef = useRef(usePlayerStore.getState().isMuted);

  const {
    currentWorld,
    isShuffle,
    repeatMode,
    volume,
    isMuted,
    isPlaying,
    setIsPlaying,
    setIsLoading,
    setCurrentTime,
    setDuration,
    setTrackInfo,
  } = usePlayerStore();

  currentWorldRef.current = currentWorld;
  repeatModeRef.current = repeatMode;
  isShuffleRef.current = isShuffle;
  volumeRef.current = volume;
  isMutedRef.current = isMuted;

  // Reads track info from YouTube player and syncs Zustand store
  const updateTrackMeta = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;

    try {
      // 1. If playing a searched or custom selected track, keep its identity intact!
      if (activeCustomTrackRef.current) {
        const custom = activeCustomTrackRef.current;
        let videoId = custom.videoId;
        let title = custom.title;
        let artist = custom.artist;

        try {
          const data = player.getVideoData?.() as { title?: string; author?: string; video_id?: string } | undefined;
          if (data?.title && (!title || title === 'Playing Song')) {
            title = data.title.trim();
          }
          if (data?.author && (!artist || artist === 'YouTube Music')) {
            artist = data.author.trim();
          }
          if (data?.video_id) {
            videoId = data.video_id;
          }
        } catch {}

        const thumbnail = custom.thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : '');
        setTrackInfo(0, 1, title, artist, thumbnail, videoId);
        return;
      }

      // 2. Otherwise playing an ambient world station playlist
      const world = currentWorldRef.current;
      const index = typeof player.getPlaylistIndex === 'function' ? player.getPlaylistIndex() : 0;
      const playlist = typeof player.getPlaylist === 'function' ? player.getPlaylist() : [];
      const safeIndex = Math.max(0, index >= 0 ? index : 0);
      const fallbackTrack = world.tracks?.[safeIndex] || world.tracks?.[0];

      let rawTitle = '';
      let rawArtist = '';
      let videoId = fallbackTrack?.id || '';

      try {
        const data = player.getVideoData?.() as { title?: string; author?: string; video_id?: string } | undefined;
        if (data?.title) rawTitle = data.title.trim();
        if (data?.author) rawArtist = data.author.trim();
        if (data?.video_id) videoId = data.video_id;
      } catch {}

      const totalTracks = Array.isArray(playlist) && playlist.length > 0 ? playlist.length : world.tracks?.length || 1;
      const title = rawTitle && rawTitle !== '' ? rawTitle : fallbackTrack?.title || world.nameHindi;
      const artist = rawArtist && rawArtist !== '' ? `${rawArtist} • ${safeIndex + 1}/${totalTracks}` : fallbackTrack?.artist || world.name;
      const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` : world.bg;

      setTrackInfo(safeIndex, totalTracks, title, artist, thumbnail, videoId);
    } catch {}
  }, [setTrackInfo]);

  // Syncs exact time & duration from YouTube player
  const syncPlayerTimes = useCallback(() => {
    const player = playerRef.current;
    if (!player) return;
    try {
      const cur = player.getCurrentTime?.() ?? 0;
      const dur = player.getDuration?.() ?? 0;
      if (typeof cur === 'number' && isFinite(cur) && cur >= 0) {
        setCurrentTime(cur);
      }
      if (typeof dur === 'number' && isFinite(dur) && dur > 0) {
        setDuration(dur);
      }
    } catch {}
  }, [setCurrentTime, setDuration]);

  // Periodic progress tracker (250ms for smooth progress bar and instant accurate duration)
  const startProgressInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    syncPlayerTimes();
    intervalRef.current = window.setInterval(syncPlayerTimes, 250);
  }, [syncPlayerTimes]);

  const stopProgressInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Initialize YT Player once
  useEffect(() => {
    let isCancelled = false;

    loadYouTubeAPI().then(() => {
      if (isCancelled) return;
      const mountElement = document.getElementById(mountId);
      if (!mountElement) return;

      const world = currentWorldRef.current;
      const trackIds = world.tracks?.map((t) => t.id) ?? [];
      const firstVideoId = trackIds[0] || 'P1fIdFRnfqw';

      const playerOptions: YT.PlayerOptions = {
        width: '100%',
        height: '100%',
        videoId: firstVideoId,
        host: 'https://www.youtube.com',
        playerVars: {
          autoplay: 0 as YT.AutoPlay,
          playsinline: 1 as YT.PlaysInline,
          rel: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          enablejsapi: 1,
        },
        events: {
          onReady: (e) => {
            if (isCancelled) return;
            playerRef.current = e.target;
            isReadyRef.current = true;

            try {
              e.target.setVolume(volumeRef.current);
              if (isMutedRef.current) {
                e.target.mute();
              } else {
                e.target.unMute();
              }
              if (isShuffleRef.current) {
                e.target.setShuffle(true);
              }

              // Cue entire station's playlist
              if (trackIds.length > 0) {
                e.target.cuePlaylist(trackIds, 0, 0);
              }
            } catch {}

            setTimeout(updateTrackMeta, 400);
          },
          onStateChange: (e: YT.OnStateChangeEvent) => {
            const state = e.data;
            syncPlayerTimes();
            if (state === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              setIsLoading(false);
              startProgressInterval();
              updateTrackMeta();
              syncPlayerTimes();
            } else if (state === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
              setIsLoading(false);
              syncPlayerTimes();
              stopProgressInterval();
            } else if (state === window.YT.PlayerState.BUFFERING) {
              setIsLoading(true);
              syncPlayerTimes();
            } else if (state === window.YT.PlayerState.ENDED) {
              syncPlayerTimes();
              // Automatically seamlessly advance to the next track in queue or autoplay recommendations!
              playNextTrackRef.current();
            }
          },
          onError: () => {
            const failedTrack = activeCustomTrackRef.current;
            if (failedTrack && failedTrack.title && failedTrack.title.trim()) {
              const q = `${failedTrack.title} ${failedTrack.artist || ''} official audio`;
              fetch(`/api/search?q=${encodeURIComponent(q)}`)
                .then((r) => (r.ok ? r.json() : null))
                .then((data) => {
                  const best = data?.results?.[0];
                  if (best && best.id && best.id !== failedTrack.videoId && playerRef.current) {
                    failedTrack.videoId = best.id;
                    if (best.thumbnail) failedTrack.thumbnail = best.thumbnail;
                    playerRef.current.loadVideoById(best.id);
                    return;
                  }
                  playNextTrackRef.current();
                })
                .catch(() => {
                  playNextTrackRef.current();
                });
            } else {
              playNextTrackRef.current();
            }
          },
        },
      };

      new window.YT.Player(mountId, playerOptions);
    });

    return () => {
      isCancelled = true;
      stopProgressInterval();
      try {
        playerRef.current?.destroy();
      } catch {}
      playerRef.current = null;
      isReadyRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mountId]);

  // When current station / world changes
  const prevWorldIdRef = useRef(currentWorld.id);
  useEffect(() => {
    if (prevWorldIdRef.current !== currentWorld.id) {
      prevWorldIdRef.current = currentWorld.id;
      activeCustomTrackRef.current = null;
      const p = playerRef.current;
      if (!p || !isReadyRef.current) return;

      const trackIds = currentWorld.tracks?.map((t) => t.id) ?? [];
      if (trackIds.length === 0) return;

      try {
        if (isPlaying) {
          setIsLoading(true);
          p.loadPlaylist(trackIds, 0, 0);
        } else {
          p.cuePlaylist(trackIds, 0, 0);
        }
        setTimeout(updateTrackMeta, 500);
      } catch {}
    }
  }, [currentWorld, isPlaying, setIsLoading, updateTrackMeta]);

  // Sync volume & mute
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    try {
      if (isMuted) {
        p.mute();
      } else {
        p.unMute();
      }
      p.setVolume(volume);
    } catch {}
  }, [volume, isMuted]);

  // Sync shuffle
  useEffect(() => {
    const p = playerRef.current;
    if (!p) return;
    try {
      p.setShuffle(isShuffle);
    } catch {}
  }, [isShuffle]);

  // User Play Action (Direct user click handler -> browser autoplay policy satisfied!)
  const play = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;

    try {
      setIsLoading(true);
      p.playVideo();
    } catch {
      if (activeCustomTrackRef.current?.videoId) {
        try {
          p.loadVideoById({
            videoId: activeCustomTrackRef.current.videoId,
            startSeconds: 0,
          });
          p.playVideo();
        } catch {}
      } else {
        const trackIds = currentWorldRef.current.tracks?.map((t) => t.id) ?? [];
        try {
          p.loadPlaylist(trackIds, 0, 0);
        } catch {}
      }
    }
  }, [setIsLoading]);

  const pause = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    try {
      p.pauseVideo();
      setIsPlaying(false);
    } catch {}
  }, [setIsPlaying]);

  const seekTo = useCallback(
    (sec: number) => {
      const p = playerRef.current;
      if (!p) return;
      try {
        setCurrentTime(sec);
        p.seekTo(sec, true);
      } catch {}
    },
    [setCurrentTime]
  );

  const playAt = useCallback(
    (index: number) => {
      const p = playerRef.current;
      if (!p) return;
      try {
        setIsLoading(true);
        setCurrentTime(0);
        activeCustomTrackRef.current = null;
        queueRef.current = [];
        queueIndexRef.current = -1;
        const trackIds = currentWorldRef.current.tracks?.map((t) => t.id) ?? [];
        p.loadPlaylist(trackIds, index, 0);
        setTimeout(updateTrackMeta, 600);
      } catch {}
    },
    [setIsLoading, setCurrentTime, updateTrackMeta]
  );

  const playCustomVideoId = useCallback(
    (
      videoId: string,
      title?: string,
      artist?: string,
      thumbnail?: string,
      contextQueue?: QueueTrack[],
      queueStartIndex?: number,
      isVibeRadioMode?: boolean,
      initialDuration?: string | number
    ) => {
      const p = playerRef.current;
      if (!p) return;
      try {
        setIsLoading(true);
        setCurrentTime(0);

        const resolvedTitle = title || 'Playing Song';
        const resolvedArtist = artist || 'YouTube Music';
        const resolvedThumb = thumbnail || `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;

        // Immediately set the exact duration if known
        const knownDur =
          initialDuration ||
          contextQueue?.find((q) => q.id === videoId)?.duration ||
          TOP_25_TRENDING_INDIAN.find((t) => t.id === videoId)?.duration;
        const initSec = parseDurationToSeconds(knownDur);
        if (initSec > 0) {
          setDuration(initSec);
        }

        activeCustomTrackRef.current = {
          videoId,
          title: resolvedTitle,
          artist: resolvedArtist,
          thumbnail: resolvedThumb,
          duration: initSec > 0 ? initSec : undefined,
        };

        if (isVibeRadioMode !== undefined) {
          isVibeRadioModeRef.current = isVibeRadioMode;
        } else if (contextQueue && contextQueue.length > 0) {
          isVibeRadioModeRef.current = false;
        } else {
          isVibeRadioModeRef.current = true;
        }

        // Populate context queue initially
        if (contextQueue && contextQueue.length > 0) {
          queueRef.current = contextQueue;
          queueIndexRef.current =
            queueStartIndex !== undefined
              ? queueStartIndex
              : contextQueue.findIndex((q) => q.id === videoId);
        } else if (
          queueRef.current.length === 0 ||
          !queueRef.current.some((q) => q.id === videoId)
        ) {
          // If song is from Top 25
          const topIdx = TOP_25_TRENDING_INDIAN.findIndex((t) => t.id === videoId);
          if (topIdx !== -1) {
            queueRef.current = TOP_25_TRENDING_INDIAN.map((t) => ({
              id: t.id,
              title: `${t.title} (${t.movie})`,
              artist: t.singers,
              thumbnail: t.thumbnail,
              duration: t.duration,
            }));
            queueIndexRef.current = topIdx;
            isVibeRadioModeRef.current = false;
          } else {
            // Instant local vibe matches (0ms delay)
            const localVibe = getLocalVibeTracks(videoId, resolvedTitle, resolvedArtist);
            queueRef.current = [
              {
                id: videoId,
                title: resolvedTitle,
                artist: resolvedArtist,
                thumbnail: resolvedThumb,
                duration: initSec > 0 ? initSec : undefined,
              },
              ...localVibe,
            ];
            queueIndexRef.current = 0;
            isVibeRadioModeRef.current = true;
          }
        } else {
          // Song already in existing queue
          const idx = queueRef.current.findIndex((q) => q.id === videoId);
          if (idx !== -1) queueIndexRef.current = idx;
        }

        p.loadVideoById({
          videoId,
          startSeconds: 0,
        });

        try {
          p.playVideo();
        } catch {}

        setTrackInfo(
          queueIndexRef.current >= 0 ? queueIndexRef.current : 0,
          queueRef.current.length || 1,
          resolvedTitle,
          resolvedArtist,
          resolvedThumb,
          videoId
        );

        // In Vibe Radio mode (e.g. after search or radio autoplay), fetch YouTube watch-next recommendations in background
        if (isVibeRadioModeRef.current) {
          fetchRelatedVibeQueue(videoId, resolvedTitle, resolvedArtist).then((related) => {
            if (related && related.length > 0) {
              const curTrack = {
                id: videoId,
                title: resolvedTitle,
                artist: resolvedArtist,
                thumbnail: resolvedThumb,
                duration: initSec > 0 ? initSec : undefined,
              };
              // Only keep unique same-vibe songs
              queueRef.current = [curTrack, ...related];
              queueIndexRef.current = 0;
              setTrackInfo(
                0,
                queueRef.current.length,
                resolvedTitle,
                resolvedArtist,
                resolvedThumb,
                videoId
              );
            }
          });
        }
      } catch {}
    },
    [setCurrentTime, setDuration, setIsLoading, setTrackInfo]
  );

  // Play next track (Automatic autoplay or Next button)
  const playNextTrack = useCallback(() => {
    const currentRepeat = repeatModeRef.current;
    const p = playerRef.current;
    if (!p) return;

    // 1. Repeat One
    if (currentRepeat === 'one') {
      p.seekTo(0, true);
      p.playVideo();
      return;
    }

    // 2. Ambient Station Mode (if no custom track active)
    if (!activeCustomTrackRef.current) {
      p.nextVideo();
      setTimeout(updateTrackMeta, 500);
      return;
    }

    const queue = queueRef.current;
    let nextIdx = queueIndexRef.current + 1;

    // 3. Shuffle Mode
    if (isShuffleRef.current && queue.length > 1) {
      let randIdx = Math.floor(Math.random() * queue.length);
      if (randIdx === queueIndexRef.current) {
        randIdx = (randIdx + 1) % queue.length;
      }
      nextIdx = randIdx;
    }

    // 4. Next track available in queue
    if (queue.length > 0 && nextIdx < queue.length) {
      const nextTrack = queue[nextIdx];
      queueIndexRef.current = nextIdx;

      // If in vibe radio mode and queue running low (< 4 tracks remaining), pre-fetch more tracks
      if (isVibeRadioModeRef.current && nextIdx >= queue.length - 3) {
        fetchRelatedVibeQueue(nextTrack.id, nextTrack.title, nextTrack.artist).then((more) => {
          if (more && more.length > 0) {
            const existingIds = new Set(queueRef.current.map((q) => q.id));
            const fresh = more.filter((m) => !existingIds.has(m.id));
            if (fresh.length > 0) {
              queueRef.current = [...queueRef.current, ...fresh];
            }
          }
        });
      }

      playCustomVideoId(
        nextTrack.id,
        nextTrack.title,
        nextTrack.artist,
        nextTrack.thumbnail,
        queue,
        nextIdx,
        isVibeRadioModeRef.current,
        nextTrack.duration
      );
      return;
    }

    // 5. Repeat All
    if (currentRepeat === 'all' && queue.length > 0) {
      const firstTrack = queue[0];
      queueIndexRef.current = 0;
      playCustomVideoId(
        firstTrack.id,
        firstTrack.title,
        firstTrack.artist,
        firstTrack.thumbnail,
        queue,
        0,
        isVibeRadioModeRef.current,
        firstTrack.duration
      );
      return;
    }

    // 6. Spotify/JioSaavn/YouTube Music Autoplay: Never pause! Smoothly transition to next related same-vibe track!
    const curId = activeCustomTrackRef.current?.videoId;
    const curTitle = activeCustomTrackRef.current?.title || '';
    const curArtist = activeCustomTrackRef.current?.artist || '';
    const fallbackVibe = getLocalVibeTracks(curId || '', curTitle, curArtist);
    if (fallbackVibe.length > 0) {
      const nextSong = fallbackVibe[0];
      playCustomVideoId(
        nextSong.id,
        nextSong.title,
        nextSong.artist,
        nextSong.thumbnail,
        fallbackVibe,
        0,
        true,
        nextSong.duration
      );
      return;
    }

    // Default fallback to Top 25
    const top25Idx = TOP_25_TRENDING_INDIAN.findIndex((t) => t.id === curId);
    const nextTop25Idx = (top25Idx + 1) % TOP_25_TRENDING_INDIAN.length;
    const nextSong = TOP_25_TRENDING_INDIAN[nextTop25Idx];

    const top25Queue: QueueTrack[] = TOP_25_TRENDING_INDIAN.map((t) => ({
      id: t.id,
      title: `${t.title} (${t.movie})`,
      artist: t.singers,
      thumbnail: t.thumbnail,
      duration: t.duration,
    }));

    playCustomVideoId(
      nextSong.id,
      `${nextSong.title} (${nextSong.movie})`,
      nextSong.singers,
      nextSong.thumbnail,
      top25Queue,
      nextTop25Idx,
      false,
      nextSong.duration
    );
  }, [playCustomVideoId, updateTrackMeta]);

  // Play previous track
  const playPrevTrack = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;

    try {
      const curTime = p.getCurrentTime?.() ?? 0;
      if (curTime > 3) {
        p.seekTo(0, true);
        return;
      }
    } catch {}

    if (!activeCustomTrackRef.current) {
      p.previousVideo();
      setTimeout(updateTrackMeta, 500);
      return;
    }

    const queue = queueRef.current;
    const prevIdx = queueIndexRef.current - 1;
    if (queue.length > 0 && prevIdx >= 0) {
      const prevTrack = queue[prevIdx];
      queueIndexRef.current = prevIdx;
      playCustomVideoId(
        prevTrack.id,
        prevTrack.title,
        prevTrack.artist,
        prevTrack.thumbnail,
        queue,
        prevIdx,
        isVibeRadioModeRef.current,
        prevTrack.duration
      );
      return;
    }

    // If at the beginning of queue, restart track
    p.seekTo(0, true);
  }, [playCustomVideoId, updateTrackMeta]);

  // Keep ref updated for event handlers
  playNextTrackRef.current = playNextTrack;

  const playSearchQuery = useCallback(
    (query: string, title?: string, artist?: string, thumbnail?: string) => {
      const p = playerRef.current;
      if (!p) return;
      try {
        setIsLoading(true);
        activeCustomTrackRef.current = {
          videoId: '',
          title: title || query,
          artist: artist || 'YouTube Search',
          thumbnail: thumbnail || '',
        };
        // YouTube Iframe API native search playlist
        p.loadPlaylist({
          list: query,
          listType: 'search',
          index: 0,
          startSeconds: 0,
        });
        setTrackInfo(
          0,
          1,
          title || query,
          artist || 'Search Match',
          thumbnail || `https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&q=80`
        );
      } catch {}
    },
    [setIsLoading, setTrackInfo]
  );

  return {
    play,
    pause,
    next: playNextTrack,
    prev: playPrevTrack,
    seekTo,
    playAt,
    playCustomVideoId,
    playSearchQuery,
  };
}
