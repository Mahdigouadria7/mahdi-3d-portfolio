"use client";
import { useRef } from "react";
import Link from "next/link";
import { projects } from "@/data/projects";
import ScrollReveal from "@/components/ui/ScrollReveal";
import ProjectModel from "@/components/3d/ProjectModel";

export default function ProjectsSection() {

    return (
        <section id="projects" className="relative w-full pointer-events-none">

            {/* ── Section Header ──────────────────────────────── */}
            <div className="relative z-10 w-full flex flex-col items-center pt-24 pb-12 px-6 md:px-16 pointer-events-auto">
                <ScrollReveal direction="up" delay={0.1}>
                    <div className="flex items-center gap-3 mb-4 justify-center">
                        <span className="font-mono text-[10px] font-bold tracking-widest text-fuchsia-400 border border-fuchsia-500/30 bg-fuchsia-500/10 px-2.5 py-0.5">01</span>
                        <div className="flex items-center gap-0">
                            <div className="w-6 h-[2px] bg-fuchsia-500" />
                            <div className="w-6 h-[2px] bg-fuchsia-500/40" />
                        </div>
                        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">Selected Work</span>
                    </div>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.2}>
                    <h2 className="text-5xl md:text-8xl font-siegra font-black tracking-widest text-white uppercase leading-none drop-shadow-2xl text-center">
                        FEATURED<br/>PROJECTS
                    </h2>
                </ScrollReveal>
                <ScrollReveal direction="up" delay={0.3}>
                    <div className="w-16 md:w-24 h-[2px] bg-gradient-to-r from-fuchsia-500 to-cyan-500 mt-6 mb-6 mx-auto" />
                    <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-xs font-cyber text-center">
                        A curated selection of 3D, interactive, and real-time web projects — each built from scratch with precision and intent.
                    </p>
                </ScrollReveal>
            </div>

            {/* ── Sticky Card Stack ─────────────────────────── */}
            {/* Total height = cards * 100vh to give scroll room */}
            <div
                className="relative pointer-events-auto"
                style={{ height: `${projects.length * 90}vh` }}
            >
                {projects.map((project, i) => {
                    const acc = project.accent ?? 'fuchsia';
                    const palettes: Record<string, { bar: string; cat: string; border: string; glow: string }> = {
                        fuchsia: { bar: 'bg-fuchsia-500', cat: 'text-fuchsia-400', border: 'border-fuchsia-400/30 hover:border-fuchsia-400/70', glow: 'rgba(217,70,239,0.15)' },
                        cyan:    { bar: 'bg-cyan-500',    cat: 'text-cyan-400',    border: 'border-cyan-400/30 hover:border-cyan-400/70',    glow: 'rgba(34,211,238,0.15)' },
                        violet:  { bar: 'bg-violet-500',  cat: 'text-violet-400',  border: 'border-violet-400/30 hover:border-violet-400/70',  glow: 'rgba(167,139,250,0.15)' },
                        amber:   { bar: 'bg-amber-500',   cat: 'text-amber-400',   border: 'border-amber-400/30 hover:border-amber-400/70',   glow: 'rgba(251,191,36,0.15)' },
                        rose:    { bar: 'bg-rose-500',    cat: 'text-rose-400',    border: 'border-rose-400/30 hover:border-rose-400/70',    glow: 'rgba(251,113,133,0.15)' },
                        emerald: { bar: 'bg-emerald-500', cat: 'text-emerald-400', border: 'border-emerald-400/30 hover:border-emerald-400/70', glow: 'rgba(52,211,153,0.15)' },
                    };
                    const p = palettes[acc] ?? palettes.fuchsia;

                    return (
                        /* Each card is sticky — they stack on top of each other as you scroll */
                        <div
                            key={project.slug}
                            className="sticky top-0 w-full h-screen flex items-center justify-center px-4 md:px-16"
                            style={{ zIndex: i + 1 }}
                        >
                            <ScrollReveal direction="up" delay={0.1}>
                                <Link
                                    href={`/projects/${project.slug}`}
                                    className={`card-glitch group relative flex flex-col md:flex-row overflow-hidden w-full max-w-4xl bg-black/80 backdrop-blur-2xl border rounded-2xl shadow-2xl transition-all duration-500 ${p.border}`}
                                    style={{
                                        boxShadow: `0 30px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.06)`,
                                        '--glitch-delay': `-${(i * 3.7) % 8}s`,
                                    } as React.CSSProperties}
                                >
                                    {/* Accent top bar */}
                                    <div className={`absolute top-0 left-0 right-0 h-[2px] ${p.bar} opacity-70 z-30`} />

                                    {/* Corner brackets */}
                                    <span className="absolute top-2 left-2 w-4 h-4 border-t border-l border-white/20 z-30" />
                                    <span className="absolute top-2 right-2 w-4 h-4 border-t border-r border-white/20 z-30" />
                                    <span className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-white/20 z-30" />
                                    <span className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-white/20 z-30" />

                                    {/* Left: Image / 3D Model */}
                                    <div className="relative w-full md:w-[45%] h-64 md:h-auto flex-shrink-0 overflow-hidden">
                                        {/* Project image from first media item */}
                                        {project.media[0]?.type === 'image' && project.media[0]?.url && (
                                            <img
                                                src={project.media[0].url}
                                                alt={project.media[0].alt}
                                                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                                draggable={false}
                                            />
                                        )}
                                        {/* 3D model overlay for supported projects */}
                                        {(project.slug === "trionda-ball-wc-2026" || project.slug === "redbull-gold-concept") && (
                                            <div
                                                style={{ viewTransitionName: `project-model-${project.slug}` }}
                                                className="absolute inset-0 z-10"
                                            >
                                                <ProjectModel index={i} />
                                            </div>
                                        )}
                                        {/* Dark overlay gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60 z-20 md:block hidden" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20 md:hidden block" />

                                        {/* Large index number watermark */}
                                        <div className="absolute bottom-4 left-4 font-mono font-black text-[80px] md:text-[120px] text-white/[0.04] select-none pointer-events-none leading-none z-0">
                                            {String(i + 1).padStart(2, '0')}
                                        </div>
                                    </div>

                                    {/* Right: Text Content */}
                                    <div className="flex-1 flex flex-col justify-between p-6 md:p-10">
                                        {/* Top: Meta */}
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] ${p.cat}`}>
                                                {project.category}
                                            </span>
                                            <span className="font-mono text-[10px] md:text-xs text-white/30 tracking-widest">
                                                {project.timeline}
                                            </span>
                                        </div>

                                        {/* Middle: Title + Description */}
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h3 className="font-siegra text-2xl md:text-4xl font-bold text-white tracking-wider uppercase drop-shadow-lg mb-3 group-hover:text-white transition-colors leading-tight">
                                                {project.title}
                                            </h3>
                                            <p className="font-cyber text-white/50 text-sm leading-relaxed line-clamp-3 group-hover:text-white/70 transition-colors">
                                                {project.description}
                                            </p>
                                        </div>

                                        {/* Bottom: Client + CTA */}
                                        <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/[0.06]">
                                            <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">
                                                {project.client}
                                            </span>
                                            <span className={`font-mono text-xs ${p.cat} flex items-center gap-2 group-hover:gap-3 transition-all duration-300`}>
                                                VIEW PROJECT
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:translate-x-1 transition-transform duration-300">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </ScrollReveal>
                        </div>
                    );
                })}
            </div>

            {/* ── Bottom spacer ──────────────────────────────── */}
            <div className="h-24 w-full" />
        </section>
    );
}
