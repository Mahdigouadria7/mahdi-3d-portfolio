"use client";

import { useEffect, useState } from "react";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Add a slight delay for minimum loading time to ensure assets buffer
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500); // 1.5 seconds minimum loading
        
        return () => clearTimeout(timer);
    }, []);

    if (!isLoading) {
        // Once faded out, we can return null to completely remove it from the DOM
        // but it's better to keep it mounting and just hide it to allow CSS transitions to finish.
        // We will just let the opacity-0 class hide it.
    }

    return (
        <div 
            className={`fixed inset-0 z-[99999] bg-[#050505] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
                isLoading ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none delay-500"
            }`}
        >
            <div className={`relative transition-all duration-1000 ease-in-out ${isLoading ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                {/* Glowing Logo Text */}
                <h1 className="font-tech text-5xl md:text-7xl text-white tracking-[0.25em] uppercase font-black mix-blend-screen relative z-10">
                    MAHDI
                </h1>
                
                {/* Glow Effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] blur-3xl bg-amber-500/20 animate-pulse rounded-full pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] blur-2xl bg-violet-500/20 animate-pulse delay-100 rounded-full pointer-events-none mix-blend-screen" />
            </div>
            
            {/* Loading Indicator */}
            <div className={`absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 transition-opacity duration-500 ${isLoading ? "opacity-100" : "opacity-0"}`}>
                <div className="w-48 h-[1px] bg-white/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400 to-transparent w-full h-full animate-[shimmer_1.5s_infinite]" />
                </div>
                <span className="font-mono text-[9px] text-white/40 tracking-[0.4em] uppercase">Initializing Render</span>
            </div>
        </div>
    );
}
