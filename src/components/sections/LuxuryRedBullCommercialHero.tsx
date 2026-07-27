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

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      const radius = 1.1 + Math.random() * 1.4;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.15 + Math.random() * 0.3;
      const yOffset = (Math.random() - 0.5) * 2.5;
      const scale = 0.005 + Math.random() * 0.009;
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
  const { scene } = useGLTF("https://res.cloudinary.com/zu63qo7h/raw/upload/v1784898992/portfolio/models/redbull_3d_model.glb");

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
    groupRef.current.rotation.y += delta * 0.28 + spinVelocity;

    const floatY = Math.sin(time * 1.5) * 0.1 + (isActivated ? 0.2 : 0) + (isHovered ? 0.15 : 0);
    groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, floatY, 0.06);

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

// --- 3. DYNAMIC CAMERA & LIGHTING RIG ---
function StudioCameraLightingRig({
  isActivated,
  mousePos,
  isHovered,
}: {
  isActivated: boolean;
  mousePos: { x: number; y: number };
  isHovered: boolean;
}) {
  const spotLightRef = useRef<THREE.SpotLight>(null);
  const fillLightRef = useRef<THREE.DirectionalLight>(null);
  const rimLightRef = useRef<THREE.PointLight>(null);
  const envGroupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(() => {
    const targetFov = isHovered ? 41 : isActivated ? 43 : 45;
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetFov, 0.05);
      camera.updateProjectionMatrix();
    }

    if (spotLightRef.current) {
      const targetSpotX = mousePos.x * 2.5;
      const targetSpotY = 5.5 + mousePos.y * 1.5;
      spotLightRef.current.position.x = THREE.MathUtils.lerp(spotLightRef.current.position.x, targetSpotX, 0.08);
      spotLightRef.current.position.y = THREE.MathUtils.lerp(spotLightRef.current.position.y, targetSpotY, 0.08);
      spotLightRef.current.intensity = isActivated ? 6.5 : 4.0;
    }

    if (fillLightRef.current) {
      fillLightRef.current.intensity = isActivated ? 1.8 : 1.2;
    }

    if (rimLightRef.current) {
      rimLightRef.current.intensity = isActivated ? 4.5 : 2.5;
    }

    if (envGroupRef.current) {
      envGroupRef.current.rotation.y += 0.003;
    }
  });

  return (
    <>
      <spotLight
        ref={spotLightRef}
        position={[0, 5.5, 4.5]}
        angle={0.65}
        penumbra={0.8}
        intensity={4.0}
        color="#fff5cc"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      <directionalLight
        ref={fillLightRef}
        position={[-4.5, 2.5, -2.5]}
        intensity={1.2}
        color="#ffd54f"
      />

      <pointLight
        ref={rimLightRef}
        position={[3.5, 1.5, -3.5]}
        intensity={2.5}
        color="#ffab00"
      />

      <group ref={envGroupRef}>
        <Environment preset="studio" environmentIntensity={isActivated ? 0.95 : 0.75} />
      </group>

      <GoldDustParticles isActivated={isActivated} />
    </>
  );
}

