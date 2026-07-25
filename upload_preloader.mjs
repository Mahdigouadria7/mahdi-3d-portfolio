import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

cloudinary.config({
  cloud_name: 'zu63qo7h',
  api_key: '848386478238113',
  api_secret: 'zDCBoWK18DQZ2cXlNJ8Kz_t-FOc',
  secure: true
});

const localFilePath = path.join(process.cwd(), 'public', 'models', '65c10d4f965fc573342449.mp4');

async function uploadPreloader() {
  console.log("Uploading preloader video to Cloudinary...");
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      public_id: "portfolio/preloader_animation",
      resource_type: "video",
      overwrite: true,
    });
    
    console.log("✅ Preloader Video Uploaded Successfully!");
    console.log("URL:", result.secure_url);
  } catch (error) {
    console.error("❌ Upload failed:", error);
  }
}

uploadPreloader();
