"use client";

import { useRef, useState, useEffect, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, PresentationControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

export interface FlavorConfig {
  id: string;
  name: string;
  subName: string;
  color: string;
  accentGlow: string;
  notes: string;
  textureUrl: string;
  localTextureUrl: string;
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
  ambientIntensity: 0.55,
  keyIntensity: 1.6,
  keyX: -5.5,
  keyY: 1.5,
  keyZ: 2.0,
  fillIntensity: 1.4,
  rimIntensity: 1.2,
  mouseLightIntensity: 1.0,
  envIntensity: 0.05,
  roughness: 1.0,
  metalness: 0.05,
  scale: 4.2,
  yOffset: -0.15,
};

export const DANAO_FLAVORS: FlavorConfig[] = [
  {
    id: "pomme",
    name: "POMME & AGRUMES",
    subName: "Crisp Green Apple & Citrus Juice",
    color: "#2ECC71",
    accentGlow: "rgba(46, 204, 113, 0.45)",
    notes: "Fresh Green Apple • Tangy Citrus • Milk & Juice Blend",
    textureUrl: "https://res.cloudinary.com/zu63qo7h/image/upload/portfolio/danao/textures/labels/pp3rjv9ytgrlidqsoltf.png",
    localTextureUrl: "/models/Danao content/Model/Textures/danao Label/Base Color/Apple Danao.png",
  },
  {
    id: "peche",
    name: "PÊCHE & LAIT",
    subName: "Juicy Peach & Milk Blend",
    color: "#FF7E47",
    accentGlow: "rgba(255, 126, 71, 0.45)",
    notes: "Sun-Ripened Golden Peach • Creamy Smooth Milk • 250ml",
    textureUrl: "https://res.cloudinary.com/zu63qo7h/image/upload/portfolio/danao/textures/labels/kbtii4slf4ezmfzvlykc.png",
    localTextureUrl: "/models/Danao content/Model/Textures/danao Label/Base Color/peche dnao.png",
  },
];

// --- DYNAMIC MOUSE LIGHTING ---
function DynamicMouseLight({ color, intensity }: { color: string; intensity: number }) {
  const lightRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (lightRef.current) {
      const x = (state.mouse.x * 4);
      const y = (state.mouse.y * 3) + 1;
      lightRef.current.position.set(x, y, 3.5);
    }
  });

  return <pointLight ref={lightRef} intensity={intensity} color={color} distance={8} decay={2} />;
}

