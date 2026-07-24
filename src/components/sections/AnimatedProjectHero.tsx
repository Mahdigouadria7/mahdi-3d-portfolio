"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PresentationControls } from "@react-three/drei";
import { BallModel, RedBullGoldCanModel, PlaceholderShape } from "@/components/3d/ProjectModel";
import * as THREE from "three";
import { Project } from "@/data/projects";

function IntroSequence({ onComplete }: { onComplete: () => void }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
    const frameCount = 96;
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrame = useRef(0);
    const isStartedRef = useRef(false);
    
    useEffect(() => {
        let loaded = 0;
        const imgs: HTMLImageElement[] = [];
        let animationFrameId: number;
        let lastTime = 0;
        const fps = 30;
        const interval = 1000 / fps;

        const startAnimation = () => {
            if (!canvasRef.current) return;
            gsap.to(canvasRef.current, { opacity: 1, duration: 0.2 });
            
            const loop = (time: number) => {
                if (!lastTime) lastTime = time;
                const deltaTime = time - lastTime;
                
                if (deltaTime >= interval) {
                    lastTime = time - (deltaTime % interval);
                    
                    const canvas = canvasRef.current;
                    const ctx = canvas?.getContext('2d');
                    const img = imagesRef.current[currentFrame.current];
                    
                    if (canvas && ctx && img && img.complete && img.naturalWidth > 0) {
                        canvas.width = window.innerWidth;
                        canvas.height = window.innerHeight;
                        
                        const imgRatio = img.width / img.height;
                        const canvasRatio = canvas.width / canvas.height;
                        let drawWidth = canvas.width;
                        let drawHeight = canvas.height;
                        let offsetX = 0;
                        let offsetY = 0;

                        if (imgRatio > canvasRatio) {
                            drawWidth = canvas.height * imgRatio;
                            offsetX = (canvas.width - drawWidth) / 2;
                        } else {
                            drawHeight = canvas.width / imgRatio;
                            offsetY = (canvas.height - drawHeight) / 2;
                        }

                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                        currentFrame.current++;
                    }
                }

                if (currentFrame.current < frameCount) {
                    animationFrameId = requestAnimationFrame(loop);
                } else {
                    if (canvasRef.current) {
                        gsap.to(canvasRef.current, { 
                            opacity: 0.15, 
                            duration: 1.0, 
                            onComplete: () => {
                                onComplete();
                                
                                // Initialize ScrollTrigger to scrub the animation backwards on scroll down
                                scrollTriggerRef.current = ScrollTrigger.create({
                                    trigger: document.documentElement,
                                    start: "top top",
                                    end: "bottom bottom",
                                    scrub: 1,
                                    onUpdate: (self) => {
                                        const targetFrame = Math.round((1 - self.progress) * (frameCount - 1));
                                        
                                        const canvas = canvasRef.current;
                                        const ctx = canvas?.getContext('2d');
                                        const img = imagesRef.current[targetFrame];
                                        
                                        if (canvas && ctx && img && img.complete && img.naturalWidth > 0) {
                                            const imgRatio = img.width / img.height;
                                            const canvasRatio = canvas.width / canvas.height;
                                            let drawWidth = canvas.width;
                                            let drawHeight = canvas.height;
                                            let offsetX = 0;
                                            let offsetY = 0;

                                            if (imgRatio > canvasRatio) {
                                                drawWidth = canvas.height * imgRatio;
                                                offsetX = (canvas.width - drawWidth) / 2;
                                            } else {
                                                drawHeight = canvas.width / imgRatio;
                                                offsetY = (canvas.height - drawHeight) / 2;
                                            }

                                            ctx.clearRect(0, 0, canvas.width, canvas.height);
                                            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                                        }
                                    }
                                });
                            } 
                        });
                    }
                }
            };
            animationFrameId = requestAnimationFrame(loop);
        };

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = `/models/BallHittingnet/BallHitnet_${i.toString().padStart(5, '0')}.webp`;
            img.onload = () => {
                loaded++;
                if (loaded > 5 && !isStartedRef.current) {
                    isStartedRef.current = true;
                    startAnimation();
                }
            };
            imgs.push(img);
        }
        imagesRef.current = imgs;

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            if (scrollTriggerRef.current) scrollTriggerRef.current.kill();
        };
    }, [onComplete]);

    return (
        <canvas 
            ref={canvasRef} 
            className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none opacity-0"
        />
    );
}