// --- 4. MAIN HERO SECTION COMPONENT (Nico Studio Design System) ---
export default function LuxuryRedBullCommercialHero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isActivated, setIsActivated] = useState(false);
  const [spinVelocity, setSpinVelocity] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const lastXRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animId: number;
    const updateVelocity = () => {
      setSpinVelocity((prev) => prev * 0.93);
      animId = requestAnimationFrame(updateVelocity);
    };
    animId = requestAnimationFrame(updateVelocity);
    return () => cancelAnimationFrame(animId);
  }, []);

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
      className="relative w-full min-h-[92vh] bg-[#141414] text-white overflow-hidden flex flex-col justify-between px-6 md:px-12 pt-24 md:pt-32 pb-8 md:pb-12 border-b border-white/10 select-none"
    >
      {/* Background Radial Glow */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
          isActivated ? "opacity-100" : "opacity-40"
        }`}
      >
        <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-[#ffff7b]/10 via-[#ffff7b]/3 to-transparent blur-3xl" />
      </div>

      {/* Background Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
        <div className="w-full h-full border-b border-dashed border-white/20" />
      </div>

      {/* Main Split Content: Left Editorial Typography & Right 3D Canvas */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-8">
        {/* Left Column: Nico Studio Editorial Typography */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-7 order-2 lg:order-1 pt-12 md:pt-0">
          <ScrollReveal direction="right" delay={0.2}>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#ffff7b] text-[#141414] font-mono text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#141414] animate-ping" />
                <span className="uppercase tracking-widest">VIP COLLECTOR&apos;S EDITION</span>
              </div>

              {/* Title with Playfair Display & Italic Highlights */}
              <h1 className="font-playfair text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08]">
                Red Bull <br />
                <em className="font-playfair italic font-normal text-[#ffff7b]">
                  24K Gold
                </em>{" "}
                Concept
              </h1>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.3}>
            <p className="font-sans text-white/70 text-base md:text-lg max-w-xl leading-relaxed font-normal">
              An exclusive, high-end luxury re-imagining of the iconic Red Bull energy can — featuring custom 24K brushed metallic shaders, precision micro-embossed relief, and interactive studio lighting.
            </p>
          </ScrollReveal>

          {/* Nico Specs Glass Pills */}
          <ScrollReveal direction="right" delay={0.4}>
            <div className="flex flex-wrap gap-2.5 font-mono text-[11px]">
              <div className="border border-white/10 bg-white/5 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 text-white">
                <span className="text-[#ffff7b] font-bold">PBR</span>
                <span className="text-white/20">|</span>
                <span className="text-white/80">24K BRUSHED GOLD</span>
              </div>
              <div className="border border-white/10 bg-white/5 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 text-white">
                <span className="text-[#ffff7b] font-bold">LIGHT RIG</span>
                <span className="text-white/20">|</span>
                <span className="text-white/80">BALANCED SPECULAR</span>
              </div>
              <div className="border border-white/10 bg-white/5 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 text-white">
                <span className="text-[#ffff7b] font-bold">FPS</span>
                <span className="text-white/20">|</span>
                <span className="text-white/80">60 FPS GPU INSTANCED</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive CTA Buttons (Nico Yellow Action Pill + Glass Pill) */}
          <ScrollReveal direction="right" delay={0.5}>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={toggleActivation}
                className="inline-flex items-center gap-2.5 bg-[#ffff7b] text-[#141414] font-sans font-bold text-xs md:text-sm uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-white active:scale-95 transition-all duration-200 shadow-xl cursor-pointer group"
              >
                <span>{isActivated ? "RESET LIGHTING PASS" : "ACTIVATE COMMERCIAL SHOT"}</span>
                <span className="w-5 h-5 rounded-full bg-[#141414] text-[#ffff7b] flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform flex-shrink-0">
                  ↗
                </span>
              </button>

              <button
                onClick={triggerBoostSpin}
                className="inline-flex items-center gap-2.5 border border-white/20 hover:border-[#ffff7b] bg-white/5 hover:bg-white/10 text-white font-sans font-bold text-xs md:text-sm uppercase tracking-wider px-7 py-3.5 rounded-full transition-all duration-200 cursor-pointer active:scale-95"
              >
                <svg className="w-4 h-4 text-[#ffff7b] animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>360° SPIN BURST</span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Column: 3D Luxury Can Interactive Canvas (UNTOUCHED) */}
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
          <div className={`absolute bottom-4 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full pointer-events-none transition-opacity duration-300 ${isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <span className="font-mono text-[10px] text-[#ffff7b] uppercase tracking-widest font-bold">
              [ CLICK &amp; DRAG TO SPIN MODEL // HOVER PROXIMITY ZOOM ]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
