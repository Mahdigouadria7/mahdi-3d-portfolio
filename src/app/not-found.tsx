"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // A subtle parallax effect on the 404 text based on mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20, // -10 to 10
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-[#050505]">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] h-[400px] bg-violet-600/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff05 1px, transparent 1px), linear-gradient(to bottom, #ffffff05 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="z-10 flex flex-col items-center text-center px-6">
        <h1 
          className="font-tech text-8xl md:text-[12rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 select-none drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-transform duration-200 ease-out"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}
        >
          404
        </h1>
        
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent my-8" />
        
        <h2 className="font-mono text-xl md:text-2xl tracking-[0.2em] text-white/80 uppercase mb-4">
          Signal Lost
        </h2>
        
        <p className="font-sans text-white/50 max-w-md mb-12">
          The coordinates you entered point to empty space. The render might have been moved or deleted.
        </p>

        <Link 
          href="/" 
          className="group relative px-8 py-4 bg-white/5 border border-white/10 rounded-sm overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-amber-500/50"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
          <span className="relative font-mono text-sm tracking-[0.2em] uppercase text-white group-hover:text-amber-100 transition-colors duration-500">
            Return to Base
          </span>
        </Link>
      </div>
    </main>
  );
}
