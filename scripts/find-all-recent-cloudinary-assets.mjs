import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function run() {
  console.log("=== SEARCHING ALL RECENT CLOUDINARY UPLOADS ===");

  const searchRaw = await cloudinary.search
    .expression('resource_type:raw')
    .sort_by('created_at', 'desc')
    .max_results(30)
    .execute();

  console.log("\nRECENT RAW RESOURCES:");
  for (const item of searchRaw.resources) {
    console.log(`[${item.created_at}] ${item.public_id} -> ${item.secure_url}`);
  }

  const searchVideo = await cloudinary.search
    .expression('resource_type:video')
    .sort_by('created_at', 'desc')
    .max_results(20)
    .execute();

  console.log("\nRECENT VIDEO RESOURCES:");
  for (const item of searchVideo.resources) {
    console.log(`[${item.created_at}] ${item.public_id} -> ${item.secure_url}`);
  }
}

run().catch(console.error);
