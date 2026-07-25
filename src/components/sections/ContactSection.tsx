"use client";
import { useState } from "react";

export default function ContactSection() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1200);
    };

    const links = [
        { label: "Email", href: "mailto:mahdigouadria8@gmail.com", sub: "mahdigouadria8@gmail.com" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/mahdi-gouadria?utm_source=share_via&utm_content=profile&utm_medium=member_android", sub: "linkedin.com/in/mahdi-gouadria" },
        { label: "Instagram", href: "https://www.instagram.com/mahdi_gouadria?igsh=MWphcmIyNXhtOWIzZw==", sub: "@mahdi_gouadria" },
        { label: "Pinterest", href: "https://pin.it/3lpdLZIEI", sub: "pin.it/3lpdLZIEI" },
        { label: "Behance", href: "https://www.behance.net/mahdigouadria", sub: "behance.net/mahdigouadria" },
    ];

    return (
        <section
            id="contact"
            aria-labelledby="contact-heading"
            className="relative w-full bg-[#191919]"
        >
            {/* ── Section Header ─────────────────────────── */}
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between px-6 md:px-16 pt-20 pb-10 gap-6">
                <div>
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30 block mb-3">
                        Contact
                    </span>
                    <h2
                        id="contact-heading"
                        className="font-playfair text-6xl md:text-8xl text-white leading-none"
                        style={{ fontWeight: 800 }}
                    >
                        Get in
                        <br />
                        <em className="font-playfair italic" style={{ fontWeight: 400 }}>
                            Touch
                        </em>
                    </h2>
                </div>
                <p className="font-mono text-xs md:text-sm text-white/40 max-w-xs md:pb-3 leading-relaxed">
                    Available for 3D commissions, CGI projects, web collaborations, and creative direction.
                </p>
            </div>

            {/* ── Top border ─────────────────────────────── */}
            <div className="w-full h-px bg-white/10" />

            {/* ── Two-column layout ──────────────────────── */}
            <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-white/10">

                {/* Left: social links list */}
                <div className="divide-y divide-white/10">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="group flex items-center justify-between px-6 md:px-16 py-7 hover:bg-white/[0.04] transition-colors duration-300"
                        >
                            <div>
                                <p
                                    className="font-playfair text-2xl md:text-3xl text-white group-hover:italic transition-all duration-300"
                                    style={{ fontWeight: 600 }}
                                >
                                    {link.label}
                                </p>
                                <p className="font-mono text-[10px] text-white/30 mt-0.5 tracking-wide">
                                    {link.sub}
                                </p>
                            </div>
                            <span className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/25 group-hover:text-white group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-300 group-hover:translate-x-1 text-sm flex-shrink-0">
                                →
                            </span>
                        </a>
                    ))}
                </div>

                {/* Right: contact form */}
                <div className="px-6 md:px-16 py-12">
                    {submitted ? (
                        <div className="flex flex-col items-start gap-6 py-4 animate-fadeIn">
                            <div className="w-12 h-12 rounded-full bg-[#191919] flex items-center justify-center">
                                <svg className="w-6 h-6 text-[#ffff7b]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-playfair text-3xl text-white mb-2" style={{ fontWeight: 700 }}>
                                    Message sent!
                                </h3>
                                <p className="font-mono text-xs text-white/40 leading-relaxed max-w-xs">
                                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                                </p>
                            </div>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="font-mono text-xs text-white/40 underline underline-offset-4 hover:text-white transition-colors"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
                            <h3
                                className="font-playfair text-2xl text-white"
                                style={{ fontWeight: 600 }}
                            >
                                Send a message
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="c-name" className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                                        Name
                                    </label>
                                    <input
                                        id="c-name"
                                        type="text"
                                        required
                                        placeholder="Your name"
                                        className="w-full bg-transparent border-b border-white/15 text-white placeholder:text-white/20 py-2.5 focus:outline-none focus:border-white/50 transition-colors font-mono text-sm"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="c-email" className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                                        Email
                                    </label>
                                    <input
                                        id="c-email"
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        className="w-full bg-transparent border-b border-white/15 text-white placeholder:text-white/20 py-2.5 focus:outline-none focus:border-white/50 transition-colors font-mono text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="c-message" className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                                    Message
                                </label>
                                <textarea
                                    id="c-message"
                                    rows={4}
                                    required
                                    placeholder="Tell me about your project..."
                                    className="w-full bg-transparent border-b border-white/15 text-white placeholder:text-white/20 py-2.5 focus:outline-none focus:border-white/50 transition-colors resize-none font-mono text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="self-start inline-flex items-center gap-3 bg-[#ffff7b] text-[#191919] font-mono text-xs tracking-[0.2em] uppercase px-8 py-4 rounded-full hover:bg-[#ffff7b]/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send message
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* ── Bottom border ──────────────────────────── */}
            <div className="w-full h-px bg-white/10" />

            {/* ── Footer ─────────────────────────────────── */}
            <div className="flex items-center justify-between px-6 md:px-16 py-6">
                <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
                    © {new Date().getFullYear()} Mahdi Gouadria
                </span>
                <span className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
                    3D Designer & Developer
                </span>
            </div>
        </section>
    );
}
