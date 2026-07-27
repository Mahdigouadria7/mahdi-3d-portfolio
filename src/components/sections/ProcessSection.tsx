"use client";
import { useState } from "react";

interface Step {
    num: string;
    title: string;
    description: string;
    objective: string;
}

const STEPS: Step[] = [
    {
        num: "01.",
        title: "Brief & Discovery",
        description:
            "We define project scope, target audience, brand direction, and visual references to establish a clear artistic vision and technical roadmap.",
        objective: "Align on creative goals, timeline, deliverables, and technical requirements before starting 3D design.",
    },
    {
        num: "02.",
        title: "Proposal & Planning",
        description:
            "I outline the structured project proposal, 3D workflow phases, milestone schedules, and asset specifications.",
        objective: "Establish a transparent, fixed timeline with clear milestone review points and asset handoff parameters.",
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
    // Keep track of which accordion item is currently open (default open step 0 or null)
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggleStep = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <section
            id="process"
            className="relative w-full"
            style={{ background: "var(--nico-cream)" }}
        >
            <div className="w-full h-px bg-[#191919]/10" />

            <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-0 px-6 md:px-16 py-16 md:py-20 max-w-7xl mx-auto">

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
                        className="inline-flex items-center gap-2.5 bg-[#191919] text-white font-mono text-xs tracking-[0.2em] uppercase px-6 py-3.5 rounded-full hover:bg-[#ffff7b] hover:text-[#191919] transition-all duration-300 font-bold shadow-md"
                    >
                        Start a project
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
                            ↗
                        </span>
                    </a>
                </div>

                {/* ── Right: interactive accordion steps ───── */}
                <div className="divide-y divide-[#191919]/15 border-t border-[#191919]/15 border-b">
                    {STEPS.map((step, idx) => {
                        const isOpen = openIndex === idx;
                        return (
                            <div
                                key={step.num}
                                className="group cursor-pointer transition-colors duration-300 py-6 md:py-8"
                                onClick={() => toggleStep(idx)}
                            >
                                {/* Header Row */}
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-baseline gap-5">
                                        <span
                                            className="font-playfair text-xl text-[#191919]/60 group-hover:text-[#191919] flex-shrink-0 italic font-medium transition-colors"
                                            style={{ minWidth: 40 }}
                                        >
                                            {step.num}
                                        </span>
                                        <h3
                                            className="font-playfair text-2xl md:text-3xl text-[#191919] group-hover:translate-x-1 leading-tight transition-all duration-300"
                                            style={{ fontWeight: 600 }}
                                        >
                                            {step.title}
                                        </h3>
                                    </div>

                                    {/* Toggle Plus/Minus Button */}
                                    <div className={`w-8 h-8 rounded-full border border-[#191919]/20 flex items-center justify-center text-sm font-mono transition-all duration-300 group-hover:border-[#191919] ${isOpen ? "bg-[#191919] text-white" : "bg-transparent text-[#191919]"}`}>
                                        {isOpen ? "−" : "+"}
                                    </div>
                                </div>

                                {/* Expandable Details Content */}
                                <div
                                    className={`grid transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"}`}
                                >
                                    <div className="overflow-hidden">
                                        <p className="font-mono text-xs text-[#191919]/80 leading-relaxed mb-3 pl-[52px] font-medium">
                                            {step.description}
                                        </p>
                                        <div className="pl-[52px] flex items-start gap-2 pt-1">
                                            <span className="text-emerald-700 font-bold text-xs mt-0.5 flex-shrink-0">✓</span>
                                            <p className="font-mono text-xs text-[#191919]/85 leading-relaxed font-medium">
                                                <strong className="text-[#191919]">Objective:</strong>{" "}
                                                {step.objective}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            
            <div className="w-full h-px bg-[#191919]/10" />
        </section>
    );
}
