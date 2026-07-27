"use client";

import { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Center, useGLTF, PresentationControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// --- FLAVOR CONFIGURATION ---
export interface FlavorConfig {
  id: string;
  name: string;
  subName: string;
  color: string;
  accentGlow: string;
  notes: string;
  textureUrl: string;
  localTextureUrl?: string;
  stickers: {
    url: string;
    localUrl?: string;
    scale: number;
    orbitRadius: number;
    orbitSpeed: number;
    orbitHeight: number;
    initialAngle: number;
  }[];
}

export interface LightingSettings {
  ambientIntensity: number;
  keyIntensity: number;
  keyX: number;
  keyY: number;
  keyZ: number;
  fillIntensity: number;
  rimIntensity: number;
  mouseLightIntensity: number;
  envIntensity: number;
  roughness: number;
  metalness: number;
  scale: number;
  yOffset: number;
}

const DEFAULT_LIGHTING: LightingSettings = {
  ambientIntensity: 1.15,
  keyIntensity: 1.6,
  keyX: -5.5,
  keyY: 6.0,
  keyZ: 5.0,
  fillIntensity: 1.7,
  rimIntensity: 1.2,
  mouseLightIntensity: 1.1,
  envIntensity: 0.05,
  roughness: 1.0,
  metalness: 0.05,
  scale: 0.44,
  yOffset: -0.15,
};

export const DANUP_FLAVORS: FlavorConfig[] = [
  {
    id: "fraise",
    name: "FRAISE",
    subName: "Fresh Strawberry Yogurt",
    color: "#FF2E63",
    accentGlow: "rgba(255, 46, 99, 0.45)",
    notes: "Juicy Wild Strawberry • Creamy Milk • 260g",
    textureUrl: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785158510/portfolio/danup/textures/labels/buqwc9fgikbtdzpzbfer.png",
    stickers: [
      {
        url: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171311/portfolio/danup/elements_named/Objet_dynamique_vectoriel.png",
        scale: 0.95,
        orbitRadius: 2.1,
        orbitSpeed: 0.35,
        orbitHeight: 0.4,
        initialAngle: 0,
      },
      {
        url: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171320/portfolio/danup/elements_named/Spotify_splach.png",
        scale: 0.85,
        orbitRadius: 2.3,
        orbitSpeed: -0.3,
        orbitHeight: -0.4,
        initialAngle: Math.PI * 0.6,
      },
      {
        url: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171313/portfolio/danup/elements_named/rapup-.png",
        scale: 0.9,
        orbitRadius: 2.2,
        orbitSpeed: 0.4,
        orbitHeight: 0.6,
        initialAngle: Math.PI * 1.3,
      },
      {
        url: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171321/portfolio/danup/elements_named/Spotify_thunder.png",
        scale: 0.75,
        orbitRadius: 2.4,
        orbitSpeed: -0.25,
        orbitHeight: -0.2,
        initialAngle: Math.PI * 1.8,
      },
    ],
  },
  {
    id: "melba",
    name: "MELBA",
    subName: "Peach & Vanilla Crunch",
    color: "#FF7B25",
    accentGlow: "rgba(255, 123, 37, 0.45)",
    notes: "Ripe Golden Peach • Vanilla Swirl • 260g",
    textureUrl: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785158511/portfolio/danup/textures/labels/wbda1v8gxbkexmcbpolb.png",
    stickers: [
      {
        url: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171311/portfolio/danup/elements_named/Objet_dynamique_vectoriel.png",
        scale: 0.95,
        orbitRadius: 2.1,
        orbitSpeed: 0.35,
        orbitHeight: 0.4,
        initialAngle: 0,
      },
      {
        url: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171317/portfolio/danup/elements_named/Spotify_peach.png",
        scale: 0.9,
        orbitRadius: 2.25,
        orbitSpeed: -0.35,
        orbitHeight: -0.4,
        initialAngle: Math.PI * 0.65,
      },
      {
        url: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171313/portfolio/danup/elements_named/rapup-.png",
        scale: 0.85,
        orbitRadius: 2.3,
        orbitSpeed: 0.3,
        orbitHeight: 0.65,
        initialAngle: Math.PI * 1.35,
      },
      {
        url: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171319/portfolio/danup/elements_named/Spotify_Skate.png",
        scale: 0.8,
        orbitRadius: 2.4,
        orbitSpeed: -0.28,
        orbitHeight: -0.3,
        initialAngle: Math.PI * 1.85,
      },
    ],
  },
  {
    id: "vanilla",
    name: "VANILLA",
    subName: "Sweet Madagascar Vanilla",
    color: "#FAD02C",
    accentGlow: "rgba(250, 208, 44, 0.45)",
    notes: "Velvety Madagascar Vanilla • Rich Cream • 260g",
    textureUrl: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785158512/portfolio/danup/textures/labels/gugs11bgwdyapkwdfk56.png",
    stickers: [
      {
        url: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171311/portfolio/danup/elements_named/Objet_dynamique_vectoriel.png",
        scale: 0.95,
        orbitRadius: 2.1,
        orbitSpeed: 0.35,
        orbitHeight: 0.4,
        initialAngle: 0,
      },
      {
        url: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171324/portfolio/danup/elements_named/Spotifyvanille.png",
        scale: 1.05,
        orbitRadius: 2.2,
        orbitSpeed: -0.35,
        orbitHeight: -0.4,
        initialAngle: Math.PI * 0.7,
      },
      {
        url: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171313/portfolio/danup/elements_named/rapup-.png",
        scale: 0.85,
        orbitRadius: 2.3,
        orbitSpeed: 0.3,
        orbitHeight: 0.6,
        initialAngle: Math.PI * 1.4,
      },
      {
        url: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171318/portfolio/danup/elements_named/Spotify_recorder.png",
        scale: 0.8,
        orbitRadius: 2.45,
        orbitSpeed: -0.25,
        orbitHeight: -0.2,
        initialAngle: Math.PI * 1.9,
      },
    ],
  },
  {
    id: "tropical",
    name: "TROPICAL",
    subName: "Exotic Passionfruit Blast",
    color: "#00E5C0",
    accentGlow: "rgba(0, 229, 192, 0.45)",
    notes: "Exotic Mango • Passionfruit Zing • 260g",
    textureUrl: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785158513/portfolio/danup/textures/labels/nztlidbyen8ejmoqzleg.png",
    stickers: [
      {
        url: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171311/portfolio/danup/elements_named/Objet_dynamique_vectoriel.png",
        scale: 0.95,
        orbitRadius: 2.1,
        orbitSpeed: 0.35,
        orbitHeight: 0.4,
        initialAngle: 0,
      },
      {
        url: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171314/portfolio/danup/elements_named/Spotify_fachfecha.png",
        scale: 0.9,
        orbitRadius: 2.25,
        orbitSpeed: -0.35,
        orbitHeight: -0.45,
        initialAngle: Math.PI * 0.65,
      },
      {
        url: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171313/portfolio/danup/elements_named/rapup-.png",
        scale: 0.85,
        orbitRadius: 2.3,
        orbitSpeed: 0.3,
        orbitHeight: 0.6,
        initialAngle: Math.PI * 1.35,
      },
      {
        url: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171321/portfolio/danup/elements_named/Spotify_thunder.png",
        scale: 0.8,
        orbitRadius: 2.4,
        orbitSpeed: -0.28,
        orbitHeight: -0.25,
        initialAngle: Math.PI * 1.85,
      },
    ],
  },
];

// --- DYNAMIC INTERACTIVE MOUSE-FOLLOWING POINT LIGHT ---
function DynamicMouseLight({ color, intensity }: { color: string; intensity: number }) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (!lightRef.current) return;
    lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, state.mouse.x * 3.5, 0.1);
    lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, state.mouse.y * 2.5 + 0.8, 0.1);
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 1, 2.5]}
      intensity={intensity}
      color={color}
      distance={9}
      decay={1.8}
    />
  );
}

