import * as THREE from 'three';

/**
 * Manages high-performance pointer raycasting, cursor tracking, hover detection,
 * dragging triggers, and screen UV intersection coordinates without garbage collection spikes.
 */
export class RaycasterManager {
  /**
   * @param {THREE.Camera} camera
   * @param {HTMLCanvasElement} domElement
   * @param {THREE.Object3D} scene
   */
  constructor(camera, domElement, scene) {
    this.camera = camera;
    this.domElement = domElement;
    this.scene = scene;

    this.raycaster = new THREE.Raycaster();
    this.ndcMouse = new THREE.Vector2(-10, -10);
    this.cameraParallax = new THREE.Vector2(0, 0);

    this.isPointerDown = false;

    // Raycast target references
    this.phoneMesh = null;
    this.spenMesh = null;
    this.displayMesh = null;

    // Callbacks
    this.onPhoneGrabStart = null;
    this.onPhoneGrabMove = null;
    this.onPhoneGrabEnd = null;

    this.onSPenHover = null;
    this.onSPenClick = null;

    this.onScreenInteract = null;

    this.dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    this.intersectionPoint = new THREE.Vector3();

    this.bindEvents();
  }

  initTargets() {
    this.phoneMesh = this.scene.getObjectByName('S25 Utra Model');
    this.spenMesh = this.scene.getObjectByName('SPen');
    this.displayMesh = this.scene.getObjectByName('S25 Utra Model');
  }

  bindEvents() {
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);

    this.domElement.addEventListener('pointermove', this.handlePointerMove);
    this.domElement.addEventListener('pointerdown', this.handlePointerDown);
    window.addEventListener('pointerup', this.handlePointerUp);
  }

  /**
   * Converts screen pixel mouse coordinates to Normalized Device Coordinates (NDC -1..1).
   */
  updateMouse(e) {
    const rect = this.domElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.ndcMouse.x = (x / rect.width) * 2 - 1;
    this.ndcMouse.y = -(y / rect.height) * 2 + 1;

    // Subtle parallax offset (-0.5 .. 0.5)
    this.cameraParallax.x = (x / rect.width - 0.5) * 2;
    this.cameraParallax.y = (y / rect.height - 0.5) * 2;
  }

  handlePointerMove(e) {
    this.updateMouse(e);
    this.raycaster.setFromCamera(this.ndcMouse, this.camera);

    if (this.isPointerDown && this.onPhoneGrabMove) {
      this.raycaster.ray.intersectPlane(this.dragPlane, this.intersectionPoint);
      this.onPhoneGrabMove(this.intersectionPoint);
    }

    // Check S-Pen hover
    if (this.spenMesh) {
      const spenIntersects = this.raycaster.intersectObject(this.spenMesh, true);
      if (this.onSPenHover) {
        this.onSPenHover(spenIntersects.length > 0);
      }
    }

    // Check Display UV interaction
    if (this.displayMesh) {
      const displayIntersects = this.raycaster.intersectObject(this.displayMesh, true);
      if (displayIntersects.length > 0) {
        const hit = displayIntersects[0];
        if (hit.uv && this.onScreenInteract) {
          this.onScreenInteract(hit.point, true, hit.uv.x, hit.uv.y, this.isPointerDown);
        }
      } else if (this.onScreenInteract) {
        this.raycaster.ray.intersectPlane(this.dragPlane, this.intersectionPoint);
        this.onScreenInteract(this.intersectionPoint, false, 0, 0, false);
      }
    }
  }

  handlePointerDown(e) {
    this.isPointerDown = true;
    this.updateMouse(e);
    this.raycaster.setFromCamera(this.ndcMouse, this.camera);

    // 1. Check SPen click
    if (this.spenMesh) {
      const spenHits = this.raycaster.intersectObject(this.spenMesh, true);
      if (spenHits.length > 0) {
        if (this.onSPenClick) this.onSPenClick();
        return;
      }
    }

    // 2. Check Display click
    if (this.displayMesh) {
      const displayHits = this.raycaster.intersectObject(this.displayMesh, true);
      if (displayHits.length > 0) {
        const hit = displayHits[0];
        if (hit.uv && this.onScreenInteract) {
          this.onScreenInteract(hit.point, true, hit.uv.x, hit.uv.y, true);
        }
        return;
      }
    }

    // 3. Phone grab check
    if (this.phoneMesh) {
      const phoneHits = this.raycaster.intersectObject(this.phoneMesh, true);
      if (phoneHits.length > 0) {
        const hitPoint = phoneHits[0].point;
        // Update drag plane to intersect phone hit point
        this.dragPlane.setFromNormalAndCoplanarPoint(
          this.camera.getWorldDirection(new THREE.Vector3()).negate(),
          hitPoint
        );
        if (this.onPhoneGrabStart) this.onPhoneGrabStart(hitPoint);
      }
    }
  }

  handlePointerUp() {
    this.isPointerDown = false;
    if (this.onPhoneGrabEnd) this.onPhoneGrabEnd();
  }

  dispose() {
    this.domElement.removeEventListener('pointermove', this.handlePointerMove);
    this.domElement.removeEventListener('pointerdown', this.handlePointerDown);
    window.removeEventListener('pointerup', this.handlePointerUp);
  }
}
