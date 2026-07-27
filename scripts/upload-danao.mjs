import { v2 as cloudinary } from 'cloudinary';
import ffmpegPath from 'ffmpeg-static';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const baseDir = path.resolve(process.cwd(), 'public/models/Danao content');
const compressedDir = path.join(baseDir, 'Project Content/compressed');

if (!fs.existsSync(compressedDir)) {
  fs.mkdirSync(compressedDir, { recursive: true });
}

async function uploadFile(filePath, folder, resourceType = 'auto', publicId = null) {
  try {
    const options = {
      folder: `portfolio/danao/${folder}`,
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
  console.log('--- STARTING DANAO COMPRESSION & CLOUDINARY UPLOAD ---');

  // 1. Compress Videos
  const rawVideos = [
    { name: 'Danao_CGI_Video.mp4', file: 'Danao CGI Video.mp4' },
    { name: 'Danao_Island_CGI.mp4', file: 'Danao Island .mp4' },
    { name: 'Danao_Motion_3D.mp4', file: 'Danao Motion 3D .mp4' },
    { name: 'Forest_Danao.mp4', file: 'Forest Danao.mp4' },
    { name: 'Dj_Danao.mp4', file: 'Dj Danao.mp4' },
    { name: 'Danao_Loop_SciFi_2.mp4', file: 'Danao Loop SciFi 2.mp4' },
  ];

  const compressedVideoPaths = [];

  for (const v of rawVideos) {
    const inputPath = path.join(baseDir, 'Project Content', v.file);
    const outputPath = path.join(compressedDir, v.name);
    compressedVideoPaths.push({ name: v.name, path: outputPath });

    if (!fs.existsSync(outputPath)) {
      console.log(`Compressing video: ${v.file}...`);
      const cmd = `"${ffmpegPath}" -y -i "${inputPath}" -map 0:v:0 -map 0:a:0 -vf "scale=1080:1920" -r 30 -vcodec libx264 -crf 24 -preset fast -acodec aac -b:a 128k "${outputPath}"`;
      try {
        execSync(cmd, { stdio: 'inherit', maxBuffer: 1024 * 1024 * 100 });
        const inSize = (fs.statSync(inputPath).size / (1024 * 1024)).toFixed(2);
        const outSize = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);
        console.log(`[COMPRESSED] ${v.file} (${inSize}MB -> ${outSize}MB)`);
      } catch (err) {
        console.error(`[COMPRESS ERROR] ${v.file}:`, err.message);
      }
    } else {
      console.log(`Already compressed: ${v.name}`);
    }
  }

  // 2. Upload GLB Model
  const glbPath = path.join(baseDir, 'Model/Danao model.glb');
  if (fs.existsSync(glbPath)) {
    console.log('Uploading Danao GLB model...');
    await uploadFile(glbPath, 'models', 'raw', 'danao_bottle_model');
  }

  // 3. Upload Textures
  const textureDirs = [
    { dir: 'Model/Textures/danao Label/Base Color', subfolder: 'textures/labels' },
    { dir: 'Model/Textures/danao Label', subfolder: 'textures/label' },
    { dir: 'Model/Textures/Lid', subfolder: 'textures/lid' },
    { dir: 'Model/Textures/Plastic', subfolder: 'textures/plastic' },
  ];

  for (const td of textureDirs) {
    const fullDirPath = path.join(baseDir, td.dir);
    if (fs.existsSync(fullDirPath)) {
      const files = fs.readdirSync(fullDirPath);
      for (const file of files) {
        const filePath = path.join(fullDirPath, file);
        if (fs.statSync(filePath).isFile()) {
          await uploadFile(filePath, td.subfolder, 'image');
        }
      }
    }
  }

  // 4. Upload Render Stills
  const projectContentFiles = fs.readdirSync(path.join(baseDir, 'Project Content'));
  for (const file of projectContentFiles) {
    if (file.endsWith('.png')) {
      const filePath = path.join(baseDir, 'Project Content', file);
      await uploadFile(filePath, 'renders', 'image');
    }
  }

  // 5. Upload Compressed Videos to Cloudinary
  for (const cv of compressedVideoPaths) {
    if (fs.existsSync(cv.path)) {
      console.log(`Uploading compressed video to Cloudinary: ${cv.name}...`);
      try {
        const result = await cloudinary.uploader.upload_large(cv.path, {
          folder: 'portfolio/danao/videos',
          public_id: cv.name.replace('.mp4', ''),
          resource_type: 'video',
          chunk_size: 6000000,
          overwrite: true,
        });
        console.log(`[SUCCESS VIDEO] ${cv.name} -> ${result.secure_url}`);
      } catch (vErr) {
        console.error(`[ERROR VIDEO UPLOAD] ${cv.name}:`, vErr);
      }
    }
  }

  console.log('--- FINISHED DANAO COMPRESSION & CLOUDINARY UPLOAD ---');
}

run();
