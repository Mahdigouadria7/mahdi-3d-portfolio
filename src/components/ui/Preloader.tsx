"use client";

import { useEffect, useState } from "react";

const PRELOAD_IMAGES = [
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/portfolio/mahdi_portrait.jpg",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/portfolio/hero_frames/frame_00150.jpg",
    "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_600/portfolio/hero_frames/frame_00200.jpg",
];

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Percentage counter 0 -> 100% over 2.6 seconds
        const duration = 2600;
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const currentProgress = Math.min(100, Math.floor((elapsedTime / duration) * 100));
            setProgress(currentProgress);

            // Cycle center cards
            if (currentProgress < 33) setCurrentImageIndex(0);
            else if (currentProgress < 66) setCurrentImageIndex(1);
            else setCurrentImageIndex(2);

            if (currentProgress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        }, 25);

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            className={`fixed inset-0 z-[999999] bg-[#070707] text-white flex flex-col justify-between p-6 md:p-12 overflow-hidden transition-all duration-1000 ease-in-out select-none ${
                isLoading ? "opacity-100 pointer-events-auto scale-100" : "opacity-0 pointer-events-none scale-105"
            }`}
        >
            {/* ── Left Vertical Guideline & Meta Labels ─────────────────────── */}
            <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-white/10 flex flex-col justify-between items-center py-10 z-20 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-[#ffff7b] animate-ping" />
                <span className="font-mono text-[9px] text-white/30 tracking-[0.3em] uppercase -rotate-90 origin-center whitespace-nowrap">
                    • MAHDI GOUADRIA STUDIO
                </span>
                <span className="text-white/20 text-xs">✦</span>
            </div>

            {/* ── Top-Right Rotating Circular Badge ────────────────────────── */}
            <div className="absolute top-6 right-6 md:top-12 md:right-12 z-20">
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

            {/* ── Main Editorial Typography & Center Card Stack ────────────── */}
            <div className="my-auto max-w-5xl mx-auto w-full flex flex-col items-center justify-center text-center relative z-10 py-8">
                
                {/* Line 1: CREATING */}
                <h1 className="font-playfair text-3xl sm:text-5xl md:text-7xl tracking-tight text-white font-medium uppercase leading-tight animate-[fadeIn_0.6s_ease-out]">
                    CREATING
                </h1>

                {/* Line 2: EXPERIENCES* */}
                <h2 className="font-playfair text-3xl sm:text-5xl md:text-7xl tracking-tight text-white font-medium uppercase leading-tight flex items-center gap-2">
                    EXPERIENCES<span className="text-[#ffff7b] font-mono text-2xl md:text-4xl">*</span>
                </h2>

                {/* Line 3: IMPOSSIBLE (Giant Warm Serif + Center Floating Image Stack) */}
                <div className="relative my-2 sm:my-4 flex items-center justify-center w-full">
                    <h3 className="font-sans text-4xl sm:text-6xl md:text-[110px] font-black text-[#d1c7b7]/25 uppercase tracking-tighter leading-none select-none">
                        IMPOSSIBLE
                    </h3>

                    {/* Center Floating Image Card Stack */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative w-24 h-32 sm:w-32 sm:h-44 md:w-40 md:h-52 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/20 bg-black transform -rotate-3 hover:rotate-0 transition-all duration-500">
                            {PRELOAD_IMAGES.map((src, index) => (
                                <img
                                    key={src}
                                    src={src}
                                    alt="3D Work Preview"
                                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                                        index === currentImageIndex ? "opacity-100 scale-100" : "opacity-0 scale-110"
                                    }`}
                                />
                            ))}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                    </div>
                </div>

                {/* Line 4: TO IGNORE */}
                <h4 className="font-playfair text-3xl sm:text-5xl md:text-7xl tracking-tight text-white font-medium uppercase leading-tight">
                    TO IGNORE
                </h4>
            </div>

            {/* ── Bottom Bar: Metadata & Line Progress ─────────────────────── */}
            <div className="w-full max-w-4xl mx-auto flex flex-col gap-4 z-20">
                {/* Meta details */}
                <div className="w-full flex items-center justify-between font-mono text-[10px] sm:text-xs text-white/40 uppercase tracking-widest px-2">
                    <span>3D &amp; CGI STUDIO</span>
                    <span className="text-[#ffff7b]">✦</span>
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
