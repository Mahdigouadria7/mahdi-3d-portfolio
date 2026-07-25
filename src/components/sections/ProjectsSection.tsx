"use client";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import ProjectModel from "@/components/3d/ProjectModel";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const matchMedia = gsap.matchMedia();

        matchMedia.add("(min-width: 768px)", () => {
            const getScrollAmount = () => {
                return -(track.scrollWidth - window.innerWidth + 120);
            };

            gsap.to(track, {
                x: getScrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 1,
                    invalidateOnRefresh: true,
                },
            });
        });

        return () => matchMedia.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="relative w-full bg-white md:h-[230vh]"
        >
            {/* Sticky Viewport Container */}
            <div className="md:sticky md:top-0 md:h-screen w-full flex flex-col justify-between py-10 md:py-12 overflow-hidden">

                {/* ── Section Header ─────────────────────────────── */}
                <div className="flex flex-col md:flex-row items-start md:items-end justify-between px-6 md:px-16 pb-4 md:pb-6 gap-4 md:gap-6 flex-shrink-0">
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
                    <p className="font-mono text-xs md:text-sm text-[#191919]/70 max-w-xs md:pb-1 leading-relaxed font-medium">
                        A curated selection of 3D, CGI, and interactive projects — crafted with precision and intent.
                    </p>
                </div>

                {/* ── Top border ─────────────────────────────────── */}
                <div className="w-full h-px bg-[#191919]/10 flex-shrink-0" />

                {/* ── Horizontal scroll track ────────────────────── */}
                <div
                    className="w-full overflow-x-auto md:overflow-x-visible hide-scrollbar cursor-ew-resize py-6"
                    style={{
                        maskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
                    }}
                >
                    {/* Inner row of cards */}
                    <div
                        ref={trackRef}
                        className="inline-flex flex-row gap-6 px-6 md:px-16 w-max will-change-transform"
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
                    </div>
                </div>

                {/* ── Scroll hint ────────────────────────────────── */}
                <div className="flex items-center gap-3 px-6 md:px-16 pt-2 flex-shrink-0">
                    <span className="font-mono text-[10px] text-[#191919]/70 tracking-widest uppercase font-semibold">
                        Scroll to explore →
                    </span>
                    <div className="flex gap-1">
                        <span className="w-8 h-px bg-[#191919]/40" />
                        <span className="w-4 h-px bg-[#191919]/20" />
                    </div>
                </div>

            </div>
        </section>
    );
}
