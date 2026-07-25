import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

cloudinary.config({
  cloud_name: 'zu63qo7h',
  api_key: '848386478238113',
  api_secret: 'zDCBoWK18DQZ2cXlNJ8Kz_t-FOc',
  secure: true
});

const localFilePath = `C:\\Users\\Mega Pc\\.gemini\\antigravity-ide\\brain\\46902c93-f377-4855-8830-70d339ccc030\\media__1784987715871.jpg`;

async function uploadPortrait() {
  console.log("Uploading Mahdi portrait to Cloudinary...");
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      public_id: "portfolio/mahdi_portrait",
      resource_type: "image",
      overwrite: true,
    });
    
    console.log("✅ Portrait Uploaded Successfully!");
    console.log("URL:", result.secure_url);
  } catch (error) {
    console.error("❌ Upload failed:", error);
  }
}

uploadPortrait();
