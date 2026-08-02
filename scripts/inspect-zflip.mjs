import fs from 'fs';
import path from 'path';

const zflipPath = path.resolve('out/models/Z flip 6 model.glb');
const buffer = fs.readFileSync(zflipPath);

const jsonLen = buffer.readUInt32LE(12);
const jsonStr = buffer.toString('utf8', 20, 20 + jsonLen);
const gltf = JSON.parse(jsonStr);

console.log("=== GLTF ANIMATIONS ===");
if (gltf.animations) {
  gltf.animations.forEach((a, i) => console.log(`Animation ${i}: name="${a.name}" channels=${a.channels ? a.channels.length : 0}`));
} else {
  console.log("No animations found!");
}

console.log("\n=== GLTF NODES (first 20) ===");
if (gltf.nodes) {
  gltf.nodes.slice(0, 20).forEach((n, i) => console.log(`Node ${i}: name="${n.name}"`));
}

console.log("\n=== GLTF MESHES ===");
if (gltf.meshes) {
  gltf.meshes.forEach((m, i) => console.log(`Mesh ${i}: name="${m.name}"`));
}
