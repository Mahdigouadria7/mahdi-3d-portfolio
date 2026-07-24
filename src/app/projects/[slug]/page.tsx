import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Metadata } from "next";
import AnimatedProjectHero from "@/components/sections/AnimatedProjectHero";
import LuxuryRedBullCommercialHero from "@/components/sections/LuxuryRedBullCommercialHero";
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
        title: `${project.title} | Mahdi 3D Portfolio`,
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

    const isGoldTheme = project.slug === "redbull-gold-concept" || project.accent === "amber";
    const accentTextClass = isGoldTheme ? "text-amber-400" : "text-fuchsia-400";
    const accentBorderClass = isGoldTheme ? "border-amber-500/50" : "border-fuchsia-500/50";
    const accentBgClass = isGoldTheme ? "bg-amber-500/10" : "bg-fuchsia-500/10";
    const hoverShadowClass = isGoldTheme 
        ? "hover:border-amber-400/70 hover:shadow-[0_15px_35px_rgba(245,158,11,0.25)]" 
        : "hover:border-fuchsia-400/70 hover:shadow-[0_15px_35px_rgba(217,70,239,0.25)]";

    return (
        <main className={`min-h-screen bg-[#05020a] bg-grid-white/[0.02] text-white ${isGoldTheme ? 'selection:bg-amber-500 selection:text-black' : 'selection:bg-fuchsia-500 selection:text-white'} pb-32`}>
            {/* Top Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 p-4 md:p-10 flex justify-between items-start pointer-events-none gap-4">
                <div className="pointer-events-auto flex-1 flex justify-start">
                    <PreviousProjectButton currentSlug={project.slug} />
                </div>
                <div className="pointer-events-auto flex-1 flex justify-end">
                    <NextProjectButton currentSlug={project.slug} />
                </div>
            </nav>

            {/* Bottom Right Back Button */}
            <div className="fixed bottom-8 right-8 z-50 pointer-events-none">
                <BackButton />
            </div>

            {project.slug === "redbull-gold-concept" ? (
                <LuxuryRedBullCommercialHero />
            ) : (
                <AnimatedProjectHero project={project} index={projects.findIndex(p => p.slug === project.slug)} />
            )}

            {/* Floating Metadata Bar to cover the sharp canvas boundary */}
            <div className="w-full relative z-40 -mt-[48px] bg-[#05020a] bg-grid-white/[0.02]/60 backdrop-blur-2xl border-y border-white/10 shadow-[0_-20px_40px_rgba(5,2,10,0.8),0_20px_40px_rgba(5,2,10,0.8)] py-8 pointer-events-auto">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
                    <div className={`flex-1 border-l-2 ${accentBorderClass} pl-6 hover:border-white transition-colors duration-500`}>
                        <p className="font-cyber text-white/30 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2">Client</p>
                        <h4 className="font-tech font-bold text-base md:text-xl text-white tracking-wider uppercase">{project.client}</h4>
                    </div>
                    <div className={`flex-1 border-l-2 ${accentBorderClass} pl-6 hover:border-white transition-colors duration-500`}>
                        <p className="font-cyber text-white/30 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2">Role</p>
                        <h4 className="font-tech font-bold text-base md:text-xl text-white tracking-wider uppercase">{project.role}</h4>
                    </div>
                    <div className={`flex-1 border-l-2 ${accentBorderClass} pl-6 hover:border-white transition-colors duration-500`}>
                        <p className="font-cyber text-white/30 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2">Timeline</p>
                        <h4 className="font-tech font-bold text-base md:text-xl text-white tracking-wider uppercase">{project.timeline}</h4>
                    </div>
                </div>
            </div>

            {/* Storytelling Section */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-16 relative z-20">

                {/* Full Description - Displaced Typography */}
                <div className="relative z-10 pt-8 md:pt-16 mb-16">
                    <ScrollReveal direction="up" delay={0.2}>
                        <div className="flex items-center gap-4 mb-8">
                            <span className={`font-mono text-[10px] font-bold tracking-widest ${accentTextClass} border ${accentBorderClass} ${accentBgClass} px-3 py-1`}>01</span>
                            <div className="flex items-center gap-0">
                                <div className={`w-8 h-[2px] ${isGoldTheme ? 'bg-amber-500' : 'bg-fuchsia-500'}`} />
                                <div className={`w-8 h-[2px] ${isGoldTheme ? 'bg-amber-500/40' : 'bg-fuchsia-500/40'}`} />
                            </div>
                            <h2 className="font-tech text-sm font-bold uppercase tracking-[0.3em] text-white/90">
                                Project Overview
                            </h2>
                        </div>
                        <div className={`pl-4 md:pl-24 max-w-5xl border-l-2 ${accentBorderClass}`}>
                            <p className="font-cyber text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1] font-light tracking-tight">
                                {project.fullDescription}
                            </p>
                        </div>
                    </ScrollReveal>
                </div>

                {project.slug !== "trionda-ball-wc-2026" && project.slug !== "redbull-gold-concept" && (
                    <div className="w-full aspect-video bg-[#0a0510] border border-white/10 relative overflow-hidden group flex flex-col items-center justify-center shadow-2xl shadow-fuchsia-900/10 mb-16">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-900/20 via-transparent to-transparent opacity-50"></div>
                        
                        {/* Crosshair decoration */}
                        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white/5"></div>
                        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-white/5"></div>
                        
                        <span className="font-tech text-fuchsia-400/50 text-2xl md:text-4xl font-black uppercase tracking-widest mb-2 z-10">Media Placeholder</span>
                        <span className="font-cyber text-white/30 tracking-[0.3em] uppercase text-xs z-10">[ 1920 x 1080 ] High Resolution Asset</span>
                    </div>
                )}

                {/* Challenge & Solution - Clean Grid Layout */}
                <div className="relative z-10 pt-8 pb-16">
                    <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-12">
                        {/* Challenge Card */}
                        <ScrollReveal direction="left" delay={0.1} className="w-full md:w-1/2 relative z-20">
                            <div className={`w-full h-full bg-black/60 backdrop-blur-xl border border-white/15 rounded-2xl p-8 md:p-12 shadow-xl group transition-all duration-500 hover:z-50 hover:-translate-y-2 hover:scale-[1.01] ${hoverShadowClass}`}>
                                <div className="flex items-center gap-4 mb-8">
                                    <span className={`font-cyber ${accentTextClass} text-xs tracking-widest font-bold border ${accentBorderClass} ${accentBgClass} px-2 py-0.5 rounded`}>01</span>
                                    <h3 className="font-tech text-2xl md:text-3xl text-white font-bold uppercase tracking-widest">The Challenge</h3>
                                </div>
                                <p className="font-cyber text-white/70 text-lg md:text-xl leading-relaxed font-light">
                                    {project.challenge}
                                </p>
                            </div>
                        </ScrollReveal>
                        
                        {/* Solution Card */}
                        <ScrollReveal direction="right" delay={0.3} className="w-full md:w-1/2 relative z-30">
                            <div className={`w-full h-full bg-black/60 backdrop-blur-xl border border-white/15 rounded-2xl p-8 md:p-12 shadow-xl group transition-all duration-500 hover:z-50 hover:-translate-y-2 hover:scale-[1.01] ${hoverShadowClass}`}>
                                <div className="flex items-center gap-4 mb-8">
                                    <span className={`font-cyber ${accentTextClass} text-xs tracking-widest font-bold border ${accentBorderClass} ${accentBgClass} px-2 py-0.5 rounded`}>02</span>
                                    <h3 className="font-tech text-2xl md:text-3xl text-white font-bold uppercase tracking-widest">The Solution</h3>
                                </div>
                                <p className="font-cyber text-white/70 text-lg md:text-xl leading-relaxed font-light">
                                    {project.solution}
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                {project.slug === "redbull-gold-concept" ? (
                    <div className="space-y-24 mt-8 relative z-10">
                        {/* 1. The Concept Vision & Hero Vertical Video */}
                        <div className="relative z-10 pt-8 pb-12">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                                {/* Text Card */}
                                <ScrollReveal direction="right" delay={0.3} className="w-full md:w-[60%] relative z-20 order-2 md:order-1">
                                    <div className="w-full h-full bg-gradient-to-br from-amber-950/20 via-black/80 to-black/90 backdrop-blur-3xl border border-amber-500/30 rounded-2xl p-8 md:p-12 shadow-[0_0_50px_rgba(245,158,11,0.1)] transition-all duration-700 hover:z-50 hover:border-amber-400/80 hover:shadow-[0_0_50px_rgba(245,158,11,0.25)] flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="font-mono text-[10px] font-bold tracking-widest text-amber-400 border border-amber-500/40 bg-amber-500/10 px-3 py-1 rounded">01</span>
                                            <span className="font-cyber text-xs uppercase tracking-[0.3em] text-amber-400/80">Luxury Brand Concept</span>
                                        </div>
                                        <h3 className="font-tech text-3xl md:text-5xl font-black uppercase tracking-wider text-white mb-6">
                                            THE 24K GOLD CONCEPT
                                        </h3>
                                        <p className="font-cyber text-white/80 text-lg leading-relaxed font-light mb-6">
                                            The <span className="text-amber-400 font-normal">Red Bull Gold Concept</span> is an ultra-premium visual exploration elevating the iconic energy drink into a high-end luxury collector's item. Combining polished 24K gold metallic reflections, micro-embossed bull typography, and dark matte obsidian finishes, this concept reimagines premium beverage branding for VIP launch events and high-impact CGI showcases.
                                        </p>
                                        <div className="flex flex-wrap gap-3 font-mono text-[11px] text-amber-300">
                                            <span className="border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded-full">OCTANE RENDER 2025</span>
                                            <span className="border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded-full">PHYSICAL 24K GOLD PBR</span>
                                            <span className="border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded-full">VOLUMETRIC SMOKE</span>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* Hero Vertical 9:16 Portrait Video */}
                                <ScrollReveal direction="left" delay={0.1} className="w-full sm:w-[320px] md:w-[35%] aspect-[9/16] max-h-[620px] bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden group relative shadow-2xl hover:z-50 transition-all duration-500 hover:border-amber-400/60 hover:shadow-[0_0_50px_rgba(245,158,11,0.3)] order-1 md:order-2 flex items-center justify-center mx-auto">
                                    <LazyVideo 
                                        src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/v1784899265/portfolio/redbull/darkgold_render_video.mp4" 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                    />

                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 2. VIP Launch Event Ticket Banner (Ultra-Wide Horizontal 21:9) */}
                        <div className="relative z-10 py-6">
                            <ScrollReveal direction="up">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="font-mono text-[10px] font-bold tracking-widest text-amber-400 border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded">02</span>
                                    <div className="flex items-center gap-0">
                                        <div className="w-8 h-[2px] bg-amber-500" />
                                        <div className="w-8 h-[2px] bg-amber-500/40" />
                                    </div>
                                    <h3 className="font-tech text-sm font-bold uppercase tracking-[0.3em] text-white/90">
                                        VIP Launch Event Pass & Ticket Design
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal direction="up" delay={0.2} className="w-full aspect-[4966/2094] max-h-[380px] bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden group relative shadow-2xl transition-all duration-500 hover:border-amber-400/60 hover:shadow-[0_0_50px_rgba(245,158,11,0.25)]">
                                <LightboxImage 
                                    src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/v1784899273/portfolio/redbull/ticket2.png" 
                                    alt="VIP Launch Event Pass" 
                                    className="w-full h-full object-contain bg-black group-hover:scale-[1.02] transition-transform duration-700" 
                                />

                            </ScrollReveal>
                        </div>

                        {/* 3. Volumetric Smoke Simulation (Horizontal 16:9 Widescreen) */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="font-mono text-[10px] font-bold tracking-widest text-amber-400 border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded">03</span>
                                    <div className="flex items-center gap-0">
                                        <div className="w-8 h-[2px] bg-amber-500" />
                                        <div className="w-8 h-[2px] bg-amber-500/40" />
                                    </div>
                                    <h3 className="font-tech text-sm font-bold uppercase tracking-[0.3em] text-white/90">
                                        Volumetric Smoke Simulation (16:9 Horizontal)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal direction="up" delay={0.2} className="w-full aspect-video bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden relative shadow-2xl hover:border-amber-400/60 hover:shadow-[0_0_50px_rgba(245,158,11,0.3)] transition-all">
                                <LazyVideo 
                                    src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/v1784899377/portfolio/redbull/redbull_smoke.mp4" 
                                    className="w-full h-full object-cover" 
                                />

                            </ScrollReveal>
                        </div>

                        {/* 4. Liwa Desert Staging (1:1 Square Renders) */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="flex items-center gap-4 mb-12">
                                    <span className="font-mono text-[10px] font-bold tracking-widest text-amber-400 border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded">04</span>
                                    <div className="flex items-center gap-0">
                                        <div className="w-8 h-[2px] bg-amber-500" />
                                        <div className="w-8 h-[2px] bg-amber-500/40" />
                                    </div>
                                    <h3 className="font-tech text-sm font-bold uppercase tracking-[0.3em] text-white/90">
                                        Liwa Desert Staging (1:1 Square Renders)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                                <ScrollReveal direction="left" delay={0.1} className="w-full aspect-square bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-amber-400/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] transition-all">
                                    <LightboxImage 
                                        src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/v1784899905/portfolio/redbull/liwa_redbull_2.webp" 
                                        alt="Liwa Desert Staging 1" 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                    />

                                </ScrollReveal>

                                <ScrollReveal direction="right" delay={0.3} className="w-full aspect-square bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-amber-400/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] transition-all">
                                    <LightboxImage 
                                        src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/v1784899907/portfolio/redbull/liwa_redbull_3.webp" 
                                        alt="Liwa Desert Staging 2" 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                    />

                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 5. 4K Gold Can Beauty Renders (9:16 Vertical Trio Grid) */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="flex items-center gap-4 mb-12">
                                    <span className="font-mono text-[10px] font-bold tracking-widest text-amber-400 border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded">05</span>
                                    <div className="flex items-center gap-0">
                                        <div className="w-8 h-[2px] bg-amber-500" />
                                        <div className="w-8 h-[2px] bg-amber-500/40" />
                                    </div>
                                    <h3 className="font-tech text-sm font-bold uppercase tracking-[0.3em] text-white/90">
                                        4K Gold Can Beauty Renders (9:16 Vertical)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-3 gap-8">
                                <ScrollReveal direction="up" delay={0.1} className="w-full aspect-[9/16] bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-amber-400/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899913/portfolio/redbull/redbull_gold_darker.webp" alt="Deep Gold Specular Pass" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />

                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.2} className="w-full aspect-[9/16] bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-amber-400/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899924/portfolio/redbull/redbull_gold_2.webp" alt="Micro-Embossed Relief" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />

                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.3} className="w-full aspect-[9/16] bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-amber-400/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899929/portfolio/redbull/redbullr.webp" alt="Gold Master Render" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />

                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 6. Obsidian Studio Lighting Passes (9:16 Vertical Grid) */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="flex items-center gap-4 mb-12">
                                    <span className="font-mono text-[10px] font-bold tracking-widest text-amber-400 border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded">06</span>
                                    <div className="flex items-center gap-0">
                                        <div className="w-8 h-[2px] bg-amber-500" />
                                        <div className="w-8 h-[2px] bg-amber-500/40" />
                                    </div>
                                    <h3 className="font-tech text-sm font-bold uppercase tracking-[0.3em] text-white/90">
                                        Obsidian Studio Lighting Passes (9:16 Vertical)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-3 gap-8">
                                <ScrollReveal direction="up" delay={0.1} className="w-full aspect-[9/16] bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-amber-400/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899935/portfolio/redbull/redbull_environmet_xt.webp" alt="Studio High Key" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />

                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.2} className="w-full aspect-[9/16] bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-amber-400/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899938/portfolio/redbull/redbull_environmet.webp" alt="Studio Mid Pass" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />

                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.3} className="w-full aspect-[9/16] bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-amber-400/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899941/portfolio/redbull/redbull_environmetsss.webp" alt="Studio Subsurface Pass" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />

                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 7. Behind The Scenes & Geometry Wireframe (9:16 Vertical Grid) */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="flex items-center gap-4 mb-12">
                                    <span className="font-mono text-[10px] font-bold tracking-widest text-amber-400 border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded">07</span>
                                    <div className="flex items-center gap-0">
                                        <div className="w-8 h-[2px] bg-amber-500" />
                                        <div className="w-8 h-[2px] bg-amber-500/40" />
                                    </div>
                                    <h3 className="font-tech text-sm font-bold uppercase tracking-[0.3em] text-white/90">
                                        Behind The Scenes & Viewport Geometry (9:16 Vertical)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-4 gap-6">
                                <ScrollReveal direction="up" delay={0.1} className="w-full aspect-[9/16] bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-amber-400/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899943/portfolio/redbull/viewport_darkgold.webp" alt="Viewport Wireframe" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />

                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.2} className="w-full aspect-[9/16] bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-amber-400/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/v1784899948/portfolio/redbull/teasing_redbull.gif" alt="Teaser Motion GIF" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />

                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.3} className="w-full aspect-[9/16] bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-amber-400/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/portfolio/redbull/redbull_environmet_xt.webp" alt="Geometry Test 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />

                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.4} className="w-full aspect-[9/16] bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-amber-400/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/portfolio/redbull/redbull_environmetsss.webp" alt="Displacement Test 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />

                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 8. Additional Video Reel & Motion Presentations (9:16 Vertical Trio Videos) */}
                        <div className="relative z-10 pt-8 pb-24">
                            <ScrollReveal direction="up">
                                <div className="flex items-center gap-4 mb-12">
                                    <span className="font-mono text-[10px] font-bold tracking-widest text-amber-400 border border-amber-500/30 bg-amber-500/10 px-3 py-1 rounded">08</span>
                                    <div className="flex items-center gap-0">
                                        <div className="w-8 h-[2px] bg-amber-500" />
                                        <div className="w-8 h-[2px] bg-amber-500/40" />
                                    </div>
                                    <h3 className="font-tech text-sm font-bold uppercase tracking-[0.3em] text-white/90">
                                        Additional Video Reels & Motion Presentations (9:16 Vertical Videos)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-3 gap-8">
                                {/* DarkGold Redbull.mp4 */}
                                <ScrollReveal direction="up" delay={0.1} className="w-full aspect-[9/16] bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden relative shadow-2xl hover:border-amber-400/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all">
                                    <LazyVideo 
                                        src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/v1784900036/portfolio/redbull/darkgold_redbull.mp4" 
                                        className="w-full h-full object-cover" 
                                    />

                                </ScrollReveal>

                                {/* Loop Linkedin.mp4 */}
                                <ScrollReveal direction="up" delay={0.2} className="w-full aspect-[9/16] bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden relative shadow-2xl hover:border-amber-400/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all">
                                    <LazyVideo 
                                        src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/v1784900082/portfolio/redbull/loop_linkedin.mp4" 
                                        className="w-full h-full object-cover" 
                                    />

                                </ScrollReveal>

                                {/* Redbull 3Slides.mp4 */}
                                <ScrollReveal direction="up" delay={0.3} className="w-full aspect-[9/16] bg-[#0a0604] border border-amber-500/30 rounded-2xl overflow-hidden relative shadow-2xl hover:border-amber-400/60 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)] transition-all">
                                    <LazyVideo 
                                        src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/v1784900161/portfolio/redbull/redbull_3slides.mp4" 
                                        className="w-full h-full object-cover" 
                                    />

                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                ) : project.slug !== "trionda-ball-wc-2026" ? (
                    <div className="grid md:grid-cols-2 gap-8 relative z-10">
                        <div className="w-full aspect-[4/5] bg-[#0a0510] border border-white/10 relative flex flex-col items-center justify-center hover:border-fuchsia-500/50/30 transition-colors duration-500">
                            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-4">
                                <div className="w-1 h-1 bg-fuchsia-500 rounded-full animate-ping"></div>
                            </div>
                            <span className="font-cyber text-white/30 tracking-[0.2em] uppercase text-xs text-center px-4">Portrait Format<br/>[ 1080 x 1350 ]</span>
                        </div>
                        <div className="w-full aspect-[4/5] bg-[#0a0510] border border-white/10 relative flex flex-col items-center justify-center hover:border-fuchsia-500/50/30 transition-colors duration-500">
                            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-4">
                                <div className="w-1 h-1 bg-white/50 rounded-full animate-pulse"></div>
                            </div>
                            <span className="font-cyber text-white/30 tracking-[0.2em] uppercase text-xs text-center px-4">Portrait Format<br/>[ 1080 x 1350 ]</span>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-16 mt-8 relative z-10">
                        
                        {/* 1. The Concept & Vision - Clean Layout */}
                        <div className="relative z-10 pt-12 pb-16">
                            <div className="flex flex-col md:flex-row items-center gap-12">
                                {/* Text Card */}
                                <ScrollReveal direction="right" delay={0.3} className="w-full md:w-[45%] relative z-20 order-2 md:order-1">
                                    <div className="w-full h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-sm p-8 md:p-12 shadow-xl transition-all duration-700 hover:z-50 hover:bg-white/[0.08] hover:-translate-y-2 hover:border-fuchsia-500/50 hover:shadow-[0_0_40px_rgba(217,70,239,0.3)]">
                                        <h3 className="font-tech text-3xl md:text-4xl font-bold uppercase tracking-widest text-white mb-6">The Concept & Vision</h3>
                                        <p className="font-cyber text-white/70 text-lg leading-relaxed">
                                            The "Trionda" ball is a conceptual design created specifically for the 2026 World Cup. Trionda, meaning "Three Waves," represents the unity of the three host nations: USA, Mexico, and Canada. The design features interconnected sweeping panels that symbolize the continuous flow of the game and the merging of diverse cultures.
                                        </p>
                                    </div>
                                </ScrollReveal>

                                {/* Bleeding Image */}
                                <ScrollReveal direction="left" delay={0.1} className="w-full md:w-[55%] aspect-[16/9] bg-[#0a0510] border border-white/10 rounded-sm overflow-hidden group relative shadow-2xl hover:z-50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(217,70,239,0.2)] order-1 md:order-2">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/render_ball_enhanced" alt="Trionda Concept" className="w-full h-full object-contain md:object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    <div className="absolute inset-0 border border-white/20 rounded-sm scale-[0.95] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 2. Fluid Dynamics Video - Clean Layout */}
                        <div className="relative z-10 py-16 flex flex-col md:flex-row items-center gap-12">
                            <ScrollReveal direction="left" delay={0.1} className="w-full md:w-[60%] aspect-video bg-[#0a0510] border border-white/10 rounded-sm overflow-hidden relative shadow-2xl hover:shadow-[0_0_40px_rgba(217,70,239,0.2)] transition-shadow duration-700">
                                <LazyVideo src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/portfolio/trionda/transition2" className="w-full h-full object-cover" />
                                

                            </ScrollReveal>
                            
                            <ScrollReveal direction="right" delay={0.3} className="w-full md:w-[40%] relative z-20">
                                <div className="w-full h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-sm p-8 shadow-xl transition-all duration-700 hover:z-50 hover:bg-white/[0.08] hover:-translate-y-2 hover:border-fuchsia-500/50 hover:shadow-[0_0_40px_rgba(217,70,239,0.3)]">
                                    <h3 className="font-tech text-2xl font-bold uppercase tracking-widest text-white mb-4">Simulation</h3>
                                    <p className="font-cyber text-white/50 text-base leading-relaxed">
                                        Showcasing the seamless looping transitions and dynamic panel topology in motion.
                                    </p>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* 3. Behind The Scenes - Displaced Staggered Layout */}
                        <div className="relative z-10 py-16">
                            <ScrollReveal direction="up">
                                <div className="flex items-center gap-4 mb-12">
                                    <span className="font-mono text-[10px] font-bold tracking-widest text-cyan-400 border border-cyan-500/30 bg-cyan-500/10 px-3 py-1">03</span>
                                    <div className="flex items-center gap-0">
                                        <div className="w-8 h-[2px] bg-cyan-500" />
                                        <div className="w-8 h-[2px] bg-cyan-500/40" />
                                    </div>
                                    <h3 className="font-tech text-sm font-bold uppercase tracking-[0.3em] text-white/90">
                                        Behind The Scenes
                                    </h3>
                                </div>
                            </ScrollReveal>
                            
                            <div className="flex flex-col md:flex-row gap-12 md:gap-8 justify-center items-center">
                                {/* Image 1 - Lower */}
                                <ScrollReveal direction="up" delay={0.1} className="w-full md:w-[45%] md:mt-16 relative group transition-all duration-500 hover:z-50 hover:shadow-[0_0_40px_rgba(217,70,239,0.2)] rounded-sm">
                                    <div className="aspect-[4/3] bg-[#0a0510] border border-white/10 overflow-hidden shadow-2xl rounded-sm">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/viewport_vs_render" alt="Viewport vs Render" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0" />
                                    </div>

                                </ScrollReveal>
                                
                                {/* Image 2 - Higher */}
                                <ScrollReveal direction="up" delay={0.3} className="w-full md:w-[45%] md:-mt-8 relative group transition-all duration-500 hover:z-50 hover:shadow-[0_0_40px_rgba(217,70,239,0.2)] rounded-sm">
                                    <div className="aspect-[4/3] bg-[#0a0510] border border-white/10 overflow-hidden shadow-2xl rounded-sm">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/viewport_ball" alt="Viewport Geometry" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0" />
                                    </div>

                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 4. High-Res Renders Cascade */}
                        <div className="relative z-10 py-16 flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-0">
                            <ScrollReveal direction="up" delay={0.1} className="w-full md:w-1/3 aspect-[4/5] bg-[#0a0510] border border-white/10 rounded-sm overflow-hidden group relative z-10 shadow-2xl hover:z-50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(217,70,239,0.2)] hover:-translate-y-2">
                                <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/render_ball" alt="Render 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                            </ScrollReveal>
                            <ScrollReveal direction="up" delay={0.2} className="w-full md:w-1/3 aspect-[4/5] bg-[#0a0510] border border-white/10 rounded-sm overflow-hidden group md:mt-8 md:-ml-8 relative z-20 shadow-[0_30px_60px_rgba(0,0,0,0.8)] hover:z-50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(217,70,239,0.3)] hover:-translate-y-2">
                                <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/render_ball_2" alt="Render 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                            </ScrollReveal>
                            <ScrollReveal direction="up" delay={0.3} className="w-full md:w-1/3 aspect-[4/5] bg-[#0a0510] border border-white/10 rounded-sm overflow-hidden group md:mt-16 md:-ml-8 relative z-30 shadow-[0_30px_60px_rgba(0,0,0,0.8)] hover:z-50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(217,70,239,0.4)] hover:-translate-y-2">
                                <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/render_ball_3" alt="Render 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                            </ScrollReveal>
                        </div>

                        {/* 5. Real World Applications - Clean Grid Layout */}
                        <div className="relative z-10 py-16">
                            <ScrollReveal direction="up">
                                <div className="flex items-center gap-4 mb-12">
                                    <span className="font-mono text-[10px] font-bold tracking-widest text-violet-400 border border-violet-500/30 bg-violet-500/10 px-3 py-1">05</span>
                                    <div className="flex items-center gap-0">
                                        <div className="w-8 h-[2px] bg-violet-500" />
                                        <div className="w-8 h-[2px] bg-violet-500/40" />
                                    </div>
                                    <h3 className="font-tech text-sm font-bold uppercase tracking-[0.3em] text-white/90">
                                        Applications
                                    </h3>
                                </div>
                            </ScrollReveal>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                                <ScrollReveal direction="up" delay={0.1} className="w-full md:w-[50%] aspect-[16/9] bg-[#0a0510] border border-white/10 rounded-sm overflow-hidden group relative shadow-2xl hover:z-50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(217,70,239,0.2)]">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/stadium_mockup" alt="Stadium Mockup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />

                                </ScrollReveal>
                                <ScrollReveal direction="up" delay={0.3} className="w-full md:w-[40%] aspect-[4/3] bg-[#0a0510] border border-white/10 rounded-sm overflow-hidden group relative z-20 shadow-2xl hover:z-50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(217,70,239,0.3)]">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/street_billboard" alt="Street Billboard" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />

                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 6. Action Videos - Displaced Posters */}
                        <div className="relative z-10 pt-8 pb-24">
                            <ScrollReveal direction="up">
                                <div className="flex items-center justify-center gap-4 mb-12">
                                    <span className="font-mono text-[10px] font-bold tracking-widest text-amber-400 border border-amber-500/30 bg-amber-500/10 px-3 py-1">06</span>
                                    <div className="flex items-center gap-0">
                                        <div className="w-8 h-[2px] bg-amber-500" />
                                        <div className="w-8 h-[2px] bg-amber-500/40" />
                                    </div>
                                    <h3 className="font-tech text-sm font-bold uppercase tracking-[0.3em] text-white/90">
                                        Live Physics Showcase
                                    </h3>
                                </div>
                            </ScrollReveal>
                            
                            <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-24">
                                <ScrollReveal direction="up" delay={0.1} className="w-full md:w-[40%] relative">
                                    <div className="aspect-[9/16] bg-[#0a0510] border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(217,70,239,0.15)] rounded-sm hover:shadow-[0_0_50px_rgba(217,70,239,0.3)] transition-shadow duration-500">
                                        <LazyVideo src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/portfolio/trionda/balls_rolling" className="w-full h-full object-cover" />
                                    </div>

                                </ScrollReveal>
                                
                                <ScrollReveal direction="up" delay={0.3} className="w-full md:w-[35%] mt-8 md:mt-32 relative">
                                    <div className="aspect-[9/16] bg-[#0a0510] border border-white/10 overflow-hidden shadow-2xl rounded-sm hover:shadow-[0_0_50px_rgba(217,70,239,0.3)] transition-shadow duration-500">
                                        <LazyVideo src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/portfolio/trionda/ball_tunisia" className="w-full h-full object-cover" />
                                    </div>

                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                )}

            </section>
            
        </main>
    );
}
