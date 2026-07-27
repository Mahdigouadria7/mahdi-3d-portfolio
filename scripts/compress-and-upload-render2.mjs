import { v2 as cloudinary } from 'cloudinary';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const inputPath = path.resolve('public/models/Danao content/Project Content/6render.png');
const outputPath = path.resolve('public/models/Danao content/Project Content/6render_compressed.jpg');

async function run() {
  console.log("=== COMPRESSING AND UPLOADING DANAO RENDER PASS 2 ===");

  if (!fs.existsSync(inputPath)) {
    console.error("Input file not found:", inputPath);
    return;
  }

  // Compress using sharp to high quality JPG (~1.5 MB)
  await sharp(inputPath)
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 90 })
    .toFile(outputPath);

  const stats = fs.statSync(outputPath);
  console.log(`Compressed file size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);

  // Upload to Cloudinary
  const result = await cloudinary.uploader.upload(outputPath, {
    folder: 'portfolio/danao/renders',
    public_id: 'danao_render_pass_2',
    resource_type: 'image',
    overwrite: true,
    invalidate: true
  });

  console.log(`[SUCCESS] danao_render_pass_2 -> ${result.secure_url}`);

  // Delete temp compressed file from disk
  fs.unlinkSync(outputPath);
}

run().catch(console.error);
