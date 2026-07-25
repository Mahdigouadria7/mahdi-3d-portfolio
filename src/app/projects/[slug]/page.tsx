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
        title: `${project.title} | Mahdi 3D Studio`,
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
        <main className="min-h-screen bg-[#141414] text-white selection:bg-[#ffff7b] selection:text-[#141414] pb-32 relative overflow-hidden">
            {/* Background subtle grid pattern matching Nico Studio theme */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
                <div className="w-full h-full border-b border-dashed border-white/20" />
            </div>

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

            {/* 3D Intro & Interactive Canvas Viewports (RETAINED AS-IS) */}
            {project.slug === "redbull-gold-concept" ? (
                <LuxuryRedBullCommercialHero />
            ) : (
                <AnimatedProjectHero project={project} index={projects.findIndex(p => p.slug === project.slug)} />
            )}

            {/* Floating Metadata Bar (Nico Studio Glass Bar) */}
            <div className="w-full relative z-40 -mt-[48px] bg-[#141414]/90 backdrop-blur-2xl border-y border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.6)] py-8 pointer-events-auto">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
                    <div className="flex-1 border-l-2 border-[#ffff7b]/60 pl-6 hover:border-[#ffff7b] transition-colors duration-500">
                        <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-1.5 text-[#ffff7b] font-semibold">Client</p>
                        <h4 className="font-sans font-bold text-base md:text-xl text-white tracking-tight uppercase">{project.client}</h4>
                    </div>
                    <div className="flex-1 border-l-2 border-[#ffff7b]/60 pl-6 hover:border-[#ffff7b] transition-colors duration-500">
                        <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-1.5 text-[#ffff7b] font-semibold">Role</p>
                        <h4 className="font-sans font-bold text-base md:text-xl text-white tracking-tight uppercase">{project.role}</h4>
                    </div>
                    <div className="flex-1 border-l-2 border-[#ffff7b]/60 pl-6 hover:border-[#ffff7b] transition-colors duration-500">
                        <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-1.5 text-[#ffff7b] font-semibold">Timeline</p>
                        <h4 className="font-sans font-bold text-base md:text-xl text-white tracking-tight uppercase">{project.timeline}</h4>
                    </div>
                </div>
            </div>

            {/* Storytelling Section (Nico Studio Editorial Design) */}
            <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-16 space-y-16 relative z-20">

                {/* Full Description - Editorial Typography */}
                <div className="relative z-10 pt-8 md:pt-16 mb-16">
                    <ScrollReveal direction="up" delay={0.2}>
                        <div className="w-full flex items-center gap-4 mb-8">
                            <span className="font-mono text-xs font-bold tracking-widest text-[#141414] bg-[#ffff7b] px-3 py-1 rounded-full shadow-sm">
                                01
                            </span>
                            <div className="flex items-center gap-1">
                                <div className="w-8 h-[2px] bg-[#ffff7b]" />
                                <div className="w-8 h-[2px] bg-[#ffff7b]/40" />
                            </div>
                            <h2 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-white/80">
                                Project Overview
                            </h2>
                        </div>
                        <div className="pl-4 md:pl-20 max-w-5xl border-l-2 border-[#ffff7b]/60">
                            <p className="font-playfair text-3xl md:text-5xl lg:text-6xl text-white leading-[1.15] font-normal tracking-tight">
                                {project.fullDescription}
                            </p>
                        </div>
                    </ScrollReveal>
                </div>

                {project.slug !== "trionda-ball-wc-2026" && project.slug !== "redbull-gold-concept" && (
                    <div className="w-full aspect-video bg-[#191919] border border-white/10 rounded-2xl relative overflow-hidden group flex flex-col items-center justify-center shadow-2xl mb-16">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent opacity-50"></div>
                        
                        {/* Crosshair decoration */}
                        <span className="absolute top-4 left-4 text-white/30 font-mono text-xs">+</span>
                        <span className="absolute top-4 right-4 text-white/30 font-mono text-xs">+</span>
                        <span className="absolute bottom-4 left-4 text-white/30 font-mono text-xs">+</span>
                        <span className="absolute bottom-4 right-4 text-white/30 font-mono text-xs">+</span>
                        
                        <span className="font-sans text-white/90 text-2xl md:text-4xl font-bold uppercase tracking-widest mb-2 z-10">High-Res Render Showcase</span>
                        <span className="font-mono text-white/40 tracking-[0.3em] uppercase text-xs z-10">[ 1920 x 1080 ] Production Asset</span>
                    </div>
                )}

                {/* Challenge & Solution - Nico Studio Cards */}
                <div className="relative z-10 pt-8 pb-16">
                    <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-12">
                        {/* Challenge Card */}
                        <ScrollReveal direction="left" delay={0.1} className="w-full md:w-1/2 relative z-20">
                            <div className="w-full h-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl group transition-all duration-500 hover:border-[#ffff7b]/50 hover:bg-white/[0.08] hover:-translate-y-1">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#141414] bg-[#ffff7b] px-3 py-1 rounded-full shadow-sm">
                                        01
                                    </span>
                                    <h3 className="font-sans text-2xl md:text-3xl text-white font-bold uppercase tracking-wide">
                                        The Challenge
                                    </h3>
                                </div>
                                <p className="font-sans text-white/70 text-base md:text-lg leading-relaxed font-normal">
                                    {project.challenge}
                                </p>
                            </div>
                        </ScrollReveal>
                        
                        {/* Solution Card */}
                        <ScrollReveal direction="right" delay={0.3} className="w-full md:w-1/2 relative z-30">
                            <div className="w-full h-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl group transition-all duration-500 hover:border-[#ffff7b]/50 hover:bg-white/[0.08] hover:-translate-y-1">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#141414] bg-[#ffff7b] px-3 py-1 rounded-full shadow-sm">
                                        02
                                    </span>
                                    <h3 className="font-sans text-2xl md:text-3xl text-white font-bold uppercase tracking-wide">
                                        The Solution
                                    </h3>
                                </div>
                                <p className="font-sans text-white/70 text-base md:text-lg leading-relaxed font-normal">
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
                                    <div className="w-full h-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl transition-all duration-700 hover:border-[#ffff7b]/50 hover:bg-white/[0.08] flex flex-col justify-center">
                                        <div className="flex items-center gap-3 mb-6">
                                            <span className="font-mono text-xs font-bold tracking-widest text-[#141414] bg-[#ffff7b] px-3 py-1 rounded-full shadow-sm">01</span>
                                            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#ffff7b]">Luxury Brand Concept</span>
                                        </div>
                                        <h3 className="font-sans text-3xl md:text-5xl font-bold uppercase tracking-tight text-white mb-6">
                                            THE 24K GOLD CONCEPT
                                        </h3>
                                        <p className="font-sans text-white/80 text-base md:text-lg leading-relaxed font-normal mb-6">
                                            The <span className="text-[#ffff7b] font-semibold">Red Bull Gold Concept</span> is an ultra-premium visual exploration elevating the iconic energy drink into a high-end luxury collector&apos;s item. Combining polished 24K gold metallic reflections, micro-embossed bull typography, and dark matte obsidian finishes, this concept reimagines premium beverage branding for VIP launch events and high-impact CGI showcases.
                                        </p>
                                        <div className="flex flex-wrap gap-2.5 font-mono text-[11px] text-[#ffff7b]">
                                            <span className="border border-white/15 bg-white/5 px-3 py-1 rounded-full font-medium">OCTANE RENDER 2025</span>
                                            <span className="border border-white/15 bg-white/5 px-3 py-1 rounded-full font-medium">PHYSICAL 24K GOLD PBR</span>
                                            <span className="border border-white/15 bg-white/5 px-3 py-1 rounded-full font-medium">VOLUMETRIC SMOKE</span>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* Hero Vertical 9:16 Portrait Video (RETAINED AS-IS) */}
                                <ScrollReveal direction="left" delay={0.1} className="relative h-full w-full md:w-[35%] order-1 md:order-2 flex items-center justify-center mx-auto">
                                    <div className="w-full md:w-full aspect-[9/16] max-h-[620px] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl transition-all duration-500 hover:border-[#ffff7b]/60">
                                        <LazyVideo 
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/v1784899265/portfolio/redbull/darkgold_render_video.mp4" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                        />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 2. VIP Launch Event Ticket Banner (Ultra-Wide Horizontal 21:9) */}
                        <div className="relative z-10 py-6">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-8">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#141414] bg-[#ffff7b] px-3 py-1 rounded-full shadow-sm">02</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#ffff7b]" />
                                        <div className="w-8 h-[2px] bg-[#ffff7b]/40" />
                                    </div>
                                    <h3 className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-white/80">
                                        VIP Launch Event Pass &amp; Ticket Design
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal direction="up" delay={0.2} className="relative h-full w-full">
                                <div className="w-full aspect-[4966/2094] max-h-[380px] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl transition-all duration-500 hover:border-[#ffff7b]/60">
                                    <LightboxImage 
                                        src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/v1784899273/portfolio/redbull/ticket2.png" 
                                        alt="VIP Launch Event Pass" 
                                        className="w-full h-full object-contain bg-[#141414] group-hover:scale-[1.02] transition-transform duration-700" 
                                    />
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* 3. Volumetric Smoke Simulation */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-8">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#141414] bg-[#ffff7b] px-3 py-1 rounded-full shadow-sm">03</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#ffff7b]" />
                                        <div className="w-8 h-[2px] bg-[#ffff7b]/40" />
                                    </div>
                                    <h3 className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-white/80">
                                        Volumetric Smoke Simulation (16:9 Horizontal)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal direction="up" delay={0.2} className="relative h-full w-full">
                                <div className="w-full aspect-video bg-[#191919] border border-white/15 rounded-2xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b]/60 transition-all group">
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
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#141414] bg-[#ffff7b] px-3 py-1 rounded-full shadow-sm">04</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#ffff7b]" />
                                        <div className="w-8 h-[2px] bg-[#ffff7b]/40" />
                                    </div>
                                    <h3 className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-white/80">
                                        Liwa Desert Staging (1:1 Square Renders)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                                <ScrollReveal direction="left" delay={0.1} className="relative h-full w-full">
                                    <div className="w-full aspect-square bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage 
                                            src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/v1784899905/portfolio/redbull/liwa_redbull_2.webp" 
                                            alt="Liwa Desert Staging 1" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                        />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="right" delay={0.3} className="relative h-full w-full">
                                    <div className="w-full aspect-square bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
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
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#141414] bg-[#ffff7b] px-3 py-1 rounded-full shadow-sm">05</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#ffff7b]" />
                                        <div className="w-8 h-[2px] bg-[#ffff7b]/40" />
                                    </div>
                                    <h3 className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-white/80">
                                        4K Gold Can Beauty Renders (9:16 Vertical)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-3 gap-8">
                                <ScrollReveal direction="up" delay={0.1} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899913/portfolio/redbull/redbull_gold_darker.webp" alt="Deep Gold Specular Pass" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.2} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899924/portfolio/redbull/redbull_gold_2.webp" alt="Micro-Embossed Relief" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.3} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899929/portfolio/redbull/redbullr.webp" alt="Gold Master Render" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 6. Obsidian Studio Lighting Passes */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#141414] bg-[#ffff7b] px-3 py-1 rounded-full shadow-sm">06</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#ffff7b]" />
                                        <div className="w-8 h-[2px] bg-[#ffff7b]/40" />
                                    </div>
                                    <h3 className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-white/80">
                                        Obsidian Studio Lighting Passes (9:16 Vertical)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-3 gap-8">
                                <ScrollReveal direction="up" delay={0.1} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899935/portfolio/redbull/redbull_environmet_xt.webp" alt="Studio High Key" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.2} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899938/portfolio/redbull/redbull_environmet.webp" alt="Studio Mid Pass" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.3} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899941/portfolio/redbull/redbull_environmetsss.webp" alt="Studio Subsurface Pass" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 7. Behind The Scenes & Geometry Wireframe */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#141414] bg-[#ffff7b] px-3 py-1 rounded-full shadow-sm">07</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#ffff7b]" />
                                        <div className="w-8 h-[2px] bg-[#ffff7b]/40" />
                                    </div>
                                    <h3 className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-white/80">
                                        Behind The Scenes &amp; Viewport Geometry (9:16 Vertical)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-4 gap-6">
                                <ScrollReveal direction="up" delay={0.1} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/v1784899943/portfolio/redbull/viewport_darkgold.webp" alt="Viewport Wireframe" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.2} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/v1784899948/portfolio/redbull/teasing_redbull.gif" alt="Teaser Motion GIF" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.3} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/portfolio/redbull/redbull_environmet_xt.webp" alt="Geometry Test 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.4} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_800/portfolio/redbull/redbull_environmetsss.webp" alt="Displacement Test 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 8. Additional Video Reel & Motion Presentations */}
                        <div className="relative z-10 pt-8 pb-24">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#141414] bg-[#ffff7b] px-3 py-1 rounded-full shadow-sm">08</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#ffff7b]" />
                                        <div className="w-8 h-[2px] bg-[#ffff7b]/40" />
                                    </div>
                                    <h3 className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-white/80">
                                        Additional Video Reels &amp; Motion Presentations (9:16 Vertical Videos)
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                                <ScrollReveal direction="up" delay={0.1} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b]/60 transition-all group">
                                        <LazyVideo 
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/v1784900036/portfolio/redbull/darkgold_redbull.mp4" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                        />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="up" delay={0.2} className="relative h-full w-full">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b]/60 transition-all group">
                                        <LazyVideo 
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/v1784900082/portfolio/redbull/loop_linkedin.mp4" 
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                                        />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>
                    </div>
                ) : project.slug !== "trionda-ball-wc-2026" ? (
                    <div className="grid md:grid-cols-2 gap-8 relative z-10">
                        <div className="w-full aspect-[4/5] bg-[#191919] border border-white/10 rounded-2xl relative flex flex-col items-center justify-center hover:border-[#ffff7b]/40 transition-colors duration-500">
                            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-4">
                                <div className="w-1.5 h-1.5 bg-[#ffff7b] rounded-full animate-ping"></div>
                            </div>
                            <span className="font-mono text-white/40 tracking-[0.2em] uppercase text-xs text-center px-4">Portrait Showcase<br/>[ 1080 x 1350 ]</span>
                        </div>
                        <div className="w-full aspect-[4/5] bg-[#191919] border border-white/10 rounded-2xl relative flex flex-col items-center justify-center hover:border-[#ffff7b]/40 transition-colors duration-500">
                            <div className="w-16 h-16 border border-white/10 rounded-full flex items-center justify-center mb-4">
                                <div className="w-1.5 h-1.5 bg-white/50 rounded-full animate-pulse"></div>
                            </div>
                            <span className="font-mono text-white/40 tracking-[0.2em] uppercase text-xs text-center px-4">Portrait Showcase<br/>[ 1080 x 1350 ]</span>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-16 mt-8 relative z-10">
                        {/* 1. The Concept & Vision */}
                        <div className="relative z-10 pt-12 pb-16">
                            <div className="flex flex-col md:flex-row items-center gap-12">
                                <ScrollReveal direction="right" delay={0.3} className="w-full md:w-[45%] relative z-20 order-2 md:order-1">
                                    <div className="w-full h-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl transition-all duration-700 hover:border-[#ffff7b]/50">
                                        <h3 className="font-sans text-3xl md:text-4xl font-bold uppercase tracking-wide text-white mb-6">The Concept &amp; Vision</h3>
                                        <p className="font-sans text-white/70 text-base md:text-lg leading-relaxed font-normal">
                                            The &quot;Trionda&quot; ball is a conceptual design created specifically for the 2026 World Cup. Trionda, meaning &quot;Three Waves,&quot; represents the unity of the three host nations: USA, Mexico, and Canada. The design features interconnected sweeping panels that symbolize the continuous flow of the game and the merging of diverse cultures.
                                        </p>
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="left" delay={0.1} className="relative h-full w-full">
                                    <div className="w-full aspect-[16/9] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/render_ball_enhanced" alt="Trionda Concept" className="w-full h-full object-contain md:object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 2. Fluid Dynamics Video */}
                        <div className="relative z-10 py-16 flex flex-col md:flex-row items-center gap-12">
                            <ScrollReveal direction="left" delay={0.1} className="relative h-full w-full md:w-[60%]">
                                <div className="w-full aspect-video bg-[#191919] border border-white/15 rounded-2xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b]/60 transition-all group">
                                    <LazyVideo src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/portfolio/trionda/transition2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                </div>
                            </ScrollReveal>
                            
                            <ScrollReveal direction="right" delay={0.3} className="w-full md:w-[40%] relative z-20">
                                <div className="w-full h-full bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-2xl transition-all duration-700 hover:border-[#ffff7b]/50">
                                    <h3 className="font-sans text-2xl font-bold uppercase tracking-wide text-white mb-4">Simulation</h3>
                                    <p className="font-sans text-white/60 text-base leading-relaxed font-normal">
                                        Showcasing the seamless looping transitions and dynamic panel topology in motion.
                                    </p>
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* 3. Behind The Scenes */}
                        <div className="relative z-10 py-16">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#141414] bg-[#ffff7b] px-3 py-1 rounded-full shadow-sm">03</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#ffff7b]" />
                                        <div className="w-8 h-[2px] bg-[#ffff7b]/40" />
                                    </div>
                                    <h3 className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-white/80">
                                        Behind The Scenes
                                    </h3>
                                </div>
                            </ScrollReveal>
                            
                            <div className="flex flex-col md:flex-row gap-12 md:gap-8 justify-center items-center">
                                <ScrollReveal direction="up" delay={0.1} className="relative h-full w-full md:w-[45%] md:mt-16">
                                    <div className="w-full relative group transition-all duration-500">
                                        <div className="aspect-[4/3] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden shadow-2xl hover:border-[#ffff7b]/60">
                                            <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/viewport_vs_render" alt="Viewport vs Render" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0" />
                                        </div>
                                    </div>
                                </ScrollReveal>
                                
                                <ScrollReveal direction="up" delay={0.3} className="relative h-full w-full md:w-[45%]">
                                    <div className="w-full relative group transition-all duration-500">
                                        <div className="aspect-[4/3] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden shadow-2xl hover:border-[#ffff7b]/60">
                                            <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/viewport_ball" alt="Viewport Geometry" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0" />
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 4. High-Res Renders Cascade */}
                        <div className="relative z-10 py-16 flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-0">
                            <ScrollReveal direction="up" delay={0.1} className="relative h-full w-full md:w-1/3 z-10">
                                <div className="w-full aspect-[4/5] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/render_ball" alt="Render 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                </div>
                            </ScrollReveal>
                            <ScrollReveal direction="up" delay={0.2} className="relative h-full w-full md:w-1/3 md:mt-8 md:-ml-8 z-20">
                                <div className="w-full aspect-[4/5] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/render_ball_2" alt="Render 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                </div>
                            </ScrollReveal>
                            <ScrollReveal direction="up" delay={0.3} className="relative h-full w-full md:w-1/3 md:mt-16 md:-ml-8 z-30">
                                <div className="w-full aspect-[4/5] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                    <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/render_ball_3" alt="Render 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                </div>
                            </ScrollReveal>
                        </div>

                        {/* 5. Real World Applications */}
                        <div className="relative z-10 py-16">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#141414] bg-[#ffff7b] px-3 py-1 rounded-full shadow-sm">05</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#ffff7b]" />
                                        <div className="w-8 h-[2px] bg-[#ffff7b]/40" />
                                    </div>
                                    <h3 className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-white/80">
                                        Applications
                                    </h3>
                                </div>
                            </ScrollReveal>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                                <ScrollReveal direction="up" delay={0.1} className="relative h-full w-full md:w-[50%]">
                                    <div className="w-full aspect-[16/9] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/stadium_mockup" alt="Stadium Mockup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>
                                <ScrollReveal direction="up" delay={0.3} className="relative h-full w-full md:w-[40%] z-20">
                                    <div className="w-full aspect-[4/3] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden group relative shadow-2xl hover:border-[#ffff7b]/60 transition-all">
                                        <LightboxImage src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/portfolio/trionda/street_billboard" alt="Street Billboard" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 6. Action Videos */}
                        <div className="relative z-10 pt-8 pb-24">
                            <ScrollReveal direction="up">
                                <div className="w-full flex items-center justify-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#141414] bg-[#ffff7b] px-3 py-1 rounded-full shadow-sm">06</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#ffff7b]" />
                                        <div className="w-8 h-[2px] bg-[#ffff7b]/40" />
                                    </div>
                                    <h3 className="font-sans text-xs font-bold uppercase tracking-[0.3em] text-white/80">
                                        Live Physics Showcase
                                    </h3>
                                </div>
                            </ScrollReveal>
                            
                            <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-24">
                                <ScrollReveal direction="up" delay={0.1} className="w-full md:w-[40%] relative">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden shadow-2xl hover:border-[#ffff7b]/60 transition-all group">
                                        <LazyVideo src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/portfolio/trionda/balls_rolling" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    </div>
                                </ScrollReveal>
                                
                                <ScrollReveal direction="up" delay={0.3} className="w-full md:w-[35%] mt-8 md:mt-32 relative">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/15 rounded-2xl overflow-hidden shadow-2xl hover:border-[#ffff7b]/60 transition-all group">
                                        <LazyVideo src="https://res.cloudinary.com/zu63qo7h/video/upload/f_auto,q_auto,w_720/portfolio/trionda/ball_tunisia" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
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
