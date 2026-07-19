"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider, BallCollider, type RapierRigidBody } from "@react-three/rapier";
import { KeyboardControls, useKeyboardControls, OrbitControls, Environment, Grid } from "@react-three/drei";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

interface InteractiveSceneProps {
    isDriving: boolean;
}

function Car({ isDriving }: { isDriving: boolean }) {
    const bodyRef = useRef<RapierRigidBody>(null);
    const controlsRef = useRef<any>(null);
    const [, getKeys] = useKeyboardControls();

    useFrame((state, delta) => {
        if (!bodyRef.current) return;
        bodyRef.current.wakeUp();

        const keys = getKeys();
        const { forward, backward, left, right, brake } = keys;

        const impulse = new THREE.Vector3();
        const torque = new THREE.Vector3();

        // Quick, snappy arcade speeds
        const speed = 800 * delta;
        const turnSpeed = 250 * delta;

        if (forward) impulse.z -= speed;
        if (backward) impulse.z += speed;

        if (forward || backward) {
            const dir = forward ? 1 : -1;
            if (left) torque.y += turnSpeed * dir;
            if (right) torque.y -= turnSpeed * dir;
        }

        const quaternion = new THREE.Quaternion().copy(bodyRef.current.rotation() as THREE.Quaternion);
        impulse.applyQuaternion(quaternion);

        // Limit velocity so it doesn't accelerate infinitely like a spaceship
        const currentVel = bodyRef.current.linvel();
        const velocityMag = Math.sqrt(currentVel.x * currentVel.x + currentVel.y * currentVel.y + currentVel.z * currentVel.z);

        if (velocityMag < 60) {
            bodyRef.current.applyImpulse(impulse, true);
        }

        bodyRef.current.applyTorqueImpulse(torque, true);

        // Anti-Drift Logic (Mathematically reduce lateral sliding without applying tipping physics)
        const localVelocity = new THREE.Vector3(currentVel.x, currentVel.y, currentVel.z).applyQuaternion(quaternion.clone().invert());

        // Kill 15% of lateral sliding per frame for a tight grip
        localVelocity.x *= 0.85;

        // Re-apply to global velocity vector
        localVelocity.applyQuaternion(quaternion);

        // Only overwrite X and Z velocity directly so gravity (Y) applies naturally. No tipping forces!
        bodyRef.current.setLinvel({
            x: localVelocity.x,
            y: currentVel.y,
            z: localVelocity.z
        }, true);

        if (brake) {
            bodyRef.current.setLinearDamping(8);
            bodyRef.current.setAngularDamping(15);
        } else {
            // High angular damping makes steering tight, natural linear damping mimics air resistance
            bodyRef.current.setLinearDamping(1.2);
            bodyRef.current.setAngularDamping(10);
        }

        // Camera smoothly tracking the car 
        if (controlsRef.current) {
            const carPosition = new THREE.Vector3().copy(bodyRef.current.translation() as THREE.Vector3);

            if (isDriving) {
                controlsRef.current.target.lerp(carPosition, delta * 8);
            } else {
                controlsRef.current.target.lerp(new THREE.Vector3(0, 0, 0), delta * 2);
            }
            controlsRef.current.update();
        }
    });

    return (
        <>
            <OrbitControls
                ref={controlsRef}
                makeDefault
                enablePan={false}
                minDistance={5}
                maxDistance={30}
                maxPolarAngle={Math.PI / 2 - 0.05} // Mathematically prevents camera from ever going underground
            />

            <RigidBody ref={bodyRef} colliders={false} type="dynamic" position={[0, 2, 0]} mass={10}>
                {/* Main Body */}
                <CuboidCollider args={[0.9, 0.4, 1.75]} position={[0, -0.2, 0]} />

                {/* Wheels acting as contact points (friction set to 0 as we use anti-drift math above) */}
                <BallCollider args={[0.3]} position={[-0.8, -0.6, 1.4]} friction={0} />
                <BallCollider args={[0.3]} position={[0.8, -0.6, 1.4]} friction={0} />
                <BallCollider args={[0.3]} position={[-0.8, -0.6, -1.4]} friction={0} />
                <BallCollider args={[0.3]} position={[0.8, -0.6, -1.4]} friction={0} />

                {/* Futuristic / Cyberpunk Car Visuals matching the website theme */}
                <group position={[0, -0.2, 0]}>
                    <mesh castShadow>
                        <boxGeometry args={[1.8, 0.8, 3.5]} />
                        <meshStandardMaterial color="#C12A73" emissive="#C12A73" emissiveIntensity={0.3} roughness={0.2} metalness={0.8} />
                    </mesh>

                    {/* Cockpit / Windows */}
                    <mesh position={[0, 0.45, -0.5]}>
                        <boxGeometry args={[1.6, 0.25, 1.5]} />
                        <meshStandardMaterial color="#0b0213" transparent opacity={0.9} roughness={0.1} />
                    </mesh>

                    {/* Headlights casting actual illumination */}
                    <mesh position={[-0.6, 0, -1.76]}>
                        <boxGeometry args={[0.4, 0.2, 0.05]} />
                        <meshBasicMaterial color="#00ffff" />
                        <pointLight color="#00ffff" intensity={4} distance={40} position={[0, 0, -0.5]} decay={2} />
                    </mesh>
                    <mesh position={[0.6, 0, -1.76]}>
                        <boxGeometry args={[0.4, 0.2, 0.05]} />
                        <meshBasicMaterial color="#00ffff" />
                        <pointLight color="#00ffff" intensity={4} distance={40} position={[0, 0, -0.5]} decay={2} />
                    </mesh>

                    {/* Taillights */}
                    <mesh position={[-0.7, 0, 1.76]}>
                        <boxGeometry args={[0.3, 0.15, 0.05]} />
                        <meshBasicMaterial color="#ff0044" />
                        <pointLight color="#ff0044" intensity={2} distance={10} position={[0, 0, 0.5]} />
                    </mesh>
                    <mesh position={[0.7, 0, 1.76]}>
                        <boxGeometry args={[0.3, 0.15, 0.05]} />
                        <meshBasicMaterial color="#ff0044" />
                        <pointLight color="#ff0044" intensity={2} distance={10} position={[0, 0, 0.5]} />
                    </mesh>
                </group>
            </RigidBody>
        </>
    );
}

