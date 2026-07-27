import { v2 as cloudinary } from 'cloudinary';
import https from 'https';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function run() {
  console.log("=== GETTING EXACT CLOUDINARY URLS FOR DANAO VIDEOS ===");
  const res = await cloudinary.api.resources({
    type: 'upload',
    resource_type: 'video',
    prefix: 'portfolio/danao/videos',
    max_results: 50
  });

  for (const item of res.resources) {
    console.log(`ID: ${item.public_id} -> ${item.secure_url}`);
  }
}

run().catch(console.error);
