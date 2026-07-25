/**
 * Upload Remaining Media to Cloudinary
 * Uploads Trionda Ball Project, BallHittingnet sprite frames, 
 * Man_with_glowing_eyes frames, and Trionda GLB model.
 */
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: 'zu63qo7h',
  api_key: '848386478238113',
  api_secret: 'zDCBoWK18DQZ2cXlNJ8Kz_t-FOc',
  secure: true
});

const PUBLIC_DIR = path.join(process.cwd(), 'public', 'models');

// ── Upload single file ────────────────────────────────────────────────────────
async function uploadFile(localPath, publicId, resourceType = 'image') {
  try {
    // Check if it already exists
    try {
      await cloudinary.api.resource(publicId, { resource_type: resourceType });
      console.log(`  ✓ already exists: ${publicId}`);
      return null;
    } catch (_) {
      // doesn't exist, proceed with upload
    }
    
    const result = await cloudinary.uploader.upload(localPath, {
      public_id: publicId,
      resource_type: resourceType,
      overwrite: false,
      folder: '', // publicId already includes full path
    });
    console.log(`  ↑ uploaded: ${publicId}`);
    return result.secure_url;
  } catch (err) {
    console.error(`  ✗ FAILED: ${publicId} — ${err.message}`);
    return null;
  }
}

// ── Upload an entire folder of files ─────────────────────────────────────────
async function uploadFolder(localFolder, cloudinaryFolder, resourceType = 'image') {
  const files = fs.readdirSync(localFolder);
  const results = {};
  for (const file of files) {
    const localPath = path.join(localFolder, file);
    if (!fs.statSync(localPath).isFile()) continue;
    const ext = path.extname(file).toLowerCase();
    const name = path.basename(file, ext).replace(/[^a-zA-Z0-9_-]/g, '_').toLowerCase();
    const publicId = `${cloudinaryFolder}/${name}`;
    const url = await uploadFile(localPath, publicId, resourceType);
    if (url) results[file] = url;
  }
  return results;
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n═══════════════════════════════════════════════════');
  console.log(' CLOUDINARY UPLOAD — REMAINING ASSETS');
  console.log('═══════════════════════════════════════════════════\n');

  // 1. Trionda Ball Project — images
  console.log('\n[1/5] Trionda Ball Project — IMAGES');
  const triondaImages = [
    { file: 'render 3D Ballenhanced.webp', id: 'portfolio/trionda/render_ball_enhanced' },
    { file: 'Viewport vs render 3D Ball.webp', id: 'portfolio/trionda/viewport_vs_render' },
    { file: 'Viewport  3D Ball.webp', id: 'portfolio/trionda/viewport_ball' },
    { file: 'render 3D Ball.webp', id: 'portfolio/trionda/render_ball' },
    { file: 'render 3D Ball 2.webp', id: 'portfolio/trionda/render_ball_2' },
    { file: 'render 3D Ball3 .webp', id: 'portfolio/trionda/render_ball_3' },
    { file: 'Staduim Mockup.webp', id: 'portfolio/trionda/stadium_mockup' },
    { file: 'Street Billboard_1.webp', id: 'portfolio/trionda/street_billboard' },
    { file: 'Image Cover Ball.webp', id: 'portfolio/trionda/cover_ball' },
  ];
  const triondaFolder = path.join(PUBLIC_DIR, 'Trionda Ball Project');
  for (const { file, id } of triondaImages) {
    await uploadFile(path.join(triondaFolder, file), id, 'image');
  }

  // 2. Trionda Ball Project — videos
  console.log('\n[2/5] Trionda Ball Project — VIDEOS');
  const triondaVideos = [
    { file: 'Transition2.mp4', id: 'portfolio/trionda/transition2' },
    { file: 'balls Rolling.mp4', id: 'portfolio/trionda/balls_rolling' },
    { file: 'ball Tunisia.mp4', id: 'portfolio/trionda/ball_tunisia' },
  ];
  for (const { file, id } of triondaVideos) {
    await uploadFile(path.join(triondaFolder, file), id, 'video');
  }

  // 3. Trionda 3D GLB model
  console.log('\n[3/5] Trionda GLB Model');
  const glbFolder = path.join(PUBLIC_DIR, 'WEB Design Trionda ball');
  const glbPath = path.join(glbFolder, 'World Cup Trionda Ball.glb');
  if (fs.existsSync(glbPath)) {
    await uploadFile(glbPath, 'portfolio/models/trionda_ball', 'raw');
  } else {
    console.log('  ✗ GLB file not found, skipping');
  }

  // 4. BallHittingnet sprite frames (96 frames)
  console.log('\n[4/5] BallHittingnet Sprite Frames (96 frames)');
  const ballHitFolder = path.join(PUBLIC_DIR, 'BallHittingnet');
  const ballHitFiles = fs.readdirSync(ballHitFolder).sort();
  for (const file of ballHitFiles) {
    const localPath = path.join(ballHitFolder, file);
    if (!fs.statSync(localPath).isFile()) continue;
    const name = path.basename(file, path.extname(file)).toLowerCase().replace(/[^a-z0-9_]/g, '_');
    await uploadFile(localPath, `portfolio/ballhitnet/${name}`, 'image');
  }

  // 5. Man_with_glowing_eyes frames (240 frames) — THE LANDING PAGE HERO
  console.log('\n[5/5] Man With Glowing Eyes — Hero Animation Frames (240 frames)');
  const heroFolder = path.join(PUBLIC_DIR, 'Man_with_glowing_eyes_frames');
  if (fs.existsSync(heroFolder)) {
    const heroFiles = fs.readdirSync(heroFolder).sort();
    console.log(`  Found ${heroFiles.length} frames. Starting upload...`);
    for (const file of heroFiles) {
      const localPath = path.join(heroFolder, file);
      if (!fs.statSync(localPath).isFile()) continue;
      const name = path.basename(file, path.extname(file)).toLowerCase().replace(/[^a-z0-9_]/g, '_');
      await uploadFile(localPath, `portfolio/hero_frames/${name}`, 'image');
    }
  } else {
    console.log('  ✗ Hero frames folder not found, skipping');
  }

  console.log('\n═══════════════════════════════════════════════════');
  console.log(' UPLOAD COMPLETE!');
  console.log('═══════════════════════════════════════════════════\n');
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
