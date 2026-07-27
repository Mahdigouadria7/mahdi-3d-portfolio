import https from 'https';

const newUrls = [
  'https://res.cloudinary.com/zu63qo7h/video/upload/v1785172226/danao_motion_island_xcxa6y.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/v1785172129/danao_cgi_street_e1oibf.mp4'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`[${res.statusCode}] ${url}`);
      resolve(res.statusCode);
    }).on('error', (e) => {
      console.log(`[ERROR] ${url}: ${e.message}`);
      resolve(500);
    });
  });
}

async function run() {
  console.log("=== TESTING NEW DANAO VIDEO URLS ===");
  for (const u of newUrls) {
    await checkUrl(u);
  }
}

run();
