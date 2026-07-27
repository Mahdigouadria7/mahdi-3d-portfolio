import https from 'https';

const videoUrls = [
  // Danup
  'https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/danup/videos/st1.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/danup/videos/st_3.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/danup/videos/st%203.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/danup/videos/CTA_1.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/danup/videos/Danup_Boost_CGI.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/danup/videos/Danup_Maldives_CGI.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/danup/videos/Danup_x_ALA_3d_Video.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/danup/videos/Danup%20x%20ALA%203d%20Video.mp4',
  // Danao
  'https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/danao/videos/Danao_CGI_Video.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/danao/videos/Danao_Island_CGI.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/danao/videos/Danao_Motion_3D.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/danao/videos/Forest_Danao.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/danao/videos/Dj_Danao.mp4',
  'https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/danao/videos/Danao_Loop_SciFi_2.mp4'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`[${res.statusCode}] ${url}`);
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      console.log(`[ERROR] ${url}: ${e.message}`);
      resolve({ url, status: 500 });
    });
  });
}

async function run() {
  console.log("=== TESTING CLOUDINARY VIDEO URL RESPONSES ===");
  for (const url of videoUrls) {
    await checkUrl(url);
  }
}

run();
