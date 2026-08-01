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

      {/* Premium smoothly animated gradient background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-[20%] left-1/4 w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-blue-600/30 via-sky-500/20 to-indigo-600/25 blur-[160px] animate-pulse transition-all duration-1000" />
        <div className="absolute -bottom-[20%] right-1/4 w-[65vw] h-[65vw] rounded-full bg-gradient-to-br from-indigo-700/30 via-blue-800/25 to-sky-600/20 blur-[170px] animate-pulse transition-all duration-1000" style={{ animationDelay: '2.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-sky-500/10 blur-[190px]" />
      </div>

      {/* Fine architectural grid pattern */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* 3D WebGL Canvas — touch-pan-y allows smooth webpage scrolling */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing touch-pan-y"
      />

      {/* Sleek loading screen overlay */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-[#03081a]">
          <div className="relative flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-sky-400/20 border-t-sky-400 rounded-lg animate-spin" />
            <span className="absolute font-mono text-[11px] text-sky-300 font-bold">{loadProgress}%</span>
          </div>
          <div className="font-mono text-xs tracking-[0.3em] text-white/70 uppercase">
            LOADING 3D EXPERIENCE
          </div>
        </div>
      )}

      {/* Top Navigation Row — Clean spacing without overlaps */}
      {isLoaded && (
        <div className="samsung-ui-anim absolute top-6 left-6 md:left-12 right-6 md:right-12 z-30 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <div className="px-4 py-1.5 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span className="font-sans font-black text-white text-xs uppercase tracking-widest">SAMSUNG</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-sky-200 font-semibold uppercase tracking-widest px-3.5 py-1.5 rounded-lg bg-sky-500/15 border border-sky-400/30 backdrop-blur-md shadow-lg">
              CGI &amp; 3D Showcase
            </span>
          </div>
        </div>
      )}

      {/* Floating 3D Control Bar — Sharp, confident architectural styling */}
      {isLoaded && (
        <div className="samsung-ui-anim absolute top-20 md:top-24 right-6 md:right-12 z-30 flex flex-col items-end gap-3 pointer-events-auto">
          <div className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-900/85 backdrop-blur-2xl border border-white/15 shadow-2xl">
            <button
              onClick={() => handleRenderModeChange('phone')}
              className={`px-4 py-2 rounded-md transition-all duration-300 text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2 ${
                renderMode === 'phone'
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-sky-500/30 border border-sky-300/40'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-transparent'
              }`}
            >
              <span>📱</span>
              <span>Phone</span>
            </button>

            <button
              onClick={() => handleRenderModeChange('pen')}
              className={`px-4 py-2 rounded-md transition-all duration-300 text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2 ${
                renderMode === 'pen'
                  ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white shadow-lg shadow-sky-500/30 border border-sky-300/40'
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
              className={`px-4 py-2 rounded-md transition-all duration-300 text-xs font-sans font-bold uppercase tracking-wider flex items-center gap-2 border backdrop-blur-2xl shadow-2xl ${
                isPenActive
                  ? 'bg-gradient-to-r from-sky-400 to-teal-400 text-slate-950 border-sky-300 shadow-sky-400/50 font-black animate-pulse'
                  : 'bg-slate-900/90 text-sky-300 border-sky-500/40 hover:bg-sky-500/20'
              }`}
            >
              <span>{isPenActive ? '🎯' : '🖋️'}</span>
              <span>{isPenActive ? 'Draw Mode: ON' : 'Free Pen Use: OFF'}</span>
            </button>
          )}
        </div>
      )}

      {/* Bottom-left — Premium headline typography & sharp corners */}
      {isLoaded && (
        <div className="absolute bottom-10 left-6 md:left-12 z-30 max-w-lg pointer-events-none">
          <div className="samsung-ui-anim inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-blue-500/20 border border-blue-400/30 backdrop-blur-xl text-sky-300 font-mono text-xs font-semibold uppercase tracking-wider mb-4 shadow-lg">
            <span>✨ Interactive 3D Canvas</span>
          </div>
          <h1 className="samsung-ui-anim font-sans font-black text-white uppercase leading-[0.95] tracking-tight drop-shadow-2xl"
              style={{ fontSize: 'clamp(2.4rem, 6.5vw, 5rem)' }}>
            SAMSUNG <br />
            <span className="bg-gradient-to-r from-white via-slate-100 to-sky-300 bg-clip-text text-transparent">
              CGI &amp; 3D
            </span>
          </h1>
          <p className="samsung-ui-anim font-sans text-white/70 text-xs md:text-sm mt-3 max-w-sm leading-relaxed drop-shadow-md">
            Interactive WebGL 3D model. Drag to spin the phone or pen.
          </p>
        </div>
      )}

    </div>
  );
}
