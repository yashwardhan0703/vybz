const fs = require('fs');

const content = fs.readFileSync('src/data/artistsData.ts', 'utf8');
const jsonStart = content.indexOf('export const ARTISTS_CATALOG: Artist[] = [');
const rawArray = content.substring(jsonStart + 'export const ARTISTS_CATALOG: Artist[] = '.length).trim();
// Strip trailing semicolon if any
const cleanJson = rawArray.replace(/;\s*$/, '');
const artists = JSON.parse(cleanJson);

console.log('Total artists:', artists.length);
let countDiff = 0;
artists.forEach(a => {
  const count = a.topTracks ? a.topTracks.length : 0;
  if (count !== 20) {
    console.log(`${a.name} (${a.id}): ${count} songs`);
    countDiff++;
  }
});
console.log('Total artists with != 20 songs:', countDiff);
