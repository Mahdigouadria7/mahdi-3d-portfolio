"use client";

import { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Center, useGLTF, AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import * as THREE from "three";
import ScrollReveal from "@/components/ui/ScrollReveal";

// --- 1. GPU INSTANCED AMBIENT GOLD DUST SPECKS ---
function GoldDustParticles({ isActivated }: { isActivated: boolean }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const [count, setCount] = useState(25);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCount(4);
      } else if (window.innerWidth < 1024) {
        setCount(10);
      } else {
        setCount(25);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Pre-generate subtle micro gold dust specks
  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      const radius = 1.1 + Math.random() * 1.4;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.15 + Math.random() * 0.3;
      const yOffset = (Math.random() - 0.5) * 2.5;
      const scale = 0.005 + Math.random() * 0.009; // Fine micro specks
      data.push({ radius, angle, speed, yOffset, scale });
    }
    return data;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const speedMultiplier = isActivated ? 1.4 : 1.0;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const currentAngle = p.angle + time * p.speed * 0.4 * speedMultiplier;
      const currentRadius = isActivated ? p.radius * 1.15 : p.radius;

      const x = Math.cos(currentAngle) * currentRadius;
      const z = Math.sin(currentAngle) * currentRadius;
      const y = p.yOffset + Math.sin(time * p.speed + i) * 0.12;

      dummy.position.set(x, y, z);
      const currentScale = p.scale * (isActivated ? 1.3 : 1.0);
      dummy.scale.set(currentScale, currentScale, currentScale);
      dummy.rotation.set(time * 0.4, time * 0.2, 0);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#ffe57f"
        emissive="#ffb300"
        emissiveIntensity={isActivated ? 0.9 : 0.4}
        roughness={0.2}
        metalness={0.95}
        transparent
        opacity={0.55}
      />
    </instancedMesh>
  );
}

// --- 2. LUXURY RED BULL CAN MODEL WITH INTERACTIVE DRAG SPIN & LIGHT RESPONSE ---
function CommercialCanModel({
  isActivated,
  mousePos,
  spinVelocity,
  isHovered,
  onCanPointerDown,
  onCanPointerOver,
  onCanPointerOut,
}: {
  isActivated: boolean;
  mousePos: { x: number; y: number };
  spinVelocity: number;
  isHovered: boolean;
  onCanPointerDown: (e: any) => void;
  onCanPointerOver: () => void;
  onCanPointerOut: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const canMeshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/models/Redbull Concept/3d Model/3d/redbull 3d model.glb");

  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child: any) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            const prepareMat = (mat: any) => {
              if (mat) {
                // Calibrated environment intensity to prevent blown-out white glare
                mat.envMapIntensity = 1.35;
                mat.depthWrite = true;
                const name = (mat.name || "").toLowerCase().trim();
                if (name.includes("label")) {
                  mat.roughness = 0.32;
                  mat.metalness = 0.75;
                } else if (name.includes("sides") || name.includes("upper sides")) {
                  mat.roughness = 0.18;
                  mat.metalness = 0.92;
                } else if (name.includes("upper") || name.includes("gold")) {
                  mat.roughness = 0.20;
                  mat.metalness = 0.92;
                }
                mat.needsUpdate = true;
              }
            };
            if (Array.isArray(child.material)) {
              child.material.forEach(prepareMat);
            } else {
              prepareMat(child.material);
            }
          }
        }
      });
    }
  }, [clonedScene]);

  useFrame((state, delta) => {
    if (!groupRef.current || !canMeshRef.current) return;

    const time = state.clock.elapsedTime;

    // Continuous 360° rotation + interactive drag spin velocity
    groupRef.current.rotation.y += delta * 0.28 + spinVelocity;

    // Floating sine wave animation + hover lift
    const floatY = Math.sin(time * 1.5) * 0.1 + (isActivated ? 0.2 : 0) + (isHovered ? 0.15 : 0);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, floatY, 0.06);

    // Micro-tilt based on virtual light cursor position (strictly under 3-5 degrees)
    const targetTiltX = -mousePos.y * 0.06;
    const targetTiltZ = -mousePos.x * 0.04;
    canMeshRef.current.rotation.x = THREE.MathUtils.lerp(canMeshRef.current.rotation.x, targetTiltX, 0.05);
    canMeshRef.current.rotation.z = THREE.MathUtils.lerp(canMeshRef.current.rotation.z, targetTiltZ, 0.05);
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={onCanPointerDown}
      onPointerOver={onCanPointerOver}
      onPointerOut={onCanPointerOut}
    >
      <group ref={canMeshRef}>
        <Center>
          <primitive object={clonedScene} scale={1.85} />
        </Center>
      </group>
    </group>
  );
}

