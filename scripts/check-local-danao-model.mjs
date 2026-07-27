import fs from 'fs';
import path from 'path';

const localPath = path.resolve('public/models/Danao model.glb');
if (fs.existsSync(localPath)) {
  const stats = fs.statSync(localPath);
  console.log(`[LOCAL MODEL EXISTS] Size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB, Last Modified: ${stats.mtime.toISOString()}`);
} else {
  console.log('[LOCAL MODEL NOT FOUND] path:', localPath);
}
