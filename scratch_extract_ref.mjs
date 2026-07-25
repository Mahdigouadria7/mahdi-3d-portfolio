import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import path from 'path';

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const inputPath = path.join(process.cwd(), 'public', 'models', 'Enregistrement 2026-07-25 154611.mp4');
const outputDir = `C:\\Users\\Mega Pc\\.gemini\\antigravity-ide\\brain\\46902c93-f377-4855-8830-70d339ccc030`;

console.log("Extracting frames from reference video:", inputPath);

ffmpeg(inputPath)
  .on('end', () => {
    console.log("✅ Frames extracted successfully!");
  })
  .on('error', (err) => {
    console.error("❌ Extraction error:", err);
  })
  .screenshots({
    count: 6,
    folder: outputDir,
    filename: 'ref_frame_%i.jpg'
  });
