"use client";

import { useState } from "react";
import CVModal from "@/components/ui/CVModal";

interface HomeSectionProps {
    isDriving: boolean;
    onDriveStart: () => void;
}

const CLIENT_LOGOS = [
    { name: "Samsung", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994634/portfolio/clients/samsung.png", style: { maxHeight: "44px", maxWidth: "140px" } }, // Boosted
    { name: "Orange", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994632/portfolio/clients/orange.png", style: { maxHeight: "52px", maxWidth: "56px" } }, // Boosted
    { name: "Danone", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994624/portfolio/clients/danone.png", style: { maxHeight: "38px", maxWidth: "110px" } },
    { name: "Yves Rocher", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994636/portfolio/clients/yves_rocher.png", style: { maxHeight: "32px", maxWidth: "120px" } },
    { name: "Délice Holding", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994627/portfolio/clients/delice.png", style: { maxHeight: "38px", maxWidth: "110px" } },
    { name: "DanUp", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994625/portfolio/clients/danup.png", style: { maxHeight: "38px", maxWidth: "110px" } },
    { name: "UBCI", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994635/portfolio/clients/ubci.png", style: { maxHeight: "36px", maxWidth: "110px" } },
    { name: "Diari Express", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994628/portfolio/clients/diari_express.png", style: { maxHeight: "56px", maxWidth: "64px" } }, // Boosted
    { name: "Jouda", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994630/portfolio/clients/jouda.png", style: { maxHeight: "46px", maxWidth: "120px" } }, // Boosted
    { name: "Fourré", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994629/portfolio/clients/fourre.png", style: { maxHeight: "32px", maxWidth: "110px" } },
    { name: "Papillon", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994632/portfolio/clients/papillon.png", style: { maxHeight: "42px", maxWidth: "110px" } },
    { name: "DCroc", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994626/portfolio/clients/dcroc.png", style: { maxHeight: "42px", maxWidth: "110px" } },
    { name: "Kif", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994631/portfolio/clients/kif.png", style: { maxHeight: "42px", maxWidth: "110px" } },
    { name: "Kairna", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994630/portfolio/clients/kairna.png", style: { maxHeight: "42px", maxWidth: "110px" } },
    { name: "Smile", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994635/portfolio/clients/smile.png", style: { maxHeight: "42px", maxWidth: "110px" } },
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

            {/* ── Client Logos Marquee Row (Optically Balanced & Significantly Enlarged Sams, Orange, Diari, Jouda) ── */}
            <div className="w-full relative py-4 select-none pointer-events-none z-10">
                <div
                    className="w-full overflow-hidden"
                    style={{
                        maskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
                    }}
                >
                    <div className="animate-marquee flex flex-row items-center gap-12 md:gap-16 whitespace-nowrap">
                        {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((client, i) => (
                            <div
                                key={i}
                                className="inline-flex items-center justify-center min-w-[100px] md:min-w-[130px] h-14 md:h-16 px-3 flex-shrink-0 opacity-90 transition-opacity duration-300"
                            >
                                <img
                                    src={client.url}
                                    alt={client.name}
                                    style={client.style}
                                    className="w-auto h-auto object-contain transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Bottom Yellow Ticker Bar (Exact match to Reference Image 2) ── */}
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
