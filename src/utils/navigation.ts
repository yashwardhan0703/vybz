import { WORLDS, type ThemeWorld } from '../data/worlds';
import type { PlayerCategory } from '../store/playerStore';

export interface RouteMeta {
  category?: PlayerCategory | 'download';
  isDownload?: boolean;
  legalTab?: 'about' | 'faq' | 'privacy' | 'terms' | 'disclaimer';
  artistId?: string;
  vibeSlug?: string;
  worldId?: string;
  playlistId?: string;
  title: string;
  description: string;
}

/**
 * Known curated station metadata overrides (for rich description text)
 */
export const VIBE_SLUGS: Record<string, { worldId: string; name: string; title: string; desc: string }> = {
  'chai-tapri': {
    worldId: 'chai_tapri',
    name: 'Chai Tapri Radio',
    title: 'Chai Tapri Radio – Garam Kulhad Chai & Purane Retro Gaane | VybZ Music',
    desc: 'Garam kulhad chai, shaam ki tapri aur Kishore-Rafi ke purane retro gaane — listen to timeless 70s, 80s & 90s Hindi acoustic classics ad-free without login on VybZ Music.',
  },
  'sufi-sukoon': {
    worldId: 'sufi_ghazal',
    name: 'Sufi & Sukoon Radio',
    title: 'Sufi & Sukoon Radio – Roohani Ghazal & Qawwali Hits | VybZ Music',
    desc: 'Roohani shaam aur dil ko chhoo jaane wali ghazal-qawwali — stream Nusrat Fateh Ali Khan, Rahat Fateh Ali Khan & Jagjit Singh Sufi hits online free without ads.',
  },
  'deluxe-salon': {
    worldId: 'deluxe_salon',
    name: 'Deluxe 90s Salon Radio',
    title: 'Deluxe 90s Salon Radio – Cutting, Champi & 90s Cassette Bollywood | VybZ Music',
    desc: 'Naai ki dukaan wala classic cassette era — Kumar Sanu, Udit Narayan & Alka Yagnik ke best 90s & 2000s romantic Bollywood songs for cutting, shaving & Sunday champi vibes.',
  },
  'monsoon-baarish': {
    worldId: 'monsoon_barish',
    name: 'Monsoon Baarish Radio',
    title: 'Monsoon Baarish Radio – Rimjhim Rain & Romantic Bollywood Hits | VybZ Music',
    desc: 'Rimjhim baarish, garam pakode aur soulful romantic Bollywood rain songs — listen to monsoon Hindi hits and baarish gaane online free without login or ads.',
  },
  'monsoon-barish': {
    worldId: 'monsoon_barish',
    name: 'Monsoon Baarish Radio',
    title: 'Monsoon Baarish Radio – Rimjhim Rain & Romantic Bollywood Hits | VybZ Music',
    desc: 'Rimjhim baarish, garam pakode aur soulful romantic Bollywood rain songs — listen to monsoon Hindi hits and baarish gaane online free without login or ads.',
  },
  'highway-dhaba': {
    worldId: 'highway_dhaba',
    name: 'Highway Dhaba Radio',
    title: 'Late Night Highway Dhaba Radio – Punjabi & Long Drive Hits | VybZ Music',
    desc: 'Raat ke 1 baje highway dhaba, tandoori chai aur high-bass Punjabi & retro driving hits — nonstop long-drive Punjabi radio online free without ads.',
  },
  'corporate-majdoor': {
    worldId: 'corporate_majdoor',
    name: 'Corporate Majdoor Radio',
    title: 'Corporate Majdoor Radio – 24/7 Hindi Lo-Fi Beats for Work & Study | VybZ Music',
    desc: 'Office Excel, late-night deadlines aur peaceful Hindi Lo-Fi chill beats — 24/7 Bollywood Lo-Fi radio for coding, study & deep work focus without ads.',
  },
  'corporate-chill': {
    worldId: 'corporate_majdoor',
    name: 'Corporate Majdoor Radio',
    title: 'Corporate Majdoor Radio – 24/7 Hindi Lo-Fi Beats for Work & Study | VybZ Music',
    desc: 'Office Excel, late-night deadlines aur peaceful Hindi Lo-Fi chill beats — 24/7 Bollywood Lo-Fi radio for coding, study & deep work focus without ads.',
  },
  'bartan-time': {
    worldId: 'bartan_time',
    name: 'Bartan Time Radio',
    title: 'Bartan Time Radio – Jhaadu, Pocha & High Energy Dance Hits | VybZ Music',
    desc: 'Jhaadu, pocha, bartan aur full-volume Bollywood dance hits — turn boring daily chores into a high-energy desi party playlist without ads.',
  },
  'alfaaz-ehsaas': {
    worldId: 'alfaaz_ehsaas',
    name: 'Alfaaz & Ehsaas Radio',
    title: 'Alfaaz & Ehsaas Radio – Poetic Urdu Indie & Acoustic Hits | VybZ Music',
    desc: 'Gehri shayari, Urdu indie poetry aur soulful acoustic tracks like Jhol, Khasara & Faasle — listen to peaceful indie Hindi-Urdu melodies ad-free without login.',
  },
  'hostel-ki-raat': {
    worldId: 'hostel_ki_raat',
    name: 'Hostel Ki Raat Radio',
    title: 'Hostel Ki Raat Radio – 2 AM Maggi Jam & College Nostalgia Songs | VybZ Music',
    desc: '2 AM Maggi, hostel ki chhat, acoustic guitar jamming aur Lucky Ali classics — stream nostalgic college yaari, friendship & late-night Hindi songs online free.',
  },
  'train-ki-khidki': {
    worldId: 'train_ki_khidki',
    name: 'Train Ki Khidki Radio',
    title: 'Train Ki Khidki Radio – Window Seat Safar & Travel Classics | VybZ Music',
    desc: 'Sleeper coach ki window seat, guzarte ped aur Chaiyya Chaiyya — stream evergreen Indian train journey, safar & road trip Bollywood songs ad-free.',
  },
};

