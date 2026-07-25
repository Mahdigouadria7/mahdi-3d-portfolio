"use client";

import { useEffect, useState, useRef } from "react";

const PRELOAD_IMAGES = [
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/portfolio/mahdi_portrait.jpg",
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
    const [trail, setTrail] = useState<TrailItem[]>([]);
    
    const lastPosRef = useRef({ x: 0, y: 0 });
    const imageIndexRef = useRef(0);

    // ── 1. Progress Counter & Staggered Timing ────────────────────────────
    useEffect(() => {
        const duration = 2800; // 2.8s preloader lifetime
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const currentProgress = Math.min(100, Math.floor((elapsedTime / duration) * 100));
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsLoading(false);
                }, 600);
            }
        }, 25);

        return () => clearInterval(interval);
    }, []);

    // ── 2. Interactive Image Trail on Mouse Move ───────────────────────────
    const handleMouseMove = (e: React.MouseEvent) => {
        const dist = Math.hypot(e.clientX - lastPosRef.current.x, e.clientY - lastPosRef.current.y);
        
        // Spawn image card whenever cursor moves > 45px
        if (dist > 45) {
            lastPosRef.current = { x: e.clientX, y: e.clientY };
            const newId = Date.now() + Math.random();
            const nextImg = PRELOAD_IMAGES[imageIndexRef.current % PRELOAD_IMAGES.length];
            imageIndexRef.current += 1;
            const randomRot = (Math.random() - 0.5) * 24; // -12deg to +12deg

            setTrail((prev) => [
                ...prev.slice(-6), // keep last 7 trail items
                { id: newId, x: e.clientX, y: e.clientY, image: nextImg, rotation: randomRot }
            ]);
        }
    };

    // Auto fade tail items over time
    useEffect(() => {
        const timer = setInterval(() => {
            setTrail((prev) => (prev.length > 0 ? prev.slice(1) : prev));
        }, 350);
        return () => clearInterval(timer);
    }, []);

    return (
        <div
            onMouseMove={handleMouseMove}
            className={`fixed inset-0 z-[999999] bg-[#070707] text-white flex flex-col justify-between p-6 md:p-12 overflow-hidden transition-all duration-1000 ease-in-out select-none ${
                isLoading ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-105"
            }`}
        >
            {/* ── Mouse Follow Image Trail (Fades out automatically) ────────── */}
            {trail.map((item, index) => (
                <div
                    key={item.id}
                    className="fixed z-20 pointer-events-none w-28 h-36 sm:w-36 sm:h-48 md:w-40 md:h-52 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/20 bg-black transition-all duration-700 ease-out"
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
                className={`absolute left-6 md:left-12 top-0 bottom-0 w-px bg-white/10 flex flex-col justify-between items-center py-10 z-10 pointer-events-none transition-all duration-700 ${
                    isLoading ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
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
                className={`absolute top-6 right-6 md:top-12 md:right-12 z-10 transition-all duration-700 ${
                    isLoading ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
                }`}
            >
                <div className="relative w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
                    <svg className="w-full h-full animate-[spin_12s_linear_infinite]" viewBox="0 0 100 100">
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

            {/* ── Main Editorial Motion Typography (Unobscured & Clean) ────── */}
            <div className="my-auto max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center relative z-10 py-8 gap-1 md:gap-2">
                
                {/* Line 1: CREATING */}
                <div className="overflow-hidden">
                    <h1
                        className={`font-playfair text-4xl sm:text-6xl md:text-8xl tracking-tight text-white font-medium uppercase leading-tight transition-all duration-700 delay-100 ${
                            isLoading ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
                        }`}
                    >
                        CREATING
                    </h1>
                </div>

                {/* Line 2: EXPERIENCES* */}
                <div className="overflow-hidden">
                    <h2
                        className={`font-playfair text-4xl sm:text-6xl md:text-8xl tracking-tight text-white font-medium uppercase leading-tight flex items-center justify-center gap-2 transition-all duration-700 delay-200 ${
                            isLoading ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
                        }`}
                    >
                        EXPERIENCES<span className="text-[#ffff7b] font-mono text-2xl md:text-4xl animate-pulse">*</span>
                    </h2>
                </div>

                {/* Line 3: IMPOSSIBLE (Clean Unblocked Editorial Serif) */}
                <div className="overflow-hidden my-1 sm:my-2">
                    <h3
                        className={`font-sans text-5xl sm:text-7xl md:text-[130px] font-black text-[#d1c7b7] uppercase tracking-tighter leading-none transition-all duration-700 delay-300 ${
                            isLoading ? "translate-y-0 opacity-100 scale-100" : "-translate-y-8 opacity-0 scale-95"
                        }`}
                    >
                        IMPOSSIBLE
                    </h3>
                </div>

                {/* Line 4: TO IGNORE */}
                <div className="overflow-hidden">
                    <h4
                        className={`font-playfair text-4xl sm:text-6xl md:text-8xl tracking-tight text-white font-medium uppercase leading-tight transition-all duration-700 delay-400 ${
                            isLoading ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
                        }`}
                    >
                        TO IGNORE
                    </h4>
                </div>
            </div>

            {/* ── Bottom Bar: Metadata & Line Progress ─────────────────────── */}
            <div
                className={`w-full max-w-4xl mx-auto flex flex-col gap-4 z-10 transition-all duration-700 delay-500 ${
                    isLoading ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
            >
                {/* Meta details */}
                <div className="w-full flex items-center justify-between font-mono text-[10px] sm:text-xs text-white/40 uppercase tracking-widest px-2">
                    <span>3D &amp; CGI STUDIO</span>
                    <span className="text-[#ffff7b] animate-bounce">✦</span>
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