// --- GPU AMBIENT FLAVOR PARTICLES ---
function FlavorDustParticles({ activeColor }: { activeColor: string }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const count = 40;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      const radius = 1.5 + Math.random() * 2.0;
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.2 + Math.random() * 0.4;
      const yOffset = (Math.random() - 0.5) * 2.4;
      const scale = 0.015 + Math.random() * 0.022;
      data.push({ radius, angle, speed, yOffset, scale });
    }
    return data;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      const currentAngle = p.angle + time * p.speed * 0.45;
      const x = Math.cos(currentAngle) * p.radius;
      const z = Math.sin(currentAngle) * p.radius;
      const y = p.yOffset + Math.sin(time * p.speed + i) * 0.22;

      dummy.position.set(x, y, z);
      dummy.scale.set(p.scale, p.scale, p.scale);
      dummy.rotation.set(time * 0.5, time * 0.25, 0);
      dummy.updateMatrix();

      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 10, 10]} />
      <meshStandardMaterial
        color={activeColor}
        emissive={activeColor}
        emissiveIntensity={0.8}
        roughness={0.15}
        metalness={0.85}
        transparent
        opacity={0.75}
      />
    </instancedMesh>
  );
}

// --- 3D FLOATING INTERACTIVE ORBITING STICKER ---
function OrbitingSticker({
  texturePath,
  localTexturePath,
  scale,
  orbitRadius,
  orbitSpeed,
  orbitHeight,
  initialAngle,
}: {
  texturePath: string;
  localTexturePath?: string;
  scale: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitHeight: number;
  initialAngle: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");
    loader.load(texturePath, (remoteTex) => {
      remoteTex.colorSpace = THREE.SRGBColorSpace;
      setTexture(remoteTex);
    });
  }, [texturePath]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const angle = initialAngle + time * orbitSpeed;

    meshRef.current.position.x = Math.cos(angle) * orbitRadius;
    meshRef.current.position.z = Math.sin(angle) * orbitRadius;
    meshRef.current.position.y = orbitHeight + Math.sin(time * 2.4 + initialAngle) * 0.28;

    meshRef.current.rotation.y = -angle + Math.PI / 2;
    meshRef.current.rotation.z = Math.sin(time * 2.8 + initialAngle) * 0.2 + (clicked ? Math.PI * 2 : 0);
    meshRef.current.rotation.x = Math.cos(time * 2.0 + initialAngle) * 0.15;

    const baseScale = clicked ? scale * 1.6 : hovered ? scale * 1.45 : scale;
    meshRef.current.scale.lerp(new THREE.Vector3(baseScale, baseScale, baseScale), 0.14);
  });

  if (!texture) return null;

  return (
    <mesh
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        setClicked((prev) => !prev);
      }}
    >
      <planeGeometry args={[1, 1]} />
      <meshStandardMaterial
        map={texture}
        transparent
        depthWrite={false}
        roughness={0.15}
        metalness={0.05}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// --- 3D BOTTLE MODEL WITH LIVE GUI CONTROLLED MATERIAL & TRANSFORM ---
