"use client";
import { useRef } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectModel from "@/components/3d/ProjectModel";

export default function ProjectsSection() {
    return (
        <section id="projects" className="relative w-full" style={{ background: "var(--nico-cream)" }}>

            {/* ── Section Header ──────────────────────────── */}
            <div className="relative z-10 w-full flex flex-col md:flex-row items-start md:items-end justify-between px-6 md:px-16 pt-20 pb-12 gap-6">
                <div>
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#5c5c5c] block mb-3">Selected Work</span>
                    <h2
                        className="font-playfair text-6xl md:text-8xl text-[#191919] leading-none"
                        style={{ fontWeight: 800 }}
                    >
                        Featured<br />
                        <em className="font-playfair italic" style={{ fontWeight: 400 }}>Projects</em>
                    </h2>
                </div>
                <p className="font-mono text-xs md:text-sm text-[#5c5c5c] max-w-xs md:pb-2 leading-relaxed">
                    A curated selection of 3D, CGI, and interactive projects — each crafted with precision.
                </p>
            </div>

            {/* ── Yellow accent divider (Nico Studio signature) */}
            <div className="w-full h-px bg-[#191919]/10" />

            {/* ── Sticky Card Stack ────────────────────────── */}
            {/* Each card needs scroll room — 100vh per card + some for the header */}
            <div className="relative" style={{ height: `${projects.length * 100}vh` }}>
                {projects.map((project, i) => {
                    const acc = project.accent ?? 'fuchsia';
                    const palettes: Record<string, { dot: string; tag: string; tagText: string }> = {
                        fuchsia: { dot: '#d946ef', tag: '#191919', tagText: '#ffffff' },
                        cyan:    { dot: '#22d3ee', tag: '#191919', tagText: '#ffffff' },
                        violet:  { dot: '#a78bfa', tag: '#191919', tagText: '#ffffff' },
                        amber:   { dot: '#fbbf24', tag: '#ffff7b', tagText: '#191919' },
                        rose:    { dot: '#fb7185', tag: '#191919', tagText: '#ffffff' },
                        emerald: { dot: '#34d399', tag: '#191919', tagText: '#ffffff' },
                    };
                    const p = palettes[acc] ?? palettes.fuchsia;

                    return (
                        <div
                            key={project.slug}
                            className="sticky top-0 w-full h-screen flex items-center justify-center px-4 md:px-16 py-8"
                            style={{
                                zIndex: i + 1,
                                background: "var(--nico-cream)",
                            }}
                        >
                            <Link
                                href={`/projects/${project.slug}`}
                                className="group relative w-full max-w-5xl block"
                            >
                                {/* Card shell — Nico Studio style: 15px radius, clean shadow */}
                                <article
                                    className="relative w-full overflow-hidden rounded-2xl bg-[#191919] transition-transform duration-500 group-hover:-translate-y-2"
                                    style={{
                                        boxShadow: "0 20px 60px rgba(25,25,25,0.20), 0 4px 16px rgba(25,25,25,0.10)",
                                    }}
                                >
                                    {/* ── Layout: Image left, content right ── */}
                                    <div className="flex flex-col md:flex-row min-h-[420px] md:min-h-[480px]">

                                        {/* Left: full image / 3D model */}
                                        <div className="relative w-full md:w-[55%] h-64 md:h-auto overflow-hidden">
                                            {/* Image from first media item */}
                                            {project.media[0]?.type === 'image' && project.media[0]?.url && (
                                                <img
                                                    src={project.media[0].url}
                                                    alt={project.media[0].alt}
                                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    draggable={false}
                                                />
                                            )}
                                            {/* 3D model overlay */}
                                            {(project.slug === "trionda-ball-wc-2026" || project.slug === "redbull-gold-concept") && (
                                                <div
                                                    style={{ viewTransitionName: `project-model-${project.slug}` }}
                                                    className="absolute inset-0 z-10"
                                                >
                                                    <ProjectModel index={i} />
                                                </div>
                                            )}
                                            {/* Gradient over image for desktop */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#191919]/60 hidden md:block z-20" />
                                            {/* Gradient for mobile */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#191919]/80 to-transparent md:hidden z-20" />

                                            {/* Big index watermark */}
                                            <span className="absolute bottom-3 left-4 font-mono font-black text-[100px] md:text-[140px] leading-none text-white/[0.05] select-none z-0">
                                                {String(i + 1).padStart(2, '0')}
                                            </span>
                                        </div>

                                        {/* Right: text content */}
                                        <div className="flex flex-col justify-between px-6 py-6 md:px-10 md:py-10 w-full md:w-[45%] flex-shrink-0">

                                            {/* Top meta row */}
                                            <div className="flex items-center justify-between mb-auto">
                                                <span
                                                    className="font-mono text-[10px] tracking-[0.25em] uppercase font-bold px-2.5 py-1 rounded-full"
                                                    style={{ background: p.tag, color: p.tagText }}
                                                >
                                                    {project.category}
                                                </span>
                                                <span className="font-mono text-[10px] text-white/40 tracking-widest">
                                                    {project.timeline}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <div className="flex-1 flex flex-col justify-center py-8">
                                                <h3
                                                    className="font-playfair text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4 group-hover:text-white transition-colors"
                                                    style={{ fontWeight: 700 }}
                                                >
                                                    {project.title}
                                                </h3>
                                                <p className="font-cyber text-white/50 text-sm leading-relaxed line-clamp-3 group-hover:text-white/70 transition-colors">
                                                    {project.description}
                                                </p>
                                            </div>

                                            {/* Bottom: client + arrow CTA */}
                                            <div className="flex items-center justify-between pt-6 border-t border-white/[0.08] mt-auto">
                                                <span className="font-mono text-[10px] text-white/30 uppercase tracking-widest">
                                                    {project.client}
                                                </span>
                                                {/* Nico Studio arrow CTA */}
                                                <span className="inline-flex items-center gap-2 font-mono text-xs text-white/60 group-hover:text-white group-hover:gap-3 transition-all duration-300">
                                                    View project
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </article>

                                {/* Floating accent dot — like Nico Studio's category colour */}
                                <span
                                    className="absolute top-4 left-4 z-30 w-2.5 h-2.5 rounded-full ring-2 ring-white/20"
                                    style={{ background: p.dot }}
                                />
                            </Link>
                        </div>
                    );
                })}
            </div>

            {/* ── Bottom spacer ── */}
            <div className="h-20 w-full bg-[var(--nico-cream)]" />
        </section>
    );
}
