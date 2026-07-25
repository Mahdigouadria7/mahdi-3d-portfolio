import fs from 'fs';
import path from 'path';

const PROJECT_ROOT = process.cwd();
const mapFile = path.join(PROJECT_ROOT, 'scratch_cloudinary_map.json');

let urlMap = {};
if (fs.existsSync(mapFile)) {
  urlMap = JSON.parse(fs.readFileSync(mapFile, 'utf8'));
}

/**
 * Returns mobile-optimized Cloudinary URLs (downscaled width, auto format WebP/AVIF, auto compression)
 */
function getMobileOptimizedUrl(url) {
  if (!url || typeof url !== 'string') return url;

  // Map local path if present
  let targetUrl = urlMap[url] || url;

  if (targetUrl.includes('cloudinary.com')) {
    if (targetUrl.includes('/image/upload/')) {
      // Inject f_auto,q_auto,w_1000 for mobile images
      if (!targetUrl.includes('/f_auto')) {
        return targetUrl.replace('/image/upload/', '/image/upload/f_auto,q_auto,w_1000/');
      }
    } else if (targetUrl.includes('/video/upload/')) {
      // Inject f_auto,q_auto,w_720 for mobile videos
      if (!targetUrl.includes('/f_auto')) {
        return targetUrl.replace('/video/upload/', '/video/upload/f_auto,q_auto,w_720/');
      }
    }
  }
  return targetUrl;
}

// 1. Update src/app/projects/[slug]/page.tsx
const pagePath = path.join(PROJECT_ROOT, 'src/app/projects/[slug]/page.tsx');
let pageContent = fs.readFileSync(pagePath, 'utf8');

// Replace all local asset paths with Cloudinary optimized URLs
for (const [localUrl, cdnUrl] of Object.entries(urlMap)) {
  const optimizedUrl = getMobileOptimizedUrl(cdnUrl);
  pageContent = pageContent.replaceAll(localUrl, optimizedUrl);
  pageContent = pageContent.replaceAll(cdnUrl, optimizedUrl);
}

// Optimize video elements for mobile network & memory saving
// Add preload="metadata" to prevent mobile browser from downloading all 5 videos at once
pageContent = pageContent.replaceAll('autoPlay \n                                        loop \n                                        muted \n                                        playsInline', 'autoPlay \n                                        loop \n                                        muted \n                                        playsInline \n                                        preload="metadata"');

pageContent = pageContent.replaceAll('autoPlay \n                                    loop \n                                    muted \n                                    playsInline', 'autoPlay \n                                    loop \n                                    muted \n                                    playsInline \n                                    preload="metadata"');

fs.writeFileSync(pagePath, pageContent);
console.log('✅ Updated src/app/projects/[slug]/page.tsx with mobile-optimized Cloudinary URLs & video preloading');

// 2. Update src/data/projects.ts
const projectsPath = path.join(PROJECT_ROOT, 'src/data/projects.ts');
let projectsContent = fs.readFileSync(projectsPath, 'utf8');

for (const [localUrl, cdnUrl] of Object.entries(urlMap)) {
  const optimizedUrl = getMobileOptimizedUrl(cdnUrl);
  projectsContent = projectsContent.replaceAll(localUrl, optimizedUrl);
  projectsContent = projectsContent.replaceAll(cdnUrl, optimizedUrl);
}

fs.writeFileSync(projectsPath, projectsContent);
console.log('✅ Updated src/data/projects.ts with mobile-optimized Cloudinary URLs');
