"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface CVModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const cvSections = [
    { id: "profil", num: "01", title: "Profil", subtitle: "Overview & Bio" },
    { id: "experience", num: "02", title: "Experience", subtitle: "Work & Clients" },
    { id: "software", num: "03", title: "Software & Tools", subtitle: "Stack & VFX" },
    { id: "education", num: "04", title: "Education", subtitle: "Degrees & Projects" },
    { id: "contact", num: "05", title: "Contact & Info", subtitle: "Reach & Socials" },
    { id: "highlights", num: "06", title: "Highlights", subtitle: "Impact & Brand" },
];

function DateBadge({ children }: { children: React.ReactNode }) {
    return (
        <span className="font-sans text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-block whitespace-nowrap shadow-2xs">
            {children}
        </span>
    );
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [renderModal, setRenderModal] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [viewMode, setViewMode] = useState<"dial" | "scroll">("dial");
    
    const dialRailRef = useRef<HTMLDivElement>(null);
    const touchStartY = useRef<number | null>(null);
    const isScrolling = useRef(false);

    // Responsive Mobile Detection
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 1024;
            setIsMobile(mobile);
            if (mobile) {
                setViewMode("scroll");
            }
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Strict Scroll Lock on Background Landing Page
    useEffect(() => {
        if (isOpen) {
            setRenderModal(true);
            setActiveIndex(0);
            if (window.innerWidth < 1024) {
                setViewMode("scroll");
            } else {
                setViewMode("dial");
            }

            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
            if ((window as any).__lenis) {
                (window as any).__lenis.stop();
            }

            setTimeout(() => setIsAnimating(true), 30);
        } else {
            setIsAnimating(false);
            document.body.style.overflow = "auto";
            document.documentElement.style.overflow = "auto";
            if ((window as any).__lenis) {
                (window as any).__lenis.start();
            }

            const timer = setTimeout(() => setRenderModal(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    // Handle Wheel Navigation ONLY on Left Dial Rail
    const handleWheelNav = useCallback((e: WheelEvent) => {
        e.stopPropagation();
        e.preventDefault();
        if (viewMode !== "dial") return;

        if (isScrolling.current) return;
        isScrolling.current = true;

        if (e.deltaY > 15) {
            setActiveIndex((prev) => Math.min(prev + 1, cvSections.length - 1));
        } else if (e.deltaY < -15) {
            setActiveIndex((prev) => Math.max(prev - 1, 0));
        }

        setTimeout(() => {
            isScrolling.current = false;
        }, 280);
    }, [viewMode]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;
            if (e.key === "Escape") onClose();
            if (viewMode === "dial" && !isMobile) {
                if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                    e.preventDefault();
                    setActiveIndex((prev) => Math.min(prev + 1, cvSections.length - 1));
                } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    setActiveIndex((prev) => Math.max(prev - 1, 0));
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, viewMode, isMobile, onClose]);

    // Wheel listener bound ONLY to Left Dial Rail
    useEffect(() => {
        const rail = dialRailRef.current;
        if (!rail || isMobile) return;

        rail.addEventListener("wheel", handleWheelNav, { passive: false });
        return () => {
            rail.removeEventListener("wheel", handleWheelNav);
        };
    }, [handleWheelNav, renderModal, isMobile]);

    // Touch Handlers for Swipe Navigation on Mobile Dial Rail
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (viewMode !== "dial" || touchStartY.current === null || isMobile) return;
        const diffY = touchStartY.current - e.touches[0].clientY;

        if (Math.abs(diffY) > 40) {
            if (diffY > 0) {
                setActiveIndex((prev) => Math.min(prev + 1, cvSections.length - 1));
            } else {
                setActiveIndex((prev) => Math.max(prev - 1, 0));
            }
            touchStartY.current = null;
        }
    };

    if (!renderModal) return null;

    const currentViewMode = isMobile ? "scroll" : viewMode;

    return (
        <div
            data-lenis-prevent="true"
            className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 md:p-6 pointer-events-auto overscroll-none"
        >
            {/* Solid High-Z Backdrop */}
            <div
                data-lenis-prevent="true"
                className={`absolute inset-0 bg-[#191919]/90 backdrop-blur-lg transition-opacity duration-300 ${
                    isAnimating ? "opacity-100" : "opacity-0"
                }`}
                onClick={onClose}
            />

            {/* Modal Card — Warm Off-White Surface */}
            <div
                data-lenis-prevent="true"
                className={`relative z-10 w-full max-w-5xl h-full max-h-[92vh] rounded-3xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 overscroll-none ${
                    isAnimating ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
                }`}
                style={{ background: "#fcfbf7" }}
            >
                {/* ── Top Header Bar (Spacious & Responsive) ──────────────── */}
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
                        {/* View Mode Toggle Button (Hidden on Mobile) */}
                        {!isMobile && (
                            <button
                                onClick={() => setViewMode(viewMode === "dial" ? "scroll" : "dial")}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white font-mono text-[11px] font-bold hover:bg-white/20 transition-all cursor-pointer"
                            >
                                <span>{viewMode === "dial" ? "🎡 Radial Dial View" : "📜 Full Scroll View"}</span>
                            </button>
                        )}

                        {/* Download PDF Button */}
                        <a
                            href="/cv.pdf"
                            download="Mahdi_Gouadria_CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#ffff7b] text-[#191919] font-sans text-xs font-bold uppercase tracking-wider hover:bg-white active:scale-95 transition-all duration-200 shadow-md cursor-pointer relative z-50 pointer-events-auto whitespace-nowrap"
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

                {/* ── Modal Body Area ────────────────────────────────────── */}
                {currentViewMode === "dial" ? (
                    <div className="flex-1 relative overflow-hidden flex flex-col lg:flex-row select-none">
                        
                        {/* ── Left Arc Ring Dial Navigation Column ──────────────── */}
                        <div
                            ref={dialRailRef}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            className="w-full lg:w-[320px] flex-shrink-0 relative flex items-center justify-center lg:justify-start border-b lg:border-b-0 lg:border-r border-[#191919]/10 bg-[#f7f5ed] py-8 lg:py-0 min-h-[160px] lg:min-h-0 overflow-hidden cursor-grab active:cursor-grabbing"
                        >
                            
                            {/* Radial Arc Ring SVG Guide */}
                            <svg
                                className="absolute left-[-180px] top-1/2 -translate-y-1/2 w-[420px] h-[420px] pointer-events-none opacity-20 hidden lg:block"
                                viewBox="0 0 420 420"
                            >
                                <circle
                                    cx="210"
                                    cy="210"
                                    r="190"
                                    fill="none"
                                    stroke="#191919"
                                    strokeWidth="1.5"
                                    strokeDasharray="4 4"
                                />
                            </svg>

                            {/* Section Items along the Radial Arc Wheel */}
                            <div className="relative w-full h-[180px] lg:h-[380px] flex items-center justify-center lg:justify-start lg:pl-10">
                                {cvSections.map((sec, i) => {
                                    const diff = i - activeIndex;
                                    const isCenter = diff === 0;

                                    // Geometry for Arc Curve positioning
                                    const angle = diff * 22; // rotation angle in degrees
                                    const posY = diff * 65; // vertical offset
                                    const posX = Math.abs(diff) * 16; // arc curve inset

                                    return (
                                        <div
                                            key={sec.id}
                                            onClick={() => setActiveIndex(i)}
                                            className="absolute cursor-pointer transition-all duration-500 ease-out flex items-center gap-3.5 group pointer-events-auto"
                                            style={{
                                                transform: `translate3d(${posX}px, ${posY}px, 0px) rotate(${angle}deg)`,
                                                opacity: isCenter ? 1 : Math.max(0.2, 0.45 - Math.abs(diff) * 0.12),
                                                zIndex: isCenter ? 30 : 10 - Math.abs(diff),
                                            }}
                                        >
                                            {/* Active Indicator Dot */}
                                            <div
                                                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 flex-shrink-0 ${
                                                    isCenter ? "bg-[#191919] scale-125 shadow-sm" : "bg-[#191919]/30 group-hover:bg-[#191919]"
                                                }`}
                                            />

                                            {/* Section Number & Title Label */}
                                            <div className="flex items-baseline gap-2.5">
                                                <span
                                                    className={`font-mono transition-all duration-500 ${
                                                        isCenter
                                                            ? "text-4xl md:text-5xl font-black text-[#191919] tracking-tighter"
                                                            : "text-xl md:text-2xl font-bold text-[#191919]/50 group-hover:text-[#191919]"
                                                    }`}
                                                >
                                                    {sec.num}
                                                </span>
                                                {isCenter && (
                                                    <div className="hidden sm:block animate-fadeIn">
                                                        <span className="font-playfair text-base font-bold text-[#191919] block leading-none">
                                                            {sec.title}
                                                        </span>
                                                        <span className="font-sans text-[10px] text-[#191919]/60 font-semibold uppercase tracking-wider block mt-0.5">
                                                            {sec.subtitle}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Section Controls (Prev/Next Arrows) */}
                            <div className="absolute bottom-4 left-6 hidden lg:flex items-center gap-2 z-40">
                                <button
                                    onClick={() => setActiveIndex((prev) => Math.max(prev - 1, 0))}
                                    disabled={activeIndex === 0}
                                    className={`w-8 h-8 rounded-full border border-[#191919]/20 flex items-center justify-center transition-all ${
                                        activeIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-[#191919] hover:text-white cursor-pointer active:scale-95"
                                    }`}
                                >
                                    ↑
                                </button>
                                <button
                                    onClick={() => setActiveIndex((prev) => Math.min(prev + 1, cvSections.length - 1))}
                                    disabled={activeIndex === cvSections.length - 1}
                                    className={`w-8 h-8 rounded-full border border-[#191919]/20 flex items-center justify-center transition-all ${
                                        activeIndex === cvSections.length - 1 ? "opacity-30 cursor-not-allowed" : "hover:bg-[#191919] hover:text-white cursor-pointer active:scale-95"
                                    }`}
                                >
                                    ↓
                                </button>
                                <span className="font-mono text-[10px] text-[#191919]/60 font-bold uppercase tracking-widest ml-2">
                                    {activeIndex + 1} / {cvSections.length}
                                </span>
                            </div>
                        </div>

                        {/* ── Main Centered Content Display Area (Right Side - Independently Scrollable!) ── */}
                        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 max-h-[78vh] touch-pan-y overscroll-contain">
                            
                            {/* 01: PROFIL */}
                            {activeIndex === 0 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#191919]/15 shadow-sm space-y-4">
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                            <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-emerald-700">
                                                Profil — Executive Summary
                                            </span>
                                        </div>
                                        <h3 className="font-playfair text-2xl md:text-3xl text-[#191919] font-extrabold leading-tight">
                                            3D Generalist &amp; Software Engineer
                                        </h3>
                                        <p className="font-sans text-sm md:text-base text-[#191919]/90 leading-relaxed font-normal">
                                            Driven Tunisian 3D Artist with a strong software engineering background, blending technical precision with creative vision to produce high-quality CGI, motion design, and product visualizations. Experienced in working with top brands, optimizing assets for VR/AR, and collaborating with multidisciplinary teams to deliver impactful visual content.
                                        </p>
                                        <div className="pt-4 border-t border-[#191919]/10 grid grid-cols-2 sm:grid-cols-3 gap-4 font-sans text-xs">
                                            <div>
                                                <span className="text-[#191919]/50 block font-semibold uppercase text-[10px]">Location</span>
                                                <span className="font-bold text-[#191919]">Tunisia (Remote)</span>
                                            </div>
                                            <div>
                                                <span className="text-[#191919]/50 block font-semibold uppercase text-[10px]">Experience</span>
                                                <span className="font-bold text-[#191919]">5+ Years</span>
                                            </div>
                                            <div>
                                                <span className="text-[#191919]/50 block font-semibold uppercase text-[10px]">Availability</span>
                                                <span className="font-bold text-emerald-700">Open for Work</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 02: WORK EXPERIENCE */}
                            {activeIndex === 1 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#191919]/15 shadow-sm space-y-6">
                                        <div className="flex justify-between items-center border-b border-[#191919]/10 pb-3">
                                            <h3 className="font-playfair text-2xl text-[#191919] font-bold">
                                                Work <em className="font-playfair italic font-normal">Experience</em>
                                            </h3>
                                            <span className="font-mono text-xs font-bold text-[#191919]/60">6 Companies &amp; Roles</span>
                                        </div>

                                        {/* Innov8 Agency */}
                                        <div className="border-l-2 border-[#191919] pl-4 space-y-2">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                                <h4 className="font-sans text-sm font-bold text-[#191919]">3D ARTIST – INNOV8 CREATIVE AGENCY</h4>
                                                <DateBadge>May 2024 — Present</DateBadge>
                                            </div>
                                            <ul className="list-disc list-inside font-sans text-xs text-[#191919]/80 space-y-1.5 leading-relaxed">
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
                                        <div className="border-l-2 border-[#191919]/30 pl-4 space-y-2 pt-2">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                                <h4 className="font-sans text-sm font-bold text-[#191919]">3D ARTIST – SHETECH STUDIO (VR Game Dev)</h4>
                                                <DateBadge>Oct 2022 — Apr 2024</DateBadge>
                                            </div>
                                            <p className="font-sans text-xs text-[#191919]/70 font-medium">Tunisia</p>
                                            <ul className="list-disc list-inside font-sans text-xs text-[#191919]/80 space-y-1.5 leading-relaxed">
                                                <li>Created VR-optimized 3D environments and Level Designs for healthcare-focused VR games.</li>
                                                <li>Modeled and textured assets using Blender, ZBrush, and Substance Painter.</li>
                                                <li>Composed the game’s original soundtrack (OST) and produced sound effects using FL Studio.</li>
                                            </ul>
                                        </div>

                                        {/* Euro Tech Conseil (ETC) */}
                                        <div className="border-l-2 border-[#191919]/30 pl-4 space-y-2 pt-2">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                                <h4 className="font-sans text-sm font-bold text-[#191919]">UX/UI DESIGNER &amp; WEB DEVELOPER – EURO TECH CONSEIL (ETC)</h4>
                                                <DateBadge>Feb 2022 — Nov 2022</DateBadge>
                                            </div>
                                            <p className="font-sans text-xs text-[#191919]/70 font-medium">Kairouan, Tunisia</p>
                                            <ul className="list-disc list-inside font-sans text-xs text-[#191919]/80 space-y-1.5 leading-relaxed">
                                                <li>Architected and developed an enterprise Human Resource Management System (HRMS) streamlining client and employee administration, payroll tracking, and workflow automation.</li>
                                                <li>Conducted user research, wireframing, and UI component design with Adobe XD &amp; Photoshop.</li>
                                                <li>Engineered full-stack features using Node.js, Express.js, MongoDB, Angular, and RESTful APIs.</li>
                                            </ul>
                                        </div>

                                        {/* GPro */}
                                        <div className="border-l-2 border-[#191919]/30 pl-4 space-y-2 pt-2">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                                <h4 className="font-sans text-sm font-bold text-[#191919]">WEBGL &amp; INTERACTIVE WEB DEVELOPER – GPRO</h4>
                                                <DateBadge>2021</DateBadge>
                                            </div>
                                            <p className="font-sans text-xs text-[#191919]/70 font-medium">Sousse, Tunisia</p>
                                            <ul className="list-disc list-inside font-sans text-xs text-[#191919]/80 space-y-1.5 leading-relaxed">
                                                <li>Architected high-performance interactive web applications integrating real-time 3D models and custom graphics shaders using Three.js, React.js, and JavaScript.</li>
                                            </ul>
                                        </div>

                                        {/* IT Gate */}
                                        <div className="border-l-2 border-[#191919]/30 pl-4 space-y-2 pt-2">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                                <h4 className="font-sans text-sm font-bold text-[#191919]">GAME DESIGNER &amp; 3D ASSET SPECIALIST (INTERNSHIP) – IT GATE</h4>
                                                <DateBadge>2019</DateBadge>
                                            </div>
                                            <p className="font-sans text-xs text-[#191919]/70 font-medium">Sousse, Tunisia</p>
                                            <ul className="list-disc list-inside font-sans text-xs text-[#191919]/80 space-y-1.5 leading-relaxed">
                                                <li>Modeled and textured historical 3D game environments and traditional architectural assets inspired by Kairouan’s heritage for real-time game engines.</li>
                                                <li>Successfully completed as part of the Computer Science graduation project, awarded with excellent distinction.</li>
                                            </ul>
                                        </div>

                                        {/* Freelance */}
                                        <div className="border-l-2 border-[#191919]/30 pl-4 space-y-2 pt-2">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                                                <h4 className="font-sans text-sm font-bold text-[#191919]">FREELANCE 3D ARTIST &amp; CGI DESIGNER</h4>
                                                <DateBadge>2019 — Present</DateBadge>
                                            </div>
                                            <p className="font-sans text-xs text-[#191919]/80 leading-relaxed">
                                                Developed high-end CGI commercials, product renders, and 3D motion graphics for international and local clients.
                                            </p>
                                            <div className="pt-1">
                                                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#191919]/50 block mb-1">Selected Clients:</span>
                                                <span className="font-sans text-[11px] text-[#191919] font-medium">
                                                    Bioderma Cosmetics, Karina, Yves Rocher, GPlex Cosmetics.
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 03: SOFTWARE & TOOLS */}
                            {activeIndex === 2 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#191919]/15 shadow-sm space-y-6">
                                        <h3 className="font-playfair text-2xl text-[#191919] font-bold border-b border-[#191919]/10 pb-3">
                                            Software <em className="font-playfair italic font-normal">&amp; Core Tools</em>
                                        </h3>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <span className="font-sans text-xs font-bold text-[#191919]/60 uppercase tracking-wider block mb-2">3D Modeling, Texturing &amp; Simulation</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {["Blender 3D", "HoudiniFX", "EmberGen", "Substance Painter", "AccuRig", "ZBrush", "VR/AR Pipelines"].map((tool) => (
                                                        <span key={tool} className="px-3 py-1.5 bg-[#191919]/5 border border-[#191919]/10 rounded-full font-sans text-xs font-semibold text-[#191919]">
                                                            {tool}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <span className="font-sans text-xs font-bold text-[#191919]/60 uppercase tracking-wider block mb-2">Motion Graphics &amp; Post-Production</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {["After Effects", "DaVinci Resolve", "Photoshop", "Illustrator", "FL Studio (Audio/OST)"].map((tool) => (
                                                        <span key={tool} className="px-3 py-1.5 bg-[#191919]/5 border border-[#191919]/10 rounded-full font-sans text-xs font-semibold text-[#191919]">
                                                            {tool}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div>
                                                <span className="font-sans text-xs font-bold text-[#191919]/60 uppercase tracking-wider block mb-2">Software Engineering &amp; WebGL</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {["Software Engineering", "Three.js", "WebGL / GLSL Shaders", "React / Next.js", "Node.js", "Express.js", "MongoDB", "Angular", "REST APIs"].map((tool) => (
                                                        <span key={tool} className="px-3 py-1.5 bg-[#191919]/5 border border-[#191919]/10 rounded-full font-sans text-xs font-semibold text-[#191919]">
                                                            {tool}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 04: EDUCATION */}
                            {activeIndex === 3 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#191919]/15 shadow-sm space-y-6">
                                        <h3 className="font-playfair text-2xl text-[#191919] font-bold border-b border-[#191919]/10 pb-3">
                                            Education <em className="font-playfair italic font-normal">&amp; Academic Credentials</em>
                                        </h3>
                                        
                                        <div className="space-y-5">
                                            <div className="border-l-2 border-[#191919] pl-4 space-y-1">
                                                <div className="flex justify-between items-baseline gap-2">
                                                    <h4 className="font-sans text-sm font-bold text-[#191919]">Software Engineering Degree</h4>
                                                    <DateBadge>2019 — 2022</DateBadge>
                                                </div>
                                                <p className="font-sans text-xs text-[#191919]/70 font-medium">École Polytechnique de Sousse</p>
                                                <p className="font-sans text-xs text-[#191919]/90 italic pt-1 leading-relaxed">
                                                    <strong>Final Graduation Project:</strong> Designed and developed an enterprise HR management system for ETC Tunisie, integrating custom UX/UI components, 3D elements, and full-stack software development.
                                                </p>
                                            </div>

                                            <div className="border-l-2 border-[#191919]/30 pl-4 space-y-1">
                                                <div className="flex justify-between items-baseline gap-2">
                                                    <h4 className="font-sans text-sm font-bold text-[#191919]">Computer Science Degree</h4>
                                                    <DateBadge>2016 — 2019</DateBadge>
                                                </div>
                                                <p className="font-sans text-xs text-[#191919]/70 font-medium">ISIG Kairouan</p>
                                                <p className="font-sans text-xs text-[#191919]/90 italic pt-1 leading-relaxed">
                                                    Completed graduation project on 3D game asset creation &amp; environment modeling with excellent honors.
                                                </p>
                                            </div>

                                            <div className="border-l-2 border-[#191919]/30 pl-4 space-y-1">
                                                <div className="flex justify-between items-baseline gap-2">
                                                    <h4 className="font-sans text-sm font-bold text-[#191919]">Baccalaureate Mathematics</h4>
                                                    <DateBadge>2015 — 2016</DateBadge>
                                                </div>
                                                <p className="font-sans text-xs text-[#191919]/70 font-medium">Dar Lamen High School, Kairouan</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* 05: CONTACT & INFO */}
                            {activeIndex === 4 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#191919]/15 shadow-sm space-y-6">
                                        <h3 className="font-playfair text-2xl text-[#191919] font-bold border-b border-[#191919]/10 pb-3">
                                            Contact <em className="font-playfair italic font-normal">&amp; Personal Info</em>
                                        </h3>
                                        
                                        <ul className="space-y-4 font-sans text-xs md:text-sm text-[#191919]">
                                            <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#191919]/5 pb-3">
                                                <span className="font-semibold text-[#191919]/60">Email Address</span>
                                                <a href="mailto:mahdigouadria8@gmail.com" className="font-bold hover:underline text-[#191919] mt-1 sm:mt-0">
                                                    mahdigouadria8@gmail.com
                                                </a>
                                            </li>
                                            <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#191919]/5 pb-3">
                                                <span className="font-semibold text-[#191919]/60">Phone / WhatsApp</span>
                                                <a href="tel:+21621833752" className="font-bold hover:underline text-[#191919] mt-1 sm:mt-0">
                                                    +216 21-833-752
                                                </a>
                                            </li>
                                            <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#191919]/5 pb-3">
                                                <span className="font-semibold text-[#191919]/60">Location</span>
                                                <span className="font-bold text-[#191919] mt-1 sm:mt-0">Tunisia (Worldwide Remote Available)</span>
                                            </li>
                                            <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#191919]/5 pb-3">
                                                <span className="font-semibold text-[#191919]/60">Languages Spoken</span>
                                                <span className="font-bold text-[#191919] mt-1 sm:mt-0">Arabic (Native) · French (DELF B2) · English (Fluent) · German (Beginner)</span>
                                            </li>
                                            <li className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-1">
                                                <span className="font-semibold text-[#191919]/60">Social Channels</span>
                                                <div className="flex gap-3 font-bold mt-1 sm:mt-0">
                                                    <a href="https://www.linkedin.com/in/mahdi-gouadria" target="_blank" rel="noopener" className="hover:underline text-[#191919]">LinkedIn</a>
                                                    <span>·</span>
                                                    <a href="https://www.instagram.com/mahdi_gouadria" target="_blank" rel="noopener" className="hover:underline text-[#191919]">Instagram</a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* 06: HIGHLIGHTS */}
                            {activeIndex === 5 && (
                                <div className="space-y-6 animate-fadeIn">
                                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#191919]/15 shadow-sm space-y-6">
                                        <h3 className="font-playfair text-2xl text-[#191919] font-bold border-b border-[#191919]/10 pb-3">
                                            Key Achievements <em className="font-playfair italic font-normal">&amp; Brand Impact</em>
                                        </h3>
                                        
                                        <ul className="list-disc list-inside font-sans text-sm text-[#191919]/90 space-y-3 leading-relaxed">
                                            <li>Created 3D motion design &amp; CGI commercials for major national &amp; global brands including <strong>Samsung, LG Electronics, Délice Danone, Orange, and UBCI Bank</strong>.</li>
                                            <li>Successfully transitioned from healthcare VR game development to high-end commercial product visualization.</li>
                                            <li>Leveraged software engineering expertise to build &amp; optimize 3D asset pipelines, reducing rendering overhead and accelerating delivery turnaround.</li>
                                            <li>Engineered custom WebGL / Three.js interactive 3D web applications for luxury brand showcases.</li>
                                        </ul>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                ) : (
                    /* ── Complete 100% Full Scroll View Mode ─────────────────────── */
                    <div
                        data-lenis-prevent="true"
                        className="flex-1 overflow-y-auto px-6 md:px-10 py-8 space-y-8 overscroll-contain touch-pan-y"
                    >
                        {/* Executive Summary */}
                        <div className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="font-sans text-xs font-bold tracking-[0.2em] uppercase text-emerald-700">
                                    Profil — Executive Summary
                                </span>
                            </div>
                            <h3 className="font-playfair text-2xl font-extrabold text-[#191919]">Gouadria Mahdi — 3D Generalist &amp; Software Engineer</h3>
                            <p className="font-sans text-sm text-[#191919] leading-relaxed font-normal">
                                Driven Tunisian 3D Artist with a strong software engineering background, blending technical precision with creative vision to produce high-quality CGI, motion design, and product visualizations. Experienced in working with top brands, optimizing assets for VR/AR, and collaborating with multidisciplinary teams to deliver impactful visual content.
                            </p>
                        </div>

                        {/* 2-Column Full Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            
                            {/* Left Column */}
                            <div className="md:col-span-5 space-y-6">
                                {/* Contact Info */}
                                <section className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                    <h3 className="font-playfair text-xl text-[#191919] font-bold mb-4 border-b border-[#191919]/10 pb-2">
                                        Contact <em className="font-playfair italic font-normal">&amp; Info</em>
                                    </h3>
                                    <ul className="space-y-3 font-sans text-xs text-[#191919]">
                                        <li className="flex justify-between border-b border-[#191919]/5 pb-2">
                                            <span className="font-semibold text-[#191919]/60">Email</span>
                                            <a href="mailto:mahdigouadria8@gmail.com" className="font-bold hover:underline text-[#191919]">mahdigouadria8@gmail.com</a>
                                        </li>
                                        <li className="flex justify-between border-b border-[#191919]/5 pb-2">
                                            <span className="font-semibold text-[#191919]/60">Phone</span>
                                            <a href="tel:+21621833752" className="font-bold hover:underline text-[#191919]">+216 21-833-752</a>
                                        </li>
                                        <li className="flex justify-between border-b border-[#191919]/5 pb-2">
                                            <span className="font-semibold text-[#191919]/60">Location</span>
                                            <span className="font-bold">Tunisia (Remote)</span>
                                        </li>
                                        <li className="flex justify-between border-b border-[#191919]/5 pb-2">
                                            <span className="font-semibold text-[#191919]/60">Languages</span>
                                            <span className="font-bold">Arabic, French, English, German</span>
                                        </li>
                                        <li className="flex justify-between pt-1">
                                            <span className="font-semibold text-[#191919]/60">Socials</span>
                                            <div className="flex gap-2 font-bold">
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
                                    <div className="flex flex-wrap gap-1.5">
                                        {["Blender 3D", "HoudiniFX", "EmberGen", "Substance Painter", "AccuRig", "ZBrush", "After Effects", "DaVinci Resolve", "Photoshop", "Illustrator", "FL Studio", "Three.js", "WebGL / GLSL", "React / Next.js", "Node.js", "Express.js", "MongoDB", "Angular"].map((tool) => (
                                            <span key={tool} className="px-2.5 py-1 bg-[#191919]/5 border border-[#191919]/10 rounded-full font-sans text-xs font-semibold text-[#191919]">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </section>

                                {/* Achievements */}
                                <section className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                    <h3 className="font-playfair text-xl text-[#191919] font-bold mb-3 border-b border-[#191919]/10 pb-2">
                                        Key <em className="font-playfair italic font-normal">Achievements</em>
                                    </h3>
                                    <ul className="list-disc list-inside font-sans text-xs text-[#191919]/80 space-y-2 leading-relaxed">
                                        <li>CGI marketing campaigns for Samsung, LG, Danone, Orange, and UBCI Bank.</li>
                                        <li>Transition from healthcare VR game dev to high-end commercial CGI visualization.</li>
                                        <li>Built optimized 3D asset pipelines applying software engineering.</li>
                                    </ul>
                                </section>
                            </div>

                            {/* Right Column */}
                            <div className="md:col-span-7 space-y-6">
                                {/* All 6 Work Experiences */}
                                <section className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                    <h3 className="font-playfair text-xl text-[#191919] font-bold mb-6 border-b border-[#191919]/10 pb-2">
                                        Complete Work <em className="font-playfair italic font-normal">Experience</em>
                                    </h3>
                                    <div className="space-y-6">
                                        
                                        {/* Innov8 */}
                                        <div className="border-l-2 border-[#191919] pl-4 space-y-2">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                                <h4 className="font-sans text-sm font-bold text-[#191919]">3D ARTIST – INNOV8 CREATIVE AGENCY</h4>
                                                <DateBadge>May 2024 — Present</DateBadge>
                                            </div>
                                            <ul className="list-disc list-inside font-sans text-xs text-[#191919]/80 space-y-1 leading-relaxed">
                                                <li>Produced 3D motion design and CGI videos for high-profile marketing campaigns.</li>
                                                <li>Designed engaging call-to-actions combining 3D and 2D elements.</li>
                                                <li>Collaborated with graphic designers and production teams.</li>
                                            </ul>
                                            <div className="pt-2 border-t border-[#191919]/5">
                                                <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#191919]/50 block mb-1">Key Clients &amp; Brands:</span>
                                                <p className="font-sans text-[11px] text-[#191919] font-medium leading-relaxed bg-[#191919]/5 p-2 rounded-lg">
                                                    Samsung, LG Electronics, Délice Danone, Orange, UBCI Bank, Papillon, Kif Biscuit, Mall of Sfax &amp; Sousse, Jouda, Danup, Danao, Eau Délice, Rose Blanche.
                                                </p>
                                            </div>
                                        </div>

                                        {/* SheTech */}
                                        <div className="border-l-2 border-[#191919]/30 pl-4 space-y-2">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                                <h4 className="font-sans text-sm font-bold text-[#191919]">3D ARTIST – SHETECH STUDIO (VR Game Dev)</h4>
                                                <DateBadge>Oct 2022 — Apr 2024</DateBadge>
                                            </div>
                                            <p className="font-sans text-xs text-[#191919]/70 font-medium">Tunisia</p>
                                            <ul className="list-disc list-inside font-sans text-xs text-[#191919]/80 space-y-1 leading-relaxed">
                                                <li>VR environments and level design for healthcare games.</li>
                                                <li>Modeled and textured assets in Blender, ZBrush, Substance Painter.</li>
                                                <li>Composed original soundtrack (OST) and sound effects in FL Studio.</li>
                                            </ul>
                                        </div>

                                        {/* ETC */}
                                        <div className="border-l-2 border-[#191919]/30 pl-4 space-y-2">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                                <h4 className="font-sans text-sm font-bold text-[#191919]">UX/UI DESIGNER &amp; WEB DEVELOPER – EURO TECH CONSEIL (ETC)</h4>
                                                <DateBadge>Feb 2022 — Nov 2022</DateBadge>
                                            </div>
                                            <p className="font-sans text-xs text-[#191919]/70 font-medium">Kairouan, Tunisia</p>
                                            <ul className="list-disc list-inside font-sans text-xs text-[#191919]/80 space-y-1 leading-relaxed">
                                                <li>Architected enterprise HRMS system for client and employee administration.</li>
                                                <li>UI component design in Adobe XD &amp; Photoshop.</li>
                                                <li>Node.js, Express.js, MongoDB, Angular, and RESTful APIs.</li>
                                            </ul>
                                        </div>

                                        {/* GPro */}
                                        <div className="border-l-2 border-[#191919]/30 pl-4 space-y-2">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                                <h4 className="font-sans text-sm font-bold text-[#191919]">WEBGL &amp; INTERACTIVE WEB DEVELOPER – GPRO</h4>
                                                <DateBadge>2021</DateBadge>
                                            </div>
                                            <p className="font-sans text-xs text-[#191919]/70 font-medium">Sousse, Tunisia</p>
                                            <p className="font-sans text-xs text-[#191919]/80 leading-relaxed">Interactive web application integrating real-time 3D models with Three.js &amp; React.js.</p>
                                        </div>

                                        {/* IT Gate */}
                                        <div className="border-l-2 border-[#191919]/30 pl-4 space-y-2">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                                <h4 className="font-sans text-sm font-bold text-[#191919]">GAME DESIGNER &amp; 3D ASSET SPECIALIST – IT GATE</h4>
                                                <DateBadge>2019</DateBadge>
                                            </div>
                                            <p className="font-sans text-xs text-[#191919]/70 font-medium">Sousse, Tunisia</p>
                                            <p className="font-sans text-xs text-[#191919]/80 leading-relaxed">3D game environments &amp; Kairouan architectural heritage assets for graduation project (excellent mark).</p>
                                        </div>

                                        {/* Freelance */}
                                        <div className="border-l-2 border-[#191919]/30 pl-4 space-y-2">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                                                <h4 className="font-sans text-sm font-bold text-[#191919]">FREELANCE 3D ARTIST &amp; CGI DESIGNER</h4>
                                                <DateBadge>2019 — Present</DateBadge>
                                            </div>
                                            <p className="font-sans text-xs text-[#191919]/80 leading-relaxed">CGI ads, product renders, and motion graphics for Bioderma Cosmetics, Karina, Yves Rocher, and GPlex Cosmetics.</p>
                                        </div>

                                    </div>
                                </section>

                                {/* Education */}
                                <section className="bg-white rounded-2xl p-6 border border-[#191919]/15 shadow-sm">
                                    <h3 className="font-playfair text-xl text-[#191919] font-bold mb-4 border-b border-[#191919]/10 pb-2">
                                        Education <em className="font-playfair italic font-normal">&amp; Academic Credentials</em>
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="border-l-2 border-[#191919] pl-3 space-y-1">
                                            <div className="flex justify-between items-baseline gap-2">
                                                <h4 className="font-sans text-xs font-bold text-[#191919]">Software Engineering Degree</h4>
                                                <DateBadge>2019 — 2022</DateBadge>
                                            </div>
                                            <p className="font-sans text-xs text-[#191919]/70 font-medium">École Polytechnique de Sousse</p>
                                            <p className="font-sans text-[11px] text-[#191919]/90 italic pt-0.5">Final Project: Enterprise HR software for ETC Tunisie combining UX/UI, 3D elements, and engineering.</p>
                                        </div>

                                        <div className="border-l-2 border-[#191919]/20 pl-3 space-y-1">
                                            <div className="flex justify-between items-baseline gap-2">
                                                <h4 className="font-sans text-xs font-bold text-[#191919]">Computer Science Degree</h4>
                                                <DateBadge>2016 — 2019</DateBadge>
                                            </div>
                                            <p className="font-sans text-xs text-[#191919]/70 font-medium">ISIG Kairouan</p>
                                        </div>

                                        <div className="border-l-2 border-[#191919]/20 pl-3 space-y-1">
                                            <div className="flex justify-between items-baseline gap-2">
                                                <h4 className="font-sans text-xs font-bold text-[#191919]">Baccalaureate Mathematics</h4>
                                                <DateBadge>2015 — 2016</DateBadge>
                                            </div>
                                            <p className="font-sans text-xs text-[#191919]/70 font-medium">Dar Lamen High School, Kairouan</p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
