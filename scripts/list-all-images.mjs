import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function run() {
  console.log("=== ALL CLOUDINARY IMAGE ASSETS ===");

  const res = await cloudinary.api.resources({
    type: 'upload',
    resource_type: 'image',
    prefix: 'portfolio/',
    max_results: 200
  });

  for (const item of res.resources) {
    console.log(`${item.public_id} -> ${item.secure_url}`);
  }
}

run().catch(console.error);