function SceneAnimator({ index, onScoreChange, onScoreReset, resetTrigger, startIntro }: { index: number, onScoreChange?: () => void, onScoreReset?: () => void, resetTrigger?: number, startIntro?: boolean }) {
    const groupRef = useRef<THREE.Group>(null);
    const jumpRef = useRef<THREE.Group>(null);
    const spinRef = useRef<THREE.Group>(null);
    const groundMeshRef = useRef<THREE.Mesh>(null);
    
    // Material refs for ground fade
    const groundMatRef = useRef<THREE.MeshStandardMaterial>(null);
    const lineMat1Ref = useRef<THREE.MeshBasicMaterial>(null);
    const lineMat2Ref = useRef<THREE.MeshBasicMaterial>(null);
    const lineMat3Ref = useRef<THREE.MeshBasicMaterial>(null);
    const groundOpacityRef = useRef(0);
    const introDone = useRef(false);
    
    // Ball Physics State (Full 3D)
    const isBouncing = useRef(false);
    const velocity = useRef(new THREE.Vector3(0, 0, 0));
    const gravity = -18.0; // Snappier, realistic gravity (less floaty)
    const bounceFactor = 0.75; // Real football coefficient of restitution
    const groundY = -0.35; // Base resting height
    
    // Spin state
    const spinVelocity = useRef(0);
    const timeRef = useRef(0);
    
    // Ground Tilt Physics
    const groundRotation = useRef(new THREE.Vector2(0, 0)); // Pitch (X), Roll (Z)
    const groundAngularVelocity = useRef(new THREE.Vector2(0, 0));
    const groundSpring = 15.0; // Smoother, gentler snap back
    const groundDamping = 0.92; // More floaty, smoother settling
    
    const tlRef = useRef<gsap.core.Timeline>();
    
    // Score Tracking
    const scoreRef = useRef(0);

    useEffect(() => {
        if (!groupRef.current) return;
        
        groupRef.current.position.set(0, 0, -1.5);
        groupRef.current.scale.set(0.5, 0.5, 0.5);
        
        const tl = gsap.timeline({
            paused: true,
            onComplete: () => {
                if (index === 0) {
                    // Trigger fade in for the ground once the ball animation is completely done
                    gsap.to(groundOpacityRef, {
                        current: 1.0,
                        duration: 1.0,
                        ease: "power2.inOut",
                        onUpdate: () => {
                            const op = groundOpacityRef.current;
                            if (groundMatRef.current) {
                                groundMatRef.current.opacity = op;
                                groundMatRef.current.transparent = op < 1.0;
                            }
                            if (lineMat1Ref.current) lineMat1Ref.current.opacity = op * 0.6;
                            if (lineMat2Ref.current) lineMat2Ref.current.opacity = op * 0.6;
                            if (lineMat3Ref.current) lineMat3Ref.current.opacity = op * 0.8;
                        },
                        onComplete: () => {
                            introDone.current = true;
                        }
                    });
                } else {
                    introDone.current = true;
                }
            }
        });
        
        tl.to(groupRef.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 2.2, ease: "power3.inOut" }, 0);
        tl.to(groupRef.current.position, { z: 0, duration: 2.2, ease: "power3.inOut" }, 0);
        
        // Use tl.fromTo instead of raw gsap.fromTo to keep it synchronized with the timeline
        tl.fromTo(groupRef.current.rotation, { y: Math.PI * 1.5 }, { y: 0, duration: 3.5, ease: "power3.out" }, 0);
        tl.to(groupRef.current.position, { x: 0, duration: 2.2, ease: "power3.inOut" }, 1.2); 
        
        tlRef.current = tl;
        
        return () => {
            tl.kill();
        };
    }, [index]);

    useEffect(() => {
        if (startIntro && tlRef.current) {
            tlRef.current.play();
        }
    }, [startIntro]);

    // Manual reset trigger
    useEffect(() => {
        if (resetTrigger && resetTrigger > 0 && jumpRef.current) {
            jumpRef.current.position.set(0, 5, 0); // Drop it from above
            velocity.current.set(0, -2, 0);
            spinVelocity.current = 0;
            if (spinRef.current) {
                spinRef.current.rotation.set(0, 0, 0);
            }
            // If the user lost the ball completely, ensure ground physics aren't corrupted
            groundAngularVelocity.current.set(0, 0);
            groundRotation.current.set(0, 0);
            isBouncing.current = true;
        }
    }, [resetTrigger]);

    useFrame((state, dt) => {
        // Cap delta time to prevent physics explosions when tab is inactive or frame drops
        const safeDt = Math.min(dt, 0.033); // Max physics step of ~30fps

        // 1. Ground Spring Physics
        if (groundMeshRef.current && introDone.current) {
            groundAngularVelocity.current.x += (0 - groundRotation.current.x) * groundSpring * safeDt;
            groundAngularVelocity.current.y += (0 - groundRotation.current.y) * groundSpring * safeDt;
            
            // Damping shouldn't technically be strictly dt-dependent in this simple form, 
            // but safeDt ensures it won't explode.
            groundAngularVelocity.current.x *= groundDamping;
            groundAngularVelocity.current.y *= groundDamping;
            
            groundRotation.current.x += groundAngularVelocity.current.x * safeDt;
            groundRotation.current.y += groundAngularVelocity.current.y * safeDt;
            
            // Clamp rotation so the camera doesn't see the bottom face of the ground
            const maxTilt = 0.35; // ~20 degrees max tilt
            groundRotation.current.x = Math.max(-maxTilt, Math.min(maxTilt, groundRotation.current.x));
            groundRotation.current.y = Math.max(-maxTilt, Math.min(maxTilt, groundRotation.current.y));
            
            groundMeshRef.current.rotation.x = groundRotation.current.x;
            groundMeshRef.current.rotation.z = groundRotation.current.y;
        }

        if (jumpRef.current) {
            // FAILSAFE: If physics explode to NaN or ball shoots to space, reset it!
            if (
                Number.isNaN(jumpRef.current.position.y) || 
                Number.isNaN(jumpRef.current.position.x) || 
                (spinRef.current && Number.isNaN(spinRef.current.rotation.x)) ||
                Math.abs(jumpRef.current.position.y) > 50 || 
                Math.abs(jumpRef.current.position.x) > 50
            ) {
                jumpRef.current.position.set(0, 5, 0);
                velocity.current.set(0, -2, 0);
                spinVelocity.current = 0;
                if (spinRef.current) {
                    spinRef.current.rotation.set(0, 0, 0);
                }
            }

            if (isBouncing.current) {
                // Cap maximum velocities to prevent tunneling or physics breaks
                velocity.current.x = Math.max(-30, Math.min(30, velocity.current.x));
                velocity.current.y = Math.max(-30, Math.min(30, velocity.current.y));
                velocity.current.z = Math.max(-30, Math.min(30, velocity.current.z));

                // 2. Apply Gravity & Velocity to Ball
                velocity.current.y += gravity * safeDt;
                
                velocity.current.x *= Math.pow(0.99, safeDt * 60); // Air friction scaled to frame rate
                velocity.current.z *= Math.pow(0.99, safeDt * 60);

                jumpRef.current.position.x += velocity.current.x * safeDt;
                jumpRef.current.position.y += velocity.current.y * safeDt;
                jumpRef.current.position.z += velocity.current.z * safeDt;
                
                if (spinRef.current) {
                    spinRef.current.rotation.x += spinVelocity.current * safeDt;
                    spinRef.current.rotation.z += (spinVelocity.current * 0.5) * safeDt;
                }
                // Avoid spin velocity flipping sign and exploding with large dt
                spinVelocity.current *= Math.pow(0.9, safeDt * 60);

                // 3. Ground Collision on a Tilted Surface
                const normal = new THREE.Vector3(0, 1, 0).applyEuler(new THREE.Euler(groundRotation.current.x, 0, groundRotation.current.y));
                const ballX = jumpRef.current.position.x;
                const ballZ = jumpRef.current.position.z;
                
                // Correctly calculate the surface height taking into account the sphere's radius against a slanted plane
                const pitchY = -1.2;
                const ballRadius = 0.85; // Distance from center of ball wrapper to pitch surface when flat
                const safeNy = Math.max(0.1, normal.y);
                const tiltedGroundY = pitchY + (ballRadius / safeNy) - (normal.x * ballX + normal.z * ballZ) / safeNy;

                // Calculate the exact vertical speed of the ground at the ball's location!
                const vGroundY = ballX * groundAngularVelocity.current.y - ballZ * groundAngularVelocity.current.x;

                // Only calculate collision if ground is fully faded in and exists
                if (introDone.current && jumpRef.current.position.y <= tiltedGroundY) {
                    jumpRef.current.position.y = tiltedGroundY;
                    
                    const dot = velocity.current.dot(normal);
                    if (dot < 0) {
                        // Reflect off tilted surface
                        velocity.current.sub(normal.clone().multiplyScalar(2 * dot));
                        velocity.current.multiplyScalar(bounceFactor);
                    }

                    // Real trampoline physics! If the ground is moving UP violently, transfer momentum to the ball!
                    if (vGroundY > 1.0) {
                        velocity.current.y = Math.max(velocity.current.y, vGroundY * 1.5);
                        velocity.current.x += normal.x * vGroundY; // Kick sideways
                        velocity.current.z += normal.z * vGroundY;
                        spinVelocity.current = vGroundY * 2.0; // Add tumble!
                    }

                    if (scoreRef.current > 0) {
                        scoreRef.current = 0;
                        onScoreReset?.();
                    }
                    
                    if (Math.abs(velocity.current.y) < 0.5 && Math.abs(velocity.current.x) < 0.5 && Math.abs(velocity.current.z) < 0.5) {
                        velocity.current.set(0, 0, 0); // Rest
                    }
                }
                
                // Real rolling physics when resting on tilted ground
                if (introDone.current && jumpRef.current.position.y - tiltedGroundY < 0.05) {
                    // Gravity pushes it down the slope smoothly
                    velocity.current.x += normal.x * 15.0 * safeDt;
                    velocity.current.z += normal.z * 15.0 * safeDt;
                    
                    // Physically accurate rolling rotation based on velocity!
                    if (spinRef.current) {
                        spinRef.current.rotation.x += (velocity.current.z * 0.5) * safeDt;
                        spinRef.current.rotation.z -= (velocity.current.x * 0.5) * safeDt;
                    }
                }

                // 4. Pitch Radial Boundary (Bounce off invisible walls)
                const distFromCenter = Math.sqrt(ballX * ballX + ballZ * ballZ);
                if (introDone.current && distFromCenter > 3.2) {
                    const nx = ballX / distFromCenter;
                    const nz = ballZ / distFromCenter;
                    jumpRef.current.position.x = nx * 3.2;
                    jumpRef.current.position.z = nz * 3.2;
                    velocity.current.x *= -0.7; // Bounce off wall
                    velocity.current.z *= -0.7;
                }

            } else {
                timeRef.current += safeDt;
                jumpRef.current.position.y = Math.sin(timeRef.current * 2) * 0.1;
            }
        }
    });

    const handleBallClick = (e: any) => {
        if (!introDone.current) return;
        e.stopPropagation(); // Stop click from hitting the ground!
        isBouncing.current = true;
        
        // Add impulse rather than just setting absolute velocity for realistic juggling.
        // If the ball is falling, it takes more force to kick it back up.
        // If it's already rising, we add a bit more momentum but cap it so it doesn't fly away.
        velocity.current.y = Math.max(velocity.current.y * 0.4 + 8.0, 7.0); 
        
        // Random horizontal nudge based on where you "kicked" it
        velocity.current.x += (Math.random() - 0.5) * 3.0; 
        velocity.current.z += (Math.random() - 0.5) * 3.0;
        
        // Give it a chaotic, realistic spin when kicked
        spinVelocity.current = (Math.random() > 0.5 ? 1 : -1) * (10.0 + Math.random() * 5.0); 
        
        scoreRef.current += 1;
        onScoreChange?.();
    };

    const handleGroundClick = (event: any) => {
        if (index !== 0 || !introDone.current) return;
        
        // If the first thing hit by the raycaster was NOT the ground, ignore it!
        // This ensures dragging the ball doesn't accidentally tilt the ground behind it.
        if (event.intersections && event.intersections.length > 0) {
            if (event.intersections[0].object !== groundMeshRef.current) {
                return;
            }
        }
        
        event.stopPropagation();
        if (!groundMeshRef.current || !jumpRef.current) return;
        
        // Calculate exact hit coordinate relative to ground center
        const localPoint = groundMeshRef.current.worldToLocal(event.point.clone());
        
        // Tilt the ground smoothly - no artificial ball physics here!
        // The useFrame loop will naturally throw the ball based on the ground's movement.
        const hitForce = 5.0; 
        groundAngularVelocity.current.y -= localPoint.x * hitForce; // Roll
        groundAngularVelocity.current.x += localPoint.z * hitForce; // Pitch
        
        isBouncing.current = true; // Make sure physics loop is active
    };

    return (
        <group>
            {/* The Pitch / Ground Plane */}
            {index === 0 && (
                <group position={[0, 0, 0]} scale={[1.2, 1.2, 1.2]}>
                    <mesh position={[0, -1.2, 0]} receiveShadow ref={groundMeshRef} onPointerDown={handleGroundClick}>
                        <cylinderGeometry args={[3.5, 3.5, 0.05, 64]} />
                        <meshStandardMaterial 
                            ref={groundMatRef} 
                            color="#123a20" 
                            roughness={0.8} 
                            metalness={0.1}
                            envMapIntensity={0.2} 
                            transparent 
                            opacity={0} 
                        />
                        {/* Field lines: outer ring */}
                        <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[3.2, 3.25, 64]} />
                            <meshBasicMaterial ref={lineMat1Ref} color="#ffffff" side={THREE.DoubleSide} opacity={0} transparent depthWrite={false} />
                        </mesh>
                        {/* Field lines: inner circle */}
                        <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[1.2, 1.25, 64]} />
                            <meshBasicMaterial ref={lineMat2Ref} color="#ffffff" side={THREE.DoubleSide} opacity={0} transparent depthWrite={false} />
                        </mesh>
                        {/* Center dot */}
                        <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                            <circleGeometry args={[0.15, 32]} />
                            <meshBasicMaterial ref={lineMat3Ref} color="#ffffff" opacity={0} transparent depthWrite={false} />
                        </mesh>
                    </mesh>
                </group>
            )}

            {/* Hierarchy: 
                groupRef (handles initial GSAP entrance animation) ->
                jumpRef (Handles pure Y translation so it always bounces up/down globally) -> 
                PresentationControls (Handles dragging to rotate) -> 
                spinRef (Handles tumbling spin mid-air) -> 
                BallModel 
            */}
            <group ref={groupRef}>
                <group ref={jumpRef} position={[0, 0, 0]}>
                    <PresentationControls
                        key={`presentation-${resetTrigger}`}
                        global={false}
                        cursor={true}
                        rotation={[0, -Math.PI / 4, 0]}
                        polar={[-Infinity, Infinity]}
                        azimuth={[-Infinity, Infinity]}
                        snap={false}
                    >
                        <group ref={spinRef}>
                            {index === 0 ? (
                                <BallModel onClick={handleBallClick} />
                            ) : index === 1 ? (
                                <RedBullGoldCanModel onClick={handleBallClick} />
                            ) : (
                                <PlaceholderShape index={index} onClick={handleBallClick} />
                            )}
                        </group>
                    </PresentationControls>
                </group>
            </group>
        </group>
    );
}

