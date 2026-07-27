import https from 'https';

const urls = [
  'https://res.cloudinary.com/zu63qo7h/video/upload/v1785168656/portfolio/danup/videos/st1.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/v1785168710/portfolio/danup/videos/st_3.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/v1785168731/portfolio/danup/videos/CTA_1.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/v1785168599/portfolio/danup/videos/Danup_Boost_CGI.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/v1785168566/portfolio/danup/videos/Danup_Maldives_CGI.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/v1785168603/portfolio/danup/videos/Danup_x_ALA_3d_Video.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/danao/videos/Danao_CGI_Video.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/danao/videos/Danao_Island_CGI.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/v1785167351/portfolio/danao/videos/Danao_Motion_3D.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/v1785167347/portfolio/danao/videos/Forest_Danao.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/v1785167337/portfolio/danao/videos/Dj_Danao.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/v1785167323/portfolio/danao/videos/Danao_Loop_SciFi_2.mp4'
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
  console.log("=== VERIFYING EXACT CLOUDINARY VERSIONED URLS ===");
  for (const u of urls) {
    await checkUrl(u);
  }
}

run();