// --- 3. LUXURY VIRTUAL LIGHTING & CAMERA RIG ---
function StudioCameraLightingRig({
  isActivated,
  mousePos,
  isHovered,
}: {
  isActivated: boolean;
  mousePos: { x: number; y: number };
  isHovered: boolean;
}) {
  const { camera } = useThree();
  const keyLightRef = useRef<THREE.PointLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);
  const envGroupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    // Soft studio lighting tuned for realistic gold highlights
    if (keyLightRef.current) {
      const targetKeyX = mousePos.x * 5 + 2.5;
      const targetKeyY = mousePos.y * 3.5 + 2.5;
      keyLightRef.current.position.x = THREE.MathUtils.lerp(keyLightRef.current.position.x, targetKeyX, 0.05);
      keyLightRef.current.position.y = THREE.MathUtils.lerp(keyLightRef.current.position.y, targetKeyY, 0.05);
      keyLightRef.current.intensity = THREE.MathUtils.lerp(
        keyLightRef.current.intensity,
        isActivated ? 1.6 : 1.25,
        0.05
      );
    }

    if (rimLightRef.current) {
      const targetRimX = -mousePos.x * 4 - 2.5;
      const targetRimY = -mousePos.y * 2.5 + 1.5;
      rimLightRef.current.position.x = THREE.MathUtils.lerp(rimLightRef.current.position.x, targetRimX, 0.05);
      rimLightRef.current.position.y = THREE.MathUtils.lerp(rimLightRef.current.position.y, targetRimY, 0.05);
    }

    // Smooth HDRI environment rotation
    if (envGroupRef.current) {
      envGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        envGroupRef.current.rotation.y,
        mousePos.x * 0.35,
        0.05
      );
    }

    // Camera Rig - subtle reframe & hover proximity zoom
    const targetCamZ = isActivated ? (isHovered ? 4.1 : 4.5) : isHovered ? 5.0 : 5.8;
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetCamZ, 0.05);

    const targetCamX = mousePos.x * 0.25;
    const targetCamY = mousePos.y * 0.20;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetCamX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetCamY, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      {/* Soft Gold Key Studio Light */}
      <pointLight ref={keyLightRef} position={[2.5, 2.5, 4]} intensity={1.25} color="#ffe8b3" distance={12} />

      {/* Warm Rim Light */}
      <pointLight ref={rimLightRef} position={[-3, 1.5, -2.5]} intensity={0.9} color="#ffab00" distance={10} />

      {/* Subtle Fill Light */}
      <pointLight position={[0, -3, 2.5]} intensity={0.4} color="#5278a3" distance={8} />

      {/* Rotatable Environment Map for Studio Reflections */}
      <group ref={envGroupRef}>
        <Environment preset="studio" environmentIntensity={isActivated ? 0.95 : 0.75} />
      </group>

      <GoldDustParticles isActivated={isActivated} />
    </>
  );
}

