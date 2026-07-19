"use client";

import { useRef, useEffect } from "react";

/**
 * TubesCursor — an immersive Three.js cursor-following tubes effect.
 *
 * The library is loaded dynamically from a CDN ES module to avoid
 * Turbopack / Next.js bundler conflicts with the external Three.js build.
 */
export default function TubesCursor() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Skip on touch/mobile devices — no hover cursor exists, WebGL wastes battery
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

        /* eslint-disable @typescript-eslint/no-explicit-any */
        let instance: any = null;
        let destroyed = false;

        const randomColors = () => {
            const palette = [
                "#6a0d24", // dark red
                "#8b0000", // dark red
                "#5c0a1a", // very dark red
                "#4a0404", // very dark red
                "#b22222", // slightly brighter red
            ];
            const pick = () => palette[Math.floor(Math.random() * palette.length)];
            return {
                colors: [pick(), pick(), pick()],
                lights: {
                    intensity: 80,
                    colors: [pick(), pick(), pick(), pick()],
                },
            };
        };

        const handleClick = () => {
            if (instance && typeof instance.updateColors === "function") {
                instance.updateColors(randomColors());
            }
        };

        // Dynamic import from local public directory
        import(
            /* webpackIgnore: true */
            "/lib/tubes1.min.js"
        )
            .then((module) => {
                if (destroyed || !canvasRef.current) return;

                const TubesCursorClass = module.TubesCursor || module.default;

                instance = new TubesCursorClass(canvasRef.current, {
                    sleep: false,
                    radius: 0.3, // Make the overall tubes smaller
                    length: 15,  // Make the tubes shorter
                    colors: ["#6a0d24", "#8b0000", "#5c0a1a"], // Calm dark reds
                    lights: {
                        intensity: 80, // Subtler glow
                        colors: ["#b22222", "#cd5c5c", "#8b0000", "#4a0404"], // Calm reds
                    },
                });

                document.addEventListener("click", handleClick);
            })
            .catch((err) => {
                console.error("TubesCursor failed to load:", err);
            });

        return () => {
            destroyed = true;
            document.removeEventListener("click", handleClick);
            if (instance) {
                if (typeof instance.dispose === "function") instance.dispose();
                else if (typeof instance.destroy === "function") instance.destroy();
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full z-0 pointer-events-none mix-blend-screen opacity-70"
        />
    );
}
