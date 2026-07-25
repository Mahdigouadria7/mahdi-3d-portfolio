"use client";

import { useState } from "react";
import CVModal from "@/components/ui/CVModal";

interface HomeSectionProps {
    isDriving: boolean;
    onDriveStart: () => void;
}

const CLIENT_LOGOS = [
    { name: "Samsung", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994634/portfolio/clients/samsung.png", height: "h-7 md:h-8" },
    { name: "Orange", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994632/portfolio/clients/orange.png", height: "h-9 md:h-10" },
    { name: "Danone", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994624/portfolio/clients/danone.png", height: "h-8 md:h-9" },
    { name: "Yves Rocher", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994636/portfolio/clients/yves_rocher.png", height: "h-7 md:h-8" },
    { name: "Délice Holding", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994627/portfolio/clients/delice.png", height: "h-8 md:h-9" },
    { name: "DanUp", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994625/portfolio/clients/danup.png", height: "h-8 md:h-9" },
    { name: "UBCI", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994635/portfolio/clients/ubci.png", height: "h-8 md:h-9" },
    { name: "Diari Express", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994628/portfolio/clients/diari_express.png", height: "h-9 md:h-11" },
    { name: "Jouda", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994630/portfolio/clients/jouda.png", height: "h-8 md:h-9" },
    { name: "Fourré", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994629/portfolio/clients/fourre.png", height: "h-7 md:h-8" },
    { name: "Papillon", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994632/portfolio/clients/papillon.png", height: "h-8 md:h-9" },
    { name: "DCroc", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994626/portfolio/clients/dcroc.png", height: "h-8 md:h-9" },
    { name: "Kif", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994631/portfolio/clients/kif.png", height: "h-8 md:h-9" },
    { name: "Kairna", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994630/portfolio/clients/kairna.png", height: "h-8 md:h-9" },
    { name: "Smile", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994635/portfolio/clients/smile.png", height: "h-8 md:h-9" },
];

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
        <section className={`relative w-full min-h-[100dvh] bg-[#141414] flex flex-col justify-between pt-24 md:pt-28 pb-0 transition-opacity duration-1000 ${isDriving ? 'opacity-0' : 'opacity-100'}`}>

            {/* Background subtle grid pattern */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-10">
                <div className="w-full h-full border-b border-dashed border-white/20" />
            </div>

            {/* ── Main Hero Content Box (Exact match to Reference Image 2) ── */}
            <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center z-10 my-auto px-6 py-6">

                {/* Top Social Proof Badge (Real Human Portrait Avatars + 5 Stars) */}
                <div className="inline-flex items-center gap-3 mb-6 bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 shadow-sm">
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
                    className="font-sans text-4xl sm:text-5xl md:text-6xl lg:text-[64px] text-white leading-[1.16] tracking-tight max-w-4xl mb-6 font-medium"
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
                <p className="font-sans text-xs sm:text-sm md:text-base text-white/60 max-w-[560px] leading-relaxed mb-8 font-normal">
                    I assist brands, agencies, and creators to translate their vision into photorealistic 3D renders and interactive web experiences.
                </p>

                {/* Action CTA Buttons */}
                <div className="flex items-center gap-3.5 mb-2">
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 bg-[#ffff7b] text-[#141414] font-sans text-xs tracking-wider uppercase px-7 py-3.5 rounded-full hover:bg-white transition-all duration-200 font-bold shadow-lg group"
                    >
                        Start a project
                        <span className="w-4.5 h-4.5 rounded-full bg-[#141414] text-[#ffff7b] flex items-center justify-center text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                            ↗
                        </span>
                    </a>
                    <button
                        onClick={() => setIsCVOpen(true)}
                        className="inline-flex items-center gap-2 border border-white/30 text-white font-sans text-xs tracking-wider uppercase px-7 py-3.5 rounded-full hover:border-white/70 hover:bg-white/10 transition-all duration-200 font-medium cursor-pointer"
                    >
                        View CV
                    </button>
                </div>
            </div>

            {/* ── Client Logos Marquee Row (Subtle Monochrome White Logos as in Ref Image 2) ── */}
            <div className="w-full py-5 border-t border-white/10 z-10 bg-[#141414]">
                <div className="overflow-hidden py-1 select-none pointer-events-none">
                    <div className="animate-marquee flex flex-row items-center gap-12 md:gap-16 whitespace-nowrap">
                        {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, i) => (
                            <div
                                key={i}
                                className="inline-flex items-center justify-center min-w-[90px] md:min-w-[120px] h-9 md:h-11 px-2 flex-shrink-0 opacity-40 hover:opacity-100 transition-opacity duration-300"
                            >
                                <img
                                    src={client.url}
                                    alt={client.name}
                                    className={`${client.height} w-auto max-w-[130px] object-contain filter brightness-0 invert opacity-75`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Bottom Yellow Ticker Bar (Exact match to bottom bar in Reference Image 2) ── */}
            <div className="w-full bg-[#ffff7b] text-[#141414] py-3 overflow-hidden select-none pointer-events-none border-t border-b border-black/10 z-10">
                <div className="animate-marquee flex flex-row items-center whitespace-nowrap">
                    {[...SKILLS_BAR, ...SKILLS_BAR, ...SKILLS_BAR, ...SKILLS_BAR].map((skill, i) => (
                        <span key={i} className="inline-flex items-center font-sans font-bold text-xs md:text-sm tracking-wide text-[#141414] uppercase px-5">
                            {skill}
                            <span className="text-[#141414]/40 ml-5">✦</span>
                        </span>
                    ))}
                </div>
            </div>

            <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
        </section>
    );
}
