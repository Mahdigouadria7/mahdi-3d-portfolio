"use client";

/* Spinning circular badge text using SVG textPath */
function SpinningBadge() {
    const text = "MAHDI GOUADRIA • 3D DESIGNER • CGI ARTIST • ";
    return (
        <div className="relative w-28 h-28 md:w-36 md:h-36 flex items-center justify-center flex-shrink-0">
            {/* Spinning text ring */}
            <svg
                className="absolute inset-0 w-full h-full animate-spin-slow"
                viewBox="0 0 120 120"
                aria-hidden
            >
                <defs>
                    <path
                        id="badge-circle"
                        d="M60,10 a50,50 0 1,1 -0.01,0 Z"
                    />
                </defs>
                <text
                    fill="#191919"
                    fontSize="9.2"
                    fontFamily="monospace"
                    letterSpacing="1"
                    fontWeight="600"
                >
                    <textPath href="#badge-circle" startOffset="0%">
                        {text}
                    </textPath>
                </text>
            </svg>
            {/* Center icon */}
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#191919] flex items-center justify-center z-10">
                <span className="font-playfair text-[#ffff7b] text-xl font-black italic">M</span>
            </div>
        </div>
    );
}

export default function CTABannerSection() {
    return (
        <section
            className="relative w-full overflow-hidden"
            style={{ background: "#ffff7b" }}
        >
            <div className="max-w-5xl mx-auto px-6 md:px-16 py-20 md:py-28 flex flex-col md:flex-row items-center md:items-end justify-between gap-10">

                {/* Headline */}
                <h2
                    className="font-playfair text-5xl md:text-7xl lg:text-8xl text-[#191919] leading-tight max-w-2xl"
                    style={{ fontWeight: 700 }}
                >
                    Ready to make your{" "}
                    <em className="font-playfair italic" style={{ fontWeight: 400 }}>
                        3D vision
                    </em>{" "}
                    a reality?
                </h2>

                {/* Right: badge + CTA */}
                <div className="flex flex-col items-center md:items-end gap-6 flex-shrink-0">
                    <SpinningBadge />
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2.5 bg-[#191919] text-white font-mono text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-full hover:bg-[#191919]/80 transition-all duration-300"
                    >
                        Start a project
                        <span className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center text-[10px]">
                            ↗
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
}
