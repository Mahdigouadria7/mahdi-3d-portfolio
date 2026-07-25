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
    path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity-ide\\brain\\46902c93-f377-4855-8830-70d339ccc030\\.tempmediaStorage\\media_46902c93-f377-4855-8830-70d339ccc030_1784991116582.jpg'
  },
  {
    name: 'blender',
    path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity-ide\\brain\\46902c93-f377-4855-8830-70d339ccc030\\.tempmediaStorage\\media_46902c93-f377-4855-8830-70d339ccc030_1784991131193.jpg'
  },
  {
    name: 'zbrush',
    path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity-ide\\brain\\46902c93-f377-4855-8830-70d339ccc030\\.tempmediaStorage\\media_46902c93-f377-4855-8830-70d339ccc030_1784991135041.jpg'
  },
  {
    name: 'threejs',
    path: 'C:\\Users\\Mega Pc\\.gemini\\antigravity-ide\\brain\\46902c93-f377-4855-8830-70d339ccc030\\.tempmediaStorage\\media_46902c93-f377-4855-8830-70d339ccc030_1784991139197.jpg'
  }
];

async function run() {
  for (const item of filesToUpload) {
    try {
      const res = await cloudinary.uploader.upload(item.path, {
        folder: 'portfolio/software_icons',
        public_id: item.name,
        overwrite: true,
      });
      console.log(`Uploaded ${item.name}: ${res.secure_url}`);
    } catch (err) {
      console.error(`Failed ${item.name}:`, err);
    }
  }
}

run();
