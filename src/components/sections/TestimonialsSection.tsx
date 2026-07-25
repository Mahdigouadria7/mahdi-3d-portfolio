"use client";
import { useRef } from "react";

const REVIEWS = [
    {
        name: "Ahmed K.",
        role: "Brand Director — FIFA Concepts",
        avatar: "AK",
        rating: 5,
        text: "Outstanding work on the Trionda Ball concept. Mahdi delivered a fully interactive, photorealistic 3D experience that exceeded every expectation. Very professional, creative and precise. A true pleasure to collaborate with.",
    },
    {
        name: "Lucas M.",
        role: "Creative Lead — Red Bull Studio",
        avatar: "LM",
        rating: 5,
        text: "Mahdi brought our luxury gold concept to life with stunning CGI renders and metallic shaders I didn't think were possible for a web deployment. He's fast, responsive, and has an exceptional eye for premium detail. Highly recommend.",
    },
    {
        name: "Sarah T.",
        role: "Founder — Atelier Sartis",
        avatar: "ST",
        rating: 5,
        text: "We needed both 3D visuals and a web integration for our product launch and Mahdi handled both flawlessly. He understood our brief immediately, delivered clean assets on time, and the final result was exactly what we envisioned.",
    },
];

function Stars({ count }: { count: number }) {
    return (
        <div className="flex gap-0.5">
            {Array(count).fill(0).map((_, i) => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#191919">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01z" />
                </svg>
            ))}
        </div>
    );
}

export default function TestimonialsSection() {
    const trackRef = useRef<HTMLDivElement>(null);

    return (
        <section
            id="testimonials"
            className="relative w-full"
            style={{ background: "var(--nico-cream)" }}
        >
            <div className="w-full h-px bg-[#191919]/10" />

            {/* Section header */}
            <div className="px-6 md:px-16 pt-16 pb-10">
                <h2
                    className="font-playfair text-5xl md:text-7xl text-[#191919] text-center leading-tight"
                    style={{ fontWeight: 700 }}
                >
                    They trusted{" "}
                    <em className="font-playfair italic" style={{ fontWeight: 400 }}>
                        me.
                    </em>
                </h2>
            </div>

            {/* Cards */}
            <div className="px-6 md:px-16 pb-16">
                <div
                    ref={trackRef}
                    className="grid grid-cols-1 md:grid-cols-3 gap-5"
                >
                    {REVIEWS.map((r) => (
                        <div
                            key={r.name}
                            className="bg-white rounded-2xl p-6 md:p-8 flex flex-col gap-4"
                            style={{ boxShadow: "0 2px 16px rgba(25,25,25,0.06)" }}
                        >
                            {/* Reviewer + verified */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {/* Avatar */}
                                    <div className="w-10 h-10 rounded-full bg-[#191919]/8 flex items-center justify-center flex-shrink-0">
                                        <span className="font-mono text-[11px] font-bold text-[#191919]">
                                            {r.avatar}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="font-mono text-xs font-bold text-[#191919]">
                                            {r.name}
                                        </p>
                                        <p className="font-mono text-[9px] text-[#5c5c5c]">
                                            {r.role}
                                        </p>
                                    </div>
                                </div>
                                {/* Verified badge */}
                                <span className="inline-flex items-center gap-1 border border-emerald-600/30 text-emerald-700 font-mono text-[8px] tracking-wide px-2 py-1 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    verified
                                </span>
                            </div>

                            <Stars count={r.rating} />

                            <p className="font-mono text-xs text-[#5c5c5c] leading-relaxed flex-1">
                                &ldquo;{r.text}&rdquo;
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full h-px bg-[#191919]/10" />
        </section>
    );
}
