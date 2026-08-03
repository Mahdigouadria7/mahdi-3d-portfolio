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
  const [brushSize, setBrushSize] = useState<number>(1.0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

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
            { opacity: 0, y: 8 },
            { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.1 }
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
        if (mode === "pen") {
          setIsPenActive(true);
          appRef.current.togglePenActive(true);
        } else {
          setIsPenActive(false);
          appRef.current.togglePenActive(false);
        }
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
    <div className="relative w-full h-[100dvh] overflow-hidden select-none bg-[#0c0c0e]">
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
              "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(0,0,0,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 35%, rgba(0,0,0,0.92) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#0c0c0e]/95 to-transparent" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0c0c0e]/60 to-transparent" />
      </div>

      {/* ── Three.js WebGL Canvas ── */}
      <div ref={canvasWrapRef} className="absolute inset-0 w-full h-full z-[2]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
          style={{
            touchAction: isPenActive ? "none" : "pan-y",
          }}
        />
      </div>

      {/* ── Loading Experience ── */}
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0c0c0e]">
          <div className="text-white text-xs tracking-[0.5em] uppercase font-sans mb-8">
            Samsung
          </div>
          <div className="relative w-44 h-[2px] bg-white/10 overflow-hidden rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-cyan-400 transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <div className="text-white/50 text-[10px] tracking-[0.25em] font-mono mt-4 uppercase">
            Loading 3D Models... {loadProgress}%
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
              <div className="s-ui absolute z-[10] pointer-events-none bottom-12 left-12 max-w-xl">
                <div className="text-cyan-400 text-[10px] tracking-[0.35em] font-semibold uppercase mb-2">
                  Interactive 3D Experience
                </div>
                <h1 className="font-sans font-light text-white text-5xl md:text-6xl tracking-tight leading-none m-0 drop-shadow-md">
                  {displayTitle}
                </h1>
                <p className="text-white/70 text-sm md:text-base font-light mt-3 tracking-wide drop-shadow">
                  Designed in Blender. Rendered live with Three.js &amp; WebGL.
                </p>
                <div className="flex gap-3 mt-5">
                  {["Three.js", "React", "GSAP", "WebGL"].map((t) => (
                    <span
                      key={t}
                      className="text-white/60 text-[10px] tracking-[0.2em] font-mono uppercase bg-white/5 px-2.5 py-1 rounded-md border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* High-Contrast Interactive Control Panel — right side */}
              <div className="s-ui absolute z-[60] pointer-events-auto top-1/2 right-10 -translate-y-1/2 flex flex-col items-end gap-5">
                <div className="bg-black/75 backdrop-blur-2xl border border-white/20 p-5 rounded-2xl shadow-2xl flex flex-col items-end gap-5 w-64">
                  {/* Mode Selector Tabs */}
                  <div className="w-full">
                    <label className="text-white/50 text-[9px] tracking-[0.25em] font-semibold uppercase mb-2 block text-right">
                      EXPERIENCE MODE
                    </label>
                    <div className="grid grid-cols-2 bg-white/10 p-1 rounded-xl border border-white/10">
                      <button
                        onClick={() => handleRenderModeChange("phone")}
                        className={`py-2 text-xs font-semibold rounded-lg tracking-wider transition-all uppercase ${
                          renderMode === "phone"
                            ? "bg-white text-black shadow-md"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        📱 Phone
                      </button>
                      <button
                        onClick={() => handleRenderModeChange("pen")}
                        className={`py-2 text-xs font-semibold rounded-lg tracking-wider transition-all uppercase ${
                          renderMode === "pen"
                            ? "bg-white text-black shadow-md"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        ✏️ S‑Pen
                      </button>
                    </div>
                  </div>

                  {/* Phone Model Selector */}
                  {renderMode === "phone" && (
                    <div className="w-full flex flex-col items-end gap-2 pt-2 border-t border-white/10">
                      <label className="text-white/50 text-[9px] tracking-[0.25em] font-semibold uppercase block text-right">
                        CHOOSE MODEL
                      </label>
                      <div className="grid grid-cols-2 gap-2 w-full">
                        <button
                          onClick={() => handleSelectPhoneModel("s25")}
                          className={`py-2 px-2 text-[11px] font-medium rounded-xl border tracking-wide uppercase transition-all ${
                            selectedPhone === "s25"
                              ? "bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/20 font-semibold"
                              : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          S25 Ultra
                        </button>
                        <button
                          onClick={() => handleSelectPhoneModel("zflip")}
                          className={`py-2 px-2 text-[11px] font-medium rounded-xl border tracking-wide uppercase transition-all ${
                            selectedPhone === "zflip"
                              ? "bg-cyan-500/25 border-cyan-400 text-cyan-200 shadow-lg shadow-cyan-500/20 font-semibold"
                              : "bg-white/5 border-white/10 text-white/70 hover:text-white hover:bg-white/10"
                          }`}
                        >
                          Z Flip 6
                        </button>
                      </div>

                      {/* Z Flip 6 Fold / Unfold Action Button */}
                      {selectedPhone === "zflip" && (
                        <button
                          onClick={handleToggleZFlipFold}
                          className="w-full mt-2 py-2.5 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs tracking-widest uppercase rounded-xl shadow-lg shadow-cyan-500/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                        >
                          {isZFlipOpen ? "⟳ Fold Phone" : "⟲ Open Phone"}
                        </button>
                      )}
                    </div>
                  )}

                  {/* S-Pen Studio Controls */}
                  {renderMode === "pen" && (
                    <div className="w-full flex flex-col items-end gap-3 pt-2 border-t border-white/10">
                      {/* Enable/Disable Draw Toggle */}
                      <button
                        onClick={handleTogglePenActive}
                        className={`w-full py-2.5 px-3 rounded-xl border text-xs font-semibold tracking-wider uppercase transition-all ${
                          isPenActive
                            ? "bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/20"
                            : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                        }`}
                      >
                        {isPenActive ? "✍️ Drawing Active" : "✏️ Enable Draw"}
                      </button>

                      {/* Ink Palette Swatches */}
                      {isPenActive && (
                        <div className="w-full flex flex-col items-end gap-2 mt-1">
                          <label className="text-white/50 text-[9px] tracking-[0.2em] font-semibold uppercase">
                            INK COLOR
                          </label>
                          <div className="flex items-center gap-2.5">
                            {PEN_COLOR_PALETTES.map((pal) => (
                              <button
                                key={pal.id}
                                onClick={() => handleSelectPalette(pal.id)}
                                title={pal.name}
                                className={`w-5 h-5 rounded-full transition-all ${
                                  activePaletteId === pal.id
                                    ? "ring-2 ring-white scale-110 shadow-lg"
                                    : "opacity-75 hover:opacity-100 hover:scale-105"
                                }`}
                                style={{
                                  backgroundColor: pal.primaryColor,
                                  boxShadow:
                                    activePaletteId === pal.id
                                      ? `0 0 12px ${pal.primaryColor}`
                                      : "none",
                                }}
                              />
                            ))}
                          </div>

                          {/* Brush Size Slider */}
                          <div className="w-full flex flex-col items-end gap-1.5 mt-2">
                            <div className="flex justify-between w-full text-[10px] text-white/70 font-mono">
                              <span>BRUSH SIZE</span>
                              <span className="text-cyan-300 font-bold">
                                {brushSize.toFixed(1)}x
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
                              className="w-full h-1.5 accent-cyan-400 bg-white/20 rounded-lg cursor-pointer"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Drag to rotate hint badge */}
                {renderMode === "phone" && (
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-white/70 text-[10px] tracking-widest font-mono uppercase flex items-center gap-2">
                    <span>🖱️ Drag to rotate 3D model</span>
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
              {/* Top Mode & Model Selector Bar */}
              <div className="s-ui absolute z-[60] pointer-events-auto top-16 left-4 right-4 flex flex-col items-center gap-2">
                <div className="bg-black/85 backdrop-blur-2xl border border-white/20 p-2 rounded-2xl shadow-2xl w-full flex flex-col gap-2">
                  {/* Mode Tabs */}
                  <div className="grid grid-cols-2 bg-white/10 p-1 rounded-xl">
                    <button
                      onClick={() => handleRenderModeChange("phone")}
                      className={`py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${
                        renderMode === "phone"
                          ? "bg-white text-black shadow-md"
                          : "text-white/70"
                      }`}
                    >
                      📱 Phone View
                    </button>
                    <button
                      onClick={() => handleRenderModeChange("pen")}
                      className={`py-2 text-xs font-bold rounded-lg uppercase tracking-wider transition-all ${
                        renderMode === "pen"
                          ? "bg-white text-black shadow-md"
                          : "text-white/70"
                      }`}
                    >
                      ✏️ S‑Pen Studio
                    </button>
                  </div>

                  {/* Sub Model Selector */}
                  {renderMode === "phone" && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleSelectPhoneModel("s25")}
                        className={`py-2 text-xs font-semibold rounded-xl border uppercase tracking-wider transition-all ${
                          selectedPhone === "s25"
                            ? "bg-cyan-500/30 border-cyan-400 text-cyan-200"
                            : "bg-white/5 border-white/10 text-white/70"
                        }`}
                      >
                        S25 Ultra
                      </button>
                      <button
                        onClick={() => handleSelectPhoneModel("zflip")}
                        className={`py-2 text-xs font-semibold rounded-xl border uppercase tracking-wider transition-all ${
                          selectedPhone === "zflip"
                            ? "bg-cyan-500/30 border-cyan-400 text-cyan-200"
                            : "bg-white/5 border-white/10 text-white/70"
                        }`}
                      >
                        Z Flip 6
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Drawer Bar (Product Info & Dynamic Controls) */}
              <div
                className="s-ui absolute z-[60] pointer-events-auto bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-5 pt-8"
                style={{ paddingBottom: "env(safe-area-inset-bottom, 20px)" }}
              >
                <div className="flex flex-col gap-3">
                  <div>
                    <span className="text-cyan-400 text-[9px] tracking-[0.3em] font-semibold uppercase">
                      Interactive 3D
                    </span>
                    <h1 className="font-sans font-light text-white text-2xl tracking-tight">
                      {displayTitle}
                    </h1>
                  </div>

                  {/* Z Flip Fold Button */}
                  {renderMode === "phone" && selectedPhone === "zflip" && (
                    <button
                      onClick={handleToggleZFlipFold}
                      className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs tracking-widest uppercase rounded-xl shadow-lg shadow-cyan-500/30 active:scale-95 transition-all"
                    >
                      {isZFlipOpen ? "⟳ Fold Phone" : "⟲ Open Phone"}
                    </button>
                  )}

                  {/* Pen Mode Controls */}
                  {renderMode === "pen" && (
                    <div className="flex flex-col gap-3">
                      <button
                        onClick={handleTogglePenActive}
                        className={`w-full py-2.5 rounded-xl border text-xs font-bold tracking-wider uppercase transition-all ${
                          isPenActive
                            ? "bg-emerald-500/25 border-emerald-400 text-emerald-300"
                            : "bg-white/15 border-white/20 text-white"
                        }`}
                      >
                        {isPenActive ? "✍️ Drawing Active" : "✏️ Enable Drawing"}
                      </button>

                      {isPenActive && (
                        <div className="flex flex-col gap-3 bg-black/50 p-3 rounded-xl border border-white/10">
                          <div className="flex items-center justify-between">
                            <span className="text-white/60 text-[10px] font-mono">
                              INK COLOR
                            </span>
                            <div className="flex items-center gap-2">
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
                            <span className="text-white/60 text-[10px] font-mono whitespace-nowrap">
                              BRUSH ({brushSize.toFixed(1)}x)
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
                              className="flex-1 h-1.5 accent-cyan-400 bg-white/20 rounded-lg"
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
