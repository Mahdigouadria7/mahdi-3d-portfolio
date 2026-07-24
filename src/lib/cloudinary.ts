/**
 * Cloudinary CDN Media Helper Utility
 * 
 * Provides automated Cloudinary URL generation with on-the-fly format optimization (f_auto),
 * quality compression (q_auto), and responsive video/image handling.
 */

// Replace with your Cloudinary Cloud Name (found in your Cloudinary Dashboard)
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "demo";

// Base Cloudinary URLs
const BASE_IMAGE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload`;
const BASE_VIDEO_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/video/upload`;
const BASE_RAW_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/raw/upload`;

export interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: "auto" | "auto:good" | "auto:eco" | number;
  crop?: "scale" | "fill" | "fit" | "crop";
}

/**
 * Returns a fully optimized Cloudinary Image URL with auto-WebP/AVIF formatting and compression.
 */
export function getCloudinaryImageUrl(publicId: string, options: CloudinaryOptions = {}): string {
  if (publicId.startsWith("http://") || publicId.startsWith("https://")) {
    return publicId; // Already a full URL
  }

  const { width, height, quality = "auto", crop = "scale" } = options;
  const transforms: string[] = ["f_auto", `q_${quality}`];

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width || height) transforms.push(`c_${crop}`);

  const transformString = transforms.join(",");
  const cleanId = publicId.replace(/^\//, "");

  return `${BASE_IMAGE_URL}/${transformString}/${cleanId}`;
}

/**
 * Returns a Cloudinary Video URL with auto-compression and web streaming optimization.
 */
export function getCloudinaryVideoUrl(publicId: string): string {
  if (publicId.startsWith("http://") || publicId.startsWith("https://")) {
    return publicId;
  }

  const cleanId = publicId.replace(/^\//, "");
  // f_auto,q_auto ensures optimal WebM/MP4 codec selection per browser
  return `${BASE_VIDEO_URL}/f_auto,q_auto/${cleanId}`;
}

/**
 * Returns a Cloudinary RAW URL for 3D GLB/GLTF models.
 */
export function getCloudinaryModelUrl(publicId: string): string {
  if (publicId.startsWith("http://") || publicId.startsWith("https://")) {
    return publicId;
  }

  const cleanId = publicId.replace(/^\//, "");
  return `${BASE_RAW_URL}/${cleanId}`;
}