// --- 4. MAIN HERO SECTION COMPONENT ---
export default function LuxuryRedBullCommercialHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isActivated, setIsActivated] = useState(false);
  const [spinVelocity, setSpinVelocity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const lastXRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Inertial spin velocity decay loop
  useEffect(() => {
    let animId: number;
    const updateVelocity = () => {
      setSpinVelocity((prev) => prev * 0.93);
      animId = requestAnimationFrame(updateVelocity);
    };
    animId = requestAnimationFrame(updateVelocity);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Pointer move handler for light rig & drag spin
  const handlePointerMoveGlobal = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });

    if (isDragging) {
      const deltaX = e.clientX - lastXRef.current;
      lastXRef.current = e.clientX;
      setSpinVelocity(deltaX * 0.012);
    }
  };

  const handleCanPointerDown = (e: any) => {
    e.stopPropagation();
    setIsDragging(true);
    lastXRef.current = e.clientX;
  };

  const handlePointerUpGlobal = () => {
    setIsDragging(false);
  };

  // Auto trigger activation after 3.5 seconds if user is viewing
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActivated(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const toggleActivation = () => {
    setIsActivated((prev) => !prev);
  };

  const triggerBoostSpin = () => {
    setSpinVelocity(0.18);
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMoveGlobal}
      onPointerUp={handlePointerUpGlobal}
      className="relative w-full min-h-[92vh] bg-[#080808] text-white overflow-hidden flex flex-col justify-between p-6 md:p-12 selection:bg-amber-500 selection:text-black border-b border-amber-500/20"
    >
      {/* Background Radial Halo Glow */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isActivated ? "opacity-100" : "opacity-40"
        }`}
      >
        <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-amber-500/12 via-amber-700/5 to-transparent blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-amber-600/8 via-transparent to-transparent blur-2xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />



      {/* Main Split Content: Left Typography & Right 3D Model */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-8">
        {/* Left Column: Premium Typography & CTAs */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8 order-2 lg:order-1">
          <ScrollReveal direction="right" delay={0.2}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span className="font-mono text-[11px] text-amber-300 uppercase tracking-widest font-semibold">
                  VIP COLLECTOR'S EDITION
                </span>
              </div>

              <h1 className="font-tech text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-[0.95]">
                RED BULL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                  24K GOLD
                </span>{" "}
                CONCEPT
              </h1>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.3}>
            <p className="font-cyber text-white/70 text-base md:text-lg max-w-xl leading-relaxed font-light">
              An exclusive, high-end luxury re-imagining of the iconic Red Bull energy can — featuring custom 24K brushed metallic shaders, precision micro-embossed relief, and interactive studio lighting.
            </p>
          </ScrollReveal>

          {/* Minimal Specs Pills */}
          <ScrollReveal direction="right" delay={0.4}>
            <div className="flex flex-wrap gap-3 font-mono text-[11px] text-amber-300/90">
              <div className="border border-amber-500/25 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg flex items-center gap-2">
                <span className="text-amber-400 font-bold">PBR</span>
                <span className="text-white/40">|</span>
                <span>24K BRUSHED GOLD</span>
              </div>
              <div className="border border-amber-500/25 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg flex items-center gap-2">
                <span className="text-amber-400 font-bold">LIGHT RIG</span>
                <span className="text-white/40">|</span>
                <span>BALANCED SPECULAR</span>
              </div>
              <div className="border border-amber-500/25 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-lg flex items-center gap-2">
                <span className="text-amber-400 font-bold">FPS</span>
                <span className="text-white/40">|</span>
                <span>60 FPS GPU INSTANCED</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive CTA Buttons */}
          <ScrollReveal direction="right" delay={0.5}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={toggleActivation}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-tech font-bold text-sm uppercase tracking-widest px-8 py-4 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>{isActivated ? "RESET LIGHTING PASS" : "ACTIVATE COMMERCIAL SHOT"}</span>
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>

              <button
                onClick={triggerBoostSpin}
                className="border border-amber-500/40 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-tech font-bold text-xs uppercase tracking-widest px-6 py-4 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>360° SPIN BURST</span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: 3D Luxury Can Interactive Canvas */}
        <div className="lg:col-span-6 w-full h-[480px] sm:h-[580px] lg:h-[640px] relative order-1 lg:order-2 flex items-center justify-center cursor-grab active:cursor-grabbing">
          <Canvas
            camera={{ position: [0, 0, 5.8], fov: 45 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            className="w-full h-full"
          >
            <PerformanceMonitor />
            <AdaptiveDpr />
            <Suspense fallback={null}>
              <StudioCameraLightingRig isActivated={isActivated} mousePos={mousePos} isHovered={isHovered} />
              <CommercialCanModel
                isActivated={isActivated}
                mousePos={mousePos}
                spinVelocity={spinVelocity}
                isHovered={isHovered}
                onCanPointerDown={handleCanPointerDown}
                onCanPointerOver={() => setIsHovered(true)}
                onCanPointerOut={() => setIsHovered(false)}
              />
            </Suspense>
          </Canvas>

          {/* Interactive Tooltip Overlay */}
          <div className={`absolute bottom-4 bg-black/80 backdrop-blur-md border border-amber-500/30 px-4 py-2 rounded-full pointer-events-none transition-opacity duration-300 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <span className="font-mono text-[10px] text-amber-300 uppercase tracking-widest font-bold">
              [ CLICK & DRAG TO SPIN MODEL // HOVER PROXIMITY ZOOM ]
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Status HUD */}
      <div className="relative z-20 border-t border-white/10 pt-4 flex flex-wrap justify-between items-center text-xs font-mono text-white/40">
        <div>CGI STUDIO // BLENDER + OCTANE RENDER 2025</div>
        <div className="flex items-center gap-6">
          <span>INTERACTIVE INERTIAL SPIN: READY</span>
          <span>BALANCED SPECULAR: 1.35</span>
          <span className="text-amber-400">FPS: 60</span>
        </div>
      </div>
    </section>
  );
}
