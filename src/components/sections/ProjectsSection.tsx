"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

function ProjectCard({ project, i }: { project: (typeof projects)[0]; i: number }) {
    const [stackedMedia, setStackedMedia] = useState<{ type: 'image' | 'video'; url: string; alt: string }[]>([]);

    useEffect(() => {
        const videos = project.media.filter((m) => m.type === 'video');
        const images = project.media.filter((m) => m.type === 'image');
        const pool = [...videos, ...images];

        if (pool.length > 0) {
            const shuffled = [...pool].sort(() => 0.5 - Math.random());
            setStackedMedia(shuffled.slice(0, 3));
        }
    }, [project]);

    const acc = project.accent ?? "fuchsia";
    const glowColors: Record<string, { glow: string; border: string; beam: string }> = {
        fuchsia: { glow: "rgba(217, 70, 239, 0.85)", border: "#e879f9", beam: "rgba(240, 171, 252, 0.95)" },
        cyan:    { glow: "rgba(34, 211, 238, 0.85)", border: "#38bdf8", beam: "rgba(125, 211, 252, 0.95)" },
        violet:  { glow: "rgba(167, 139, 250, 0.85)", border: "#c084fc", beam: "rgba(216, 180, 254, 0.95)" },
        amber:   { glow: "rgba(251, 191, 36, 0.85)", border: "#fcd34d", beam: "rgba(254, 240, 138, 0.95)" },
        rose:    { glow: "rgba(251, 113, 133, 0.85)", border: "#fda4af", beam: "rgba(254, 205, 211, 0.95)" },
        emerald: { glow: "rgba(52, 211, 153, 0.85)", border: "#6ee7b7", beam: "rgba(167, 243, 208, 0.95)" },
    };
    const currentGlow = glowColors[acc] ?? glowColors.fuchsia;

    return (
        <Link
            href={`/projects/${project.slug}`}
            draggable={false}
            className="group flex-shrink-0 block select-none focus-visible:outline-none"
            style={{ width: "320px", height: "350px", perspective: "1200px" }}
        >
            <article className="relative w-full h-full rounded-[32px] bg-black p-[3px] border-[3px] border-black/90 shadow-2xl overflow-hidden transition-all duration-700 group-hover:-translate-y-2">
                
                {/* High-Intensity Emission Outer Glow (Fades in on hover) */}
                <div
                    className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-0"
                    style={{
                        boxShadow: `0 0 40px ${currentGlow.glow}, 0 20px 60px -5px ${currentGlow.glow}`,
                        borderColor: currentGlow.border,
                    }}
                />

                <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-black flex flex-col justify-between z-1" style={{ transformStyle: "preserve-3d" }}>

                    {/* Full-Bleed Media Container (Extends all the way down behind folder tab shape) */}
                    <div className="absolute top-0 inset-x-0 w-full h-[225px] overflow-hidden rounded-t-[26px] z-1">

                        {/* 3D Stack Card 3 (Furthest Back) */}
                        {stackedMedia[2] && (
                            <div className="absolute inset-x-4 top-2 h-[170px] rounded-[20px] overflow-hidden border border-white/20 shadow-2xl transition-all duration-700 ease-out group-hover:-translate-y-12 group-hover:-rotate-8 group-hover:scale-95 group-hover:opacity-100 opacity-0 pointer-events-none z-1">
                                {stackedMedia[2].type === "video" ? (
                                    <video src={stackedMedia[2].url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                ) : (
                                    <img src={stackedMedia[2].url} alt={stackedMedia[2].alt} className="w-full h-full object-cover" />
                                )}
                            </div>
                        )}

                        {/* 3D Stack Card 2 (Middle - Floating Forward) */}
                        {stackedMedia[1] && (
                            <div className="absolute inset-x-3 top-2 h-[180px] rounded-[20px] overflow-hidden border border-white/25 shadow-2xl transition-all duration-700 ease-out delay-75 group-hover:-translate-y-6 group-hover:rotate-4 group-hover:scale-[1.02] group-hover:opacity-100 opacity-0 pointer-events-none z-2">
                                {stackedMedia[1].type === "video" ? (
                                    <video src={stackedMedia[1].url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                ) : (
                                    <img src={stackedMedia[1].url} alt={stackedMedia[1].alt} className="w-full h-full object-cover" />
                                )}
                            </div>
                        )}

                        {/* 3D Main Preview Base (Frontmost Video - Full Bleed!) */}
                        {stackedMedia[0] && (
                            <div className="absolute inset-0 w-full h-full rounded-t-[25px] overflow-hidden transition-all duration-500 group-hover:scale-105 shadow-xl z-3">
                                {stackedMedia[0].type === "video" ? (
                                    <video
                                        key={stackedMedia[0].url}
                                        src={stackedMedia[0].url}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                                    />
                                ) : (
                                    <img
                                        src={stackedMedia[0].url}
                                        alt={stackedMedia[0].alt}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        draggable={false}
                                    />
                                )}

                                {/* Black Vignette Overlay - Fades Out Completely on Hover! */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/50 pointer-events-none transition-opacity duration-700 ease-out group-hover:opacity-0 z-10" />
                            </div>
                        )}

                        {/* Top Right Title Overlay */}
                        <div className="absolute top-4 right-4 text-right max-w-[160px] pointer-events-none z-20">
                            <h3 className="font-playfair text-sm font-extrabold text-white leading-tight drop-shadow-md group-hover:text-[#ffff7b] transition-colors line-clamp-2">
                                {project.title}
                            </h3>
                        </div>
                    </div>

                    {/* 3D Folder Flap Notch Panel (Overlay at bottom - Opens FORWARD in 3D) */}
                    <div
                        className="absolute inset-x-0 bottom-0 h-[175px] z-30 transition-all duration-700 ease-out rounded-b-[28px]"
                        style={{
                            transformOrigin: "bottom center",
                            transformStyle: "preserve-3d",
                        }}
                    >
                        {/* Ultra-Smooth Sweeping Neon Emission Layer inside the Emission Flap */}
                        <div className="absolute inset-x-0 bottom-0 h-36 rounded-b-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0 overflow-hidden">
                            {/* Base smooth ambient glow */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: `radial-gradient(ellipse at 50% 120%, ${currentGlow.glow}, transparent 75%)`,
                                    filter: "blur(6px)",
                                }}
                            />
                            {/* Smooth Left-to-Right Sweeping Neon Beam Wave */}
                            <div
                                className="absolute -inset-x-full bottom-0 h-full w-[200%]"
                                style={{
                                    background: `radial-gradient(ellipse at 50% 100%, ${currentGlow.beam} 0%, ${currentGlow.glow} 40%, transparent 80%)`,
                                    filter: "blur(12px)",
                                    animation: "neonSweep 2.2s infinite linear",
                                }}
                            />
                        </div>

                        {/* SVG Folder Tab Shape Overlay (#141416 dark panel) */}
                        <svg
                            className="absolute inset-0 w-full h-full text-[#141416] fill-current drop-shadow-[0_-10px_20px_rgba(0,0,0,0.8)] transition-transform duration-700 group-hover:[transform:rotateX(20deg)_translateZ(20px)]"
                            viewBox="0 0 310 175"
                            preserveAspectRatio="none"
                        >
                            <path d="M 0,20 Q 0,0 20,0 L 155,0 Q 170,0 178,10 L 190,28 Q 198,36 210,36 L 290,36 Q 310,36 310,56 L 310,175 L 0,175 Z" />
                        </svg>

                        {/* Tab Content Layer */}
                        <div className="relative z-10 w-full h-full px-5 pt-4 pb-4 flex flex-col justify-between transition-transform duration-700 group-hover:[transform:rotateX(20deg)_translateZ(20px)]">
                            {/* Tab Left Header */}
                            <div className="max-w-[145px]">
                                <span className="font-mono text-xs font-bold text-white block truncate">
                                    {project.category}
                                </span>
                                <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider block mt-0.5 font-medium truncate">
                                    {project.client} • {project.timeline}
                                </span>
                            </div>

                            {/* Bottom Row */}
                            <div className="flex items-end justify-between pt-2">
                                <div className="flex items-baseline gap-1.5">
                                    <span className="font-mono text-2xl font-black text-white">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider font-semibold">
                                        Work
                                    </span>
                                </div>

                                <span className="font-mono text-xs text-white/90 group-hover:text-[#ffff7b] group-hover:gap-2 flex items-center gap-1.5 transition-all duration-300 font-bold">
                                    View
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </article>
        </Link>
    );
}

export default function ProjectsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        const container = containerRef.current;
        if (!container) return;
        setCanScrollLeft(container.scrollLeft > 10);
        setCanScrollRight(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );
    };

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        checkScroll();
        container.addEventListener("scroll", checkScroll, { passive: true });
        window.addEventListener("resize", checkScroll, { passive: true });
        return () => {
            container.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, []);

    const scroll = (direction: "left" | "right") => {
        const container = containerRef.current;
        if (!container) return;
        const cardWidth = 340;
        const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <section id="projects" className="relative w-full bg-white py-16 md:py-20">

            {/* ── Section Header ─────────────────────────────── */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between px-6 md:px-16 pb-8 gap-6">
                <div>
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#5c5c5c] block mb-2">
                        Selected Work
                    </span>
                    <h2
                        className="font-playfair text-5xl md:text-7xl text-[#191919] leading-none"
                        style={{ fontWeight: 800 }}
                    >
                        Featured{" "}
                        <em className="font-playfair italic" style={{ fontWeight: 400 }}>
                            Projects
                        </em>
                    </h2>
                </div>

                <div className="flex items-center gap-6 self-between md:self-auto w-full md:w-auto justify-between md:justify-start">
                    <p className="hidden lg:block font-mono text-xs text-[#191919]/70 max-w-xs leading-relaxed font-medium">
                        A curated selection of 3D, CGI, and interactive projects — navigated smoothly via controls.
                    </p>

                    {/* Navigation Arrow Buttons */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            aria-label="Previous projects"
                            className={`w-12 h-12 rounded-full border border-[#191919]/20 flex items-center justify-center text-[#191919] transition-all duration-300 ${
                                canScrollLeft
                                    ? "hover:bg-[#191919] hover:text-white hover:border-[#191919] active:scale-95 cursor-pointer shadow-sm"
                                    : "opacity-25 cursor-not-allowed border-[#191919]/10"
                            }`}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            aria-label="Next projects"
                            className={`w-12 h-12 rounded-full border border-[#191919]/20 flex items-center justify-center text-[#191919] transition-all duration-300 ${
                                canScrollRight
                                    ? "hover:bg-[#191919] hover:text-white hover:border-[#191919] active:scale-95 cursor-pointer shadow-sm"
                                    : "opacity-25 cursor-not-allowed border-[#191919]/10"
                            }`}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Top border ─────────────────────────────────── */}
            <div className="w-full h-px bg-[#191919]/10" />

            {/* ── Horizontal scroll track (Arrow Controlled) ──── */}
            <div
                ref={containerRef}
                className="w-full overflow-x-auto hide-scrollbar scroll-smooth py-8"
                style={{
                    maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                }}
            >
                {/* Inner row of cards */}
                <div className="inline-flex flex-row gap-6 px-6 md:px-16 w-max">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.slug} project={project} i={i} />
                    ))}
                </div>
            </div>

            {/* ── Bottom indicator ───────────────────────────── */}
            <div className="flex items-center justify-between px-6 md:px-16 pt-2">
                <span className="font-mono text-[10px] text-[#191919]/60 tracking-widest uppercase font-semibold">
                    Use arrows to explore projects ({projects.length} Selected Work)
                </span>
                <div className="flex gap-1">
                    <span className="w-8 h-px bg-[#191919]/40" />
                    <span className="w-4 h-px bg-[#191919]/20" />
                </div>
            </div>
        </section>
    );
}
