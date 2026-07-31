import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/**
 * Manages lighting, environment mapping, tone mapping, and studio background configuration.
 */
export class Environment {
  /**
   * @param {THREE.Scene} scene - Target 3D scene.
   * @param {THREE.WebGLRenderer} renderer - WebGL renderer instance.
   */
  constructor(scene, renderer) {
    this.scene = scene;
    this.renderer = renderer;

    this.pmremGenerator = null;
    this.envTexture = null;

    this.initRendererSettings();
    this.initEnvironmentMap();
    this.initStudioLighting();
  }

  /**
   * Configures renderer tone mapping, color space, and studio background contrast.
   */
  initRendererSettings() {
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.3;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Dark studio background (#0a0a10) with subtle blue undertone so black phone stands out
    const studioBgColor = new THREE.Color(0x0a0a10);
    this.renderer.setClearColor(studioBgColor, 1.0);
    this.scene.background = studioBgColor;
  }

  /**
   * Generates a PMREM studio environment map for realistic metallic reflections.
   */
  initEnvironmentMap() {
    this.pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.pmremGenerator.compileEquirectangularShader();

    const roomEnv = new RoomEnvironment(this.renderer);
    this.envTexture = this.pmremGenerator.fromScene(roomEnv).texture;

    this.scene.environment = this.envTexture;

    roomEnv.dispose();
  }

  /**
   * Adds high-contrast studio lighting for metallic phone edges and metallic chain links.
   */
  initStudioLighting() {
    // 1. Soft Ambient / Hemisphere Light
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222233, 1.2);
    this.scene.add(hemiLight);

    // 2. Strong Key Light for main metallic highlights
    this.keyLight = new THREE.DirectionalLight(0xffffff, 3.0);
    this.keyLight.position.set(4, 6, 4);
    this.keyLight.castShadow = true;
    this.keyLight.shadow.mapSize.width = 2048;
    this.keyLight.shadow.mapSize.height = 2048;
    this.keyLight.shadow.camera.near = 0.5;
    this.keyLight.shadow.camera.far = 10;
    this.keyLight.shadow.bias = -0.0001;
    this.scene.add(this.keyLight);

    // 3. Bright Cyan-Blue Rim Light to outline phone edges & chain links
    this.rimLight = new THREE.DirectionalLight(0x00f0ff, 2.5);
    this.rimLight.position.set(-4, 3, -3);
    this.scene.add(this.rimLight);

    // 4. Front Fill Light for screen details
    this.fillLight = new THREE.DirectionalLight(0xffffff, 1.5);
    this.fillLight.position.set(0, 1.5, 4);
    this.scene.add(this.fillLight);
  }

  /**
   * Dispose environment resources.
   */
  dispose() {
    if (this.envTexture) {
      this.envTexture.dispose();
    }
    if (this.pmremGenerator) {
      this.pmremGenerator.dispose();
    }
  }
}
