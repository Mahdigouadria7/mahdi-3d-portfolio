"use client";

import { useEffect, useRef, useState } from "react";
import { SamsungHeroApp, PEN_COLOR_PALETTES } from "./SamsungHeroApp";
import gsap from "gsap";

const BG_VIDEO_URL =
  "https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto/v1785715380/portfolio/samsung/videos/samsung_hero_bg";

export default function SamsungHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<SamsungHeroApp | null>(null);
  const canvasWrapRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [renderMode, setRenderMode] = useState<"phone" | "pen">("phone");
  const [selectedPhone, setSelectedPhone] = useState<"s25" | "zflip">("s25");
  const [isZFlipOpen, setIsZFlipOpen] = useState<boolean>(false);
  const [isPenActive, setIsPenActive] = useState<boolean>(false);
  const [activePaletteId, setActivePaletteId] = useState<string>("cyan-glow");
  const [brushSize, setBrushSize] = useState<number>(0.4);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  /* Detect mobile on mount */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Ensure background video is always playing continuously */
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  /* ─────────────────────────────────────────
     Three.js Engine Initialization & Sync
  ───────────────────────────────────────── */
  useEffect(() => {
    if (!canvasRef.current) return;

    const app = new SamsungHeroApp(canvasRef.current, (progress: number) => {
      setLoadProgress(Math.round(progress * 100));
      if (progress >= 1.0) {
        setTimeout(() => {
          setIsLoaded(true);
          gsap.fromTo(
            ".s-ui",
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 1.4, ease: "power3.out", stagger: 0.12 }
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

  /** Fade video background & 3D canvas out → change model/mode → fade back in */
  const withModelFade = (action: () => void) => {
    const canvasEl = canvasWrapRef.current;
    const videoEl = videoRef.current;

    if (!canvasEl && !videoEl) {
      action();
      return;
    }

    if (canvasEl) {
      gsap.to(canvasEl, { opacity: 0, duration: 0.35, ease: "power2.in" });
    }
    if (videoEl) {
      gsap.to(videoEl, { opacity: 0.15, duration: 0.35, ease: "power2.in" });
    }

    setTimeout(() => {
      action();
      if (canvasEl) {
        gsap.to(canvasEl, { opacity: 1, duration: 0.55, ease: "power2.out" });
      }
      if (videoEl) {
        gsap.to(videoEl, { opacity: 0.75, duration: 0.55, ease: "power2.out" });
      }
    }, 360);
  };

  const handleRenderModeChange = (mode: "phone" | "pen") => {
    withModelFade(() => {
      setRenderMode(mode);
      if (appRef.current) {
        appRef.current.setRenderMode(mode);
        // Default pen view is OFF (user must click ENABLE DRAWING)
        setIsPenActive(false);
        appRef.current.togglePenActive(false);
      }
    });
  };

  const handleSelectPhoneModel = (modelKey: "s25" | "zflip") => {
    withModelFade(() => {
      setSelectedPhone(modelKey);
      if (appRef.current) {
        appRef.current.setPhoneModel(modelKey);
      }
    });
  };

  const handleToggleZFlipFold = () => {
    const nextOpen = !isZFlipOpen;
    setIsZFlipOpen(nextOpen);
    if (appRef.current) {
      appRef.current.toggleZFlipFold(nextOpen);
    }
  };

  const handleTogglePenActive = () => {
    const newState = !isPenActive;
    setIsPenActive(newState);
    if (appRef.current) appRef.current.togglePenActive(newState);
  };

  const handleSelectPalette = (paletteId: string) => {
    setActivePaletteId(paletteId);
    if (appRef.current) appRef.current.setPenColorPalette(paletteId);
  };

  const handleBrushSizeChange = (newSize: number) => {
    setBrushSize(newSize);
    if (appRef.current) appRef.current.setBrushSize(newSize);
  };

  /* Dynamic Title based on selected model */
  const displayTitle =
    renderMode === "pen"
      ? "S‑Pen Studio"
      : selectedPhone === "zflip"
      ? "Galaxy Z Flip 6"
      : "Galaxy S25 Ultra";

  return (
    <div 
      className="relative w-full h-[100dvh] overflow-hidden select-none bg-[#0a0814]"
      style={{ overscrollBehaviorY: "contain", touchAction: "none" }}
    >
      {/* ── Looping Background Video ── */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        className="absolute inset-0 w-full h-full object-cover z-[0] pointer-events-none"
        style={{ opacity: 0.75 }}
      >
        <source src={`${BG_VIDEO_URL}.webm`} type="video/webm" />
        <source src={`${BG_VIDEO_URL}.mp4`} type="video/mp4" />
      </video>

      {/* ── Studio Atmosphere (framing vignette) ── */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(120, 80, 255, 0.08) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 30%, rgba(10, 8, 20, 0.94) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0a0814]/95 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0814]/60 to-transparent" />
      </div>

      {/* ── Three.js WebGL Canvas ── */}
      <div ref={canvasWrapRef} className="absolute inset-0 w-full h-full z-[2]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          style={{ touchAction: "none" }}
        />
      </div>

      {/* ── Liquid Glass Loading Experience ── */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0814]">
          <div className="text-white/80 text-xs tracking-[0.5em] uppercase font-sans mb-8 font-light">
            SAMSUNG
          </div>
          <div className="relative w-56 h-[3px] bg-white/10 overflow-hidden rounded-full p-[1px] border border-white/20 backdrop-blur-md">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-400 via-cyan-400 to-white transition-all duration-300 rounded-full shadow-[0_0_12px_rgba(168,85,247,0.8)]"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <div className="text-white/40 text-[9px] tracking-[0.3em] font-mono mt-4 uppercase">
            Rendering Engine {loadProgress}%
          </div>
        </div>
      )}

      {isLoaded && (
        <>
          {/* ─────────────────────────────────────────
              DESKTOP LAYOUT (> 768px)
          ───────────────────────────────────────── */}
          {!isMobile && (
            <>
              {/* Typography — bottom-left */}
              <div className="s-ui absolute z-[10] pointer-events-none bottom-14 left-14 max-w-xl">
                <div className="text-purple-300/80 text-[10px] tracking-[0.4em] font-mono font-medium uppercase mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_8px_#c084fc]" />
                  Interactive Showcase
                </div>
                <h1 className="font-sans font-light text-white text-6xl tracking-tight leading-none m-0 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                  {displayTitle}
                </h1>
                <p className="text-white/70 text-base font-light mt-3 tracking-wide drop-shadow max-w-md leading-relaxed">
                  Designed in Blender. Rendered real-time in WebGL.
                </p>
                <div className="flex gap-2.5 mt-6">
                  {["Three.js", "React", "GSAP", "WebGL"].map((t) => (
                    <span
                      key={t}
                      className="text-white/70 text-[9px] tracking-[0.25em] font-mono uppercase bg-white/[0.06] backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Liquid Glass Interactive Control Panel — right side */}
              <div className="s-ui absolute z-[60] pointer-events-auto top-1/2 right-12 -translate-y-1/2 flex flex-col items-end gap-5">
                <div
                  className="flex flex-col items-end gap-6 w-72 p-6 rounded-[28px]"
                  style={{
                    background: "rgba(18, 14, 32, 0.45)",
                    backdropFilter: "blur(30px) saturate(180%)",
                    WebkitBackdropFilter: "blur(30px) saturate(180%)",
                    border: "1px solid rgba(255, 255, 255, 0.18)",
                    boxShadow:
                      "inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.5), 0 24px 60px -12px rgba(0, 0, 0, 0.7), 0 0 35px 0 rgba(168, 85, 247, 0.12)",
                  }}
                >
                  {/* Mode Selector Tabs */}
                  <div className="w-full">
                    <label className="text-purple-200/60 text-[9px] tracking-[0.3em] font-mono font-medium uppercase mb-2.5 block text-right">
                      MODE SELECTOR
                    </label>
                    <div className="grid grid-cols-2 p-1.5 rounded-2xl bg-black/30 border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)]">
                      <button
                        onClick={() => handleRenderModeChange("phone")}
                        className={`py-2.5 text-[10px] font-mono tracking-[0.2em] font-semibold rounded-xl uppercase transition-all duration-300 ${
                          renderMode === "phone"
                            ? "bg-gradient-to-br from-white to-purple-100 text-[#0d091a] shadow-[0_4px_20px_rgba(255,255,255,0.3),inset_0_1px_1px_rgba(255,255,255,0.9)]"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        PHONE
                      </button>
                      <button
                        onClick={() => handleRenderModeChange("pen")}
                        className={`py-2.5 text-[10px] font-mono tracking-[0.2em] font-semibold rounded-xl uppercase transition-all duration-300 ${
                          renderMode === "pen"
                            ? "bg-gradient-to-br from-white to-purple-100 text-[#0d091a] shadow-[0_4px_20px_rgba(255,255,255,0.3),inset_0_1px_1px_rgba(255,255,255,0.9)]"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        S‑PEN
                      </button>
                    </div>
                  </div>

                  {/* Phone Model Selector */}
                  {renderMode === "phone" && (
                    <div className="w-full flex flex-col items-end gap-3 pt-3 border-t border-white/10">
                      <label className="text-purple-200/60 text-[9px] tracking-[0.3em] font-mono font-medium uppercase block text-right">
                        HARDWARE VARIANT
                      </label>
                      <div className="grid grid-cols-2 gap-2.5 w-full">
                        <button
                          onClick={() => handleSelectPhoneModel("s25")}
                          className={`py-2.5 px-2 text-[10px] font-mono tracking-[0.15em] uppercase rounded-xl border transition-all duration-300 ${
                            selectedPhone === "s25"
                              ? "bg-purple-500/25 border-purple-300/60 text-white shadow-[0_4px_20px_rgba(168,85,247,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] font-semibold"
                              : "bg-white/[0.04] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.08]"
                          }`}
                        >
                          S25 ULTRA
                        </button>
                        <button
                          onClick={() => handleSelectPhoneModel("zflip")}
                          className={`py-2.5 px-2 text-[10px] font-mono tracking-[0.15em] uppercase rounded-xl border transition-all duration-300 ${
                            selectedPhone === "zflip"
                              ? "bg-purple-500/25 border-purple-300/60 text-white shadow-[0_4px_20px_rgba(168,85,247,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] font-semibold"
                              : "bg-white/[0.04] border-white/10 text-white/60 hover:text-white hover:bg-white/[0.08]"
                          }`}
                        >
                          Z FLIP 6
                        </button>
                      </div>

                      {/* Z Flip 6 Fold / Unfold Action Button */}
                      {selectedPhone === "zflip" && (
                        <button
                          onClick={handleToggleZFlipFold}
                          className="w-full mt-2 py-3 px-4 text-white font-mono font-medium text-[10px] tracking-[0.25em] uppercase rounded-xl shadow-[0_8px_25px_rgba(168,85,247,0.35),inset_0_1px_1.5px_rgba(255,255,255,0.5)] active:scale-95 transition-all duration-300"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(168, 85, 247, 0.35) 0%, rgba(56, 189, 248, 0.25) 100%)",
                            border: "1px solid rgba(216, 180, 254, 0.5)",
                          }}
                        >
                          {isZFlipOpen ? "FOLD DEVICE" : "UNFOLD DEVICE"}
                        </button>
                      )}
                    </div>
                  )}

                  {/* S-Pen Studio Controls */}
                  {renderMode === "pen" && (
                    <div className="w-full flex flex-col items-end gap-4 pt-3 border-t border-white/10">
                      {/* Enable/Disable Draw Toggle */}
                      <button
                        onClick={handleTogglePenActive}
                        className={`w-full py-3 px-3 rounded-xl border text-[10px] font-mono tracking-[0.25em] uppercase transition-all duration-300 ${
                          isPenActive
                            ? "bg-emerald-500/20 border-emerald-400/60 text-emerald-200 shadow-[0_8px_20px_rgba(16,185,129,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]"
                            : "bg-white/[0.06] border-white/15 text-white/80 hover:bg-white/[0.12]"
                        }`}
                      >
                        {isPenActive ? "DRAWING ACTIVE" : "ENABLE DRAWING"}
                      </button>

                      {/* Ink Palette Swatches */}
                      {isPenActive && (
                        <div className="w-full flex flex-col items-end gap-2.5 mt-1">
                          <label className="text-purple-200/60 text-[9px] tracking-[0.3em] font-mono font-medium uppercase">
                            INK SPECTRUM
                          </label>
                          <div className="flex items-center gap-3">
                            {PEN_COLOR_PALETTES.map((pal) => (
                              <button
                                key={pal.id}
                                onClick={() => handleSelectPalette(pal.id)}
                                title={pal.name}
                                className={`w-5 h-5 rounded-full transition-all duration-300 ${
                                  activePaletteId === pal.id
                                    ? "ring-2 ring-white scale-125"
                                    : "opacity-65 hover:opacity-100 hover:scale-110"
                                }`}
                                style={{
                                  backgroundColor: pal.primaryColor,
                                  boxShadow:
                                    activePaletteId === pal.id
                                      ? `0 0 16px ${pal.primaryColor}, inset 0 1px 1px rgba(255,255,255,0.6)`
                                      : "none",
                                }}
                              />
                            ))}
                          </div>

                          {/* Brush Size Slider */}
                          <div className="w-full flex flex-col items-end gap-2 mt-3">
                            <div className="flex justify-between w-full text-[9px] text-white/70 font-mono tracking-[0.2em]">
                              <span>STROKE SIZE</span>
                              <span className="text-purple-300 font-bold">
                                {brushSize.toFixed(1)}X
                              </span>
                            </div>
                            <input
                              type="range"
                              min="0.3"
                              max="3.0"
                              step="0.1"
                              value={brushSize}
                              onChange={(e) =>
                                handleBrushSizeChange(parseFloat(e.target.value))
                              }
                              className="w-full h-1.5 accent-purple-400 bg-white/20 rounded-lg cursor-pointer"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Micro Drag Indicator */}
                {renderMode === "phone" && (
                  <div
                    className="px-4 py-2 rounded-full text-white/70 text-[9px] tracking-[0.3em] font-mono uppercase flex items-center gap-2.5"
                    style={{
                      background: "rgba(18, 14, 32, 0.45)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>DRAG TO ROTATE MODEL</span>
                  </div>
                )}
              </div>
            </>
          )}

          {/* ─────────────────────────────────────────
              MOBILE LAYOUT (≤ 768px)
          ───────────────────────────────────────── */}
          {isMobile && (
            <>
              {/* Top Collapsible Control Menu Pill Bar */}
              <div className="s-ui absolute z-[60] pointer-events-auto top-16 left-4 right-4 max-w-[340px] mx-auto flex flex-col items-center">
                {/* Collapsed Pill Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-full py-2.5 px-5 rounded-full flex items-center justify-between text-white font-mono text-[10px] tracking-[0.25em] uppercase transition-all duration-300 shadow-xl"
                  style={{
                    background: "rgba(18, 14, 32, 0.75)",
                    backdropFilter: "blur(24px)",
                    WebkitBackdropFilter: "blur(24px)",
                    border: "1.5px solid rgba(255, 255, 255, 0.2)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.4), 0 12px 30px rgba(0,0,0,0.6)",
                  }}
                >
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    {renderMode === "pen"
                      ? "S‑PEN STUDIO"
                      : selectedPhone === "zflip"
                      ? "Z FLIP 6"
                      : "S25 ULTRA"}
                  </span>
                  <span className={`transition-transform duration-300 text-cyan-300 font-bold ${isMobileMenuOpen ? "rotate-180" : "rotate-0"}`}>
                    ▼
                  </span>
                </button>

                {/* Sliding Accordion List Content */}
                <div
                  className={`w-full overflow-hidden transition-all duration-400 ease-out flex flex-col gap-2 mt-2 ${
                    isMobileMenuOpen
                      ? "max-h-64 opacity-100 pointer-events-auto"
                      : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <div
                    className="p-3 rounded-[24px] w-full flex flex-col gap-2.5"
                    style={{
                      background: "rgba(18, 14, 32, 0.85)",
                      backdropFilter: "blur(30px)",
                      WebkitBackdropFilter: "blur(30px)",
                      border: "1.5px solid rgba(56, 189, 248, 0.45)",
                      boxShadow: "inset 0 0 20px rgba(56,189,248,0.25), 0 20px 40px rgba(0,0,0,0.8)",
                    }}
                  >
                    {/* Mode Tabs */}
                    <div className="grid grid-cols-2 bg-black/50 p-1 rounded-xl border border-white/10">
                      <button
                        onClick={() => {
                          handleRenderModeChange("phone");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`py-2 text-[10px] font-mono tracking-[0.2em] font-bold rounded-lg uppercase transition-all ${
                          renderMode === "phone"
                            ? "bg-white text-[#0a0814] shadow-md"
                            : "text-white/60"
                        }`}
                      >
                        PHONE VIEW
                      </button>
                      <button
                        onClick={() => {
                          handleRenderModeChange("pen");
                          setIsMobileMenuOpen(false);
                        }}
                        className={`py-2 text-[10px] font-mono tracking-[0.2em] font-bold rounded-lg uppercase transition-all ${
                          renderMode === "pen"
                            ? "bg-white text-[#0a0814] shadow-md"
                            : "text-white/60"
                        }`}
                      >
                        S‑PEN STUDIO
                      </button>
                    </div>

                    {/* Sub Model Selector */}
                    {renderMode === "phone" && (
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() => {
                            handleSelectPhoneModel("s25");
                            setIsMobileMenuOpen(false);
                          }}
                          className={`py-2 text-[9px] font-mono tracking-[0.15em] rounded-lg border uppercase transition-all ${
                            selectedPhone === "s25"
                              ? "bg-purple-500/30 border-purple-300 text-white font-bold"
                              : "bg-white/5 border-white/10 text-white/60"
                          }`}
                        >
                          S25 ULTRA
                        </button>
                        <button
                          onClick={() => {
                            handleSelectPhoneModel("zflip");
                            setIsMobileMenuOpen(false);
                          }}
                          className={`py-2 text-[9px] font-mono tracking-[0.15em] rounded-lg border uppercase transition-all ${
                            selectedPhone === "zflip"
                              ? "bg-purple-500/30 border-purple-300 text-white font-bold"
                              : "bg-white/5 border-white/10 text-white/60"
                          }`}
                        >
                          Z FLIP 6
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom Drawer Bar (Product Info & Dynamic Controls) */}
              <div
                className="s-ui absolute z-[60] pointer-events-auto bottom-0 left-0 right-0 bg-gradient-to-t from-[#0a0814] via-[#0a0814]/90 to-transparent p-5 pt-8"
                style={{ paddingBottom: "env(safe-area-inset-bottom, 20px)" }}
              >
                <div className="flex flex-col gap-3">
                  <div>
                    <span className="text-purple-300/80 text-[9px] tracking-[0.3em] font-mono font-medium uppercase">
                      INTERACTIVE SHOWCASE
                    </span>
                    <h1 className="font-sans font-light text-white text-2xl tracking-tight">
                      {displayTitle}
                    </h1>
                  </div>

                  {/* Z Flip Fold Button */}
                  {renderMode === "phone" && selectedPhone === "zflip" && (
                    <button
                      onClick={handleToggleZFlipFold}
                      className="w-full py-3 text-white font-mono font-bold text-[10px] tracking-[0.25em] uppercase rounded-xl shadow-lg active:scale-95 transition-all"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(56, 189, 248, 0.3) 100%)",
                        border: "1px solid rgba(216, 180, 254, 0.5)",
                      }}
                    >
                      {isZFlipOpen ? "FOLD DEVICE" : "UNFOLD DEVICE"}
                    </button>
                  )}

                  {/* Pen Mode Controls */}
                  {renderMode === "pen" && (
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={handleTogglePenActive}
                        className={`w-full py-2.5 rounded-xl border text-[10px] font-mono tracking-[0.2em] font-bold uppercase transition-all ${
                          isPenActive
                            ? "bg-emerald-500/30 border-emerald-400 text-emerald-200"
                            : "bg-white/10 border-white/20 text-white"
                        }`}
                      >
                        {isPenActive ? "DRAWING ACTIVE" : "ENABLE DRAWING"}
                      </button>

                      {isPenActive && (
                        <div
                          className="flex flex-col gap-3 p-3.5 rounded-2xl border"
                          style={{
                            background: "rgba(18, 14, 32, 0.65)",
                            backdropFilter: "blur(24px)",
                            border: "1px solid rgba(255, 255, 255, 0.18)",
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-white/60 text-[9px] font-mono tracking-[0.2em]">
                              INK SPECTRUM
                            </span>
                            <div className="flex items-center gap-2.5">
                              {PEN_COLOR_PALETTES.map((pal) => (
                                <button
                                  key={pal.id}
                                  onClick={() => handleSelectPalette(pal.id)}
                                  className={`w-6 h-6 rounded-full transition-all ${
                                    activePaletteId === pal.id
                                      ? "ring-2 ring-white scale-110"
                                      : "opacity-75"
                                  }`}
                                  style={{ backgroundColor: pal.primaryColor }}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-white/60 text-[9px] font-mono tracking-[0.2em] whitespace-nowrap">
                              STROKE ({brushSize.toFixed(1)}X)
                            </span>
                            <input
                              type="range"
                              min="0.3"
                              max="3.0"
                              step="0.1"
                              value={brushSize}
                              onChange={(e) =>
                                handleBrushSizeChange(parseFloat(e.target.value))
                              }
                              className="flex-1 h-1.5 accent-purple-400 bg-white/20 rounded-lg"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
