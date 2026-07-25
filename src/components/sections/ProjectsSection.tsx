"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectModel from "@/components/3d/ProjectModel";

export default function ProjectsSection() {
    const trackRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Smooth horizontal scroll with wheel
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let target = 0;
        let current = 0;
        let rafId: number;

        const onWheel = (e: WheelEvent) => {
            // Only hijack when scrolling more vertically (converts to horizontal)
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                const max = container.scrollWidth - container.clientWidth;
                // Only steal the event when there's still horizontal room
                if (target > 0 || e.deltaY > 0) {
                    e.preventDefault();
                    target = Math.max(0, Math.min(target + e.deltaY * 1.8, max));
                }
            }
            cancelAnimationFrame(rafId);
            (function tick() {
                current += (target - current) * 0.09;
                container.scrollLeft = current;
                if (Math.abs(target - current) > 0.5) rafId = requestAnimationFrame(tick);
            })();
        };

        container.addEventListener("wheel", onWheel, { passive: false });
        return () => {
            container.removeEventListener("wheel", onWheel);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <section id="projects" className="relative w-full bg-white">

            {/* ── Section Header ─────────────────────────────── */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between px-6 md:px-16 pt-20 pb-10 gap-6">
                <div>
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#5c5c5c] block mb-3">
                        Selected Work
                    </span>
                    <h2
                        className="font-playfair text-6xl md:text-8xl text-[#191919] leading-none"
                        style={{ fontWeight: 800 }}
                    >
                        Featured
                        <br />
                        <em className="font-playfair italic" style={{ fontWeight: 400 }}>
                            Projects
                        </em>
                    </h2>
                </div>
                <p className="font-mono text-xs md:text-sm text-[#191919]/70 max-w-xs md:pb-3 leading-relaxed font-medium">
                    A curated selection of 3D, CGI, and interactive projects — crafted with precision and intent.
                </p>
            </div>

            {/* ── Top border ─────────────────────────────────── */}
            <div className="w-full h-px bg-[#191919]/10" />

            {/* ── Horizontal scroll track ────────────────────── */}
            <div
                ref={containerRef}
                className="w-full overflow-x-auto overflow-y-hidden hide-scrollbar cursor-ew-resize"
                style={{
                    // Edge fade: transparent = invisible, black = fully visible
                    maskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)",
                    touchAction: "pan-y",
                }}
            >
                {/* Inner row of cards */}
                <div
                    ref={trackRef}
                    className="inline-flex flex-row gap-5 py-10 px-10 md:px-16 w-max"
                >
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

                    {/* End spacer */}
                    <div className="flex-shrink-0 w-6" />
                </div>
            </div>

            {/* ── Scroll hint ────────────────────────────────── */}
            <div className="flex items-center gap-3 px-6 md:px-16 pb-10">
                <span className="font-mono text-[10px] text-[#191919]/70 tracking-widest uppercase font-semibold">Drag to explore →</span>
                <div className="flex gap-1">
                    <span className="w-8 h-px bg-[#191919]/40" />
                    <span className="w-4 h-px bg-[#191919]/20" />
                </div>
            </div>

            <div className="w-full h-px bg-[#191919]/10" />
        </section>
    );
}
