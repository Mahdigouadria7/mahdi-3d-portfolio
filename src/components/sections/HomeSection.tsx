"use client";

import { useState } from "react";
import CVModal from "@/components/ui/CVModal";
import ScrambleText from "@/components/ui/ScrambleText";

interface HomeSectionProps {
    isDriving: boolean;
    onDriveStart: () => void;
}

/** Crosshair + marker — placed at grid intersections */
function Crosshair({ className = "" }: { className?: string }) {
    return (
        <div className={`absolute pointer-events-none select-none z-10 ${className}`}>
            <div className="relative w-4 h-4">
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/30 -translate-x-1/2" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/30 -translate-y-1/2" />
            </div>
        </div>
    );
}

/** Corner bracket decorator for panels */
function HUDCorners({ color = "white", size = 12, opacity = 0.5 }: { color?: string; size?: number; opacity?: number }) {
    const style = { borderColor: color, opacity } as React.CSSProperties;
    const px = `${size}px`;
    return (
        <>
            <span className="absolute top-0 left-0 pointer-events-none" style={{ ...style, width: px, height: px, borderTop: `1px solid`, borderLeft: `1px solid`, borderColor: color, opacity }} />
            <span className="absolute top-0 right-0 pointer-events-none" style={{ ...style, width: px, height: px, borderTop: `1px solid`, borderRight: `1px solid`, borderColor: color, opacity }} />
            <span className="absolute bottom-0 left-0 pointer-events-none" style={{ ...style, width: px, height: px, borderBottom: `1px solid`, borderLeft: `1px solid`, borderColor: color, opacity }} />
            <span className="absolute bottom-0 right-0 pointer-events-none" style={{ ...style, width: px, height: px, borderBottom: `1px solid`, borderRight: `1px solid`, borderColor: color, opacity }} />
        </>
    );
}

