import { v2 as cloudinary } from 'cloudinary';
import https from 'https';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve(res.statusCode);
    }).on('error', () => resolve(500));
  });
}

async function listAll() {
  console.log("=== LISTING ALL CLOUDINARY ASSETS IN PORTFOLIO ===");

  const videoRes = await cloudinary.api.resources({
    type: 'upload',
    resource_type: 'video',
    prefix: 'portfolio/',
    max_results: 100
  });

  const rawRes = await cloudinary.api.resources({
    type: 'upload',
    resource_type: 'raw',
    prefix: 'portfolio/',
    max_results: 100
  });

  console.log("\n--- VERIFIED VIDEO URLS ---");
  for (const item of videoRes.resources) {
    const url = item.secure_url;
    const status = await checkUrl(url);
    console.log(`[VIDEO ${status}] ${item.public_id} -> ${url}`);
  }

  console.log("\n--- VERIFIED RAW URLS ---");
  for (const item of rawRes.resources) {
    const url = item.secure_url;
    const status = await checkUrl(url);
    console.log(`[RAW ${status}] ${item.public_id} -> ${url}`);
  }
}

listAll().catch(console.error);
