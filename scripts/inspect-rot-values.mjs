import fs from 'fs';
import path from 'path';

const zflipPath = path.resolve('out/models/Z flip 6 model.glb');
const buffer = fs.readFileSync(zflipPath);
const jsonLen = buffer.readUInt32LE(12);
const jsonStr = buffer.toString('utf8', 20, 20 + jsonLen);
const gltf = JSON.parse(jsonStr);

// Find bufferView for accessors
const binChunkOffset = 20 + jsonLen;
const binBuffer = buffer.subarray(binChunkOffset + 8);

function getAccessorValues(accessorIdx) {
  const acc = gltf.accessors[accessorIdx];
  const bv = gltf.bufferViews[acc.bufferView];
  const offset = (bv.byteOffset || 0) + (acc.byteOffset || 0);
  const count = acc.count;
  
  const values = [];
  for (let i = 0; i < count; i++) {
    if (acc.type === 'SCALAR') {
      values.push(binBuffer.readFloatLE(offset + i * 4));
    } else if (acc.type === 'VEC4') {
      values.push([
        binBuffer.readFloatLE(offset + i * 16),
        binBuffer.readFloatLE(offset + i * 16 + 4),
        binBuffer.readFloatLE(offset + i * 16 + 8),
        binBuffer.readFloatLE(offset + i * 16 + 12)
      ]);
    }
  }
  return values;
}

const anim = gltf.animations.find(a => a.name === 'UnfoldFoldAction');
const rotSampler = anim.samplers[4]; // sampler 4 is Bone_up rotation
const rotValues = getAccessorValues(rotSampler.output);
console.log("Rot at t=0:", rotValues[0]);
console.log("Rot at t=end:", rotValues[rotValues.length - 1]);
