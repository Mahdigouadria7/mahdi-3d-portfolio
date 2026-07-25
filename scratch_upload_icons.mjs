import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'zu63qo7h',
  api_key: '848386478238113',
  api_secret: 'zDCBoWK18DQZ2cXlNJ8Kz_t-FOc',
  secure: true
});

const filesToUpload = [
  {
    name: 'houdini',
    path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity-ide\\brain\\46902c93-f377-4855-8830-70d339ccc030\\media__1784992420643.jpg'
  },
  {
    name: 'blender',
    path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity-ide\\brain\\46902c93-f377-4855-8830-70d339ccc030\\media__1784992420692.png'
  },
  {
    name: 'zbrush',
    path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity-ide\\brain\\46902c93-f377-4855-8830-70d339ccc030\\media__1784992420727.png'
  },
  {
    name: 'threejs',
    path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity-ide\\brain\\46902c93-f377-4855-8830-70d339ccc030\\media__1784992420731.png'
  }
];

async function run() {
  for (const item of filesToUpload) {
    try {
      const res = await cloudinary.uploader.upload(item.path, {
        folder: 'portfolio/software_icons',
        public_id: item.name,
        overwrite: true,
        invalidate: true,
      });
      console.log(`✅ Uploaded ${item.name}: ${res.secure_url}`);
    } catch (err) {
      console.error(`Failed ${item.name}:`, err);
    }
  }
}

run();
