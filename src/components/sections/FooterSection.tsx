"use client";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    );
}

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

function PinterestIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.618 0 12.017 0z" />
        </svg>
    );
}

function BehanceIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-1.802 3-4.726 3-3.201 0-5-2.227-5-5.251 0-3.003 1.942-5.749 5.25-5.749 3.42 0 4.75 2.68 4.476 5.867h-7.226c.068 1.488.948 2.607 2.477 2.607 1.137 0 1.849-.497 2.179-1.474h2.57zm-4.726-6.1c-1.124 0-1.896.657-2.124 1.777h4.168c-.085-1.077-.852-1.777-2.044-1.777zm-10.826-4.9c2.721 0 4.606 1.071 4.606 3.419 0 1.543-.889 2.576-1.996 3.031 1.421.416 2.378 1.579 2.378 3.327 0 2.648-2.179 3.623-4.988 3.623h-6.174v-13.4h6.174zm-2.174 2.253h-1.826v2.797h1.986c1.196 0 1.986-.549 1.986-1.417 0-.909-.79-1.38-1.986-1.38zm.245 4.887h-2.071v3.207h2.203c1.328 0 2.203-.591 2.203-1.603 0-1.054-.875-1.604-2.335-1.604z"/>
        </svg>
    );
}

const SOCIAL_NETWORKS = [
    { label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/mahdi_gouadria?igsh=MWphcmIyNXhtOWIzZw==" },
    { label: "LinkedIn", icon: LinkedInIcon, href: "https://www.linkedin.com/in/mahdi-gouadria?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
    { label: "Pinterest", icon: PinterestIcon, href: "https://pin.it/3lpdLZIEI" },
    { label: "Behance", icon: BehanceIcon, href: "https://www.behance.net/mahdigouadria" },
];

export default function FooterSection() {
    return (
        <footer className="relative w-full bg-[#191919] text-white pt-16 md:pt-24 pb-8 overflow-hidden border-t border-white/10">

            {/* ── Top Row Grid: Horizontally Even 3-Column Layout ── */}
            <div className="max-w-7xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pb-16 items-start">

                {/* Column 1: Left Callout */}
                <div className="flex flex-col items-start gap-4">
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

                {/* Column 2: Center NETWORKS */}
                <div className="flex flex-col items-start md:items-center gap-3">
                    <div className="flex flex-col gap-3">
                        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/40 font-bold mb-1">
                            NETWORKS
                        </span>
                        <ul className="flex flex-col gap-2.5 font-sans text-xs text-white/80">
                            {SOCIAL_NETWORKS.map((net) => {
                                const IconComponent = net.icon;
                                return (
                                    <li key={net.label}>
                                        <a
                                            href={net.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2.5 hover:text-white hover:translate-x-1 transition-all duration-200 group"
                                        >
                                            <span className="p-1.5 rounded-full bg-white/5 border border-white/10 group-hover:bg-[#ffff7b] group-hover:text-[#191919] group-hover:border-[#ffff7b] transition-all">
                                                <IconComponent className="w-3.5 h-3.5" />
                                            </span>
                                            <span className="font-medium group-hover:underline">
                                                {net.label}
                                            </span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* Column 3: Right INFOS & CONTACT */}
                <div className="flex flex-col items-start md:items-end md:text-right gap-2">
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

            {/* ── Continuous Horizontal Infinite Ticker Loop: MAHDI® GOUADRIA ── */}
            <div className="w-full overflow-hidden select-none py-6 border-t border-white/10 bg-[#191919]">
                <div className="animate-marquee inline-flex whitespace-nowrap items-center">
                    {Array(8).fill(0).map((_, i) => (
                        <div key={i} className="inline-flex items-center gap-8 px-6">
                            <h2 className="font-sans text-[11vw] md:text-[10vw] font-black text-white leading-none tracking-tight uppercase">
                                MAHDI<span className="text-[6vw] font-normal align-top leading-none ml-1 text-white">®</span> GOUADRIA
                            </h2>
                            <span className="text-[3vw] text-[#ffff7b] select-none">✦</span>
                        </div>
                    ))}
                </div>
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
