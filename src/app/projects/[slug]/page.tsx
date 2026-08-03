import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Metadata } from "next";
import AnimatedProjectHero from "@/components/sections/AnimatedProjectHero";
import LuxuryRedBullCommercialHero from "@/components/sections/LuxuryRedBullCommercialHero";
import DanupBottleHero from "@/components/sections/DanupBottleHero";
import DanaoBottleHero from "@/components/sections/DanaoBottleHero";
import SamsungHero from "@/components/SamsungHero";
import BackButton from "@/components/ui/BackButton";
import PreviousProjectButton from "@/components/ui/PreviousProjectButton";
import NextProjectButton from "@/components/ui/NextProjectButton";
import LightboxImage from "@/components/ui/LightboxImage";
import ScrollReveal from "@/components/ui/ScrollReveal";
import LazyVideo from "@/components/ui/LazyVideo";

// Next.js 15+ requires params to be treated as a Promise
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = projects.find(p => p.slug === slug);
    if (!project) return { title: 'Project Not Found' };
    return {
        title: `${project.title} | Mahdi Gouadria 3D Studio`,
        description: project.description
    };
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects.find(p => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <main className={`min-h-screen selection:bg-[#d4cfc9]/20 selection:text-white pb-32 relative overflow-hidden ${project.slug === 'samsung-s22-ultra-3d-hero' ? 'bg-[#0c0c0e] text-white' : 'bg-[#f5f4ef] text-[#191919]'}`}>

            {/* Top Navigation Bar */}
            <nav className="fixed top-0 left-0 w-full z-50 p-4 md:px-10 md:py-5 flex justify-between items-start pointer-events-none gap-4">
                <div className="pointer-events-auto flex-1 flex justify-start">
                    <PreviousProjectButton currentSlug={project.slug} />
                </div>
                <div className="pointer-events-auto flex-1 flex justify-end">
                    <NextProjectButton currentSlug={project.slug} />
                </div>
            </nav>

            {/* Bottom Right Floating Back Button */}
            <div className="fixed bottom-8 right-8 z-50 pointer-events-none">
                <BackButton />
            </div>

            {/* ── 1. 3D Intro & Interactive Canvas Hero ── */}
            {project.slug === "samsung-s22-ultra-3d-hero" ? (
                <SamsungHero />
            ) : project.slug === "redbull-gold-concept" ? (
                <LuxuryRedBullCommercialHero />
            ) : project.slug === "danup-x-ala" ? (
                <DanupBottleHero />
            ) : project.slug === "danao-3d-commercial" ? (
                <DanaoBottleHero />
            ) : (
                <AnimatedProjectHero project={project} index={projects.findIndex(p => p.slug === project.slug)} />
                      {/* ── 2. Metadata Bar ── */}
            {project.slug === 'samsung-s22-ultra-3d-hero' ? (
                /* Samsung: Liquid Glassmorphic Metadata Container */
                <div className="max-w-[1280px] mx-auto px-6 md:px-14 relative z-40 my-6">
                    <div 
                        className="w-full px-8 md:px-12 py-6 rounded-[24px] flex flex-wrap justify-between items-center gap-6"
                        style={{
                            background: "rgba(18, 14, 32, 0.45)",
                            backdropFilter: "blur(30px) saturate(180%)",
                            WebkitBackdropFilter: "blur(30px) saturate(180%)",
                            border: "1px solid rgba(255, 255, 255, 0.18)",
                            boxShadow: "inset 0 1px 1.5px 0 rgba(255, 255, 255, 0.4), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.5), 0 20px 50px -10px rgba(0, 0, 0, 0.6)"
                        }}
                    >
                        {[
                            { label: 'Client', value: project.client },
                            { label: 'Role', value: project.role },
                            { label: 'Year', value: project.timeline },
                            { label: 'Medium', value: 'CGI · 3D · WebGL' },
                        ].map((item) => (
                            <div key={item.label} className="flex flex-col gap-1">
                                <p className="text-purple-300/70 text-[9px] tracking-[0.3em] font-mono uppercase">{item.label}</p>
                                <p className="text-white text-sm md:text-base font-light tracking-wide">{item.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                /* Default: warm dark bar */
                <div className="w-full relative z-40 -mt-[48px] bg-[#191919] text-white border-y border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.6)] py-8 pointer-events-auto">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
                        <div className="flex-1 border-l-2 border-[#ffff7b] pl-6 hover:border-white transition-colors duration-500">
                            <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-1.5 text-[#ffff7b] font-bold">Client</p>
                            <h4 className="font-sans font-bold text-base md:text-xl text-white tracking-tight uppercase">{project.client}</h4>
                        </div>
                        <div className="flex-1 border-l-2 border-[#ffff7b] pl-6 hover:border-white transition-colors duration-500">
                            <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-1.5 text-[#ffff7b] font-bold">Role</p>
                            <div className="font-sans font-bold text-base md:text-xl text-white tracking-tight uppercase">
                                {project.slug === "danup-x-ala" ? (
                                    <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                        <span>
                                            3D Artist:{" "}
                                            <a href="https://www.behance.net/mahdigouadria" target="_blank" rel="noopener noreferrer" className="text-[#ffff7b] underline hover:text-white transition-colors">Mahdi Gouadria</a>
                                        </span>
                                        <span className="text-white/40">|</span>
                                        <span>
                                            Motion Designer:{" "}
                                            <a href="https://www.behance.net/MabroukAziz" target="_blank" rel="noopener noreferrer" className="text-[#ffff7b] underline hover:text-white transition-colors">Mabrouk Aziz</a>
                                        </span>
                                    </span>
                                ) : (project.role)}
                            </div>
                        </div>
                        <div className="flex-1 border-l-2 border-[#ffff7b] pl-6 hover:border-white transition-colors duration-500">
                            <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-1.5 text-[#ffff7b] font-bold">Timeline</p>
                            <h4 className="font-sans font-bold text-base md:text-xl text-white tracking-tight uppercase">{project.timeline}</h4>
                        </div>
                    </div>
                </div>
            )}

            {/* ── 3. Samsung Cinematic Project Experience ── */}
            {project.slug === 'samsung-s22-ultra-3d-hero' ? (
                <section
                    className="relative z-20"
                    style={{ background: '#0c0c0e', fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >

                    {/* ════════════════════════════════════════════════
                        SCENE 01 — PROJECT STATEMENT
                        Editorial asymmetric. Ghost numbers. Open space.
                    ════════════════════════════════════════════════ */}
                    <div className="max-w-[1280px] mx-auto px-6 md:px-14 pt-28 pb-24">
                        <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-20 items-start">

                            {/* Ghost chapter number */}
                            <ScrollReveal direction="up" delay={0.05}>
                                <div
                                    style={{
                                        fontSize: 'clamp(7rem, 15vw, 17rem)',
                                        fontWeight: 300,
                                        color: 'rgba(255,255,255,0.03)',
                                        lineHeight: 0.85,
                                        letterSpacing: '-0.05em',
                                        userSelect: 'none',
                                        marginTop: '-1.5rem',
                                    }}
                                >
                                    01
                                </div>
                            </ScrollReveal>

                            {/* Statement content */}
                            <ScrollReveal direction="up" delay={0.15}>
                                <div>
                                    <div className="text-purple-300/80 text-[10px] font-mono tracking-[0.35em] uppercase mb-7">
                                        Project Statement
                                    </div>

                                    <p style={{ color: '#e4e4e7', fontSize: '1.1rem', lineHeight: 1.9, letterSpacing: '0.005em', maxWidth: '540px', marginBottom: '36px', fontWeight: 300 }}>
                                        {project.description}
                                    </p>

                                    {/* Challenge */}
                                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '28px', marginBottom: '28px' }}>
                                        <div className="text-purple-300/70 text-[9px] font-mono tracking-[0.3em] uppercase mb-2">Challenge</div>
                                        <p style={{ color: '#a1a1aa', fontSize: '0.9375rem', lineHeight: 1.85, maxWidth: '500px', fontWeight: 300 }}>{project.challenge}</p>
                                    </div>

                                    {/* Approach */}
                                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '28px', marginBottom: '40px' }}>
                                        <div className="text-purple-300/70 text-[9px] font-mono tracking-[0.3em] uppercase mb-2">Approach</div>
                                        <p style={{ color: '#a1a1aa', fontSize: '0.9375rem', lineHeight: 1.85, maxWidth: '500px', fontWeight: 300 }}>{project.solution}</p>
                                    </div>

                                    {/* Tech stack — hairline-separated */}
                                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px', display: 'flex', flexWrap: 'wrap' }}>
                                        {['Blender 3D', 'Geometry Nodes', 'After Effects', 'DaVinci Resolve', 'Three.js'].map((t, i, arr) => (
                                            <span
                                                key={t}
                                                className="text-white/70 text-[9px] font-mono tracking-[0.22em] uppercase"
                                                style={{
                                                    paddingRight: i < arr.length - 1 ? '18px' : '0',
                                                    marginRight: i < arr.length - 1 ? '18px' : '0',
                                                    borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                                                    lineHeight: 2.2,
                                                }}
                                            >
                                                {t}
                                            </span>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                    {/* Full-width hairline */}
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

                    {/* ════════════════════════════════════════════════
                        SCENE 02 — CINEMATIC PRODUCTIONS
                        Two portrait films. Asymmetric editorial layout.
                    ════════════════════════════════════════════════ */}
                    <div className="max-w-[1280px] mx-auto px-6 md:px-14 py-24">

                        <ScrollReveal direction="up" delay={0.1}>
                            <div style={{ marginBottom: '56px' }}>
                                <div style={{ color: '#5a5654', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '18px' }}>
                                    02 — Cinematic Productions
                                </div>
                                <h2 style={{
                                    color: '#f2ede8',
                                    fontSize: 'clamp(2.2rem, 4.5vw, 4rem)',
                                    fontWeight: 300,
                                    letterSpacing: '-0.025em',
                                    lineHeight: 1.05,
                                    margin: 0,
                                }}>
                                    Two films. One product story.
                                </h2>
                            </div>
                        </ScrollReveal>

                        {/* ── Films: height-driven, viewport-fitted portrait layout ── */}

                        {/* Cinematic wash behind both videos */}
                        <div style={{ position: 'relative', overflow: 'hidden' }}>
                            <div style={{
                                position: 'absolute', inset: '-40px -60px',
                                background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(20,20,26,0.9) 0%, transparent 100%)',
                                pointerEvents: 'none',
                                zIndex: 0,
                            }} />

                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                                gap: '32px',
                                position: 'relative',
                                zIndex: 1,
                            }}>

                                {/* ── Film 01 ── */}
                                <ScrollReveal direction="up" delay={0.15}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                        {/* Caption above */}
                                        <div style={{
                                            color: '#3a3836',
                                            fontSize: '9px',
                                            letterSpacing: '0.32em',
                                            textTransform: 'uppercase',
                                            marginBottom: '14px',
                                            paddingLeft: '2px',
                                        }}>
                                            Film 01 — Z Flip 6 Lifestyle Reel
                                        </div>

                                        {/* Video container: height drives width */}
                                        <div style={{
                                            height: 'min(78vh, 660px)',
                                            aspectRatio: '9 / 16',
                                            background: '#000',
                                            border: '1px solid rgba(255,255,255,0.09)',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            flexShrink: 0,
                                        }}>
                                            <video
                                                src="https://res.cloudinary.com/zu63qo7h/video/upload/v1785516657/portfolio/samsung/videos/samsung_3d_zflip_6.mp4"
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                controls
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                            />
                                        </div>

                                        {/* Meta below */}
                                        <div style={{
                                            marginTop: '18px',
                                            borderTop: '1px solid rgba(255,255,255,0.06)',
                                            paddingTop: '18px',
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '12px',
                                            width: '100%',
                                        }}>
                                            {[
                                                { label: '3D Engine', val: 'Blender' },
                                                { label: 'VFX', val: 'Geo Nodes' },
                                                { label: 'Composite', val: 'After Effects' },
                                                { label: 'Grade', val: 'DaVinci' },
                                            ].map(s => (
                                                <div key={s.label}>
                                                    <div style={{ color: '#3a3836', fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '3px' }}>{s.label}</div>
                                                    <div style={{ color: '#9a9490', fontSize: '11px' }}>{s.val}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* ── Film 02 — vertically offset for editorial rhythm ── */}
                                <ScrollReveal direction="up" delay={0.28}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginTop: '80px' }}>
                                        {/* Caption above */}
                                        <div style={{
                                            color: '#3a3836',
                                            fontSize: '9px',
                                            letterSpacing: '0.32em',
                                            textTransform: 'uppercase',
                                            marginBottom: '14px',
                                            paddingLeft: '2px',
                                        }}>
                                            Film 02 — CGI Product Reveal
                                        </div>

                                        {/* Video container: height drives width */}
                                        <div style={{
                                            height: 'min(78vh, 660px)',
                                            aspectRatio: '9 / 16',
                                            background: '#000',
                                            border: '1px solid rgba(255,255,255,0.09)',
                                            overflow: 'hidden',
                                            position: 'relative',
                                            flexShrink: 0,
                                        }}>
                                            <video
                                                src="https://res.cloudinary.com/zu63qo7h/video/upload/v1785516709/portfolio/samsung/videos/samsung_cgi_final.mp4"
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                controls
                                                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                            />
                                        </div>

                                        {/* Meta below */}
                                        <div style={{
                                            marginTop: '18px',
                                            borderTop: '1px solid rgba(255,255,255,0.06)',
                                            paddingTop: '18px',
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr',
                                            gap: '12px',
                                            width: '100%',
                                        }}>
                                            {[
                                                { label: 'VFX System', val: 'Geo Nodes' },
                                                { label: 'Resolution', val: '4K · 60FPS' },
                                                { label: 'Post', val: 'DaVinci + AE' },
                                                { label: 'Render', val: 'Cycles' },
                                            ].map(s => (
                                                <div key={s.label}>
                                                    <div style={{ color: '#3a3836', fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', marginBottom: '3px' }}>{s.label}</div>
                                                    <div style={{ color: '#9a9490', fontSize: '11px' }}>{s.val}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollReveal>

                            </div>
                        </div>
                    </div>

                    {/* Full-width hairline */}
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

                    {/* ════════════════════════════════════════════════
                        SCENE 03 — PRODUCTION PIPELINE
                        Horizontal hairline columns. No cards.
                    ════════════════════════════════════════════════ */}
                    <div className="max-w-[1280px] mx-auto px-6 md:px-14 py-24">

                        <ScrollReveal direction="up" delay={0.1}>
                            <div style={{ marginBottom: '56px' }}>
                                <div style={{ color: '#5a5654', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '18px' }}>
                                    03 — Production Pipeline
                                </div>
                                <h2 style={{
                                    color: '#f2ede8',
                                    fontSize: 'clamp(2rem, 3.2vw, 3.2rem)',
                                    fontWeight: 300,
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1.1,
                                    margin: 0,
                                }}>
                                    Craft in every layer.
                                </h2>
                            </div>
                        </ScrollReveal>

                        <div
                            className="grid md:grid-cols-3"
                            style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
                        >
                            {[
                                {
                                    num: '01',
                                    title: '3D Modeling & Lighting',
                                    tool: 'Blender 3D',
                                    desc: 'Precision device modeling with PBR materials — glass, titanium frame, and matte surfaces rendered under studio area lighting.',
                                },
                                {
                                    num: '02',
                                    title: 'Procedural VFX',
                                    tool: 'Geometry Nodes + After Effects',
                                    desc: 'Custom simulation-based particle trail built in Geometry Nodes. Composited and motion-designed in After Effects.',
                                },
                                {
                                    num: '03',
                                    title: 'Color Science',
                                    tool: 'DaVinci Resolve',
                                    desc: 'Multi-pass composite with professional color grading. Controlled contrast, deep shadows, natural highlights.',
                                },
                            ].map((step, i) => (
                                <ScrollReveal key={step.num} direction="up" delay={i * 0.08}>
                                    <div style={{
                                        padding: '40px 36px 40px 0',
                                        borderRight: i < 2 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                                        paddingLeft: i > 0 ? '36px' : '0',
                                    }}>
                                        <div style={{ color: '#3a3836', fontSize: '9px', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '28px' }}>
                                            {step.num}
                                        </div>
                                        <div style={{ color: '#f2ede8', fontSize: '1rem', fontWeight: 400, letterSpacing: '-0.01em', marginBottom: '8px', lineHeight: 1.4 }}>
                                            {step.title}
                                        </div>
                                        <div style={{ color: '#3a3836', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: '18px' }}>
                                            {step.tool}
                                        </div>
                                        <p style={{ color: '#6b6b6e', fontSize: '0.875rem', lineHeight: 1.85 }}>
                                            {step.desc}
                                        </p>
                                    </div>
                                </ScrollReveal>
                            ))}
                        </div>
                    </div>

                    {/* Full-width hairline */}
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

                    {/* ════════════════════════════════════════════════
                        SCENE 04 — ENGINEERING BREAKDOWN
                        Full-bleed node tree images. Gallery-style.
                    ════════════════════════════════════════════════ */}
                    <div className="max-w-[1280px] mx-auto px-6 md:px-14 py-24">

                        <ScrollReveal direction="up" delay={0.1}>
                            <div style={{ marginBottom: '56px' }}>
                                <div style={{ color: '#5a5654', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '18px' }}>
                                    04 — Engineering Breakdown
                                </div>
                                <h2 style={{
                                    color: '#f2ede8',
                                    fontSize: 'clamp(2rem, 3.2vw, 3.2rem)',
                                    fontWeight: 300,
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1.1,
                                    margin: 0,
                                }}>
                                    Procedural emission trail system.
                                </h2>
                            </div>
                        </ScrollReveal>

                        {/* Geometry Nodes */}
                        <ScrollReveal direction="up" delay={0.12}>
                            <div style={{ marginBottom: '72px' }}>
                                <div style={{ color: '#3a3836', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px' }}>
                                    Node System — Geometry Nodes
                                </div>
                                <div style={{ background: '#080809', border: '1px solid rgba(255,255,255,0.07)', padding: '3px', overflow: 'hidden' }}>
                                    <LightboxImage
                                        src="/projects/samsung/nodes/samsung_geonodes_tree.png"
                                        alt="Blender Geometry Nodes Architecture"
                                        className="w-full h-auto object-contain block"
                                    />
                                </div>
                                <div
                                    className="grid md:grid-cols-3"
                                    style={{ marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px' }}
                                >
                                    {[
                                        { label: 'Simulation Zone', desc: 'Point emitters spawned per frame inside a persistent loop. Continuously increments trail_age attribute, auto-deletes expired points.' },
                                        { label: 'NURBS Spline Conversion', desc: 'Point trajectories converted to continuous curves via Points to Curves, upgraded to NURBS for smooth organic arc interpolation.' },
                                        { label: 'Dynamic Radius Tapering', desc: 'Spline Parameter factor drives curve radius procedurally — prominent emissive head tapers to razor-sharp tail via Curve to Mesh.' },
                                    ].map((item, i) => (
                                        <div
                                            key={item.label}
                                            style={{
                                                padding: i === 0 ? '0 28px 0 0' : i === 2 ? '0 0 0 28px' : '0 28px',
                                                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                                            }}
                                        >
                                            <div style={{ color: '#9a9490', fontSize: '11px', letterSpacing: '0.08em', marginBottom: '8px' }}>{item.label}</div>
                                            <p style={{ color: '#5a5654', fontSize: '12px', lineHeight: 1.85 }}>{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* Shader Tree */}
                        <ScrollReveal direction="up" delay={0.15}>
                            <div style={{ marginBottom: '72px' }}>
                                <div style={{ color: '#3a3836', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '16px' }}>
                                    Node System — Shader Tree
                                </div>
                                <div style={{ background: '#080809', border: '1px solid rgba(255,255,255,0.07)', padding: '3px', overflow: 'hidden' }}>
                                    <LightboxImage
                                        src="/projects/samsung/nodes/samsung_shader_tree.png"
                                        alt="Blender Emission Trail Shader Tree"
                                        className="w-full h-auto object-contain block"
                                    />
                                </div>
                                <div
                                    className="grid md:grid-cols-3"
                                    style={{ marginTop: '24px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px' }}
                                >
                                    {[
                                        { label: 'Attribute Gradient', desc: 'Procedural gradient attribute from Geometry Nodes feeds dual Color Ramp maps — drives thermal intensity and alpha falloff.' },
                                        { label: '12,000K Blackbody Emission', desc: 'Blackbody node at 12,000K generates hyper-intense blue-white luminance. Multiplied by emission strength > 90 for physical bloom.' },
                                        { label: 'Glass BSDF Hybrid', desc: 'Emissive core blended with Glass BSDF via Add Shader — simulates internal glass refraction and soft edge caustics.' },
                                    ].map((item, i) => (
                                        <div
                                            key={item.label}
                                            style={{
                                                padding: i === 0 ? '0 28px 0 0' : i === 2 ? '0 0 0 28px' : '0 28px',
                                                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                                            }}
                                        >
                                            <div style={{ color: '#9a9490', fontSize: '11px', letterSpacing: '0.08em', marginBottom: '8px' }}>{item.label}</div>
                                            <p style={{ color: '#5a5654', fontSize: '12px', lineHeight: 1.85 }}>{item.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* Full-width hairline */}
                    <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }} />

                    {/* ════════════════════════════════════════════════
                        SCENE 05 — RENDER OUTPUT
                        Split comparison. Edge-to-edge. Captions below.
                    ════════════════════════════════════════════════ */}
                    <div className="max-w-[1280px] mx-auto px-6 md:px-14 pt-24 pb-36">

                        <ScrollReveal direction="up" delay={0.1}>
                            <div style={{ marginBottom: '56px' }}>
                                <div style={{ color: '#5a5654', fontSize: '9px', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '18px' }}>
                                    05 — Render Output
                                </div>
                                <h2 style={{
                                    color: '#f2ede8',
                                    fontSize: 'clamp(2rem, 3.2vw, 3.2rem)',
                                    fontWeight: 300,
                                    letterSpacing: '-0.02em',
                                    lineHeight: 1.1,
                                    margin: 0,
                                }}>
                                    Mesh to light.
                                </h2>
                            </div>
                        </ScrollReveal>

                        {/* Split comparison — 1px gap between images */}
                        <div
                            className="grid md:grid-cols-2"
                            style={{ gap: '1px', background: 'rgba(255,255,255,0.06)' }}
                        >
                            <ScrollReveal direction="up" delay={0.1}>
                                <div style={{ background: '#0c0c0e' }}>
                                    <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
                                        <LightboxImage
                                            src="/projects/samsung/nodes/samsung_trail_viewport_view.png"
                                            alt="Viewport Solid View — Procedural Geometry"
                                            className="w-full h-full object-cover block"
                                        />
                                    </div>
                                    <div style={{ padding: '20px 0 0' }}>
                                        <div style={{ color: '#3a3836', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '6px' }}>
                                            Viewport · Solid Mode
                                        </div>
                                        <p style={{ color: '#5a5654', fontSize: '12px', lineHeight: 1.75 }}>
                                            Procedural swept mesh geometry generated in realtime by the Geometry Nodes modifier stack.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal direction="up" delay={0.18}>
                                <div style={{ background: '#0c0c0e', paddingLeft: '28px' }}>
                                    <div style={{ aspectRatio: '4/5', overflow: 'hidden' }}>
                                        <LightboxImage
                                            src="/projects/samsung/nodes/samsung_trail_render_view.png"
                                            alt="Cycles Final Render — 12,000K Emissive Glow"
                                            className="w-full h-full object-cover block"
                                        />
                                    </div>
                                    <div style={{ padding: '20px 0 0' }}>
                                        <div style={{ color: '#3a3836', fontSize: '9px', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '6px' }}>
                                            Cycles · Final Render
                                        </div>
                                        <p style={{ color: '#5a5654', fontSize: '12px', lineHeight: 1.75 }}>
                                            12,000K Blackbody emission with Cycles multi-pass rendering and natural light falloff into deep space.
                                        </p>
                                    </div>
                                </div>
                            </ScrollReveal>
                        </div>

                    </div>

                </section>
            ) : (
                /* ── Default: warm cream editorial section ── */
                <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24 space-y-20 relative z-20">

                    {/* Editorial Overview Quote */}
                    <div className="relative z-10 pt-4 md:pt-8 mb-16">
                        <ScrollReveal direction="up" delay={0.2}>
                            <div className="w-full flex items-center gap-4 mb-8">
                                <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full shadow-xs border border-black/10">
                                    01
                                </span>
                                <div className="flex items-center gap-1">
                                    <div className="w-8 h-[2px] bg-[#191919]" />
                                    <div className="w-8 h-[2px] bg-[#191919]/30" />
                                </div>
                                <h2 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                    Project Overview
                                </h2>
                            </div>
                            <div className="pl-4 md:pl-16 max-w-5xl border-l-2 border-[#191919]">
                                <p className="font-playfair text-3xl md:text-5xl lg:text-6xl text-[#191919] leading-[1.16] font-bold tracking-tight">
                                    {project.fullDescription}
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>

                    {/* ── 4. Challenge & Solution Grid ── */}
                    <div className="relative z-10 pt-4 pb-12">
                        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-12">
                            <ScrollReveal direction="left" delay={0.1} className="w-full md:w-1/2 relative z-20">
                                <div className="w-full h-full bg-white border border-black/10 rounded-2xl p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] group transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">
                                            01
                                        </span>
                                        <h3 className="font-playfair text-2xl md:text-3xl text-[#191919] font-bold uppercase tracking-wide">
                                            The <em className="font-playfair italic font-normal">Challenge</em>
                                        </h3>
                                    </div>
                                    <p className="font-sans text-[#444444] text-base md:text-lg leading-relaxed font-normal">
                                        {project.challenge}
                                    </p>
                                </div>
                            </ScrollReveal>
                            <ScrollReveal direction="right" delay={0.3} className="w-full md:w-1/2 relative z-30">
                                <div className="w-full h-full bg-[#191919] text-white border border-black/10 rounded-2xl p-8 md:p-12 shadow-2xl group transition-all duration-500 hover:-translate-y-1 hover:border-[#ffff7b]/50">
                                    <div className="flex items-center gap-4 mb-6">
                                        <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full">
                                            02
                                        </span>
                                        <h3 className="font-playfair text-2xl md:text-3xl text-white font-bold uppercase tracking-wide">
                                            The <em className="font-playfair italic font-normal text-[#ffff7b]">Solution</em>
                                        </h3>
                                    </div>
                                    <p className="font-sans text-white/70 text-base md:text-lg leading-relaxed font-normal">
                                        {project.solution}
                                    </p>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                {/* ── 5. Project-Specific Deep Dives (Red Bull Gold / Trionda) ── */}
                {project.slug === "redbull-gold-concept" ? (
                    <div className="space-y-24 mt-8 relative z-10">
                        {/* 1. Concept Vision & Hero Vertical Video */}
                        <div className="relative z-10 pt-8 pb-12">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                                {/* Text Card (High Contrast Dark Nico Card) */}
                                <ScrollReveal direction="right" delay={0.3} className="w-full md:w-[60%] relative z-20 order-2 md:order-1">
                                    <div className="w-full h-full bg-[#191919] text-white border border-black/10 rounded-2xl p-8 md:p-12 shadow-2xl transition-all duration-700 flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3 py-1 rounded-full">01</span>
                                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#ffff7b] font-semibold">Luxury Brand Concept</span>
                                        </div>
                                        <h3 className="font-playfair text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6">
                                            THE 24K GOLD <em className="font-playfair italic font-normal text-[#ffff7b]">CONCEPT</em>
                                        </h3>
                                        <p className="font-sans text-white/80 text-base md:text-lg leading-relaxed font-normal mb-6">
                                            The <span className="text-[#ffff7b] font-semibold">Red Bull Gold Concept</span> is an ultra-premium visual exploration elevating the iconic energy drink into a high-end luxury collector&apos;s item. Combining polished 24K gold metallic reflections, micro-embossed bull typography, and dark matte obsidian finishes, this concept reimagines premium beverage branding for VIP launch events and high-impact CGI showcases.
                                        </p>
                                        <div className="flex flex-wrap gap-2.5 font-mono text-[11px] text-[#191919]">
                                            <span className="bg-[#ffff7b] font-bold px-3.5 py-1 rounded-full">OCTANE RENDER 2025</span>
                                            <span className="bg-[#ffff7b] font-bold px-3.5 py-1 rounded-full">PHYSICAL 24K GOLD PBR</span>
                                            <span className="bg-[#ffff7b] font-bold px-3.5 py-1 rounded-full">VOLUMETRIC SMOKE</span>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* Hero Vertical 9:16 Portrait Video (RETAINED AS-IS) */}
                                <ScrollReveal direction="left" delay={0.1} className="relative h-full w-full md:w-[35%] order-1 md:order-2 flex items-center justify-center mx-auto">
                                    <div className="w-full md:w-full aspect-[9/16] max-h-[620px] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden group relative shadow-2xl transition-all duration-500 hover:border-[#ffff7b]/60">
                                        <LazyVideo 
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/v1784899265/portfolio/redbull/darkgold_render_video.mp4" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                        />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 2. VIP Launch Event Ticket Banner */}
                        <div className="relative z-10 py-6">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-8">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">02</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        VIP Launch Event Pass &amp; Ticket Design
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal direction="up" delay={0.2} className="relative h-full w-full">
                                <div className="w-full aspect-[4966/2094] max-h-[380px] bg-white border border-black/10 rounded-2xl overflow-hidden group relative shadow-lg transition-all duration-500 hover:border-[#ffff7b]/60">
                                    <LightboxImage 
                                        src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/v1784899273/portfolio/redbull/ticket2.png" 
                                        alt="VIP Launch Event Pass" 
                                        className="w-full h-full object-contain bg-[#191919] group-hover:scale-[1.02] transition-transform duration-700" 
                                    />
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* 3. Volumetric Smoke Simulation */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-8">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">03</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        Volumetric Smoke Simulation (16:9 Horizontal)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal direction="up" delay={0.2} className="relative h-full w-full">
                                <div className="w-full aspect-video bg-[#191919] border border-black/10 rounded-2xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b]/60 transition-all group">
                                    <LazyVideo 
                                        src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/v1784899377/portfolio/redbull/redbull_smoke.mp4" 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                    />
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* 4. Liwa Desert Staging (1:1 Square Renders) */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">04</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        Liwa Desert Staging (1:1 Square Renders)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                                <ScrollReveal direction="left" delay={0.1} className="relative h-full w-full">
                                    <div className="w-full aspect-square bg-[#191919] border border-black/10 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage 
                                            src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/v1784899905/portfolio/redbull/liwa_redbull_2.webp" 
                                            alt="Liwa Desert Staging 1" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                        />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="right" delay={0.3} className="relative h-full w-full">
                                    <div className="w-full aspect-square bg-[#191919] border border-black/10 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage 
                                            src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/v1784899907/portfolio/redbull/liwa_redbull_3.webp" 
                                            alt="Liwa Desert Staging 2" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                        />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 5. 4K Gold Can Beauty Renders */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">05</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        4K Gold Can Beauty Renders (9:16 Vertical)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-3 gap-8">
                                <ScrollReveal direction="up" delay={0.1} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899913/portfolio/redbull/redbull_gold_darker.webp" alt="Deep Gold Specular Pass" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.2} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899924/portfolio/redbull/redbull_gold_2.webp" alt="Micro-Embossed Relief" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.3} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899929/portfolio/redbull/redbullr.webp" alt="Gold Master Render" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 6. Obsidian Studio Lighting Passes */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">06</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        Obsidian Studio Lighting Passes (9:16 Vertical)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-3 gap-8">
                                <ScrollReveal direction="up" delay={0.1} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899935/portfolio/redbull/redbull_environmet_xt.webp" alt="Studio High Key" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.2} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899938/portfolio/redbull/redbull_environmet.webp" alt="Studio Mid Pass" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.3} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899941/portfolio/redbull/redbull_environmetsss.webp" alt="Studio Subsurface Pass" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 7. Behind The Scenes & Geometry Wireframe */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">07</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        Behind The Scenes &amp; Viewport Geometry (9:16 Vertical)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-4 gap-6">
                                <ScrollReveal direction="up" delay={0.1} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899943/portfolio/redbull/viewport_darkgold.webp" alt="Viewport Wireframe" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.2} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/v1784899948/portfolio/redbull/teasing_redbull.gif" alt="Teaser Motion GIF" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.3} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/portfolio/redbull/redbull_environmet_xt.webp" alt="Geometry Test 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.4} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/portfolio/redbull/redbull_environmetsss.webp" alt="Displacement Test 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 8. Additional Video Reel & Motion Presentations */}
                        <div className="relative z-10 pt-8 pb-24">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">08</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        Additional Video Reels &amp; Motion Presentations (9:16 Vertical Videos)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                                <ScrollReveal direction="up" delay={0.1} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b]/60 transition-all group">
                                        <LazyVideo 
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/v1784900036/portfolio/redbull/darkgold_redbull.mp4" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                        />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.2} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b]/60 transition-all group">
                                        <LazyVideo 
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/v1784900082/portfolio/redbull/loop_linkedin.mp4" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                        />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                ) : project.slug === "danup-x-ala" ? (
                    <div className="space-y-24 mt-8 relative z-10">
                        {/* 1. Main 3D Commercial Showcase Video */}
                        <div className="relative z-10 pt-8 pb-12">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-8">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">01</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        Full 3D Commercial &amp; Packaging Showcase Film
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid lg:grid-cols-12 gap-8 items-center">
                                {/* 9:16 Vertical Video Frame */}
                                <ScrollReveal direction="up" delay={0.2} className="lg:col-span-5 relative h-full w-full">
                                    <div className="w-full aspect-[9/16] max-w-sm mx-auto bg-[#191919] border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b] hover:shadow-[0_0_30px_rgba(255,255,123,0.3)] transition-all duration-500 group">
                                        <LazyVideo
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/v1785168603/portfolio/danup/videos/Danup_x_ALA_3d_Video.mp4"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                    </div>
                                </ScrollReveal>

                                {/* 3D CGI Process & Technical Breakdown */}
                                <div className="lg:col-span-7 space-y-6">
                                    <ScrollReveal direction="up" delay={0.3}>
                                        <h4 className="font-playfair text-2xl md:text-3xl font-black uppercase text-[#191919] tracking-tight">
                                            3D CGI Production &amp; Visual Process
                                        </h4>
                                        <p className="font-sans text-sm md:text-base text-[#191919]/70 mt-2 leading-relaxed">
                                            A comprehensive 3D commercial campaign created for Danone Danup in collaboration with artist ALA. Built from scratch with photorealistic PBR material shaders, dynamic motion choreography, and high-impact social media formatting.
                                        </p>
                                    </ScrollReveal>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                        {[
                                            {
                                                step: "01",
                                                title: "3D Modeling & UV Mapping",
                                                desc: "High-precision CAD-level 3D bottle geometry, ergonomic grip contours, and seamless UV unwrapping for exact label texture placement."
                                            },
                                            {
                                                step: "02",
                                                title: "PBR Shading & Metallic Foil",
                                                desc: "Realistic PBR metallic lid shaders, glossy plastic cap bump maps, and sRGB color space base color maps across all 4 flavor variants."
                                            },
                                            {
                                                step: "03",
                                                title: "Orbiting Motion & Physics",
                                                desc: "3D floating flavor graphics with procedural sine-wave float physics, camera-facing tilt constraints, and dynamic orbital speeds."
                                            },
                                            {
                                                step: "04",
                                                title: "Studio Lighting & Color Grade",
                                                desc: "Cinematic 3-point HDRI studio lighting, dynamic rim highlights, and color grading tuned for mobile social platforms."
                                            }
                                        ].map((proc, pIdx) => (
                                            <ScrollReveal key={pIdx} direction="up" delay={0.1 * pIdx}>
                                                <div className="p-5 rounded-2xl bg-[#191919] border border-white/10 hover:border-[#ffff7b] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,123,0.15)] transition-all duration-300 group">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-mono text-xs font-bold text-[#ffff7b]">{proc.step}</span>
                                                        <div className="w-2 h-2 rounded-full bg-[#ffff7b] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                    <h5 className="font-sans font-bold text-sm text-white uppercase tracking-wider mb-1">
                                                        {proc.title}
                                                    </h5>
                                                    <p className="font-sans text-xs text-white/60 leading-relaxed">
                                                        {proc.desc}
                                                    </p>
                                                </div>
                                            </ScrollReveal>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Commercial Cuts & Social Campaign Videos */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">02</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        Commercial Cuts &amp; Social Campaign Videos
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-3 gap-8">
                                <ScrollReveal direction="up" delay={0.1} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b]/60 transition-all group">
                                        <LazyVideo
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/v1785168656/portfolio/danup/videos/st1.mp4"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.2} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b]/60 transition-all group">
                                        <LazyVideo
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/v1785168710/portfolio/danup/videos/st_3.mp4"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.3} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b]/60 transition-all group">
                                        <LazyVideo
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/v1785168731/portfolio/danup/videos/CTA_1.mp4"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 3. Flavor Elements & Graphic Sticker Showcase Grid */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">03</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        Interactive Orbiting Flavor Elements &amp; Brand Stickers
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                                {[
                                    { src: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171311/portfolio/danup/elements_named/Objet_dynamique_vectoriel.png", alt: "Danup x ALA Official Badge", title: "DANUP x ALA BADGE" },
                                    { src: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171313/portfolio/danup/elements_named/rapup-.png", alt: "RapUp Special Edition", title: "RAPUP EDITION" },
                                    { src: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171324/portfolio/danup/elements_named/Spotifyvanille.png", alt: "Vanilla Element", title: "VANILLA EDITION" },
                                    { src: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171317/portfolio/danup/elements_named/Spotify_peach.png", alt: "Peach Element", title: "MELBA PEACH" },
                                    { src: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171320/portfolio/danup/elements_named/Spotify_splach.png", alt: "Splash Motion", title: "STRAWBERRY SPLASH" },
                                    { src: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171319/portfolio/danup/elements_named/Spotify_Skate.png", alt: "Skate Motion", title: "STREET SKATE" },
                                    { src: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171322/portfolio/danup/elements_named/Spotify_Victory.png", alt: "Victory Tag", title: "VICTORY EDITION" },
                                    { src: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171314/portfolio/danup/elements_named/Spotify_fachfecha.png", alt: "Fachfecha Tag", title: "FACHFECHA TROPICAL" },
                                    { src: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171318/portfolio/danup/elements_named/Spotify_recorder.png", alt: "Recorder Cassette", title: "RETRO RECORDER" },
                                    { src: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171321/portfolio/danup/elements_named/Spotify_thunder.png", alt: "Thunder Flash", title: "THUNDER ENERGY" }
                                ].map((item, idx) => (
                                    <ScrollReveal key={idx} direction="up" delay={0.08 * (idx % 5)} className="relative h-full w-full">
                                        <div className="w-full aspect-square bg-[#191919] border border-white/10 rounded-2xl p-5 overflow-hidden group relative flex flex-col items-center justify-center shadow-xl hover:border-[#ffff7b] hover:-translate-y-1 transition-all duration-300">
                                            <LightboxImage
                                                src={item.src}
                                                alt={item.alt}
                                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                                            />
                                            <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-center">
                                                <p className="font-mono text-[9px] font-bold text-[#ffff7b] uppercase tracking-wider truncate">{item.title}</p>
                                            </div>
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>

                        {/* 4. Other Danup Projects Showcase Grid */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">04</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        Other Danup Projects
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                                {/* Video 1: Danup Boost CGI */}
                                <ScrollReveal direction="up" delay={0.1} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b] hover:shadow-[0_0_30px_rgba(255,255,123,0.3)] transition-all duration-500 group flex flex-col justify-end p-6">
                                        <LazyVideo
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/v1785168599/portfolio/danup/videos/Danup_Boost_CGI.mp4"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                        <div className="relative z-20 pointer-events-none bg-black/75 backdrop-blur-md p-4 rounded-2xl border border-white/10 mt-3">
                                            <span className="font-mono text-[10px] text-[#ffff7b] font-bold uppercase tracking-widest">COMMERCIAL CGI</span>
                                            <h4 className="font-playfair text-xl font-bold text-white uppercase tracking-tight mt-0.5">Danup Boost CGI</h4>
                                            <p className="font-sans text-xs text-white/70 mt-1">Dynamic 3D energy fluid dynamics &amp; product reveal campaign.</p>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* Video 2: Danup Maldives CGI */}
                                <ScrollReveal direction="up" delay={0.2} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b] hover:shadow-[0_0_30px_rgba(255,255,123,0.3)] transition-all duration-500 group flex flex-col justify-end p-6">
                                        <LazyVideo
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/v1785168566/portfolio/danup/videos/Danup_Maldives_CGI.mp4"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                        <div className="relative z-20 pointer-events-none bg-black/75 backdrop-blur-md p-4 rounded-2xl border border-white/10 mt-3">
                                            <span className="font-mono text-[10px] text-[#ffff7b] font-bold uppercase tracking-widest">TROPICAL CGI SHOWCASE</span>
                                            <h4 className="font-playfair text-xl font-bold text-white uppercase tracking-tight mt-0.5">Danup Maldives CGI</h4>
                                            <p className="font-sans text-xs text-white/70 mt-1">Exotic island environment &amp; tropical flavor 3D commercial.</p>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* Video 3: Danup 3D Motion Commercial */}
                                <ScrollReveal direction="up" delay={0.3} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b] hover:shadow-[0_0_30px_rgba(255,255,123,0.3)] transition-all duration-500 group flex flex-col justify-end p-6">
                                        <LazyVideo
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/v1785172806/danup_Motion_vglmg0.mov"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                        <div className="relative z-20 pointer-events-none bg-black/75 backdrop-blur-md p-4 rounded-2xl border border-white/10 mt-3">
                                            <span className="font-mono text-[10px] text-[#ffff7b] font-bold uppercase tracking-widest">3D MOTION SHOWCASE</span>
                                            <h4 className="font-playfair text-xl font-bold text-white uppercase tracking-tight mt-0.5">Danup 3D Motion</h4>
                                            <p className="font-sans text-xs text-white/70 mt-1">High-energy 3D commercial motion choreography &amp; branding.</p>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                ) : project.slug === "danao-3d-commercial" ? (
                    <div className="space-y-24 mt-8 relative z-10">
                        {/* 1. Main 3D Commercial Showcase Video */}
                        <div className="relative z-10 pt-8 pb-12">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-8">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">01</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        Full 3D Commercial &amp; Packaging Showcase Film
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid lg:grid-cols-12 gap-8 items-center">
                                {/* 9:16 Vertical Video Frame */}
                                <ScrollReveal direction="up" delay={0.2} className="lg:col-span-5 relative h-full w-full">
                                    <div className="w-full aspect-[9/16] max-w-sm mx-auto bg-[#191919] border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b] hover:shadow-[0_0_30px_rgba(255,255,123,0.3)] transition-all duration-500 group">
                                        <LazyVideo
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/v1785167351/portfolio/danao/videos/Danao_Motion_3D.mp4"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                    </div>
                                </ScrollReveal>

                                {/* 3D CGI Process & Technical Breakdown */}
                                <div className="lg:col-span-7 space-y-6">
                                    <ScrollReveal direction="up" delay={0.3}>
                                        <h4 className="font-playfair text-2xl md:text-3xl font-black uppercase text-[#191919] tracking-tight">
                                            3D CGI Production &amp; Visual Process
                                        </h4>
                                        <p className="font-sans text-sm md:text-base text-[#191919]/70 mt-2 leading-relaxed">
                                            A full-spectrum 3D commercial campaign produced for Danone Danao Juice &amp; Milk. Featuring complex fluid dynamics simulations, tropical island staging, and photorealistic PBR material rendering.
                                        </p>
                                    </ScrollReveal>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                        {[
                                            {
                                                step: "01",
                                                title: "Juice & Milk Fluid Dynamics",
                                                desc: "Realistic fluid particle simulations, splash mesh generation, and subsurface scattering shaders for Danao juice & milk blends."
                                            },
                                            {
                                                step: "02",
                                                title: "PBR Material & Foil Shading",
                                                desc: "Physical metallic lid reflection, non-transparent glossy plastic cap bump maps, and vibrant sRGB fruit label textures."
                                            },
                                            {
                                                step: "03",
                                                title: "Island & Forest Staging",
                                                desc: "Custom 3D environment builds ranging from tropical island palm beaches to lush forest natural lighting scenarios."
                                            },
                                            {
                                                step: "04",
                                                title: "Studio Lighting & Motion Grading",
                                                desc: "Multi-light HDRI studio rigs, specular rim highlights, and high-contrast color grading tuned for mobile video displays."
                                            }
                                        ].map((proc, pIdx) => (
                                            <ScrollReveal key={pIdx} direction="up" delay={0.1 * pIdx}>
                                                <div className="p-5 rounded-2xl bg-[#191919] border border-white/10 hover:border-[#ffff7b] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(255,255,123,0.15)] transition-all duration-300 group">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-[#ffff7b] font-mono text-xs font-bold">{proc.step}</span>
                                                        <div className="w-2 h-2 rounded-full bg-[#ffff7b] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </div>
                                                    <h5 className="font-sans font-bold text-sm text-white uppercase tracking-wider mb-1">
                                                        {proc.title}
                                                    </h5>
                                                    <p className="font-sans text-xs text-white/60 leading-relaxed">
                                                        {proc.desc}
                                                    </p>
                                                </div>
                                            </ScrollReveal>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Environment & Commercial Cuts */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="w-full max-w-6xl mx-auto flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">02</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        Themed Commercial Cuts &amp; Environment Animations
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto justify-items-center">
                                <ScrollReveal direction="up" delay={0.1} className="relative h-full w-full max-w-sm">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b]/60 transition-all group">
                                        <LazyVideo
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/v1785167347/portfolio/danao/videos/Forest_Danao.mp4"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.2} className="relative h-full w-full max-w-sm">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b]/60 transition-all group">
                                        <LazyVideo
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/v1785167337/portfolio/danao/videos/Dj_Danao.mp4"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.3} className="relative h-full w-full max-w-sm">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b]/60 transition-all group">
                                        <LazyVideo
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/v1785167323/portfolio/danao/videos/Danao_Loop_SciFi_2.mp4"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 3. 3D Render Showcase & Motion Loops */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="w-full max-w-6xl mx-auto flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">03</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        3D Motion Showcase &amp; Render Stills
                                    </h3>
                                </div>
                            </ScrollReveal>

                            {/* Centered 2-Video Showcase */}
                            <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto mb-12">
                                <ScrollReveal direction="left" delay={0.1} className="relative h-full w-full max-w-sm">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b] hover:shadow-[0_0_30px_rgba(255,255,123,0.3)] transition-all duration-500 group">
                                        <LazyVideo
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/v1785172226/danao_motion_island_xcxa6y.mp4"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="right" delay={0.2} className="relative h-full w-full max-w-sm">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b] hover:shadow-[0_0_30px_rgba(255,255,123,0.3)] transition-all duration-500 group">
                                        <LazyVideo
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/v1785172129/danao_cgi_street_e1oibf.mp4"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                    </div>
                                </ScrollReveal>
                            </div>

                            {/* Render Stills Grid */}
                            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto justify-items-center">
                                {[
                                    { src: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785166627/portfolio/danao/renders/shwrsec2ravagb9revpz.png", alt: "Danao CGI Render Pass 1" },
                                    { src: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785171525/portfolio/danao/renders/danao_render_pass_2.jpg", alt: "Danao CGI Render Pass 2" },
                                    { src: "https://res.cloudinary.com/zu63qo7h/image/upload/v1785166618/portfolio/danao/renders/tc1nmxmdqz4gnxeakq4i.png", alt: "Danao CGI Render Pass 3" }
                                ].map((still, sIdx) => (
                                    <ScrollReveal key={sIdx} direction="up" delay={0.1 * sIdx} className="relative h-full w-full max-w-sm">
                                        <div className="w-full aspect-[3/4] bg-[#191919] border border-white/10 rounded-2xl overflow-hidden relative shadow-xl hover:border-[#ffff7b] hover:-translate-y-1 transition-all duration-300 group">
                                            <LightboxImage
                                                src={still.src}
                                                alt={still.alt}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        </div>
                                    </ScrollReveal>
                                ))}
                            </div>
                        </div>
                    </div>

                ) : project.slug !== "trionda-ball-wc-2026" ? (
                    <div className="grid md:grid-cols-2 gap-8 relative z-10">
                        <div className="w-full aspect-[4/5] bg-white border border-black/10 rounded-2xl relative flex flex-col items-center justify-center shadow-md hover:border-[#ffff7b] transition-colors duration-500">
                            <div className="w-16 h-16 border border-black/10 rounded-full flex items-center justify-center mb-4 bg-[#f5f4ef]">
                                <div className="w-2 h-2 bg-[#ffff7b] rounded-full animate-ping"></div>
                            </div>
                            <span className="font-mono text-[#191919]/60 tracking-[0.2em] uppercase text-xs text-center px-4">Portrait Showcase<br/>[ 1080 x 1350 ]</span>
                        </div>
                        <div className="w-full aspect-[4/5] bg-white border border-black/10 rounded-2xl relative flex flex-col items-center justify-center shadow-md hover:border-[#ffff7b] transition-colors duration-500">
                            <div className="w-16 h-16 border border-black/10 rounded-full flex items-center justify-center mb-4 bg-[#f5f4ef]">
                                <div className="w-2 h-2 bg-[#191919]/40 rounded-full animate-pulse"></div>
                            </div>
                            <span className="font-mono text-[#191919]/60 tracking-[0.2em] uppercase text-xs text-center px-4">Portrait Showcase<br/>[ 1080 x 1350 ]</span>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-16 mt-8 relative z-10">
                        {/* 1. The Concept & Vision */}
                        <div className="relative z-10 pt-12 pb-16">
                            <div className="flex flex-col md:flex-row items-center gap-12">
                                <ScrollReveal direction="right" delay={0.3} className="w-full md:w-[45%] relative z-20 order-2 md:order-1">
                                    <div className="w-full h-full bg-white border border-black/10 rounded-2xl p-8 md:p-12 shadow-md transition-all duration-700 hover:shadow-xl">
                                        <h3 className="font-playfair text-3xl md:text-4xl font-bold uppercase tracking-tight text-[#191919] mb-6">
                                            The Concept &amp; <em className="font-playfair italic font-normal">Vision</em>
                                        </h3>
                                        <p className="font-sans text-[#444444] text-base md:text-lg leading-relaxed font-normal">
                                            The &quot;Trionda&quot; ball is a conceptual design created specifically for the 2026 World Cup. Trionda, meaning &quot;Three Waves,&quot; represents the unity of the three host nations: USA, Mexico, and Canada. The design features interconnected sweeping panels that symbolize the continuous flow of the game and the merging of diverse cultures.
                                        </p>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="left" delay={0.1} className="relative h-full w-full">
                                    <div className="w-full aspect-[16/9] bg-white border border-black/10 rounded-2xl overflow-hidden group relative shadow-md hover:shadow-xl transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/render_ball_enhanced" alt="Trionda Concept" className="w-full h-full object-contain md:object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 2. Fluid Dynamics Video */}
                        <div className="relative z-10 py-16 flex flex-col md:flex-row items-center gap-12">
                            <ScrollReveal direction="left" delay={0.1} className="relative h-full w-full md:w-[60%]">
                                <div className="w-full aspect-video bg-[#191919] border border-black/10 rounded-2xl overflow-hidden relative shadow-2xl group">
                                    <LazyVideo src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/portfolio/trionda/transition2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                </div>
                            </ScrollReveal>
                            
                            <ScrollReveal direction="right" delay={0.3} className="w-full md:w-[40%] relative z-20">
                                <div className="w-full h-full bg-white border border-black/10 rounded-2xl p-8 shadow-md transition-all duration-700">
                                    <h3 className="font-playfair text-2xl font-bold uppercase tracking-wide text-[#191919] mb-4">
                                        Topology <em className="font-playfair italic font-normal">&amp; Simulation</em>
                                    </h3>
                                    <p className="font-sans text-[#5c5c5c] text-base leading-relaxed font-normal">
                                        Showcasing the seamless looping transitions and dynamic panel topology in motion.
                                    </p>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* 3. Behind The Scenes */}
                        <div className="relative z-10 py-16">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">03</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        Behind The Scenes
                                    </h3>
                                </div>
                            </ScrollReveal>
                            
                            <div className="flex flex-col md:flex-row gap-12 md:gap-8 justify-center items-center">
                                <ScrollReveal direction="up" delay={0.1} className="relative h-full w-full md:w-[45%] md:mt-16">
                                    <div className="w-full relative group transition-all duration-500">
                                        <div className="aspect-[4/3] bg-white border border-black/10 rounded-2xl overflow-hidden shadow-md">
                                            <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/viewport_vs_render" alt="Viewport vs Render" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0" />
                                        </div>
                                    </div>
                                </ScrollReveal>
                                
                                <ScrollReveal direction="up" delay={0.3} className="relative h-full w-full md:w-[45%]">
                                    <div className="w-full relative group transition-all duration-500">
                                        <div className="aspect-[4/3] bg-white border border-black/10 rounded-2xl overflow-hidden shadow-md">
                                            <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/viewport_ball" alt="Viewport Geometry" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0" />
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 4. High-Res Renders Cascade */}
                        <div className="relative z-10 py-16 flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-0">
                            <ScrollReveal direction="up" delay={0.1} className="relative h-full w-full md:w-1/3 z-10">
                                <div className="w-full aspect-[4/5] bg-white border border-black/10 rounded-2xl overflow-hidden group relative shadow-md hover:shadow-xl transition-all">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/render_ball" alt="Render 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                </div>
                            </ScrollReveal>
                            <ScrollReveal direction="up" delay={0.2} className="relative h-full w-full md:w-1/3 md:mt-8 md:-ml-8 z-20">
                                <div className="w-full aspect-[4/5] bg-white border border-black/10 rounded-2xl overflow-hidden group relative shadow-lg hover:shadow-2xl transition-all">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/render_ball_2" alt="Render 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                </div>
                            </ScrollReveal>
                            <ScrollReveal direction="up" delay={0.3} className="relative h-full w-full md:w-1/3 md:mt-16 md:-ml-8 z-30">
                                <div className="w-full aspect-[4/5] bg-white border border-black/10 rounded-2xl overflow-hidden group relative shadow-xl hover:shadow-2xl transition-all">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/render_ball_3" alt="Render 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* 5. Real World Applications */}
                        <div className="relative z-10 py-16">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">05</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        Applications
                                    </h3>
                                </div>
                            </ScrollReveal>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                                <ScrollReveal direction="up" delay={0.1} className="relative h-full w-full md:w-[50%]">
                                    <div className="w-full aspect-[16/9] bg-white border border-black/10 rounded-2xl overflow-hidden group relative shadow-md hover:shadow-xl transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/stadium_mockup" alt="Stadium Mockup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>
                                <ScrollReveal direction="up" delay={0.3} className="relative h-full w-full md:w-[40%] z-20">
                                    <div className="w-full aspect-[4/3] bg-white border border-black/10 rounded-2xl overflow-hidden group relative shadow-md hover:shadow-xl transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/street_billboard" alt="Street Billboard" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 6. Action Videos */}
                        <div className="relative z-10 pt-8 pb-24">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center justify-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">06</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        Live Physics Showcase
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-24">
                                <ScrollReveal direction="up" delay={0.1} className="w-full md:w-[40%] relative">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden shadow-2xl group">
                                        <LazyVideo src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/portfolio/trionda/balls_rolling" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.3} className="w-full md:w-[35%] mt-8 md:mt-32 relative">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-black/10 rounded-2xl overflow-hidden shadow-2xl group">
                                        <LazyVideo src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/portfolio/trionda/ball_tunisia" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                )}

                </section>
            )}

        </main>
    );
}
