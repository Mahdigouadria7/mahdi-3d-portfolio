"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = ["WORK", "SERVICES", "CONTACT"];

export default function StickyHeader() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [progress, setProgress] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                setScrolled(scrollTop > 60);
                setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
                rafRef.current = null;
            });
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // Hide the sticky header completely on individual project pages
    if (pathname && pathname.startsWith('/projects/')) {
        return null;
    }

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? "bg-[#0a0514]/80 backdrop-blur-xl border-b border-white/[0.06]"
                    : "bg-transparent border-b border-transparent"
            }`}
        >
            {/* Scroll progress bar — fuchsia neon line */}
            <div
                className="absolute bottom-0 left-0 h-px bg-fuchsia-500 transition-all duration-100 shadow-[0_0_6px_rgba(217,70,239,0.8)]"
                style={{ width: `${progress}%` }}
                role="progressbar"
                aria-valuenow={Math.round(progress)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Page scroll progress"
            />

            <div className={`max-w-[1400px] mx-auto px-6 md:px-12 h-14 flex items-center justify-between gap-8 transition-all duration-500 ${!scrolled ? 'mix-blend-difference' : ''}`}>

                {/* Logo — HUD bracket style */}
                <Link
                    href="/"
                    aria-label="Mahdi Gouadria — Home"
                    className={`font-mono text-sm font-bold tracking-[0.3em] uppercase transition-colors duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fuchsia-400 flex items-center gap-1 ${scrolled ? 'text-white hover:text-fuchsia-400' : 'text-white hover:text-white/70'}`}
                >
                    <span className={`transition-colors duration-500 ${scrolled ? 'text-white/30' : 'text-white/50'}`}>[</span>
                    <span>MG</span>
                    <span className={`transition-colors duration-500 ${scrolled ? 'text-white/30' : 'text-white/50'}`}>]</span>
                </Link>

                {/* Center Nav — matching reference style with + icons */}
                <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
                    {NAV_ITEMS.map((label) => (
                        <a
                            key={label}
                            href={`#${label.toLowerCase()}`}
                            className={`group flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] transition-colors duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fuchsia-400 ${scrolled ? 'text-white/40 hover:text-white' : 'text-white/70 hover:text-white'}`}
                        >
                            {label}
                            <span className={`transition-colors duration-500 text-xs ${scrolled ? 'text-fuchsia-400/60 group-hover:text-fuchsia-400' : 'text-white/40 group-hover:text-white'}`}>+</span>
                        </a>
                    ))}
                </nav>

                {/* Right: Contact CTA & Mobile Menu Toggle */}
                <div className="flex items-center gap-4">
                    {/* System status indicator */}
                    <div className="hidden md:flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse transition-colors duration-500 ${scrolled ? 'bg-fuchsia-500' : 'bg-white'}`} />
                        <span className={`font-mono text-[9px] tracking-widest uppercase transition-colors duration-500 ${scrolled ? 'text-white/25' : 'text-white/50'}`}>Online</span>
                    </div>

                    <a
                        href="mailto:mahdigouadria8@gmail.com"
                        className={`hidden md:flex relative px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.25em] border transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fuchsia-400 ${
                            scrolled
                                ? 'text-fuchsia-300 border-fuchsia-400/30 hover:border-fuchsia-400/80 hover:text-fuchsia-200 hover:bg-fuchsia-500/5'
                                : 'text-white border-white/30 hover:border-white/80 hover:text-white hover:bg-white/5'
                        }`}
                    >
                        {/* Corner brackets */}
                        <span className={`absolute top-0 left-0 w-1.5 h-1.5 border-t border-l transition-colors duration-500 ${scrolled ? 'border-fuchsia-400/60' : 'border-white/60'}`} />
                        <span className={`absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r transition-colors duration-500 ${scrolled ? 'border-fuchsia-400/60' : 'border-white/60'}`} />
                        CONTACT
                    </a>

                    {/* Mobile Hamburger Button */}
                    <button 
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 relative z-50 group focus-visible:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                        aria-expanded={isMobileMenuOpen}
                    >
                        <span className={`block w-6 h-[1.5px] transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'bg-fuchsia-400 rotate-45 translate-y-[7.5px]' : scrolled ? 'bg-white/70 group-hover:bg-fuchsia-400' : 'bg-white group-hover:bg-white/70'}`}></span>
                        <span className={`block w-6 h-[1.5px] transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-0' : scrolled ? 'bg-white/70 group-hover:bg-fuchsia-400' : 'bg-white group-hover:bg-white/70'}`}></span>
                        <span className={`block w-6 h-[1.5px] transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'bg-fuchsia-400 -rotate-45 -translate-y-[7.5px]' : scrolled ? 'bg-white/70 group-hover:bg-fuchsia-400' : 'bg-white group-hover:bg-white/70'}`}></span>
                    </button>
                </div>

            </div>

            {/* Mobile Menu Overlay */}
            <div 
                className={`fixed inset-0 bg-[#0a0514]/95 backdrop-blur-2xl z-40 flex flex-col items-center justify-center transition-all duration-500 ease-in-out md:hidden ${
                    isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <div className="absolute inset-0 grid grid-cols-4 pointer-events-none z-0 opacity-20">
                    <div className="border-r border-dashed border-white/10 h-full w-full" />
                    <div className="border-r border-dashed border-white/10 h-full w-full" />
                    <div className="border-r border-dashed border-white/10 h-full w-full" />
                    <div className="h-full w-full" />
                </div>
                
                <nav className="flex flex-col items-center gap-10 z-10">
                    {NAV_ITEMS.map((label, i) => (
                        <a
                            key={label}
                            href={`#${label.toLowerCase()}`}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="group flex flex-col items-center text-center focus-visible:outline-none"
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <span className={`font-siegra text-4xl text-white/80 group-hover:text-white transition-all duration-300 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                {label}
                            </span>
                            <span className={`font-mono text-[10px] tracking-widest uppercase text-fuchsia-500/50 group-hover:text-fuchsia-400 transition-all duration-300 mt-2 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                                // 0{i + 1}
                            </span>
                        </a>
                    ))}
                    
                    <a
                        href="mailto:mahdigouadria8@gmail.com"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`mt-8 relative px-8 py-4 font-mono text-xs font-bold uppercase tracking-[0.25em] border border-fuchsia-400/30 text-fuchsia-300 hover:border-fuchsia-400 hover:text-fuchsia-200 hover:bg-fuchsia-500/10 transition-all duration-500 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-4 opacity-0'}`}
                    >
                        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-fuchsia-400/60" />
                        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-fuchsia-400/60" />
                        INITIATE CONTACT
                    </a>
                </nav>
                
                <div className="absolute bottom-10 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse" />
                    <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">SYS ONLINE</span>
                </div>
            </div>
        </header>
    );
}
