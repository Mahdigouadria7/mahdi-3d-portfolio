import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const compressedDir = path.resolve(process.cwd(), 'public/models/Danao content/Project Content/compressed');

async function uploadVideos() {
  console.log("--- UPLOADING DANAO COMPRESSED VIDEOS TO CLOUDINARY ---");
  const files = fs.readdirSync(compressedDir);
  
  for (const file of files) {
    if (file.endsWith('.mp4')) {
      const filePath = path.join(compressedDir, file);
      const publicId = file.replace('.mp4', '');
      console.log(`Uploading ${file} (${(fs.statSync(filePath).size/(1024*1024)).toFixed(2)} MB)...`);
      try {
        const result = await cloudinary.uploader.upload_large(filePath, {
          folder: 'portfolio/danao/videos',
          public_id: publicId,
          resource_type: 'video',
          chunk_size: 6000000,
          overwrite: true,
        });
        console.log(`[SUCCESS VIDEO] ${file} -> ${result.secure_url}`);
      } catch (err) {
        console.error(`[ERROR VIDEO] ${file}:`, err);
      }
    }
  }

  // Also upload the compressed 6render.png
  const render6 = path.resolve(process.cwd(), 'public/models/Danao content/Project Content/6render.png');
  if (fs.existsSync(render6)) {
    console.log("Uploading compressed 6render.png...");
    const r6 = await cloudinary.uploader.upload(render6, {
      folder: 'portfolio/danao/renders',
      public_id: 'render_6',
      resource_type: 'image',
      overwrite: true
    });
    console.log(`[SUCCESS 6RENDER] -> ${r6.secure_url}`);
  }
}

uploadVideos().catch(console.error);