function DanupBottle({
  activeFlavor,
  autoSpin,
  lighting,
}: {
  activeFlavor: FlavorConfig;
  autoSpin: boolean;
  lighting: LightingSettings;
}) {
  const cdnModelUrl = "https://res.cloudinary.com/zu63qo7h/raw/upload/v1785158509/portfolio/danup/models/danup_ala_bottle.glb";

  const { scene } = useGLTF(cdnModelUrl);
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!clonedScene) return;

    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin("anonymous");

    const applyTexture = (tex: THREE.Texture) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.flipY = false;

      clonedScene.traverse((child: any) => {
        if (child.isMesh && child.material) {
          const matName = (child.material.name || "").trim();

          // 1. Metal Lid: PRESERVE ORIGINAL GLTF METALLIC MATERIAL UNTOUCHED (prevents lid glitching)
          if (matName === "Metal Lid") {
            return;
          }

          // 2. Plastic: Opaque plastic cap & bottle top (prevents see-through inside-out artifacts)
          if (matName === "Plastic") {
            child.material.transparent = false;
            child.material.opacity = 1.0;
            child.material.depthWrite = true;
            child.material.depthTest = true;
            child.material.side = THREE.FrontSide;
            child.material.needsUpdate = true;
            return;
          }

          // 3. Bottle Label & Melba: Hot-swap active flavor texture
          if (matName === "label" || matName === "Melba" || matName.toLowerCase().includes("label")) {
            child.material = child.material.clone();
            child.material.map = tex;
            child.material.transparent = false;
            child.material.opacity = 1.0;
            child.material.depthWrite = true;
            child.material.depthTest = true;
            child.material.side = THREE.FrontSide;
            child.material.roughness = lighting.roughness;
            child.material.metalness = lighting.metalness;
            child.material.needsUpdate = true;
          }
        }
      });
    };

    // Initial pass: fix Plastic transparency without altering Metal Lid
    clonedScene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const matName = (child.material.name || "").trim();
        if (matName === "Plastic") {
          child.material.transparent = false;
          child.material.opacity = 1.0;
          child.material.depthWrite = true;
          child.material.depthTest = true;
          child.material.side = THREE.FrontSide;
        }
      }
    });

    loader.load(activeFlavor.textureUrl, applyTexture);
  }, [clonedScene, activeFlavor, lighting.roughness, lighting.metalness]);

  useFrame((state) => {
    if (groupRef.current) {
      const targetY = autoSpin
        ? Math.sin(state.clock.elapsedTime * 0.45) * 0.25 + state.mouse.x * 0.4
        : state.mouse.x * 0.5;
      const targetX = -state.mouse.y * 0.25;

      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.08);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.08);
    }
  });

  return (
    <group ref={groupRef} position={[0, lighting.yOffset, 0]}>
      <Center>
        <primitive object={clonedScene} scale={lighting.scale} />
      </Center>

      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.65}
        scale={4.8}
        blur={2.4}
        far={3.5}
        color="#000000"
      />

      {activeFlavor.stickers.map((sticker, idx) => (
        <OrbitingSticker
          key={`${activeFlavor.id}-sticker-${idx}`}
          texturePath={sticker.url}
          scale={sticker.scale}
          orbitRadius={sticker.orbitRadius}
          orbitSpeed={sticker.orbitSpeed}
          orbitHeight={sticker.orbitHeight}
          initialAngle={sticker.initialAngle}
        />
      ))}
    </group>
  );
}

