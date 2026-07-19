import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Metadata } from "next";
import AnimatedProjectHero from "@/components/sections/AnimatedProjectHero";
import BackButton from "@/components/ui/BackButton";
import PreviousProjectButton from "@/components/ui/PreviousProjectButton";
import NextProjectButton from "@/components/ui/NextProjectButton";
import LightboxImage from "@/components/ui/LightboxImage";
import ScrollReveal from "@/components/ui/ScrollReveal";

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

    return (
        <main className="min-h-screen bg-[#05020a] bg-grid-white/[0.02] text-white selection:bg-fuchsia-500 selection:text-white pb-32">
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

            <AnimatedProjectHero project={project} index={projects.findIndex(p => p.slug === project.slug)} />

            {/* Floating Metadata Bar to cover the sharp canvas boundary */}
            <div className="w-full relative z-40 -mt-[48px] bg-[#05020a] bg-grid-white/[0.02]/60 backdrop-blur-2xl border-y border-white/10 shadow-[0_-20px_40px_rgba(5,2,10,0.8),0_20px_40px_rgba(5,2,10,0.8)] py-8 pointer-events-auto">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
                    <div className="flex-1 border-l-2 border-fuchsia-500/50 pl-6 hover:border-white transition-colors duration-500">
                        <p className="font-cyber text-white/30 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2">Client</p>
                        <h4 className="font-tech font-bold text-base md:text-xl text-white tracking-wider uppercase">{project.client}</h4>
                    </div>
                    <div className="flex-1 border-l-2 border-fuchsia-500/50 pl-6 hover:border-white transition-colors duration-500">
                        <p className="font-cyber text-white/30 text-[10px] md:text-xs tracking-[0.3em] uppercase mb-2">Role</p>
                        <h4 className="font-tech font-bold text-base md:text-xl text-white tracking-wider uppercase">{project.role}</h4>
                    </div>
                    <div className="flex-1 border-l-2 border-fuchsia-500/50 pl-6 hover:border-white transition-colors duration-500">
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
                        <div className="absolute top-0 left-0 w-32 h-[1px] bg-fuchsia-500"></div>
                        <div className="absolute top-0 left-0 w-[1px] h-32 bg-fuchsia-500"></div>
                        
                        <h2 className="font-tech text-sm font-bold uppercase tracking-[0.5em] text-fuchsia-400 mb-8 pl-8">
                            // Project Overview
                        </h2>
                        <div className="pl-8 md:pl-24 max-w-5xl">
                            <p className="font-cyber text-3xl md:text-5xl lg:text-6xl text-white leading-[1.1] font-light tracking-tight">
                                {project.fullDescription}
                            </p>
                        </div>
                    </ScrollReveal>
                </div>

                {project.slug !== "trionda-ball-wc-2026" && (
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
                            <div className="w-full h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-sm p-8 md:p-12 shadow-xl card-glitch group transition-all duration-700 hover:z-50 hover:bg-white/[0.08] hover:border-fuchsia-500/50 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(217,70,239,0.3)]">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="font-cyber text-fuchsia-400 text-xs tracking-widest">01</span>
                                    <h3 className="font-tech text-2xl md:text-3xl text-white font-bold uppercase tracking-widest">The Challenge</h3>
                                </div>
                                <p className="font-cyber text-white/70 text-lg md:text-xl leading-relaxed font-light">
                                    {project.challenge}
                                </p>
                            </div>
                        </ScrollReveal>
                        
                        {/* Solution Card */}
                        <ScrollReveal direction="right" delay={0.3} className="w-full md:w-1/2 relative z-30">
                            <div className="w-full h-full bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-sm p-8 md:p-12 shadow-xl card-glitch group transition-all duration-700 hover:z-50 hover:bg-white/[0.08] hover:border-fuchsia-500/50 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(217,70,239,0.3)]">
                                <div className="flex items-center gap-4 mb-8">
                                    <span className="font-cyber text-fuchsia-400 text-xs tracking-widest">02</span>
                                    <h3 className="font-tech text-2xl md:text-3xl text-white font-bold uppercase tracking-widest">The Solution</h3>
                                </div>
                                <p className="font-cyber text-white/70 text-lg md:text-xl leading-relaxed font-light">
                                    {project.solution}
                                </p>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>

                {project.slug !== "trionda-ball-wc-2026" ? (
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
                                    <LightboxImage src="/models/Trionda Ball Project/render 3D Ballenhanced.webp" alt="Trionda Concept" className="w-full h-full object-contain md:object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    <div className="absolute inset-0 border border-white/20 rounded-sm scale-[0.95] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 2. Fluid Dynamics Video - Clean Layout */}
                        <div className="relative z-10 py-16 flex flex-col md:flex-row items-center gap-12">
                            <ScrollReveal direction="left" delay={0.1} className="w-full md:w-[60%] aspect-video bg-[#0a0510] border border-white/10 rounded-sm overflow-hidden relative shadow-2xl hover:shadow-[0_0_40px_rgba(217,70,239,0.2)] transition-shadow duration-700">
                                <video src="/models/Trionda Ball Project/Transition2.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                
                                {/* HUD Element */}
                                <div className="absolute top-6 left-6 flex gap-3 items-center">
                                    <div className="w-3 h-3 rounded-full bg-fuchsia-500 animate-pulse shadow-[0_0_10px_rgba(217,70,239,0.8)]"></div>
                                    <span className="font-cyber text-xs text-white/80 uppercase tracking-widest">REC // FLUID_DYN</span>
                                </div>
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
                                <h3 className="font-tech text-sm font-bold uppercase tracking-[0.5em] text-fuchsia-400 mb-12 pl-8 border-l border-fuchsia-500/50">
                                    // Behind The Scenes
                                </h3>
                            </ScrollReveal>
                            
                            <div className="flex flex-col md:flex-row gap-12 md:gap-8 justify-center items-center">
                                {/* Image 1 - Lower */}
                                <ScrollReveal direction="up" delay={0.1} className="w-full md:w-[45%] md:mt-16 relative group transition-all duration-500 hover:z-50 hover:shadow-[0_0_40px_rgba(217,70,239,0.2)] rounded-sm">
                                    <div className="aspect-[4/3] bg-[#0a0510] border border-white/10 overflow-hidden shadow-2xl rounded-sm">
                                        <LightboxImage src="/models/Trionda Ball Project/Viewport vs render 3D Ball.webp" alt="Viewport vs Render" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0" />
                                    </div>
                                    <div className="absolute -bottom-6 -right-4 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-full px-6 py-3 shadow-xl z-10 pointer-events-none group-hover:border-fuchsia-500/50 transition-colors">
                                        <span className="font-cyber text-xs md:text-sm tracking-widest text-white/80 uppercase">Viewport / Render</span>
                                    </div>
                                </ScrollReveal>
                                
                                {/* Image 2 - Higher */}
                                <ScrollReveal direction="up" delay={0.3} className="w-full md:w-[45%] md:-mt-8 relative group transition-all duration-500 hover:z-50 hover:shadow-[0_0_40px_rgba(217,70,239,0.2)] rounded-sm">
                                    <div className="aspect-[4/3] bg-[#0a0510] border border-white/10 overflow-hidden shadow-2xl rounded-sm">
                                        <LightboxImage src="/models/Trionda Ball Project/Viewport  3D Ball.webp" alt="Viewport Geometry" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0" />
                                    </div>
                                    <div className="absolute -bottom-6 -left-4 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-full px-6 py-3 shadow-xl z-10 pointer-events-none group-hover:border-fuchsia-500/50 transition-colors">
                                        <span className="font-cyber text-xs md:text-sm tracking-widest text-white/80 uppercase">Raw Geometry</span>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 4. High-Res Renders Cascade */}
                        <div className="relative z-10 py-16 flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-0">
                            <ScrollReveal direction="up" delay={0.1} className="w-full md:w-1/3 aspect-[4/5] bg-[#0a0510] border border-white/10 rounded-sm overflow-hidden group relative z-10 shadow-2xl hover:z-50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(217,70,239,0.2)] hover:-translate-y-2">
                                <LightboxImage src="/models/Trionda Ball Project/render 3D Ball.webp" alt="Render 1" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                            </ScrollReveal>
                            <ScrollReveal direction="up" delay={0.2} className="w-full md:w-1/3 aspect-[4/5] bg-[#0a0510] border border-white/10 rounded-sm overflow-hidden group md:mt-8 md:-ml-8 relative z-20 shadow-[0_30px_60px_rgba(0,0,0,0.8)] hover:z-50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(217,70,239,0.3)] hover:-translate-y-2">
                                <LightboxImage src="/models/Trionda Ball Project/render 3D Ball 2.webp" alt="Render 2" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                            </ScrollReveal>
                            <ScrollReveal direction="up" delay={0.3} className="w-full md:w-1/3 aspect-[4/5] bg-[#0a0510] border border-white/10 rounded-sm overflow-hidden group md:mt-16 md:-ml-8 relative z-30 shadow-[0_30px_60px_rgba(0,0,0,0.8)] hover:z-50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(217,70,239,0.4)] hover:-translate-y-2">
                                <LightboxImage src="/models/Trionda Ball Project/render 3D Ball3 .webp" alt="Render 3" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                            </ScrollReveal>
                        </div>

                        {/* 5. Real World Applications - Clean Grid Layout */}
                        <div className="relative z-10 py-16">
                            <ScrollReveal direction="up">
                                <h3 className="font-tech text-sm font-bold uppercase tracking-[0.5em] text-fuchsia-400 mb-12 pl-8 border-l border-fuchsia-500/50">
                                    // Applications
                                </h3>
                            </ScrollReveal>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                                <ScrollReveal direction="up" delay={0.1} className="w-full md:w-[50%] aspect-[16/9] bg-[#0a0510] border border-white/10 rounded-sm overflow-hidden group relative shadow-2xl hover:z-50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(217,70,239,0.2)]">
                                    <LightboxImage src="/models/Trionda Ball Project/Staduim Mockup.webp" alt="Stadium Mockup" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    <div className="absolute top-4 left-4 bg-white/[0.03] backdrop-blur-3xl rounded-full px-4 py-2 border border-white/10 pointer-events-none group-hover:border-fuchsia-500/50 transition-colors">
                                        <span className="font-cyber text-[10px] md:text-xs text-white/50 uppercase tracking-widest">ENV // Stadium_01</span>
                                    </div>
                                </ScrollReveal>
                                <ScrollReveal direction="up" delay={0.3} className="w-full md:w-[40%] aspect-[4/3] bg-[#0a0510] border border-white/10 rounded-sm overflow-hidden group relative z-20 shadow-2xl hover:z-50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(217,70,239,0.3)]">
                                    <LightboxImage src="/models/Trionda Ball Project/Street Billboard_1.webp" alt="Street Billboard" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                    <div className="absolute bottom-4 right-4 bg-white/[0.03] backdrop-blur-3xl rounded-full px-4 py-2 border border-white/10 pointer-events-none group-hover:border-fuchsia-500/50 transition-colors">
                                        <span className="font-cyber text-[10px] md:text-xs text-white/50 uppercase tracking-widest">ENV // Billboard_Urban</span>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                        {/* 6. Action Videos - Displaced Posters */}
                        <div className="relative z-10 pt-8 pb-24">
                            <ScrollReveal direction="up">
                                <h3 className="font-tech text-sm font-bold uppercase tracking-[0.5em] text-fuchsia-400 mb-12 text-center">
                                    // Live Physics Showcase
                                </h3>
                            </ScrollReveal>
                            
                            <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-24">
                                <ScrollReveal direction="up" delay={0.1} className="w-full md:w-[40%] relative">
                                    <div className="aspect-[9/16] bg-[#0a0510] border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(217,70,239,0.15)] rounded-sm hover:shadow-[0_0_50px_rgba(217,70,239,0.3)] transition-shadow duration-500">
                                        <video src="/models/Trionda Ball Project/balls Rolling.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute -left-4 md:-left-8 top-8 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-full px-6 py-4 shadow-2xl z-20 hover:border-fuchsia-500/50 transition-colors">
                                        <span className="font-cyber text-xs md:text-sm tracking-widest text-white/80 uppercase">Sim: Rolling</span>
                                    </div>
                                </ScrollReveal>
                                
                                <ScrollReveal direction="up" delay={0.3} className="w-full md:w-[35%] mt-8 md:mt-32 relative">
                                    <div className="aspect-[9/16] bg-[#0a0510] border border-white/10 overflow-hidden shadow-2xl rounded-sm hover:shadow-[0_0_50px_rgba(217,70,239,0.3)] transition-shadow duration-500">
                                        <video src="/models/Trionda Ball Project/ball Tunisia.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute -right-4 md:-right-8 bottom-8 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-full px-6 py-4 shadow-2xl z-20 hover:border-fuchsia-500/50 transition-colors">
                                        <span className="font-cyber text-xs md:text-sm tracking-widest text-white/80 uppercase">Sim: Action</span>
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
