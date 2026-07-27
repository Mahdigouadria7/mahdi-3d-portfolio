import https from 'https';
import fs from 'fs';

const pageContent = fs.readFileSync('src/app/projects/[slug]/page.tsx', 'utf8');

// Extract all http/https URLs from page.tsx
const urlRegex = /(https:\/\/res\.cloudinary\.com\/[^\s"']+)/g;
const urls = Array.from(new Set(pageContent.match(urlRegex) || []));

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`[${res.statusCode}] ${url}`);
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      console.log(`[ERROR ${e.message}] ${url}`);
      resolve({ url, status: 500 });
    });
  });
}

async function run() {
  console.log(`=== VERIFYING ALL ${urls.length} MEDIA URLS IN PAGE.TSX ===`);
  let errors = 0;
  for (const u of urls) {
    const res = await checkUrl(u);
    if (res.status !== 200) errors++;
  }
  console.log(`\n=== RESULTS: ${urls.length - errors}/${urls.length} URLS ARE 200 OK (${errors} ERRORS) ===`);
}

run();
