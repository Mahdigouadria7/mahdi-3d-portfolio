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
  const [isPenActive, setIsPenActive] = useState<boolean>(false);
  const [activePaletteId, setActivePaletteId] = useState<string>("cyan-glow");
  const [isMobile, setIsMobile] = useState<boolean>(false);

  /* Detect mobile on mount */
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ─────────────────────────────────────────
     PRESERVED EXACTLY: all interaction logic
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
      if (mode === "pen") appRef.current.togglePenActive(isPenActive);
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

  /* ─────────────────────────────────────────
     Visual presentation
  ───────────────────────────────────────── */
  return (
    <div
      className="relative w-full h-[100dvh] overflow-hidden select-none"
      style={{ background: "#0c0c0e" }}
    >
      {/* ── Studio atmosphere ── */}
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

      {/* ── Three.js WebGL Canvas ──
          KEY FIX: When pen is active (drawing), touch-action: none prevents page
          scroll so touch strokes are captured. When not drawing, touch-pan-y allows
          the user to scroll the page normally on mobile.
      ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-[2] cursor-grab active:cursor-grabbing"
        style={{
          touchAction: isPenActive ? "none" : "pan-y",
        }}
      />

      {/* ── Loading experience ── */}
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
              Typography: bottom-left
              Controls: right side, vertically centered
          ───────────────────────────────────────── */}
          {!isMobile && (
            <>
              {/* Typography — bottom-left */}
              <div
                className="s-ui absolute z-[10] pointer-events-none"
                style={{ bottom: "52px", left: "52px", right: "220px" }}
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
                  Galaxy S25 Ultra
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

              {/* Mode controls — right side */}
              <div
                className="s-ui absolute z-[10] flex flex-col items-end"
                style={{
                  top: "50%",
                  right: "48px",
                  transform: "translateY(-50%)",
                  gap: "28px",
                }}
              >
                <div className="flex flex-col items-end" style={{ gap: "2px" }}>
                  <button
                    onClick={() => handleRenderModeChange("phone")}
                    style={{
                      color: renderMode === "phone" ? "#d4cfc9" : "#3a3836",
                      fontSize: "9px",
                      letterSpacing: "0.32em",
                      fontFamily: "system-ui",
                      fontWeight: 400,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "8px 0",
                      textTransform: "uppercase",
                      lineHeight: 1,
                      transition: "color 0.4s ease",
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
                      fontSize: "9px",
                      letterSpacing: "0.32em",
                      fontFamily: "system-ui",
                      fontWeight: 400,
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "8px 0",
                      textTransform: "uppercase",
                      lineHeight: 1,
                      transition: "color 0.4s ease",
                    }}
                  >
                    S‑Pen
                  </button>
                </div>

                {renderMode === "pen" && (
                  <div className="flex flex-col items-end" style={{ gap: "16px" }}>
                    <button
                      onClick={handleTogglePenActive}
                      style={{
                        color: isPenActive ? "#f2ede8" : "#5a5654",
                        fontSize: "9px",
                        letterSpacing: "0.32em",
                        fontFamily: "system-ui",
                        fontWeight: 400,
                        background: "none",
                        border: isPenActive ? "1px solid rgba(255,255,255,0.18)" : "1px solid transparent",
                        borderRadius: "2px",
                        cursor: "pointer",
                        padding: "6px 10px",
                        textTransform: "uppercase",
                        lineHeight: 1,
                        transition: "all 0.4s ease",
                      }}
                    >
                      {isPenActive ? "Drawing" : "Draw"}
                    </button>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        gap: "8px",
                        maxHeight: isPenActive ? "200px" : "0",
                        opacity: isPenActive ? 1 : 0,
                        overflow: "hidden",
                        transition: "max-height 0.5s ease, opacity 0.4s ease",
                      }}
                    >
                      <div style={{ color: "#3a3836", fontSize: "8px", letterSpacing: "0.28em", fontFamily: "system-ui", textTransform: "uppercase", marginBottom: "2px" }}>
                        Ink
                      </div>
                      {PEN_COLOR_PALETTES.map((pal) => (
                        <button
                          key={pal.id}
                          onClick={() => handleSelectPalette(pal.id)}
                          title={pal.name}
                          style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            border: activePaletteId === pal.id ? "1px solid rgba(255,255,255,0.65)" : "1px solid rgba(255,255,255,0.12)",
                            cursor: "pointer",
                            background: pal.primaryColor,
                            transition: "all 0.25s ease",
                            padding: 0,
                            outline: "none",
                            boxShadow: activePaletteId === pal.id ? "0 0 0 2px rgba(255,255,255,0.08)" : "none",
                            display: "block",
                          }}
                        />
                      ))}
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
              Model is centered in the canvas.
              Controls sit at the top (mode) and bottom (info + draw).
          ───────────────────────────────────────── */}
          {isMobile && (
            <>
              {/* Mode toggle — top center, compact */}
              <div
                className="s-ui absolute z-[10] top-0 left-0 right-0 flex justify-center"
                style={{ paddingTop: "env(safe-area-inset-top, 16px)", marginTop: "16px" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0",
                    background: "rgba(12,12,14,0.7)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  {(["phone", "pen"] as const).map((m, i) => (
                    <button
                      key={m}
                      onClick={() => handleRenderModeChange(m)}
                      style={{
                        color: renderMode === m ? "#f2ede8" : "#3a3836",
                        fontSize: "9px",
                        letterSpacing: "0.28em",
                        fontFamily: "system-ui",
                        fontWeight: 400,
                        background: renderMode === m ? "rgba(255,255,255,0.06)" : "transparent",
                        border: "none",
                        borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
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
              </div>

              {/* Bottom bar: product info + draw controls */}
              <div
                className="s-ui absolute z-[10] bottom-0 left-0 right-0"
                style={{
                  paddingBottom: "env(safe-area-inset-bottom, 20px)",
                  background: "linear-gradient(to top, rgba(12,12,14,0.95) 0%, rgba(12,12,14,0.6) 70%, transparent 100%)",
                }}
              >
                <div style={{ padding: "16px 24px 28px" }}>
                  {/* Product name */}
                  <div
                    style={{
                      color: "#5a5654",
                      fontSize: "8px",
                      letterSpacing: "0.35em",
                      fontFamily: "system-ui",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}
                  >
                    Interactive Product Experience
                  </div>
                  <h1
                    style={{
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontWeight: 300,
                      color: "#f2ede8",
                      fontSize: "1.9rem",
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                      margin: "0 0 4px",
                    }}
                  >
                    Galaxy S25 Ultra
                  </h1>
                  <div
                    style={{
                      color: "#6b6b6e",
                      fontSize: "0.8rem",
                      fontFamily: "system-ui",
                      fontWeight: 300,
                      marginBottom: renderMode === "pen" ? "16px" : "0",
                    }}
                  >
                    Designed in Blender. Rendered in realtime.
                  </div>

                  {/* S-Pen draw controls — only in pen mode */}
                  {renderMode === "pen" && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        flexWrap: "wrap",
                        marginTop: "4px",
                      }}
                    >
                      <button
                        onClick={handleTogglePenActive}
                        style={{
                          color: isPenActive ? "#f2ede8" : "#5a5654",
                          fontSize: "9px",
                          letterSpacing: "0.28em",
                          fontFamily: "system-ui",
                          fontWeight: 400,
                          background: isPenActive ? "rgba(255,255,255,0.06)" : "transparent",
                          border: isPenActive ? "1px solid rgba(255,255,255,0.18)" : "1px solid rgba(255,255,255,0.08)",
                          borderRadius: "3px",
                          cursor: "pointer",
                          padding: "8px 14px",
                          textTransform: "uppercase",
                          lineHeight: 1,
                          transition: "all 0.35s ease",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {isPenActive ? "Drawing" : "Draw"}
                      </button>

                      {/* Color swatches — horizontal row on mobile */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          maxWidth: isPenActive ? "240px" : "0",
                          opacity: isPenActive ? 1 : 0,
                          overflow: "hidden",
                          transition: "max-width 0.5s ease, opacity 0.4s ease",
                        }}
                      >
                        {PEN_COLOR_PALETTES.map((pal) => (
                          <button
                            key={pal.id}
                            onClick={() => handleSelectPalette(pal.id)}
                            title={pal.name}
                            style={{
                              width: "14px",
                              height: "14px",
                              borderRadius: "50%",
                              border: activePaletteId === pal.id ? "1px solid rgba(255,255,255,0.7)" : "1px solid rgba(255,255,255,0.15)",
                              cursor: "pointer",
                              background: pal.primaryColor,
                              transition: "all 0.2s ease",
                              padding: 0,
                              outline: "none",
                              flexShrink: 0,
                              boxShadow: activePaletteId === pal.id ? `0 0 6px ${pal.primaryColor}66` : "none",
                            }}
                          />
                        ))}
                      </div>
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
