"use client";

import { useState } from "react";
import CVModal from "@/components/ui/CVModal";

interface HomeSectionProps {
    isDriving: boolean;
    onDriveStart: () => void;
}

const CLIENT_LOGOS = [
    { name: "Samsung", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_140/v1784994634/portfolio/clients/samsung.png", height: "h-9 md:h-10" },
    { name: "Orange", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_140/v1784994632/portfolio/clients/orange.png", height: "h-14 md:h-16" }, // Enlarged
    { name: "Danone", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_140/v1784994624/portfolio/clients/danone.png", height: "h-11 md:h-12" },
    { name: "Yves Rocher", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_140/v1784994636/portfolio/clients/yves_rocher.png", height: "h-10 md:h-11" },
    { name: "Délice Holding", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_140/v1784994627/portfolio/clients/delice.png", height: "h-11 md:h-12" },
    { name: "DanUp", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_140/v1784994625/portfolio/clients/danup.png", height: "h-11 md:h-12" },
    { name: "UBCI", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_140/v1784994635/portfolio/clients/ubci.png", height: "h-11 md:h-12" },
    { name: "Diari Express", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_140/v1784994628/portfolio/clients/diari_express.png", height: "h-16 md:h-20" }, // Significantly enlarged
    { name: "Jouda", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_140/v1784994630/portfolio/clients/jouda.png", height: "h-13 md:h-15" }, // Enlarged
    { name: "Fourré", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_140/v1784994629/portfolio/clients/fourre.png", height: "h-9 md:h-10" },
    { name: "Papillon", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_140/v1784994632/portfolio/clients/papillon.png", height: "h-13 md:h-15" }, // Enlarged
    { name: "DCroc", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_140/v1784994626/portfolio/clients/dcroc.png", height: "h-13 md:h-15" }, // Enlarged
    { name: "Kif", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_140/v1784994631/portfolio/clients/kif.png", height: "h-13 md:h-15" }, // Enlarged
    { name: "Kairna", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_140/v1784994630/portfolio/clients/kairna.png", height: "h-13 md:h-15" }, // Enlarged
    { name: "Smile", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_140/v1784994635/portfolio/clients/smile.png", height: "h-13 md:h-15" }, // Enlarged
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

            {/* ── Bottom Client Brands Marquee Row (Optically Equalized & Significantly Enlarged Small Logos) ───────── */}
            <div className="w-full pt-6 pb-2 border-t border-white/10 z-10">
                <div className="overflow-hidden py-3 select-none pointer-events-none">
                    <div className="animate-marquee flex flex-row items-center gap-10 md:gap-14 whitespace-nowrap">
                        {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, i) => (
                            <div
                                key={i}
                                className="inline-flex items-center justify-center min-w-[95px] md:min-w-[120px] h-14 md:h-18 px-3 flex-shrink-0"
                            >
                                <img
                                    src={client.url}
                                    alt={client.name}
                                    className={`${client.height} w-auto max-w-[150px] object-contain opacity-90 transition-transform duration-300`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
        </section>
    );
}
