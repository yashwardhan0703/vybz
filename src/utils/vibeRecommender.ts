import { TOP_25_TRENDING_INDIAN } from '../data/trendingSongs';
import { ARTISTS_CATALOG } from '../data/artistsData';
import type { QueueTrack } from '../hooks/useYouTube';

export interface VibeCluster {
  id: string;
  name: string;
  keywords: string[];
  peerArtistNames: string[];
}

export const VIBE_CLUSTERS: Record<string, VibeCluster> = {
  haryanvi: {
    id: 'haryanvi',
    name: 'Desi Haryanvi Hits',
    keywords: [
      'haryanvi', 'masoom sharma', 'dhanda nyoliwala', 'bintu pabra', 'shiva choudhary',
      'ajay hooda', 'raju punjabi', 'pranjal dahiya', 'sumit parta', 'amanraj',
      'gulzaar chhaniwala', 'amit saini rohtakiya', 'mor haryanvi', 'gem tunes haryanvi',
      'sarwang', 'sihag', 'nav haryanvi', 'folk station'
    ],
    peerArtistNames: []
  },
  bhojpuri: {
    id: 'bhojpuri',
    name: 'Bhojpuri Superhits',
    keywords: [
      'bhojpuri', 'pawan singh', 'khesari', 'khesari lal', 'shilpi raj', 'silpi raj',
      'akshara singh', 'pramod premi', 'arvind akela', 'kallu', 'wave music', 'bhojpuriya'
    ],
    peerArtistNames: []
  },
  bhakti_devotional: {
    id: 'bhakti_devotional',
    name: 'Bhakti & Devotional',
    keywords: [
      'bhajan', 'aarti', 'chalisa', 'krishna', 'shiva', 'ram ', 'hanuman',
      'mata rani', 't-series bhakti', 'devotional', 'katha'
    ],
    peerArtistNames: []
  },
  golden_vintage: {
    id: 'golden_vintage',
    name: '50s-70s Golden Vintage Classics',
    keywords: [
      'lata', 'mangeshkar', 'mohammed rafi', 'rafi', 'kishore kumar', 'mukesh', 'asha bhosle',
      'hemant kumar', 'manna dey', 'talat', 'meena kumari', 'madan mohan', 'shankar jaikishan',
      's.d. burman', 'sd burman', 'dil ek mandir', 'lag ja gale', 'ajeeb dastan', 'ruk ja raat',
      'mera saaya', 'chaudhvin', 'kabhi kabhie', 'pal pal dil', 'old hindi', 'vintage',
      'classic', 'purane gane', '196', '195', '197', 'black & white'
    ],
    peerArtistNames: ['Lata Mangeshkar', 'Mohammed Rafi', 'Kishore Kumar']
  },
  indie_sukoon: {
    id: 'indie_sukoon',
    name: 'Acoustic Sukoon & Indie Chill',
    keywords: [
      'anuv jain', 'prateek kuhad', 'kasoor', 'baarishein', 'husn', 'alag aasmaan',
      'gul', 'jo tum mere ho', 'choo lo', 'the local train', 'zaeden', 'jasleen royal',
      'heeriye', 'kho gaye', 'lo-fi', 'lofi', 'acoustic', 'chill', 'sukoon', 'indie'
    ],
    peerArtistNames: ['Anuv Jain', 'Jasleen Royal', 'Amit Trivedi']
  },
  party_hiphop: {
    id: 'party_hiphop',
    name: 'Desi Hip-Hop & Club Party',
    keywords: [
      'honey singh', 'badshah', 'shubh', 'anirudh', 'diljit', 'karan aujla', 'raftaar',
      'bohemia', 'imran khan', 'divine', 'emiway', 'dino james', 'ikka', 'blue eyes',
      'brown rang', 'cheques', 'baller', 'jugnu', 'dj waley', 'hukum', 'party', 'beat',
      'one bottle down', 'desi kalakaar', 'tauba tauba', 'satisfya', 'dopamine'
    ],
    peerArtistNames: ['Yo Yo Honey Singh', 'Badshah', 'Shubh', 'Anirudh Ravichander']
  },
  punjabi_swag: {
    id: 'punjabi_swag',
    name: 'Punjabi Swag & Drill',
    keywords: [
      'sidhu moose wala', 'sidhu moosewala', 'ap dhillon', 'gurinder gill', 'shubh',
      'karan aujla', 'amrit maan', 'so high', 'brown munde', 'with you', 'excuses',
      'punjabi', 'drill', 'jatt', 'swag'
    ],
    peerArtistNames: ['Shubh', 'Badshah']
  },
  nostalgia_90s: {
    id: 'nostalgia_90s',
    name: '90s Melodic Romance',
    keywords: [
      'kumar sanu', 'alka yagnik', 'udit narayan', 'sonu nigam', 'abhijeet', 'anuradha',
      'nadeem shravan', 'jatin lalit', 'ddlj', 'mohra', 'dhadkan', 'pardesi', 'kuch kuch',
      'tip tip', 'chura ke', 'dheere dheere', 'sandese aate hai', 'kal ho naa ho', '90s'
    ],
    peerArtistNames: ['Kumar Sanu', 'Alka Yagnik', 'Udit Narayan', 'Sonu Nigam']
  },
  sufi_soul: {
    id: 'sufi_soul',
    name: 'Sufi & Devotional Soul',
    keywords: [
      'ar rahman', 'a.r. rahman', 'rahman', 'nusrat', 'rahat fateh', 'kailash kher',
      'kun faya', 'tajdar', 'chaiyya', 'jai ho', 'namo namo', 'iktara', 'sufi', 'maula',
      'qawwali', 'khwaja', 'piya re'
    ],
    peerArtistNames: ['A.R. Rahman', 'Rahat Fateh Ali Khan', 'Nusrat Fateh Ali Khan']
  },
  english_pop: {
    id: 'english_pop',
    name: 'International Pop & Hits',
    keywords: [
      'taylor swift', 'ed sheeran', 'billie eilish', 'the weeknd', 'weeknd', 'drake',
      'eminem', 'coldplay', 'dua lipa', 'justin bieber', 'charlie puth'
    ],
    peerArtistNames: []
  },
  modern_romance: {
    id: 'modern_romance',
    name: 'Modern Melodic Romance & Heartbreak',
    keywords: [
      'arijit', 'atif', 'kk', 'mohit chauhan', 'pritam', 'vishal mishra', 'sachet',
      'parampara', 'jubin', 'mithoon', 'armaan malik', 'kesariya', 'tum hi ho', 'channa',
      'jeena', 'pehle bhi main', 'zara sa', 'dil sambhal', 'shayad', 'hawayein', 'dua',
      'tera chehra', 'bekhayali', 'love', 'pyaar', 'ishq', 'dil'
    ],
    peerArtistNames: ['Arijit Singh', 'Atif Aslam', 'KK', 'Mohit Chauhan', 'Pritam', 'Sachet-Parampara', 'Jubin Nautiyal', 'Armaan Malik']
  }
};

