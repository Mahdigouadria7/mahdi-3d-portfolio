import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function uploadFile(filePath, folder, resourceType = 'video') {
  if (!fs.existsSync(filePath)) {
    console.log(`[NOT FOUND] ${filePath}`);
    return null;
  }
  const fileName = path.basename(filePath);
  const publicId = fileName.replace(/\.[^/.]+$/, "").replace(/\s+/g, "_");
  console.log(`Uploading ${fileName} (${(fs.statSync(filePath).size/(1024*1024)).toFixed(2)} MB)...`);
  try {
    const result = await cloudinary.uploader.upload_large(filePath, {
      folder,
      public_id: publicId,
      resource_type: resourceType,
      chunk_size: 6000000,
      overwrite: true,
      invalidate: true
    });
    console.log(`[SUCCESS] ${fileName} -> ${result.secure_url}`);
    return result.secure_url;
  } catch (err) {
    console.error(`[FAILED] ${fileName}:`, err.message);
    return null;
  }
}

async function run() {
  console.log("=== CHECKING AND UPLOADING ALL MEDIA TO CLOUDINARY ===");

  // Danao Videos
  const danaoDir = path.resolve('public/models/Danao content/Project Content/compressed');
  if (fs.existsSync(danaoDir)) {
    const files = fs.readdirSync(danaoDir);
    for (const f of files) {
      if (f.endsWith('.mp4') || f.endsWith('.mkv')) {
        await uploadFile(path.join(danaoDir, f), 'portfolio/danao/videos', 'video');
      }
    }
  }

  // Danup Videos
  const danupDir = path.resolve('public/models/danup content/Videos');
  if (fs.existsSync(danupDir)) {
    const files = fs.readdirSync(danupDir);
    for (const f of files) {
      if (f.endsWith('.mp4')) {
        await uploadFile(path.join(danupDir, f), 'portfolio/danup/videos', 'video');
      }
    }
  }
}

run().catch(console.error);
