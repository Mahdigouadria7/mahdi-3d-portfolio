import * as THREE from 'three';
import fs from 'fs';
import path from 'path';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// We need headless gltf loading. Since THREE.js GLTFLoader requires browser APIs (fetch, DOM),
// it's easier to just read the file and use a parser if needed, or we can just 
// use a simple script to check it using gltf-pipeline or something.
