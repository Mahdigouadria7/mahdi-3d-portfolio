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

    if (!renderModal) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 pointer-events-auto">
            {/* Dark Backdrop */}
            <div
                className={`absolute inset-0 bg-[#191919]/80 backdrop-blur-md transition-opacity duration-300 ${
                    isAnimating ? "opacity-100" : "opacity-0"
                }`}
                onClick={onClose}
            />

            {/* Modal Card — Nico Studio Cream Surface */}
            <div
                className={`relative w-full max-w-5xl h-full max-h-[88vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${
                    isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
                }`}
                style={{ background: "var(--nico-cream)" }}
            >
                {/* ── Top Header Bar ──────────────────────────────── */}
                <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-[#191919]/10 bg-white/50 backdrop-blur-sm flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#191919] text-[#ffff7b] flex items-center justify-center font-bold text-xs">
                            <span className="font-playfair italic">M</span>
                        </div>
                        <div>
                            <h2
                                className="font-playfair text-xl md:text-2xl text-[#191919] leading-tight"
                                style={{ fontWeight: 700 }}
                            >
                                Mahdi{" "}
                                <em className="font-playfair italic" style={{ fontWeight: 400 }}>
                                    Gouadria
                                </em>
                            </h2>
                            <p className="font-sans text-[10px] text-[#5c5c5c] font-medium tracking-wide uppercase">
                                3D Generalist &amp; Software Engineer
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Download PDF Button */}
                        <a
                            href="/cv.pdf"
                            download="Mahdi_CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ffff7b] text-[#191919] font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#191919] hover:text-white transition-all duration-200 shadow-sm"
                        >
                            Download CV
                            <span className="w-4 h-4 rounded-full bg-[#191919] text-[#ffff7b] flex items-center justify-center text-[9px]">
                                ↓
                            </span>
                        </a>

                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            aria-label="Close CV Modal"
                            className="w-9 h-9 rounded-full bg-[#191919] text-white flex items-center justify-center hover:bg-[#ffff7b] hover:text-[#191919] transition-colors duration-200 cursor-pointer"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ── Scrollable Body Area ───────────────────────── */}
                <div className="flex-1 overflow-y-auto px-6 md:px-10 py-8 space-y-10 hide-scrollbar">

                    {/* Bio Banner Card */}
                    <div className="bg-white rounded-2xl p-6 border border-[#191919]/5 shadow-sm">
                        <span className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-600 block mb-2">
                            ● Available for Commissions &amp; Full-time Roles
                        </span>
                        <p className="font-sans text-sm text-[#191919]/80 leading-relaxed font-normal">
                            Driven Tunisian 3D Artist with a strong software engineering background, blending technical precision with creative vision to produce high-quality CGI, motion design, and product visualizations.
                        </p>
                    </div>

                    {/* 2-Column Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-10">

                        {/* Left Column: Sidebar details */}
                        <div className="md:col-span-5 space-y-8">

                            {/* Contact Info */}
                            <section className="bg-white rounded-2xl p-6 border border-[#191919]/5 shadow-sm">
                                <h3 className="font-playfair text-lg text-[#191919] font-bold mb-4">
                                    Contact <em className="font-playfair italic font-normal">&amp; Info</em>
                                </h3>
                                <ul className="space-y-3 font-sans text-xs text-[#191919]/80">
                                    <li className="flex justify-between border-b border-[#191919]/5 pb-2">
                                        <span className="text-[#5c5c5c]">Location</span>
                                        <span className="font-semibold text-[#191919]">Tunisia</span>
                                    </li>
                                    <li className="flex justify-between border-b border-[#191919]/5 pb-2">
                                        <span className="text-[#5c5c5c]">Phone</span>
                                        <span className="font-semibold text-[#191919]">+216 21-833-752</span>
                                    </li>
                                    <li className="flex justify-between border-b border-[#191919]/5 pb-2">
                                        <span className="text-[#5c5c5c]">Email</span>
                                        <span className="font-semibold text-[#191919]">mahdigouadria8@gmail.com</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-[#5c5c5c]">LinkedIn</span>
                                        <span className="font-semibold text-[#191919]">/in/mahdi-gouadria</span>
                                    </li>
                                </ul>
                            </section>

                            {/* Core Skills Badges */}
                            <section className="bg-white rounded-2xl p-6 border border-[#191919]/5 shadow-sm">
                                <h3 className="font-playfair text-lg text-[#191919] font-bold mb-4">
                                    Core <em className="font-playfair italic font-normal">Skills</em>
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Blender 3D",
                                        "3DS Max",
                                        "Redshift",
                                        "Cinema 4D",
                                        "Houdini FX",
                                        "Substance Painter",
                                        "WebGL / Three.js",
                                        "React Three Fiber",
                                        "After Effects",
                                        "DaVinci Resolve",
                                        "CGI Motion",
                                        "Product Renders",
                                        "Next.js",
                                    ].map((skill) => (
                                        <span
                                            key={skill}
                                            className="font-sans text-[11px] font-medium px-3 py-1 rounded-full bg-[#191919]/5 border border-[#191919]/10 text-[#191919]"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* Languages */}
                            <section className="bg-white rounded-2xl p-6 border border-[#191919]/5 shadow-sm">
                                <h3 className="font-playfair text-lg text-[#191919] font-bold mb-4">
                                    Languages
                                </h3>
                                <div className="space-y-2 font-sans text-xs">
                                    <div className="flex justify-between py-1 border-b border-[#191919]/5">
                                        <span className="text-[#191919]">Arabic</span>
                                        <span className="font-semibold text-emerald-700">Native</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-[#191919]/5">
                                        <span className="text-[#191919]">French</span>
                                        <span className="text-[#5c5c5c]">Delf B2</span>
                                    </div>
                                    <div className="flex justify-between py-1 border-b border-[#191919]/5">
                                        <span className="text-[#191919]">English</span>
                                        <span className="text-[#5c5c5c]">Fluent</span>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Column: Work Experience & Education */}
                        <div className="md:col-span-7 space-y-8">

                            {/* Work Experience */}
                            <section>
                                <h3 className="font-playfair text-2xl text-[#191919] font-bold mb-6">
                                    Work <em className="font-playfair italic font-normal">Experience</em>
                                </h3>

                                <div className="space-y-6">

                                    {/* Exp 1 */}
                                    <div className="bg-white rounded-2xl p-6 border border-[#191919]/5 shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-sans font-bold text-base text-[#191919]">
                                                    3D Artist &amp; Motion Generalist
                                                </h4>
                                                <p className="font-sans text-xs text-emerald-700 font-semibold">
                                                    Innov8 Creative Agency
                                                </p>
                                            </div>
                                            <span className="font-sans text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#ffff7b] text-[#191919]">
                                                May 2024 – Present
                                            </span>
                                        </div>
                                        <p className="font-sans text-xs text-[#5c5c5c] leading-relaxed mb-3">
                                            Produced high-profile 3D motion design and CGI campaign visuals combining 3D &amp; 2D elements.
                                        </p>
                                        <p className="font-sans text-[11px] text-[#191919] font-semibold">
                                            Key Clients: <span className="font-normal text-[#5c5c5c]">Samsung, LG Electronics, Orange, Délice Danone, UBCI Bank, Papillon, Kif Biscuit, Mall of Sfax &amp; Sousse.</span>
                                        </p>
                                    </div>

                                    {/* Exp 2 */}
                                    <div className="bg-white rounded-2xl p-6 border border-[#191919]/5 shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-sans font-bold text-base text-[#191919]">
                                                    3D Environment Artist
                                                </h4>
                                                <p className="font-sans text-xs text-[#5c5c5c] font-semibold">
                                                    Shetech Studio (VR Games)
                                                </p>
                                            </div>
                                            <span className="font-sans text-[10px] font-medium text-[#5c5c5c] px-2.5 py-1 rounded-full bg-[#191919]/5">
                                                Oct 2022 – Apr 2024
                                            </span>
                                        </div>
                                        <p className="font-sans text-xs text-[#5c5c5c] leading-relaxed">
                                            Created VR-optimized 3D environments, Level Designs, and modeled/textured assets in Blender and ZBrush for healthcare VR games.
                                        </p>
                                    </div>

                                    {/* Exp 3 */}
                                    <div className="bg-white rounded-2xl p-6 border border-[#191919]/5 shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-sans font-bold text-base text-[#191919]">
                                                    Freelance 3D Artist &amp; CGI Designer
                                                </h4>
                                                <p className="font-sans text-xs text-[#5c5c5c] font-semibold">
                                                    Self-Employed
                                                </p>
                                            </div>
                                            <span className="font-sans text-[10px] font-medium text-[#5c5c5c] px-2.5 py-1 rounded-full bg-[#191919]/5">
                                                2019 – Present
                                            </span>
                                        </div>
                                        <p className="font-sans text-xs text-[#5c5c5c] leading-relaxed">
                                            CGI commercials, product renders, and interactive web visual experiences for global brands including Bioderma Cosmetics, Yves Rocher, and GPlex.
                                        </p>
                                    </div>

                                </div>
                            </section>

                            {/* Education */}
                            <section>
                                <h3 className="font-playfair text-2xl text-[#191919] font-bold mb-4">
                                    Education
                                </h3>
                                <div className="bg-white rounded-2xl p-6 border border-[#191919]/5 shadow-sm space-y-4">
                                    <div>
                                        <h4 className="font-sans text-sm font-bold text-[#191919]">
                                            Software Engineering Degree
                                        </h4>
                                        <p className="font-sans text-xs text-[#5c5c5c]">
                                            École Polytechnique de Sousse (2019 – 2022)
                                        </p>
                                    </div>
                                    <div className="border-t border-[#191919]/5 pt-3">
                                        <h4 className="font-sans text-sm font-bold text-[#191919]">
                                            Bachelor in Computer Science
                                        </h4>
                                        <p className="font-sans text-xs text-[#5c5c5c]">
                                            ISIG Kairouan (2016 – 2019)
                                        </p>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>

                {/* Footer bar inside modal */}
                <div className="px-6 md:px-10 py-4 border-t border-[#191919]/10 bg-white/40 flex justify-between items-center text-[10px] text-[#5c5c5c] font-sans">
                    <span>© {new Date().getFullYear()} Mahdi Gouadria</span>
                    <span>Nico Studio Editorial Design</span>
                </div>
            </div>
        </div>
    );
}
