import ffmpegPath from "ffmpeg-static";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { v2 as cloudinary } from 'cloudinary';

const envFile = fs.readFileSync(path.resolve('.env.local'), 'utf-8');
envFile.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    process.env[match[1].trim()] = match[2].trim();
  }
});

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const videos = [
  {
    input: path.resolve("public/models/samsung Videos/Samsung 3D ZFlip 6.mp4"),
    output: path.resolve("public/models/samsung Videos/compressed_Samsung_3D_ZFlip_6.mp4"),
    name: "Samsung 3D ZFlip 6",
    publicId: "portfolio/samsung/videos/samsung_3d_zflip_6"
  },
  {
    input: path.resolve("public/models/samsung Videos/Samsung CGi Final.mp4"),
    output: path.resolve("public/models/samsung Videos/compressed_Samsung_CGi_Final.mp4"),
    name: "Samsung CGi Final",
    publicId: "portfolio/samsung/videos/samsung_cgi_final"
  }
];

async function run() {
  console.log("Compressing Samsung project videos using ffmpeg-static...");

  for (const v of videos) {
    if (!fs.existsSync(v.output)) {
      console.log(`Starting compression for: ${v.name}`);
      // scale to 1080x1920, crf 28 for good compression
      const cmd = `"${ffmpegPath}" -y -i "${v.input}" -map 0:v:0 -map 0:a:0? -vf "scale=1080:1920,format=yuv420p" -vcodec libx264 -crf 28 -preset fast -acodec aac -b:a 128k "${v.output}"`;
      execSync(cmd, { stdio: "inherit", maxBuffer: 1024 * 1024 * 100 });
      
      const inSize = (fs.statSync(v.input).size / (1024 * 1024)).toFixed(2);
      const outSize = (fs.statSync(v.output).size / (1024 * 1024)).toFixed(2);
      console.log(`[COMPRESSED ${v.name}] ${inSize} MB -> ${outSize} MB`);
    } else {
      console.log(`[SKIPPED COMPRESSION] ${v.output} already exists.`);
    }

    console.log(`Uploading ${v.name} to Cloudinary...`);
    try {
      const result = await cloudinary.uploader.upload(v.output, {
        resource_type: 'video',
        public_id: v.publicId,
        overwrite: true
      });
      console.log(`Uploaded! URL: ${result.secure_url}`);
    } catch (e) {
      console.error('Error uploading:', e.message || e);
    }
  }
}

run();
