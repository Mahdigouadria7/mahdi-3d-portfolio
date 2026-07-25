import { v2 as cloudinary } from 'cloudinary';
import path from 'path';

// Uses your existing Cloudinary credentials
cloudinary.config({
  cloud_name: 'zu63qo7h',
  api_key: '848386478238113',
  api_secret: 'zDCBoWK18DQZ2cXlNJ8Kz_t-FOc',
  secure: true
});

// The script assumes you place 'cv.pdf' in the root directory of the project
const localFilePath = path.join(process.cwd(), 'cv.pdf');

async function uploadCV() {
  console.log("Uploading CV to Cloudinary...");
  try {
    const result = await cloudinary.uploader.upload(localFilePath, {
      public_id: "mahdi_cv",
      // Important: PDFs are often treated as images in Cloudinary for conversion,
      // which allows us to add the fl_attachment flag to force a download.
      resource_type: "image", 
      overwrite: true,
    });
    
    console.log("✅ CV Uploaded Successfully!");
    console.log("URL:", result.secure_url);
    console.log("Download URL:", `https://res.cloudinary.com/zu63qo7h/image/upload/fl_attachment/mahdi_cv.pdf`);
    console.log("\nThe website download button is already configured to point to this URL!");
  } catch (error) {
    console.error("❌ Upload failed. Ensure you have placed a file named 'cv.pdf' in the project root directory.");
    console.error(error);
  }
}

uploadCV();
