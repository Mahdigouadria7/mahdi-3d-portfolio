import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function uploadFile(filePath, publicId) {
  if (!fs.existsSync(filePath)) {
    console.error("NOT FOUND:", filePath);
    return;
  }
  console.log(`Uploading ${publicId} (${(fs.statSync(filePath).size/(1024*1024)).toFixed(2)} MB)...`);
  const result = await cloudinary.uploader.upload_large(filePath, {
    folder: 'portfolio/danao/videos',
    public_id: publicId,
    resource_type: 'video',
    chunk_size: 6000000,
    overwrite: true,
    invalidate: true
  });
  console.log(`[SUCCESS] ${publicId} -> ${result.secure_url}`);
}

async function run() {
  const v1 = path.resolve('public/models/Danao content/Project Content/compressed/Danao_CGI_Video.mp4');
  const v2 = path.resolve('public/models/Danao content/Project Content/compressed/Danao_Island_CGI.mp4');

  await uploadFile(v1, 'Danao_CGI_Video');
  await uploadFile(v2, 'Danao_Island_CGI');
}

run().catch(console.error);