// Priority order: check specific regional/vintage/indie/party first before broad romance
const CLUSTER_PRIORITY: (keyof typeof VIBE_CLUSTERS)[] = [
  'haryanvi',
  'bhojpuri',
  'bhakti_devotional',
  'golden_vintage',
  'indie_sukoon',
  'punjabi_swag',
  'party_hiphop',
  'nostalgia_90s',
  'sufi_soul',
  'english_pop',
  'modern_romance'
];

export function detectVibeCluster(title: string, artist: string): VibeCluster | null {
  const combined = `${title} ${artist}`.toLowerCase();
  for (const cKey of CLUSTER_PRIORITY) {
    const cluster = VIBE_CLUSTERS[cKey];
    if (cluster.keywords.some((kw) => combined.includes(kw))) {
      return cluster;
    }
  }
  return null;
}

const STOP_WORDS = new Set([
  'video',
  'official',
  'lyrical',
  'lyrics',
  'audio',
  'song',
  'songs',
  'full',
  'hd',
  'remix',
  'slowed',
  'reverb',
  'feat',
  'music',
  'mms',
  'track',
  'from',
  'version',
  'lofi',
  'original',
  'soundtrack',
  'ost',
  'tseries',
  'zeemusic',
  'sonymusic',
  'status',
  'mashup',
  'edit',
  '4k',
  '8k',
  'film',
  'movie',
]);

