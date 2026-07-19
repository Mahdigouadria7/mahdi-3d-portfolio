"use client";

import { useEffect, useState } from "react";

interface CVModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [renderModal, setRenderModal] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setRenderModal(true);
            document.body.style.overflow = "hidden";
            // Slight delay to allow DOM to render before triggering CSS transition
            setTimeout(() => setIsAnimating(true), 50);
        } else {
            setIsAnimating(false);
            document.body.style.overflow = "auto";
            // Wait for animation to finish before unmounting
            const timer = setTimeout(() => setRenderModal(false), 1500);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!renderModal) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 pointer-events-auto">
            {/* Background Overlay */}
            <div 
                className={`absolute inset-0 bg-[#0a0514]/80 backdrop-blur-xl transition-opacity duration-700 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
                onClick={onClose}
            ></div>

            {/* Main CV Container */}
            <div 
                className="relative w-full max-w-6xl h-full max-h-[90vh] bg-[#0a0514]/80 backdrop-blur-2xl border border-white/10 overflow-hidden shadow-2xl rounded-sm flex flex-col"
                style={{
                    clipPath: isAnimating ? 'inset(0 0 0 0)' : 'inset(0 50% 0 50%)',
                    transition: isAnimating 
                        ? 'clip-path 1s cubic-bezier(0.22, 1, 0.36, 1) 0.5s' 
                        : 'clip-path 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0s'
                }}
            >
                
                {/* HUD Decorative Elements - Toned down */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                
                {/* Corner Crosshairs - Minimal */}
                <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-white/20"></div>
                <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-white/20"></div>
                <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-white/20"></div>
                <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-white/20"></div>

                {/* Close Button */}
                <button 
                    onClick={onClose}
                    className="absolute top-6 right-6 z-50 text-white/40 hover:text-white transition-colors flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/40 bg-white/5 hover:bg-white/10 p-2 rounded-full"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-5 h-5">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {/* Center Split Line (visible during opening/closing) */}
                <div 
                    className="absolute left-1/2 w-[1px] bg-white/20 pointer-events-none z-50"
                    style={{
                        top: 0,
                        bottom: 0,
                        transformOrigin: 'center',
                        transform: isAnimating ? 'translateX(-50%) scaleY(1)' : 'translateX(-50%) scaleY(0)',
                        opacity: isAnimating ? 0 : 1,
                        transition: isAnimating
                            ? 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0s, opacity 0.3s ease 0.6s'
                            : 'opacity 0.1s ease 0.7s, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1) 0.8s'
                    }}
                ></div>

                {/* Content Area - Scrollable */}
                <div 
                    className="flex-1 overflow-y-auto p-8 md:p-14 z-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                    style={{
                        opacity: isAnimating ? 1 : 0,
                        transition: isAnimating
                            ? 'opacity 1s ease 0.8s'
                            : 'opacity 0.3s ease 0s'
                    }}
                >
                    
                    {/* Header */}
                    <div className="border-b border-white/10 pb-8 mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative">
                        <div>
                            <h1 className="font-siegra text-4xl md:text-6xl text-white tracking-wider mb-3">GOUADRIA <span className="text-white/60">Mahdi</span></h1>
                            <p className="font-mono text-xs md:text-sm text-fuchsia-400 tracking-[0.2em] uppercase">3D Generalist & Software Engineer</p>
                        </div>
                        <div className="flex gap-4 hidden md:flex">
                            {/* Scanning Animation */}
                            <div className="flex flex-col items-end justify-center">
                                <div className="font-mono text-[10px] text-white/40 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse" />
                                    Status: Active
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-12 gap-16 pb-16">
                        {/* Left Column */}
                        <div className="md:col-span-4 space-y-12">
                            
                            {/* Contact */}
                            <section>
                                <h2 className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                                    <span className="w-3 h-[1px] bg-fuchsia-500/50"></span> Contact
                                </h2>
                                <ul className="space-y-4 font-mono text-xs text-white/70">
                                    <li className="flex items-center gap-4 group hover:text-white transition-colors">
                                        <span className="text-white/30 tracking-widest group-hover:text-fuchsia-400 transition-colors">LOC</span> Tunisia
                                    </li>
                                    <li className="flex items-center gap-4 group hover:text-white transition-colors">
                                        <span className="text-white/30 tracking-widest group-hover:text-fuchsia-400 transition-colors">TEL</span> +216 21-833-752
                                    </li>
                                    <li className="flex items-center gap-4 group hover:text-white transition-colors">
                                        <span className="text-white/30 tracking-widest group-hover:text-fuchsia-400 transition-colors">EML</span> mahdigouadria8@gmail.com
                                    </li>
                                    <li className="flex items-center gap-4 group hover:text-white transition-colors">
                                        <span className="text-white/30 tracking-widest group-hover:text-fuchsia-400 transition-colors">LNK</span> /in/mahdi-gouadria
                                    </li>
                                </ul>
                            </section>

                            {/* Skills */}
                            <section>
                                <h2 className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                                    <span className="w-3 h-[1px] bg-fuchsia-500/50"></span> Core Skills
                                </h2>
                                <div className="space-y-4 font-sans text-sm text-white/60">
                                    <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-sm hover:bg-white/[0.04] transition-colors">
                                        <h3 className="font-mono text-white/80 mb-2 tracking-widest uppercase text-[10px]">3D & VFX</h3>
                                        <p className="leading-relaxed">Blender 3D, HoudiniFX (learning), Embergen, Substance Painter, Acquirig.</p>
                                    </div>
                                    <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-sm hover:bg-white/[0.04] transition-colors">
                                        <h3 className="font-mono text-white/80 mb-2 tracking-widest uppercase text-[10px]">Motion & Post</h3>
                                        <p className="leading-relaxed">After Effects, DaVinci Resolve, Photoshop, Illustrator.</p>
                                    </div>
                                    <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-sm hover:bg-white/[0.04] transition-colors">
                                        <h3 className="font-mono text-white/80 mb-2 tracking-widest uppercase text-[10px]">Specialties</h3>
                                        <p className="leading-relaxed">Product Visualization, CGI Commercials, Motion Graphics, VR-Ready Assets.</p>
                                    </div>
                                    <div className="bg-white/[0.02] border border-white/[0.05] p-5 rounded-sm hover:bg-white/[0.04] transition-colors">
                                        <h3 className="font-mono text-white/80 mb-2 tracking-widest uppercase text-[10px]">Technical</h3>
                                        <p className="leading-relaxed">Software Engineering, Pipeline Optimization, Asset Optimization for VR/AR.</p>
                                    </div>
                                </div>
                            </section>

                            {/* Education */}
                            <section>
                                <h2 className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                                    <span className="w-3 h-[1px] bg-fuchsia-500/50"></span> Education
                                </h2>
                                <div className="space-y-6">
                                    <div className="relative pl-6 border-l border-white/10 group">
                                        <div className="absolute top-1.5 -left-[4px] w-2 h-2 bg-fuchsia-500 rounded-full group-hover:bg-fuchsia-400 transition-colors"></div>
                                        <h3 className="font-mono text-white/90 uppercase tracking-wider text-xs mb-1">Software Engineering</h3>
                                        <p className="font-mono text-[10px] text-white/50 mb-2 tracking-widest">École Polytechnique de Sousse (2019 – 2022)</p>
                                        <p className="font-sans text-xs text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">Final Project: Designed and developed an HR management software for ETC Tunisie, combining UX/UI design, 3D elements, and software development skills.</p>
                                    </div>
                                    <div className="relative pl-6 border-l border-white/10 group">
                                        <div className="absolute top-1.5 -left-[3px] w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-white/50 transition-colors"></div>
                                        <h3 className="font-mono text-white/90 uppercase tracking-wider text-xs mb-1">Computer Science</h3>
                                        <p className="font-mono text-[10px] text-white/50 tracking-widest">ISIG Kairouan (2016 – 2019)</p>
                                    </div>
                                    <div className="relative pl-6 border-l border-white/10 group">
                                        <div className="absolute top-1.5 -left-[3px] w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-white/50 transition-colors"></div>
                                        <h3 className="font-mono text-white/90 uppercase tracking-wider text-xs mb-1">Bac Math</h3>
                                        <p className="font-mono text-[10px] text-white/50 tracking-widest">Dar Lamen High School (2015 – 2016)</p>
                                    </div>
                                </div>
                            </section>

                            {/* Languages */}
                            <section>
                                <h2 className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                                    <span className="w-3 h-[1px] bg-fuchsia-500/50"></span> Languages
                                </h2>
                                <ul className="space-y-3 font-mono text-xs text-white/70">
                                    <li className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-white/90">Arabic</span> <span className="text-fuchsia-400">Native</span>
                                    </li>
                                    <li className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-white/90">French</span> <span className="text-white/50">Delf B2</span>
                                    </li>
                                    <li className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-white/90">English</span> <span className="text-white/50">Fluent</span>
                                    </li>
                                    <li className="flex justify-between border-b border-white/5 pb-2">
                                        <span className="text-white/90">Deutch</span> <span className="text-white/50">Beginner</span>
                                    </li>
                                </ul>
                            </section>
                        </div>

                        {/* Right Column */}
                        <div className="md:col-span-8 space-y-12">
                            
                            {/* Profil */}
                            <section className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-sm">
                                <h2 className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
                                    <span className="w-3 h-[1px] bg-fuchsia-500/50"></span> Profil
                                </h2>
                                <p className="font-sans text-sm md:text-base text-white/70 leading-relaxed font-light">
                                    Driven Tunisian 3D Artist with a strong software engineering background, blending technical precision with creative vision to produce high-quality CGI, motion design, and product visualizations. Experienced in working with top brands, optimizing assets for VR/AR, and collaborating with multidisciplinary teams to deliver impactful visual content.
                                </p>
                            </section>

                            {/* Experiences */}
                            <section>
                                <h2 className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase mb-8 flex items-center gap-3">
                                    <span className="w-3 h-[1px] bg-fuchsia-500/50"></span> Expériences Professionnelles
                                </h2>
                                <div className="space-y-12">
                                    
                                    <div className="relative pl-8 border-l border-white/10 group">
                                        <div className="absolute top-0 -left-[5px] w-2.5 h-2.5 bg-[#0a0514] border border-fuchsia-500 rounded-full flex items-center justify-center">
                                            <div className="w-1 h-1 bg-fuchsia-500 rounded-full animate-ping"></div>
                                        </div>
                                        <h3 className="font-siegra text-xl md:text-2xl text-white tracking-wider mb-2 group-hover:text-fuchsia-100 transition-colors">3D Artist</h3>
                                        <p className="font-mono text-[10px] md:text-xs text-fuchsia-400 tracking-widest uppercase mb-5">Innov8 Creative Agency | May 2024 - Present</p>
                                        <ul className="list-disc font-sans text-sm md:text-base text-white/60 space-y-4 pl-4 marker:text-fuchsia-500/50 font-light leading-relaxed">
                                            <li>Produced <strong className="text-white font-medium">3D motion design</strong> and <strong className="text-white font-medium">CGI videos</strong> for high-profile marketing campaigns.</li>
                                            <li>Designed engaging <strong className="text-white font-medium">call-to-actions</strong> combining 3D and 2D elements.</li>
                                            <li>Collaborated with graphic designers and production teams to ensure creative and technical excellence.</li>
                                            <li><strong className="text-white font-medium">Key Clients:</strong> Samsung, LG Electronics, Délice Danone, Orange, UBCI Bank, Papillon, Kif Biscuit, Mall of Sfax & Sousse, Jouda, Danup, Danao, Eau Délice, Rose Blanche.</li>
                                        </ul>
                                    </div>

                                    <div className="relative pl-8 border-l border-white/10 group">
                                        <div className="absolute top-0 -left-[3px] w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-white/60 transition-colors"></div>
                                        <h3 className="font-siegra text-xl md:text-2xl text-white/80 tracking-wider mb-2 group-hover:text-white transition-colors">3D Artist</h3>
                                        <p className="font-mono text-[10px] md:text-xs text-white/40 tracking-widest uppercase mb-5">Shetech Studio (VR Game Development) | Oct 2022 – Apr 2024</p>
                                        <ul className="list-disc font-sans text-sm md:text-base text-white/60 space-y-4 pl-4 marker:text-white/20 font-light leading-relaxed">
                                            <li>Created VR-optimized <strong className="text-white/90 font-medium">3D environments</strong> and <strong className="text-white/90 font-medium">Level Designs</strong> for healthcare-focused VR games.</li>
                                            <li>Modeled and textured assets using Blender, ZBrush, and Substance Painter.</li>
                                            <li>Composed the game&apos;s original <strong className="text-white/90 font-medium">soundtrack (OST)</strong> and produced sound effects using <strong className="text-white/90 font-medium">FL Studio</strong>.</li>
                                        </ul>
                                    </div>

                                    <div className="relative pl-8 border-l border-white/10 group">
                                        <div className="absolute top-0 -left-[3px] w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-white/60 transition-colors"></div>
                                        <h3 className="font-siegra text-xl md:text-2xl text-white/80 tracking-wider mb-2 group-hover:text-white transition-colors">Freelance 3D Artist & CGI Designer</h3>
                                        <p className="font-mono text-[10px] md:text-xs text-white/40 tracking-widest uppercase mb-5">2019 – Present</p>
                                        <ul className="list-disc font-sans text-sm md:text-base text-white/60 space-y-4 pl-4 marker:text-white/20 font-light leading-relaxed">
                                            <li>Developed CGI ads, product renders, and motion design for local and international clients.</li>
                                            <li><strong className="text-white/90 font-medium">Selected Clients:</strong> Bioderma Cosmetics, Karina, Yves Rocher, GPlex Cosmetics.</li>
                                        </ul>
                                    </div>

                                </div>
                            </section>

                            {/* Achievements */}
                            <section className="bg-white/[0.02] border border-white/[0.05] p-8 rounded-sm mt-8">
                                <h2 className="font-mono text-xs text-white/40 tracking-[0.2em] uppercase mb-6 flex items-center gap-3">
                                    <span className="w-3 h-[1px] bg-fuchsia-500/50"></span> Achievements & Highlights
                                </h2>
                                <ul className="space-y-4 font-sans text-sm text-white/70 font-light leading-relaxed">
                                    <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-white/20">Contributed to campaigns for some of Tunisia&apos;s most recognized brands.</li>
                                    <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-white/20">Successfully transitioned from VR game development to high-end CGI product visualization.</li>
                                    <li className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-1.5 before:h-1.5 before:rounded-full before:bg-white/20">Applied engineering expertise to improve production workflows and efficiency.</li>
                                </ul>
                            </section>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