// Aliases for underscore IDs and variations
VIBE_SLUGS['chai_tapri'] = VIBE_SLUGS['chai-tapri'];
VIBE_SLUGS['sufi-ghazal'] = VIBE_SLUGS['sufi-sukoon'];
VIBE_SLUGS['sufi_ghazal'] = VIBE_SLUGS['sufi-sukoon'];
VIBE_SLUGS['deluxe_salon'] = VIBE_SLUGS['deluxe-salon'];
VIBE_SLUGS['monsoon_baarish'] = VIBE_SLUGS['monsoon-baarish'];
VIBE_SLUGS['monsoon_barish'] = VIBE_SLUGS['monsoon-baarish'];
VIBE_SLUGS['highway_dhaba'] = VIBE_SLUGS['highway-dhaba'];
VIBE_SLUGS['corporate_majdoor'] = VIBE_SLUGS['corporate-majdoor'];
VIBE_SLUGS['corporate_chill'] = VIBE_SLUGS['corporate-majdoor'];
VIBE_SLUGS['bartan_time'] = VIBE_SLUGS['bartan-time'];
VIBE_SLUGS['alfaaz_ehsaas'] = VIBE_SLUGS['alfaaz-ehsaas'];
VIBE_SLUGS['hostel_ki_raat'] = VIBE_SLUGS['hostel-ki-raat'];
VIBE_SLUGS['train_ki_khidki'] = VIBE_SLUGS['train-ki-khidki'];

export const WORLD_ID_TO_SLUG: Record<string, string> = {
  chai_tapri: 'chai-tapri',
  sufi_ghazal: 'sufi-sukoon',
  deluxe_salon: 'deluxe-salon',
  monsoon_baarish: 'monsoon-baarish',
  monsoon_barish: 'monsoon-baarish',
  highway_dhaba: 'highway-dhaba',
  corporate_majdoor: 'corporate-majdoor',
  corporate_chill: 'corporate-majdoor',
  bartan_time: 'bartan-time',
  alfaaz_ehsaas: 'alfaaz-ehsaas',
  hostel_ki_raat: 'hostel-ki-raat',
  train_ki_khidki: 'train-ki-khidki',
};

/**
 * Dynamically resolves any Vibe Station from worlds.ts (including any future added stations!)
 */
export function findWorldBySlug(slug: string): ThemeWorld | undefined {
  if (!slug) return undefined;
  const clean = slug.toLowerCase().trim();
  const normalizedSlug = clean.replace(/_/g, '-');

  // 1. Check known alias
  const known = VIBE_SLUGS[clean];
  if (known) {
    const found = WORLDS.find((w) => w.id === known.worldId);
    if (found) return found;
  }

  // 2. Dynamic lookup in WORLDS catalog
  return WORLDS.find((w) => {
    const wId = w.id.toLowerCase();
    const wSlug = wId.replace(/_/g, '-');
    const wNameSlug = w.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    return wId === clean || wSlug === normalizedSlug || wNameSlug === normalizedSlug;
  });
}

