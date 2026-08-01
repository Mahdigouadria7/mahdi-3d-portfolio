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
  const [isPenActive, setIsPenActive] = useState<boolean>(false);

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

  const handleRenderModeChange = (mode: 'phone' | 'pen') => {
    setRenderMode(mode);
    if (appRef.current) {
      appRef.current.setRenderMode(mode);
      if (mode === 'pen') {
        appRef.current.togglePenActive(isPenActive);
      }
    }
  };

  const handleTogglePenActive = () => {
    const newState = !isPenActive;
    setIsPenActive(newState);
    if (appRef.current) {
      appRef.current.togglePenActive(newState);
    }
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden select-none bg-[#03081a]">

      {/* Quizy-inspired vibrant animated background ambient glows */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[10%] left-1/4 w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-blue-600/25 to-cyan-500/20 blur-[150px] animate-pulse transition-all duration-1000" />
        <div className="absolute -bottom-[10%] right-1/4 w-[55vw] h-[55vw] rounded-full bg-gradient-to-br from-indigo-600/25 via-blue-700/20 to-purple-600/15 blur-[160px] animate-pulse transition-all duration-1000" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-cyan-600/10 blur-[180px]" />
      </div>

      {/* Fine architectural grid pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* 3D WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing touch-none"
        style={{ touchAction: "none" }}
      />

      {/* Sleek loading screen overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[#03081a]">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
            <span className="absolute font-mono text-[11px] text-cyan-300 font-bold">{loadProgress}%</span>
          </div>
          <div className="font-mono text-xs tracking-[0.3em] text-white/70 uppercase">
            LOADING 3D EXPERIENCE
          </div>
        </div>
      )}

      {/* Top Navigation Row */}
      {isLoaded && (
        <div className="samsung-ui-anim absolute top-6 left-6 md:left-12 right-6 md:right-12 z-30 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-sans font-black text-white text-xs uppercase tracking-widest">SAMSUNG</span>
            </div>
            <span className="font-mono text-xs text-cyan-300/80 uppercase tracking-widest hidden sm:inline-block">Galaxy S22 Ultra</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-cyan-300 font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/30 backdrop-blur-md shadow-lg">
              CGI &amp; 3D Showcase
            </span>
          </div>
        </div>
      )}

      {/* Floating 3D Control Bar — Positioned upper-right on desktop & top-right on mobile to avoid overlapping hero text */}
      {isLoaded && (
        <div className="samsung-ui-anim absolute top-20 md:top-24 right-6 md:right-12 z-30 flex flex-col items-end gap-3 pointer-events-auto">
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-2xl border border-white/15 shadow-2xl">
            <button
              onClick={() => handleRenderModeChange('phone')}
              className={`px-4 py-2 rounded-xl transition-all duration-300 text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2 ${
                renderMode === 'phone'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/30 border border-cyan-300/40'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-transparent'
              }`}
            >
              <span>📱</span>
              <span>Phone</span>
            </button>

            <button
              onClick={() => handleRenderModeChange('pen')}
              className={`px-4 py-2 rounded-xl transition-all duration-300 text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2 ${
                renderMode === 'pen'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/30 border border-cyan-300/40'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-transparent'
              }`}
            >
              <span>✒️</span>
              <span>S‑Pen</span>
            </button>
          </div>

          {/* S-Pen Free Draw Toggle Button */}
          {renderMode === 'pen' && (
            <button
              onClick={handleTogglePenActive}
              className={`px-4 py-2 rounded-xl transition-all duration-300 text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2 border backdrop-blur-2xl shadow-2xl ${
                isPenActive
                  ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 border-cyan-300 shadow-cyan-400/50 font-black animate-pulse'
                  : 'bg-slate-900/90 text-cyan-300 border-cyan-500/40 hover:bg-cyan-500/20'
              }`}
            >
              <span>{isPenActive ? '🎯' : '🖋️'}</span>
              <span>{isPenActive ? 'Draw Mode: ON' : 'Free Pen Use: OFF'}</span>
            </button>
          )}
        </div>
      )}

      {/* Bottom-left — Headline typography */}
      {isLoaded && (
        <div className="absolute bottom-10 left-6 md:left-12 z-30 max-w-lg pointer-events-none">
          <div className="samsung-ui-anim inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-xl text-cyan-300 font-mono text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
            <span>✨ Interactive 3D Canvas</span>
          </div>
          <h1 className="samsung-ui-anim font-sans font-black text-white uppercase leading-[0.95] tracking-tight drop-shadow-2xl"
              style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5rem)' }}>
            SAMSUNG <br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              CGI &amp; 3D
            </span>
          </h1>
          <p className="samsung-ui-anim font-sans text-white/70 text-xs md:text-sm mt-3 max-w-sm leading-relaxed drop-shadow-md">
            Interactive WebGL 3D model. Drag to spin the phone or pen, scroll to adjust zoom.
          </p>
        </div>
      )}

      {/* Scroll indicator */}
      {isLoaded && (
        <div className="samsung-ui-anim absolute bottom-4 right-6 md:right-12 z-20 flex items-center gap-2 pointer-events-none opacity-60">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-300 font-bold">Scroll Down</span>
          <div className="w-5 h-8 rounded-full border border-cyan-400/40 flex items-start justify-center p-1">
            <div className="w-1.5 h-2 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        </div>
      )}

    </div>
  );
}
