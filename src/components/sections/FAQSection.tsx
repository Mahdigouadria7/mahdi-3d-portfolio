"use client";
import { useState } from "react";

const FAQ_ITEMS = [
    {
        q: "What 3D services do you offer?",
        a: "I offer a full range of 3D services: product visualization, CGI commercial renders, character modeling, environment design, motion graphics, and real-time 3D web experiences using Three.js and React Three Fiber.",
    },
    {
        q: "I'm not sure exactly what I need — can you help me define it?",
        a: "Absolutely. During the discovery phase we'll talk through your project goals, audience, and expected output. I can then propose the most effective approach — whether that's a static render, an animation, or an interactive web experience.",
    },
    {
        q: "Do you work on standalone commissions?",
        a: "Yes — I work both on standalone one-off commissions and longer-term collaborations with studios, agencies, and brands. No minimum engagement required.",
    },
    {
        q: "Do you work with startups and small brands?",
        a: "Definitely. Some of my best projects have been with ambitious startups and independent creators. I adapt my process and deliverables to suit any scale or budget.",
    },
    {
        q: "How long does a typical project take?",
        a: "Timeline varies by scope. A single CGI product render takes 3–7 days. A full interactive web experience with 3D models typically takes 3–6 weeks. I'll always give you a realistic estimate during the proposal phase.",
    },
    {
        q: "Do you offer custom pricing?",
        a: "Yes — every project is quoted individually based on scope, complexity, and timeline. I don't do fixed-rate packages because every brief is different.",
    },
    {
        q: "How many revisions are included?",
        a: "I include 2 rounds of revisions in all projects. Additional revision rounds can be added to the scope if needed.",
    },
    {
        q: "Do you provide support after delivery?",
        a: "Yes — I offer a 14-day post-delivery support period for any tweaks, file format changes, or integration questions. Longer support can be arranged as an add-on.",
    },
];

function FAQItem({ item }: { item: (typeof FAQ_ITEMS)[number] }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b border-[#191919]/10 group">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-6 md:py-7 text-left transition-colors duration-300"
                aria-expanded={open}
            >
                <span
                    className={`font-playfair text-xl md:text-2xl text-[#191919] leading-snug pr-4 transition-all duration-300 group-hover:translate-x-1 ${open ? "italic font-normal" : "font-semibold"}`}
                >
                    {item.q}
                </span>
                <span
                    className={`w-8 h-8 rounded-full border border-[#191919]/20 flex items-center justify-center text-sm font-mono flex-shrink-0 transition-all duration-300 group-hover:border-[#191919] ${open ? "bg-[#191919] text-white border-[#191919]" : "bg-transparent text-[#191919]"}`}
                >
                    {open ? "−" : "+"}
                </span>
            </button>
            <div
                className={`grid transition-all duration-500 ease-in-out overflow-hidden ${open ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}
            >
                <div className="overflow-hidden">
                    <p className="font-mono text-xs text-[#191919]/80 leading-relaxed max-w-3xl font-medium pr-6">
                        {item.a}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function FAQSection() {
    return (
        <section
            id="faq"
            className="relative w-full"
            style={{ background: "var(--nico-cream)" }}
        >
            <div className="w-full h-px bg-[#191919]/15" />

            <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-0 px-6 md:px-16 py-16 md:py-20 max-w-7xl mx-auto">

                {/* Left: sticky headline ───────────────────── */}
                <div className="md:pr-16 md:sticky md:top-24 self-start mb-10 md:mb-0">
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#191919]/60 block mb-3 font-semibold">
                        [FAQ]
                    </span>
                    <h2
                        className="font-playfair text-4xl md:text-5xl text-[#191919] leading-tight mb-4"
                        style={{ fontWeight: 700 }}
                    >
                        Your most{" "}
                        <em className="font-playfair italic" style={{ fontWeight: 400 }}>
                            frequent
                        </em>{" "}
                        questions
                    </h2>
                    <p className="font-mono text-xs text-[#191919]/75 leading-relaxed mb-8 max-w-xs font-medium">
                        Still have questions? You&apos;re in the right place. This FAQ covers the most common questions before starting a project together.
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

                {/* Right: accordion ────────────────────────── */}
                <div className="border-t border-[#191919]/10 border-b">
                    {FAQ_ITEMS.map((item) => (
                        <FAQItem key={item.q} item={item} />
                    ))}
                </div>
            </div>

            <div className="w-full h-px bg-[#191919]/10" />
        </section>
    );
}