export function getWorldSlug(world: ThemeWorld | { id: string }): string {
  return WORLD_ID_TO_SLUG[world.id] || world.id.replace(/_/g, '-');
}

/**
 * Parse current URL pathname and return route info
 */
export function parseRoute(pathname = window.location.pathname, hash = window.location.hash): RouteMeta {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  // 0. Dedicated Download Landing Route (/download, /app)
  if (cleanPath === '/download' || cleanPath === '/app') {
    return {
      isDownload: true,
      title: 'Download VybZ Music APK – Free Music App for Android Without Ads',
      description: 'Download official VybZ Music Android APK (v3.5.2 • 10.2 MB). Free music app for Android without ads, no login required, continuous background playback, and synced lyrics.',
    };
  }

  // 1. Top 25
  if (cleanPath === '/top-25' || cleanPath === '/top25') {
    return {
      category: 'trending',
      title: 'Top 25 Trending Indian Songs Today – Listen Free Without Ads | VybZ Music',
      description: "Listen to today's official Daily Top 25 Trending Indian songs across Bollywood, Punjabi, and Pop online free without login or ads.",
    };
  }

  // 2. Vibes index
  if (cleanPath === '/vibes' || cleanPath === '/vibe') {
    return {
      category: 'vibes',
      title: '24/7 Hindi Online Radio – 90s Bollywood, Lo-Fi & Sufi Stations | VybZ Music',
      description: 'Listen to 10 curated Indian ambient vibe radio stations online free without login: Chai Tapri, Deluxe 90s Salon, Corporate Majdoor Hindi Lo-Fi, Sufi Sukoon, Monsoon Baarish & more.',
    };
  }

  // 3. Specific Vibe route (/vibes/:slug or /vibe/:slug)
  if (cleanPath.startsWith('/vibes/') || cleanPath.startsWith('/vibe/')) {
    const slug = cleanPath.split('/')[2];
    const world = findWorldBySlug(slug);
    if (world) {
      const known = VIBE_SLUGS[slug] || VIBE_SLUGS[world.id];
      return {
        category: 'vibes',
        vibeSlug: slug,
        worldId: world.id,
        title: known?.title || `${world.name} Radio – ${world.tagline || world.subtitle || 'Ambient Indian Vibe'} | VybZ Music`,
        description: known?.desc || `Stream ${world.name} ambient vibe radio on VybZ Music. 100% ad-free with zero buffer.`,
      };
    }

    const formatted = formatSlugToTitle(slug);
    return {
      category: 'vibes',
      vibeSlug: slug,
      title: `${formatted} Radio – Curated Indian Vibe Station | VybZ Music`,
      description: `Listen to ${formatted} vibe radio station on VybZ Music. 100% ad-free with zero buffer.`,
    };
  }

  // 4. Artists index
  if (cleanPath === '/artists') {
    return {
      category: 'artists',
      title: '50 Popular Bollywood & Punjabi Artists – Top 20 Hits Each | VybZ Music',
      description: 'Discover 50 legendary Indian artists including Arijit Singh, Pritam, A.R. Rahman, Shreya Ghoshal, Diljit Dosanjh, and more on VybZ Music.',
    };
  }

  // 5. Specific Artist (also check legacy #artist/id hash)
  if (cleanPath.startsWith('/artist/')) {
    const artistId = cleanPath.replace('/artist/', '').trim();
    return {
      category: 'artists',
      artistId,
      title: `${formatSlugToTitle(artistId)} – Top 20 Songs & Hits | VybZ Music`,
      description: `Stream top 20 verified hit songs by ${formatSlugToTitle(artistId)} on VybZ Music. 100% ad-free with zero buffer.`,
    };
  }

  if (hash.startsWith('#artist/')) {
    const artistId = hash.replace('#artist/', '').trim();
    return {
      category: 'artists',
      artistId,
      title: `${formatSlugToTitle(artistId)} – Top 20 Songs & Hits | VybZ Music`,
      description: `Stream top 20 verified hit songs by ${formatSlugToTitle(artistId)} on VybZ Music. 100% ad-free with zero buffer.`,
    };
  }

  // 6. Playlists
  if (cleanPath === '/playlists') {
    return {
      category: 'playlists',
      title: 'My Playlists – Custom Indian Music Mixes | VybZ Music',
      description: 'Create and organize your favorite Bollywood, Punjabi, and Retro playlists on VybZ Music.',
    };
  }

  // 7. Liked songs
  if (cleanPath === '/liked') {
    return {
      category: 'favorites',
      title: 'Liked Songs – Favorite Indian Tracks | VybZ Music',
      description: 'Your personal collection of liked songs and favorite tracks on VybZ Music.',
    };
  }

  // 8. Legal & Information Routes
  if (cleanPath === '/about') {
    return {
      legalTab: 'about',
      title: 'About VybZ Music – Indian Ambient Mood & Vibe Discovery Platform',
      description: 'Discover the story behind VybZ Music. Born for cutting chai tapris, hostel midnight jams, and monsoon rain nostalgia. 10 ambient vibe stations, 100% ad-free.',
    };
  }

  if (cleanPath === '/faq') {
    return {
      legalTab: 'faq',
      title: 'FAQ & Supported Devices | VybZ Music Help Center',
      description: 'Frequently asked questions about VybZ Music. Learn how to stream 100% free with zero ads, install the Android background audio APK, and setup on iPhone or PC.',
    };
  }

  if (cleanPath === '/privacy') {
    return {
      legalTab: 'privacy',
      title: 'Privacy Policy | VybZ Music Platform Transparency',
      description: 'Read the official VybZ Music Privacy Policy. We do not sell user data. Your playlists and history are stored locally on your device.',
    };
  }

  if (cleanPath === '/terms') {
    return {
      legalTab: 'terms',
      title: 'Terms of Service | VybZ Music Player Guidelines',
      description: 'Official Terms of Service for VybZ Music. Learn about non-commercial personal usage guidelines and YouTube API platform compliance.',
    };
  }

  if (cleanPath === '/dmca' || cleanPath === '/disclaimer') {
    return {
      legalTab: 'disclaimer',
      title: 'DMCA & Content Disclaimer | VybZ Music Rights & Attribution',
      description: 'Official DMCA copyright and content attribution disclaimer for VybZ Music. All media is streamed via official YouTube IFrame API. Contact: vybzmusic7@gmail.com.',
    };
  }

  // 8. Custom direct route (e.g. /chai-tapri or /example)
  const directSlug = cleanPath.replace(/^\//, '').trim();
  if (directSlug) {
    const directWorld = findWorldBySlug(directSlug);
    if (directWorld) {
      return {
        category: 'vibes',
        vibeSlug: directSlug,
        worldId: directWorld.id,
        title: `${directWorld.name} Radio – ${directWorld.tagline || 'Ambient Indian Vibe'} | VybZ Music`,
        description: `Stream ${directWorld.name} on VybZ Music. 100% ad-free with zero buffer.`,
      };
    }

    const formatted = formatSlugToTitle(directSlug);
    return {
      category: 'all',
      title: `${formatted} | VybZ Music`,
      description: `Explore ${formatted} on VybZ Music – Indian Music Player & Ambient Vibe Hub.`,
    };
  }

  // 9. Default Home
  return {
    category: 'all',
    title: 'VybZ Music – Free Music App Without Ads | Chai Tapri & Desi Vibe Radio',
    description: "Step into India's most nostalgic free music app without ads — tune into Garam Chai Tapri retro classics, Deluxe 90s Salon cassette hits, Hostel Ki Raat 2 AM Maggi jams, and Train Ki Khidki safar melodies, plus Top 25 hits & 50+ artists online without login.",
  };
}

export function formatSlugToTitle(slug: string): string {
  if (!slug) return 'VybZ Music';
  return slug
    .split(/[-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Update browser URL, title, and meta tags seamlessly without page reload
 */
export function navigateTo(path: string, options: { replace?: boolean } = {}) {
  const currentPath = window.location.pathname;
  if (currentPath !== path || window.location.hash.startsWith('#artist/')) {
    if (options.replace) {
      window.history.replaceState({ path }, '', path);
    } else {
      window.history.pushState({ path }, '', path);
    }
  }

  const route = parseRoute(path, window.location.hash);
  document.title = route.title;

  const descMeta = document.querySelector('meta[name="description"]');
  if (descMeta) {
    descMeta.setAttribute('content', route.description);
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', route.title);

  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute('content', route.description);

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', `https://vybzmusic.online${path}`);

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute('href', `https://vybzmusic.online${path === '/' ? '/' : path}`);

  // Dispatch custom navigation event for reactive components
  window.dispatchEvent(new CustomEvent('app-route-change', { detail: { path, route } }));
}
