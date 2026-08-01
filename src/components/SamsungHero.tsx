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
    <div className="relative w-full h-[100dvh] overflow-hidden select-none bg-[#050c1f]">

      {/* Ambient gradient lighting for Quizy-inspired sleek dark blue glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full bg-blue-600/15 blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-indigo-600/10 blur-[160px]" />
      </div>

      {/* Architectural subtle grid background overlay */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
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
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[#050c1f]">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin" />
            <span className="absolute font-mono text-[10px] text-cyan-300 font-bold">{loadProgress}%</span>
          </div>
          <div className="font-mono text-xs tracking-[0.3em] text-white/60 uppercase">
            LOADING 3D EXPERIENCE
          </div>
        </div>
      )}

      {/* Top Header Row */}
      {isLoaded && (
        <div className="samsung-ui-anim absolute top-6 left-6 md:left-12 right-6 md:right-12 z-30 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-[11px] font-bold text-white uppercase tracking-widest">SAMSUNG</span>
            </div>
            <span className="font-mono text-xs text-white/40 uppercase tracking-widest hidden sm:inline-block">Galaxy S22 Ultra 3D</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-cyan-400 font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              CGI &amp; WebGL
            </span>
          </div>
        </div>
      )}

      {/* Bottom-left — Headline typography */}
      {isLoaded && (
        <div className="absolute bottom-10 left-6 md:left-12 z-30 max-w-xl pointer-events-none">
          <div className="samsung-ui-anim inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 backdrop-blur-md text-cyan-300 font-mono text-xs font-semibold uppercase tracking-wider mb-4">
            <span>✨ 3D Interactive Showcase</span>
          </div>
          <h1 className="samsung-ui-anim font-sans font-black text-white uppercase leading-[0.95] tracking-tight drop-shadow-2xl"
              style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)' }}>
            SAMSUNG <br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              CGI &amp; 3D
            </span>
          </h1>
          <p className="samsung-ui-anim font-sans text-white/60 text-sm md:text-base mt-4 max-w-md leading-relaxed">
            Drag to rotate the 3D phone or pen in real-time. Scroll to adjust orientation.
          </p>
        </div>
      )}

      {/* Mode Toggle Controls — Top/Bottom Right on Desktop & Mobile */}
      {isLoaded && (
        <div className="samsung-ui-anim absolute bottom-10 right-6 md:right-12 z-30 flex flex-col items-end gap-2.5 pointer-events-auto">
          <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 bg-slate-900/80 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-2xl">
            <button
              onClick={() => handleRenderModeChange('phone')}
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2 ${
                renderMode === 'phone'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>📱</span>
              <span>Phone Only</span>
            </button>

            <button
              onClick={() => handleRenderModeChange('pen')}
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2 ${
                renderMode === 'pen'
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <span>✒️</span>
              <span>Pen Only</span>
            </button>
          </div>

          {/* Special Free Pen Use Toggle — Visible when Pen mode or Phone mode */}
          {renderMode === 'pen' && (
            <button
              onClick={handleTogglePenActive}
              className={`px-5 py-2.5 rounded-xl transition-all duration-300 text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2 border backdrop-blur-xl shadow-xl ${
                isPenActive
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-cyan-500/40 animate-pulse'
                  : 'bg-slate-900/90 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/20'
              }`}
            >
              <span>{isPenActive ? '🎯' : '🖋️'}</span>
              <span>{isPenActive ? 'Draw Mode: ON' : 'Free Pen Use: OFF'}</span>
            </button>
          )}
        </div>
      )}

      {/* Scroll indicator */}
      {isLoaded && (
        <div className="samsung-ui-anim absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none opacity-60">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-300">Scroll Down</span>
          <div className="w-1.5 h-6 rounded-full border border-cyan-400/40 flex items-start justify-center p-0.5">
            <div className="w-1 h-1.5 bg-cyan-400 rounded-full animate-bounce" />
          </div>
        </div>
      )}

    </div>
  );
}
