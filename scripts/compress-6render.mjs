import ffmpegPath from "ffmpeg-static";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const imgPath = path.resolve("public/models/Danao content/Project Content/6render.png");
console.log("Compressing 11.4MB image 6render.png...");

const tempPath = path.resolve("public/models/Danao content/Project Content/6render_temp.png");
const cmd = `"${ffmpegPath}" -y -i "${imgPath}" -vf "scale=1920:-1" "${tempPath}"`;
try {
  execSync(cmd, { stdio: "inherit" });
  fs.copyFileSync(tempPath, imgPath);
  fs.unlinkSync(tempPath);
  console.log("Compressed 6render.png size:", (fs.statSync(imgPath).size / (1024*1024)).toFixed(2), "MB");
} catch (e) {
  console.error("Error compressing 6render.png:", e.message);
}
