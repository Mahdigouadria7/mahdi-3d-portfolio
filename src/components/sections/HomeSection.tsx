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
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#ffff7b">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z" />
                </svg>
            ))}
        </div>
    );
}

export default function HomeSection({ isDriving }: HomeSectionProps) {
    const [isCVOpen, setIsCVOpen] = useState(false);

    return (
        <section className={`relative w-full min-h-[100dvh] bg-[#191919] flex flex-col justify-between pt-28 md:pt-36 pb-10 px-6 md:px-16 transition-opacity duration-1000 ${isDriving ? 'opacity-0' : 'opacity-100'}`}>

            {/* Background 3D Canvas integration grid */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
                <div className="w-full h-full border-b border-dashed border-white/20" />
            </div>

            {/* ── Main Hero Content Box ─────────────────────── */}
            <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center z-10 my-auto py-6">

                {/* Top Social Proof Badge */}
                <div className="inline-flex items-center gap-3 bg-white/[0.05] border border-white/10 rounded-full px-4 py-2 mb-8 backdrop-blur-md">
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
                    <span className="font-mono text-[10px] md:text-xs text-white/80 tracking-wide font-medium">
                        +20 projects completed
                    </span>
                </div>

                {/* Giant Editorial Headline */}
                <h1
                    className="font-playfair text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.08] tracking-tight max-w-4xl mb-6"
                    style={{ fontWeight: 700 }}
                >
                    Custom{" "}
                    <em className="font-playfair italic" style={{ fontWeight: 400 }}>
                        3D &amp; CGI design,
                    </em>{" "}
                    engineered to transform your vision into a true{" "}
                    <em className="font-playfair italic" style={{ fontWeight: 400 }}>
                        visual powerhouse.
                    </em>
                </h1>

                {/* Subtitle */}
                <p className="font-mono text-xs md:text-sm text-white/60 max-w-xl leading-relaxed mb-10 font-medium">
                    I assist brands, agencies, and creators to translate their vision into photorealistic 3D renders and interactive web experiences.
                </p>

                {/* Primary Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-3 bg-[#ffff7b] text-[#191919] font-mono text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-full hover:bg-white transition-all duration-300 font-bold shadow-lg shadow-[#ffff7b]/10"
                    >
                        Start a project
                        <span className="w-5 h-5 rounded-full bg-[#191919] text-[#ffff7b] flex items-center justify-center text-[10px]">
                            ↗
                        </span>
                    </a>
                    <button
                        onClick={() => setIsCVOpen(true)}
                        className="inline-flex items-center gap-2 border border-white/20 text-white font-mono text-xs tracking-[0.2em] uppercase px-7 py-4 rounded-full hover:border-white/60 hover:bg-white/5 transition-all duration-300 font-semibold cursor-pointer"
                    >
                        View CV / Resume
                    </button>
                </div>
            </div>

            {/* ── Bottom Client & Tool Marquee Strip ───────── */}
            <div className="w-full pt-10 border-t border-white/10 z-10">
                <div className="overflow-hidden py-2 select-none pointer-events-none">
                    <div className="animate-marquee inline-flex whitespace-nowrap gap-12 items-center">
                        {Array(3).fill(0).map((_, groupIdx) => (
                            <div key={groupIdx} className="flex items-center gap-12">
                                {CLIENT_BRAND_LOGOS.map((brand, i) => (
                                    <span
                                        key={i}
                                        className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-white/30 font-bold hover:text-white/60 transition-colors"
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
