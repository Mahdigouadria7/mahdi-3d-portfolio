import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

async function listResources() {
  console.log("--- CLOUDINARY DANAO RESOURCES ---");
  
  // List raw (GLB)
  const raw = await cloudinary.api.resources({ type: 'upload', prefix: 'portfolio/danao', resource_type: 'raw' });
  console.log("RAW:", raw.resources.map(r => ({ id: r.public_id, url: r.secure_url })));

  // List images
  const images = await cloudinary.api.resources({ type: 'upload', prefix: 'portfolio/danao', resource_type: 'image', max_results: 100 });
  console.log("IMAGES:", images.resources.map(r => ({ id: r.public_id, url: r.secure_url })));

  // List videos
  const videos = await cloudinary.api.resources({ type: 'upload', prefix: 'portfolio/danao', resource_type: 'video', max_results: 100 });
  console.log("VIDEOS:", videos.resources.map(r => ({ id: r.public_id, url: r.secure_url })));
}

listResources().catch(console.error);