// --- MAIN DANUP BOTTLE HERO WITH LIVE LIGHTING GUI STUDIO ---
export default function DanupBottleHero() {
  const [activeFlavor, setActiveFlavor] = useState<FlavorConfig>(DANUP_FLAVORS[0]);
  const [autoSpin, setAutoSpin] = useState(true);
  const [showGui, setShowGui] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [lighting, setLighting] = useState<LightingSettings>(DEFAULT_LIGHTING);

  const updateSetting = (key: keyof LightingSettings, val: number) => {
    setLighting((prev) => ({ ...prev, [key]: val }));
  };

  const copyConfigCode = () => {
    const codeStr = JSON.stringify(lighting, null, 2);
    navigator.clipboard.writeText(codeStr);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div
      className="relative w-full min-h-screen text-white overflow-hidden flex flex-col justify-between px-6 md:px-12 pt-24 md:pt-32 pb-8 md:pb-12 selection:bg-[#FF2E63] selection:text-white transition-colors duration-700"
      style={{
        backgroundColor: "#060608",
      }}
    >
      {/* Dynamic Flavor Background Radial Aura */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-1000 ease-out blur-[150px] opacity-45"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${activeFlavor.color} 0%, ${activeFlavor.color}20 45%, transparent 75%)`,
        }}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Top Header Badge & Title */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs font-bold tracking-widest text-[#0E0E10] bg-[#ffff7b] px-3.5 py-1 rounded-full uppercase">
              Project Showcase 03
            </span>
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-white/60">
              Commercial Packaging &amp; 3D CGI
            </span>
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
            DANUP <span className="italic font-normal text-[#ffff7b]">x</span> ALA
          </h1>
          {/* Credits Badge */}
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] text-white/50">3D Artist:</span>
              <a
                href="https://www.behance.net/mahdigouadria"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] font-bold text-[#ffff7b] hover:underline flex items-center gap-1"
              >
                Mahdi Gouadria
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
            <span className="text-white/30 text-xs">•</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] text-white/50">Motion Designer:</span>
              <a
                href="https://www.behance.net/MabroukAziz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] font-bold text-[#ffff7b] hover:underline flex items-center gap-1"
              >
                Mabrouk Aziz
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Dynamic Active Flavor Indicator & Info */}
        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3.5 rounded-2xl transition-all duration-500 shadow-xl">
          <div
            className="w-4 h-4 rounded-full animate-pulse shadow-lg transition-colors duration-500"
            style={{
              backgroundColor: activeFlavor.color,
              boxShadow: `0 0 20px ${activeFlavor.color}`,
            }}
          />
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/50">Selected Edition</p>
            <p className="font-sans font-bold text-sm text-white uppercase tracking-wider">
              {activeFlavor.name} — <span className="font-normal text-white/70">{activeFlavor.subName}</span>
            </p>
            <p className="font-mono text-[10px] text-[#ffff7b] mt-0.5">{activeFlavor.notes}</p>
          </div>
        </div>
      </div>

      {/* Central 3D Canvas Area (LIVE LIGHTING GUI CONTROLLED) */}
      <div className="relative w-full h-[60vh] md:h-[68vh] my-2 cursor-grab active:cursor-grabbing flex items-center justify-center">
        <Canvas camera={{ position: [0, 0, 5.2], fov: 38 }}>
          <ambientLight intensity={lighting.ambientIntensity} />
          <directionalLight
            position={[lighting.keyX, lighting.keyY, lighting.keyZ]}
            intensity={lighting.keyIntensity}
            color="#FFFFFF"
          />
          <directionalLight position={[-4.5, 2, -2]} intensity={lighting.fillIntensity} color={activeFlavor.color} />
          <directionalLight position={[0, 4, -4.5]} intensity={lighting.rimIntensity} color="#FFFFFF" />
          <DynamicMouseLight color={activeFlavor.color} intensity={lighting.mouseLightIntensity} />

          <Suspense fallback={null}>
            <PresentationControls
              global={false}
              cursor={true}
              snap={true}
              speed={1.5}
              zoom={1}
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 6, Math.PI / 6]}
              azimuth={[-Infinity, Infinity]}
            >
              <DanupBottle activeFlavor={activeFlavor} autoSpin={autoSpin} lighting={lighting} />
              <FlavorDustParticles activeColor={activeFlavor.color} />
            </PresentationControls>
            <Environment preset="studio" environmentIntensity={lighting.envIntensity} />
          </Suspense>
        </Canvas>

        {/* Floating GUI Toggle & Helper Controls Bar */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-auto z-30 flex-wrap justify-center">
          <button
            onClick={() => setAutoSpin(!autoSpin)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md border transition-all duration-300 shadow-xl ${
              autoSpin
                ? "bg-white/15 border-white/40 text-white hover:bg-white/25"
                : "bg-black/70 border-white/15 text-white/70 hover:text-white"
            }`}
          >
            <span
              className="w-2 h-2 rounded-full transition-colors duration-500"
              style={{ backgroundColor: autoSpin ? activeFlavor.color : "#ffffff50" }}
            />
            {autoSpin ? "AUTO SPIN: ON" : "AUTO SPIN: OFF"}
          </button>

          {/* Interactive GUI Panel Toggle Button */}
          <button
            onClick={() => setShowGui(!showGui)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md border transition-all duration-300 shadow-xl ${
              showGui
                ? "bg-[#ffff7b] text-[#191919] border-[#ffff7b] shadow-[0_0_15px_rgba(255,255,123,0.5)]"
                : "bg-black/80 text-white border-white/20 hover:border-[#ffff7b]"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            <span>{showGui ? "CLOSE LIGHTING GUI" : "TWEAK LIGHTING STUDIO GUI"}</span>
          </button>
        </div>

        {/* --- FLOATING LIGHTING STUDIO GUI CONTROL PANEL --- */}
        {showGui && (
          <div className="absolute top-4 right-4 z-40 w-80 max-h-[80vh] overflow-y-auto bg-black/90 backdrop-blur-2xl border border-white/20 p-5 rounded-3xl shadow-2xl space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffff7b] animate-ping" />
                <h4 className="font-bold text-white uppercase tracking-wider text-xs">3D Studio Lighting GUI</h4>
              </div>
              <button
                onClick={() => setShowGui(false)}
                className="text-white/50 hover:text-white text-base font-bold px-1"
              >
                ✕
              </button>
            </div>

            {/* Presets */}
            <div>
              <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1.5 font-bold">Studio Presets</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setLighting(DEFAULT_LIGHTING)}
                  className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 rounded-lg border border-white/10 text-[10px] font-bold text-left transition-all"
                >
                  ☀️ Default Studio
                </button>
                <button
                  onClick={() => setLighting({ ...DEFAULT_LIGHTING, ambientIntensity: 0.35, keyIntensity: 2.2, rimIntensity: 3.8, envIntensity: 0.4 })}
                  className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 rounded-lg border border-white/10 text-[10px] font-bold text-left transition-all"
                >
                  🌙 Dramatic Dark
                </button>
                <button
                  onClick={() => setLighting({ ...DEFAULT_LIGHTING, ambientIntensity: 1.2, keyIntensity: 1.8, fillIntensity: 1.2, envIntensity: 1.1 })}
                  className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 rounded-lg border border-white/10 text-[10px] font-bold text-left transition-all"
                >
                  💡 High Vibrant
                </button>
                <button
                  onClick={() => setLighting({ ...DEFAULT_LIGHTING, ambientIntensity: 0.8, keyIntensity: 1.2, rimIntensity: 1.5, roughness: 0.15, metalness: 0.2 })}
                  className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-1.5 rounded-lg border border-white/10 text-[10px] font-bold text-left transition-all"
                >
                  ✨ Glossy Sheen
                </button>
              </div>
            </div>

            {/* Sliders */}
            <div className="space-y-3 pt-2">
              {/* Ambient Light */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Ambient Light</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.ambientIntensity.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.05"
                  value={lighting.ambientIntensity}
                  onChange={(e) => updateSetting("ambientIntensity", parseFloat(e.target.value))}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Key Light */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Key Light Intensity</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.keyIntensity.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.05"
                  value={lighting.keyIntensity}
                  onChange={(e) => updateSetting("keyIntensity", parseFloat(e.target.value))}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Key Light Pos X */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Key Light Position X</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.keyX.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-10"
                  max="10"
                  step="0.5"
                  value={lighting.keyX}
                  onChange={(e) => updateSetting("keyX", parseFloat(e.target.value))}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Fill Light */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Fill Light Intensity</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.fillIntensity.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.05"
                  value={lighting.fillIntensity}
                  onChange={(e) => updateSetting("fillIntensity", parseFloat(e.target.value))}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Rim Light */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Rim Light (Edge Highlight)</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.rimIntensity.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="0.1"
                  value={lighting.rimIntensity}
                  onChange={(e) => updateSetting("rimIntensity", parseFloat(e.target.value))}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Mouse Light */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Mouse Cursor Light</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.mouseLightIntensity.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="0.1"
                  value={lighting.mouseLightIntensity}
                  onChange={(e) => updateSetting("mouseLightIntensity", parseFloat(e.target.value))}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Environment HDRI */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Environment HDRI Reflections</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.envIntensity.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.05"
                  value={lighting.envIntensity}
                  onChange={(e) => updateSetting("envIntensity", parseFloat(e.target.value))}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Label Roughness */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Label Material Roughness</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.roughness.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                  value={lighting.roughness}
                  onChange={(e) => updateSetting("roughness", parseFloat(e.target.value))}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Bottle Scale */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Bottle Scale</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.scale.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="0.8"
                  step="0.02"
                  value={lighting.scale}
                  onChange={(e) => updateSetting("scale", parseFloat(e.target.value))}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 border-t border-white/10 flex gap-2">
              <button
                onClick={copyConfigCode}
                className="flex-1 bg-[#ffff7b] text-[#191919] font-bold py-2 rounded-xl text-center hover:bg-white transition-all shadow-md"
              >
                {copiedCode ? "✓ COPIED VALUES!" : "📋 COPY CONFIG CODE"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 4 Interactive Flavor Color Picker Buttons */}
      <div className="relative z-20 max-w-3xl mx-auto w-full">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-3 md:p-4 rounded-3xl flex flex-wrap md:flex-nowrap justify-between items-center gap-3 shadow-2xl">
          {DANUP_FLAVORS.map((flavor) => {
            const isActive = activeFlavor.id === flavor.id;
            return (
              <button
                key={flavor.id}
                onClick={() => setActiveFlavor(flavor)}
                className={`flex-1 min-w-[140px] flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-500 group relative overflow-hidden border ${
                  isActive
                    ? "bg-white/15 border-white/40 shadow-lg scale-102"
                    : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/20"
                }`}
              >
                {/* Active Indicator Color Sphere */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform duration-300 ${
                    isActive ? "scale-110" : "group-hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: flavor.color,
                    boxShadow: isActive ? `0 0 20px ${flavor.color}` : "none",
                  }}
                />

                <div className="text-left">
                  <p className="font-mono text-[11px] tracking-widest uppercase font-bold text-white/90 group-hover:text-white">
                    {flavor.name}
                  </p>
                  <p className="font-sans text-[10px] text-white/50">
                    {flavor.id === "vanilla" ? "Vanilla" : flavor.id === "fraise" ? "Fraise" : flavor.id === "melba" ? "Melba" : "Tropical"}
                  </p>
                </div>

                {/* Bottom Active Color Bar */}
                {isActive && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-300"
                    style={{ backgroundColor: flavor.color }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
