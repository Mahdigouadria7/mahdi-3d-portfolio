import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const phoneModelPath = path.resolve(process.cwd(), 'public/models/new Samsung models separated/S25 Utlra.glb');
const penModelPath = path.resolve(process.cwd(), 'public/models/new Samsung models separated/SPen.glb');

async function uploadModel(filePath, publicId) {
  console.log(`Uploading ${filePath} to Cloudinary...`);
  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    return null;
  }

  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'portfolio/samsung/models',
    public_id: publicId,
    resource_type: 'raw',
    overwrite: true,
    invalidate: true
  });

  console.log(`[SUCCESS MODEL] ${publicId} -> ${result.secure_url}`);
  return result.secure_url;
}

async function run() {
  await uploadModel(phoneModelPath, 's25_ultra_separated');
  await uploadModel(penModelPath, 'spen_separated');
}

run().catch(console.error);
