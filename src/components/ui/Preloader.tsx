"use client";

import { useEffect, useState, useRef } from "react";

const MAHDI_PORTRAIT = "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/portfolio/mahdi_portrait.jpg";

const PROJECT_IMAGES = [
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784898993/portfolio/trionda/cover_ball.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784898995/portfolio/trionda/stadium_mockup.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784898996/portfolio/trionda/street_billboard.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784899905/portfolio/redbull/liwa_redbull_2.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784899913/portfolio/redbull/redbull_gold_darker.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784899929/portfolio/redbull/redbullr.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784899935/portfolio/redbull/redbull_environmet_xt.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/portfolio/hero_frames/frame_00150.jpg",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/portfolio/hero_frames/frame_00200.jpg",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/portfolio/hero_frames/frame_00080.jpg",
];

interface TrailItem {
    id: number;
    x: number;
    y: number;
    image: string;
    rotation: number;
}

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [animateIn, setAnimateIn] = useState(false);
    const [trail, setTrail] = useState<TrailItem[]>([]);

    const lastPosRef = useRef({ x: 0, y: 0 });
    const imageIndexRef = useRef(0);

    // ── 1. Sequence Timing Trigger ─────────────────────────────────────────
    useEffect(() => {
        const timer = setTimeout(() => setAnimateIn(true), 80);
        return () => clearTimeout(timer);
    }, []);

    // ── 2. Smooth Progress Counter (2.2s Total Duration) ───────────────────
    useEffect(() => {
        const duration = 2200; // Smooth 2.2s preloader lifecycle
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const currentProgress = Math.min(100, Math.floor((elapsedTime / duration) * 100));
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(interval);
                setTimeout(() => setIsLoading(false), 450);
            }
        }, 18);

        return () => clearInterval(interval);
    }, []);

    // ── 3. Interactive Mouse Image Trail ───────────────────────────────────
    const handleMouseMove = (e: React.MouseEvent) => {
        const dist = Math.hypot(e.clientX - lastPosRef.current.x, e.clientY - lastPosRef.current.y);

        if (dist > 40) {
            lastPosRef.current = { x: e.clientX, y: e.clientY };
            const newId = Date.now() + Math.random();
            
            // First image is ALWAYS Mahdi's portrait; subsequent images are randomized from project pool
            let nextImg: string;
            if (imageIndexRef.current === 0) {
                nextImg = MAHDI_PORTRAIT;
            } else {
                const randomIndex = Math.floor(Math.random() * PROJECT_IMAGES.length);
                nextImg = PROJECT_IMAGES[randomIndex];
            }
            imageIndexRef.current += 1;
            
            const randomRot = (Math.random() - 0.5) * 26;

            setTrail((prev) => [
                ...prev.slice(-6),
                { id: newId, x: e.clientX, y: e.clientY, image: nextImg, rotation: randomRot }
            ]);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTrail((prev) => (prev.length > 0 ? prev.slice(1) : prev));
        }, 300);
        return () => clearInterval(timer);
    }, []);

    return (
        <div
            onMouseMove={handleMouseMove}
            className={`fixed inset-0 z-[999999] bg-[#070707] text-white flex flex-col justify-between p-6 md:p-12 overflow-hidden transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
                isLoading ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-105"
            }`}
        >
            {/* ── Corner Precision Crosshairs (+) ────────────────────────────── */}
            <span className={`absolute top-6 left-6 text-white/30 font-mono text-xs z-20 transition-opacity duration-700 ${animateIn ? "opacity-100" : "opacity-0"}`}>+</span>
            <span className={`absolute top-6 right-6 text-white/30 font-mono text-xs z-20 transition-opacity duration-700 ${animateIn ? "opacity-100" : "opacity-0"}`}>+</span>
            <span className={`absolute bottom-6 left-6 text-white/30 font-mono text-xs z-20 transition-opacity duration-700 ${animateIn ? "opacity-100" : "opacity-0"}`}>+</span>
            <span className={`absolute bottom-6 right-6 text-white/30 font-mono text-xs z-20 transition-opacity duration-700 ${animateIn ? "opacity-100" : "opacity-0"}`}>+</span>

            {/* ── Mouse Follow Image Trail (Fades out automatically) ────────── */}
            {trail.map((item, index) => (
                <div
                    key={item.id}
                    className="fixed z-30 pointer-events-none w-28 h-36 sm:w-36 sm:h-48 md:w-40 md:h-52 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/20 bg-black transition-all duration-650 ease-out"
                    style={{
                        left: item.x - 70,
                        top: item.y - 90,
                        transform: `rotate(${item.rotation}deg) scale(${1 - (trail.length - 1 - index) * 0.08})`,
                        opacity: (index + 1) / trail.length,
                    }}
                >
                    <img src={item.image} alt="3D Render Trail" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
            ))}

            {/* ── Left Vertical Guideline & Meta Labels ─────────────────────── */}
            <div
                className={`absolute left-6 md:left-12 top-0 bottom-0 w-px bg-white/10 flex flex-col justify-between items-center py-10 z-10 pointer-events-none transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    !animateIn
                        ? "-translate-x-6 opacity-0"
                        : isLoading
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-6 opacity-0"
                }`}
            >
                <span className="w-2 h-2 rounded-full bg-[#ffff7b] animate-ping" />
                <span className="font-mono text-[9px] text-white/30 tracking-[0.3em] uppercase -rotate-90 origin-center whitespace-nowrap">
                    • MAHDI GOUADRIA STUDIO
                </span>
                <span className="text-white/20 text-xs">✦</span>
            </div>

            {/* ── Top-Right Rotating Circular Badge ────────────────────────── */}
            <div
                className={`absolute top-6 right-6 md:top-12 md:right-12 z-10 transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    !animateIn
                        ? "-translate-y-6 opacity-0 scale-90"
                        : isLoading
                        ? "translate-y-0 opacity-100 scale-100"
                        : "-translate-y-6 opacity-0 scale-90"
                }`}
            >
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    <svg className="w-full h-full animate-[spin_11s_linear_infinite]" viewBox="0 0 100 100">
                        <path
                            id="badge-path"
                            d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                            fill="none"
                        />
                        <text className="font-mono text-[9px] uppercase fill-white/50 tracking-widest">
                            <textPath href="#badge-path">
                                MAHDI GOUADRIA ✦ 3D STUDIO ✦
                            </textPath>
                        </text>
                    </svg>
                    <span className="absolute font-mono text-[11px] font-bold text-[#ffff7b]">
                        {progress}%
                    </span>
                </div>
            </div>

            {/* ── Main Multi-Motion Typography Section ──────────────────────── */}
            <div className="my-auto max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center relative z-10 py-6 gap-2 md:gap-3 [perspective:1000px]">

                {/* LINE 1: CREATING — Tracking Expansion + Blur Dissolve Reveal */}
                <h1
                    className={`font-playfair text-4xl sm:text-6xl md:text-8xl text-white font-medium uppercase leading-tight transition-all duration-900 ease-out ${
                        !animateIn
                            ? "tracking-[-0.2em] blur-md opacity-0 -translate-y-6"
                            : isLoading
                            ? "tracking-wider blur-0 opacity-100 translate-y-0"
                            : "tracking-[-0.2em] blur-md opacity-0 -translate-y-6"
                    }`}
                >
                    CREATING
                </h1>

                {/* LINE 2: EXPERIENCES* — Staggered Character Mask Rise + Spinning Asterisk */}
                <h2 className="font-playfair text-4xl sm:text-6xl md:text-8xl tracking-tight text-white font-medium uppercase leading-tight flex items-center justify-center gap-2">
                    {"EXPERIENCES".split("").map((char, index) => (
                        <span key={index} className="inline-block overflow-hidden py-1">
                            <span
                                className={`inline-block transition-all duration-900 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                                    !animateIn
                                        ? "translate-y-[130%] rotate-6 opacity-0"
                                        : isLoading
                                        ? "translate-y-0 rotate-0 opacity-100"
                                        : "-translate-y-[130%] -rotate-6 opacity-0"
                                }`}
                                style={{ transitionDelay: `${150 + index * 30}ms` }}
                            >
                                {char}
                            </span>
                        </span>
                    ))}
                    <span
                        className={`inline-block font-mono text-2xl md:text-4xl text-[#ffff7b] animate-[spin_5.5s_linear_infinite] transition-all duration-700 delay-300 ${
                            !animateIn
                                ? "scale-0 opacity-0"
                                : isLoading
                                ? "scale-100 opacity-100"
                                : "scale-0 opacity-0"
                        }`}
                    >
                        *
                    </span>
                </h2>

                {/* LINE 3: IMPOSSIBLE — 3D Perspective Slam & Scale Impact */}
                <div className="my-1 sm:my-2 overflow-hidden">
                    <h3
                        className={`font-sans text-5xl sm:text-7xl md:text-[130px] font-black text-[#d1c7b7] uppercase tracking-tighter leading-none transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] delay-350 ${
                            !animateIn
                                ? "scale-[1.6] opacity-0 [transform:rotateX(45deg)]"
                                : isLoading
                                ? "scale-100 opacity-100 [transform:rotateX(0deg)]"
                                : "scale-[0.8] opacity-0 [transform:rotateX(-45deg)]"
                        }`}
                    >
                        IMPOSSIBLE
                    </h3>
                </div>

                {/* LINE 4: TO IGNORE — Outline Stroke to Solid Fill + Horizontal Slide */}
                <div className="overflow-hidden py-1">
                    <h4
                        className={`font-playfair text-4xl sm:text-6xl md:text-8xl tracking-tight uppercase leading-tight transition-all duration-900 ease-out delay-500 ${
                            !animateIn
                                ? "translate-x-20 opacity-0 text-transparent [stroke:1px_rgba(255,255,255,0.4)]"
                                : isLoading
                                ? "translate-x-0 opacity-100 text-white"
                                : "-translate-x-20 opacity-0 text-transparent"
                        }`}
                    >
                        TO IGNORE
                    </h4>
                </div>
            </div>

            {/* ── Bottom Bar: Metadata & Line Progress ─────────────────────── */}
            <div
                className={`w-full max-w-4xl mx-auto flex flex-col gap-4 z-10 transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] delay-500 ${
                    !animateIn
                        ? "translate-y-8 opacity-0"
                        : isLoading
                        ? "translate-y-0 opacity-100"
                        : "translate-y-8 opacity-0"
                }`}
            >
                {/* Meta details */}
                <div className="w-full flex items-center justify-between font-mono text-[10px] sm:text-xs text-white/40 uppercase tracking-widest px-2">
                    <span>3D &amp; CGI STUDIO</span>
                    <span className="text-[#ffff7b] animate-pulse">✦ LAT 36.8° N / LON 10.1° E</span>
                    <span>TUNISIA · WORLDWIDE</span>
                </div>

                {/* Progress bar line */}
                <div className="w-full h-px bg-white/10 relative overflow-hidden">
                    <div
                        className="h-full bg-[#ffff7b] transition-all duration-100 ease-out shadow-[0_0_8px_#ffff7b]"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
