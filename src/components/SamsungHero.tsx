"use client";

import { useEffect, useRef, useState } from "react";
import { SamsungHeroApp } from "./SamsungHeroApp";
import gsap from "gsap";

export default function SamsungHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<SamsungHeroApp | null>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [renderMode, setRenderMode] = useState<'phone' | 'pen'>('phone');

  useEffect(() => {
    if (!canvasRef.current) return;

    const app = new SamsungHeroApp(canvasRef.current, (progress: number) => {
      setLoadProgress(Math.round(progress * 100));
      if (progress >= 1.0) {
        setTimeout(() => {
          setIsLoaded(true);
          gsap.fromTo(".samsung-ui-anim",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08 }
          );
        }, 300);
      }
    });

    appRef.current = app;
    const timer = setTimeout(() => setIsLoaded(true), 2500);

    return () => {
      clearTimeout(timer);
      if (appRef.current) {
        appRef.current.dispose();
        appRef.current = null;
      }
    };
  }, []);

  const handleMode = (mode: 'phone' | 'pen') => {
    setRenderMode(mode);
    if (appRef.current) appRef.current.setRenderMode(mode);
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden select-none" style={{ background: '#1428A0' }}>

      {/* 3D WebGL Canvas — fills entire hero */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing touch-none"
        style={{ touchAction: "none" }}
      />

      {/* Samsung Blue loading screen */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6" style={{ background: '#1428A0' }}>
          {/* Samsung wordmark */}
          <div className="font-sans font-black text-white text-2xl tracking-[0.15em] uppercase mb-4">SAMSUNG</div>
          {/* Progress bar */}
          <div className="w-48 h-[2px] bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <div className="font-sans text-xs tracking-[0.3em] text-white/50 uppercase">{loadProgress}%</div>
        </div>
      )}

      {/* Top thin rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-white/20 z-20" />

      {/* Bottom thin rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/20 z-20" />

      {/* Top-left brand label */}
      {isLoaded && (
        <div className="samsung-ui-anim absolute top-6 left-6 md:left-12 z-30 flex items-center gap-3">
          <span className="font-sans font-black text-white text-sm tracking-[0.2em] uppercase">SAMSUNG</span>
          <div className="w-px h-4 bg-white/30" />
          <span className="font-sans text-white/50 text-xs tracking-[0.2em] uppercase">Galaxy S22 Ultra</span>
        </div>
      )}

      {/* Bottom-left — large editorial headline overlay */}
      {isLoaded && (
        <div className="absolute bottom-12 left-6 md:left-12 z-30 max-w-xl">
          <p className="samsung-ui-anim font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-white/50 mb-3 font-semibold">
            CGI · Blender 3D · Three.js WebGL
          </p>
          <h1 className="samsung-ui-anim font-sans font-black text-white uppercase leading-[0.92] tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 8vw, 6rem)' }}>
            CGI &amp;<br />3D
          </h1>
        </div>
      )}

      {/* Bottom-right — mode toggles */}
      {isLoaded && (
        <div className="samsung-ui-anim absolute bottom-12 right-6 md:right-12 z-30 flex flex-col gap-2">
          <button
            onClick={() => handleMode('phone')}
            className={`px-6 py-2.5 text-xs font-sans font-bold uppercase tracking-[0.15em] border transition-all duration-200 ${
              renderMode === 'phone'
                ? 'bg-white text-[#1428A0] border-white'
                : 'bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10'
            }`}
          >
            Phone
          </button>
          <button
            onClick={() => handleMode('pen')}
            className={`px-6 py-2.5 text-xs font-sans font-bold uppercase tracking-[0.15em] border transition-all duration-200 ${
              renderMode === 'pen'
                ? 'bg-white text-[#1428A0] border-white'
                : 'bg-transparent text-white border-white/40 hover:border-white hover:bg-white/10'
            }`}
          >
            S‑Pen
          </button>
        </div>
      )}

      {/* Year stamp — top right */}
      {isLoaded && (
        <div className="samsung-ui-anim absolute top-6 right-6 md:right-12 z-30">
          <span className="font-sans text-xs text-white/40 tracking-[0.3em] uppercase font-semibold">2025</span>
        </div>
      )}

      {/* Thin vertical center rule — decorative, samsung.com style */}
      <div className="absolute left-1/2 top-8 bottom-8 w-px bg-white/10 z-10 pointer-events-none hidden lg:block" />

      {/* Scroll hint */}
      {isLoaded && (
        <div className="samsung-ui-anim absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2">
          <div className="w-px h-8 bg-white/30 animate-pulse" />
          <span className="font-sans text-[9px] tracking-[0.4em] uppercase text-white/30">Scroll</span>
        </div>
      )}
    </div>
  );
}
