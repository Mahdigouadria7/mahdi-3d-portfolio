import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import GUI from 'lil-gui';
import { Environment } from '../utils/Environment';
import { DrawingCanvas } from './DrawingCanvas';
import { RaycasterManager } from '../utils/RaycasterManager';

const PHONE_MODEL_URL = "https://res.cloudinary.com/zu63qo7h/raw/upload/v1785506810/portfolio/samsung/models/s25_ultra_separated.glb";
const SPEN_MODEL_URL = "https://res.cloudinary.com/zu63qo7h/raw/upload/v1785506811/portfolio/samsung/models/spen_separated.glb";
const ZFLIP_MODEL_URL = "https://res.cloudinary.com/zu63qo7h/raw/upload/v1785667996/portfolio/samsung/models/zflip6_model.glb";

export const PEN_COLOR_PALETTES = [
  {
    id: 'cyan-glow',
    name: 'Cyan Glow',
    primaryColor: '#38bdf8',
    gradientCss: 'from-sky-400 via-cyan-400 to-blue-500',
    threeColors: [new THREE.Color(0x38bdf8), new THREE.Color(0x06b6d4), new THREE.Color(0x3b82f6)]
  },
  {
    id: 'neon-purple',
    name: 'Neon Violet',
    primaryColor: '#c084fc',
    gradientCss: 'from-purple-400 via-fuchsia-500 to-pink-500',
    threeColors: [new THREE.Color(0xc084fc), new THREE.Color(0xd946ef), new THREE.Color(0xec4899)]
  },
  {
    id: 'emerald-neon',
    name: 'Emerald Neon',
    primaryColor: '#34d399',
    gradientCss: 'from-emerald-400 via-teal-400 to-cyan-500',
    threeColors: [new THREE.Color(0x34d399), new THREE.Color(0x2dd4bf), new THREE.Color(0x06b6d4)]
  },
  {
    id: 'sunset-gold',
    name: 'Sunset Gold',
    primaryColor: '#fbbf24',
    gradientCss: 'from-amber-300 via-orange-400 to-rose-500',
    threeColors: [new THREE.Color(0xfbbf24), new THREE.Color(0xf97316), new THREE.Color(0xf43f5e)]
  },
  {
    id: 'platinum-white',
    name: 'Pure White',
    primaryColor: '#ffffff',
    gradientCss: 'from-white via-slate-200 to-sky-200',
    threeColors: [new THREE.Color(0xffffff), new THREE.Color(0xe2e8f0), new THREE.Color(0xbae6fd)]
  }
];

/**
 * Main application controller.
 */
