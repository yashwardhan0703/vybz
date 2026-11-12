import { WORLDS, type ThemeWorld } from '../data/worlds';
import type { PlayerCategory } from '../store/playerStore';

export interface RouteMeta {
  category: PlayerCategory;
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
    title: 'Chai Tapri Radio – Garam Chai & Purane Retro Gaane | VybZ Music',
    desc: 'Listen to 25 nostalgic Chai Tapri retro songs on VybZ Music. Kishore Kumar, Rafi, and warm desi acoustic vibes.',
  },
  'sufi-sukoon': {
    worldId: 'sufi_ghazal',
    name: 'Sufi & Sukoon Radio',
    title: 'Sufi & Sukoon Radio – Roohani Ghazal & Qawwali Hits | VybZ Music',
    desc: 'Stream 25 soul-soothing Sufi ghazals and qawwalis by Nusrat Fateh Ali Khan and Jagjit Singh on VybZ Music.',
  },
  'deluxe-salon': {
    worldId: 'deluxe_salon',
    name: 'Deluxe 90s Salon Radio',
    title: 'Deluxe 90s Salon Radio – Haircut, Champi & Retro Bollywood | VybZ Music',
    desc: '25 retro 90s Bollywood classics for cutting, shaving, and champi vibes on Deluxe Salon Radio by VybZ Music.',
  },
  'monsoon-baarish': {
    worldId: 'monsoon_barish',
    name: 'Monsoon Baarish Radio',
    title: 'Monsoon Baarish Radio – Rain & Romantic Bollywood Hits | VybZ Music',
    desc: 'Stream 25 romantic monsoon and rain Bollywood songs on VybZ Music. 100% ad-free with zero buffer.',
  },
  'monsoon-barish': {
    worldId: 'monsoon_barish',
    name: 'Monsoon Baarish Radio',
    title: 'Monsoon Baarish Radio – Rain & Romantic Bollywood Hits | VybZ Music',
    desc: 'Stream 25 romantic monsoon and rain Bollywood songs on VybZ Music. 100% ad-free with zero buffer.',
  },
  'highway-dhaba': {
    worldId: 'highway_dhaba',
    name: 'Highway Dhaba Radio',
    title: 'Late Night Highway Dhaba Radio – Punjabi & Retro Hits | VybZ Music',
    desc: 'Daler Mehndi, high-energy Punjabi hits, and late-night highway truck radio on VybZ Music.',
  },
  'corporate-chill': {
    worldId: 'corporate_chill',
    name: 'Corporate Chill Radio',
    title: 'Corporate Chill Radio – Lo-Fi Indian Beats for Work & Study | VybZ Music',
    desc: 'Indian lo-fi chill beats and soothing instrumental melodies for coding, study, and focus on VybZ Music.',
  },
  'bartan-time': {
    worldId: 'bartan_time',
    name: 'Bartan Time Radio',
    title: 'Bartan Time Radio – Jhaadu, Pocha & High Energy Dance Hits | VybZ Music',
    desc: 'Zingaat, London Thumakda, and 25 energetic Bollywood dance hits for daily chores on VybZ Music.',
  },
};

// Aliases for underscore IDs
VIBE_SLUGS['chai_tapri'] = VIBE_SLUGS['chai-tapri'];
VIBE_SLUGS['sufi_ghazal'] = VIBE_SLUGS['sufi-sukoon'];
VIBE_SLUGS['deluxe_salon'] = VIBE_SLUGS['deluxe-salon'];
VIBE_SLUGS['monsoon_baarish'] = VIBE_SLUGS['monsoon-baarish'];
VIBE_SLUGS['monsoon_barish'] = VIBE_SLUGS['monsoon-baarish'];
VIBE_SLUGS['highway_dhaba'] = VIBE_SLUGS['highway-dhaba'];
VIBE_SLUGS['corporate_chill'] = VIBE_SLUGS['corporate-chill'];
VIBE_SLUGS['bartan_time'] = VIBE_SLUGS['bartan-time'];

export const WORLD_ID_TO_SLUG: Record<string, string> = {
  chai_tapri: 'chai-tapri',
  sufi_ghazal: 'sufi-sukoon',
  deluxe_salon: 'deluxe-salon',
  monsoon_baarish: 'monsoon-baarish',
  monsoon_barish: 'monsoon-baarish',
  highway_dhaba: 'highway-dhaba',
  corporate_chill: 'corporate-chill',
  bartan_time: 'bartan-time',
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

  // 1. Top 25
  if (cleanPath === '/top-25' || cleanPath === '/top25') {
    return {
      category: 'trending',
      title: 'Top 25 Trending Indian Songs Today | VybZ Music',
      description: "Stream today's official Daily Top 25 Trending Indian songs across Bollywood, Punjabi, and Pop. 100% ad-free with zero buffer.",
    };
  }

  // 2. Vibes index
  if (cleanPath === '/vibes' || cleanPath === '/vibe') {
    return {
      category: 'vibes',
      title: '7 Curated Indian Mood & Vibe Radio Stations | VybZ Music',
      description: 'Explore nostalgic Indian ambient vibe radio stations: Chai Tapri, Deluxe Salon, Monsoon Baarish, Sufi Sukoon, and more on VybZ Music.',
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
    title: 'VybZ – Indian Music Player, Top 25 Hits & Ambient Vibe',
    description: 'Ad-free Indian music player featuring Daily Top 25 Trending Indian songs, 50+ iconic Bollywood & Punjabi artists, Chai Tapri ambient vibe radio, and synchronized lyrics.',
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
