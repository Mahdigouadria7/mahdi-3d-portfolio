"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls, useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

interface PlaceholderShapeProps {
    index: number;
    onPointerDown?: () => void;
    onPointerUp?: () => void;
    onPointerOut?: () => void;
    onClick?: () => void;
}

// Component to load and display the custom Blender Ball model
export function BallModel({ onPointerDown, onPointerUp, onPointerOut, onClick }: Omit<PlaceholderShapeProps, 'index'>) {
    const { scene } = useGLTF('/models/WEB Design Trionda ball/World Cup Trionda Ball.glb?v=2');

    // Clone the scene so remounting (e.g. on reset) doesn't corrupt shared event handlers
    const clonedScene = useMemo(() => scene.clone(), [scene]);

    // Dynamically update the materials of the loaded GLTF model
    useEffect(() => {
        if (clonedScene) {
            clonedScene.traverse((child: any) => {
                if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.material) {
                        // Handle single material
                        if (child.material.isMeshStandardMaterial || child.material.isMeshPhysicalMaterial) {
                            child.material.roughness = 0.7;
                            child.material.depthWrite = true; // Fix transparency sorting glitch
                            child.material.needsUpdate = true;
                        }
                        // Handle multiple materials
                        else if (Array.isArray(child.material)) {
                            child.material.forEach((mat: any) => {
                                if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
                                    mat.roughness = 1;
                                    mat.depthWrite = true; // Fix transparency sorting glitch
                                    mat.needsUpdate = true;
                                }
                            });
                        }
                    }
                }
            });
        }
    }, [clonedScene]);

    return (
        <Center>
            <pointLight position={[2, 2, 2]} intensity={2} color="#ffffff" />
            <pointLight position={[-2, -2, 2]} intensity={1} color="#ff3366" />
            <primitive
                object={clonedScene}
                scale={0.55}
                onClick={(e: any) => {
                    e.stopPropagation();
                    if (onClick) onClick(e);
                }}
                onPointerDown={(e: any) => {
                    if (onPointerDown) onPointerDown(e);
                }}
                onPointerUp={(e: any) => {
                    if (onPointerUp) onPointerUp(e);
                }}
                onPointerOut={(e: any) => {
                    if (onPointerOut) onPointerOut(e);
                }}
            />
        </Center>
    );
}

export function PlaceholderShape({ index, onPointerDown, onPointerUp, onPointerOut, onClick }: PlaceholderShapeProps) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
            meshRef.current.rotation.x += delta * 0.1;
        }
    });

    // Pick a different geometry based on the index
    const renderGeometry = () => {
        switch (index % 4) {
            case 0: return <torusKnotGeometry args={[1, 0.3, 128, 32]} />;
            case 1: return <octahedronGeometry args={[1.5, 0]} />;
            case 2: return <icosahedronGeometry args={[1.5, 1]} />;
            case 3: return <torusGeometry args={[1.2, 0.4, 32, 64]} />;
            default: return <sphereGeometry args={[1.5, 32, 32]} />;
        }
    };

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh
                ref={meshRef}
                scale={0.65}
                castShadow
                receiveShadow
                onClick={(e: any) => {
                    e.stopPropagation();
                    if (onClick) onClick(e);
                }}
                onPointerDown={(e: any) => {
                    if (onPointerDown) onPointerDown(e);
                }}
                onPointerUp={(e: any) => {
                    if (onPointerUp) onPointerUp(e);
                }}
                onPointerOut={(e: any) => {
                    if (onPointerOut) onPointerOut(e);
                }}
            >
                {renderGeometry()}
                {/* A cool dark glass/metal material */}
                <meshStandardMaterial
                    color="#ff3333"
                    roughness={0.1}
                    metalness={0.8}
                    envMapIntensity={2}
                />
            </mesh>
        </Float>
    );
}

/* 
 * This component sets up a Three.js Canvas for the project card.
 * To replace the placeholder shapes with actual 3D models of the products:
 * 1. Import useGLTF from '@react-three/drei'
 * 2. Load your model: const { scene } = useGLTF('/models/my-product.glb')
 * 3. Replace <PlaceholderShape /> with <primitive object={scene} scale={0.65} />
 */
export default function ProjectModel({ index }: { index: number }) {
    const [isDragging, setIsDragging] = useState(false);

    return (
        <div 
            className="absolute inset-0 flex items-center justify-center w-full h-full pointer-events-auto opacity-70 group-hover:opacity-100 transition-opacity duration-500"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
            onPointerDown={(e) => e.stopPropagation()}
        >
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1.5} />

                <PresentationControls
                    global={false}
                    cursor={true}
                    snap={false}
                    speed={1.5}
                    zoom={1}
                    rotation={[0, 0, 0]}
                    polar={[-Infinity, Infinity]}
                    azimuth={[-Infinity, Infinity]}
                >
                    <Float speed={isDragging ? 0 : 2} rotationIntensity={0.5} floatIntensity={0.5}>
                        {index === 0 ? (
                            <BallModel
                                onPointerDown={() => setIsDragging(true)}
                                onPointerUp={() => setIsDragging(false)}
                                onPointerOut={() => setIsDragging(false)}
                            />
                        ) : (
                            <PlaceholderShape
                                index={index}
                                onPointerDown={() => setIsDragging(true)}
                                onPointerUp={() => setIsDragging(false)}
                                onPointerOut={() => setIsDragging(false)}
                            />
                        )}
                    </Float>
                </PresentationControls>

                {/* Environment light for shiny reflections */}
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
