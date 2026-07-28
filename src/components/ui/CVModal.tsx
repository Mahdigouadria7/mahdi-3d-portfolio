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

            {/* Modal Card — Warm Off-White Editorial Surface */}
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
                            <h2 className="font-playfair text-lg md:text-xl text-white leading-tight font-bold truncate">
                                Gouadria{" "}
                                <em className="font-playfair italic font-normal">
                                    Mahdi
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
                            href="/cv.pdf"
                            download="Mahdi_Gouadria_CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#ffff7b] text-[#191919] font-sans text-xs font-bold uppercase tracking-wider hover:bg-white active:scale-95 transition-all duration-200 shadow-md cursor-pointer relative z-50 pointer-events-auto whitespace-nowrap"
                        >
                            <span>Download PDF CV</span>
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
                    {/* Profil / Bio Banner Card */}
                    <div className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-emerald-700">
                                Profil — Available for Commissions &amp; Full-Time Roles
                            </span>
                        </div>
                        <p className="font-sans text-sm text-[#191919] leading-relaxed font-normal">
                            Driven Tunisian 3D Artist with a strong software engineering background, blending technical precision with creative vision to produce high-quality CGI, motion design, and product visualizations. Experienced in working with top brands, optimizing assets for VR/AR, and collaborating with multidisciplinary teams to deliver impactful visual content.
                        </p>
                    </div>

                    {/* 2-Column High Contrast Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

                        {/* Left Column: Contact, Software, Languages, Highlights */}
                        <div className="md:col-span-5 space-y-6">

                            {/* Contact & Info */}
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
                                        <span className="font-medium text-[#191919]">Arabic, French, English, German</span>
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

                            {/* Software & Tools */}
                            <section className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                <h3 className="font-playfair text-xl text-[#191919] font-bold mb-4 border-b border-[#191919]/10 pb-2">
                                    Software <em className="font-playfair italic font-normal">&amp; Tools</em>
                                </h3>
                                <div className="space-y-3">
                                    <div>
                                        <span className="font-sans text-[11px] font-bold text-[#191919]/60 uppercase tracking-wider block mb-1.5">3D &amp; VFX</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {["Blender 3D", "HoudiniFX", "EmberGen", "Substance Painter", "AccuRig", "ZBrush"].map((tool) => (
                                                <span key={tool} className="px-2.5 py-1 bg-[#191919]/5 border border-[#191919]/10 rounded-full font-sans text-xs font-semibold text-[#191919]">
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="font-sans text-[11px] font-bold text-[#191919]/60 uppercase tracking-wider block mb-1.5">Motion &amp; Post</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {["After Effects", "DaVinci Resolve", "Photoshop", "Illustrator", "FL Studio"].map((tool) => (
                                                <span key={tool} className="px-2.5 py-1 bg-[#191919]/5 border border-[#191919]/10 rounded-full font-sans text-xs font-semibold text-[#191919]">
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <span className="font-sans text-[11px] font-bold text-[#191919]/60 uppercase tracking-wider block mb-1.5">Development &amp; WebGL</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {["Software Engineering", "Three.js", "WebGL / GLSL", "React / Next.js", "VR/AR Optimization"].map((tool) => (
                                                <span key={tool} className="px-2.5 py-1 bg-[#191919]/5 border border-[#191919]/10 rounded-full font-sans text-xs font-semibold text-[#191919]">
                                                    {tool}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Languages */}
                            <section className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                <h3 className="font-playfair text-xl text-[#191919] font-bold mb-4 border-b border-[#191919]/10 pb-2">
                                    Languages <em className="font-playfair italic font-normal">&amp; Proficiency</em>
                                </h3>
                                <ul className="space-y-2 font-sans text-xs">
                                    <li className="flex justify-between items-center"><span className="font-semibold text-[#191919]">Arabic</span><span className="text-[#191919]/60 font-medium">Native</span></li>
                                    <li className="flex justify-between items-center"><span className="font-semibold text-[#191919]">French</span><span className="text-[#191919]/60 font-medium">DELF B2 Certificate</span></li>
                                    <li className="flex justify-between items-center"><span className="font-semibold text-[#191919]">English</span><span className="text-[#191919]/60 font-medium">Fluent</span></li>
                                    <li className="flex justify-between items-center"><span className="font-semibold text-[#191919]">German (Deutsch)</span><span className="text-[#191919]/60 font-medium">Beginner</span></li>
                                </ul>
                            </section>

                        </div>

                        {/* Right Column: Work Experience & Education */}
                        <div className="md:col-span-7 space-y-6">

                            {/* Work Experience */}
                            <section className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                <h3 className="font-playfair text-xl text-[#191919] font-bold mb-6 border-b border-[#191919]/10 pb-2">
                                    Work <em className="font-playfair italic font-normal">Experience</em>
                                </h3>
                                <div className="space-y-6">

                                    {/* Innov8 Agency */}
                                    <div className="border-l-2 border-[#191919] pl-4 space-y-2">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                            <h4 className="font-sans text-sm font-bold text-[#191919]">3D ARTIST – INNOV8 CREATIVE AGENCY</h4>
                                            <span className="font-sans text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block w-max mt-1 sm:mt-0">May 2024 — Present</span>
                                        </div>
                                        <ul className="list-disc list-inside font-sans text-xs text-[#191919]/80 space-y-1.5 leading-relaxed font-normal">
                                            <li>Produced 3D motion design and CGI videos for high-profile marketing campaigns.</li>
                                            <li>Designed engaging call-to-actions combining 3D and 2D elements.</li>
                                            <li>Collaborated with graphic designers and production teams to ensure creative and technical excellence.</li>
                                        </ul>
                                        <div className="pt-2 border-t border-[#191919]/5">
                                            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#191919]/50 block mb-1">Key Clients &amp; Brands:</span>
                                            <p className="font-sans text-[11px] text-[#191919] font-medium leading-relaxed bg-[#191919]/5 p-2.5 rounded-lg border border-[#191919]/10">
                                                Samsung, LG Electronics, Délice Danone, Orange, UBCI Bank, Papillon, Kif Biscuit, Mall of Sfax &amp; Sousse, Jouda, Danup, Danao, Eau Délice, Rose Blanche.
                                            </p>
                                        </div>
                                    </div>

                                    {/* SheTech Studio */}
                                    <div className="border-l-2 border-[#191919]/30 pl-4 space-y-2">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                            <h4 className="font-sans text-sm font-bold text-[#191919]">3D ARTIST – SHETECH STUDIO (VR Game Dev)</h4>
                                            <span className="font-sans text-[11px] font-semibold text-[#191919]/60">Oct 2022 — Apr 2024</span>
                                        </div>
                                        <p className="font-sans text-xs text-[#191919]/70 font-medium">Tunisia</p>
                                        <ul className="list-disc list-inside font-sans text-xs text-[#191919]/80 space-y-1.5 leading-relaxed font-normal">
                                            <li>Created VR-optimized 3D environments and Level Designs for healthcare-focused VR games.</li>
                                            <li>Modeled and textured assets using Blender, ZBrush, and Substance Painter.</li>
                                            <li>Composed the game’s original soundtrack (OST) and produced sound effects using FL Studio.</li>
                                        </ul>
                                    </div>

                                    {/* Freelance */}
                                    <div className="border-l-2 border-[#191919]/30 pl-4 space-y-2">
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                            <h4 className="font-sans text-sm font-bold text-[#191919]">FREELANCE 3D ARTIST &amp; CGI DESIGNER</h4>
                                            <span className="font-sans text-[11px] font-semibold text-[#191919]/60">2019 — Present</span>
                                        </div>
                                        <p className="font-sans text-xs text-[#191919]/80 leading-relaxed font-normal">
                                            Developed CGI ads, product renders, and motion design for local and international clients.
                                        </p>
                                        <div className="pt-1">
                                            <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#191919]/50 block mb-1">Selected Clients:</span>
                                            <span className="font-sans text-[11px] text-[#191919] font-medium">
                                                Bioderma Cosmetics, Karina, Yves Rocher, GPlex Cosmetics.
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </section>

                            {/* Education & Credentials */}
                            <section className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                <h3 className="font-playfair text-xl text-[#191919] font-bold mb-4 border-b border-[#191919]/10 pb-2">
                                    Education <em className="font-playfair italic font-normal">&amp; Credentials</em>
                                </h3>
                                <div className="space-y-4">
                                    <div className="border-l-2 border-[#191919] pl-3 space-y-1">
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="font-sans text-xs font-bold text-[#191919]">Software Engineering</h4>
                                            <span className="font-sans text-[10px] text-[#191919]/60 font-semibold">2019 — 2022</span>
                                        </div>
                                        <p className="font-sans text-xs text-[#191919]/70 font-medium">École Polytechnique de Sousse</p>
                                        <p className="font-sans text-[11px] text-[#191919]/90 italic pt-1">
                                            <strong>Final Project:</strong> Designed and developed an HR management software for ETC Tunisie, combining UX/UI design, 3D elements, and software engineering.
                                        </p>
                                    </div>

                                    <div className="border-l-2 border-[#191919]/20 pl-3 space-y-0.5">
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="font-sans text-xs font-bold text-[#191919]">Computer Science</h4>
                                            <span className="font-sans text-[10px] text-[#191919]/60 font-semibold">2016 — 2019</span>
                                        </div>
                                        <p className="font-sans text-xs text-[#191919]/70 font-medium">ISIG Kairouan</p>
                                    </div>

                                    <div className="border-l-2 border-[#191919]/20 pl-3 space-y-0.5">
                                        <div className="flex justify-between items-baseline">
                                            <h4 className="font-sans text-xs font-bold text-[#191919]">Baccalaureate Mathematics</h4>
                                            <span className="font-sans text-[10px] text-[#191919]/60 font-semibold">2015 — 2016</span>
                                        </div>
                                        <p className="font-sans text-xs text-[#191919]/70 font-medium">Dar Lamen High School, Kairouan</p>
                                    </div>
                                </div>
                            </section>

                            {/* Achievements & Highlights */}
                            <section className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                <h3 className="font-playfair text-xl text-[#191919] font-bold mb-3 border-b border-[#191919]/10 pb-2">
                                    Achievements <em className="font-playfair italic font-normal">&amp; Highlights</em>
                                </h3>
                                <ul className="list-disc list-inside font-sans text-xs text-[#191919]/80 space-y-1.5 leading-relaxed font-normal">
                                    <li>Contributed to CGI marketing campaigns for some of Tunisia’s most recognized global &amp; national brands.</li>
                                    <li>Successfully transitioned from healthcare VR game development to high-end CGI product visualization.</li>
                                    <li>Applied software engineering background to build &amp; optimize 3D asset production pipelines.</li>
                                </ul>
                            </section>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
