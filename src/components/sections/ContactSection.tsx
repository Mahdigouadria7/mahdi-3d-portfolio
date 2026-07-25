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

function EmailIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
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

    const links = [
        { label: "Email", icon: EmailIcon, href: "mailto:mahdigouadria8@gmail.com", sub: "mahdigouadria8@gmail.com" },
        { label: "LinkedIn", icon: LinkedInIcon, href: "https://www.linkedin.com/in/mahdi-gouadria?utm_source=share_via&utm_content=profile&utm_medium=member_android", sub: "linkedin.com/in/mahdi-gouadria" },
        { label: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/mahdi_gouadria?igsh=MWphcmIyNXhtOWIzZw==", sub: "@mahdi_gouadria" },
        { label: "Pinterest", icon: PinterestIcon, href: "https://pin.it/3lpdLZIEI", sub: "pin.it/3lpdLZIEI" },
        { label: "Behance", icon: BehanceIcon, href: "https://www.behance.net/mahdigouadria", sub: "behance.net/mahdigouadria" },
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
                    {links.map((link) => {
                        const IconComponent = link.icon;
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                target={link.href.startsWith("http") ? "_blank" : undefined}
                                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="group flex items-center justify-between px-6 md:px-16 py-7 hover:bg-white/[0.04] transition-colors duration-300"
                            >
                                <div className="flex items-center gap-4">
                                    <span className="p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 group-hover:bg-[#ffff7b] group-hover:text-[#191919] group-hover:border-[#ffff7b] transition-all duration-300">
                                        <IconComponent className="w-5 h-5" />
                                    </span>
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
                                </div>
                                <span className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/25 group-hover:text-white group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-300 group-hover:translate-x-1 text-sm flex-shrink-0">
                                    →
                                </span>
                            </a>
                        );
                    })}
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
        </section>
    );
}
