import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Read worlds.ts dynamically
const worldsContent = fs.readFileSync(path.join(rootDir, 'src/data/worlds.ts'), 'utf8');
const worldMatches = [...worldsContent.matchAll(/id:\s*['"]([a-zA-Z0-9_-]+)['"],\s*name:\s*['"]([^'"]+)['"]/g)];
const worlds = worldMatches.map((m) => ({
  id: m[1],
  slug: m[1].replace(/_/g, '-'),
  name: m[2],
}));

// 2. Read artistsData.ts dynamically
const artistsContent = fs.readFileSync(path.join(rootDir, 'src/data/artistsData.ts'), 'utf8');
const artistMatches = [...artistsContent.matchAll(/"id":\s*"([^"]+)",\s*"name":\s*"([^"]+)"/g)];
const artists = artistMatches.map((m) => ({
  id: m[1],
  name: m[2],
}));

console.log(`[Sitemap Generator] Found ${worlds.length} Vibe Stations and ${artists.length} Artists.`);

const today = new Date().toISOString().split('T')[0];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Core Main App Pages -->
  <url>
    <loc>https://vybzmusic.online/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://vybzmusic.online/top-25</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.95</priority>
  </url>
  <url>
    <loc>https://vybzmusic.online/vibes</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://vybzmusic.online/artists</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://vybzmusic.online/playlists</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://vybzmusic.online/liked</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Curated Mood & Vibe Stations (Auto-synced from worlds.ts) -->
`;

for (const w of worlds) {
  xml += `  <url>
    <loc>https://vybzmusic.online/vibes/${w.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.85</priority>
  </url>\n`;
}

xml += `\n  <!-- Popular Artists (Auto-synced from artistsData.ts) -->\n`;

for (const a of artists) {
  xml += `  <url>
    <loc>https://vybzmusic.online/artist/${a.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
}

xml += `</urlset>\n`;

const sitemapPath = path.join(rootDir, 'public/sitemap.xml');
fs.writeFileSync(sitemapPath, xml);
console.log(`[Sitemap Generator] Successfully generated ${sitemapPath} with ${6 + worlds.length + artists.length} URLs!`);

