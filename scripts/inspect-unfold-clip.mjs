import fs from 'fs';
import path from 'path';

const zflipPath = path.resolve('out/models/Z flip 6 model.glb');
const buffer = fs.readFileSync(zflipPath);
const jsonLen = buffer.readUInt32LE(12);
const jsonStr = buffer.toString('utf8', 20, 20 + jsonLen);
const gltf = JSON.parse(jsonStr);

const anim = gltf.animations.find(a => a.name === 'UnfoldFoldAction');
if (anim) {
  console.log("UnfoldFoldAction found!");
  console.log("Samplers:", anim.samplers);
  console.log("Channels:", anim.channels);
} else {
  console.log("UnfoldFoldAction not found by exact name, listing all:");
  gltf.animations.forEach(a => console.log(a.name));
}
