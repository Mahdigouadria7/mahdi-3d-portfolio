import fs from 'fs';
import path from 'path';

const zflipPath = path.resolve('out/models/Z flip 6 model.glb');
const buffer = fs.readFileSync(zflipPath);
const jsonLen = buffer.readUInt32LE(12);
const jsonStr = buffer.toString('utf8', 20, 20 + jsonLen);
const gltf = JSON.parse(jsonStr);

const anim = gltf.animations.find(a => a.name === 'UnfoldFoldAction');
if (anim) {
  console.log("Anim duration info:");
  anim.samplers.forEach((s, idx) => {
    const accessor = gltf.accessors[s.input];
    console.log(`Sampler ${idx}: input accessor min=${accessor.min} max=${accessor.max}`);
  });
}