export class SamsungHeroApp {
  constructor(canvasElement, onLoadProgress) {
    this.canvas = canvasElement;
    this.onLoadProgress = onLoadProgress;

    // Active color palette
    this.activePalette = PEN_COLOR_PALETTES[0];
    this.brushSize = 0.4;

    // 1. Core Three.js Scene Setup
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    // Camera positioning framing the phone directly in the center
    this.camera.position.set(0, 0, 2.5);
    this.camera.lookAt(0, 0, 0);

    this.isDragging = false;
    this.spinVelocity = new THREE.Vector2(0, 0);
    this.baseRotation = new THREE.Vector2(0.1, -0.25);
    this.previousMousePosition = new THREE.Vector2(0, 0);
    this.penScrollRotation = 0;

    this.isLeftMouseDown = false;
    this.isContinuousDrawing = false;
    
    // Prevent right-click menu on canvas
    this.canvas.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    this.onPointerDown = (e) => {
      if (this.state === 'Extracting') return;
      
      if (this.isPenTracking) {
        if (e.button === 0) { // Left click
          this.isLeftMouseDown = true;
        } else if (e.button === 2) { // Right click
          this.isContinuousDrawing = !this.isContinuousDrawing;
        }
      } else {
        if (e.button === 0 || e.pointerType === 'touch') {
          this.isDragging = true;
          this.previousMousePosition.set(e.clientX, e.clientY);
        }
      }
    };

    this.onPointerUp = (e) => {
      this.isDragging = false;
      this.isLeftMouseDown = false;
      if (this.canvas && !this.isPenTracking) {
        this.canvas.style.touchAction = 'pan-y';
      }
    };

    this.canvas.addEventListener('pointerdown', this.onPointerDown);
    window.addEventListener('pointerup', this.onPointerUp);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.environment = null;
    this.gltfLoader = new GLTFLoader();
    this.gltfLoader.setCrossOrigin('anonymous');

    // Meshes prepared for GSAP
    this.sceneGroup = new THREE.Group();
    this.scene.add(this.sceneGroup);

    this.modelGroup = new THREE.Group();
    this.sceneGroup.add(this.modelGroup);
    
    this.phoneMesh = null;
    this.spenMesh = null;
    this.zflipMesh = null;
    this.zflipMixer = null;
    this.zflipFoldAction = null;
    this.selectedPhoneModel = 's25'; // 's25' | 'zflip'

    // Home position (right side framing for hero composition on desktop)
    this.phoneHomeX = window.innerWidth > 768 ? 1.0 : 0;

    // State Machine
    this.state = 'Idle';

    // S-Pen Interactive Tracking State & Scratch Objects (Zero allocations in render loop)
    this.mouse = new THREE.Vector2(0, 0);
    this.isPenTracking = false;
    this.spenDockedPos = null;
    this.spenDockedRot = null;

    // Pre-allocated scratch objects for performance optimization
    this._scratchVec3A = new THREE.Vector3();
    this._scratchVec3B = new THREE.Vector3();
    this._scratchQuatA = new THREE.Quaternion();
    this._scratchQuatB = new THREE.Quaternion();
    this._scratchEuler = new THREE.Euler();

    this.onPointerMove = (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      if (this.isDragging && !this.isPenTracking && this.state !== 'Extracting') {
        const deltaX = e.clientX - this.previousMousePosition.x;
        const deltaY = e.clientY - this.previousMousePosition.y;
        
        // While user is actively dragging the 3D model, disable page scrolling
        if (this.canvas && (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1)) {
          this.canvas.style.touchAction = 'none';
        }

        // Add momentum to spin velocity (like the Red Bull model)
        const sens = this.spenMesh && this.spenMesh.visible && !this.phoneMesh.visible ? (this.params ? this.params.penDragSens : 0.0015) : (this.params ? this.params.phoneDragSens : 0.0015);
        this.spinVelocity.x += deltaY * sens;
        this.spinVelocity.y += deltaX * sens;
        
        this.previousMousePosition.set(e.clientX, e.clientY);
      }
    };
    window.addEventListener('pointermove', this.onPointerMove);
    // 3D Glowing Soft Trail for S-Pen using Canvas Gradient Sprites
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)'); 
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)'); 
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); 
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
    
    const glowTexture = new THREE.CanvasTexture(canvas);
    
    this.trailPoints = [];
    this.trailIdx = 0;
    this.trailCount = 800; // Increased count for much longer trail
    this.posHistory = [];
    this.strokeStepCount = 0;
    
    const trailMat = new THREE.SpriteMaterial({ 
      map: glowTexture,
      color: 0xffffff,
      transparent: true, 
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 1.0
    });
    
    for(let i = 0; i < this.trailCount; i++) {
      const mat = trailMat.clone();
      const sprite = new THREE.Sprite(mat);
      sprite.visible = false;
      this.scene.add(sprite);
      this.trailPoints.push({ mesh: sprite, mat: mat, age: 0 });
    }
    this.lastTrailPos = null;

    // Initialize Drawing and Raycasting subsystems
    this.drawingCanvas = new DrawingCanvas(this.scene, 1024, 2048);
    this.setBrushSize(0.4);
    this.raycasterManager = new RaycasterManager(this.camera, this.canvas, this.scene);
    this.isHoveringScreen = false;
    this.lastHitPoint = null;

    // Wire up screen interaction for drawing
    let lastIsDown = false;
    this.raycasterManager.onScreenInteract = (point, isHit, u, v, isDown) => {
      this.isHoveringScreen = isHit;
      
      if (this.isPenTracking && isHit) {
        this.lastHitPoint = point.clone();

        if (isDown) {
           const isNewStroke = !lastIsDown;
           this.drawingCanvas.drawStroke(u, v, isNewStroke);
        } else {
           this.drawingCanvas.endStroke();
        }
      } else {
        this.drawingCanvas.endStroke();
      }
      lastIsDown = isDown;
    };
    
    // Initialize PenController
    this.penController = { 
      extractPen: () => this.extractPen(), 
      dockPen: () => this.dockPen() 
    };

    this.clock = new THREE.Clock();
    this.animationFrameId = null;
    this.isDisposed = false;

    this.setRenderMode = this.setRenderMode.bind(this);
    this.handleResize = this.handleResize.bind(this);
    window.addEventListener('resize', this.handleResize);

    this.init();
  }

  async init() {
    try {
      if (this.isDisposed) return;

      // Studio Commercial Lighting Setup
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
      keyLight.position.set(2, 4, 3);
      this.scene.add(keyLight);

      const rimLight = new THREE.DirectionalLight(0x00f0ff, 3.5);
      rimLight.position.set(-3, 2, -4);
      this.scene.add(rimLight);

      const fillLight = new THREE.DirectionalLight(0xe0e8ff, 1.2);
      fillLight.position.set(-2, -2, 2);
      this.scene.add(fillLight);

      const ambientLight = new THREE.AmbientLight(0x06070b, 1.5);
      this.scene.add(ambientLight);

      // Environment Setup
      this.environment = new Environment(this.scene, this.renderer);

      // Load GLTF Assets from Cloudinary
      try {
        const [phoneGltf, spenGltf, zflipGltf] = await Promise.all([
          this.gltfLoader.loadAsync(PHONE_MODEL_URL),
          this.gltfLoader.loadAsync(SPEN_MODEL_URL),
          this.gltfLoader.loadAsync(ZFLIP_MODEL_URL)
        ]);

        if (this.isDisposed) return;

        const processGltf = (gltf) => {
          gltf.scene.traverse((child) => {
            child.visible = true;
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              child.frustumCulled = false;
              if (child.material) {
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                materials.forEach((mat) => {
                  mat.side = THREE.DoubleSide; 
                  mat.envMapIntensity = 2.5; 
                  if (mat.color && (mat.color.getHex() === 0x000000 || mat.color.getHex() < 0x101010)) {
                    mat.color.setHex(0x1e1e24);
                  }
                  mat.needsUpdate = true;
                });
              }
            }
          });
        };

        processGltf(phoneGltf);
        processGltf(spenGltf);
        processGltf(zflipGltf);

        // Scale the root scene group to prominent proportions
        this.sceneGroup.scale.set(0.6, 0.6, 0.6);

        this.phoneMesh = phoneGltf.scene;
        this.spenMesh = spenGltf.scene;
        this.zflipMesh = zflipGltf.scene;
        
        // Scale down pen proportionally
        this.spenMesh.scale.set(0.8, 0.8, 0.8);
        this.zflipMesh.scale.set(2.4, 2.4, 2.4);

        // Setup AnimationMixer for Z Flip 6 fold/unfold animation
        if (zflipGltf.animations && zflipGltf.animations.length > 0) {
          this.zflipMixer = new THREE.AnimationMixer(this.zflipMesh);
          const foldClip = zflipGltf.animations.find(a => a.name === 'UnfoldFoldAction') || zflipGltf.animations[0];
          if (foldClip) {
            this.zflipFoldAction = this.zflipMixer.clipAction(foldClip);
            this.zflipFoldAction.setLoop(THREE.LoopOnce);
            this.zflipFoldAction.clampWhenFinished = true;
            
            // Set initial pose to closed (time = 0)
            this.zflipFoldAction.play();
            this.zflipFoldAction.paused = true;
            this.zflipFoldAction.time = 0;
          }
        }

        this.modelGroup.add(this.phoneMesh);
        this.modelGroup.add(this.spenMesh);
        this.modelGroup.add(this.zflipMesh);

        this.zflipMesh.visible = false;
        
        this.setupGUI();
        
        this.setRenderMode('phone');

        console.log("Phone and S-Pen meshes loaded from separate files successfully.");

        // Apply canvas texture to display material
        this.drawingCanvas.applyToDisplayMaterial();

        // SPen is already separated but shares world origin. We capture its initial local transform.
        this.spenDockedPos = this.spenMesh.position.clone();
        this.spenDockedRot = this.spenMesh.rotation.clone();

        // Dynamically frame phone inside viewport without clipping
        this.fitCameraToObject();

        if (this.onLoadProgress) this.onLoadProgress(1.0);

        // Start the entry floating animation
        this.playIntroAnimation();

        // Start Animation Loop
        this.startAnimationLoop();
      } catch (error) {
        console.error("GLTF Loading Failed Critical Error:", error);
      }
    } catch (err) {
      console.error("SamsungHeroApp Initialization Error:", err);
    }
  }

  /**
   * Dynamic Camera Framing based on Bounding Sphere.
   * Guarantees object occupies targetCoverage (e.g. 65%) of viewport height across resolutions.
   */
  fitCameraToObject() {
    const isMobile = window.innerWidth <= 768;
    // On mobile: smaller scale so the full phone fits without clipping
    const targetScale = isMobile ? 0.42 : 0.6;
    // Bring camera closer on mobile for better fill, keep model centered vertically
    const cameraZ = isMobile ? 4.8 : 5.5;
    
    if (this.sceneGroup) {
      gsap.to(this.sceneGroup.scale, {
        x: targetScale,
        y: targetScale,
        z: targetScale,
        duration: 1.2,
        ease: "power2.out"
      });
    }

    gsap.to(this.camera.position, {
      x: 0,
      y: 0,
      z: cameraZ,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => {
        this.camera.lookAt(0, 0, 0);
      }
    });
  }

  playIntroAnimation() {
    if (!this.modelGroup) return;

    this.state = 'Intro';
    this.baseRotation.set(0.1, -0.25);
    this.spinVelocity.set(0, 0);

    // Recalculate phoneHomeX from canvas client width
    const containerWidth = this.canvas?.clientWidth || window.innerWidth;
    this.phoneHomeX = containerWidth > 768 ? 1.0 : 0;

    const targetX = this.phoneHomeX + (this.params ? (this.renderMode === 'phone' ? this.params.phonePosX : this.params.penPosX) : 0);
    const targetY = this.params ? (this.renderMode === 'phone' ? this.params.phonePosY : this.params.penPosY) : 0;
    const targetZ = this.params ? (this.renderMode === 'phone' ? this.params.phonePosZ : this.params.penPosZ) : 0;

    // Animate to home position
    this.modelGroup.position.set(targetX, -1, targetZ - 0.5);
    this.modelGroup.rotation.set(0.2, -0.5, -0.2); // Start tilted

    gsap.to(this.modelGroup.position, {
      x: targetX,
      y: targetY,
      z: targetZ,
      duration: 1.8,
      ease: "power3.out",
    });

    gsap.to(this.modelGroup.rotation, {
      x: 0.1,
      y: -0.25,
      z: -0.05,
      duration: 1.8,
      ease: "power3.out",
      onComplete: () => {
        this.state = 'Idle';
        this.playIdleAnimation();
      }
    });
  }

  playIdleAnimation() {
    if (!this.sceneGroup) return;
    
    // Create a continuous subtle floating/breathing effect around the angled home position
    gsap.to(this.sceneGroup.position, {
      y: 0.04,
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    gsap.to(this.modelGroup.rotation, {
      y: -0.25 + 0.04,
      x: 0.1 + 0.02,
      duration: 3.8,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  }

  extractPen() {
    if (!this.spenMesh || !this.spenDockedPos || !this.modelGroup) return;
    this.state = 'Extracting';
    
    // Hide default cursor
    document.body.style.cursor = 'none';

    // Reparent S-Pen to gltf.scene dynamically when detaching so it can track mouse globally
    this.scene.attach(this.spenMesh);

    // Reset spin velocity so extracted pen doesn't carry momentum
    this.spinVelocity.set(0, 0);

    // Stop group idle animations
    gsap.killTweensOf(this.modelGroup.position);
    gsap.killTweensOf(this.modelGroup.rotation);

    // Rotate group to horizontal (landscape) for drawing
    gsap.to(this.modelGroup.rotation, {
      x: 0,
      y: 0,
      z: -Math.PI / 2, // Horizontal orientation
      duration: 1.0,
      ease: "power3.inOut"
    });

    // Ensure group is perfectly centered
    gsap.to(this.modelGroup.position, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.0,
      ease: "power3.inOut"
    });

    // 1. Magnetic Release & Slide out of slot
    gsap.to(this.spenMesh.position, {
      y: this.spenDockedPos.y - 1.2,
      duration: 0.5,
      ease: "power2.in"
    });

    // 2. Lift and rotate around local Z-axis (revealing silhouette without camera clipping)
    gsap.to(this.spenMesh.position, {
      z: this.spenDockedPos.z + 1.2, // Controlled Z plane safe from camera near plane
      duration: 0.8,
      delay: 0.5,
      ease: "power3.out",
      onComplete: () => {
        this.isPenTracking = true; // Enable mouse tracking in render loop
        this.state = 'Hover';
      }
    });

    // Ergonomic diagonal rotation revealing local silhouette
    const targetEuler = new THREE.Euler(Math.PI * 0.45, 0, Math.PI * 0.2);
    gsap.to(this.spenMesh.rotation, {
      x: targetEuler.x,
      y: targetEuler.y,
      z: targetEuler.z,
      duration: 0.9,
      delay: 0.4,
      ease: "power3.out"
    });
  }

  dockPen() {
    if (!this.spenMesh || !this.spenDockedPos || !this.modelGroup) return;
    this.state = 'Returning';
    
    // Disable mouse tracking and restore cursor
    this.isPenTracking = false;
    document.body.style.cursor = 'default';

    // Reset drag rotation momentum & base position for docking
    this.spinVelocity.set(0, 0);
    this.baseRotation.set(0.1, -0.25);

    // Return group to home position and restart idle animation
    gsap.to(this.modelGroup.position, {
      x: this.phoneHomeX,
      y: 0,
      z: 0,
      duration: 1.0,
      ease: "power3.inOut"
    });

    gsap.to(this.modelGroup.rotation, {
      x: 0.1,
      y: -0.25,
      z: -0.05, // Angled upright
      duration: 1.0,
      ease: "power3.inOut",
      onComplete: () => {
        this.state = 'Docked';
        this.playIdleAnimation(); // Resume floating effect
      }
    });

    // 1. Magnetic Return toward slot
    gsap.to(this.spenMesh.position, {
      x: this.spenDockedPos.x,
      y: this.spenDockedPos.y - 0.5,
      z: this.spenDockedPos.z,
      duration: 0.6,
      ease: "power3.inOut"
    });

    // Reset rotation back to local Blender orientation
    gsap.to(this.spenMesh.rotation, {
      x: this.spenDockedRot.x,
      y: this.spenDockedRot.y,
      z: this.spenDockedRot.z,
      duration: 0.6,
      ease: "power3.inOut"
    });

    // 2. Soft snap & seating -> Reparent SPen back into modelGroup hierarchy!
    gsap.to(this.spenMesh.position, {
      x: this.spenDockedPos.x,
      y: this.spenDockedPos.y,
      z: this.spenDockedPos.z,
      duration: 0.4,
      delay: 0.6,
      ease: "power2.out",
      onComplete: () => {
        // Re-attach SPen to modelGroup so it moves seamlessly with phone floating & parallax
        if (this.modelGroup && this.spenMesh) {
          this.modelGroup.attach(this.spenMesh);
          this.spenMesh.position.copy(this.spenDockedPos);
          this.spenMesh.rotation.copy(this.spenDockedRot);
        }
        if (this.state === 'Dragging') {
          this.state = 'Idle';
        }
      }
    });
  }

  startAnimationLoop() {
    const animate = () => {
      if (this.isDisposed) return;
      
      const delta = this.clock.getDelta();

      // Apply momentum friction to spinning
      this.spinVelocity.multiplyScalar(0.92);
      this.baseRotation.x += this.spinVelocity.x;
      this.baseRotation.y += this.spinVelocity.y;

      // Rotational Cursor Parallax & Drag Momentum on Phone
      if (this.modelGroup && !this.isPenTracking && this.state !== 'Extracting' && this.state !== 'Returning' && this.state !== 'Intro') {
        const targetRotX = this.baseRotation.x + (this.mouse.y * 0.2); // Parallax layered over spin
        const targetRotY = this.baseRotation.y + (this.mouse.x * 0.3);
        this.modelGroup.rotation.x += (targetRotX - this.modelGroup.rotation.x) * 0.15;
        this.modelGroup.rotation.y += (targetRotY - this.modelGroup.rotation.y) * 0.15;
      }

      // S-Pen Mouse Tracking interpolation (Zero per-frame allocations)
      if (this.isPenTracking && this.spenMesh && this.spenDockedPos) {
        
        if (this.isHoveringScreen && this.lastHitPoint) {
          this.state = 'Drawing';

          // 1. Nib Tip touching the screen glass precisely
          this._scratchVec3A.copy(this.lastHitPoint);
          this.spenMesh.parent.worldToLocal(this._scratchVec3A);
          
          // Nib tip offset hover
          this._scratchVec3A.z += 0.15;
          
          // Lerp position using spring smoothing 0.18
          this.spenMesh.position.lerp(this._scratchVec3A, 0.35);

          // Natural wrist rotation
          const targetRotX = Math.PI * 0.45 - this.mouse.y * 0.1;
          const targetRotY = this.mouse.x * 0.2;
          const targetRotZ = Math.PI * 0.15;

          this.spenMesh.rotation.x += (targetRotX - this.spenMesh.rotation.x) * 0.2;
          this.spenMesh.rotation.y += (targetRotY - this.spenMesh.rotation.y) * 0.2;
          this.spenMesh.rotation.z += (targetRotZ - this.spenMesh.rotation.z) * 0.2;
          
        } else {
          this.state = 'Hover';

          // Ensure hoverPlane and raycaster exist for exact tracking
          if (!this.hoverPlane) {
            this.hoverPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -1.8);
          }
          if (!this.raycaster) {
            this.raycaster = new THREE.Raycaster();
          }

          // 2. Exact mouse-to-world mapping on Z=1.8 plane
          this.raycaster.setFromCamera(this.mouse, this.camera);
          this.raycaster.ray.intersectPlane(this.hoverPlane, this._scratchVec3A);
          
          let targetX = 0;
          let targetY = 0;
          let targetZ = 1.8;
          
          if (this._scratchVec3A) {
             targetX = this._scratchVec3A.x;
             targetY = this._scratchVec3A.y;
             targetZ = this._scratchVec3A.z;
          }

          this.spenMesh.position.x += (targetX - this.spenMesh.position.x) * 0.25;
          this.spenMesh.position.y += (targetY - this.spenMesh.position.y) * 0.25;
          this.spenMesh.position.z += (targetZ - this.spenMesh.position.z) * 0.25;

          // Pointing directly to the screen (perpendicular but angled so we can see the body)
          const targetRotX = Math.PI * 0.5 - (this.mouse.y * 0.1); // Roughly 90 degrees to screen
          const targetRotY = this.mouse.x * 0.15;
          const targetRotZ = Math.PI * 0.1 + this.penScrollRotation;
          
          const trackSens = this.params ? this.params.penTrackSens : 0.18;
          this.spenMesh.rotation.x += (targetRotX - this.spenMesh.rotation.x) * trackSens;
          this.spenMesh.rotation.y += (targetRotY - this.spenMesh.rotation.y) * trackSens;
          this.spenMesh.rotation.z += (targetRotZ - this.spenMesh.rotation.z) * trackSens;
          
          // Spawn new trail particles (interpolated to prevent gaps)
          const currentPos = new THREE.Vector3().copy(this.spenMesh.position);
          
          // MATHEMATICAL APPROACH: Dynamically calculate the exact physical tip from the geometry's bounding box
          if (!this.spenTipLocalOffset) {
            // Save current transforms
            const oldPos = this.spenMesh.position.clone();
            const oldRot = this.spenMesh.rotation.clone();
            const oldScale = this.spenMesh.scale.clone();

            // Reset to identity to get pure local bounding box
            this.spenMesh.position.set(0, 0, 0);
            this.spenMesh.rotation.set(0, 0, 0);
            this.spenMesh.scale.set(1, 1, 1);
            this.spenMesh.updateMatrixWorld(true);

            // Compute the absolute bounding box of the mesh
            const box = new THREE.Box3().setFromObject(this.spenMesh);
            
            // The pen's length is its longest axis (Y). Based on visual feedback, the sharp tip is at the maximum Y coordinate.
            // We use the exact bounding box maximum to guarantee pixel-perfect attachment.
            this.spenTipLocalOffset = new THREE.Vector3(0, box.max.y, 0);

            // Restore transforms
            this.spenMesh.position.copy(oldPos);
            this.spenMesh.rotation.copy(oldRot);
            this.spenMesh.scale.copy(oldScale);
            this.spenMesh.updateMatrixWorld(true);
          }

          const ts = this.spenMesh.scale.y || 1;
          const tipOffset = this.spenTipLocalOffset.clone().multiplyScalar(ts); 
          tipOffset.applyEuler(this.spenMesh.rotation);
          currentPos.add(tipOffset);
          
          const isDrawing = this.isLeftMouseDown || this.isContinuousDrawing;
          
          if (isDrawing) {
            if (!this.posHistory) this.posHistory = [];
            this.posHistory.push(currentPos.clone());
            if (this.posHistory.length > 5) this.posHistory.shift();

            let pointsToSample = [];
            if (this.posHistory.length >= 3) {
              const curve = new THREE.CatmullRomCurve3(this.posHistory, false, 'centripetal', 0.5);
              pointsToSample = curve.getPoints(24);
            } else if (this.posHistory.length === 2) {
              const p1 = this.posHistory[0];
              const p2 = this.posHistory[1];
              for (let s = 0; s <= 16; s++) {
                pointsToSample.push(new THREE.Vector3().lerpVectors(p1, p2, s / 16));
              }
            } else {
              pointsToSample.push(currentPos.clone());
            }

            const colors = (this.activePalette && this.activePalette.threeColors) ? this.activePalette.threeColors : PEN_COLOR_PALETTES[0].threeColors;
            const numColors = colors.length;

            for (let i = 0; i < pointsToSample.length; i++) {
              const pt = this.trailPoints[this.trailIdx];
              pt.mesh.position.copy(pointsToSample[i]);
              pt.age = 1.0;
              pt.mesh.visible = true;

              // Smooth gradient color interpolation along the stroke progression
              this.strokeStepCount = (this.strokeStepCount + 1) % 120;
              const colorProgress = (this.strokeStepCount / 120) * (numColors - 1);
              const idx0 = Math.floor(colorProgress);
              const idx1 = Math.min(numColors - 1, idx0 + 1);
              const factor = colorProgress - idx0;

              if (pt.mat) {
                pt.mat.color.copy(colors[idx0]).lerp(colors[idx1], factor);
              }

              this.trailIdx = (this.trailIdx + 1) % this.trailCount;
            }

            this.lastTrailPos = currentPos.clone();
          } else {
            this.lastTrailPos = null;
            this.posHistory = [];
          }
        }
      } else {
        this.lastTrailPos = null;
        this.posHistory = [];
      }

      // Update and fade all trail particles smoothly via opacity, maintaining overlapping particle scale
      for(let i = 0; i < this.trailCount; i++) {
        const pt = this.trailPoints[i];
        if (pt.age > 0) {
          pt.age -= 0.007; // Smooth natural decay rate
          if (pt.age <= 0) {
            pt.mesh.visible = false;
          } else {
            // Smooth opacity falloff so light dissolves seamlessly into background without dot separation
            const opacity = Math.pow(pt.age, 1.3);
            pt.mat.opacity = opacity;

            // Soft scale tapering so neighboring points overlap seamlessly, modulated by brushSize
            const scale = (0.05 + (pt.age * 0.035)) * (this.brushSize || 1.0); 
            pt.mesh.scale.setScalar(scale);
          }
        }
      }

      // Update Z Flip 6 skeletal animation mixer
      if (this.zflipMixer) {
        this.zflipMixer.update(delta);
      }

      // Clean render pass
      this.renderer.render(this.scene, this.camera);

      this.animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  }

  setPenColorPalette(paletteId) {
    const found = PEN_COLOR_PALETTES.find(p => p.id === paletteId);
    if (found) {
      this.activePalette = found;
      if (this.drawingCanvas) {
        this.drawingCanvas.setStrokeColor(found.primaryColor);
      }
    }
  }

  setBrushSize(sizeMultiplier) {
    this.brushSize = Math.max(0.2, Math.min(4.0, sizeMultiplier));
    if (this.drawingCanvas) {
      this.drawingCanvas.strokeWidth = Math.max(2, Math.round(12 * this.brushSize));
    }
  }

  setPhoneModel(modelKey) {
    this.selectedPhoneModel = modelKey; // 's25' | 'zflip'
    this.setRenderMode(this.renderMode || 'phone');
  }

  toggleZFlipFold(isOpen) {
    if (!this.zflipFoldAction) return;
    const action = this.zflipFoldAction;
    action.paused = false;
    action.enabled = true;

    const duration = action.getClip().duration;

    if (isOpen) {
      // Unfold to Open pose (forward: 0 -> duration)
      action.timeScale = 1;
      if (action.time >= duration - 0.02) {
        action.time = 0;
      }
      action.play();
    } else {
      // Fold back to Closed pose (reverse: duration -> 0)
      action.timeScale = -1;
      if (action.time <= 0.02) {
        action.time = duration;
      }
      action.play();
    }
  }

  setRenderMode(mode) {
    this.renderMode = mode;
    if (!this.phoneMesh || !this.spenMesh) return;
    
    // Reset any pen tracking state
    this.isPenTracking = false;
    document.body.style.cursor = 'default';
    
    // Ensure pen is a child of modelGroup for standalone spinning
    if (this.spenMesh.parent !== this.modelGroup) {
      this.modelGroup.attach(this.spenMesh);
    }
    
    // In all modes, we'll animate modelGroup to serve as the pivot
    const isMobile = window.innerWidth <= 768;
    const pX = this.params ? (mode === 'phone' ? this.params.phonePosX : this.params.penPosX) : 0;
    const pY = isMobile ? -0.25 : (this.params ? (mode === 'phone' ? this.params.phonePosY : this.params.penPosY) : 0);
    const pZ = this.params ? (mode === 'phone' ? this.params.phonePosZ : this.params.penPosZ) : 0;

    gsap.to(this.modelGroup.position, { 
      x: (isMobile ? 0 : this.phoneHomeX + pX), 
      y: pY,
      z: pZ,
      duration: 0.8, ease: "power2.out" 
    });

    if (mode === 'phone') {
      if (this.selectedPhoneModel === 'zflip') {
        if (this.phoneMesh) this.phoneMesh.visible = false;
        if (this.spenMesh) this.spenMesh.visible = false;
        if (this.zflipMesh) {
          this.zflipMesh.visible = true;
          gsap.to(this.zflipMesh.position, { x: 0, y: 0, z: 0, duration: 0.8, ease: "power2.out" });
        }
      } else {
        if (this.zflipMesh) this.zflipMesh.visible = false;
        if (this.spenMesh) this.spenMesh.visible = false;
        if (this.phoneMesh) {
          this.phoneMesh.visible = true;
          gsap.to(this.phoneMesh.position, { x: 0, y: 0, z: 0, duration: 0.8, ease: "power2.out" });
          gsap.to(this.phoneMesh.rotation, {
            x: this.params ? this.params.phoneRotX : 0,
            y: this.params ? this.params.phoneRotY : 0,
            z: this.params ? this.params.phoneRotZ : 0,
            duration: 0.8, ease: "power2.out"
          });
        }
      }
    } else if (mode === 'pen') {
      if (this.phoneMesh) this.phoneMesh.visible = false;
      if (this.zflipMesh) this.zflipMesh.visible = false;
      if (this.spenMesh) this.spenMesh.visible = true;
      
      const ps = this.params ? this.params.penScale : 0.8;
      this.spenMesh.scale.set(ps, ps, ps);
      
      gsap.to(this.spenMesh.position, { x: 0, y: 0, z: 0, duration: 0.8, ease: "power2.out" });
      gsap.to(this.spenMesh.rotation, { 
        x: this.params ? this.params.penRotX : 0, 
        y: this.params ? this.params.penRotY : 0, 
        z: this.params ? this.params.penRotZ : 0, 
        duration: 0.8, ease: "power2.out" 
      });
    }
  }

  togglePenActive(isActive) {
    if (!this.spenMesh) return;
    
    if (isActive) {
      // Pen tracking logic (Use Pen)
      this.isPenTracking = true;
      document.body.style.cursor = 'none';
      if (this.spenMesh.parent !== this.scene) {
        this.scene.attach(this.spenMesh);
      }
      this.spinVelocity.set(0, 0, 0);
      
      const ts = this.params ? this.params.penTrackScale : 0.8;
      this.spenMesh.scale.set(ts, ts, ts);
    } else {
      // Float logic (Float smoothly and user can rotate)
      this.isPenTracking = false;
      document.body.style.cursor = 'default';
      this.isLeftMouseDown = false;
      this.isContinuousDrawing = false;
      this.lastTrailPos = null;
      
      if (this.spenMesh.parent !== this.modelGroup) {
        this.modelGroup.attach(this.spenMesh);
      }
      
      const ps = this.params ? this.params.penScale : 0.8;
      this.spenMesh.scale.set(ps, ps, ps);
      
      // Force mesh translation to 0 so it rotates in place (around local origin)
      gsap.to(this.spenMesh.position, { x: 0, y: 0, z: 0, duration: 0.8, ease: "power2.out" });
      gsap.to(this.spenMesh.rotation, { 
        x: this.params ? this.params.penRotX : 0, 
        y: this.params ? this.params.penRotY : 0, 
        z: this.params ? this.params.penRotZ : 0, 
        duration: 0.8, ease: "power2.out" 
      });
    }
  }

  handleResize() {
    if (!this.canvas || this.isDisposed) return;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const isMobile = width <= 768;
    this.phoneHomeX = isMobile ? 0 : 1.0;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Move model group to correct home position for new viewport
    if (this.modelGroup) {
      const pX = this.params ? (this.renderMode === 'phone' ? this.params.phonePosX : this.params.penPosX) : 0;
      const pY = isMobile ? -0.25 : (this.params ? (this.renderMode === 'phone' ? this.params.phonePosY : this.params.penPosY) : 0);
      this.modelGroup.position.x = (isMobile ? 0 : this.phoneHomeX + pX);
      this.modelGroup.position.y = pY;
    }

    // Dynamic reframing on resize
    this.fitCameraToObject();
  }

  setupGUI() {
    this.params = {
      // Phone
      phoneScale: 2.7117,
      phonePosX: 0.42,
      phonePosY: 0.16,
      phonePosZ: 0.66,
      phoneRotX: -0.408407044966673,
      phoneRotY: -2.26194671058465,
      phoneRotZ: -0.100530964914873,
      phoneDragSens: 0.0063088,
      phoneScrollSens: 0.0005,
      
      // Pen (Standalone)
      penScale: 4.2797,
      penPosX: 0,
      penPosY: 0.16,
      penPosZ: 0.16,
      penRotX: -0.257610597594363,
      penRotY: 1.67132729170977,
      penRotZ: 0.823097275240526,
      penDragSens: 0.0075227,
      penScrollSens: 0.0071983,
      
      // Pen Tracking
      penTrackScale: 2.24053,
      penTrackSens: 0.07534,
      
      copyConfig: () => {
        const configJson = JSON.stringify(this.params, (key, val) => {
          if (typeof val === 'function') return undefined;
          return val;
        }, 2);
        navigator.clipboard.writeText(configJson).then(() => {
          alert("Config copied to clipboard! Paste it to the AI.");
        }).catch(err => {
          console.error("Failed to copy config:", err);
          alert("Failed to copy config to clipboard.");
        });
      }
    };

    this.gui = new GUI({ title: 'Samsung Config' });
    this.gui.hide(); // Hide GUI for production
    this.gui.add(this.params, 'copyConfig').name('📋 Copy Config for AI');
    
    this.gui.domElement.style.position = 'absolute';
    this.gui.domElement.style.top = '100px';
    this.gui.domElement.style.right = '20px';
    this.gui.domElement.style.zIndex = '9999';

    const phoneFolder = this.gui.addFolder('Phone (Float Mode)');
    phoneFolder.add(this.params, 'phoneScale', 0.1, 5.0).onChange(v => {
      if (this.phoneMesh) this.phoneMesh.scale.set(v, v, v);
    });
    phoneFolder.add(this.params, 'phonePosX', -10, 10).onChange(v => {
      if (this.modelGroup && this.renderMode === 'phone') this.modelGroup.position.x = this.phoneHomeX + v;
    });
    phoneFolder.add(this.params, 'phonePosY', -10, 10).onChange(v => {
      if (this.modelGroup && this.renderMode === 'phone') this.modelGroup.position.y = v;
    });
    phoneFolder.add(this.params, 'phonePosZ', -10, 10).onChange(v => {
      if (this.modelGroup && this.renderMode === 'phone') this.modelGroup.position.z = v;
    });
    phoneFolder.add(this.params, 'phoneRotX', -Math.PI, Math.PI).onChange(v => {
      if (this.phoneMesh) this.phoneMesh.rotation.x = v;
    });
    phoneFolder.add(this.params, 'phoneRotY', -Math.PI, Math.PI).onChange(v => {
      if (this.phoneMesh) this.phoneMesh.rotation.y = v;
    });
    phoneFolder.add(this.params, 'phoneRotZ', -Math.PI, Math.PI).onChange(v => {
      if (this.phoneMesh) this.phoneMesh.rotation.z = v;
    });
    phoneFolder.add(this.params, 'phoneDragSens', 0.0001, 0.02).name('Drag Sens');
    phoneFolder.add(this.params, 'phoneScrollSens', 0.0001, 0.01).name('Scroll Sens');
    phoneFolder.close();
    
    const penFolder = this.gui.addFolder('Pen (Float Mode)');
    penFolder.add(this.params, 'penScale', 0.1, 5.0).onChange(v => {
      if (this.spenMesh) this.spenMesh.scale.set(v, v, v);
    });
    penFolder.add(this.params, 'penPosX', -10, 10).onChange(v => {
      if (this.modelGroup && this.renderMode === 'pen') this.modelGroup.position.x = this.phoneHomeX + v;
    });
    penFolder.add(this.params, 'penPosY', -10, 10).onChange(v => {
      if (this.modelGroup && this.renderMode === 'pen') this.modelGroup.position.y = v;
    });
    penFolder.add(this.params, 'penPosZ', -10, 10).onChange(v => {
      if (this.modelGroup && this.renderMode === 'pen') this.modelGroup.position.z = v;
    });
    penFolder.add(this.params, 'penRotX', -Math.PI, Math.PI).onChange(v => {
      if (this.spenMesh) this.spenMesh.rotation.x = v;
    });
    penFolder.add(this.params, 'penRotY', -Math.PI, Math.PI).onChange(v => {
      if (this.spenMesh) this.spenMesh.rotation.y = v;
    });
    penFolder.add(this.params, 'penRotZ', -Math.PI, Math.PI).onChange(v => {
      if (this.spenMesh) this.spenMesh.rotation.z = v;
    });
    penFolder.add(this.params, 'penDragSens', 0.0001, 0.02).name('Drag Sens');
    penFolder.add(this.params, 'penScrollSens', 0.0001, 0.01).name('Scroll Sens');
    penFolder.close();

    const trackingFolder = this.gui.addFolder('Pen (Tracking Mode)');
    trackingFolder.add(this.params, 'penTrackScale', 0.01, 5.0).name('Tracking Scale').onChange(v => {
      if (this.spenMesh && this.isPenTracking) this.spenMesh.scale.set(v, v, v);
    });
    trackingFolder.add(this.params, 'penTrackSens', 0.01, 1.0).name('Tracking Sens');
    trackingFolder.close();

    this.applyInitialParams();
  }

  applyInitialParams() {
    if (!this.params) return;
    if (this.phoneMesh) {
      this.phoneMesh.scale.set(this.params.phoneScale, this.params.phoneScale, this.params.phoneScale);
      this.phoneMesh.position.set(0, 0, 0); // Forced to zero! Pivot fix
      this.phoneMesh.rotation.set(this.params.phoneRotX, this.params.phoneRotY, this.params.phoneRotZ);
    }
    if (this.spenMesh && !this.isPenTracking) {
      this.spenMesh.scale.set(this.params.penScale, this.params.penScale, this.params.penScale);
      this.spenMesh.position.set(0, 0, 0); // Forced to zero! Pivot fix
      this.spenMesh.rotation.set(this.params.penRotX, this.params.penRotY, this.params.penRotZ);
    }
  }

  dispose() {
    this.isDisposed = true;

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }

    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('pointermove', this.onPointerMove);
    window.removeEventListener('pointerup', this.onPointerUp);
    
    if (this.canvas) {
      this.canvas.removeEventListener('pointerdown', this.onPointerDown);
    }
    document.body.style.cursor = 'default';

    if (this.canvas && this.onWheel) {
      this.canvas.removeEventListener('wheel', this.onWheel);
    }

    if (this.raycasterManager) this.raycasterManager.dispose();
    if (this.drawingCanvas) this.drawingCanvas.dispose();
    
    if (this.renderer) this.renderer.dispose();
  }
}
