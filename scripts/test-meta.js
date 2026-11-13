import https from 'https';

const testPaths = [
  '/',
  '/top-25',
  '/vibes',
  '/vibes/chai-tapri',
  '/vibes/sufi-sukoon',
  '/vibes/corporate-majdoor',
  '/artists',
  '/artist/arijit-singh',
  '/playlists',
  '/liked'
];

async function checkMeta(path) {
  return new Promise((resolve) => {
    https.get('https://vybzmusic.online' + path, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const titleMatch = data.match(/<title>(.*?)<\/title>/);
        const descMatch = data.match(/<meta name="description" content="(.*?)"/);
        const canonMatch = data.match(/<link rel="canonical" href="(.*?)"/);
        const ogTitleMatch = data.match(/<meta property="og:title" content="(.*?)"/);
        resolve({
          path,
          status: res.statusCode,
          title: titleMatch ? titleMatch[1] : 'NONE',
          desc: descMatch ? descMatch[1] : 'NONE',
          canonical: canonMatch ? canonMatch[1] : 'NONE',
          ogTitle: ogTitleMatch ? ogTitleMatch[1] : 'NONE',
        });
      });
    });
  });
}

for (const p of testPaths) {
  const r = await checkMeta(p);
  console.log(`Path: ${r.path}`);
  console.log(`  Status: ${r.status}`);
  console.log(`  Title: ${r.title}`);
  console.log(`  Desc: ${r.desc}`);
  console.log(`  Canonical: ${r.canonical}`);
  console.log(`  OG Title: ${r.ogTitle}`);
  console.log('---');
}

