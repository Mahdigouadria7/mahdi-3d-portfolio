import fs from 'fs';
import path from 'path';

function findAndDeleteVideos(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      findAndDeleteVideos(fullPath);
    } else if (file.name.endsWith('.mp4') || file.name.endsWith('.mkv')) {
      console.log(`[DELETING HEAVY LOCAL VIDEO] ${fullPath} (${(fs.statSync(fullPath).size/(1024*1024)).toFixed(2)} MB)`);
      try {
        fs.unlinkSync(fullPath);
      } catch (e) {
        console.error(`Failed to delete ${fullPath}:`, e.message);
      }
    }
  }
}

console.log("=== REMOVING ALL HEAVY LOCAL VIDEO FILES FROM PUBLIC/ ===");
findAndDeleteVideos(path.resolve('public'));
console.log("=== CLEANUP COMPLETE ===");
