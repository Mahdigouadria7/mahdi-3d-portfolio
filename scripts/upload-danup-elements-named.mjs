import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// The elements folder
const elementsDir = path.resolve('public/models/danup content/Elements');

async function uploadFile(filePath, folder) {
  const name = path.basename(filePath);
  // Build a stable public_id from the original filename
  const publicId = name.replace(/\.[^.]+$/, '')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_-]/g, '');
  console.log(`Uploading ${name} as ${publicId}...`);
  const result = await cloudinary.uploader.upload(filePath, {
    folder,
    public_id: publicId,
    overwrite: true,
    invalidate: true,
    resource_type: 'image'
  });
  console.log(`[OK] ${result.public_id} -> ${result.secure_url}`);
  return { name, url: result.secure_url };
}

async function run() {
  if (!fs.existsSync(elementsDir)) {
    console.error('Elements folder not found:', elementsDir);
    return;
  }

  const files = fs.readdirSync(elementsDir).filter(f => /\.(png|jpg|webp)$/i.test(f));
  console.log(`Found ${files.length} element files`);

  const results = [];
  for (const f of files) {
    const res = await uploadFile(path.join(elementsDir, f), 'portfolio/danup/elements_named');
    results.push(res);
  }

  console.log('\n=== UPLOAD COMPLETE - MAPPING ===');
  for (const r of results) {
    console.log(`${r.name} -> ${r.url}`);
  }
}

run().catch(console.error);
