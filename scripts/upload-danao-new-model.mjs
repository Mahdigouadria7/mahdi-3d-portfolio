import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const modelPath = path.resolve(process.cwd(), 'public/models/Danao model.glb');

async function run() {
  console.log("Uploading public/models/Danao model.glb to Cloudinary...");
  if (!fs.existsSync(modelPath)) {
    console.error("File not found:", modelPath);
    return;
  }

  const result = await cloudinary.uploader.upload(modelPath, {
    folder: 'portfolio/danao/models',
    public_id: 'danao_model_main',
    resource_type: 'raw',
    overwrite: true,
    invalidate: true
  });

  console.log(`[SUCCESS MODEL] -> ${result.secure_url}`);
}

run().catch(console.error);
