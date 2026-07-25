"use client";

import { useEffect, useState, useRef } from "react";
import * as THREE from "three";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("Initializing WebGL Engine...");
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // ── 1. Percentage Counter & Status Logic ─────────────────────────────
    useEffect(() => {
        const duration = 2400; // 2.4s total preload animation
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const currentProgress = Math.min(100, Math.floor((elapsedTime / duration) * 100));
            setProgress(currentProgress);

            if (currentProgress < 30) {
                setStatusText("Initializing 3D WebGL Engine...");
            } else if (currentProgress < 65) {
                setStatusText("Synthesizing Render Assets & Textures...");
            } else if (currentProgress < 90) {
                setStatusText("Optimizing Scene Lighting & Shaders...");
            } else {
                setStatusText("Preparing Interactive Experience...");
            }

            if (currentProgress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsLoading(false);
                }, 400);
            }
        }, 25);

        return () => clearInterval(interval);
    }, []);

    // ── 2. Pure Three.js Procedural 3D Preloader Animation ────────────────
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
        });
        renderer.setSize(340, 340);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Group container
        const group = new THREE.Group();
        scene.add(group);

        // Core 1: Outer Torus Knot Wireframe (Gold)
        const knotGeo = new THREE.TorusKnotGeometry(0.9, 0.28, 120, 16, 2, 3);
        const knotMat = new THREE.MeshStandardMaterial({
            color: 0xffff7b,
            wireframe: true,
            metalness: 0.8,
            roughness: 0.2,
            emissive: 0x333300,
        });
        const knotMesh = new THREE.Mesh(knotGeo, knotMat);
        group.add(knotMesh);

        // Core 2: Inner Glowing Icosahedron
        const icoGeo = new THREE.IcosahedronGeometry(0.5, 1);
        const icoMat = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            wireframe: false,
            metalness: 0.9,
            roughness: 0.1,
            emissive: 0x222222,
        });
        const icoMesh = new THREE.Mesh(icoGeo, icoMat);
        group.add(icoMesh);

        // Core 3: Outer Rotating Ring
        const ringGeo = new THREE.RingGeometry(1.4, 1.42, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.4,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 3;
        group.add(ringMesh);

        // Core 4: Floating Star Particles
        const particleCount = 200;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 6;
            positions[i + 1] = (Math.random() - 0.5) * 6;
            positions[i + 2] = (Math.random() - 0.5) * 6;
        }

        particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({
            color: 0xffff7b,
            size: 0.03,
            transparent: true,
            opacity: 0.6,
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffff7b, 3, 10);
        pointLight1.position.set(3, 3, 3);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0xffffff, 2, 10);
        pointLight2.position.set(-3, -3, 2);
        scene.add(pointLight2);

        // Animation Loop
        let animationFrameId: number;
        let clock = new THREE.Clock();

        const animate = () => {
            const time = clock.getElapsedTime();

            // Rotate group
            group.rotation.x = time * 0.5;
            group.rotation.y = time * 0.7;

            // Counter rotate inner sphere
            icoMesh.rotation.y = -time * 1.2;
            icoMesh.rotation.z = time * 0.5;

            // Rotate ring
            ringMesh.rotation.z = time * 0.8;

            // Pulse particles
            particles.rotation.y = time * 0.1;

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            renderer.dispose();
            knotGeo.dispose();
            knotMat.dispose();
            icoGeo.dispose();
            icoMat.dispose();
            ringGeo.dispose();
            ringMat.dispose();
            particleGeo.dispose();
            particleMat.dispose();
        };
    }, []);

    return (
        <div
            className={`fixed inset-0 z-[999999] bg-[#0a0a0a] text-white flex flex-col items-center justify-between py-10 md:py-14 px-6 transition-all duration-1000 ease-in-out ${
                isLoading ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-105"
            }`}
        >
            {/* Top Brand Header */}
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between font-sans text-xs tracking-widest uppercase text-white/50">
                <span className="font-semibold text-white">Mahdi Gouadria<span className="text-[#ffff7b] ml-0.5">®</span></span>
                <span>3D &amp; CGI Studio</span>
            </div>

            {/* Center Pure 3D WebGL Canvas Animation */}
            <div className="relative flex flex-col items-center justify-center my-auto">
                <div className="relative w-[300px] h-[300px] sm:w-[360px] sm:h-[360px] md:w-[400px] md:h-[400px] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] border border-white/10 bg-[#0d0d0d] flex items-center justify-center">
                    
                    {/* Three.js Canvas */}
                    <canvas ref={canvasRef} className="w-[340px] h-[340px] pointer-events-none" />

                    {/* Subtle Overlay Glow & Vignette */}
                    <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-3xl bg-radial from-transparent via-transparent to-black/60" />
                </div>
            </div>

            {/* Bottom Progress Bar & Status Text */}
            <div className="w-full max-w-md mx-auto flex flex-col items-center gap-4">
                <div className="w-full flex items-center justify-between font-mono text-xs text-white/60">
                    <span className="tracking-widest uppercase text-[10px] text-white/50">{statusText}</span>
                    <span className="font-bold text-[#ffff7b] text-sm">{progress}%</span>
                </div>

                {/* Progress Line Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
                    <div
                        className="h-full bg-[#ffff7b] transition-all duration-75 ease-out rounded-full shadow-[0_0_12px_#ffff7b]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
