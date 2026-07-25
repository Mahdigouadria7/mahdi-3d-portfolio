"use client";

import { useEffect, useState, useRef } from "react";

interface CVModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [renderModal, setRenderModal] = useState(false);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setRenderModal(true);
            document.body.style.overflow = "hidden";
            setTimeout(() => setIsAnimating(true), 30);
        } else {
            setIsAnimating(false);
            document.body.style.overflow = "auto";
            const timer = setTimeout(() => setRenderModal(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Prevent wheel event propagation to body/Lenis
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e: WheelEvent) => {
            e.stopPropagation();
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => {
            container.removeEventListener("wheel", handleWheel);
        };
    }, [renderModal]);

    if (!renderModal) return null;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 md:p-6 pointer-events-auto">
            {/* Solid High-Z Backdrop — Completely covers StickyHeader */}
            <div
                className={`absolute inset-0 bg-[#191919]/90 backdrop-blur-lg transition-opacity duration-300 ${
                    isAnimating ? "opacity-100" : "opacity-0"
                }`}
                onClick={onClose}
            />

            {/* Modal Card — High Contrast Surface */}
            <div
                className={`relative z-10 w-full max-w-5xl h-full max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${
                    isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
                }`}
                style={{ background: "#fcfbf7" }}
            >
                {/* ── Top Header Bar (Spacious, Responsive & Non-wrapping) ──────────────── */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 px-5 md:px-8 py-4 border-b border-[#191919]/15 bg-[#191919] text-white flex-shrink-0 relative z-20">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-[#ffff7b] text-[#191919] flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0">
                            <span className="font-playfair italic text-lg font-black">M</span>
                        </div>
                        <div className="min-w-0">
                            <h2
                                className="font-playfair text-lg md:text-xl text-white leading-tight font-bold truncate"
                            >
                                Mahdi{" "}
                                <em className="font-playfair italic font-normal">
                                    Gouadria
                                </em>
                            </h2>
                            <p className="font-sans text-[10px] md:text-[11px] text-[#ffff7b] font-bold tracking-wider uppercase truncate">
                                3D Generalist &amp; Software Engineer
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto relative z-30 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                        {/* Download PDF Button */}
                        <a
                            href="https://res.cloudinary.com/zu63qo7h/image/upload/fl_attachment/mahdi_cv.pdf"
                            download="Mahdi_CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#ffff7b] text-[#191919] font-sans text-xs font-bold uppercase tracking-wider hover:bg-white active:scale-95 transition-all duration-200 shadow-md cursor-pointer relative z-50 pointer-events-auto whitespace-nowrap"
                        >
                            <span>Download CV</span>
                            <span className="w-4 h-4 rounded-full bg-[#191919] text-[#ffff7b] flex items-center justify-center text-[9px] flex-shrink-0">
                                ↓
                            </span>
                        </a>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            aria-label="Close CV Modal"
                            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-[#191919] active:scale-95 transition-colors duration-200 cursor-pointer relative z-50 pointer-events-auto flex-shrink-0"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ── Scrollable Body Area ── */}
                <div
                    ref={scrollContainerRef}
                    data-lenis-prevent="true"
                    className="flex-1 overflow-y-auto px-6 md:px-10 py-8 space-y-8 overscroll-contain touch-pan-y"
                >
                    {/* Bio Banner Card */}
                    <div className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                        <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-emerald-700 block mb-2">
                            ● Available for Commissions &amp; Full-time Roles
                        </span>
                        <p className="font-sans text-sm text-[#191919] leading-relaxed font-normal">
                            Driven Tunisian 3D Artist with a strong software engineering background, blending technical precision with creative vision to produce high-quality CGI, motion design, and product visualizations.
                        </p>
                    </div>

                    {/* 2-Column High Contrast Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                        {/* Left Column: Sidebar details */}
                        <div className="md:col-span-5 space-y-6">

                            {/* Contact Info */}
                            <section className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                <h3 className="font-playfair text-xl text-[#191919] font-bold mb-4 border-b border-[#191919]/10 pb-2">
                                    Contact <em className="font-playfair italic font-normal">&amp; Info</em>
                                </h3>
                                <ul className="space-y-3 font-sans text-xs text-[#191919]">
                                    <li className="flex items-center justify-between border-b border-[#191919]/5 pb-2">
                                        <span className="font-semibold text-[#191919]/60">Email</span>
                                        <a href="mailto:mahdigouadria8@gmail.com" className="font-medium hover:underline text-[#191919]">
                                            mahdigouadria8@gmail.com
                                        </a>
                                    </li>
                                    <li className="flex items-center justify-between border-b border-[#191919]/5 pb-2">
                                        <span className="font-semibold text-[#191919]/60">Phone</span>
                                        <a href="tel:+21621833752" className="font-medium hover:underline text-[#191919]">
                                            +216 21-833-752
                                        </a>
                                    </li>
                                    <li className="flex items-center justify-between border-b border-[#191919]/5 pb-2">
                                        <span className="font-semibold text-[#191919]/60">Location</span>
                                        <span className="font-medium text-[#191919]">Tunisia (Worldwide Remote)</span>
                                    </li>
                                    <li className="flex items-center justify-between border-b border-[#191919]/5 pb-2">
                                        <span className="font-semibold text-[#191919]/60">Languages</span>
                                        <span className="font-medium text-[#191919]">English, French, Arabic</span>
                                    </li>
                                    <li className="flex items-center justify-between">
                                        <span className="font-semibold text-[#191919]/60">Socials</span>
                                        <div className="flex gap-2 font-medium">
                                            <a href="https://www.linkedin.com/in/mahdi-gouadria" target="_blank" rel="noopener" className="hover:underline">LinkedIn</a>
                                            <span>·</span>
                                            <a href="https://www.instagram.com/mahdi_gouadria" target="_blank" rel="noopener" className="hover:underline">Instagram</a>
                                        </div>
                                    </li>
                                </ul>
                            </section>

                            {/* Core Software Skills */}
                            <section className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                <h3 className="font-playfair text-xl text-[#191919] font-bold mb-4 border-b border-[#191919]/10 pb-2">
                                    Software <em className="font-playfair italic font-normal">&amp; Tools</em>
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {["Blender 3D", "Photoshop", "After Effects", "Three.js", "ZBrush", "Houdini", "React / Next.js", "WebGL / GLSL", "Unreal Engine"].map((tool) => (
                                        <span
                                            key={tool}
                                            className="px-3 py-1 bg-[#191919]/5 border border-[#191919]/10 rounded-full font-sans text-xs font-semibold text-[#191919]"
                                        >
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </section>

                        </div>

                        {/* Right Column: Work Experience & Education */}
                        <div className="md:col-span-7 space-y-6">

                            {/* Experience */}
                            <section className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                <h3 className="font-playfair text-xl text-[#191919] font-bold mb-6 border-b border-[#191919]/10 pb-2">
                                    Work <em className="font-playfair italic font-normal">Experience</em>
                                </h3>
                                <div className="space-y-6">
                                    <div className="border-l-2 border-[#191919] pl-4 space-y-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-sans text-sm font-bold text-[#191919]">Freelance 3D Generalist &amp; WebGL Developer</h4>
                                            <span className="font-sans text-[11px] font-semibold text-[#191919]/60">2021 — Present</span>
                                        </div>
                                        <p className="font-sans text-xs text-[#191919]/70 font-medium">Self-Employed · Remote</p>
                                        <p className="font-sans text-xs text-[#191919] leading-relaxed pt-1 font-normal">
                                            Designed photorealistic CGI commercial concepts, 3D product visualizations, and interactive WebGL experiences for global brands, studios, and agencies.
                                        </p>
                                    </div>

                                    <div className="border-l-2 border-[#191919]/30 pl-4 space-y-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-sans text-sm font-bold text-[#191919]">3D Motion &amp; CGI Concept Artist</h4>
                                            <span className="font-sans text-[11px] font-semibold text-[#191919]/60">2022 — 2024</span>
                                        </div>
                                        <p className="font-sans text-xs text-[#191919]/70 font-medium">Creative Agency Collaborations</p>
                                        <p className="font-sans text-xs text-[#191919] leading-relaxed pt-1 font-normal">
                                            Crafted motion graphics sequences, hard-surface 3D models, lighting setups, and post-production composite renders for digital campaign launches.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* Education */}
                            <section className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                <h3 className="font-playfair text-xl text-[#191919] font-bold mb-4 border-b border-[#191919]/10 pb-2">
                                    Education <em className="font-playfair italic font-normal">&amp; Credentials</em>
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <h4 className="font-sans text-xs font-bold text-[#191919]">Software Engineering &amp; Computer Science</h4>
                                        <p className="font-sans text-xs text-[#191919]/70 font-medium">University Engineering Degree · Tunisia</p>
                                    </div>
                                </div>
                            </section>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
