import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function run() {
  console.log("=== FINDING LATEST DANAO 3D GLB MODEL IN CLOUDINARY ===");

  const res = await cloudinary.api.resources({
    type: 'upload',
    resource_type: 'raw',
    max_results: 100
  });

  console.log("\nRAW ASSETS FOUND:");
  for (const item of res.resources) {
    console.log(`[RAW] ID: ${item.public_id} | Created: ${item.created_at} -> ${item.secure_url}`);
  }
}

run().catch(console.error);
