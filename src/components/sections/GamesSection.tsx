"use client";

const services = [
    {
        num: "01",
        title: "3D Modeling & Generalist",
        description: "From concept sketch to photorealistic render — hard surface, organic sculpting, shading, and full scene composition in 3DS Max, Blender, and ZBrush.",
        tags: ["Hard Surface", "Organic Sculpting", "Rendering"],
        accent: "#d946ef",
    },
    {
        num: "02",
        title: "Real-Time Experiences",
        description: "Interactive 3D web applications built with Three.js, React Three Fiber, and custom GLSL shaders for maximum visual impact.",
        tags: ["Three.js", "WebGL", "React Three Fiber"],
        accent: "#22d3ee",
    },
    {
        num: "03",
        title: "Motion & Animation",
        description: "GSAP scroll-driven animation, Blender physics simulations, and Cinema 4D motion graphics that make every frame count.",
        tags: ["GSAP", "Blender", "Cinema 4D"],
        accent: "#a78bfa",
    },
    {
        num: "04",
        title: "UI/UX Engineering",
        description: "Pixel-perfect, accessible, high-performance interfaces. From Figma design system to production in a single sprint with Next.js.",
        tags: ["Next.js", "Figma", "Design Systems"],
        accent: "#fbbf24",
    },
    {
        num: "05",
        title: "Brand Identity & VFX",
        description: "Cinematic VFX compositing and motion brand kits for commercial and creative projects with After Effects and Redshift.",
        tags: ["After Effects", "Compositing", "Motion Branding"],
        accent: "#fb7185",
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
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between px-6 md:px-16 pt-20 pb-10 gap-6">
                <div>
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 block mb-3">
                        Capabilities
                    </span>
                    <h2
                        id="services-heading"
                        className="font-playfair text-6xl md:text-8xl text-white leading-none"
                        style={{ fontWeight: 800 }}
                    >
                        Services
                        <br />
                        <em className="font-playfair italic" style={{ fontWeight: 400 }}>
                            & Skills
                        </em>
                    </h2>
                </div>
                <div className="flex flex-col gap-2 md:pb-3">
                    <p className="font-mono text-xs md:text-sm text-white/50 max-w-xs leading-relaxed">
                        A multidisciplinary creative with 5+ years across 3D, real-time graphics, and modern web engineering.
                    </p>
                    <div className="inline-flex items-center gap-2 mt-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="font-mono text-[10px] text-white/40 tracking-widest uppercase">Available for work</span>
                    </div>
                </div>
            </div>

            {/* ── Top border ─────────────────────────────── */}
            <div className="w-full h-px bg-white/10" />

            {/* ── Services List ──────────────────────────── */}
            <div className="w-full divide-y divide-white/10">
                {services.map((svc, i) => (
                    <div
                        key={svc.num}
                        className="group flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 px-6 md:px-16 py-7 md:py-8 hover:bg-white/[0.04] transition-colors duration-300 cursor-default"
                    >
                        {/* Number */}
                        <span className="font-mono text-xs text-white/25 tracking-widest w-12 flex-shrink-0">
                            {svc.num}
                        </span>

                        {/* Title */}
                        <h3
                            className="font-playfair text-2xl md:text-3xl text-white flex-1 leading-tight group-hover:italic transition-all duration-300"
                            style={{ fontWeight: 600, minWidth: 0 }}
                        >
                            {svc.title}
                        </h3>

                        {/* Tags */}
                        <div className="hidden md:flex items-center gap-2 flex-shrink-0 w-60 justify-center">
                            {svc.tags.map((t) => (
                                <span
                                    key={t}
                                    className="font-mono text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full border border-white/15 text-white/50 group-hover:border-white/30 transition-colors"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>

                        {/* Description */}
                        <p className="font-mono text-xs text-white/40 leading-relaxed md:w-72 flex-shrink-0 md:text-right">
                            {svc.description}
                        </p>

                        {/* Arrow */}
                        <div className="hidden md:flex flex-shrink-0 w-16 justify-end">
                            <span
                                className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-white/25 group-hover:text-white group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-300 group-hover:translate-x-1"
                                style={{ fontSize: 14 }}
                            >
                                →
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Bottom border ──────────────────────────── */}
            <div className="w-full h-px bg-white/10" />

            {/* ── Footer row ─────────────────────────────── */}
            <div className="flex items-center justify-between px-6 md:px-16 py-6">
                <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
                    5 Disciplines
                </span>
                <span className="font-mono text-[10px] text-white/20 tracking-widest uppercase">
                    Mahdi Gouadria
                </span>
            </div>
        </section>
    );
}