export default function HomeSection({ isDriving, onDriveStart }: HomeSectionProps) {
    const [isCVOpen, setIsCVOpen] = useState(false);

    return (
        <section className={`relative w-full h-screen pointer-events-none transition-opacity duration-1000 ${isDriving ? 'opacity-0' : 'opacity-100'}`}>

            {/* ── Background: Dashed Grid Columns ─────────────────── */}
            <div className="absolute inset-0 grid grid-cols-4 pointer-events-none z-0">
                <div className="border-r border-dashed border-white/10 h-full w-full" />
                <div className="border-r border-dashed border-white/10 h-full w-full" />
                <div className="border-r border-dashed border-white/10 h-full w-full" />
                <div className="h-full w-full" />
            </div>

            {/* ── Crosshair Markers at Grid Intersections ──────────── */}
            <Crosshair className="top-[25%] left-[25%] -translate-x-1/2 -translate-y-1/2" />
            <Crosshair className="top-[25%] left-[50%] -translate-x-1/2 -translate-y-1/2" />
            <Crosshair className="top-[25%] left-[75%] -translate-x-1/2 -translate-y-1/2" />
            <Crosshair className="top-[75%] left-[25%] -translate-x-1/2 -translate-y-1/2" />
            <Crosshair className="top-[75%] left-[50%] -translate-x-1/2 -translate-y-1/2" />
            <Crosshair className="top-[75%] left-[75%] -translate-x-1/2 -translate-y-1/2" />
            <Crosshair className="top-[50%] left-[75%] -translate-x-1/2 -translate-y-1/2" />
            <Crosshair className="top-[50%] left-[25%] -translate-x-1/2 -translate-y-1/2" />

            {/* ── Scanline (very subtle moving line) ───────────────── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="animate-scanline w-full h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500/10 to-transparent" />
            </div>

            {/* ── Far Left: Numbered Vertical Sidebar ──────────────── */}
            <div className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-20 pointer-events-none flex flex-col gap-3 hidden md:flex">
                {["01","02","03","04","05","06"].map((n, i) => (
                    <span
                        key={n}
                        className={`font-mono text-[10px] tracking-widest transition-all duration-300 ${i === 0 ? 'text-fuchsia-400 font-bold' : 'text-white/25'}`}
                    >
                        {n}
                    </span>
                ))}
            </div>

            {/* ── Code Snippet (Top Right) ──────────────────────────── */}
            <div className="absolute top-[18%] right-[5%] z-10 text-[8px] md:text-[9px] text-white/25 font-mono leading-relaxed select-none hidden md:block">
                <div className="relative border border-white/10 p-3">
                    <HUDCorners color="rgba(217,70,239,0.4)" size={8} opacity={1} />
                    <span className="text-fuchsia-400/60 block mb-1">// MODEL INIT</span>
                    <pre>{`matrix float[4][4];
context<r> = render();
scale(x) => x * 2;
M[0]=1; M[5]=1;
M[10]=1; M[15]=1;`}</pre>
                </div>
            </div>

            {/* ── Technical ID Label (Top Left area) ───────────────── */}
            <div className="absolute top-20 left-6 md:left-14 z-20 pointer-events-none hidden md:block">
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[9px] text-white/20 tracking-widest uppercase">ID: MG-3D-2077</span>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-px bg-white/20" />
                        <span className="font-mono text-[9px] text-fuchsia-400/50 tracking-widest">ACTIVE</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* ── Diagonal Hatch Accent (Bottom Left Corner) ───────── */}
            <div className="absolute bottom-28 left-6 md:left-14 z-10 pointer-events-none hidden md:block">
                <div className="w-20 h-8 hatch-bg border border-white/10" />
            </div>

            {/* ── Main Content Overlay ──────────────────────────────── */}
            <div className="absolute inset-0 z-10 flex flex-col pointer-events-none">
                <div className="flex-1 relative">

                    {/* Left Typography Block */}
                    <div className="absolute left-6 md:left-14 top-[15%] md:top-[65%] -translate-y-1/2 max-w-[200px] text-white pointer-events-auto">
                        <div className="relative border-l-2 border-fuchsia-500/60 pl-3">
                            <p className="text-xs md:text-sm font-cyber leading-relaxed tracking-wide text-white/70">
                                <span className="text-xl md:text-3xl font-black text-white pr-1 font-siegra">W</span>
                                here creativity meets engineering and imagination builds reality.
                            </p>
                        </div>
                    </div>

                    {/* ── Central Typography ───────────────────────────── */}
                    <div className="absolute top-[45%] md:top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center text-center pointer-events-none mix-blend-difference px-4">
                        <h1 className="text-[12vw] md:text-[6vw] font-black tracking-[0.1em] text-white leading-none font-siegra drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] animate-glow pointer-events-auto cursor-default">
                            <ScrambleText text="MAHDI" /> <ScrambleText text="GOUADRIA" />
                        </h1>

                        {/* HUD-Style Subtitle (SHARP — no pill) */}
                        <div className="relative mt-4 px-4 md:px-6 py-2 border border-white/20 bg-black/50">
                            <HUDCorners color="rgba(217,70,239,0.6)" size={6} opacity={1} />
                            <p className="text-[8px] md:text-xs font-mono tracking-[0.1em] md:tracking-[0.4em] text-white/80 uppercase whitespace-nowrap">
                                [ Software Engineer &amp; 3D Generalist ]
                            </p>
                        </div>
                    </div>

                    {/* ── EXPLORE Button (keep float animation, make it HUD-style) ── */}
                    <div className="absolute bottom-[8%] md:bottom-0 left-1/2 -translate-x-1/2 pointer-events-auto pb-8">
                        <div className="animate-float">
                            {/* Outer crosshair frame */}
                            <div className="relative">
                                {/* Crosshair arms extending outward */}
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-fuchsia-400/40" />
                                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-px h-3 bg-fuchsia-400/40" />
                                <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-px w-3 bg-fuchsia-400/40" />
                                <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-px w-3 bg-fuchsia-400/40" />

                                <button
                                    onClick={() => setIsCVOpen(true)}
                                    className="relative w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/[0.06] border border-white/20 flex flex-col items-center justify-center group transition-all duration-500 hover:-translate-y-4 hover:scale-110 animate-full-glow hover:border-fuchsia-400/60 hover:bg-fuchsia-900/10 cursor-pointer"
                                >
                                    {/* Inner ripples — keep original */}
                                    <div className="absolute inset-0 rounded-full border border-white/30 scale-75 transition-transform duration-500 group-hover:scale-100" />
                                    <div className="absolute inset-0 rounded-full bg-fuchsia-500/5 scale-50 transition-transform duration-500 group-hover:scale-125 opacity-0 group-hover:opacity-100" />
                                    <span className="text-white font-mono font-bold text-sm md:text-base leading-tight text-center z-10 tracking-widest group-hover:text-fuchsia-300 transition-colors">
                                        <ScrambleText text="VIEW CV" />
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* ── Right: Scroll Indicator (HUD style) ──────────── */}
                    <div className="absolute right-6 md:right-14 top-[45%] -translate-y-1/2 flex flex-col items-center gap-3 pointer-events-auto text-white">
                        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/40" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40" style={{ writingMode: 'vertical-rl' }}>
                            SCROLL
                        </span>
                        <div className="animate-bounce">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-white/40">
                                <path d="M12 5v14M5 12l7 7 7-7" />
                            </svg>
                        </div>
                        <div className="w-px h-12 bg-gradient-to-t from-transparent to-white/10" />
                    </div>

                </div>

                {/* ── Bottom Bar ────────────────────────────────────── */}
                <div className="h-28 w-full relative px-4 md:px-14 pointer-events-none">

                    {/* Bottom SCROLL label (center) */}
                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-4 pointer-events-none">
                        <div className="w-12 h-px bg-white/20" />
                        <span className="font-mono text-[9px] tracking-[0.4em] text-white/30 uppercase">SCROLL</span>
                        <div className="w-12 h-px bg-white/20" />
                    </div>

                    {/* Socials — flat square HUD buttons */}
                    <div className="absolute bottom-5 left-4 md:left-14 flex items-center gap-1 pointer-events-auto">
                        {[
                            { label: "BEHANCE", href: "#" },
                            { label: "LINKEDIN", href: "#" },
                            { label: "INSTAGRAM", href: "#" },
                            { label: "X", href: "#" },
                        ].map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                className="px-2 py-1 font-mono text-[9px] tracking-widest text-white/30 uppercase border border-white/10 hover:text-fuchsia-400 hover:border-fuchsia-400/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fuchsia-400"
                            >
                                {label}
                            </a>
                        ))}
                    </div>

                    {/* System version tag (bottom right) */}
                    <div className="absolute bottom-5 right-4 md:right-14 pointer-events-none">
                        <span className="font-mono text-[9px] text-white/20 tracking-widest">SYS v2.0.77</span>
                    </div>
                </div>

            </div>

            <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
        </section>
    );
}
