"use client";

const SOCIAL_NETWORKS = [
    { label: "Instagram", href: "https://www.instagram.com/mahdi_gouadria?igsh=MWphcmIyNXhtOWIzZw==" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mahdi-gouadria?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
    { label: "Pinterest", href: "https://pin.it/3lpdLZIEI" },
    { label: "Behance", href: "https://www.behance.net/mahdigouadria" },
];

export default function FooterSection() {
    return (
        <footer className="relative w-full bg-[#191919] text-white pt-16 md:pt-24 pb-8 overflow-hidden border-t border-white/10">

            {/* ── Top Row Grid: Callout + Networks + Contact Info ── */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-10 pb-16">

                {/* Left: Have a project in mind? */}
                <div className="md:col-span-5 flex flex-col items-start gap-4">
                    <h3 className="font-sans text-2xl md:text-3xl font-medium text-white leading-tight">
                        Have a <em className="font-playfair italic font-normal">project</em> in mind?
                    </h3>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#191919] font-sans text-xs font-bold uppercase tracking-wider hover:bg-[#ffff7b] transition-all duration-200 shadow-md group"
                    >
                        Let&apos;s talk
                        <span className="w-5 h-5 rounded-full bg-[#191919] text-white flex items-center justify-center text-[10px] group-hover:bg-[#191919]">
                            ↗
                        </span>
                    </a>
                </div>

                {/* Middle: NETWORKS / RÉSEAUX */}
                <div className="md:col-span-3 flex flex-col gap-2">
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 font-bold mb-1">
                        NETWORKS
                    </span>
                    <ul className="flex flex-col gap-2 font-sans text-xs text-white/80">
                        {SOCIAL_NETWORKS.map((net) => (
                            <li key={net.label}>
                                <a
                                    href={net.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline hover:text-white transition-colors"
                                >
                                    {net.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right: INFOS & CONTACT */}
                <div className="md:col-span-4 flex flex-col gap-2">
                    <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 font-bold mb-1">
                        INFOS &amp; CONTACT
                    </span>
                    <a
                        href="mailto:mahdigouadria8@gmail.com"
                        className="font-sans text-xs text-white/80 hover:text-white transition-colors"
                    >
                        mahdigouadria8@gmail.com
                    </a>
                    <span className="font-sans text-xs text-white/50">
                        Based in Tunisia &amp; Available Worldwide
                    </span>
                </div>
            </div>

            {/* ── Giant Trademark Watermark Typography (Nico Studio exact style) ── */}
            <div className="w-full overflow-hidden select-none py-4 border-t border-white/5">
                <h2 className="font-sans text-[13vw] md:text-[12.5vw] font-black text-white/95 leading-none tracking-tighter uppercase whitespace-nowrap text-center">
                    STUDIO<span className="text-[8vw] font-normal align-top leading-none">®</span> MAHDI GOUADRIA
                </h2>
            </div>

            {/* ── Bottom Bar ────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs text-white/50">
                <p>
                    Copyright {new Date().getFullYear()}© MAHDI GOUADRIA | All rights reserved.
                </p>
                <a
                    href="#contact"
                    className="hover:text-white transition-colors underline"
                >
                    Legal &amp; Privacy
                </a>
            </div>

        </footer>
    );
}
