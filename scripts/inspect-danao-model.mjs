import fs from 'fs';
import path from 'path';

const glbPath = path.resolve('public/models/Danao model.glb');

// Simple GLTF json extractor from GLB header
const buffer = fs.readFileSync(glbPath);
const jsonLen = buffer.readUInt32LE(12);
const jsonStr = buffer.toString('utf8', 20, 20 + jsonLen);
const gltf = JSON.parse(jsonStr);

console.log("=== GLTF MESHES ===");
console.log(JSON.stringify(gltf.meshes, null, 2));

console.log("\n=== GLTF MATERIALS ===");
console.log(JSON.stringify(gltf.materials, null, 2));

console.log("\n=== GLTF NODES ===");
console.log(JSON.stringify(gltf.nodes, null, 2));
