"use client";

import { useEffect, useRef, useState } from "react";
import { SamsungHeroApp } from "./SamsungHeroApp";
import { projects } from "@/data/projects";
import gsap from "gsap";

export default function SamsungHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<SamsungHeroApp | null>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [renderMode, setRenderMode] = useState<'phone' | 'pen'>('phone');
  const [isPenActive, setIsPenActive] = useState<boolean>(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    const app = new SamsungHeroApp(canvasRef.current, (progress: number) => {
      setLoadProgress(Math.round(progress * 100));
      if (progress >= 1.0) {
        setTimeout(() => {
          setIsLoaded(true);
          
          // Animate text in after load
          const ctx = gsap.context(() => {
            gsap.fromTo(".hero-text-anim",
              { opacity: 0, x: -50 },
              { opacity: 1, x: 0, duration: 1.5, ease: "power3.out", stagger: 0.1 }
            );
            gsap.fromTo(".hero-tech-anim",
              { opacity: 0, x: 50 },
              { opacity: 1, x: 0, duration: 1.5, ease: "power3.out", stagger: 0.1, delay: 0.2 }
            );
          });
        }, 300);
      }
    });

    appRef.current = app;

    // Fallback timer to mark loaded if progress finishes
    const timer = setTimeout(() => setIsLoaded(true), 2000);

    return () => {
      clearTimeout(timer);
      if (appRef.current) {
        appRef.current.dispose();
        appRef.current = null;
      }
    };
  }, []);

  const handleRenderModeChange = (mode: 'phone' | 'pen') => {
    setRenderMode(mode);
    if (appRef.current) {
      appRef.current.setRenderMode(mode);
      if (mode === 'pen') {
        appRef.current.togglePenActive(isPenActive);
      }
    }
  };

  const project = projects[0]; // S22 Ultra 3D Hero data

  return (
    <div className="relative w-full h-[100dvh] bg-black overflow-hidden select-none">
      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover z-0 cursor-grab active:cursor-grabbing touch-none"
        style={{ touchAction: "none" }}
      />

      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-black z-50 flex flex-col items-center justify-center gap-4 transition-opacity duration-700">
          <div className="w-12 h-12 border-2 border-[#00f0ff] border-t-transparent rounded-full animate-spin" />
          <div className="font-mono text-sm tracking-widest text-white/80 uppercase">
            LOADING EXPERIENCE {loadProgress}%
          </div>
        </div>
      )}

      {/* Architectural Grid Lines Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
          style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
          }}
      ></div>

      {/* Subtle Vignette Overlay for Text Readability */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_#141414_100%)] z-10 pointer-events-none transition-opacity duration-[1500ms] ${isLoaded ? 'opacity-80' : 'opacity-0'}`}></div>

      {/* Foreground DOM layer */}
      <div className="relative z-30 w-full h-[100dvh] pointer-events-none flex flex-col md:flex-row px-6 md:px-12 lg:px-24 pt-24 md:pt-32 pb-8 overflow-hidden">
          
          {/* Left Side: Main Typography & Metadata */}
          <div className="w-full md:w-1/2 flex flex-col justify-start md:justify-center h-auto md:h-full relative z-10 min-h-[30vh] md:min-h-0">
              {/* Title block */}
              {isLoaded && (
                <div className="mt-16 md:-mt-8 space-y-4">
                    <div className="hero-text-anim inline-flex items-center gap-2 bg-[#00f0ff] text-[#141414] font-mono text-xs font-bold px-4 py-1.5 rounded-full shadow-sm pointer-events-auto">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#141414] animate-ping" />
                        <span className="uppercase tracking-widest">{project.category}</span>
                    </div>

                    <h1 className="hero-text-anim font-playfair text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-bold uppercase leading-[1.05] tracking-tight text-white mb-4 max-w-2xl" style={{ textShadow: "0 4px 30px rgba(0,0,0,0.9)" }}>
                        {project.title.split(" ")[0]}{" "}
                        <em className="font-playfair italic font-normal text-[#00f0ff]">
                            {project.title.split(" ").slice(1).join(" ")}
                        </em>
                    </h1>


                </div>
              )}
          </div>

          {/* Right Side: Rendering Mode Toggles */}
          {isLoaded && (
            <div className="relative md:absolute md:right-12 lg:right-24 md:top-1/2 md:-translate-y-1/2 flex flex-row flex-wrap justify-start md:flex-col md:items-start gap-3 pointer-events-auto">
                <button
                  onClick={() => handleRenderModeChange('phone')}
                  className={`px-5 py-2.5 rounded-full transition-all duration-300 text-xs font-semibold uppercase tracking-wider border backdrop-blur-md cursor-pointer ${
                    renderMode === 'phone' 
                      ? 'bg-white text-black border-white' 
                      : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/20'
                  }`}
                >
                  📱 Phone Only
                </button>
                <button
                  onClick={() => handleRenderModeChange('pen')}
                  className={`px-5 py-2.5 rounded-full transition-all duration-300 text-xs font-semibold uppercase tracking-wider border backdrop-blur-md cursor-pointer ${
                    renderMode === 'pen' 
                      ? 'bg-[#00f0ff] text-black border-[#00f0ff]' 
                      : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/20'
                  }`}
                >
                  ✒️ Pen Only
                </button>
                {renderMode === 'pen' && (
                  <button
                    onClick={() => {
                      const newState = !isPenActive;
                      setIsPenActive(newState);
                      if (appRef.current) appRef.current.togglePenActive(newState);
                    }}
                    className={`mt-2 px-5 py-2.5 rounded-full transition-all duration-300 text-xs font-semibold uppercase tracking-wider border backdrop-blur-md cursor-pointer ${
                      isPenActive 
                        ? 'bg-[#00f0ff]/20 text-[#00f0ff] border-[#00f0ff]' 
                        : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/20'
                    }`}
                  >
                    {isPenActive ? '🎯 Use Pen: ON' : '🔄 Float Pen: OFF'}
                  </button>
                )}
            </div>
          )}
      </div>
    </div>
  );
}
