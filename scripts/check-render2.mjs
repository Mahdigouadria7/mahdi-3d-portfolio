import https from 'https';

const u = 'https://res.cloudinary.com/zu63qo7h/image/upload/portfolio/danao/renders/danao_render_pass_2.png';

https.get(u, (res) => {
  console.log(`[STATUS] ${res.statusCode} -> ${u}`);
});