// --- 3D DANAO BOTTLE MODEL COMPONENT ---
function DanaoBottle({
  activeFlavor,
  autoSpin,
  lighting,
}: {
  activeFlavor: FlavorConfig;
  autoSpin: boolean;
  lighting: LightingSettings;
}) {
  const modelUrl = "https://res.cloudinary.com/zu63qo7h/raw/upload/v1785167697/portfolio/danao/models/danao_model_main.glb";
  const { scene } = useGLTF(modelUrl) as any;
  const bottleRef = useRef<THREE.Group>(null);
  const textureLoader = useMemo(() => new THREE.TextureLoader(), []);

  const activeLabelTexture = useMemo(() => {
    const tex = textureLoader.load(activeFlavor.textureUrl, undefined, undefined, () => {
      textureLoader.load(activeFlavor.localTextureUrl);
    });
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.flipY = false;
    return tex;
  }, [activeFlavor, textureLoader]);

  useEffect(() => {
    scene.traverse((child: any) => {
      if (child.isMesh && child.material) {
        const matName = (child.material.name || "").toLowerCase();

        if (matName.includes("label")) {
          child.material.map = activeLabelTexture;
          child.material.color = new THREE.Color("#FFFFFF");
          child.material.transparent = false;
          child.material.opacity = 1.0;
          child.material.alphaTest = 0.1;
          child.material.depthWrite = true;
          child.material.depthTest = true;
          child.material.side = THREE.DoubleSide;
          child.material.roughness = 0.25;
          child.material.metalness = 0.0;
          child.material.needsUpdate = true;
        } else if (matName.includes("lid")) {
          child.material.color = new THREE.Color("#CCCCCC");
          child.material.metalness = 0.85;
          child.material.roughness = 0.2;
          child.material.transparent = false;
          child.material.depthWrite = true;
          child.material.side = THREE.DoubleSide;
          child.material.needsUpdate = true;
        } else if (matName.includes("plastic") || matName === "") {
          child.material.color = new THREE.Color("#F5F5F5");
          child.material.transparent = false;
          child.material.opacity = 1.0;
          child.material.depthWrite = true;
          child.material.depthTest = true;
          child.material.side = THREE.DoubleSide;
          child.material.roughness = 0.2;
          child.material.metalness = 0.0;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene, activeLabelTexture, lighting]);

  useFrame((_, delta) => {
    if (bottleRef.current && autoSpin) {
      bottleRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={bottleRef} scale={lighting.scale} position={[0, lighting.yOffset, 0]}>
      <primitive object={scene} />
      <ContactShadows position={[0, -1.8, 0]} opacity={0.65} scale={5} blur={1.5} far={4} color="#000000" />
    </group>
  );
}

// --- MAIN DANAO BOTTLE HERO COMPONENT ---
export default function DanaoBottleHero() {
  const [activeFlavor, setActiveFlavor] = useState<FlavorConfig>(DANAO_FLAVORS[0]);
  const [autoSpin, setAutoSpin] = useState(true);
  const [lighting, setLighting] = useState<LightingSettings>(DEFAULT_LIGHTING);
  const [showGui, setShowGui] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  return (
    <div
      className="relative w-full min-h-screen text-white overflow-hidden flex flex-col justify-between px-6 md:px-12 pt-24 md:pt-32 pb-8 md:pb-12 selection:bg-[#2ECC71] selection:text-white transition-colors duration-700"
      style={{ backgroundColor: "#060806" }}
    >
      {/* Background Radial Glow */}
      <div
        className="absolute inset-0 transition-opacity duration-1000 pointer-events-none z-0"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${activeFlavor.accentGlow} 0%, rgba(6,8,6,0.95) 70%)`,
        }}
      />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Top Header Badge & Title */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs font-bold tracking-widest text-[#0E0E10] bg-[#ffff7b] px-3.5 py-1 rounded-full uppercase">
              Project Showcase 04
            </span>
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-white/60">
              Commercial Packaging &amp; 3D CGI
            </span>
          </div>
          <h1 className="font-playfair text-4xl md:text-6xl font-black uppercase tracking-tight text-white">
            DANAO <span className="italic font-normal text-[#ffff7b]">3D</span> CGI
          </h1>
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
              <span className="font-mono text-[11px] text-white/50">Client:</span>
              <span className="font-mono text-[11px] font-bold text-white">Danao (Danone Group)</span>
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

      {/* Central 3D Canvas Area */}
      <div className="relative w-full h-[55vh] md:h-[65vh] my-2 cursor-grab active:cursor-grabbing flex items-center justify-center">
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
              <DanaoBottle activeFlavor={activeFlavor} autoSpin={autoSpin} lighting={lighting} />
            </PresentationControls>
            <Environment preset="studio" environmentIntensity={lighting.envIntensity} />
          </Suspense>
        </Canvas>

        {/* Floating Controls Bar */}
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

        {/* Floating Lighting Studio GUI Modal */}
        {showGui && (
          <div className="fixed top-20 right-4 md:right-8 z-50 w-84 md:w-96 max-h-[75vh] flex flex-col bg-black/95 backdrop-blur-2xl border border-white/20 p-5 rounded-3xl shadow-2xl text-xs font-mono">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffff7b] animate-ping" />
                <h4 className="font-bold text-white uppercase tracking-wider text-xs">3D Studio Lighting &amp; Model GUI</h4>
              </div>
              <button onClick={() => setShowGui(false)} className="text-white/50 hover:text-white text-base font-bold px-2 py-1 hover:bg-white/10 rounded-lg transition-all">
                ✕
              </button>
            </div>

            {/* Presets Bar */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <button
                onClick={() => setLighting(DEFAULT_LIGHTING)}
                className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-2 rounded-xl border border-white/10 text-[10px] font-bold text-left transition-all"
              >
                ☀️ Default Studio
              </button>
              <button
                onClick={() => setLighting({ ...DEFAULT_LIGHTING, ambientIntensity: 0.35, keyIntensity: 2.2, rimIntensity: 3.8, envIntensity: 0.4 })}
                className="bg-white/10 hover:bg-white/20 text-white px-2.5 py-2 rounded-xl border border-white/10 text-[10px] font-bold text-left transition-all"
              >
                🌙 Dramatic Dark
              </button>
            </div>

            {/* Scrollable Sliders Area */}
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 text-[11px] custom-scrollbar">
              {/* 3D Model Scale */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>3D Model Scale</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.scale.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="10.0"
                  step="0.1"
                  value={lighting.scale}
                  onChange={(e) => setLighting({ ...lighting, scale: parseFloat(e.target.value) })}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Model Position Y (yOffset) */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Model Position Y (yOffset)</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.yOffset.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-3.0"
                  max="3.0"
                  step="0.05"
                  value={lighting.yOffset}
                  onChange={(e) => setLighting({ ...lighting, yOffset: parseFloat(e.target.value) })}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Ambient Light */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Ambient Light Intensity</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.ambientIntensity.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="0.05"
                  value={lighting.ambientIntensity}
                  onChange={(e) => setLighting({ ...lighting, ambientIntensity: parseFloat(e.target.value) })}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Key Light Intensity */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Key Light Intensity</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.keyIntensity.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={lighting.keyIntensity}
                  onChange={(e) => setLighting({ ...lighting, keyIntensity: parseFloat(e.target.value) })}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Key Light Position X */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Key Light Position X</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.keyX.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-15"
                  max="15"
                  step="0.5"
                  value={lighting.keyX}
                  onChange={(e) => setLighting({ ...lighting, keyX: parseFloat(e.target.value) })}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Key Light Position Y */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Key Light Position Y</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.keyY.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-15"
                  max="15"
                  step="0.5"
                  value={lighting.keyY}
                  onChange={(e) => setLighting({ ...lighting, keyY: parseFloat(e.target.value) })}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Key Light Position Z */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Key Light Position Z</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.keyZ.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-15"
                  max="15"
                  step="0.5"
                  value={lighting.keyZ}
                  onChange={(e) => setLighting({ ...lighting, keyZ: parseFloat(e.target.value) })}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Fill Light Intensity */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Fill Light Intensity</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.fillIntensity.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="4"
                  step="0.05"
                  value={lighting.fillIntensity}
                  onChange={(e) => setLighting({ ...lighting, fillIntensity: parseFloat(e.target.value) })}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Rim Light */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Rim Light Intensity</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.rimIntensity.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={lighting.rimIntensity}
                  onChange={(e) => setLighting({ ...lighting, rimIntensity: parseFloat(e.target.value) })}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Mouse Light */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Mouse Light Intensity</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.mouseLightIntensity.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.1"
                  value={lighting.mouseLightIntensity}
                  onChange={(e) => setLighting({ ...lighting, mouseLightIntensity: parseFloat(e.target.value) })}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Environment HDRI */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Environment HDRI Intensity</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.envIntensity.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.05"
                  value={lighting.envIntensity}
                  onChange={(e) => setLighting({ ...lighting, envIntensity: parseFloat(e.target.value) })}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              {/* Material Roughness */}
              <div>
                <div className="flex justify-between text-white/80 mb-1">
                  <span>Plastic Roughness</span>
                  <span className="text-[#ffff7b] font-bold">{lighting.roughness.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                  value={lighting.roughness}
                  onChange={(e) => setLighting({ ...lighting, roughness: parseFloat(e.target.value) })}
                  className="w-full accent-[#ffff7b] bg-white/10 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Fixed Sticky Action Buttons */}
            <div className="pt-3 mt-3 border-t border-white/10 flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(lighting, null, 2));
                  setCopiedCode(true);
                  setTimeout(() => setCopiedCode(false), 2000);
                }}
                className="flex-1 bg-[#ffff7b] text-[#191919] font-bold py-2.5 rounded-xl text-center hover:bg-white transition-all shadow-md text-xs uppercase"
              >
                {copiedCode ? "✓ COPIED VALUES!" : "📋 COPY CONFIG JSON"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Flavor Selector Switcher Bar */}
      <div className="relative z-20 max-w-4xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-3.5 md:px-6 md:py-4 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#ffff7b]">
            DANAO FLAVORS:
          </span>
          <span className="font-sans text-xs text-white/60 hidden md:inline">
            Click flavor pill to switch 3D bottle label
          </span>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          {DANAO_FLAVORS.map((flavor) => {
            const isSelected = activeFlavor.id === flavor.id;
            return (
              <button
                key={flavor.id}
                onClick={() => setActiveFlavor(flavor)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-500 border ${
                  isSelected
                    ? "text-[#0E0E10] border-transparent shadow-[0_0_25px_rgba(255,255,255,0.4)] scale-105"
                    : "text-white/70 border-white/15 bg-black/40 hover:border-white/40 hover:text-white"
                }`}
                style={{
                  backgroundColor: isSelected ? flavor.color : undefined,
                }}
              >
                {flavor.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
