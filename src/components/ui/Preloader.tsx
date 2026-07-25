"use client";

import { useEffect, useState, useRef } from "react";

const MAHDI_PORTRAIT = "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/portfolio/mahdi_portrait.jpg";

const PROJECT_IMAGES = [
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784898993/portfolio/trionda/cover_ball.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784898994/portfolio/trionda/render_ball.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784898995/portfolio/trionda/stadium_mockup.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784898996/portfolio/trionda/street_billboard.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784899273/portfolio/redbull/ticket2.png",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784899905/portfolio/redbull/liwa_redbull_2.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784899907/portfolio/redbull/liwa_redbull_3.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784899913/portfolio/redbull/redbull_gold_darker.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784899924/portfolio/redbull/redbull_gold_2.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784899929/portfolio/redbull/redbullr.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784899935/portfolio/redbull/redbull_environmet_xt.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784899938/portfolio/redbull/redbull_environmet.webp",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/v1784899943/portfolio/redbull/viewport_darkgold.webp",
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
    const imageCountRef = useRef(0);

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

    // ── 3. Interactive Mouse / Touch Image Trail ───────────────────────────
    const createTrailItem = (x: number, y: number) => {
        const dist = Math.hypot(x - lastPosRef.current.x, y - lastPosRef.current.y);

        if (dist > 40) {
            lastPosRef.current = { x, y };
            const newId = Date.now() + Math.random();

            let nextImg: string;
            if (imageCountRef.current === 0) {
                nextImg = MAHDI_PORTRAIT;
            } else {
                const randomIndex = Math.floor(Math.random() * PROJECT_IMAGES.length);
                nextImg = PROJECT_IMAGES[randomIndex];
            }
            imageCountRef.current += 1;

            const randomRot = (Math.random() - 0.5) * 26;

            setTrail((prev) => [
                ...prev.slice(-5),
                { id: newId, x, y, image: nextImg, rotation: randomRot }
            ]);
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        createTrailItem(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches[0]) {
            createTrailItem(e.touches[0].clientX, e.touches[0].clientY);
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
            onTouchMove={handleTouchMove}
            className={`fixed inset-0 z-[999999] bg-[#070707] text-white flex flex-col justify-between p-4 sm:p-8 md:p-12 overflow-hidden transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] select-none ${
                isLoading ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-105"
            }`}
        >
            {/* ── Corner Precision Crosshairs (+) ────────────────────────────── */}
            <span className={`absolute top-4 left-4 sm:top-6 sm:left-6 text-white/30 font-mono text-xs z-20 transition-opacity duration-700 ${animateIn ? "opacity-100" : "opacity-0"}`}>+</span>
            <span className={`absolute top-4 right-4 sm:top-6 sm:right-6 text-white/30 font-mono text-xs z-20 transition-opacity duration-700 ${animateIn ? "opacity-100" : "opacity-0"}`}>+</span>
            <span className={`absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white/30 font-mono text-xs z-20 transition-opacity duration-700 ${animateIn ? "opacity-100" : "opacity-0"}`}>+</span>
            <span className={`absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-white/30 font-mono text-xs z-20 transition-opacity duration-700 ${animateIn ? "opacity-100" : "opacity-0"}`}>+</span>

            {/* ── Mouse / Touch Follow Image Trail ────────────────────────── */}
            {trail.map((item, index) => (
                <div
                    key={item.id}
                    className="fixed z-30 pointer-events-none w-24 h-32 sm:w-36 sm:h-48 md:w-40 md:h-52 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/20 bg-black transition-all duration-650 ease-out"
                    style={{
                        left: item.x - 50,
                        top: item.y - 65,
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
                className={`absolute left-3 sm:left-6 md:left-12 top-0 bottom-0 w-px bg-white/10 hidden sm:flex flex-col justify-between items-center py-10 z-10 pointer-events-none transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
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
                className={`absolute top-4 right-4 sm:top-6 sm:right-6 md:top-12 md:right-12 z-10 scale-90 sm:scale-100 transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    !animateIn
                        ? "-translate-y-6 opacity-0 scale-90"
                        : isLoading
                        ? "translate-y-0 opacity-100 scale-100"
                        : "-translate-y-6 opacity-0 scale-90"
                }`}
            >
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center">
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
                    <span className="absolute font-mono text-[10px] sm:text-[11px] font-bold text-[#ffff7b]">
                        {progress}%
                    </span>
                </div>
            </div>

            {/* ── Main Multi-Motion Typography Section (Fully Responsive Mobile Layout) ── */}
            <div className="my-auto max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center relative z-10 py-4 sm:py-6 gap-1.5 sm:gap-2.5 [perspective:1000px] px-2">

                {/* LINE 1: CREATING — Responsive Font Scale & Blur Dissolve */}
                <h1
                    className={`font-playfair text-2xl sm:text-5xl md:text-7xl lg:text-8xl text-white font-medium uppercase leading-tight transition-all duration-900 ease-out ${
                        !animateIn
                            ? "tracking-[-0.1em] blur-md opacity-0 -translate-y-4"
                            : isLoading
                            ? "tracking-wider blur-0 opacity-100 translate-y-0"
                            : "tracking-[-0.1em] blur-md opacity-0 -translate-y-4"
                    }`}
                >
                    CREATING
                </h1>

                {/* LINE 2: EXPERIENCES* — Responsive Mobile Inline Character Stack */}
                <h2 className="font-playfair text-2xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight text-white font-medium uppercase leading-tight flex items-center justify-center gap-0.5 sm:gap-1.5 flex-nowrap">
                    {"EXPERIENCES".split("").map((char, index) => (
                        <span key={index} className="inline-block overflow-hidden py-0.5">
                            <span
                                className={`inline-block transition-all duration-900 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                                    !animateIn
                                        ? "translate-y-[130%] rotate-6 opacity-0"
                                        : isLoading
                                        ? "translate-y-0 rotate-0 opacity-100"
                                        : "-translate-y-[130%] -rotate-6 opacity-0"
                                }`}
                                style={{ transitionDelay: `${150 + index * 25}ms` }}
                            >
                                {char}
                            </span>
                        </span>
                    ))}
                    <span
                        className={`inline-block font-mono text-lg sm:text-2xl md:text-4xl text-[#ffff7b] animate-[spin_5.5s_linear_infinite] transition-all duration-700 delay-300 ml-0.5 ${
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

                {/* LINE 3: IMPOSSIBLE — Responsive 3D Perspective Slam & Scale Impact */}
                <div className="my-0.5 sm:my-1.5 overflow-hidden w-full">
                    <h3
                        className={`font-sans text-3xl sm:text-6xl md:text-[100px] lg:text-[125px] font-black text-[#d1c7b7] uppercase tracking-tighter leading-none transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] delay-350 ${
                            !animateIn
                                ? "scale-[1.5] opacity-0 [transform:rotateX(45deg)]"
                                : isLoading
                                ? "scale-100 opacity-100 [transform:rotateX(0deg)]"
                                : "scale-[0.85] opacity-0 [transform:rotateX(-45deg)]"
                        }`}
                    >
                        IMPOSSIBLE
                    </h3>
                </div>

                {/* LINE 4: TO IGNORE — Responsive Fill & Slide */}
                <div className="overflow-hidden py-0.5">
                    <h4
                        className={`font-playfair text-2xl sm:text-5xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-tight transition-all duration-900 ease-out delay-500 ${
                            !animateIn
                                ? "translate-x-12 opacity-0 text-transparent [stroke:1px_rgba(255,255,255,0.4)]"
                                : isLoading
                                ? "translate-x-0 opacity-100 text-white"
                                : "-translate-x-12 opacity-0 text-transparent"
                        }`}
                    >
                        TO IGNORE
                    </h4>
                </div>
            </div>

            {/* ── Bottom Meta Bar ────────────────────────────────────────────── */}
            <div
                className={`flex flex-col sm:flex-row items-center justify-between gap-2 font-mono text-[9px] sm:text-[10px] text-white/40 tracking-[0.2em] uppercase z-10 transition-all duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    !animateIn
                        ? "translate-y-6 opacity-0"
                        : isLoading
                        ? "translate-y-0 opacity-100"
                        : "translate-y-6 opacity-0"
                }`}
            >
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ffff7b]" />
                    <span>3D &amp; CGI STUDIO</span>
                </div>
                <div className="hidden md:flex items-center gap-2 text-white/30">
                    <span>✦</span>
                    <span>LAT 36.8° N / LON 10.1° E</span>
                </div>
                <div>TUNISIA · WORLDWIDE</div>
            </div>
        </div>
    );
}
