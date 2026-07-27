import https from 'https';

const renderUrls = [
  'https://res.cloudinary.com/zu63qo7h/image/upload/v1785166627/portfolio/danao/renders/shwrsec2ravagb9revpz.png',
  'https://res.cloudinary.com/zu63qo7h/image/upload/v1785167355/portfolio/danao/renders/render_6.png',
  'https://res.cloudinary.com/zu63qo7h/image/upload/portfolio/danao/renders/render_6.png',
  'https://res.cloudinary.com/zu63qo7h/image/upload/v1785166618/portfolio/danao/renders/tc1nmxmdqz4gnxeakq4i.png'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`[${res.statusCode}] ${url}`);
      resolve(res.statusCode);
    }).on('error', () => resolve(500));
  });
}

async function run() {
  console.log("=== TESTING DANAO RENDER URLS ===");
  for (const u of renderUrls) {
    await checkUrl(u);
  }
}

run();
