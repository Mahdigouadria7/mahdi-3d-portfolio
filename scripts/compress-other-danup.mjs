import ffmpegPath from "ffmpeg-static";
import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const videos = [
  {
    input: path.resolve("public/models/Danup Boost CGI .mp4"),
    output: path.resolve("public/models/danup content/Videos/Danup_Boost_CGI.mp4"),
    name: "Danup Boost CGI"
  },
  {
    input: path.resolve("public/models/Danup Maldives CGI 1.mp4"),
    output: path.resolve("public/models/danup content/Videos/Danup_Maldives_CGI.mp4"),
    name: "Danup Maldives CGI"
  }
];

console.log("Compressing new Danup project videos using ffmpeg-static...");

for (const v of videos) {
  console.log(`Starting compression for: ${v.name}`);
  console.log("Input:", v.input);
  console.log("Output:", v.output);

  const cmd = `"${ffmpegPath}" -y -i "${v.input}" -map 0:v:0 -map 0:a:0 -vf "scale=1080:1920" -r 30 -vcodec libx264 -crf 24 -preset fast -acodec aac -b:a 128k "${v.output}"`;
  execSync(cmd, { stdio: "inherit", maxBuffer: 1024 * 1024 * 100 });

  const inSize = (fs.statSync(v.input).size / (1024 * 1024)).toFixed(2);
  const outSize = (fs.statSync(v.output).size / (1024 * 1024)).toFixed(2);
  console.log(`[COMPRESSED ${v.name}] ${inSize} MB -> ${outSize} MB`);
}
