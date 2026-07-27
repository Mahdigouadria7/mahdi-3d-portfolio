"use client";

const services = [
    {
        num: "01",
        title: "3D Modeling & Generalist",
        tools: ["3ds Max", "Blender", "ZBrush", "Substance Painter"],
        accent: "#ffff7b",
    },
    {
        num: "02",
        title: "Real-Time Experiences",
        tools: ["Three.js", "React Three Fiber", "WebGL", "GLSL Shaders"],
        accent: "#ffff7b",
    },
    {
        num: "03",
        title: "Motion & Animation",
        tools: ["Blender Physics", "Cinema 4D", "GSAP ScrollTrigger"],
        accent: "#ffff7b",
    },
    {
        num: "04",
        title: "UI/UX Engineering",
        tools: ["Next.js", "TypeScript", "Tailwind CSS", "Figma"],
        accent: "#ffff7b",
    },
    {
        num: "05",
        title: "Brand Identity & VFX",
        tools: ["After Effects", "Photoshop", "Illustrator", "Redshift"],
        accent: "#ffff7b",
    },
];

export default function GamesSection() {
    return (
        <section
            id="services"
            aria-labelledby="services-heading"
            className="relative w-full bg-[#191919]"
        >
            {/* ── Section Header ─────────────────────────── */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between px-6 md:px-16 pt-20 pb-10 gap-6 max-w-7xl mx-auto">
                <div>
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#ffff7b] block mb-3 font-bold">
                        [Capabilities]
                    </span>
                    <h2
                        id="services-heading"
                        className="font-playfair text-6xl md:text-8xl text-white leading-none"
                        style={{ fontWeight: 800 }}
                    >
                        Services
                        <br />
                        <em className="font-playfair italic font-normal text-[#ffff7b]">
                            &amp; Skills
                        </em>
                    </h2>
                </div>
                <div className="flex flex-col gap-2 md:pb-3">
                    <p className="font-mono text-xs md:text-sm text-white/60 max-w-xs leading-relaxed font-medium">
                        Multidisciplinary 3D artist and web engineer. Primary tools and software stack per discipline.
                    </p>
                    <div className="inline-flex items-center gap-2 mt-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="font-mono text-[10px] text-white/50 tracking-widest uppercase font-semibold">Available for work</span>
                    </div>
                </div>
            </div>

            {/* ── Top border ─────────────────────────────── */}
            <div className="w-full h-px bg-white/10" />

            {/* ── Services List ──────────────────────────── */}
            <div className="w-full divide-y divide-white/10 max-w-7xl mx-auto">
                {services.map((svc) => (
                    <div
                        key={svc.num}
                        className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-6 md:px-16 py-7 md:py-9 hover:bg-white/[0.03] transition-colors duration-300 cursor-default"
                    >
                        {/* Number & Title */}
                        <div className="flex items-center gap-6 min-w-0 flex-1">
                            <span className="font-mono text-xs text-white/30 tracking-widest flex-shrink-0">
                                {svc.num}
                            </span>

                            <h3
                                className="font-playfair text-2xl md:text-3xl text-white leading-tight group-hover:translate-x-1 transition-transform duration-300"
                                style={{ fontWeight: 600 }}
                            >
                                {svc.title}
                            </h3>
                        </div>

                        {/* Tools Pills (Replaced Long Text) */}
                        <div className="flex items-center gap-2.5 flex-wrap justify-start md:justify-end">
                            {svc.tools.map((tool) => (
                                <span
                                    key={tool}
                                    className="font-mono text-xs tracking-wider uppercase px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white/80 group-hover:border-[#ffff7b] group-hover:text-white group-hover:bg-[#ffff7b]/10 transition-all duration-300 font-semibold shadow-xs"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Bottom border ──────────────────────────── */}
            <div className="w-full h-px bg-white/10" />

            {/* ── Footer row ─────────────────────────────── */}
            <div className="flex items-center justify-between px-6 md:px-16 py-6 max-w-7xl mx-auto">
                <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase font-semibold">
                    5 Disciplines
                </span>
                <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase font-semibold">
                    Mahdi Gouadria
                </span>
            </div>
        </section>
    );
}
