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
        <main className="min-h-screen bg-[#f5f4ef] text-[#191919] selection:bg-[#ffff7b] selection:text-[#191919] pb-32 relative overflow-hidden">

            {/* Top Navigation Bar */}
            <nav className="fixed top-0 left-0 w-full z-50 p-4 md:p-10 flex justify-between items-start pointer-events-none gap-4">
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

            {/* ── 1. 3D Intro & Interactive Canvas Hero (RETAINED EXACTLY AS IS) ── */}
            {project.slug === "redbull-gold-concept" ? (
                <LuxuryRedBullCommercialHero />
            ) : (
                <AnimatedProjectHero project={project} index={projects.findIndex(p => p.slug === project.slug)} />
            )}

            {/* ── 2. Floating Metadata Bar (Nico Studio High-Contrast Dark Bar) ── */}
            <div className="w-full relative z-40 -mt-[48px] bg-[#191919] text-white border-y border-white/10 shadow-[0_-20px_40px_rgba(0,0,0,0.6)] py-8 pointer-events-auto">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
                    <div className="flex-1 border-l-2 border-[#ffff7b] pl-6 hover:border-white transition-colors duration-500">
                        <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-1.5 text-[#ffff7b] font-bold">Client</p>
                        <h4 className="font-sans font-bold text-base md:text-xl text-white tracking-tight uppercase">{project.client}</h4>
                    </div>
                    <div className="flex-1 border-l-2 border-[#ffff7b] pl-6 hover:border-white transition-colors duration-500">
                        <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-1.5 text-[#ffff7b] font-bold">Role</p>
                        <h4 className="font-sans font-bold text-base md:text-xl text-white tracking-tight uppercase">{project.role}</h4>
                    </div>
                    <div className="flex-1 border-l-2 border-[#ffff7b] pl-6 hover:border-white transition-colors duration-500">
                        <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase mb-1.5 text-[#ffff7b] font-bold">Timeline</p>
                        <h4 className="font-sans font-bold text-base md:text-xl text-white tracking-tight uppercase">{project.timeline}</h4>
                    </div>
                </div>
            </div>

            {/* ── 3. Main Project Overview Section (Warm Cream Editorial Surface) ── */}
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

                {/* Media Showcase Frame */}
                {project.slug !== "trionda-ball-wc-2026" && project.slug !== "redbull-gold-concept" && (
                    <div className="w-full aspect-video bg-white border border-black/10 rounded-2xl relative overflow-hidden group flex flex-col items-center justify-center shadow-md mb-16">
                        {/* Corner Precision Crosshairs */}
                        <span className="absolute top-4 left-4 text-[#191919]/30 font-mono text-xs">+</span>
                        <span className="absolute top-4 right-4 text-[#191919]/30 font-mono text-xs">+</span>
                        <span className="absolute bottom-4 left-4 text-[#191919]/30 font-mono text-xs">+</span>
                        <span className="absolute bottom-4 right-4 text-[#191919]/30 font-mono text-xs">+</span>

                        <span className="font-playfair text-[#191919] text-2xl md:text-4xl font-bold uppercase tracking-wide mb-2 z-10">
                            Render <em className="font-playfair italic font-normal">Showcase</em>
                        </span>
                        <span className="font-mono text-[#191919]/50 tracking-[0.3em] uppercase text-xs z-10">[ 1920 x 1080 ] Production Asset</span>
                    </div>
                )}

                {/* ── 4. Challenge & Solution Grid (Alternating Nico Studio Surface Cards) ── */}
                <div className="relative z-10 pt-4 pb-12">
                    <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 md:gap-12">
                        {/* Challenge Card (Warm Pure White Card) */}
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

                        {/* Solution Card (Nico Dark High-Contrast Card) */}
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
        </main>
    );
}
