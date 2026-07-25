"use client";
import { useState } from "react";

const STEPS = [
    {
        num: "01.",
        title: "Brief & Discovery",
        description: null,
        objective: null,
    },
    {
        num: "02.",
        title: "Proposal & Planning",
        description: null,
        objective: null,
    },
    {
        num: "03.",
        title: "3D Production & Development",
        description:
            "I build the full visual universe — modeling, shading, lighting, and rendering — with regular previews and targeted feedback rounds.",
        objective: "Create a coherent, high-fidelity result aligned with the brief and brand vision.",
    },
    {
        num: "04.",
        title: "Delivery & Iteration",
        description:
            "I deliver clean, organized assets ready to use, with a handoff walkthrough and post-delivery support for any adjustments.",
        objective: "Leave you fully autonomous and confident with your final deliverables.",
    },
];

export default function ProcessSection() {
    return (
        <section
            id="process"
            className="relative w-full"
            style={{ background: "var(--nico-cream)" }}
        >
            <div className="w-full h-px bg-[#191919]/10" />

            <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-0 px-6 md:px-16 py-16 md:py-20">

                {/* ── Left: headline + CTA ─────────────────── */}
                <div className="md:pr-16 md:sticky md:top-24 self-start mb-10 md:mb-0">
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#191919]/60 block mb-3 font-semibold">
                        [My Process]
                    </span>
                    <h2
                        className="font-playfair text-4xl md:text-5xl text-[#191919] leading-tight mb-4"
                        style={{ fontWeight: 700 }}
                    >
                        How we work{" "}
                        <em className="font-playfair italic" style={{ fontWeight: 400 }}>
                            together
                        </em>
                        ?
                    </h2>
                    <p className="font-mono text-xs text-[#191919]/75 leading-relaxed mb-8 max-w-xs font-medium">
                        A clear, fluid and transparent process — designed to move forward smoothly, avoid grey areas, and build a solid project from first contact to final delivery.
                    </p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2.5 bg-[#191919] text-white font-mono text-xs tracking-[0.2em] uppercase px-6 py-3.5 rounded-full hover:bg-[#ffff7b] hover:text-[#191919] transition-all duration-300 font-bold"
                    >
                        Start a project
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                            ↗
                        </span>
                    </a>
                </div>

                {/* ── Right: steps ─────────────────────────── */}
                <div className="divide-y divide-[#191919]/15 border-t border-[#191919]/15">
                    {STEPS.map((step) => (
                        <div key={step.num} className="py-8 md:py-10">
                            <div className="flex items-baseline gap-5 mb-3">
                                <span
                                    className="font-playfair text-xl text-[#191919]/70 flex-shrink-0 italic font-medium"
                                    style={{ minWidth: 40 }}
                                >
                                    {step.num}
                                </span>
                                <h3
                                    className="font-playfair text-2xl md:text-3xl text-[#191919] leading-tight"
                                    style={{ fontWeight: 600 }}
                                >
                                    {step.title}
                                </h3>
                            </div>
                            {step.description && (
                                <p className="font-mono text-xs text-[#191919]/75 leading-relaxed mb-3 pl-[52px] font-medium">
                                    {step.description}
                                </p>
                            )}
                            {step.objective && (
                                <div className="pl-[52px] flex items-start gap-2">
                                    <span className="text-emerald-700 font-bold text-xs mt-0.5 flex-shrink-0">✓</span>
                                    <p className="font-mono text-xs text-[#191919]/80 leading-relaxed font-medium">
                                        <strong className="text-[#191919]">Objective:</strong>{" "}
                                        {step.objective}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full h-px bg-[#191919]/10" />
        </section>
    );
}
