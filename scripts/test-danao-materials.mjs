import fs from 'fs';
import path from 'path';

const glbPath = path.resolve('public/models/Danao model.glb');
const buffer = fs.readFileSync(glbPath);
const jsonLen = buffer.readUInt32LE(12);
const jsonStr = buffer.toString('utf8', 20, 20 + jsonLen);
const gltf = JSON.parse(jsonStr);

console.log("=== EMBEDDED TEXTURES & IMAGES ===");
console.log("Textures count:", gltf.textures ? gltf.textures.length : 0);
console.log("Images count:", gltf.images ? gltf.images.length : 0);
if (gltf.images) {
  console.log("Images detail:", gltf.images);
}

console.log("\n=== MATERIALS DETAIL ===");
console.log(JSON.stringify(gltf.materials, null, 2));
