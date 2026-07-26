"use client";

import React, { useRef, useState, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// ── 1. Custom GLSL Shader for Heat-Wave Spatial Anomaly ────────────────────
const AnomalyShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uProximity: { value: 0 },
    uRipple: { value: 0 },
    uGlowColor: { value: new THREE.Color("#ffff7b") },
  },
  vertexShader: `
    uniform float uTime;
    uniform vec2 uMouse;
    uniform float uProximity;
    uniform float uRipple;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    // Simplex noise helper
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0/6.0, 1.0/3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = mod289(i);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ *ns.x + ns.yyyy;
      vec4 y = y_ *ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0)*2.0 + 1.0;
      vec4 s1 = floor(b1)*2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
      p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
      vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
    }

    void main() {
      vUv = uv;
      vNormal = normal;
      vec3 pos = position;

      // Heat wave distortion & breathing pulse
      float noiseVal = snoise(pos * 2.5 + uTime * 0.8) * (0.12 + uProximity * 0.2);
      float pulse = sin(uTime * 2.0) * 0.04;
      float ripple = sin(length(uv - 0.5) * 20.0 - uTime * 5.0) * uRipple * 0.1;

      pos += normal * (noiseVal + pulse + ripple);
      vPosition = pos;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uProximity;
    uniform vec3 uGlowColor;
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      // Fresnel glow calculation
      vec3 viewDir = normalize(-vPosition);
      float fresnel = pow(1.0 - max(0.0, dot(vNormal, viewDir)), 2.5);

      // Core opacity & subtle refraction heat tint
      float alpha = fresnel * (0.4 + uProximity * 0.5);
      vec3 color = mix(uGlowColor, vec3(1.0, 0.95, 0.8), fresnel);

      gl_FragColor = vec4(color, alpha);
    }
  `,
};

// ── 2. Reality Tear Shader Material ───────────────────────────────────────
const TearShaderMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uProgress: { value: 0 }, // 0 (closed) -> 1 (fully open)
    uTearColor: { value: new THREE.Color("#ffff7b") },
  },
  vertexShader: `
    uniform float uTime;
    uniform float uProgress;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      vec3 pos = position;
      // Expand tear geometry organically based on progress
      pos.x *= (0.1 + uProgress * 2.2);
      pos.y *= (0.05 + uProgress * 3.5);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform float uProgress;
    uniform vec3 uTearColor;
    varying vec2 vUv;

    void main() {
      vec2 center = vUv - 0.5;
      float dist = length(center * vec2(1.0, 0.6));
      
      // Hairline crack / tear boundary
      float tearEdge = smoothstep(uProgress * 0.45, uProgress * 0.5, dist);
      float glowEdge = smoothstep(uProgress * 0.5, uProgress * 0.4, dist) * (1.0 - tearEdge);

      // Deep void interior vs glowing golden tear edge
      vec3 voidColor = vec3(0.02, 0.02, 0.04);
      vec3 glowColor = mix(uTearColor, vec3(1.0, 0.95, 0.85), 0.7);

      vec3 finalColor = mix(voidColor, glowColor, glowEdge * 2.0);
      float alpha = smoothstep(uProgress * 0.5, 0.0, dist);

      gl_FragColor = vec4(finalColor, alpha * (1.0 - tearEdge));
    }
  `,
};

