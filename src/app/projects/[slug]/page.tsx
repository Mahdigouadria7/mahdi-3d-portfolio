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
        <main className="min-h-screen bg-[#f5f4ef] text-[#191919] selection:bg-[#ffff7b] selection:text-[#191919] pb-32 relative overflow-hidden">

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
                        <div className="font-sans font-bold text-base md:text-xl text-white tracking-tight uppercase">
                            {project.slug === "danup-x-ala" ? (
                                <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                    <span>
                                        3D Artist:{" "}
                                        <a
                                            href="https://www.behance.net/mahdigouadria"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#ffff7b] underline hover:text-white transition-colors"
                                        >
                                            Mahdi Gouadria
                                        </a>
                                    </span>
                                    <span className="text-white/40">|</span>
                                    <span>
                                        Motion Designer:{" "}
                                        <a
                                            href="https://www.behance.net/MabroukAziz"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#ffff7b] underline hover:text-white transition-colors"
                                        >
                                            Mabrouk Aziz
                                        </a>
                                    </span>
                                </span>
                            ) : (
                                project.role
                            )}
                        </div>
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
                ) : project.slug === "samsung-s22-ultra-3d-hero" ? (
                    <div className="space-y-16 mt-8 relative z-10">
                        {/* 1. Samsung Videos */}
                        <div className="relative z-10 py-8">
                            <ScrollReveal direction="up">
                                <div className="w-full max-w-6xl mx-auto flex items-center gap-4 mb-12">
                                    <span className="font-mono text-xs font-bold tracking-widest text-[#191919] bg-[#ffff7b] px-3.5 py-1 rounded-full border border-black/10">01</span>
                                    <div className="flex items-center gap-1">
                                        <div className="w-8 h-[2px] bg-[#191919]" />
                                        <div className="w-8 h-[2px] bg-[#191919]/30" />
                                    </div>
                                    <h3 className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-[#191919]/60">
                                        Samsung S22 Ultra 3D Showcase &amp; Animation
                                    </h3>
                                </div>
                            </ScrollReveal>

                            <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-4xl mx-auto mb-12">
                                <ScrollReveal direction="left" delay={0.1} className="relative h-full w-full max-w-sm">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b] hover:shadow-[0_0_30px_rgba(255,255,123,0.3)] transition-all duration-500 group">
                                        <LazyVideo
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/samsung/videos/samsung_3d_zflip_6.mp4"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                                        />
                                    </div>
                                </ScrollReveal>

                                <ScrollReveal direction="right" delay={0.2} className="relative h-full w-full max-w-sm">
                                    <div className="w-full aspect-[9/16] bg-[#191919] border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl hover:border-[#ffff7b] hover:shadow-[0_0_30px_rgba(255,255,123,0.3)] transition-all duration-500 group">
                                        <LazyVideo
                                            src="https://res.cloudinary.com/zu63qo7h/video/upload/portfolio/samsung/videos/samsung_cgi_final.mp4"
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