export default function InteractiveScene({ isDriving }: InteractiveSceneProps) {
    useEffect(() => {
        if (isDriving) {
            window.focus();
            if (document.activeElement instanceof HTMLElement) {
                document.activeElement.blur();
            }
        }
    }, [isDriving]);

    const map = useMemo(
        () => [
            { name: "forward", keys: ["ArrowUp", "w", "W", "z", "Z"] },
            { name: "backward", keys: ["ArrowDown", "s", "S"] },
            { name: "left", keys: ["ArrowLeft", "a", "A", "q", "Q"] },
            { name: "right", keys: ["ArrowRight", "d", "D"] },
            { name: "brake", keys: ["Space"] },
        ],
        []
    );

    return (
        <div className={`fixed inset-0 w-full h-full transition-opacity duration-1000 ${isDriving ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 -z-5 pointer-events-none'}`}>
            <KeyboardControls map={map}>
                <Canvas shadows camera={{ position: [0, 8, 20], fov: 60 }}>

                    {/* Synthwave/Futuristic website colors */}
                    <color attach="background" args={["#05020a"]} />
                    <fog attach="fog" args={["#05020a", 20, 250]} />

                    <ambientLight color="#ffffff" intensity={0.5} />
                    <directionalLight
                        position={[-50, 50, -50]}
                        color="#ffffff"
                        intensity={1.5}
                        castShadow
                        shadow-mapSize={[2048, 2048]}
                    />

                    <Physics>
                        <Car isDriving={isDriving} />

                        {/* The Futuristic Infinite Floor */}
                        <RigidBody type="fixed" friction={1}>
                            <mesh receiveShadow position={[0, -0.52, 0]}>
                                <boxGeometry args={[4000, 1, 4000]} />
                                <meshStandardMaterial color="#05020a" roughness={0.1} metalness={0.5} />
                            </mesh>

                            {/* Three Drei Grid component for a beautiful fading neon grid effect */}
                            <Grid
                                position={[0, 0, 0]}
                                args={[1000, 1000]}
                                cellSize={1}
                                cellThickness={0.5}
                                cellColor="#C12A73" // Website Pink/Magenta accent
                                sectionSize={10}
                                sectionThickness={1.5}
                                sectionColor="#3B0059" // Deep purple website accent
                                fadeDistance={200}
                                fadeStrength={2}
                            />
                        </RigidBody>
                    </Physics>

                </Canvas>
            </KeyboardControls>
        </div>
    );
}