export default function AnimatedProjectHero({ project, index }: { project: Project, index: number }) {
    const textRef = useRef<HTMLDivElement>(null);
    const gradientRef = useRef<HTMLDivElement>(null);
    const rightSideRef = useRef<HTMLDivElement>(null);
    const canvasContainerRef = useRef<HTMLDivElement>(null);
    const scoreBoardRef = useRef<HTMLDivElement>(null);
    
    // Game State
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [resetTrigger, setResetTrigger] = useState(0);
    const [introFinished, setIntroFinished] = useState(index !== 0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        // Initial check
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleIntroComplete = useCallback(() => {
        setIntroFinished(true);
    }, []);

    const handleManualReset = () => {
        setResetTrigger(prev => prev + 1);
    }

    const handleScoreChange = () => {
        setScore(prev => {
            const newScore = prev + 1;
            setHighScore(currentHigh => newScore > currentHigh ? newScore : currentHigh);
            return newScore;
        });
    }

    const handleScoreReset = () => {
        setScore(0);
    }
    
    useEffect(() => {
        if (!textRef.current || !canvasContainerRef.current || !introFinished) return;
        
        // Phase 0: Blur animation for the 3D model
        gsap.fromTo(canvasContainerRef.current,
            { filter: "blur(20px)", opacity: 0 },
            { filter: "blur(0px)", opacity: 1, duration: 1.5, ease: "power2.out" }
        );

        // Phase 3: Text fade in and slide
        gsap.fromTo(textRef.current,
            { opacity: 0, x: -50 },
            { 
                opacity: 1, 
                x: 0, 
                duration: 1.5, 
                ease: "power3.out",
                delay: 2.5 
            }
        );
        
        // Phase 3.5: Right side tech stack fade in
        if (rightSideRef.current) {
            gsap.fromTo(rightSideRef.current,
                { opacity: 0, x: 50 },
                { 
                    opacity: 1, 
                    x: 0, 
                    duration: 1.5, 
                    ease: "power3.out",
                    delay: 2.7 
                }
            );
        }
        
        // Fade in the vignette overlay
        if (gradientRef.current) {
            gsap.fromTo(gradientRef.current,
                { opacity: 0 },
                {
                    opacity: 0.8,
                    duration: 1.5,
                    ease: "power2.inOut",
                    delay: 2.5
                }
            );
        }
        
        // Phase 4: Scoreboard fade in
        if (scoreBoardRef.current) {
            gsap.fromTo(scoreBoardRef.current,
                { opacity: 0, y: -20 },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 1.5, 
                    ease: "power3.out",
                    delay: 2.8 
                }
            );
        }
    }, [introFinished]);

    return (
        <header 
            className="relative w-full h-[100vh] flex overflow-hidden border-b border-white/5"
        >
            {/* Scoreboard HUD (Only for Ball Project) */}
            {index === 0 && (
                <div ref={scoreBoardRef} className="absolute top-[80px] md:top-12 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2 md:space-x-6 pointer-events-none opacity-0 items-stretch scale-75 md:scale-100 origin-top">
                    <div className="flex flex-col items-center justify-center bg-[#0a0510]/80 backdrop-blur-md border border-white/10 px-4 md:px-6 py-3 rounded-sm shadow-2xl min-w-[90px] md:min-w-[120px]">
                        <span className="text-white/50 text-[8px] md:text-[10px] font-cyber tracking-widest uppercase mb-1">Juggles</span>
                        <span className="text-2xl md:text-4xl font-tech font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                            {score}
                        </span>
                    </div>
                    
                    <button 
                        onClick={handleManualReset}
                        className="pointer-events-auto flex flex-col items-center justify-center bg-[#0a0510]/80 backdrop-blur-md border border-white/10 hover:border-fuchsia-500/50/80 hover:bg-fuchsia-500/10 px-4 rounded-sm shadow-2xl transition-all group cursor-pointer"
                        title="Reset Ball"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6 text-white/50 group-hover:text-fuchsia-400 transition-colors mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <span className="text-[8px] md:text-[10px] font-cyber tracking-widest uppercase transition-colors text-white/50 group-hover:text-fuchsia-400">Reset</span>
                    </button>

                    <div className="flex flex-col items-center justify-center bg-[#0a0510]/80 backdrop-blur-md border border-fuchsia-500/50/80 shadow-[0_0_20px_rgba(217,70,239,0.4),inset_0_0_15px_rgba(217,70,239,0.2)] px-4 md:px-6 py-3 rounded-sm min-w-[90px] md:min-w-[120px]">
                        <span className="text-fuchsia-300 text-[8px] md:text-[10px] font-cyber tracking-widest uppercase mb-1 drop-shadow-[0_0_5px_rgba(217,70,239,0.8)]">Best</span>
                        <span className="text-2xl md:text-4xl font-tech font-bold text-fuchsia-400 drop-shadow-[0_0_15px_rgba(217,70,239,1)] animate-pulse" style={{ textShadow: "0 0 20px rgba(217,70,239,0.8), 0 0 40px rgba(217,70,239,0.6)" }}>
                            {highScore}
                        </span>
                    </div>
                </div>
            )}

            {/* 3D Background layer taking full screen */}
            <div 
                style={{ viewTransitionName: `project-model-${project.slug}` }}
                className="absolute inset-0 z-10 pointer-events-none"
            >
                <div ref={canvasContainerRef} className="w-full h-full pointer-events-auto opacity-0">
                    <Canvas shadows camera={{ position: [0, isMobile ? 3.0 : 0, isMobile ? 10.5 : 5], fov: 45 }}>
                        {/* Soft, moody ambient light */}
                        <ambientLight intensity={0.2} />
                        
                        {/* Main Key Light - Realistic brightness */}
                        <directionalLight 
                            position={[5, 10, 5]} 
                            intensity={1.0} 
                            castShadow
                            shadow-mapSize={[2048, 2048]}
                            shadow-bias={-0.0001}
                        />
                        
                        {/* Subtle Fill Light - Gentle blue */}
                        <directionalLight 
                            position={[-5, 5, -5]} 
                            intensity={0.4} 
                            color="#88b5ff" 
                        />
                        
                        {/* Moody Rim Light */}
                        <spotLight 
                            position={[0, 2, -5]} 
                            intensity={1.5} 
                            color="#ff3333" 
                            angle={0.6}
                            penumbra={0.8}
                        />
                        
                        <SceneAnimator 
                            index={index} 
                            onScoreChange={handleScoreChange} 
                            onScoreReset={handleScoreReset}
                            resetTrigger={resetTrigger}
                            startIntro={introFinished}
                        />
                        
                        <Environment preset="city" />
                    </Canvas>
                </div>
            </div>

            {/* Background ambient glow */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none z-0">
                <div className={`w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full blur-[150px] ${index === 1 ? 'bg-amber-500/20' : 'bg-fuchsia-500/10'}`}></div>
            </div>

            {/* Intro Sequence Background */}
            {index === 0 && (
                <IntroSequence onComplete={handleIntroComplete} />
            )}

            {/* Glassmorphism Overlay over the background video (Appears after intro) */}
            <div className={`fixed inset-0 z-[5] pointer-events-none transition-all duration-[1500ms] ease-out ${introFinished ? 'bg-[#0a0510]/30 backdrop-blur-[12px] opacity-100' : 'opacity-0 backdrop-blur-none'}`} />

            {/* Architectural Grid Lines Overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                    backgroundSize: '50px 50px'
                }}
            ></div>

            {/* Subtle Vignette Overlay for Text Readability */}
            <div ref={gradientRef} className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#05020a_100%)] z-20 pointer-events-none opacity-0"></div>

            {/* Foreground DOM layer */}
            <div className="relative z-30 w-full h-full pointer-events-none flex flex-col md:flex-row p-6 md:p-12 lg:p-24 overflow-hidden">
                
                {/* Left Side: Main Typography & Metadata */}
                <div className="w-full md:w-1/3 flex flex-col justify-start md:justify-center h-auto md:h-full relative z-10 opacity-0 min-h-[30vh] md:min-h-0" ref={textRef}>
                    {/* Title block */}
                    <div className="mt-32 md:mt-0">
                        <span className={`font-cyber font-bold tracking-[0.5em] text-xs md:text-sm uppercase mb-3 block ${index === 1 ? 'text-amber-400' : 'text-fuchsia-400'}`} style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
                            {project.category}
                        </span>
                        <h1 className="font-tech text-4xl sm:text-5xl md:text-7xl lg:text-[100px] font-black uppercase leading-[0.9] tracking-tight text-white mb-4 max-w-xl" style={{ textShadow: "0 4px 30px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)" }}>
                            {project.title}
                        </h1>
                        <p className="font-cyber text-white/90 text-[11px] sm:text-sm md:text-base leading-relaxed max-w-sm font-light mb-6 md:mb-12" style={{ textShadow: "0 2px 10px rgba(0,0,0,1)" }}>
                            {project.description}
                        </p>
                    </div>
                </div>

                {/* Right Side: Tech Stack List */}
                <div className="relative md:absolute md:right-12 lg:right-24 md:top-1/2 md:-translate-y-1/2 flex flex-row flex-wrap justify-start md:flex-col md:items-start gap-3 md:gap-0 md:space-y-6 opacity-0 pointer-events-auto" ref={rightSideRef}>
                    {project.techStack.map((tech, i) => (
                        <div key={tech} className="flex items-center gap-2 md:gap-3 group cursor-pointer bg-[#0a0510]/80 backdrop-blur-md border border-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-full shadow-2xl">
                            <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors duration-500 shadow-lg ${i === 0 ? 'bg-white shadow-white/50' : 'bg-white/30 group-hover:bg-white/80'}`}></div>
                            <span className={`font-tech text-[9px] md:text-xs tracking-widest uppercase transition-colors duration-500 ${i === 0 ? 'text-white font-bold' : 'text-white/70 group-hover:text-white'}`}>{tech}</span>
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
}
