import ffmpegPath from "ffmpeg-static";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const inputVideo = path.resolve("public/models/danup content/Videos/Danup x ALA 3d Video.mp4");
const outputVideo = path.resolve("public/models/danup content/Videos/Danup_x_ALA_3d_Video_compressed.mp4");

console.log("Compressing 168MB video using ffmpeg-static...");
console.log("Input:", inputVideo);
console.log("Output:", outputVideo);

const cmd = `"${ffmpegPath}" -y -i "${inputVideo}" -map 0:v:0 -map 0:a:0 -vcodec libx264 -crf 26 -preset fast -acodec aac -b:a 128k "${outputVideo}"`;
execSync(cmd, { stdio: "inherit", maxBuffer: 1024 * 1024 * 100 });

const inSize = (fs.statSync(inputVideo).size / (1024 * 1024)).toFixed(2);
const outSize = (fs.statSync(outputVideo).size / (1024 * 1024)).toFixed(2);

console.log(`Finished compression! ${inSize} MB -> ${outSize} MB`);
