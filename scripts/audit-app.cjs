const fs = require('fs');

const tsContent = fs.readFileSync('src/data/worlds.ts', 'utf8');
const match = tsContent.match(/export const THEMES: ThemeWorld\[\] = (\[[\s\S]*?\n\];)/);
if (!match) {
  console.log('Could not find THEMES array');
  process.exit(1);
}

const fn = new Function(`return ${match[1]}`);
const worlds = fn();

console.log('=== 1. VIBE STATIONS AUDIT ===');
console.log('Total Vibe Worlds:', worlds.length);
worlds.forEach(w => {
  const tracks = w.tracks || [];
  console.log(`- ${w.name} (${w.id}): ${tracks.length} tracks, themeColor: ${w.themeColor}`);
  if (tracks.length !== 25) {
    console.log(`  WARNING: Expected 25 tracks, found ${tracks.length}!`);
  }
  // Check for duplicate video IDs in station
  const trackIds = tracks.map(t => t.id);
  const duplicates = trackIds.filter((item, index) => trackIds.indexOf(item) !== index);
  if (duplicates.length > 0) {
    console.log(`  WARNING: Duplicate track IDs in "${w.name}":`, duplicates);
  }
});

// 2. Artists Audit
const artistsContent = fs.readFileSync('src/data/artistsData.ts', 'utf8');
const jsonStart = artistsContent.indexOf('export const ARTISTS_CATALOG: Artist[] = [');
const rawArray = artistsContent.substring(jsonStart + 'export const ARTISTS_CATALOG: Artist[] = '.length).trim().replace(/;\s*$/, '');
const artists = JSON.parse(rawArray);

console.log('\n=== 2. ARTISTS AUDIT ===');
console.log('Total Artists:', artists.length);
let artistsNot20 = 0;
artists.forEach(a => {
  const count = a.topTracks ? a.topTracks.length : 0;
  if (count !== 20) {
    console.log(`- ${a.name} (${a.id}): ${count} tracks (NOT 20)`);
    artistsNot20++;
  }
  // check duplicate IDs in artist
  const tIds = (a.topTracks || []).map(t => t.id);
  const duplicates = tIds.filter((item, index) => tIds.indexOf(item) !== index);
  if (duplicates.length > 0) {
    console.log(`  WARNING: Duplicate track IDs for artist "${a.name}":`, duplicates);
  }
});
if (artistsNot20 === 0) {
  console.log('✓ All 50 artists have exactly 20 tracks.');
}

// 3. Check isGenuineTrack filter in UniqueIndianPlayer.tsx
function isGenuineTrack(song, artistName) {
  if (!song || !song.title || !song.id) return false;
  const t = song.title.toLowerCase();
  const a = (artistName || '').toLowerCase();
  if (/\bhit\s+\d+\b/i.test(t) || t.includes('essential hit') || (song.album && song.album.toLowerCase().includes('essential hits'))) return false;
  const crossArtistSongs = {
    'kun faya kun': ['a.r. rahman', 'mohit chauhan', 'javed ali'],
    'chaiyya chaiyya': ['a.r. rahman', 'sukhwinder singh'],
    'tum hi ho': ['arijit singh', 'mithoon'],
  };
  for (const [forbiddenTitle, allowedArtists] of Object.entries(crossArtistSongs)) {
    if (t.includes(forbiddenTitle)) {
      const allowed = allowedArtists.some((aa) => a.includes(aa));
      if (!allowed) return false;
    }
  }
  return true;
}

console.log('\n=== 3. CHECKING FILTERING BY isGenuineTrack ===');
artists.forEach(a => {
  const genuine = a.topTracks.filter(t => isGenuineTrack(t, a.name));
  if (genuine.length !== 20) {
    console.log(`- Artist "${a.name}": Catalog has ${a.topTracks.length}, but isGenuineTrack filtered it down to ${genuine.length}!`);
    const filteredOut = a.topTracks.filter(t => !isGenuineTrack(t, a.name));
    filteredOut.forEach(fo => console.log(`    Filtered out song: "${fo.title}"`));
  }
});

// 4. Check Navigation & Slugs consistency
console.log('\n=== 4. NAVIGATION SLUGS & ROUTING AUDIT ===');
const navContent = fs.readFileSync('src/utils/navigation.ts', 'utf8');
const sitemapContent = fs.readFileSync('scripts/generate-sitemap.js', 'utf8');
const workerContent = fs.readFileSync('worker.js', 'utf8');

worlds.forEach(w => {
  if (!navContent.includes(w.id)) {
    console.log(`- Vibe ${w.id} MISSING in navigation.ts!`);
  }
  if (!sitemapContent.includes(w.id)) {
    console.log(`- Vibe ${w.id} MISSING in generate-sitemap.js!`);
  }
  if (!workerContent.includes(w.id)) {
    console.log(`- Vibe ${w.id} MISSING in worker.js metadata!`);
  }
});

// Check if all artist IDs are clean slugs
artists.forEach(a => {
  if (/[^a-z0-9-]/.test(a.id)) {
    console.log(`- Artist ID "${a.id}" contains unusual characters!`);
  }
});
