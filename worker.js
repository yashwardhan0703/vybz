import { fetchLiveIndiaTop25 } from './src/utils/ytTop25Fetcher.js';

function getRouteMetadata(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/';

  if (clean === '/' || clean === '/index.html') {
    return {
      title: 'VybZ Music – Best Ad-Free Indian Music Player & 10 Curated Vibe Stations',
      description: 'Stream Daily Top 25 Trending Indian songs, 50 popular artists, and 10 ambient vibe radio stations: Chai Tapri, Sufi Sukoon, Deluxe Salon, and more. 100% free with synced lyrics.',
    };
  }

  if (clean === '/top-25' || clean === '/top25') {
    return {
      title: 'Top 25 Trending Indian Songs Today | VybZ Music',
      description: "Stream today's official Daily Top 25 Trending Indian songs across Bollywood, Punjabi, and Pop. 100% ad-free with zero buffer.",
    };
  }

  if (clean === '/vibes' || clean === '/vibe') {
    return {
      title: '10 Curated Indian Mood & Vibe Radio Stations | VybZ Music',
      description: 'Explore 10 nostalgic Indian ambient vibe radio stations: Chai Tapri, Alfaaz & Ehsaas, Hostel Ki Raat, Train Ki Khidki, Deluxe Salon, Monsoon Baarish, Sufi Sukoon, and more on VybZ Music.',
    };
  }

  const vibeMap = {
    'chai-tapri': {
      title: 'Chai Tapri Radio – Garam Chai & Purane Retro Gaane | VybZ Music',
      desc: 'Listen to 25 nostalgic Chai Tapri retro songs on VybZ Music. Kishore Kumar, Rafi, and warm desi acoustic vibes.',
    },
    'chai_tapri': {
      title: 'Chai Tapri Radio – Garam Chai & Purane Retro Gaane | VybZ Music',
      desc: 'Listen to 25 nostalgic Chai Tapri retro songs on VybZ Music. Kishore Kumar, Rafi, and warm desi acoustic vibes.',
    },
    'sufi-sukoon': {
      title: 'Sufi & Sukoon Radio – Roohani Ghazal & Qawwali Hits | VybZ Music',
      desc: 'Stream 25 soul-soothing Sufi ghazals and qawwalis by Nusrat Fateh Ali Khan and Jagjit Singh on VybZ Music.',
    },
    'sufi-ghazal': {
      title: 'Sufi & Sukoon Radio – Roohani Ghazal & Qawwali Hits | VybZ Music',
      desc: 'Stream 25 soul-soothing Sufi ghazals and qawwalis by Nusrat Fateh Ali Khan and Jagjit Singh on VybZ Music.',
    },
    'sufi_ghazal': {
      title: 'Sufi & Sukoon Radio – Roohani Ghazal & Qawwali Hits | VybZ Music',
      desc: 'Stream 25 soul-soothing Sufi ghazals and qawwalis by Nusrat Fateh Ali Khan and Jagjit Singh on VybZ Music.',
    },
    'deluxe-salon': {
      title: 'Deluxe 90s Salon Radio – Haircut, Champi & Retro Bollywood | VybZ Music',
      desc: '25 retro 90s Bollywood classics for cutting, shaving, and champi vibes on Deluxe Salon Radio by VybZ Music.',
    },
    'deluxe_salon': {
      title: 'Deluxe 90s Salon Radio – Haircut, Champi & Retro Bollywood | VybZ Music',
      desc: '25 retro 90s Bollywood classics for cutting, shaving, and champi vibes on Deluxe Salon Radio by VybZ Music.',
    },
    'monsoon-baarish': {
      title: 'Monsoon Baarish Radio – Rain & Romantic Bollywood Hits | VybZ Music',
      desc: 'Stream 25 romantic monsoon and rain Bollywood songs on VybZ Music. 100% ad-free with zero buffer.',
    },
    'monsoon-barish': {
      title: 'Monsoon Baarish Radio – Rain & Romantic Bollywood Hits | VybZ Music',
      desc: 'Stream 25 romantic monsoon and rain Bollywood songs on VybZ Music. 100% ad-free with zero buffer.',
    },
    'monsoon_barish': {
      title: 'Monsoon Baarish Radio – Rain & Romantic Bollywood Hits | VybZ Music',
      desc: 'Stream 25 romantic monsoon and rain Bollywood songs on VybZ Music. 100% ad-free with zero buffer.',
    },
    'monsoon_baarish': {
      title: 'Monsoon Baarish Radio – Rain & Romantic Bollywood Hits | VybZ Music',
      desc: 'Stream 25 romantic monsoon and rain Bollywood songs on VybZ Music. 100% ad-free with zero buffer.',
    },
    'highway-dhaba': {
      title: 'Late Night Highway Dhaba Radio – Punjabi & Retro Hits | VybZ Music',
      desc: 'Daler Mehndi, high-energy Punjabi hits, and late-night highway truck radio on VybZ Music.',
    },
    'highway_dhaba': {
      title: 'Late Night Highway Dhaba Radio – Punjabi & Retro Hits | VybZ Music',
      desc: 'Daler Mehndi, high-energy Punjabi hits, and late-night highway truck radio on VybZ Music.',
    },
    'corporate-majdoor': {
      title: 'Corporate Majdoor Radio – Lo-Fi Indian Beats for Work & Study | VybZ Music',
      desc: 'Indian lo-fi chill beats and soothing instrumental melodies for coding, study, and focus on VybZ Music.',
    },
    'corporate_majdoor': {
      title: 'Corporate Majdoor Radio – Lo-Fi Indian Beats for Work & Study | VybZ Music',
      desc: 'Indian lo-fi chill beats and soothing instrumental melodies for coding, study, and focus on VybZ Music.',
    },
    'corporate-chill': {
      title: 'Corporate Majdoor Radio – Lo-Fi Indian Beats for Work & Study | VybZ Music',
      desc: 'Indian lo-fi chill beats and soothing instrumental melodies for coding, study, and focus on VybZ Music.',
    },
    'corporate_chill': {
      title: 'Corporate Majdoor Radio – Lo-Fi Indian Beats for Work & Study | VybZ Music',
      desc: 'Indian lo-fi chill beats and soothing instrumental melodies for coding, study, and focus on VybZ Music.',
    },
    'bartan-time': {
      title: 'Bartan Time Radio – Jhaadu, Pocha & High Energy Dance Hits | VybZ Music',
      desc: 'Zingaat, London Thumakda, and 25 energetic Bollywood dance hits for daily chores on VybZ Music.',
    },
    'bartan_time': {
      title: 'Bartan Time Radio – Jhaadu, Pocha & High Energy Dance Hits | VybZ Music',
      desc: 'Zingaat, London Thumakda, and 25 energetic Bollywood dance hits for daily chores on VybZ Music.',
    },
    'alfaaz-ehsaas': {
      title: 'Alfaaz & Ehsaas Radio – Poetic Urdu Indie & Acoustic Hits | VybZ Music',
      desc: 'Stream 25 viral Urdu indie and acoustic songs like Jhol, Khasara, and Faasle on VybZ Music. 100% ad-free with zero buffer.',
    },
    'alfaaz_ehsaas': {
      title: 'Alfaaz & Ehsaas Radio – Poetic Urdu Indie & Acoustic Hits | VybZ Music',
      desc: 'Stream 25 viral Urdu indie and acoustic songs like Jhol, Khasara, and Faasle on VybZ Music. 100% ad-free with zero buffer.',
    },
    'hostel-ki-raat': {
      title: 'Hostel Ki Raat Radio – Maggi Jam & College Nostalgia Songs | VybZ Music',
      desc: 'Stream 25 nostalgic college hostel songs, midnight guitar jams, and Lucky Ali classics on VybZ Music.',
    },
    'hostel_ki_raat': {
      title: 'Hostel Ki Raat Radio – Maggi Jam & College Nostalgia Songs | VybZ Music',
      desc: 'Stream 25 nostalgic college hostel songs, midnight guitar jams, and Lucky Ali classics on VybZ Music.',
    },
    'train-ki-khidki': {
      title: 'Train Ki Khidki Radio – Window Seat Safar & Travel Classics | VybZ Music',
      desc: 'Stream 25 nostalgic train journey classics like Chaiyya Chaiyya, Yun Hi Chala Chal, and Kishore Kumar travel hits on VybZ Music.',
    },
    'train_ki_khidki': {
      title: 'Train Ki Khidki Radio – Window Seat Safar & Travel Classics | VybZ Music',
      desc: 'Stream 25 nostalgic train journey classics like Chaiyya Chaiyya, Yun Hi Chala Chal, and Kishore Kumar travel hits on VybZ Music.',
    },
  };

  if (clean.startsWith('/vibes/') || clean.startsWith('/vibe/')) {
    const slug = clean.split('/')[2];
    const v = vibeMap[slug];
    if (v) return { title: v.title, description: v.desc };

    const formatted = slug
      .split(/[-_]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      title: `${formatted} Radio – Indian Ambient Vibe Station | VybZ Music`,
      description: `Stream ${formatted} ambient vibe music on VybZ Music. 100% ad-free with zero buffer.`,
    };
  }

  if (clean === '/artists') {
    return {
      title: '50 Popular Bollywood & Punjabi Artists – Top 20 Hits Each | VybZ Music',
      description: 'Discover 50 legendary Indian artists including Arijit Singh, Pritam, A.R. Rahman, Shreya Ghoshal, Diljit Dosanjh, and more on VybZ Music.',
    };
  }

  if (clean.startsWith('/artist/')) {
    const artId = clean.replace('/artist/', '').trim();
    const artName = artId
      .split(/[-_]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      title: `${artName} – Top 20 Songs & Hits | VybZ Music`,
      description: `Stream top 20 verified hit songs by ${artName} on VybZ Music. 100% ad-free with zero buffer.`,
    };
  }

  if (clean === '/playlists') {
    return {
      title: 'My Playlists – Custom Indian Music Mixes | VybZ Music',
      description: 'Create and organize your favorite Bollywood, Punjabi, and Retro playlists on VybZ Music.',
    };
  }

  if (clean === '/liked') {
    return {
      title: 'Liked Songs – Favorite Indian Tracks | VybZ Music',
      description: 'Your personal collection of liked songs and favorite tracks on VybZ Music.',
    };
  }

  if (clean === '/download' || clean === '/app') {
    return {
      title: 'Download VybZ Music APK for Android (v3.4.0) – Free Ad-Free Music Player',
      description: 'Download official VybZ Music Android APK (v3.4.0 • 9.8 MB). 100% ad-free, instant 0.1s offline launch, 60 FPS smooth playback, continuous background audio, and synced karaoke lyrics.',
    };
  }

  if (clean === '/about') {
    return {
      title: 'About VybZ Music – Indian Ambient Mood & Vibe Discovery Platform',
      description: 'Discover the story behind VybZ Music. Born for cutting chai tapris, hostel midnight jams, and monsoon rain nostalgia. 10 ambient vibe stations, 100% ad-free.',
    };
  }

  if (clean === '/faq') {
    return {
      title: 'FAQ & Supported Devices | VybZ Music Help Center',
      description: 'Frequently asked questions about VybZ Music. Learn how to stream 100% free with zero ads, install the Android background audio APK, and setup on iPhone or PC.',
    };
  }

  if (clean === '/privacy') {
    return {
      title: 'Privacy Policy | VybZ Music Platform Transparency',
      description: 'Read the official VybZ Music Privacy Policy. We do not sell user data. Your playlists and history are stored locally on your device.',
    };
  }

  if (clean === '/terms') {
    return {
      title: 'Terms of Service | VybZ Music Player Guidelines',
      description: 'Official Terms of Service for VybZ Music. Learn about non-commercial personal usage guidelines and YouTube API platform compliance.',
    };
  }

  if (clean === '/dmca' || clean === '/disclaimer') {
    return {
      title: 'DMCA & Content Disclaimer | VybZ Music Rights & Attribution',
      description: 'Official DMCA copyright and content attribution disclaimer for VybZ Music. All media is streamed via official YouTube IFrame API. Contact: vybzmusic7@gmail.com.',
    };
  }

  // Any custom or newly added route (e.g. /my-new-vibe, /retro, /example)
  const customSlug = clean.replace(/^\//, '').trim();
  if (customSlug) {
    const v = vibeMap[customSlug];
    if (v) return { title: v.title, description: v.desc };

    const formatted = customSlug
      .split(/[-_]+/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return {
      title: `${formatted} | VybZ Music`,
      description: `Explore ${formatted} on VybZ Music – Indian Music Player & Ambient Vibe Hub.`,
    };
  }

  return null;
}

function isExcessiveDuration(dur) {
  if (!dur) return false;
  if (typeof dur === 'number') {
    return dur > 1200; // > 20 minutes (1200 seconds)
  }
  if (typeof dur === 'string') {
    const clean = dur.trim();
    if (!clean) return false;
    const parts = clean.split(':').map((p) => parseInt(p, 10));
    // If format is HH:MM:SS or more (parts.length >= 3), it has hours -> REJECT!
    if (parts.length >= 3) {
      return true;
    }
    // If format is MM:SS (parts.length === 2)
    if (parts.length === 2) {
      const minutes = parts[0];
      if (isNaN(minutes)) return false;
      return minutes > 20; // > 20 minutes -> REJECT!
    }
  }
  return false;
}

function isNonMusic(t, duration) {
  if (!t) return true;
  if (duration && isExcessiveDuration(duration)) return true;

  const s = t.toLowerCase();

  // 1. Standard non-music categories
  const nonMusicKeywords = [
    'standup', 'stand-up', 'comedy', 'roast', 'vlog', 'prank', 'podcast', 'news',
    'trailer', 'teaser', 'interview', 'reaction', 'episode', 'review', 'talk show',
    'highlights', 'cricket', 'football', 'kabaddi', 'match', 'web series', 'shorts',
    'behind the scene', 'making of', 'uncut', 'jukebox', 'all songs', 'non stop',
    'nonstop', 'top 10', 'top 20', 'top 50', 'mashup'
  ];
  if (nonMusicKeywords.some((k) => s.includes(k))) return true;

  // 2. Explicit full-length movies (Hindi, Bollywood, South, Action, etc.)
  const explicitFullMovieRegex =
    /(?:full\s+(?:hindi\s+|action\s+|south\s+|bollywood\s+)?(?:movie|film)|(?:hindi|bollywood|south)\s+full\s+(?:movie|film)|complete\s+movie|पूरी\s*(?:फिल्म|मूवी)|धमाकेदार\s*एक्शन\s*फिल्म|एक्शन\s*फिल्म|ब्लॉकबस्टर\s*हिंदी\s*(?:मूवी|film|फिल्म)|फुल\s*(?:मूवी|फिल्म))/i;
  if (explicitFullMovieRegex.test(s)) return true;

  // 3. General movie patterns (Blockbuster Film, Bollywood Movie, etc.)
  const generalMovieRegex =
    /(?:(?:hindi|bollywood|south)\s+(?:movie|film|movies)|blockbuster\s+(?:new\s+)?(?:movie|film|hindi\s+film)|हिंदी\s*(?:मूवी|फिल्म))/i;
  if (generalMovieRegex.test(s)) {
    const isSongIndicator = /(?:song|songs|audio|lyrical|video\s+song|track|soundtrack|ost)/i.test(s);
    if (!isSongIndicator) {
      return true;
    }
  }

  return false;
}

function extractDurationFromLockup(vm) {
  try {
    const overlays =
      vm?.contentImage?.thumbnailViewModel?.overlays ||
      vm?.contentImage?.collectionThumbnailViewModel?.primaryThumbnail?.thumbnailViewModel?.overlays ||
      [];
    for (const ov of overlays) {
      const badges = ov?.thumbnailBottomOverlayViewModel?.badges || [];
      for (const b of badges) {
        if (b?.thumbnailBadgeViewModel?.text) {
          return b.thumbnailBadgeViewModel.text;
        }
      }
    }
  } catch {}
  return '';
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // -1. Dedicated APK Download Endpoint (Supports https://vybzmusic.online/vybz.apk, /vybz-v2.9.3.apk, etc.)
    if (url.pathname.toLowerCase().endsWith('.apk')) {
      try {
        const apkReq = new Request(new URL('/VybZ.apk', request.url), request);
        const apkRes = await env.ASSETS.fetch(apkReq);
        const headers = new Headers(apkRes.headers);
        headers.set('Content-Type', 'application/vnd.android.package-archive');
        headers.set('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
        headers.set('CDN-Cache-Control', 'no-store, no-cache, max-age=0');
        headers.set('Cloudflare-CDN-Cache-Control', 'no-store, no-cache, max-age=0');
        const rawFileName = url.pathname.split('/').pop() || 'vybz.apk';
        headers.set('Content-Disposition', `attachment; filename="${rawFileName}"`);
        return new Response(apkRes.body, {
          status: 200,
          headers,
        });
      } catch (e) {
        return new Response('APK download failed: ' + e.message, { status: 500 });
      }
    }

    // -1. Live Version Endpoint for zero-lag iOS/Android/PWA cache busting
    if (url.pathname === '/api/version') {
      return new Response(JSON.stringify({ version: '2.7.7-permanent-navigation-fix', timestamp: Date.now() }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'private, no-cache, no-store, max-age=0, must-revalidate',
          'CDN-Cache-Control': 'no-store, no-cache, max-age=0',
          'Cloudflare-CDN-Cache-Control': 'no-store, no-cache, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
    }

    // -1.1 Live APK Version Endpoint for instant Android in-app update trigger (Uncached API route bypasses PWA ServiceWorker)
    if (url.pathname === '/api/apk-version' || url.pathname === '/api/version-apk' || url.pathname === '/version.json') {
      return new Response(JSON.stringify({
        latestVersion: '3.4.0',
        versionCode: 18,
        minVersion: '2.9.0',
        apkUrl: 'https://vybzmusic.online/vybz.apk',
        title: 'VybZ v3.4.0 Official Legal, FAQ & Audio Continuity Engine! 🚀',
        releaseNotes: 'Official Legal & Transparency Hub (About, FAQ, Privacy, Terms, DMCA Disclaimer), 20-min anti-movie firewall, and background playback improvements.',
        timestamp: Date.now(),
      }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'private, no-cache, no-store, max-age=0, must-revalidate',
          'CDN-Cache-Control': 'no-store, no-cache, max-age=0',
          'Cloudflare-CDN-Cache-Control': 'no-store, no-cache, max-age=0',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      });
    }

    // 0. Live YouTube Music India Top 25 Chart Endpoint
    if (url.pathname === '/api/top25') {
      try {
        const chart = await fetchLiveIndiaTop25();
        if (!chart) {
          return new Response(JSON.stringify({ error: 'Unable to fetch live India chart' }), {
            status: 502,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }
        return new Response(JSON.stringify(chart), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=1800',
          },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: String(err) }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // 0.5 Synchronized & Plain Lyrics Endpoint (LRCLIB Integration with Strict Title & Duration Matching)
    if (url.pathname === '/api/lyrics') {
      const rawTrack = url.searchParams.get('track') || '';
      const rawArtist = url.searchParams.get('artist') || '';
      const rawDuration = parseFloat(url.searchParams.get('duration') || '0');

      if (!rawTrack.trim()) {
        return new Response(JSON.stringify({ error: 'Missing track parameter' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // Clean track title (strip bracketed text like [Official Audio], (Lyrics), etc.)
      const cleanTrack = rawTrack
        .replace(
          /[([][^\])]*?(official|video|audio|lyrics|lyrical|full song|teaser|trailer|4k|hd|remix|slowed|reverb)[^\])]*?[\])]/gi,
          ''
        )
        .replace(/[-|].*$/, '')
        .trim();
      const cleanArtist = rawArtist
        .replace(/[([][^\])]*?[\])]/g, '')
        .split(/[,&x/]/i)[0]
        .replace(/\b(feat|ft)\b.*$/i, '')
        .trim();

      // Transliteration normalizer for Indian songs (handles aa/a, ee/i, oo/u, ein/en, etc.)
      const normalizeText = (s) =>
        (s || '')
          .toLowerCase()
          .replace(/ein\b/g, 'en')
          .replace(/ee/g, 'i')
          .replace(/oo/g, 'u')
          .replace(/aa/g, 'a')
          .replace(/suroor/g, 'saroor')
          .replace(/saawan/g, 'sawan')
          .replace(/[^a-z0-9]/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

      // Words matcher helper: ensures candidate actually contains core words of the track
      const isTrackMatch = (candidateTitle) => {
        if (!candidateTitle) return false;
        const normTarget = normalizeText(cleanTrack);
        const normCand = normalizeText(candidateTitle);
        if (normCand.includes(normTarget) || normTarget.includes(normCand)) return true;

        const w1 = normTarget.split(' ').filter((w) => w.length > 2);
        const w2 = normCand.split(' ').filter((w) => w.length > 2);
        if (!w1.length || !w2.length) return false;
        const common = w1.filter((w) => w2.includes(w));
        return common.length >= Math.ceil(Math.min(w1.length, w2.length) * 0.5);
      };

      try {
        let result = null;
        let fallbackPlain = null;

        // Multi-stage queries to maximize match coverage across spelling & tagging variations
        const normTitle = normalizeText(cleanTrack);
        const searchQueries = [
          `${cleanTrack} ${cleanArtist}`.trim(),
          cleanTrack,
          `${cleanArtist} ${cleanTrack}`.trim(),
          cleanTrack.split(/\s+/).slice(0, 3).join(' ') + (cleanArtist ? ` ${cleanArtist}` : ''),
          cleanTrack.split(/\s+/).slice(0, 3).join(' '),
          normTitle !== cleanTrack.toLowerCase() ? normTitle : '',
        ].filter((q, idx, arr) => q && q.length >= 3 && arr.indexOf(q) === idx);

        for (const query of searchQueries) {
          try {
            const sUrl = `https://lrclib.net/api/search?q=${encodeURIComponent(query)}`;
            const sRes = await fetch(sUrl, {
              headers: { 'User-Agent': 'VybZMusicApp/1.0 (https://vybzmusic.online)' },
            });
            if (!sRes.ok) continue;
            const list = await sRes.json();
            if (!Array.isArray(list) || list.length === 0) continue;

            const validMatches = list.filter((item) => isTrackMatch(item.trackName));
            if (!validMatches.length) continue;

            // 1. Look for synced lyrics first
            const withSynced = validMatches.filter(
              (item) => item.syncedLyrics && item.syncedLyrics.trim().length > 0
            );

            if (withSynced.length > 0) {
              if (rawDuration > 0) {
                withSynced.sort(
                  (a, b) => Math.abs((a.duration || 0) - rawDuration) - Math.abs((b.duration || 0) - rawDuration)
                );
              }
              result = withSynced[0];
              break; // Found best synced lyrics, exit search
            }

            // 2. Keep best plain lyrics candidate as reliable fallback
            if (!fallbackPlain) {
              const withPlain = validMatches.find(
                (item) => item.plainLyrics && item.plainLyrics.trim().length > 0
              );
              if (withPlain) fallbackPlain = withPlain;
            }
          } catch { }
        }

        // Use plain lyrics fallback if no synced lyrics were found
        if (!result && fallbackPlain) {
          result = fallbackPlain;
        }

        if (result && (result.syncedLyrics || result.plainLyrics)) {
          return new Response(
            JSON.stringify({
              syncedLyrics: result.syncedLyrics || null,
              plainLyrics: result.plainLyrics || null,
              trackName: result.trackName || cleanTrack,
              artistName: result.artistName || cleanArtist,
            }),
            {
              headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=86400',
              },
            }
          );
        }

        return new Response(JSON.stringify({ syncedLyrics: null, plainLyrics: null }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      } catch (err) {
        return new Response(JSON.stringify({ syncedLyrics: null, plainLyrics: null, error: String(err) }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // 1. YouTube Search API Endpoint
    if (url.pathname === '/api/search') {
      const query = url.searchParams.get('q');
      if (!query) {
        return new Response(JSON.stringify({ error: 'Missing query parameter q' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      try {
        const videos = [];

        // 1. First attempt: Direct YouTube HTML Search
        try {
          const ytUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
          const ytRes = await fetch(ytUrl, {
            headers: {
              'User-Agent':
                'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              'Accept-Language': 'en-US,en;q=0.9',
            },
          });

          const html = await ytRes.text();
          const match =
            html.match(/var ytInitialData = ({.*?});<\/script>/) ||
            html.match(/ytInitialData\s*=\s*({.+?});/);

          if (match) {
            const json = JSON.parse(match[1]);
            const contents =
              json.contents?.twoColumnSearchResultsRenderer?.primaryContents
                ?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer
                ?.contents || [];

            for (const item of contents) {
              const vr = item.videoRenderer;
              if (vr && vr.videoId) {
                const title = vr.title?.runs?.[0]?.text || '';
                const artist = vr.ownerText?.runs?.[0]?.text || 'YouTube';
                const duration = vr.lengthText?.simpleText || '';
                if (!title || isNonMusic(title, duration)) continue;
                const thumbnail =
                  vr.thumbnail?.thumbnails?.slice(-1)[0]?.url ||
                  `https://img.youtube.com/vi/${vr.videoId}/mqdefault.jpg`;

                videos.push({
                  id: vr.videoId,
                  title,
                  artist,
                  duration,
                  thumbnail,
                });
              }
            }
          }
        } catch {
          // HTML scrape failed or challenged, proceed to InnerTube fallback
        }

        // 2. High-reliability fallback: YouTube InnerTube API (Never blocked on Cloudflare Edge)
        if (videos.length === 0) {
          try {
            const innerTubeRes = await fetch('https://www.youtube.com/youtubei/v1/search', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'User-Agent':
                  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
              },
              body: JSON.stringify({
                context: {
                  client: {
                    clientName: 'WEB',
                    clientVersion: '2.20240101.01.00',
                    hl: 'en',
                    gl: 'IN',
                  },
                },
                query,
              }),
            });

            if (innerTubeRes.ok) {
              const itData = await innerTubeRes.json();
              const itContents =
                itData.contents?.twoColumnSearchResultsRenderer?.primaryContents
                  ?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer
                  ?.contents || [];

              for (const item of itContents) {
                const vr = item.videoRenderer;
                if (vr && vr.videoId) {
                  const title = vr.title?.runs?.[0]?.text || '';
                  const artist = vr.ownerText?.runs?.[0]?.text || 'YouTube';
                  const duration = vr.lengthText?.simpleText || '';
                  if (!title || isNonMusic(title, duration)) continue;
                  const thumbnail =
                    vr.thumbnail?.thumbnails?.slice(-1)[0]?.url ||
                    `https://img.youtube.com/vi/${vr.videoId}/mqdefault.jpg`;

                  videos.push({
                    id: vr.videoId,
                    title,
                    artist,
                    duration,
                    thumbnail,
                  });
                }
              }
            }
          } catch {
            // Both methods failed
          }
        }

        return new Response(JSON.stringify({ results: videos.slice(0, 20) }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: String(err) }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // 2. YouTube Watch-Next / Related Video API Endpoint (Pure Music Only, Anti-Comedy/Podcast)
    if (url.pathname === '/api/related') {
      const videoId = url.searchParams.get('v');
      const currentTitle = (url.searchParams.get('title') || '').toLowerCase();
      const currentArtist = (url.searchParams.get('artist') || '').toLowerCase();
      if (!videoId) {
        return new Response(JSON.stringify({ error: 'Missing videoId' }), {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      try {
        const ytRes = await fetch('https://www.youtube.com/youtubei/v1/next', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'User-Agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
          body: JSON.stringify({
            context: {
              client: {
                clientName: 'WEB',
                clientVersion: '2.20240101.01.00',
                hl: 'en',
                gl: 'IN',
              },
            },
            videoId,
          }),
        });

        const nextData = await ytRes.json();
        const relatedVideos = [];

        function cleanTitle(t) {
          return t
            .toLowerCase()
            .replace(/official\s*(video|audio|music\s*video|lyric\s*video|hd)/gi, '')
            .replace(/full\s*(video|song|audio)/gi, '')
            .replace(/[[({].*?[\])}]/g, '')
            .replace(/[^a-z0-9]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        }

        function extractMovieName(rawTitle, artist) {
          if (!rawTitle) return null;
          const parts = rawTitle.split(/[|\-–]/).map((p) => p.trim());
          if (parts.length < 2) return null;
          const blacklist = [
            'official video', 'official audio', 'lyrical video', 'lyric video',
            'video song', 'audio song', 'full video', 'full song', '4k', '8k', 'hd',
            'old hindi songs', 'purane gane', 'hindi songs', 'bollywood songs',
            'remix', 'lofi', 'slowed', 'reverb', 'mashup', 'cover'
          ];
          for (let i = 1; i < parts.length; i++) {
            const p = parts[i];
            const low = p.toLowerCase();
            if (low.length < 3 || low.length > 35) continue;
            if (artist && low.includes(artist.toLowerCase())) continue;
            if (blacklist.some((b) => low.includes(b))) continue;
            if (low.includes('song') || low.includes('music') || low.includes('singer') || low.includes('audio')) continue;
            return p;
          }
          return null;
        }

        function isSameTrack(candTitle, curTitle) {
          if (!candTitle || !curTitle) return false;
          const c1 = cleanTitle(candTitle).split(' ').filter((w) => w.length > 2);
          const c2 = cleanTitle(curTitle).split(' ').filter((w) => w.length > 2);
          if (c1.length === 0 || c2.length === 0) return false;
          if (c1[0] === c2[0] && (c1.length === 1 || c2.length === 1 || c1[1] === c2[1])) {
            return true;
          }
          return false;
        }

        function isVibeMismatch(candTitle, vibe) {
          if (!candTitle || !vibe || vibe === 'general') return false;
          const low = candTitle.toLowerCase();
          if (vibe === 'haryanvi') {
            const romanceBlocklist = [
              'arijit', 'atif aslam', 'kk', 'mohit chauhan', 'pritam', 'lata mangeshkar',
              'tamasha', 'tum hi ho', 'channa mereya', 'kesariya', 'lo-fi', 'ghazal', 'jagjit'
            ];
            return romanceBlocklist.some((mw) => low.includes(mw));
          }
          if (vibe === 'bhojpuri') {
            const nonBhojpuriBlocklist = [
              'arijit', 'atif aslam', 'kk', 'mohit chauhan', 'pritam', 'lata mangeshkar'
            ];
            return nonBhojpuriBlocklist.some((mw) => low.includes(mw));
          }
          if (vibe === 'bhakti') {
            const partyBlocklist = ['party', 'club', 'drill', 'rap', 'hip hop', 'item song', 'sharab', 'peg', 'daaru'];
            return partyBlocklist.some((mw) => low.includes(mw));
          }
          if (vibe === 'golden_vintage') {
            const modernBlocklist = [
              'arijit', 'badshah', 'ap dhillon', 'pritam', 'shreya ghoshal', 'jubin', 'neha kakkar',
              'tony kakkar', 'raftaar', 'mc stan', 'emiway', 'seedhe maut', 'darshan raval',
              'anuv jain', 'prateek kuhad', 'diljit', 'karan aujla', 'shubh', 'tamasha', 'jab we met',
              'rockstar', 'kabir singh', 'animal', 'brahmastra', 'jawan', 'pathaan', 'pushpa',
              'reels', 'shorts', '2020', '2021', '2022', '2023', '2024', '2025'
            ];
            return modernBlocklist.some((mw) => low.includes(mw));
          }
          if (vibe === 'party_hiphop') {
            const slowBlocklist = ['bhajan', 'aarti', 'ghazal', 'sad version', 'unplugged', 'lata mangeshkar', 'jagjit singh'];
            return slowBlocklist.some((sw) => low.includes(sw));
          }
          return false;
        }

        // Detect Era & Vibe Cluster
        const combinedSeed = `${currentTitle} ${currentArtist}`.toLowerCase();
        let detectedVibe = 'general';
        if (
          combinedSeed.includes('haryanvi') ||
          combinedSeed.includes('masoom sharma') ||
          combinedSeed.includes('dhanda nyoliwala') ||
          combinedSeed.includes('bintu pabra') ||
          combinedSeed.includes('shiva choudhary') ||
          combinedSeed.includes('ajay hooda') ||
          combinedSeed.includes('raju punjabi') ||
          combinedSeed.includes('pranjal dahiya') ||
          combinedSeed.includes('sumit parta') ||
          combinedSeed.includes('amanraj') ||
          combinedSeed.includes('gulzaar chhaniwala') ||
          combinedSeed.includes('mor haryanvi') ||
          combinedSeed.includes('gem tunes haryanvi') ||
          combinedSeed.includes('sarwang') ||
          combinedSeed.includes('sihag') ||
          combinedSeed.includes('nav haryanvi') ||
          combinedSeed.includes('folk station')
        ) {
          detectedVibe = 'haryanvi';
        } else if (
          combinedSeed.includes('bhojpuri') ||
          combinedSeed.includes('pawan singh') ||
          combinedSeed.includes('khesari') ||
          combinedSeed.includes('shilpi raj') ||
          combinedSeed.includes('silpi raj') ||
          combinedSeed.includes('wave music') ||
          combinedSeed.includes('bhojpuriya')
        ) {
          detectedVibe = 'bhojpuri';
        } else if (
          combinedSeed.includes('bhajan') ||
          combinedSeed.includes('aarti') ||
          combinedSeed.includes('chalisa') ||
          combinedSeed.includes('krishna') ||
          combinedSeed.includes('shiva') ||
          combinedSeed.includes('ram ') ||
          combinedSeed.includes('hanuman') ||
          combinedSeed.includes('t-series bhakti')
        ) {
          detectedVibe = 'bhakti';
        } else if (
          combinedSeed.includes('lata') ||
          combinedSeed.includes('rafi') ||
          combinedSeed.includes('mukesh') ||
          combinedSeed.includes('kishore') ||
          combinedSeed.includes('hemant') ||
          combinedSeed.includes('meena kumari') ||
          combinedSeed.includes('shankar jaikishan') ||
          combinedSeed.includes('madan mohan') ||
          combinedSeed.includes('dil ek mandir') ||
          combinedSeed.includes('old hindi') ||
          combinedSeed.includes('purane gane') ||
          combinedSeed.includes('vintage') ||
          combinedSeed.includes('196') ||
          combinedSeed.includes('195') ||
          combinedSeed.includes('197')
        ) {
          detectedVibe = 'golden_vintage';
        } else if (
          combinedSeed.includes('honey singh') ||
          combinedSeed.includes('badshah') ||
          combinedSeed.includes('shubh') ||
          combinedSeed.includes('karan aujla') ||
          combinedSeed.includes('anirudh') ||
          combinedSeed.includes('diljit')
        ) {
          detectedVibe = 'party_hiphop';
        } else if (
          combinedSeed.includes('anuv jain') ||
          combinedSeed.includes('prateek kuhad') ||
          combinedSeed.includes('local train') ||
          combinedSeed.includes('sukoon') ||
          combinedSeed.includes('indie')
        ) {
          detectedVibe = 'indie_sukoon';
        } else if (
          combinedSeed.includes('sidhu') ||
          combinedSeed.includes('moosewala') ||
          combinedSeed.includes('ap dhillon')
        ) {
          detectedVibe = 'punjabi_swag';
        } else if (
          combinedSeed.includes('kumar sanu') ||
          combinedSeed.includes('alka yagnik') ||
          combinedSeed.includes('udit narayan') ||
          combinedSeed.includes('90s')
        ) {
          detectedVibe = 'nostalgia_90s';
        }

        const cleanArtist = currentArtist.replace('youtube music', '').trim();
        const movie = extractMovieName(currentTitle, cleanArtist);

        // Targeted search tracks (Movie soundtrack OR period-matched artist radio)
        const targetedTracks = [];
        if (movie || detectedVibe !== 'general') {
          try {
            let targetedQuery = '';
            if (movie) {
              targetedQuery = `${movie} song audio`;
            } else if (detectedVibe === 'haryanvi') {
              targetedQuery = `${cleanArtist || ''} Haryanvi superhit songs`;
            } else if (detectedVibe === 'bhojpuri') {
              targetedQuery = `${cleanArtist || ''} Bhojpuri superhit songs`;
            } else if (detectedVibe === 'bhakti') {
              targetedQuery = `${cleanArtist || ''} Bhakti Bhajan songs`;
            } else if (detectedVibe === 'golden_vintage') {
              targetedQuery = `${cleanArtist || 'Lata Mangeshkar Mohammed Rafi'} 1960s classic old hindi songs`;
            } else if (detectedVibe === 'party_hiphop') {
              targetedQuery = `${cleanArtist || 'Yo Yo Honey Singh'} Badshah party hit songs`;
            } else if (detectedVibe === 'indie_sukoon') {
              targetedQuery = `${cleanArtist || 'Anuv Jain'} Prateek Kuhad acoustic sukoon songs`;
            } else if (detectedVibe === 'punjabi_swag') {
              targetedQuery = `${cleanArtist || 'Sidhu Moosewala'} Shubh Punjabi songs`;
            } else if (detectedVibe === 'nostalgia_90s') {
              targetedQuery = `${cleanArtist || 'Kumar Sanu'} Alka Yagnik 90s romantic songs`;
            }

            if (targetedQuery) {
              const targetedRes = await fetch('https://www.youtube.com/youtubei/v1/search', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'User-Agent':
                    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                },
                body: JSON.stringify({
                  context: {
                    client: {
                      clientName: 'WEB',
                      clientVersion: '2.20240101.01.00',
                      hl: 'en',
                      gl: 'IN',
                    },
                  },
                  query: targetedQuery,
                }),
              });

              if (targetedRes.ok) {
                const sData = await targetedRes.json();
                const sContents =
                  sData.contents?.twoColumnSearchResultsRenderer?.primaryContents
                    ?.sectionListRenderer?.contents?.[0]?.itemSectionRenderer
                    ?.contents || [];

                for (const item of sContents) {
                  const vr = item.videoRenderer;
                  if (vr && vr.videoId && vr.videoId !== videoId) {
                    const t = vr.title?.runs?.[0]?.text || '';
                    const dur = vr.lengthText?.simpleText || '';
                    if (!t || isNonMusic(t, dur) || isSameTrack(t, currentTitle)) continue;
                    if (isVibeMismatch(t, detectedVibe)) continue;
                    if (targetedTracks.some((tt) => isSameTrack(tt.title, t))) continue;

                    targetedTracks.push({
                      id: vr.videoId,
                      title: t,
                      artist: vr.ownerText?.runs?.[0]?.text || currentArtist || 'YouTube Music',
                      thumbnail: `https://img.youtube.com/vi/${vr.videoId}/mqdefault.jpg`,
                    });
                    if (targetedTracks.length >= 8) break;
                  }
                }
              }
            }
          } catch { }
        }

        const sections =
          nextData?.contents?.twoColumnWatchNextResults?.secondaryResults?.secondaryResults
            ?.results || [];

        const nextRecommendations = [];
        for (const item of sections) {
          let id = '';
          let title = '';
          let artist = 'YouTube Music';
          let duration = '';

          // Support both modern lockupViewModel and legacy compactVideoRenderer
          if (item.lockupViewModel) {
            const vm = item.lockupViewModel;
            id = vm.contentId || '';
            title = vm.metadata?.lockupMetadataViewModel?.title?.content || '';
            artist =
              vm.metadata?.lockupMetadataViewModel?.metadata?.contentMetadataViewModel
                ?.metadataRows?.[0]?.metadataParts?.[0]?.text?.content || 'YouTube Music';
            duration = extractDurationFromLockup(vm);
          } else if (item.compactVideoRenderer) {
            const cvr = item.compactVideoRenderer;
            id = cvr.videoId || '';
            title = cvr.title?.simpleText || cvr.title?.runs?.[0]?.text || '';
            artist = cvr.shortBylineText?.runs?.[0]?.text || 'YouTube Music';
            duration = cvr.lengthText?.simpleText || cvr.lengthText?.runs?.[0]?.text || '';
          }

          if (!id || id === videoId || id.length !== 11) continue;
          if (!title) continue;
          if (isNonMusic(title, duration)) continue;
          if (isSameTrack(title, currentTitle)) continue;
          if (isVibeMismatch(title, detectedVibe)) continue;
          if (targetedTracks.some((tt) => isSameTrack(tt.title, title))) continue;
          if (nextRecommendations.some((rv) => isSameTrack(rv.title, title))) continue;

          nextRecommendations.push({
            id,
            title,
            artist,
            thumbnail: `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
          });
        }

        // Targeted songs (movie album / era match) take primary spotlight, followed by vibe-consistent next suggestions
        for (const tt of targetedTracks) {
          relatedVideos.push(tt);
        }
        for (const nr of nextRecommendations) {
          if (!relatedVideos.some((rv) => rv.id === nr.id || isSameTrack(rv.title, nr.title))) {
            relatedVideos.push(nr);
          }
        }

        return new Response(JSON.stringify({ results: relatedVideos.slice(0, 20) }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: String(err) }), {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
      }
    }

    // 3. Static Assets & Direct Universal SPA Routing via Cloudflare Assets
    if (env && env.ASSETS && typeof env.ASSETS.fetch === 'function') {
      const pathname = url.pathname;
      const isApi = pathname.startsWith('/api/');
      const isHtmlRoute =
        pathname === '/' ||
        pathname === '/index.html' ||
        pathname.endsWith('.html');
      const isStaticAsset =
        (pathname.startsWith('/assets/') || pathname.includes('.')) && !isHtmlRoute;

      // A. Static Asset Files (/assets/..., /logo.png, /sw.js, /favicon.ico, etc.)
      if (isStaticAsset) {
        const response = await env.ASSETS.fetch(request);
        const headers = new Headers(response.headers);

        // Cache immutable hashed static assets for 1 year
        if (pathname.startsWith('/assets/')) {
          headers.set('Cache-Control', 'public, max-age=31536000, immutable');
          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers,
          });
        }

        // SW, Workbox, and manifest should never be stale
        if (
          pathname.endsWith('sw.js') ||
          pathname.endsWith('registerSW.js') ||
          pathname.endsWith('.webmanifest') ||
          pathname.includes('workbox')
        ) {
          headers.set('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
          headers.set('CDN-Cache-Control', 'no-store, no-cache, max-age=0');
          headers.set('Cloudflare-CDN-Cache-Control', 'no-store, no-cache, max-age=0');
          headers.set('Pragma', 'no-cache');
          headers.set('Expires', '0');
        }

        return new Response(response.body, {
          status: response.status,
          statusText: response.statusText,
          headers,
        });
      }

      // B. Universal SPA Clean Routes (/, /vibes, /artists, /top-25, /vibes/chai-tapri, /artist/..., etc.)
      // Always serve index.html directly with 200 OK without relying on 404 fallback or 307 redirect!
      if (!isApi && (request.method === 'GET' || request.method === 'HEAD')) {
        const indexReq = new Request(new URL('/', request.url), { method: 'GET' });
        const indexRes = await env.ASSETS.fetch(indexReq);
        let html = await indexRes.text();

        const canonicalPath =
          pathname === '/' || pathname === '/index.html' ? '/' : pathname;
        const meta = getRouteMetadata(pathname);
        if (meta) {
          html = html
            .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
            .replace(
              /<meta name="description" content=".*?" \/>/,
              `<meta name="description" content="${meta.description}" />`
            )
            .replace(
              /<meta property="og:title" content=".*?" \/>/,
              `<meta property="og:title" content="${meta.title}" />`
            )
            .replace(
              /<meta property="og:description" content=".*?" \/>/,
              `<meta property="og:description" content="${meta.description}" />`
            )
            .replace(
              /<meta property="og:url" content=".*?" \/>/,
              `<meta property="og:url" content="https://vybzmusic.online${canonicalPath}" />`
            )
            .replace(
              /<meta name="twitter:title" content=".*?" \/>/,
              `<meta name="twitter:title" content="${meta.title}" />`
            )
            .replace(
              /<meta name="twitter:description" content=".*?" \/>/,
              `<meta name="twitter:description" content="${meta.description}" />`
            )
            .replace(
              /<link rel="canonical" href=".*?" \/>/,
              `<link rel="canonical" href="https://vybzmusic.online${canonicalPath}" />`
            );
        }

        if (canonicalPath === '/download' || canonicalPath === '/app') {
          const downloadSchema = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "VybZ Music",
  "operatingSystem": "Android",
  "applicationCategory": "MusicApplication",
  "fileSize": "9.7MB",
  "softwareVersion": "3.3.0",
  "downloadUrl": "https://vybzmusic.online/vybz.apk",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "INR"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "1250"
  }
}
</script>
</head>`;
          html = html.replace('</head>', downloadSchema);
        }

        const h = new Headers(indexRes.headers);
        h.set('Content-Type', 'text/html; charset=utf-8');
        h.set('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
        h.set('CDN-Cache-Control', 'no-store, no-cache, max-age=0');
        h.set('Cloudflare-CDN-Cache-Control', 'no-store, no-cache, max-age=0');
        h.set('Pragma', 'no-cache');
        h.set('Expires', '0');
        return new Response(request.method === 'HEAD' ? null : html, {
          status: 200,
          headers: h,
        });
      }

      return env.ASSETS.fetch(request);
    }

    return fetch(request);
  },
};
