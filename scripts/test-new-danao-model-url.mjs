import https from 'https';

const modelUrl = 'https://res.cloudinary.com/zu63qo7h/image/upload/v1785172780/Danao_model_c64anv.glb';

https.get(modelUrl, (res) => {
  console.log(`[MODEL HTTP STATUS] ${res.statusCode} Content-Type: ${res.headers['content-type']}`);
  let size = 0;
  res.on('data', chunk => size += chunk.length);
  res.on('end', () => console.log(`[MODEL SIZE] ${(size / (1024 * 1024)).toFixed(2)} MB`));
});
