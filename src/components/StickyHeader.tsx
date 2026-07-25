"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import CVModal from "@/components/ui/CVModal";

const NAV_ITEMS = [
    { label: "PROJETS", href: "#projects" },
    { label: "À PROPOS", href: "#about" },
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

    if (pathname && pathname.startsWith("/projects/")) {
        return null;
    }

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                    isCVOpen ? "opacity-0 pointer-events-none" : ""
                } ${
                    scrolled
                        ? "bg-[#191919]/95 backdrop-blur-xl py-3 border-b border-white/10 shadow-lg"
                        : "bg-transparent py-5"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between gap-4">

                    {/* Left: Avatar Badge (exact Nico style cap icon / M) */}
                    <Link
                        href="/"
                        aria-label="Mahdi Gouadria Home"
                        className="flex items-center gap-3 group focus-visible:outline-none"
                    >
                        <div className="w-9 h-9 rounded-full bg-[#ffff7b] text-[#191919] flex items-center justify-center font-bold text-sm shadow-md transition-transform duration-300 group-hover:scale-105">
                            <span className="font-playfair italic text-base font-black">M</span>
                        </div>
                    </Link>

                    {/* Center: Clean Sans-Serif Nav Links */}
                    <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
                        {NAV_ITEMS.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="font-sans text-[13px] font-semibold text-white/80 hover:text-white transition-colors duration-200 focus-visible:outline-none"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Right Action Buttons */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Audit / View CV Button */}
                        <button
                            onClick={() => setIsCVOpen(true)}
                            className="px-5 py-2 rounded-full border border-white/40 text-white font-sans text-[13px] font-medium hover:border-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
                        >
                            View CV
                        </button>

                        {/* Solid Contact / Book Call Button */}
                        <a
                            href="#contact"
                            className="px-5 py-2 rounded-full bg-white text-[#191919] font-sans text-[13px] font-semibold hover:bg-[#ffff7b] transition-all duration-200 flex items-center gap-2 shadow-md"
                        >
                            Contact me
                            <span className="w-5 h-5 rounded-full bg-[#191919] text-white flex items-center justify-center text-[10px]">
                                ↗
                            </span>
                        </a>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-50 focus-visible:outline-none"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        <span className={`block w-5 h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-[5.5px]' : ''}`} />
                        <span className={`block w-5 h-[2px] bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-5 h-[2px] bg-white transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[5.5px]' : ''}`} />
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

                <div className="flex flex-col gap-3">
                    <button
                        onClick={() => {
                            setIsMobileMenuOpen(false);
                            setIsCVOpen(true);
                        }}
                        className="px-7 py-2.5 rounded-full border border-white/40 text-white font-sans text-xs font-medium text-center"
                    >
                        View CV
                    </button>
                    <a
                        href="#contact"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="px-7 py-2.5 rounded-full bg-[#ffff7b] text-[#191919] font-sans text-xs font-semibold text-center"
                    >
                        Contact Me ↗
                    </a>
                </div>
            </div>

            <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
        </>
    );
}
