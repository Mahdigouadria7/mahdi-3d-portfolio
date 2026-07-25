"use client";

import { useState } from "react";
import CVModal from "@/components/ui/CVModal";

interface HomeSectionProps {
    isDriving: boolean;
    onDriveStart: () => void;
}

const CLIENT_BRAND_LOGOS = [
    "3DS MAX",
    "REDSHIFT",
    "CINEMA 4D",
    "BLENDER",
    "HOUDINI",
    "THREE.JS",
    "REACT THREE FIBER",
    "NEXT.JS",
    "FIFA CONCEPTS",
    "RED BULL CONCEPT",
    "ATELIER SARTIS",
];

function Stars({ count = 5 }: { count?: number }) {
    return (
        <div className="flex gap-0.5">
            {Array(count).fill(0).map((_, i) => (
                <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#ffff7b">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z" />
                </svg>
            ))}
        </div>
    );
}

export default function HomeSection({ isDriving }: HomeSectionProps) {
    const [isCVOpen, setIsCVOpen] = useState(false);

    return (
        <section className={`relative w-full min-h-[100dvh] bg-[#191919] flex flex-col justify-between pt-24 md:pt-32 pb-6 px-6 md:px-12 transition-opacity duration-1000 ${isDriving ? 'opacity-0' : 'opacity-100'}`}>

            {/* Background subtle grid */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
                <div className="w-full h-full border-b border-dashed border-white/20" />
            </div>

            {/* ── Main Hero Content Box (exact Nico Studio layout) ── */}
            <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center z-10 my-auto py-4">

                {/* Top Social Proof Badge */}
                <div className="inline-flex items-center gap-2.5 mb-6">
                    {/* Overlapping Avatar Circles */}
                    <div className="flex -space-x-2 overflow-hidden">
                        <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#191919] bg-white/20 flex items-center justify-center font-mono text-[9px] font-bold text-white">
                            AK
                        </div>
                        <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#191919] bg-[#ffff7b] flex items-center justify-center font-mono text-[9px] font-bold text-[#191919]">
                            LM
                        </div>
                        <div className="inline-block h-6 w-6 rounded-full ring-2 ring-[#191919] bg-fuchsia-500 flex items-center justify-center font-mono text-[9px] font-bold text-white">
                            ST
                        </div>
                    </div>
                    <Stars count={5} />
                    <span className="font-sans text-xs text-white/80 font-medium">
                        +20 projects completed
                    </span>
                </div>

                {/* Main Headline (Sans-serif base + Playfair italic accents) */}
                <h1
                    className="font-sans text-3xl sm:text-5xl md:text-6xl lg:text-[62px] text-white leading-[1.18] tracking-tight max-w-4xl mb-5 font-medium"
                >
                    Custom{" "}
                    <em className="font-playfair italic font-normal">
                        3D &amp; CGI design,
                    </em>
                    <br className="hidden sm:inline" />
                    {" "}engineered to transform your image
                    <br className="hidden sm:inline" />
                    {" "}into a true{" "}
                    <em className="font-playfair italic font-normal">
                        visual powerhouse.
                    </em>
                </h1>

                {/* Subtitle */}
                <p className="font-sans text-xs md:text-sm text-white/60 max-w-[560px] leading-relaxed mb-6 font-normal">
                    I assist brands, agencies, and creators to translate their vision into photorealistic 3D renders and interactive web experiences.
                </p>

                {/* Action CTA */}
                <div className="flex items-center gap-3">
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 bg-[#ffff7b] text-[#191919] font-sans text-xs tracking-wider uppercase px-6 py-3 rounded-full hover:bg-white transition-all duration-200 font-bold shadow-md"
                    >
                        Start a project
                        <span className="w-4 h-4 rounded-full bg-[#191919] text-[#ffff7b] flex items-center justify-center text-[9px]">
                            ↗
                        </span>
                    </a>
                    <button
                        onClick={() => setIsCVOpen(true)}
                        className="inline-flex items-center gap-2 border border-white/30 text-white font-sans text-xs tracking-wider uppercase px-6 py-3 rounded-full hover:border-white/70 hover:bg-white/5 transition-all duration-200 font-medium cursor-pointer"
                    >
                        View CV
                    </button>
                </div>
            </div>

            {/* ── Bottom Client / Software Logos Row ───────── */}
            <div className="w-full pt-6 border-t border-white/10 z-10">
                <div className="overflow-hidden py-2 select-none pointer-events-none">
                    <div className="animate-marquee inline-flex whitespace-nowrap gap-10 items-center">
                        {Array(3).fill(0).map((_, groupIdx) => (
                            <div key={groupIdx} className="flex items-center gap-10">
                                {CLIENT_BRAND_LOGOS.map((brand, i) => (
                                    <span
                                        key={i}
                                        className="font-sans text-xs md:text-[13px] tracking-wide text-white/30 font-semibold hover:text-white/60 transition-colors"
                                    >
                                        {brand}
                                    </span>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
        </section>
    );
}
