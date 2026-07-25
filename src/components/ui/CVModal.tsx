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
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6 pointer-events-auto">
            {/* Dark Backdrop */}
            <div
                className={`absolute inset-0 bg-[#191919]/85 backdrop-blur-md transition-opacity duration-300 ${
                    isAnimating ? "opacity-100" : "opacity-0"
                }`}
                onClick={onClose}
            />

            {/* Modal Card — High Contrast Surface */}
            <div
                className={`relative w-full max-w-5xl h-full max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${
                    isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
                }`}
                style={{ background: "#fcfbf7" }}
            >
                {/* ── Top Header Bar ──────────────────────────────── */}
                <div className="flex items-center justify-between px-6 md:px-8 py-4 border-b border-[#191919]/15 bg-[#191919] text-white flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#ffff7b] text-[#191919] flex items-center justify-center font-bold text-sm shadow-sm">
                            <span className="font-playfair italic text-base font-black">M</span>
                        </div>
                        <div>
                            <h2
                                className="font-playfair text-xl md:text-2xl text-white leading-tight"
                                style={{ fontWeight: 700 }}
                            >
                                Mahdi{" "}
                                <em className="font-playfair italic" style={{ fontWeight: 400 }}>
                                    Gouadria
                                </em>
                            </h2>
                            <p className="font-sans text-[11px] text-[#ffff7b] font-semibold tracking-wide uppercase">
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
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#ffff7b] text-[#191919] font-sans text-xs font-bold uppercase tracking-wider hover:bg-white transition-all duration-200 shadow-sm"
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
                            className="w-9 h-9 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white hover:text-[#191919] transition-colors duration-200 cursor-pointer"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ── Scrollable Body Area (Scroll Protected & High Contrast) ── */}
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
                                    <li className="flex justify-between border-b border-[#191919]/10 pb-2">
                                        <span className="text-[#5c5c5c] font-medium">Location</span>
                                        <span className="font-bold text-[#191919]">Tunisia</span>
                                    </li>
                                    <li className="flex justify-between border-b border-[#191919]/10 pb-2">
                                        <span className="text-[#5c5c5c] font-medium">Phone</span>
                                        <span className="font-bold text-[#191919]">+216 21-833-752</span>
                                    </li>
                                    <li className="flex justify-between border-b border-[#191919]/10 pb-2">
                                        <span className="text-[#5c5c5c] font-medium">Email</span>
                                        <span className="font-bold text-[#191919] select-all">mahdigouadria8@gmail.com</span>
                                    </li>
                                    <li className="flex justify-between">
                                        <span className="text-[#5c5c5c] font-medium">LinkedIn</span>
                                        <span className="font-bold text-[#191919]">/in/mahdi-gouadria</span>
                                    </li>
                                </ul>
                            </section>

                            {/* Core Skills Badges */}
                            <section className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                <h3 className="font-playfair text-xl text-[#191919] font-bold mb-4 border-b border-[#191919]/10 pb-2">
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
                                            className="font-sans text-[11px] font-semibold px-3 py-1 rounded-full bg-[#191919] text-white"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* Languages */}
                            <section className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                <h3 className="font-playfair text-xl text-[#191919] font-bold mb-4 border-b border-[#191919]/10 pb-2">
                                    Languages
                                </h3>
                                <div className="space-y-2 font-sans text-xs">
                                    <div className="flex justify-between py-1.5 border-b border-[#191919]/10">
                                        <span className="font-semibold text-[#191919]">Arabic</span>
                                        <span className="font-bold text-emerald-700">Native</span>
                                    </div>
                                    <div className="flex justify-between py-1.5 border-b border-[#191919]/10">
                                        <span className="font-semibold text-[#191919]">French</span>
                                        <span className="font-bold text-[#191919]">Delf B2</span>
                                    </div>
                                    <div className="flex justify-between py-1.5">
                                        <span className="font-semibold text-[#191919]">English</span>
                                        <span className="font-bold text-[#191919]">Fluent</span>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Right Column: Work Experience & Education */}
                        <div className="md:col-span-7 space-y-6">

                            {/* Work Experience */}
                            <section>
                                <h3 className="font-playfair text-2xl text-[#191919] font-bold mb-4">
                                    Work <em className="font-playfair italic font-normal">Experience</em>
                                </h3>

                                <div className="space-y-5">

                                    {/* Exp 1 */}
                                    <div className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-sans font-bold text-base text-[#191919]">
                                                    3D Artist &amp; Motion Generalist
                                                </h4>
                                                <p className="font-sans text-xs text-emerald-800 font-bold">
                                                    Innov8 Creative Agency
                                                </p>
                                            </div>
                                            <span className="font-sans text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#ffff7b] text-[#191919] shadow-sm">
                                                May 2024 – Present
                                            </span>
                                        </div>
                                        <p className="font-sans text-xs text-[#191919]/80 leading-relaxed mb-3 font-normal">
                                            Produced high-profile 3D motion design and CGI campaign visuals combining 3D &amp; 2D elements.
                                        </p>
                                        <p className="font-sans text-[11px] text-[#191919] font-bold border-t border-[#191919]/10 pt-2.5">
                                            Key Clients: <span className="font-medium text-[#191919]/80">Samsung, LG Electronics, Orange, Délice Danone, UBCI Bank, Papillon, Kif Biscuit, Mall of Sfax &amp; Sousse.</span>
                                        </p>
                                    </div>

                                    {/* Exp 2 */}
                                    <div className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-sans font-bold text-base text-[#191919]">
                                                    3D Environment Artist
                                                </h4>
                                                <p className="font-sans text-xs text-[#191919] font-bold">
                                                    Shetech Studio (VR Games)
                                                </p>
                                            </div>
                                            <span className="font-sans text-[10px] font-bold text-[#191919] px-3 py-1 rounded-full bg-[#191919]/10">
                                                Oct 2022 – Apr 2024
                                            </span>
                                        </div>
                                        <p className="font-sans text-xs text-[#191919]/80 leading-relaxed font-normal">
                                            Created VR-optimized 3D environments, Level Designs, and modeled/textured assets in Blender and ZBrush for healthcare VR games.
                                        </p>
                                    </div>

                                    {/* Exp 3 */}
                                    <div className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h4 className="font-sans font-bold text-base text-[#191919]">
                                                    Freelance 3D Artist &amp; CGI Designer
                                                </h4>
                                                <p className="font-sans text-xs text-[#191919] font-bold">
                                                    Self-Employed
                                                </p>
                                            </div>
                                            <span className="font-sans text-[10px] font-bold text-[#191919] px-3 py-1 rounded-full bg-[#191919]/10">
                                                2019 – Present
                                            </span>
                                        </div>
                                        <p className="font-sans text-xs text-[#191919]/80 leading-relaxed font-normal">
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
                                <div className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm space-y-4">
                                    <div>
                                        <h4 className="font-sans text-sm font-bold text-[#191919]">
                                            Software Engineering Degree
                                        </h4>
                                        <p className="font-sans text-xs text-[#191919]/80 font-medium">
                                            École Polytechnique de Sousse (2019 – 2022)
                                        </p>
                                    </div>
                                    <div className="border-t border-[#191919]/10 pt-3">
                                        <h4 className="font-sans text-sm font-bold text-[#191919]">
                                            Bachelor in Computer Science
                                        </h4>
                                        <p className="font-sans text-xs text-[#191919]/80 font-medium">
                                            ISIG Kairouan (2016 – 2019)
                                        </p>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>

                {/* Footer bar inside modal */}
                <div className="px-6 md:px-8 py-3 border-t border-[#191919]/15 bg-[#191919] text-white flex justify-between items-center text-[11px] font-sans font-medium flex-shrink-0">
                    <span>© {new Date().getFullYear()} Mahdi Gouadria</span>
                    <span>Curriculum Vitae</span>
                </div>
            </div>
        </div>
    );
}
