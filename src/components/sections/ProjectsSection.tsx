"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

function ProjectCard({ project, i, isMobileActive }: { project: (typeof projects)[0]; i: number; isMobileActive?: boolean }) {
    const [stackedMedia, setStackedMedia] = useState<{ type: 'image' | 'video'; url: string; alt: string }[]>([]);
    const [isHovered, setIsHovered] = useState(false);
    const isActive = isHovered || isMobileActive;

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
            data-card-index={i}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group flex-shrink-0 block select-none focus-visible:outline-none snap-center"
            style={{ width: "320px", height: "350px", perspective: "1200px" }}
        >
            <article className={`relative w-full h-full rounded-[32px] bg-black p-[3px] border-[3px] border-black/90 shadow-2xl overflow-hidden transition-all duration-700 ${isActive ? "-translate-y-2" : ""}`}>
                
                {/* High-Intensity Outer Neon Glow Bloom */}
                <div
                    className={`absolute inset-0 rounded-[32px] transition-all duration-700 pointer-events-none z-0 ${isActive ? "opacity-100" : "opacity-0"}`}
                    style={{
                        boxShadow: `0 0 45px ${currentGlow.glow}, 0 25px 65px -5px ${currentGlow.glow}`,
                        borderColor: currentGlow.border,
                    }}
                />

                {/* Bottom Sweeping Neon Glow Aura (Placed OUTSIDE folder flap so it NEVER washes over the text!) */}
                <div className={`absolute inset-x-0 bottom-0 h-20 rounded-b-[32px] overflow-hidden pointer-events-none z-[1] transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0"}`}>
                    <div
                        className="absolute -inset-x-full bottom-0 h-full w-[200%]"
                        style={{
                            background: `radial-gradient(ellipse at 50% 120%, ${currentGlow.beam} 0%, ${currentGlow.glow} 50%, transparent 85%)`,
                            filter: "blur(14px)",
                            animation: "neonSweep 2.2s infinite linear",
                        }}
                    />
                </div>

                <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-black flex flex-col justify-between z-2" style={{ transformStyle: "preserve-3d" }}>

                    {/* Full-Bleed Media Container (Extends all the way down behind folder tab shape) */}
                    <div className="absolute top-0 inset-x-0 w-full h-[225px] overflow-hidden rounded-t-[26px] z-1">

                        {/* 3D Stack Card 3 (Furthest Back) */}
                        {stackedMedia[2] && (
                            <div className={`absolute inset-x-4 top-2 h-[170px] rounded-[20px] overflow-hidden border border-white/20 shadow-2xl transition-all duration-700 ease-out pointer-events-none z-1 ${isActive ? "-translate-y-12 -rotate-8 scale-95 opacity-100" : "opacity-0"}`}>
                                {stackedMedia[2].type === "video" ? (
                                    <video src={stackedMedia[2].url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                ) : (
                                    <img src={stackedMedia[2].url} alt={stackedMedia[2].alt} className="w-full h-full object-cover" />
                                )}
                            </div>
                        )}

                        {/* 3D Stack Card 2 (Middle - Floating Forward) */}
                        {stackedMedia[1] && (
                            <div className={`absolute inset-x-3 top-2 h-[180px] rounded-[20px] overflow-hidden border border-white/25 shadow-2xl transition-all duration-700 ease-out delay-75 pointer-events-none z-2 ${isActive ? "-translate-y-6 rotate-4 scale-[1.02] opacity-100" : "opacity-0"}`}>
                                {stackedMedia[1].type === "video" ? (
                                    <video src={stackedMedia[1].url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                ) : (
                                    <img src={stackedMedia[1].url} alt={stackedMedia[1].alt} className="w-full h-full object-cover" />
                                )}
                            </div>
                        )}

                        {/* 3D Main Preview Base (Frontmost Video - Full Bleed!) */}
                        {stackedMedia[0] && (
                            <div className={`absolute inset-0 w-full h-full rounded-t-[25px] overflow-hidden transition-all duration-500 shadow-xl z-3 ${isActive ? "scale-105" : ""}`}>
                                {stackedMedia[0].type === "video" ? (
                                    <video
                                        key={stackedMedia[0].url}
                                        src={stackedMedia[0].url}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className={`w-full h-full object-cover transition-transform duration-700 pointer-events-none ${isActive ? "scale-110" : ""}`}
                                    />
                                ) : (
                                    <img
                                        src={stackedMedia[0].url}
                                        alt={stackedMedia[0].alt}
                                        className={`w-full h-full object-cover transition-transform duration-700 ${isActive ? "scale-110" : ""}`}
                                        draggable={false}
                                    />
                                )}

                                {/* Black Vignette Overlay - Fades Out Completely on Hover / Mobile Active! */}
                                <div className={`absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-black/50 pointer-events-none transition-opacity duration-700 ease-out z-10 ${isActive ? "opacity-0" : "opacity-100"}`} />
                            </div>
                        )}

                        {/* Top Right Timeline Badge Overlay */}
                        <div className="absolute top-4 right-4 text-right pointer-events-none z-20">
                            <span className="font-mono text-[9px] font-bold text-white/90 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 tracking-widest uppercase shadow-md">
                                {project.timeline}
                            </span>
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
                        {/* SVG Folder Tab Shape Overlay (#141416 dark panel) */}
                        <svg
                            className="absolute inset-0 w-full h-full text-[#141416] fill-current drop-shadow-[0_-10px_20px_rgba(0,0,0,0.8)] transition-transform duration-700"
                            style={{
                                transform: isActive ? "rotateX(20deg) translateZ(20px)" : "rotateX(0deg) translateZ(0px)",
                                transformOrigin: "bottom center",
                            }}
                            viewBox="0 0 310 175"
                            preserveAspectRatio="none"
                        >
                            <path d="M 0,20 Q 0,0 20,0 L 155,0 Q 170,0 178,10 L 190,28 Q 198,36 210,36 L 290,36 Q 310,36 310,56 L 310,175 L 0,175 Z" />
                        </svg>

                        {/* Tab Content Layer */}
                        <div
                            className="relative z-10 w-full h-full px-5 pt-4 pb-4 flex flex-col justify-between transition-transform duration-700"
                            style={{
                                transform: isActive ? "rotateX(20deg) translateZ(20px)" : "rotateX(0deg) translateZ(0px)",
                                transformOrigin: "bottom center",
                            }}
                        >
                            {/* Tab Left Header (Holds project.title) */}
                            <div className="max-w-[150px]">
                                <h3 className={`font-playfair text-base font-bold leading-tight transition-colors line-clamp-1 ${isActive ? "text-[#ffff7b]" : "text-white"}`}>
                                    {project.title}
                                </h3>
                                <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest block mt-1 font-medium truncate">
                                    {project.category}
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

                                <span className={`font-mono text-xs flex items-center gap-1.5 transition-all duration-300 font-bold ${isActive ? "text-[#ffff7b] gap-2" : "text-white/90 gap-1.5"}`}>
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
    const [activeMobileIndex, setActiveMobileIndex] = useState<number | null>(0);

    const checkScroll = () => {
        const container = containerRef.current;
        if (!container) return;

        setCanScrollLeft(container.scrollLeft > 10);
        setCanScrollRight(
            container.scrollLeft < container.scrollWidth - container.clientWidth - 10
        );

        // Calculate centered card on mobile screens (under 1024px)
        if (window.innerWidth < 1024) {
            const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2;
            const cardElements = container.querySelectorAll<HTMLElement>("[data-card-index]");
            let minDistance = Infinity;
            let closestIndex = 0;

            cardElements.forEach((cardEl) => {
                const rect = cardEl.getBoundingClientRect();
                const cardCenter = rect.left + rect.width / 2;
                const distance = Math.abs(cardCenter - containerCenter);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = Number(cardEl.getAttribute("data-card-index"));
                }
            });

            setActiveMobileIndex(closestIndex);
        } else {
            setActiveMobileIndex(null);
        }
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

            {/* ── Horizontal scroll track (Arrow Controlled + Mobile Snap) ──── */}
            <div
                ref={containerRef}
                className="w-full overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory py-8 px-4 md:px-0"
                style={{
                    maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                }}
            >
                {/* Inner row of cards */}
                <div className="inline-flex flex-row gap-6 px-6 md:px-16 w-max">
                    {projects.map((project, i) => (
                        <ProjectCard key={project.slug} project={project} i={i} isMobileActive={i === activeMobileIndex} />
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
