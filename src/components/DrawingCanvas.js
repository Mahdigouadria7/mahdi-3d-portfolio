import * as THREE from 'three';

/**
 * Manages high-resolution offscreen HTML canvas, vector drawing strokes, texture mapping,
 * and performance-optimized updates to the Samsung phone screen material.
 */
export class DrawingCanvas {
  /**
   * @param {THREE.Object3D} scene - GLTF root scene.
   * @param {number} [width=1024] - Canvas width resolution.
   * @param {number} [height=2048] - Canvas height resolution.
   */
  constructor(scene, width = 1024, height = 2048) {
    this.scene = scene;
    this.width = width;
    this.height = height;

    // UV range bounds extracted from S25 Utra Model geometry (it is perfectly mapped 0 to 1)
    this.minU = 0.0;
    this.maxU = 1.0;
    this.minV = 0.0;
    this.maxV = 1.0;

    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext('2d');

    this.texture = new THREE.CanvasTexture(this.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.flipY = false;

    // Stroke tracking
    this.lastX = null;
    this.lastY = null;

    this.strokeColor = '#ffffff';
    this.strokeWidth = 12;

    this.initCanvasBackground();
    this.applyToDisplayMaterial();
  }

  /**
   * Initializes sleek dark OLED UI background on the screen texture.
   */
  initCanvasBackground() {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Dark sleek background
    const bgGradient = ctx.createLinearGradient(0, 0, 0, h);
    bgGradient.addColorStop(0, '#0a0a12');
    bgGradient.addColorStop(1, '#020205');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, w, h);

    // Subtle ambient grid pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 2;
    const step = 64;
    for (let x = 0; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Samsung S-Pen prompt typography & graphics
    ctx.textAlign = 'center';

    // Status Bar time
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('09:41', w / 2, 80);

    // Prompt Header
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 44px sans-serif';
    ctx.fillText('SAMSUNG NOTES ✍️', w / 2, 450);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '32px sans-serif';
    ctx.fillText('Click S-Pen to detach & draw', w / 2, 520);

    // Decorative circle icon in center
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(w / 2, h / 2, 120, 0, Math.PI * 2);
    ctx.stroke();

    this.texture.needsUpdate = true;
  }

  /**
   * Binds CanvasTexture to Display_ActiveArea material on S22_Ultra_2 mesh.
   */
  applyToDisplayMaterial() {
    const displayMesh = this.scene.getObjectByName('S25 Utra Model');
    if (!displayMesh) {
      console.warn('DrawingCanvas: S25 Utra Model mesh not found');
      return;
    }

    const mat = Array.isArray(displayMesh.material)
      ? displayMesh.material.find((m) => m.name === 'Display_ActiveArea')
      : displayMesh.material;

    if (mat) {
      mat.map = this.texture;
      mat.emissive = new THREE.Color(0xffffff);
      mat.emissiveMap = this.texture;
      mat.emissiveIntensity = 0.4;
      mat.roughness = 0.1;
      mat.metalness = 0.1;
      mat.needsUpdate = true;
    }
  }

  /**
   * Draws vector stroke segment from UV raycast intersection.
   * @param {number} u - Mesh UV X coordinate.
   * @param {number} v - Mesh UV Y coordinate.
   * @param {boolean} isNewStroke - True if pointer down / stroke start.
   */
  drawStroke(u, v, isNewStroke = false) {
    // Map UV coordinates to canvas pixel space
    const normU = THREE.MathUtils.clamp((u - this.minU) / (this.maxU - this.minU), 0, 1);
    const normV = THREE.MathUtils.clamp((v - this.minV) / (this.maxV - this.minV), 0, 1);

    const x = normU * this.width;
    const y = normV * this.height; // UV orientation matching geometry

    const ctx = this.ctx;

    if (isNewStroke || this.lastX === null || this.lastY === null) {
      this.lastX = x;
      this.lastY = y;
      return;
    }

    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Smooth anti-aliased white ink with subtle outer glow
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 8;

    ctx.strokeStyle = this.strokeColor;
    ctx.lineWidth = this.strokeWidth;

    ctx.beginPath();
    ctx.moveTo(this.lastX, this.lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    ctx.restore();

    this.lastX = x;
    this.lastY = y;

    // Flag texture update only when stroke is drawn
    this.texture.needsUpdate = true;
  }

  /**
   * End stroke.
   */
  endStroke() {
    this.lastX = null;
    this.lastY = null;
  }

  /**
   * Clears drawn lines and restores default UI.
   */
  clearCanvas() {
    this.initCanvasBackground();
  }

  /**
   * Set active stroke color.
   * @param {string} color - Hex color string.
   */
  setStrokeColor(color) {
    this.strokeColor = color;
  }

  /**
   * Dispose texture.
   */
  dispose() {
    this.texture.dispose();
  }
}
