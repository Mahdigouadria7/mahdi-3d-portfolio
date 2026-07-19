"use client";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TiltCard from "@/components/ui/TiltCard";

/* ── Service data ────────────────────────────────────────────────── */
const services = [
    {
        label: "01",
        icon: "✦",
        title: "3D Modeling & Generalist",
        tags: ["Hard Surface", "Organic", "Rendering"],
        description: "From concept sketch to photorealistic render — hard surface, organic sculpting, shading, and full scene composition in Blender and ZBrush.",
        accent: { text: "text-fuchsia-400", border: "border-fuchsia-400/25", borderHover: "group-hover:border-fuchsia-400/70", top: "bg-fuchsia-500", glow: "rgba(217,70,239,0.15)", badge: "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/30" },
        stat: 95,
        statLabel: "Proficiency",
        layout: "featured", // 2-col tall
    },
    {
        label: "02",
        icon: "⬡",
        title: "Real-Time Experiences",
        tags: ["Three.js", "WebGL", "R3F"],
        description: "Interactive 3D web apps built with Three.js, React Three Fiber and custom GLSL shaders.",
        accent: { text: "text-cyan-400", border: "border-cyan-400/25", borderHover: "group-hover:border-cyan-400/70", top: "bg-cyan-500", glow: "rgba(34,211,238,0.15)", badge: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30" },
        stat: 88,
        statLabel: "Proficiency",
        layout: "small",
    },
    {
        label: "03",
        icon: "◈",
        title: "Motion & Animation",
        tags: ["GSAP", "Blender", "Cinema 4D"],
        description: "GSAP scroll physics, Blender simulations, and procedural animation that makes every frame count.",
        accent: { text: "text-violet-400", border: "border-violet-400/25", borderHover: "group-hover:border-violet-400/70", top: "bg-violet-500", glow: "rgba(139,92,246,0.15)", badge: "bg-violet-500/10 text-violet-300 border-violet-500/30" },
        stat: 92,
        statLabel: "Proficiency",
        layout: "small",
    },
    {
        label: "04",
        icon: "⊕",
        title: "UI/UX Engineering",
        tags: ["Next.js", "Figma", "Accessibility"],
        description: "Pixel-perfect, accessible, performant interfaces. Design system to production in a single sprint.",
        accent: { text: "text-amber-400", border: "border-amber-400/25", borderHover: "group-hover:border-amber-400/70", top: "bg-amber-500", glow: "rgba(245,158,11,0.15)", badge: "bg-amber-500/10 text-amber-300 border-amber-500/30" },
        stat: 90,
        statLabel: "Proficiency",
        layout: "wide",  // full width strip
    },
    {
        label: "05",
        icon: "◎",
        title: "Brand Identity & VFX",
        tags: ["After Effects", "Compositing", "Motion Branding"],
        description: "Cinematic VFX compositing and motion brand kits for commercial and creative projects.",
        accent: { text: "text-rose-400", border: "border-rose-400/25", borderHover: "group-hover:border-rose-400/70", top: "bg-rose-500", glow: "rgba(251,113,133,0.15)", badge: "bg-rose-500/10 text-rose-300 border-rose-500/30" },
        stat: 82,
        statLabel: "Proficiency",
        layout: "wide",  // full width strip
    },
];

/* ── Stat Bar ───────────────────────────────────────────────────── */
function StatBar({ value, color }: { value: number; color: string }) {
    return (
        <div className="flex items-center gap-3 mt-4">
            <div className="flex-1 h-[2px] bg-white/10 relative overflow-hidden">
                <div
                    className={`absolute left-0 top-0 h-full ${color} transition-all duration-1000`}
                    style={{ width: `${value}%` }}
                />
            </div>
            <span className="font-mono text-[10px] text-white/30 tabular-nums">{value}%</span>
        </div>
    );
}

/* ── Corner HUD brackets ───────────────────────────────────────── */
function Corners({ color }: { color: string }) {
    const s = { borderColor: color, opacity: 0.5 } as React.CSSProperties;
    const base = "absolute w-3 h-3 pointer-events-none";
    return (
        <>
            <span className={`${base} top-0 left-0 border-t border-l`} style={s} />
            <span className={`${base} top-0 right-0 border-t border-r`} style={s} />
            <span className={`${base} bottom-0 left-0 border-b border-l`} style={s} />
            <span className={`${base} bottom-0 right-0 border-b border-r`} style={s} />
        </>
    );
}

export default function GamesSection() {
    const featured = services[0];
    const smalls   = services.slice(1, 3);
    const wides    = services.slice(3);

    return (
        <section
            aria-labelledby="services-heading"
            className="relative w-full min-h-screen flex-shrink-0 flex items-center justify-center p-6 md:p-16 overflow-hidden pointer-events-none"
        >
            {/* Subtle hatch pattern bg */}
            <div className="absolute inset-0 hatch-bg opacity-30 pointer-events-none" />

            <div className="max-w-7xl w-full mx-auto relative z-10 pointer-events-auto flex flex-col justify-center py-20 gap-4">

                {/* ── Section Header ─────────────────────────────── */}
                <ScrollReveal direction="right" delay={0.1}>
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <span className="font-mono text-[10px] font-bold tracking-widest text-fuchsia-400 border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1">02</span>
                                <div className="flex items-center gap-0">
                                    <div className="w-8 h-[2px] bg-fuchsia-500" />
                                    <div className="w-8 h-[2px] bg-cyan-500" />
                                    <div className="w-8 h-[2px] bg-violet-500" />
                                </div>
                                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
                                    Capabilities
                                </span>
                            </div>
                            <h2
                                id="services-heading"
                                className="text-5xl md:text-8xl font-siegra font-black tracking-widest text-white uppercase leading-none"
                            >
                                SERVICES<br />&amp; SKILLS
                            </h2>
                            {/* Dual accent line */}
                            <div className="flex items-center gap-0 mt-5">
                                <div className="w-10 h-[2px] bg-fuchsia-500" />
                                <div className="w-10 h-[2px] bg-cyan-500" />
                                <div className="w-10 h-[2px] bg-violet-500" />
                                <div className="w-10 h-[2px] bg-amber-500" />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 max-w-xs">
                            <p className="font-cyber text-white/40 text-sm leading-relaxed">
                                A multidisciplinary creative with 5+ years across 3D, real-time graphics, and modern web engineering.
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="font-mono text-[9px] text-white/20 tracking-widest">AVAILABLE FOR WORK</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

                {/* ── Row 1: Featured (2/3) + Two Small Cards (1/3) ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* FEATURED — tall, 2-col */}
                    <ScrollReveal direction="left" delay={0.2} className="md:col-span-2">
                        <TiltCard
                            glowColor={featured.accent.glow}
                            intensity={6}
                            className="h-full"
                        >
                            <article
                                tabIndex={0}
                                className={`group relative flex flex-col justify-between h-full min-h-[340px] p-8 md:p-10 bg-[#0c0a14] border ${featured.accent.border} ${featured.accent.borderHover} overflow-hidden cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fuchsia-400`}
                            >
                                <Corners color="rgba(217,70,239,0.5)" />

                                {/* Accent top bar */}
                                <div className={`absolute top-0 left-0 right-0 h-[2px] ${featured.accent.top} opacity-60`} />

                                {/* Background ghost number */}
                                <div className="absolute -right-6 -bottom-10 text-[180px] font-black text-white/[0.025] leading-none select-none pointer-events-none font-mono">
                                    01
                                </div>

                                {/* Hatch accent patch */}
                                <div className="absolute top-4 right-4 w-16 h-8 hatch-bg opacity-40" />

                                {/* Top row */}
                                <div className="flex items-start justify-between relative z-10">
                                    <div className="flex flex-col gap-3">
                                        <span className={`text-5xl ${featured.accent.text} select-none leading-none`} aria-hidden>
                                            {featured.icon}
                                        </span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {featured.tags.map(t => (
                                                <span key={t} className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 border ${featured.accent.badge}`}>
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <span className={`font-mono text-[10px] font-bold tracking-widest px-2.5 py-1 border ${featured.accent.badge}`}>
                                        {featured.label}
                                    </span>
                                </div>

                                {/* Bottom content */}
                                <div className="relative z-10">
                                    <h3 className={`text-2xl md:text-4xl font-bold text-white mb-3 tracking-wide leading-tight`}>
                                        {featured.title}
                                    </h3>
                                    <p className="text-white/50 text-sm leading-relaxed max-w-lg font-cyber">
                                        {featured.description}
                                    </p>
                                    <StatBar value={featured.stat} color={featured.accent.top} />

                                    {/* Hover CTA */}
                                    <div className="flex items-center gap-2 mt-5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        <span className={`font-mono text-[10px] tracking-widest ${featured.accent.text}`}>VIEW WORK</span>
                                        <div className={`w-6 h-px ${featured.accent.top}`} />
                                        <span className={`${featured.accent.text} text-xs`}>→</span>
                                    </div>
                                </div>
                            </article>
                        </TiltCard>
                    </ScrollReveal>

                    {/* Right column: 2 stacked small cards */}
                    <div className="flex flex-col gap-4">
                        {smalls.map((svc, i) => (
                            <ScrollReveal key={svc.label} direction="right" delay={0.25 + i * 0.12}>
                                <TiltCard glowColor={svc.accent.glow} intensity={8} className="h-full">
                                    <article
                                        tabIndex={0}
                                        className={`group relative flex flex-col justify-between h-full min-h-[160px] p-6 bg-[#0c0a14] border ${svc.accent.border} ${svc.accent.borderHover} overflow-hidden cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fuchsia-400`}
                                    >
                                        <Corners color={svc.accent.text.replace("text-", "").replace("400", "")} />
                                        <div className={`absolute top-0 left-0 right-0 h-[2px] ${svc.accent.top} opacity-50`} />

                                        <div className="absolute -right-2 -bottom-4 text-[80px] font-black text-white/[0.025] leading-none select-none pointer-events-none font-mono">
                                            {svc.label.slice(1)}
                                        </div>

                                        <div className="flex items-start justify-between relative z-10">
                                            <span className={`text-2xl ${svc.accent.text}`} aria-hidden>{svc.icon}</span>
                                            <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border ${svc.accent.badge}`}>{svc.label}</span>
                                        </div>

                                        <div className="relative z-10">
                                            <h3 className="text-base font-bold text-white mb-1 tracking-wide">{svc.title}</h3>
                                            <p className="text-white/40 text-[11px] leading-relaxed">{svc.description}</p>
                                            <StatBar value={svc.stat} color={svc.accent.top} />
                                        </div>
                                    </article>
                                </TiltCard>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                {/* ── Row 2: Two Wide Strip Cards ─────────────────── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wides.map((svc, i) => (
                        <ScrollReveal key={svc.label} direction="up" delay={0.35 + i * 0.1}>
                            <TiltCard glowColor={svc.accent.glow} intensity={5} className="h-full">
                                <article
                                    tabIndex={0}
                                    className={`group relative flex flex-row items-center gap-6 h-full min-h-[120px] px-8 py-6 bg-[#0c0a14] border ${svc.accent.border} ${svc.accent.borderHover} overflow-hidden cursor-pointer transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fuchsia-400`}
                                >
                                    <Corners color={svc.accent.text.replace("text-", "")} />
                                    <div className={`absolute top-0 left-0 bottom-0 w-[2px] ${svc.accent.top} opacity-50`} />

                                    {/* Big icon left */}
                                    <span className={`text-4xl ${svc.accent.text} flex-shrink-0 select-none`} aria-hidden>{svc.icon}</span>

                                    {/* Divider */}
                                    <div className="w-px h-12 bg-white/10 flex-shrink-0" />

                                    <div className="flex flex-col gap-1 flex-1">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-base font-bold text-white tracking-wide">{svc.title}</h3>
                                            <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 border ${svc.accent.badge} opacity-60 group-hover:opacity-100 transition-opacity`}>{svc.label}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {svc.tags.map(t => (
                                                <span key={t} className="text-[9px] font-mono uppercase tracking-widest text-white/25">{t}</span>
                                            ))}
                                        </div>
                                        <StatBar value={svc.stat} color={svc.accent.top} />
                                    </div>

                                    {/* Hover arrow */}
                                    <span className={`${svc.accent.text} text-lg opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300`}>→</span>
                                </article>
                            </TiltCard>
                        </ScrollReveal>
                    ))}
                </div>

                {/* ── Section footer ──────────────────────────────── */}
                <ScrollReveal direction="up" delay={0.6}>
                    <div className="flex items-center gap-4 mt-4">
                        <span className="font-mono text-5xl font-black text-white/[0.06] leading-none">02</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                        <span className="font-mono text-[9px] text-white/20 tracking-widest uppercase">5 Disciplines</span>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
