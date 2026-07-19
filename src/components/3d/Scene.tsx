"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense, useRef, useEffect, type MutableRefObject } from "react";
import * as THREE from "three";

interface AnimatedShapeProps {
    scrollProgress: MutableRefObject<number>;
}

function AnimatedShape({ scrollProgress }: AnimatedShapeProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const pointer = useRef({ x: 0, y: 0 });

    // Base values to interpolate FROM
    const baseRotation = useRef({ y: 0, z: 0 });
    const baseScale = useRef(1);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            pointer.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    useFrame((_, delta) => {
        if (!meshRef.current) return;

        const progress = scrollProgress.current; // 0 → 1

        // --- Scroll-linked rotation & scale (driven by progress from DOM) ---
        const scrollRotY = progress * (Math.PI / 2);  // max 90°
        const scrollRotZ = progress * (Math.PI / 4);   // max 45°
        const scrollScale = 1 - progress * 0.2;        // 1 → 0.8

        // Smoothly lerp toward scroll targets
        baseRotation.current.y = THREE.MathUtils.lerp(baseRotation.current.y, scrollRotY, delta * 2);
        baseRotation.current.z = THREE.MathUtils.lerp(baseRotation.current.z, scrollRotZ, delta * 2);
        baseScale.current = THREE.MathUtils.lerp(baseScale.current, scrollScale, delta * 2);

        // Apply scroll-driven values
        meshRef.current.rotation.y = baseRotation.current.y;
        meshRef.current.rotation.z = baseRotation.current.z;
        meshRef.current.scale.setScalar(baseScale.current);

        // --- Cursor hover offset (small & slow) ---
        const hoverX = pointer.current.x * 0.3;
        const hoverY = pointer.current.y * 0.3;
        const hoverRotX = -pointer.current.y * 0.15;
        const hoverRotY = pointer.current.x * 0.15;

        meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, hoverX, delta * 1.5);
        meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, hoverY, delta * 1.5);
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, hoverRotX, delta * 1.5);
        // Add hover rotation on top of scroll rotation
        meshRef.current.rotation.y = baseRotation.current.y + THREE.MathUtils.lerp(0, hoverRotY, delta * 1.5);
    });

    return (
        <mesh ref={meshRef}>
            <torusKnotGeometry args={[1, 0.3, 128, 32]} />
            <meshStandardMaterial
                color="#8a2be2"
                roughness={0.2}
                metalness={0.8}
            />
        </mesh>
    );
}

interface SceneProps {
    scrollProgress: MutableRefObject<number>;
}

export default function Scene({ scrollProgress }: SceneProps) {
    return (
        <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <color attach="background" args={["#0a0514"]} />
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} color="#ff1493" />
                <directionalLight position={[-10, -10, -5]} intensity={1} color="#00ffff" />

                <Suspense fallback={null}>
                    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
                        <AnimatedShape scrollProgress={scrollProgress} />
                    </Float>
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}
