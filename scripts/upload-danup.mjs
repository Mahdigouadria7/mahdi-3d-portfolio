import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';


cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const baseDir = path.resolve(process.cwd(), 'public/models/danup content');

async function uploadFile(filePath, folder, resourceType = 'auto', publicId = null) {
  try {
    const options = {
      folder: `portfolio/danup/${folder}`,
      resource_type: resourceType,
      overwrite: true,
      invalidate: true
    };
    if (publicId) {
      options.public_id = publicId;
    }
    const result = await cloudinary.uploader.upload(filePath, options);
    console.log(`[SUCCESS] ${filePath} -> ${result.secure_url}`);
    return result;
  } catch (err) {
    console.error(`[ERROR] ${filePath}:`, err);
    throw err;
  }
}

async function run() {
  console.log('Starting Cloudinary Upload for Danup content...');
  
  // 1. Upload Model GLB
  const glbPath = path.join(baseDir, 'GLTF Danup/Danup ALA.glb');
  if (fs.existsSync(glbPath)) {
    console.log('Uploading GLB model...');
    await uploadFile(glbPath, 'models', 'raw', 'danup_ala_bottle');
  }

  // 2. Upload Label Base Color Textures
  const baseColorDir = path.join(baseDir, 'Textures/label/Base Color');
  const baseColorFiles = fs.readdirSync(baseColorDir);
  for (const file of baseColorFiles) {
    const filePath = path.join(baseColorDir, file);
    await uploadFile(filePath, 'textures/labels', 'image');
  }

  // 3. Upload Other Textures (Metal Lid, Plastic, Label normal/roughness)
  const textureSubdirs = ['label', 'Metal Lid', 'Plastic'];
  for (const subdir of textureSubdirs) {
    const dirPath = path.join(baseDir, 'Textures', subdir);
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const filePath = path.join(dirPath, file);
      if (fs.statSync(filePath).isFile()) {
        await uploadFile(filePath, `textures/${subdir.toLowerCase().replace(/\s+/g, '_')}`, 'image');
      }
    }
  }

  // 4. Upload Elements (Stickers)
  const elementsDir = path.join(baseDir, 'Elements');
  const elementFiles = fs.readdirSync(elementsDir);
  for (const file of elementFiles) {
    const filePath = path.join(elementsDir, file);
    await uploadFile(filePath, 'elements', 'image');
  }

  // 5. Upload Videos using upload_large for 100MB+ files
  const videosDir = path.join(baseDir, 'Videos');
  const videoFiles = fs.readdirSync(videosDir);
  for (const file of videoFiles) {
    const filePath = path.join(videosDir, file);
    console.log(`Uploading video: ${file}...`);
    try {
      const result = await cloudinary.uploader.upload_large(filePath, {
        folder: 'portfolio/danup/videos',
        resource_type: 'video',
        chunk_size: 6000000, // 6MB chunks
        overwrite: true,
      });
      console.log(`[SUCCESS VIDEO] ${file} -> ${result.secure_url}`);
    } catch (vErr) {
      console.error(`[ERROR VIDEO] ${file}:`, vErr);
    }
  }

  console.log('Finished uploading all Danup content to Cloudinary!');
}

run();
