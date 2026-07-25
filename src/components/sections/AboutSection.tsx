"use client";

const STATS = [
    {
        value: "+20",
        label: "Projects completed",
        detail:
            "3D renders, CGI commercial concepts, interactive web experiences for brands, studios and creative agencies worldwide.",
    },
    {
        value: "4 yrs",
        label: "of experience",
        detail:
            "From technical 3D modeling to real-time web development — spanning agencies, freelance and personal creative work.",
    },
    {
        value: "100%",
        label: "Custom-made",
        detail:
            "Every project is crafted specifically around the brief, the brand DNA, and the final delivery format.",
    },
];

export default function AboutSection() {
    return (
        <section
            id="about"
            className="relative w-full"
            style={{ background: "var(--nico-cream)" }}
        >
            <div className="w-full h-px bg-[#191919]/10" />

            <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-0 max-w-6xl mx-auto px-6 md:px-16 py-16 md:py-20">

                {/* ── Left: Photo card ─────────────────────── */}
                <div className="relative flex-shrink-0 mb-10 md:mb-0 md:pr-14">
                    {/* Available badge */}
                    <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="font-mono text-[10px] text-[#191919] tracking-wide">Available</span>
                    </div>

                    {/* Photo placeholder — replace src with your actual photo */}
                    <div
                        className="relative w-full rounded-2xl overflow-hidden bg-[#191919]/8"
                        style={{ aspectRatio: "3/4", maxWidth: 320 }}
                    >
                        {/* Replace this div with: <img src="/your-photo.jpg" alt="Mahdi Gouadria" className="w-full h-full object-cover" /> */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4"
                            style={{ background: "linear-gradient(135deg, #1a0a2e 0%, #0a0514 50%, #1a0a2e 100%)" }}>
                            <div className="w-24 h-24 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                                <span className="font-playfair text-3xl text-white/60 italic font-bold">MG</span>
                            </div>
                            <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">Photo coming soon</span>
                        </div>
                    </div>
                </div>

                {/* ── Right: Bio + stats ───────────────────── */}
                <div className="flex flex-col justify-center">

                    {/* Headline */}
                    <h2
                        className="font-playfair text-4xl md:text-5xl text-[#191919] leading-tight mb-4"
                        style={{ fontWeight: 700 }}
                    >
                        Hello, I&apos;m{" "}
                        <span className="inline-flex items-center gap-2">
                            <span
                                className="inline-block w-9 h-9 rounded-full bg-[#ffff7b] text-[#191919] text-lg font-bold flex items-center justify-center"
                                aria-hidden
                            >
                                ✦
                            </span>
                            <em className="font-playfair italic" style={{ fontWeight: 400 }}>
                                Mahdi
                            </em>
                        </span>
                    </h2>

                    {/* Description */}
                    <p className="font-mono text-sm text-[#191919]/80 leading-relaxed max-w-xl mb-8 font-medium">
                        3D generalist and software engineer — I help brands and studios craft
                        stunning CGI visuals, photorealistic renders, and immersive interactive web
                        experiences that make their projects stand out.
                    </p>

                    {/* CTA */}
                    <a
                        href="#contact"
                        className="self-start inline-flex items-center gap-2.5 bg-[#191919] text-white font-mono text-xs tracking-[0.2em] uppercase px-6 py-3.5 rounded-full hover:bg-[#ffff7b] hover:text-[#191919] transition-all duration-300 mb-12 font-bold"
                    >
                        Start a project
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                            ↗
                        </span>
                    </a>

                    {/* Stats grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#191919]/15">
                        {STATS.map((s) => (
                            <div key={s.value}>
                                <p
                                    className="font-playfair text-4xl md:text-5xl text-[#191919] leading-none mb-1"
                                    style={{ fontWeight: 800 }}
                                >
                                    {s.value}
                                </p>
                                <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[#191919] mb-2 font-bold">
                                    {s.label}
                                </p>
                                <p className="font-mono text-[10px] text-[#191919]/70 leading-relaxed font-medium">
                                    {s.detail}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-[#191919]/10" />
        </section>
    );
}
