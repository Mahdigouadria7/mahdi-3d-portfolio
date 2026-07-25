"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CVModal from "@/components/ui/CVModal";

const NAV_ITEMS = [
    { label: "PROJECTS", href: "#projects" },
    { label: "ABOUT", href: "#about" },
    { label: "SERVICES", href: "#services" },
    { label: "FAQ", href: "#faq" },
];

export default function StickyHeader() {
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCVOpen, setIsCVOpen] = useState(false);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (rafRef.current) return;
            rafRef.current = requestAnimationFrame(() => {
                setScrolled(window.scrollY > 40);
                rafRef.current = null;
            });
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    // Hide sticky header on individual project pages if desired
    if (pathname && pathname.startsWith("/projects/")) {
        return null;
    }

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? "bg-[#191919]/90 backdrop-blur-xl py-3 border-b border-white/10"
                        : "bg-transparent py-5"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-4">

                    {/* Left: Avatar / Logo Badge */}
                    <Link
                        href="/"
                        aria-label="Mahdi Gouadria Home"
                        className="flex items-center gap-3 group focus-visible:outline-none"
                    >
                        <div className="w-10 h-10 rounded-full bg-[#ffff7b] text-[#191919] flex items-center justify-center font-bold text-sm shadow-md transition-transform duration-300 group-hover:scale-105">
                            <span className="font-playfair italic text-lg font-black">M</span>
                        </div>
                    </Link>

                    {/* Center: Nav Items */}
                    <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors duration-200 focus-visible:outline-none"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Right Action Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Download / View CV Button */}
                        <button
                            onClick={() => setIsCVOpen(true)}
                            className="px-5 py-2.5 rounded-full border border-white/30 text-white font-mono text-[11px] tracking-wider uppercase font-bold hover:border-white/80 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                        >
                            View CV
                        </button>

                        {/* Let's Talk Contact Button */}
                        <a
                            href="#contact"
                            className="px-5 py-2.5 rounded-full bg-white text-[#191919] font-mono text-[11px] tracking-wider uppercase font-bold hover:bg-[#ffff7b] transition-all duration-300 flex items-center gap-2 shadow-md"
                        >
                            Contact me
                            <span className="w-5 h-5 rounded-full bg-[#191919] text-white flex items-center justify-center text-[10px]">
                                ↗
                            </span>
                        </a>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 z-50 focus-visible:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        <span className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`} />
                        <span className={`block w-6 h-[2px] bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[7.5px]' : ''}`} />
                    </button>
                </div>
            </header>

            {/* Mobile Nav Overlay */}
            <div
                className={`fixed inset-0 bg-[#191919]/98 backdrop-blur-2xl z-40 flex flex-col items-center justify-center transition-all duration-300 md:hidden ${
                    isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
            >
                <nav className="flex flex-col items-center gap-8 mb-8">
                    {NAV_ITEMS.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="font-playfair text-3xl text-white font-bold tracking-wider hover:italic transition-all"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsCVOpen(true);
                        }}
                        className="px-8 py-3 rounded-full border border-white/30 text-white font-mono text-xs tracking-widest uppercase font-bold text-center"
                    >
                        View CV
                    </button>
                    <a
                        href="#contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-8 py-3 rounded-full bg-[#ffff7b] text-[#191919] font-mono text-xs tracking-widest uppercase font-bold text-center"
                    >
                        Contact Me ↗
                    </a>
                </div>
            </div>

            <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
        </>
    );
}
