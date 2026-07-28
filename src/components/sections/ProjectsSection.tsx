"use client";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";

function ProjectCard({ project, i }: { project: (typeof projects)[0]; i: number }) {
    const [previewMedia, setPreviewMedia] = useState<{ type: 'image' | 'video'; url: string; alt: string } | null>(null);

    useEffect(() => {
        const videos = project.media.filter((m) => m.type === 'video');
        if (videos.length > 0) {
            const randomVideo = videos[Math.floor(Math.random() * videos.length)];
            setPreviewMedia(randomVideo);
        } else if (project.media.length > 0) {
            const randomMedia = project.media[Math.floor(Math.random() * project.media.length)];
            setPreviewMedia(randomMedia);
        }
    }, [project]);

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
            href={`/projects/${project.slug}`}
            draggable={false}
            className="group flex-shrink-0 block select-none focus-visible:outline-none"
            style={{ width: "310px", height: "330px" }}
        >
            <article className="relative w-full h-full rounded-[32px] bg-black p-[3px] border-[3px] border-black/80 shadow-2xl overflow-hidden transition-transform duration-500 group-hover:-translate-y-2">
                <div className="relative w-full h-full rounded-[28px] overflow-hidden bg-[#161618] flex flex-col justify-between">

                    {/* Media Area (Top) */}
                    <div className="relative w-full h-[180px] overflow-hidden">
                        {previewMedia ? (
                            previewMedia.type === "video" ? (
                                <video
                                    key={previewMedia.url}
                                    src={previewMedia.url}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                                />
                            ) : (
                                <img
                                    src={previewMedia.url}
                                    alt={previewMedia.alt}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    draggable={false}
                                />
                            )
                        ) : (
                            <div className="absolute inset-0 bg-[#222]" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent pointer-events-none" />

                        {/* Top Right Project Title Overlay (Matching "Taskello App Card Design" in reference) */}
                        <div className="absolute top-4 right-4 text-right max-w-[160px] pointer-events-none z-10">
                            <h3 className="font-playfair text-sm font-extrabold text-white leading-tight drop-shadow-md group-hover:text-[#ffff7b] transition-colors line-clamp-2">
                                {project.title}
                            </h3>
                        </div>
                    </div>

                    {/* Folder Tab Notch Info Section (Bottom) */}
                    <div className="relative w-full h-[170px] -mt-8 z-20">
                        {/* SVG Folder Tab Shape Background */}
                        <svg
                            className="absolute inset-0 w-full h-full text-[#1c1c1e] fill-current drop-shadow-[0_-6px_14px_rgba(0,0,0,0.5)]"
                            viewBox="0 0 310 170"
                            preserveAspectRatio="none"
                        >
                            <path d="M 0,20 Q 0,0 20,0 L 155,0 Q 170,0 178,10 L 190,28 Q 198,36 210,36 L 290,36 Q 310,36 310,56 L 310,170 L 0,170 Z" />
                        </svg>

                        {/* Tab Content Layer */}
                        <div className="relative z-10 w-full h-full px-5 pt-4 pb-4 flex flex-col justify-between">
                            {/* Tab Left Header (Matching "Daily memo / Notes & Journaling" in reference) */}
                            <div className="max-w-[145px]">
                                <span className="font-mono text-xs font-bold text-white block truncate">
                                    {project.category}
                                </span>
                                <span className="font-mono text-[10px] text-white/50 uppercase tracking-wider block mt-0.5 font-medium truncate">
                                    {project.client} • {project.timeline}
                                </span>
                            </div>

                            {/* Bottom Row: Index (05 Doc) & View CTA (1270 Notes) */}
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
