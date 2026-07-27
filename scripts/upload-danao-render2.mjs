import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function run() {
  console.log("=== CHECKING DANAO RENDERS ON DISK ===");
  const possiblePaths = [
    'public/models/Danao content/Project Content/6render.png',
    'public/models/Danao content/Project Content/render6.png',
    'public/models/Danao content/Project Content/render_6.png',
    'public/models/Danao content/Project Content/render 6.png',
    'public/models/Danao content/Model/Textures/danao Label/Base Color/Apple Danao.png',
    'public/models/Danao content/Model/Textures/danao Label/Base Color/peche dnao.png'
  ];

  for (const p of possiblePaths) {
    const full = path.resolve(p);
    if (fs.existsSync(full)) {
      console.log(`FOUND: ${p} (${(fs.statSync(full).size/(1024*1024)).toFixed(2)} MB)`);
      const result = await cloudinary.uploader.upload(full, {
        folder: 'portfolio/danao/renders',
        public_id: 'danao_render_pass_2',
        resource_type: 'image',
        overwrite: true
      });
      console.log(`[UPLOADED SUCCESS] -> ${result.secure_url}`);
      return;
    }
  }
  console.log("None of the explicit paths found.");
}

run().catch(console.error);
