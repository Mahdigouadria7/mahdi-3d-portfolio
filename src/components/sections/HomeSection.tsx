"use client";

import { useState } from "react";
import CVModal from "@/components/ui/CVModal";
import LogoMarquee from "@/components/ui/LogoMarquee";

interface HomeSectionProps {
    isDriving: boolean;
    onDriveStart: () => void;
}


const SKILLS_BAR = [
    "3D Design",
    "CGI Renders",
    "WebGL & Three.js",
    "Motion Graphics",
    "UI/UX Engineering",
    "Brand Identity",
    "Commercial Concepts",
    "Visual Direction",
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
        <section className={`relative w-full min-h-[100dvh] bg-[#141414] flex flex-col justify-between pt-16 md:pt-20 pb-0 transition-opacity duration-1000 ${isDriving ? 'opacity-0' : 'opacity-100'}`}>

            {/* Background subtle grid pattern */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
                <div className="w-full h-full border-b border-dashed border-white/20" />
            </div>

            {/* ── Main Hero Content Box (Elevated higher, matching Reference Image 2) ── */}
            <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center z-10 my-auto px-6 pt-4 pb-2">

                {/* Top Social Proof Badge (Real Human Portrait Avatars + 5 Stars) */}
                <div className="inline-flex items-center gap-3 mb-5 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-sm">
                    <div className="flex -space-x-2.5 overflow-hidden">
                        <img
                            src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_100/v1784987967/portfolio/mahdi_portrait.jpg"
                            alt="Mahdi"
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-[#141414] object-cover"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                            alt="Client 1"
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-[#141414] object-cover"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                            alt="Client 2"
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-[#141414] object-cover"
                        />
                        <img
                            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                            alt="Client 3"
                            className="inline-block h-6 w-6 rounded-full ring-2 ring-[#141414] object-cover"
                        />
                    </div>
                    <Stars count={5} />
                    <span className="font-sans text-xs text-white/90 font-medium">
                        +20 projects completed
                    </span>
                </div>

                {/* Main Headline (Sans-serif base + Playfair italic accents) */}
                <h1
                    className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-[64px] text-white leading-[1.15] tracking-tight max-w-4xl mb-5 font-medium"
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

                {/* Subtitle Paragraph */}
                <p className="font-sans text-xs sm:text-sm md:text-base text-white/60 max-w-[560px] leading-relaxed mb-4 font-normal">
                    I assist brands, agencies, and creators to translate their vision into photorealistic 3D renders and interactive web experiences.
                </p>
            </div>

            {/* ── TOP Yellow Ticker Bar ── */}
            <div className="w-full bg-[#ffff7b] text-[#141414] py-3 overflow-hidden select-none pointer-events-none border-t border-b border-black/10 z-10">
                {/* Track: flex + w-max. Spacing is padding-right ON each item (not gap)
                    so the seam between set-1 end and set-2 start is pixel-identical */}
                <div className="animate-marquee-ticker flex w-max">
                    {[...SKILLS_BAR, ...SKILLS_BAR].map((skill, i) => (
                        <span key={i} className="flex-shrink-0 flex items-center font-sans font-bold text-xs md:text-sm tracking-wide text-[#141414] uppercase pr-10 md:pr-14">
                            {skill}
                            <span className="text-[#141414]/30 ml-4">✦</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* ── Client Logos Marquee Row (drag-to-spin, hover float) ── */}
            <LogoMarquee />

            <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
        </section>
    );
}
