"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectModel from "@/components/3d/ProjectModel";

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
                    {projects.map((project, i) => {
                        const acc = project.accent ?? "fuchsia";
                        const dots: Record<string, string> = {
                            fuchsia: "#d946ef",
                            cyan:    "#22d3ee",
                            violet:  "#a78bfa",
                            amber:   "#fbbf24",
                            rose:    "#fb7185",
                            emerald: "#34d399",
                        };
                        const dot = dots[acc] ?? dots.fuchsia;

                        return (
                            <Link
                                key={project.slug}
                                href={`/projects/${project.slug}`}
                                draggable={false}
                                className="group flex-shrink-0 block select-none focus-visible:outline-none"
                                style={{ width: "clamp(260px, 28vw, 340px)" }}
                            >
                                <article
                                    className="relative w-full overflow-hidden rounded-2xl bg-[#191919] transition-transform duration-500 group-hover:-translate-y-2"
                                    style={{
                                        boxShadow: "0 8px 40px rgba(25,25,25,0.18), 0 2px 8px rgba(25,25,25,0.08)",
                                    }}
                                >
                                    {/* Image area */}
                                    <div className="relative w-full overflow-hidden" style={{ height: 220 }}>
                                        {project.media[0]?.type === "image" && project.media[0]?.url ? (
                                            <img
                                                src={project.media[0].url}
                                                alt={project.media[0].alt}
                                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                draggable={false}
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-[#222]" />
                                        )}
                                        {/* 3D model */}
                                        {(project.slug === "trionda-ball-wc-2026" || project.slug === "redbull-gold-concept") && (
                                            <div
                                                style={{ viewTransitionName: `project-model-${project.slug}` }}
                                                className="absolute inset-0 z-10"
                                            >
                                                <ProjectModel index={i} />
                                            </div>
                                        )}
                                        {/* Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#191919] via-transparent to-transparent z-20" />
                                        {/* Index watermark */}
                                        <span className="absolute bottom-2 right-3 font-mono font-black text-[72px] leading-none text-white/[0.06] select-none z-0">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        {/* Accent dot */}
                                        <span
                                            className="absolute top-3 left-3 z-30 w-2 h-2 rounded-full ring-2 ring-black/20"
                                            style={{ background: dot }}
                                        />
                                    </div>

                                    {/* Text block */}
                                    <div className="px-5 pt-4 pb-5">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-white/70 font-semibold">
                                                {project.category}
                                            </span>
                                            <span className="font-mono text-[9px] text-white/50 tracking-widest">
                                                {project.timeline}
                                            </span>
                                        </div>
                                        <h3
                                            className="font-playfair text-xl text-white leading-tight mb-2 group-hover:text-[#ffff7b] transition-colors"
                                            style={{ fontWeight: 700 }}
                                        >
                                            {project.title}
                                        </h3>
                                        <p className="font-cyber text-white/70 text-xs leading-relaxed line-clamp-2">
                                            {project.description}
                                        </p>
                                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.12]">
                                            <span className="font-mono text-[9px] text-white/50 uppercase tracking-widest font-medium">
                                                {project.client}
                                            </span>
                                            <span className="font-mono text-[9px] text-white/80 group-hover:text-[#ffff7b] group-hover:gap-2 flex items-center gap-1.5 transition-all duration-300 font-semibold">
                                                View
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        );
                    })}
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
