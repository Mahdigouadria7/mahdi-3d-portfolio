"use client";

import { useEffect, useRef, useState } from "react";
import { SamsungHeroApp, PEN_COLOR_PALETTES } from "./SamsungHeroApp";
import gsap from "gsap";

export default function SamsungHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const appRef = useRef<SamsungHeroApp | null>(null);
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
            { opacity: 1, y: 0, duration: 1.6, ease: "power3.out", stagger: 0.15 }
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

  const handleRenderModeChange = (mode: "phone" | "pen") => {
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
  };

  const handleSelectPhoneModel = (modelKey: "s25" | "zflip") => {
    setSelectedPhone(modelKey);
    if (appRef.current) {
      appRef.current.setPhoneModel(modelKey);
    }
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
  const displayTitle = renderMode === "pen" 
    ? "S‑Pen Presentation" 
    : selectedPhone === "zflip" 
      ? "Galaxy Z Flip 6" 
      : "Galaxy S25 Ultra";

  /* ─────────────────────────────────────────
     Visual Presentation
  ───────────────────────────────────────── */
  return (
    <div
      className="relative w-full h-[100dvh] overflow-hidden select-none"
      style={{ background: "#0c0c0e" }}
    >
      {/* ── Studio Atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 65% 50% at 50% 45%, rgba(30,26,22,0.5) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 110% 110% at 50% 50%, transparent 38%, rgba(0,0,0,0.88) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-64"
          style={{
            background: "linear-gradient(to top, rgba(12,12,14,0.97) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Three.js WebGL Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[2] cursor-grab active:cursor-grabbing"
        style={{
          touchAction: isPenActive ? "none" : "pan-y",
        }}
      />

      {/* ── Loading Experience ── */}
      {!isLoaded && (
        <div
          className="absolute inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: "#0c0c0e" }}
        >
          <div
            style={{
              color: "#f2ede8",
              fontSize: "11px",
              letterSpacing: "0.5em",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontWeight: 400,
              marginBottom: "48px",
              textTransform: "uppercase",
            }}
          >
            Samsung
          </div>

          <div
            className="relative overflow-hidden"
            style={{
              width: "180px",
              height: "1px",
              background: "rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="absolute top-0 left-0 h-full"
              style={{
                width: `${loadProgress}%`,
                background: "#d4cfc9",
                transition: "width 0.4s ease",
              }}
            />
          </div>

          <div
            style={{
              color: "#3a3836",
              fontSize: "9px",
              letterSpacing: "0.25em",
              fontFamily: "system-ui",
              marginTop: "16px",
              textTransform: "uppercase",
            }}
          >
            {loadProgress}%
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
              <div
                className="s-ui absolute z-[10] pointer-events-none"
                style={{ bottom: "52px", left: "52px", right: "300px" }}
              >
                <div
                  style={{
                    color: "#5a5654",
                    fontSize: "9px",
                    letterSpacing: "0.38em",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontWeight: 400,
                    marginBottom: "14px",
                    textTransform: "uppercase",
                  }}
                >
                  Interactive Product Experience
                </div>

                <h1
                  style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontWeight: 300,
                    color: "#f2ede8",
                    fontSize: "clamp(2.6rem, 5.2vw, 5.8rem)",
                    lineHeight: 1.0,
                    letterSpacing: "-0.028em",
                    margin: 0,
                  }}
                >
                  {displayTitle}
                </h1>

                <div
                  style={{
                    color: "#9a9490",
                    fontSize: "clamp(1.1rem, 1.8vw, 1.6rem)",
                    fontFamily: "system-ui",
                    fontWeight: 300,
                    marginTop: "8px",
                    letterSpacing: "-0.01em",
                    lineHeight: 1,
                  }}
                >
                  Designed in Blender. Rendered in realtime.
                </div>

                <div style={{ display: "flex", gap: "0", marginTop: "24px", flexWrap: "wrap" }}>
                  {["Three.js", "React", "GSAP", "WebGL"].map((t, i, arr) => (
                    <span
                      key={t}
                      style={{
                        color: "#3a3836",
                        fontSize: "9px",
                        letterSpacing: "0.25em",
                        fontFamily: "system-ui",
                        textTransform: "uppercase",
                        paddingRight: i < arr.length - 1 ? "14px" : "0",
                        marginRight: i < arr.length - 1 ? "14px" : "0",
                        borderRight: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                        lineHeight: 2,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mode & Phone Model controls — right side */}
              <div
                className="s-ui absolute z-[60] pointer-events-auto flex flex-col items-end"
                style={{
                  top: "50%",
                  right: "48px",
                  transform: "translateY(-50%)",
                  gap: "24px",
                }}
              >
                {/* Main Mode toggle */}
                <div className="flex flex-col items-end pointer-events-auto" style={{ gap: "2px" }}>
                  <button
                    onClick={() => handleRenderModeChange("phone")}
                    style={{
                      color: renderMode === "phone" ? "#d4cfc9" : "#3a3836",
                      fontSize: "10px",
                      letterSpacing: "0.32em",
                      fontFamily: "system-ui",
                      fontWeight: renderMode === "phone" ? 600 : 400,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "8px 0",
                      textTransform: "uppercase",
                      lineHeight: 1,
                      transition: "color 0.3s ease",
                    }}
                  >
                    Phone
                  </button>
                  <div
                    style={{
                      width: "16px",
                      height: "1px",
                      background: "rgba(255,255,255,0.08)",
                      marginLeft: "auto",
                      marginRight: "1px",
                    }}
                  />
                  <button
                    onClick={() => handleRenderModeChange("pen")}
                    style={{
                      color: renderMode === "pen" ? "#d4cfc9" : "#3a3836",
                      fontSize: "10px",
                      letterSpacing: "0.32em",
                      fontFamily: "system-ui",
                      fontWeight: renderMode === "pen" ? 600 : 400,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "8px 0",
                      textTransform: "uppercase",
                      lineHeight: 1,
                      transition: "color 0.3s ease",
                    }}
                  >
                    S‑Pen
                  </button>
                </div>

                {/* Sub-options for Phone Selection (S25 Ultra vs Z Flip 6) */}
                {renderMode === "phone" && (
                  <div className="flex flex-col items-end pointer-events-auto" style={{ gap: "8px", marginTop: "4px" }}>
                    <div style={{ color: "#3a3836", fontSize: "8px", letterSpacing: "0.28em", fontFamily: "system-ui", textTransform: "uppercase" }}>
                      Model Choice
                    </div>

                    <button
                      onClick={() => handleSelectPhoneModel("s25")}
                      style={{
                        color: selectedPhone === "s25" ? "#f2ede8" : "#5a5654",
                        fontSize: "9px",
                        letterSpacing: "0.25em",
                        fontFamily: "system-ui",
                        fontWeight: selectedPhone === "s25" ? 600 : 400,
                        textTransform: "uppercase",
                        background: selectedPhone === "s25" ? "rgba(255,255,255,0.08)" : "transparent",
                        border: selectedPhone === "s25" ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.05)",
                        borderRadius: "3px",
                        padding: "6px 10px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        width: "115px",
                        textAlign: "right",
                      }}
                    >
                      S25 Ultra
                    </button>

                    <button
                      onClick={() => handleSelectPhoneModel("zflip")}
                      style={{
                        color: selectedPhone === "zflip" ? "#f2ede8" : "#5a5654",
                        fontSize: "9px",
                        letterSpacing: "0.25em",
                        fontFamily: "system-ui",
                        fontWeight: selectedPhone === "zflip" ? 600 : 400,
                        textTransform: "uppercase",
                        background: selectedPhone === "zflip" ? "rgba(255,255,255,0.08)" : "transparent",
                        border: selectedPhone === "zflip" ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(255,255,255,0.05)",
                        borderRadius: "3px",
                        padding: "6px 10px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        width: "115px",
                        textAlign: "right",
                      }}
                    >
                      Z Flip 6
                    </button>

                    {/* Interactive Fold / Unfold Action Hint for Z Flip 6 */}
                    {selectedPhone === "zflip" && (
                      <button
                        onClick={handleToggleZFlipFold}
                        style={{
                          marginTop: "8px",
                          color: "#38bdf8",
                          fontSize: "9px",
                          letterSpacing: "0.25em",
                          fontFamily: "system-ui",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          background: "rgba(56,189,248,0.12)",
                          border: "1px solid rgba(56,189,248,0.35)",
                          borderRadius: "4px",
                          padding: "8px 12px",
                          cursor: "pointer",
                          transition: "all 0.3s ease",
                          boxShadow: "0 0 16px rgba(56,189,248,0.25)",
                        }}
                      >
                        {isZFlipOpen ? "⟳ Fold Phone" : "⟲ Open Phone"}
                      </button>
                    )}
                  </div>
                )}

                {/* S-Pen specific controls */}
                {renderMode === "pen" && (
                  <div className="flex flex-col items-end pointer-events-auto" style={{ gap: "16px" }}>
                    <button
                      onClick={handleTogglePenActive}
                      style={{
                        color: isPenActive ? "#f2ede8" : "#5a5654",
                        fontSize: "9px",
                        letterSpacing: "0.32em",
                        fontFamily: "system-ui",
                        fontWeight: 500,
                        background: isPenActive ? "rgba(255,255,255,0.08)" : "transparent",
                        border: isPenActive ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "3px",
                        cursor: "pointer",
                        padding: "8px 12px",
                        textTransform: "uppercase",
                        lineHeight: 1,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {isPenActive ? "Drawing Active" : "Enable Draw"}
                    </button>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "8px",
                        maxHeight: isPenActive ? "300px" : "0",
                        opacity: isPenActive ? 1 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.4s ease, opacity 0.3s ease",
                      }}
                    >
                      <div style={{ color: "#3a3836", fontSize: "8px", letterSpacing: "0.28em", fontFamily: "system-ui", textTransform: "uppercase", marginBottom: "2px" }}>
                        Ink Color
                      </div>
                      {PEN_COLOR_PALETTES.map((pal) => (
                        <button
                          key={pal.id}
                          onClick={() => handleSelectPalette(pal.id)}
                          title={pal.name}
                          style={{
                            width: "14px",
                            height: "14px",
                            borderRadius: "50%",
                            border: activePaletteId === pal.id ? "1px solid rgba(255,255,255,0.8)" : "1px solid rgba(255,255,255,0.15)",
                            cursor: "pointer",
                            background: pal.primaryColor,
                            transition: "all 0.2s ease",
                            padding: 0,
                            outline: "none",
                            boxShadow: activePaletteId === pal.id ? `0 0 8px ${pal.primaryColor}88` : "none",
                            display: "block",
                          }}
                        />
                      ))}

                      {/* Brush Size Slider (Desktop) */}
                      <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "6px" }}>
                        <div style={{ color: "#3a3836", fontSize: "8px", letterSpacing: "0.28em", fontFamily: "system-ui", textTransform: "uppercase" }}>
                          Brush Size ({brushSize.toFixed(1)}x)
                        </div>
                        <input
                          type="range"
                          min="0.3"
                          max="3.0"
                          step="0.1"
                          value={brushSize}
                          onChange={(e) => handleBrushSizeChange(parseFloat(e.target.value))}
                          style={{
                            width: "80px",
                            height: "3px",
                            accentColor: "#d4cfc9",
                            cursor: "pointer",
                            background: "rgba(255,255,255,0.1)",
                            borderRadius: "2px",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rotate hint — bottom right */}
              {renderMode === "phone" && (
                <div
                  className="s-ui absolute z-[10] pointer-events-none"
                  style={{ bottom: "52px", right: "48px" }}
                >
                  <div
                    style={{
                      color: "#3a3836",
                      fontSize: "8px",
                      letterSpacing: "0.28em",
                      fontFamily: "system-ui",
                      textTransform: "uppercase",
                      writingMode: "vertical-rl",
                      lineHeight: 1,
                    }}
                  >
                    Drag · Rotate
                  </div>
                </div>
              )}
            </>
          )}

          {/* ─────────────────────────────────────────
              MOBILE LAYOUT (≤ 768px)
          ───────────────────────────────────────── */}
          {isMobile && (
            <>
              {/* Mode & Sub-Model Toggle — Top Center */}
              <div
                className="s-ui absolute z-[60] pointer-events-auto top-16 left-0 right-0 flex flex-col items-center gap-2"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0",
                    background: "rgba(12,12,14,0.85)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: "6px",
                    overflow: "hidden",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                  }}
                >
                  {(["phone", "pen"] as const).map((m, i) => (
                    <button
                      key={m}
                      onClick={() => handleRenderModeChange(m)}
                      style={{
                        color: renderMode === m ? "#f2ede8" : "#5a5654",
                        fontSize: "10px",
                        letterSpacing: "0.28em",
                        fontFamily: "system-ui",
                        fontWeight: renderMode === m ? 600 : 400,
                        background: renderMode === m ? "rgba(255,255,255,0.1)" : "transparent",
                        border: "none",
                        borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none",
                        cursor: "pointer",
                        padding: "10px 18px",
                        textTransform: "uppercase",
                        lineHeight: 1,
                        transition: "all 0.3s ease",
                      }}
                    >
                      {m === "pen" ? "S‑Pen" : "Phone"}
                    </button>
                  ))}
                </div>

                {/* Sub Phone Selector on Mobile */}
                {renderMode === "phone" && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "rgba(12,12,14,0.75)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: "20px",
                      padding: "3px 6px",
                    }}
                  >
                    <button
                      onClick={() => handleSelectPhoneModel("s25")}
                      style={{
                        color: selectedPhone === "s25" ? "#f2ede8" : "#5a5654",
                        fontSize: "8px",
                        letterSpacing: "0.2em",
                        fontFamily: "system-ui",
                        fontWeight: selectedPhone === "s25" ? 600 : 400,
                        background: selectedPhone === "s25" ? "rgba(255,255,255,0.12)" : "transparent",
                        border: "none",
                        borderRadius: "14px",
                        padding: "4px 10px",
                        cursor: "pointer",
                        textTransform: "uppercase",
                      }}
                    >
                      S25 Ultra
                    </button>
                    <button
                      onClick={() => handleSelectPhoneModel("zflip")}
                      style={{
                        color: selectedPhone === "zflip" ? "#f2ede8" : "#5a5654",
                        fontSize: "8px",
                        letterSpacing: "0.2em",
                        fontFamily: "system-ui",
                        fontWeight: selectedPhone === "zflip" ? 600 : 400,
                        background: selectedPhone === "zflip" ? "rgba(255,255,255,0.12)" : "transparent",
                        border: "none",
                        borderRadius: "14px",
                        padding: "4px 10px",
                        cursor: "pointer",
                        textTransform: "uppercase",
                      }}
                    >
                      Z Flip 6
                    </button>
                  </div>
                )}
              </div>

              {/* Bottom bar: product info + draw/fold controls */}
              <div
                className="s-ui absolute z-[60] pointer-events-auto bottom-0 left-0 right-0"
                style={{
                  paddingBottom: "env(safe-area-inset-bottom, 20px)",
                  background: "linear-gradient(to top, rgba(12,12,14,0.98) 0%, rgba(12,12,14,0.75) 75%, transparent 100%)",
                }}
              >
                <div style={{ padding: "16px 24px 24px" }}>
                  {/* Product name */}
                  <div
                    style={{
                      color: "#5a5654",
                      fontSize: "8px",
                      letterSpacing: "0.35em",
                      fontFamily: "system-ui",
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    Interactive Product Experience
                  </div>
                  <h1
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: 300,
                      color: "#f2ede8",
                      fontSize: "1.75rem",
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                      margin: "0 0 4px",
                    }}
                  >
                    {displayTitle}
                  </h1>
                  <div
                    style={{
                      color: "#6b6b6e",
                      fontSize: "0.78rem",
                      fontFamily: "system-ui",
                      fontWeight: 300,
                      marginBottom: (renderMode === "pen" || selectedPhone === "zflip") ? "14px" : "0",
                    }}
                  >
                    Designed in Blender. Rendered in realtime.
                  </div>

                  {/* Z Flip 6 fold action button on Mobile */}
                  {renderMode === "phone" && selectedPhone === "zflip" && (
                    <button
                      onClick={handleToggleZFlipFold}
                      style={{
                        marginTop: "6px",
                        color: "#38bdf8",
                        fontSize: "9px",
                        letterSpacing: "0.25em",
                        fontFamily: "system-ui",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        background: "rgba(56,189,248,0.12)",
                        border: "1px solid rgba(56,189,248,0.35)",
                        borderRadius: "4px",
                        padding: "10px 16px",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0 0 16px rgba(56,189,248,0.25)",
                        width: "100%",
                      }}
                    >
                      {isZFlipOpen ? "⟳ Fold Phone" : "⟲ Open Phone"}
                    </button>
                  )}

                  {/* S-Pen draw controls — only in pen mode */}
                  {renderMode === "pen" && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        marginTop: "8px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          flexWrap: "wrap",
                        }}
                      >
                        <button
                          onClick={handleTogglePenActive}
                          style={{
                            color: isPenActive ? "#f2ede8" : "#5a5654",
                            fontSize: "9px",
                            letterSpacing: "0.28em",
                            fontFamily: "system-ui",
                            fontWeight: 500,
                            background: isPenActive ? "rgba(255,255,255,0.12)" : "transparent",
                            border: isPenActive ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "4px",
                            cursor: "pointer",
                            padding: "10px 16px",
                            textTransform: "uppercase",
                            lineHeight: 1,
                            transition: "all 0.3s ease",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {isPenActive ? "Drawing Active" : "Enable Draw"}
                        </button>

                        {/* Color swatches */}
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            maxWidth: isPenActive ? "260px" : "0",
                            opacity: isPenActive ? 1 : 0,
                            overflow: "hidden",
                            transition: "max-width 0.4s ease, opacity 0.3s ease",
                          }}
                        >
                          {PEN_COLOR_PALETTES.map((pal) => (
                            <button
                              key={pal.id}
                              onClick={() => handleSelectPalette(pal.id)}
                              title={pal.name}
                              style={{
                                width: "18px",
                                height: "18px",
                                borderRadius: "50%",
                                border: activePaletteId === pal.id ? "2px solid rgba(255,255,255,0.9)" : "1px solid rgba(255,255,255,0.2)",
                                cursor: "pointer",
                                background: pal.primaryColor,
                                transition: "all 0.2s ease",
                                padding: 0,
                                outline: "none",
                                flexShrink: 0,
                                boxShadow: activePaletteId === pal.id ? `0 0 8px ${pal.primaryColor}88` : "none",
                              }}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Brush Size Slider (Mobile) */}
                      {isPenActive && (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "12px",
                            paddingTop: "4px",
                          }}
                        >
                          <span style={{ color: "#5a5654", fontSize: "8px", letterSpacing: "0.25em", fontFamily: "system-ui", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                            Brush ({brushSize.toFixed(1)}x)
                          </span>
                          <input
                            type="range"
                            min="0.3"
                            max="3.0"
                            step="0.1"
                            value={brushSize}
                            onChange={(e) => handleBrushSizeChange(parseFloat(e.target.value))}
                            style={{
                              flex: 1,
                              height: "4px",
                              accentColor: "#d4cfc9",
                              cursor: "pointer",
                              background: "rgba(255,255,255,0.12)",
                              borderRadius: "2px",
                            }}
                          />
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
