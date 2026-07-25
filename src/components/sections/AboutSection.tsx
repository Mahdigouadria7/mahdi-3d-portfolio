"use client";

const STATS = [
    {
        value: "+20",
        label: "Projects Completed",
        detail:
            "Photorealistic 3D renders, CGI commercial concepts, and interactive web experiences for brands, startups, and creative agencies worldwide.",
    },
    {
        value: "4 yrs",
        label: "of Experience",
        detail:
            "From technical 3D modeling to real-time WebGL development — spanning studio pipelines, freelance, and high-impact agency collaborations.",
    },
    {
        value: "100%",
        label: "Custom-Made",
        detail:
            "Every project is engineered specifically around the brief, the brand DNA, and the target audience for maximum visual impact.",
    },
];

export default function AboutSection() {
    return (
        <section
            id="about"
            className="relative w-full overflow-hidden"
            style={{ background: "var(--nico-cream, #f5f4ef)" }}
        >
            {/* Top separator line */}
            <div className="w-full h-px bg-[#191919]/10" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

                    {/* ── Left: Large Square-ish Photo Card (Exact Nico Studio layout) ── */}
                    <div className="lg:col-span-5 relative w-full flex justify-center lg:justify-start">
                        <div className="relative w-full max-w-[460px] aspect-[4/4.4] rounded-[28px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-black/5 bg-[#e8e6df]">

                            {/* Available Badge (Top-left inside photo box) */}
                            <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-2 bg-white/95 backdrop-blur-md rounded-full px-3.5 py-1.5 shadow-md border border-black/5">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                                <span className="font-sans text-xs font-semibold text-[#191919] tracking-wide">
                                    Available
                                </span>
                            </div>

                            {/* Natural Portrait Image */}
                            <img
                                src="https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_1000/v1784987967/portfolio/mahdi_portrait.jpg"
                                alt="Mahdi Gouadria"
                                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </div>
                    </div>

                    {/* ── Right: Headline, Bio & 3-Column Stats ─────────────── */}
                    <div className="lg:col-span-7 flex flex-col justify-center">

                        {/* Headline with Yellow Circle Icon & Playfair Italic Name */}
                        <h2 className="font-sans text-4xl sm:text-5xl lg:text-[54px] font-bold text-[#191919] leading-[1.15] tracking-tight mb-5">
                            Hello, I&apos;m{" "}
                            <span className="inline-flex items-center align-middle mx-1">
                                <span className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#ffff7b] text-[#191919] text-xl font-bold flex items-center justify-center border border-black/10 shadow-sm select-none">
                                    ☺
                                </span>
                            </span>{" "}
                            <em className="font-playfair italic font-normal text-[#191919]">
                                Mahdi
                            </em>
                        </h2>

                        {/* Bio Paragraph */}
                        <p className="font-sans text-base md:text-lg text-[#333333] leading-relaxed max-w-2xl mb-8 font-normal">
                            3D generalist and software engineer — I assist brands, agencies, and creators to translate their vision into photorealistic 3D renders, CGI commercial concepts, and interactive web experiences engineered to stand out and attract high-value clients.
                        </p>

                        {/* Action CTA Button */}
                        <div>
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-3 bg-[#191919] text-white font-sans text-xs md:text-sm font-bold tracking-wider uppercase px-7 py-3.5 rounded-full hover:bg-black transition-all duration-300 shadow-md hover:shadow-xl group"
                            >
                                Start a project
                                <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                                    ↗
                                </span>
                            </a>
                        </div>

                        {/* 3-Column Stats Grid (Exact match to Reference Image 1) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 mt-10 border-t border-[#191919]/10">
                            {STATS.map((s) => (
                                <div key={s.value} className="flex flex-col">
                                    <p className="font-sans text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#191919] leading-none mb-2 tracking-tight">
                                        {s.value}
                                    </p>
                                    <p className="font-sans text-xs md:text-[13px] font-bold text-[#191919] uppercase tracking-wider mb-2">
                                        {s.label}
                                    </p>
                                    <p className="font-sans text-xs text-[#555555] leading-relaxed font-normal">
                                        {s.detail}
                                    </p>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom separator line */}
            <div className="w-full h-px bg-[#191919]/10" />
        </section>
    );
}
