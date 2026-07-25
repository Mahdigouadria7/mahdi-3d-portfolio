import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { execFile } from 'child_process';
import path from 'path';

const ffmpegPath = ffmpegInstaller.path;
const inputPath = path.join(process.cwd(), 'public', 'models', 'Enregistrement 2026-07-25 154611.mp4');
const outputDir = `C:\\Users\\Mega Pc\\.gemini\\antigravity-ide\\brain\\46902c93-f377-4855-8830-70d339ccc030`;

console.log("Extracting 12 detailed frames from reference video...");

const args = [
  '-i', inputPath,
  '-vf', 'fps=2',
  path.join(outputDir, 'seq_frame_%02d.jpg')
];

execFile(ffmpegPath, args, (error, stdout, stderr) => {
  if (error) {
    console.error("Extraction error:", error);
  } else {
    console.log("✅ Detailed frames extracted successfully!");
  }
});
