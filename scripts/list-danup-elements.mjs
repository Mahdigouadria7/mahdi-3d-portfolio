import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function run() {
  console.log("=== DANUP ELEMENTS AND DANAO RENDERS ===");

  const res = await cloudinary.api.resources({
    type: 'upload',
    resource_type: 'image',
    prefix: 'portfolio/danup/elements',
    max_results: 100
  });

  console.log("\n--- DANUP ELEMENTS ---");
  for (const item of res.resources) {
    console.log(`${item.public_id} -> ${item.secure_url}`);
  }

  const res2 = await cloudinary.api.resources({
    type: 'upload',
    resource_type: 'image',
    prefix: 'portfolio/danao/renders',
    max_results: 100
  });

  console.log("\n--- DANAO RENDERS ---");
  for (const item of res2.resources) {
    console.log(`${item.public_id} -> ${item.secure_url}`);
  }

  const res3 = await cloudinary.api.resources({
    type: 'upload',
    resource_type: 'image',
    prefix: 'portfolio/danao',
    max_results: 100
  });

  console.log("\n--- DANAO ALL IMAGES ---");
  for (const item of res3.resources) {
    console.log(`${item.public_id} -> ${item.secure_url}`);
  }
}

run().catch(console.error);
