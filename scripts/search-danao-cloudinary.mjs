import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function run() {
  console.log("=== SEARCHING ALL CLOUDINARY ASSETS MATCHING DANAO OR GLB ===");

  const searchRes = await cloudinary.search
    .expression('danao OR glb')
    .sort_by('created_at', 'desc')
    .max_results(50)
    .execute();

  for (const item of searchRes.resources) {
    console.log(`[${item.resource_type}/${item.format}] ${item.created_at} | ID: ${item.public_id} -> ${item.secure_url}`);
  }
}

run().catch(console.error);
