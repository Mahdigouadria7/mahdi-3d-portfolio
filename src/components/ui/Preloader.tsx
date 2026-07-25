"use client";

import { useEffect, useState, useRef } from "react";

const PRELOADER_VIDEO_URL = "https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto/portfolio/preloader_animation.mp4";
const FALLBACK_VIDEO_URL = "/models/65c10d4f965fc573342449.mp4";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Animate percentage counter smooth 0 -> 100
        const duration = 2500; // 2.5s total preloader duration
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const currentProgress = Math.min(100, Math.floor((elapsedTime / duration) * 100));
            setProgress(currentProgress);

            if (currentProgress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsLoading(false);
                }, 300);
            }
        }, 30);

        return () => clearInterval(interval);
    }, []);

    // Ensure video plays on mobile and desktop
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch((err) => {
                console.log("Autoplay notice in preloader video:", err);
            });
        }
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

            {/* Center Exact Preloader Video Animation */}
            <div className="relative flex flex-col items-center justify-center my-auto">
                <div className="relative w-[280px] h-[280px] sm:w-[380px] sm:h-[380px] md:w-[460px] md:h-[460px] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] border border-white/10 bg-black flex items-center justify-center">
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                    >
                        <source src={PRELOADER_VIDEO_URL} type="video/mp4" />
                        <source src={FALLBACK_VIDEO_URL} type="video/mp4" />
                    </video>

                    {/* Glass border sheen overlay */}
                    <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-3xl" />
                </div>
            </div>

            {/* Bottom Progress Bar & Percentage Counter */}
            <div className="w-full max-w-md mx-auto flex flex-col items-center gap-4">
                <div className="w-full flex items-center justify-between font-mono text-xs text-white/60">
                    <span className="tracking-widest uppercase text-[10px]">Loading Experience</span>
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
