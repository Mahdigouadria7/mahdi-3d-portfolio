import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

// Parse .env.local manually
const envPath = path.resolve('.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, val] = line.trim().split('=');
    if (key && val) {
      process.env[key] = val;
    }
  });
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'zu63qo7h',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const zflipPath = path.resolve('out/models/Z flip 6 model.glb');

async function run() {
  console.log("Checking file at:", zflipPath);
  if (!fs.existsSync(zflipPath)) {
    console.error("File does not exist!");
    return;
  }

  const stats = fs.statSync(zflipPath);
  console.log(`File exists! Size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);

  console.log("Uploading to Cloudinary...");
  const result = await cloudinary.uploader.upload(zflipPath, {
    folder: 'portfolio/samsung/models',
    public_id: 'zflip6_model',
    resource_type: 'raw',
    overwrite: true,
    invalidate: true
  });

  console.log("[SUCCESS ZFLIP MODEL URL]:", result.secure_url);
}

run().catch(console.error);