// Clean title words to detect duplicates
function extractCoreKeywords(t: string): string[] {
  return t
    .toLowerCase()
    .replace(/\(.*?\)/g, ' ')
    .replace(/\[.*?\]/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
}

// Detect if candidate is the exact same song upload/cover
export function isDuplicateSong(candidateTitle: string, currentTitle: string): boolean {
  const w1 = extractCoreKeywords(candidateTitle);
  const w2 = extractCoreKeywords(currentTitle);
  if (w1.length === 0 || w2.length === 0) return false;

  const prefix1 = w1.slice(0, 2).join(' ');
  const prefix2 = w2.slice(0, 2).join(' ');
  if (prefix1.length > 4 && prefix1 === prefix2) return true;

  const shared = w1.filter((w) => w2.includes(w));
  if (shared.length >= Math.min(w1.length, w2.length) * 0.5) return true;
  return false;
}

// Universal 50/50 Smart Queue Generator (Same Artist Hits + Peer Artist Hits)
export function getLocalVibeTracks(currentId: string, title: string, artist: string): QueueTrack[] {
  const lowTitle = (title || '').toLowerCase();
  const lowArtist = (artist || '').toLowerCase();

  // 1. Identify matched seed artist from our 50-artist catalog
  const matchedArtist = ARTISTS_CATALOG.find((a) => {
    const aLow = a.name.toLowerCase();
    return lowArtist.includes(aLow) || aLow.includes(lowArtist) || lowTitle.includes(aLow);
  });

  // 2. Identify Vibe Cluster & Peer Artists
  const cluster = detectVibeCluster(title, artist);

  // If no artist match in catalog AND cluster has no static peers (e.g. Haryanvi, Bhojpuri, Bhakti),
  // DO NOT poison queue with random Bollywood tracks! Return empty so live API populates it.
  if (!matchedArtist && (!cluster || cluster.peerArtistNames.length === 0)) {
    return [];
  }

  // 3. Bucket A: Same Artist Tracks (50%)
  const sameArtistTracks: QueueTrack[] = [];
  if (matchedArtist) {
    for (const st of matchedArtist.topTracks) {
      if (st.id === currentId || isDuplicateSong(st.title, title)) continue;
      sameArtistTracks.push({
        id: st.id,
        title: st.title,
        artist: matchedArtist.name,
        thumbnail: `https://img.youtube.com/vi/${st.id}/mqdefault.jpg`,
        duration: st.duration,
      });
      if (sameArtistTracks.length >= 6) break;
    }
  }

  // 4. Bucket B: Peer Artists in the Same Vibe Cluster (50%)
  const peerTracks: QueueTrack[] = [];
  const targetPeers = (cluster?.peerArtistNames || []).filter(
    (pName) => !matchedArtist || pName.toLowerCase() !== matchedArtist.name.toLowerCase()
  );

  for (const pName of targetPeers) {
    const pArtist = ARTISTS_CATALOG.find((a) => a.name.toLowerCase() === pName.toLowerCase());
    if (pArtist) {
      let addedForThisPeer = 0;
      for (const st of pArtist.topTracks) {
        if (st.id === currentId || isDuplicateSong(st.title, title)) continue;
        if (sameArtistTracks.some((s) => s.id === st.id) || peerTracks.some((p) => p.id === st.id)) continue;
        peerTracks.push({
          id: st.id,
          title: st.title,
          artist: pArtist.name,
          thumbnail: `https://img.youtube.com/vi/${st.id}/mqdefault.jpg`,
          duration: st.duration,
        });
        addedForThisPeer++;
        if (addedForThisPeer >= 2) break; // 2 signature hits per peer
      }
    }
  }

  // 5. Interleave 50/50: [SameArtist, Peer, SameArtist, Peer...]
  const results: QueueTrack[] = [];
  const maxLen = Math.max(sameArtistTracks.length, peerTracks.length);
  for (let i = 0; i < maxLen; i++) {
    if (i < sameArtistTracks.length) results.push(sameArtistTracks[i]);
    if (i < peerTracks.length) results.push(peerTracks[i]);
  }

  // 6. Supplement if total is low (< 8 tracks) and cluster has keywords
  if (results.length < 8 && cluster) {
    TOP_25_TRENDING_INDIAN.forEach((t) => {
      if (t.id === currentId || isDuplicateSong(t.title, title) || results.some((r) => r.id === t.id)) return;
      const comb = `${t.title} ${t.singers} ${t.movie}`.toLowerCase();
      if (cluster.keywords.some((kw) => comb.includes(kw))) {
        results.push({
          id: t.id,
          title: `${t.title} (${t.movie})`,
          artist: t.singers,
          thumbnail: t.thumbnail,
          duration: t.duration,
        });
      }
    });
  }

  return results.slice(0, 15);
}

export function isCandidateMatchingCluster(
  candidateTitle: string,
  candidateArtist: string,
  cluster: VibeCluster | null
): boolean {
  if (!cluster) return true;
  const combined = `${candidateTitle} ${candidateArtist}`.toLowerCase();

  if (cluster.id === 'haryanvi') {
    const hindiRomanceBlocklist = [
      'arijit', 'atif aslam', 'kk', 'mohit chauhan', 'pritam', 'lata mangeshkar', 'tamasha',
      'tum hi ho', 'channa mereya', 'kesariya', 'lo-fi', 'ghazal', 'jagjit'
    ];
    if (hindiRomanceBlocklist.some((b) => combined.includes(b))) return false;
    return true;
  }

  if (cluster.id === 'bhojpuri') {
    const nonBhojpuriBlocklist = [
      'arijit', 'atif aslam', 'kk', 'mohit chauhan', 'pritam', 'lata mangeshkar', 'taylor swift'
    ];
    if (nonBhojpuriBlocklist.some((b) => combined.includes(b))) return false;
    return true;
  }

  if (cluster.id === 'bhakti_devotional') {
    const secularPartyBlocklist = [
      'party', 'club', 'drill', 'rap', 'hip hop', 'item song', 'sharab', 'peg', 'daaru'
    ];
    if (secularPartyBlocklist.some((b) => combined.includes(b))) return false;
    return true;
  }

  if (cluster.id === 'golden_vintage') {
    const modernBlocklist = [
      'tamasha', 'arijit', 'badshah', 'ap dhillon', 'pritam', 'shreya ghoshal', 'jubin',
      'neha kakkar', 'tony kakkar', 'raftaar', 'mc stan', 'emiway', 'seedhe maut',
      'darshan raval', 'anuv jain', 'prateek kuhad', 'diljit', 'karan aujla', 'shubh',
      'kabir singh', 'animal', 'brahmastra', 'jawan', 'pathaan', 'pushpa', 'reels',
      'shorts', '2020', '2021', '2022', '2023', '2024', '2025', 'jab we met'
    ];
    if (modernBlocklist.some((m) => combined.includes(m))) return false;
    return true;
  }

  if (cluster.id === 'party_hiphop' || cluster.id === 'punjabi_swag') {
    const slowBlocklist = [
      'bhajan', 'aarti', 'ghazal', 'sad version', 'unplugged', 'lata mangeshkar',
      'jagjit singh', 'mukesh', 'old hindi', 'purane'
    ];
    if (slowBlocklist.some((m) => combined.includes(m))) return false;
    return true;
  }

  if (cluster.id === 'indie_sukoon') {
    const loudBlocklist = ['party', 'dj', 'remix', 'drill', 'hip hop', 'hip-hop', 'trap'];
    if (loudBlocklist.some((m) => combined.includes(m))) return false;
    return true;
  }

  return true;
}

// Fetch YouTube Up Next related songs with duplicate song filter & verified local blending
export async function fetchRelatedVibeQueue(
  videoId: string,
  title: string,
  artist: string
): Promise<QueueTrack[]> {
  const cluster = detectVibeCluster(title, artist);
  try {
    const res = await fetch(
      `/api/related?v=${encodeURIComponent(videoId)}&title=${encodeURIComponent(title)}&artist=${encodeURIComponent(artist || '')}`
    );
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data.results) && data.results.length > 0) {
        const queue: QueueTrack[] = [];
        for (const item of data.results) {
          if (item.id === videoId || isDuplicateSong(item.title, title)) continue;
          if (!isCandidateMatchingCluster(item.title, item.artist, cluster)) continue;
          queue.push({
            id: item.id,
            title: item.title,
            artist: item.artist,
            thumbnail: item.thumbnail || `https://img.youtube.com/vi/${item.id}/mqdefault.jpg`,
          });
        }
        if (queue.length >= 8) {
          return queue.slice(0, 15);
        } else if (queue.length > 0) {
          // Blend in verified local tracks to guarantee a full, rich 50/50 queue
          const localTracks = getLocalVibeTracks(videoId, title, artist);
          const existingIds = new Set([videoId, ...queue.map((q) => q.id)]);
          for (const lt of localTracks) {
            if (!existingIds.has(lt.id)) {
              queue.push(lt);
              existingIds.add(lt.id);
            }
          }
          return queue.slice(0, 15);
        }
      }
    }
  } catch {
    // API endpoint unavailable (e.g. offline) -> fallback below
  }

  // Fallback to local smart vibe classification
  return getLocalVibeTracks(videoId, title, artist);
}