// ── 3. Stylized 3D Character Mesh (Mahdi Avatar) ───────────────────────────
function StylizedMahdiAvatar({
  phase,
  mousePos,
  onAvatarClick,
  onAvatarHover,
}: {
  phase: string;
  mousePos: THREE.Vector2;
  onAvatarClick: () => void;
  onAvatarHover: (part: "face" | "shoulder" | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  const armRightRef = useRef<THREE.Group>(null);
  const smileRef = useRef<THREE.Mesh>(null);

  const [isThumbsUp, setIsThumbsUp] = useState(false);

  // Procedural hair card positions for Mahdi's signature curly hair
  const hairCurler = useMemo(() => {
    const curls = [];
    for (let i = 0; i < 45; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.4;
      const r = 0.42 + Math.random() * 0.06;
      curls.push({
        pos: [
          r * Math.sin(phi) * Math.cos(theta),
          0.45 + r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta) - 0.05,
        ] as [number, number, number],
        scale: 0.12 + Math.random() * 0.08,
      });
    }
    return curls;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = state.clock.getElapsedTime();

    // 1. Natural Breathing & Micro-movement Idle
    groupRef.current.position.y = -1.1 + Math.sin(time * 1.8) * 0.025;

    // 2. Cursor tracking (Head & Eyes follow mouse lerp)
    if (headRef.current) {
      const targetRotY = mousePos.x * 0.4;
      const targetRotX = -mousePos.y * 0.3;
      headRef.current.rotation.y += (targetRotY - headRef.current.rotation.y) * 0.08;
      headRef.current.rotation.x += (targetRotX - headRef.current.rotation.x) * 0.08;
    }

    // 3. Eye pupil micro tracking
    if (eyeLeftRef.current && eyeRightRef.current) {
      eyeLeftRef.current.position.x = 0.12 + mousePos.x * 0.03;
      eyeLeftRef.current.position.z = 0.36 + mousePos.y * 0.02;
      eyeRightRef.current.position.x = -0.12 + mousePos.x * 0.03;
      eyeRightRef.current.position.z = 0.36 + mousePos.y * 0.02;
    }

    // 4. Arm Waving / Thumbs Up Animation logic
    if (armRightRef.current) {
      if (phase === "greeting") {
        // Friendly wave gesture 👋
        armRightRef.current.rotation.z = Math.sin(time * 6.0) * 0.25 + 0.8;
        armRightRef.current.rotation.x = -0.4;
      } else if (isThumbsUp) {
        // Thumbs up gesture 👍
        armRightRef.current.rotation.z = 1.1;
        armRightRef.current.rotation.x = -0.6;
      } else {
        // Natural arm idle
        armRightRef.current.rotation.z = Math.sin(time * 1.5) * 0.05 + 0.1;
        armRightRef.current.rotation.x = 0;
      }
    }
  });

  const handleDoubleClick = () => {
    setIsThumbsUp(true);
    setTimeout(() => setIsThumbsUp(false), 2200);
    onAvatarClick();
  };

  return (
    <group
      ref={groupRef}
      position={[0, -1.1, 0.4]}
      onDoubleClick={handleDoubleClick}
    >
      {/* ── Head & Face Group ── */}
      <group
        ref={headRef}
        position={[0, 1.45, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          onAvatarHover("face");
        }}
        onPointerOut={() => onAvatarHover(null)}
      >
        {/* Head Base Mesh (Skin) */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial
            color="#dca882"
            roughness={0.4}
            metalness={0.05}
          />
        </mesh>

        {/* Curly Hair Spheres */}
        {hairCurler.map((hair, i) => (
          <mesh key={i} position={hair.pos}>
            <sphereGeometry args={[hair.scale, 12, 12]} />
            <meshStandardMaterial color="#1a1412" roughness={0.9} />
          </mesh>
        ))}

        {/* Well-Defined Beard Mesh */}
        <mesh position={[0, -0.16, 0.12]}>
          <cylinderGeometry args={[0.38, 0.32, 0.3, 24]} />
          <meshStandardMaterial color="#1e1815" roughness={0.95} />
        </mesh>

        {/* Strong Dark Eyebrows */}
        <mesh position={[0.13, 0.12, 0.38]} rotation={[0, 0, 0.1]}>
          <boxGeometry args={[0.16, 0.04, 0.04]} />
          <meshStandardMaterial color="#110d0b" />
        </mesh>
        <mesh position={[-0.13, 0.12, 0.38]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.16, 0.04, 0.04]} />
          <meshStandardMaterial color="#110d0b" />
        </mesh>

        {/* Friendly Eyes */}
        <mesh ref={eyeLeftRef} position={[0.12, 0.02, 0.37]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#4a2c11" roughness={0.2} />
        </mesh>
        <mesh ref={eyeRightRef} position={[-0.12, 0.02, 0.37]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#4a2c11" roughness={0.2} />
        </mesh>

        {/* Confident Smile Line */}
        <mesh ref={smileRef} position={[0, -0.1, 0.38]}>
          <torusGeometry args={[0.08, 0.015, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#a86048" />
        </mesh>
      </group>

      {/* ── Torso: Sleek Black Turtleneck ── */}
      <group
        position={[0, 0.55, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          onAvatarHover("shoulder");
        }}
        onPointerOut={() => onAvatarHover(null)}
      >
        {/* Turtleneck Collar */}
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.22, 0.24, 0.22, 24]} />
          <meshStandardMaterial color="#141414" roughness={0.8} />
        </mesh>

        {/* Main Chest & Shoulders */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.9, 0.75, 0.45]} />
          <meshStandardMaterial color="#181818" roughness={0.85} />
        </mesh>

        {/* Right Arm (Waving / Thumbs up) */}
        <group ref={armRightRef} position={[0.52, 0.35, 0]}>
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.1, 0.09, 0.6, 16]} />
            <meshStandardMaterial color="#181818" roughness={0.85} />
          </mesh>
          {/* Hand */}
          <mesh position={[0, -0.65, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color="#dca882" roughness={0.4} />
          </mesh>
        </group>

        {/* Left Arm */}
        <group position={[-0.52, 0.35, 0]}>
          <mesh position={[0, -0.3, 0]}>
            <cylinderGeometry args={[0.1, 0.09, 0.6, 16]} />
            <meshStandardMaterial color="#181818" roughness={0.85} />
          </mesh>
          <mesh position={[0, -0.65, 0]}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial color="#dca882" roughness={0.4} />
          </mesh>
        </group>
      </group>

      {/* Legs & Boots */}
      <mesh position={[0.2, -0.4, 0]}>
        <cylinderGeometry args={[0.12, 0.11, 0.7, 16]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      <mesh position={[-0.2, -0.4, 0]}>
        <cylinderGeometry args={[0.12, 0.11, 0.7, 16]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
    </group>
  );
}

// ── 4. Main 3D Canvas Scene Controller ────────────────────────────────────
function AwakenScene({
  onInteractionTriggered,
}: {
  onInteractionTriggered?: () => void;
}) {
  const { camera } = useThree();
  const anomalyMeshRef = useRef<THREE.Mesh>(null);
  const tearMeshRef = useRef<THREE.Mesh>(null);
  const anomalyMatRef = useRef<THREE.ShaderMaterial>(null);
  const tearMatRef = useRef<THREE.ShaderMaterial>(null);

  // Interaction State Machine: 'idle' | 'hover' | 'freeze' | 'tearing' | 'emerging' | 'greeting' | 'closing' | 'avatar_idle'
  const [phase, setPhase] = useState<string>("idle");
  const [mousePos, setMousePos] = useState(new THREE.Vector2(0, 0));
  const [proximity, setProximity] = useState(0);

  // Target positions & noise variables
  const targetMouse = useRef(new THREE.Vector2(0, 0));

  // Pointer position update
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = -(e.clientY / window.innerHeight - 0.5) * 2;
      targetMouse.current.set(x, y);

      // Distance from anomaly (floating slightly below center)
      const dist = Math.hypot(x - 0, y - (-0.25));
      const prox = Math.max(0, 1 - dist / 0.65);
      setProximity(prox);
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Mouse Lerp
    mousePos.x += (targetMouse.current.x - mousePos.x) * 0.08;
    mousePos.y += (targetMouse.current.y - mousePos.y) * 0.08;

    // Update Anomaly Shaders
    if (anomalyMatRef.current) {
      anomalyMatRef.current.uniforms.uTime.value = time;
      anomalyMatRef.current.uniforms.uMouse.value.copy(mousePos);
      anomalyMatRef.current.uniforms.uProximity.value = proximity;
    }

    // Anomaly Mesh bending towards mouse
    if (anomalyMeshRef.current && (phase === "idle" || phase === "hover")) {
      anomalyMeshRef.current.position.x = mousePos.x * 0.4;
      anomalyMeshRef.current.position.y = -0.25 + mousePos.y * 0.3;
      anomalyMeshRef.current.rotation.y = time * 0.3;
    }

    // Update Tear Shader
    if (tearMatRef.current) {
      tearMatRef.current.uniforms.uTime.value = time;
    }
  });

  // ── Click Trigger Sequence ("The Rip" & "Awaken Avatar") ─────────────────
  const handleAnomalyClick = () => {
    if (phase !== "idle" && phase !== "hover") return;

    if (onInteractionTriggered) onInteractionTriggered();

    // 1. Freeze Phase (150ms)
    setPhase("freeze");

    setTimeout(() => {
      // 2. Tearing Phase (Reality Tear Opens)
      setPhase("tearing");

      // GSAP Camera 3% forward creep & subtle vibration
      gsap.to(camera.position, {
        z: 4.85,
        duration: 1.8,
        ease: "power2.out",
      });

      // Tear expansion animation
      if (tearMatRef.current) {
        gsap.to(tearMatRef.current.uniforms.uProgress, {
          value: 1.0,
          duration: 1.6,
          ease: "expo.out",
          onComplete: () => {
            // 3. Avatar Emerging Phase
            setPhase("emerging");

            setTimeout(() => {
              // 4. Greeting Phase (Stepping out, direct eye contact & wave 👋)
              setPhase("greeting");

              setTimeout(() => {
                // 5. Closing Phase (Portal collapses)
                setPhase("closing");
                if (tearMatRef.current) {
                  gsap.to(tearMatRef.current.uniforms.uProgress, {
                    value: 0.0,
                    duration: 1.2,
                    ease: "power3.inOut",
                    onComplete: () => {
                      // 6. Permanent Avatar Idle State!
                      setPhase("avatar_idle");
                    },
                  });
                }
              }, 2200);
            }, 1400);
          },
        });
      }
    }, 150);
  };

  const handleAvatarHover = (part: "face" | "shoulder" | null) => {
    if (phase !== "avatar_idle") return;
    // Micro adjustments handled in StylizedMahdiAvatar
  };

  return (
    <>
      {/* Lights Rigs */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 4]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-3, -2, -2]} intensity={0.6} color="#ffff7b" />
      {/* Warm Golden Rim Light for Portal & Avatar */}
      <pointLight position={[0, 0, -1]} intensity={3.5} color="#ffff7b" distance={8} />

      {/* ── 1. Spatial Anomaly (Idle & Hover distortion) ── */}
      {(phase === "idle" || phase === "hover" || phase === "freeze") && (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.6}>
          <mesh
            ref={anomalyMeshRef}
            position={[0, -0.25, 0]}
            onClick={handleAnomalyClick}
            onPointerOver={() => setPhase("hover")}
            onPointerOut={() => setPhase("idle")}
          >
            <sphereGeometry args={[0.38, 32, 32]} />
            <shaderMaterial
              ref={anomalyMatRef}
              {...AnomalyShaderMaterial}
              transparent
              depthWrite={false}
            />
          </mesh>
        </Float>
      )}

      {/* Ambient Floating Dust & Energy Particles */}
      <Sparkles
        count={phase === "hover" ? 180 : 90}
        scale={6}
        size={phase === "hover" ? 3.5 : 2}
        speed={phase === "freeze" ? 0 : 0.6}
        color="#ffff7b"
      />

      {/* ── 2. Reality Tear / Portal Mesh ── */}
      {(phase === "tearing" || phase === "emerging" || phase === "greeting" || phase === "closing") && (
        <mesh ref={tearMeshRef} position={[0, 0, 0]}>
          <planeGeometry args={[2.5, 3.5]} />
          <shaderMaterial
            ref={tearMatRef}
            {...TearShaderMaterial}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* ── 3. Stylized 3D Avatar (Mahdi) Reveal ── */}
      {(phase === "emerging" || phase === "greeting" || phase === "closing" || phase === "avatar_idle") && (
        <StylizedMahdiAvatar
          phase={phase}
          mousePos={mousePos}
          onAvatarClick={() => {}}
          onAvatarHover={handleAvatarHover}
        />
      )}
    </>
  );
}

// ── 5. Main Component Wrapper ─────────────────────────────────────────────
export default function AwakenHeroCanvas({
  onInteractionTriggered,
}: {
  onInteractionTriggered?: () => void;
}) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-auto z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      >
        <AwakenScene onInteractionTriggered={onInteractionTriggered} />
      </Canvas>
    </div>
  );
}
