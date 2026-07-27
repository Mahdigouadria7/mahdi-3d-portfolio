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

    return (
        <section
            id="contact"
            aria-labelledby="contact-heading"
            className="relative w-full bg-[#191919] text-white py-20 md:py-28 overflow-hidden border-t border-white/10"
        >
            <div className="max-w-4xl mx-auto px-6 md:px-12">
                {/* ── Section Header ─────────────────────────── */}
                <div className="text-center mb-12">
                    <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#ffff7b] block mb-3 font-bold">
                        [Contact]
                    </span>
                    <h2
                        id="contact-heading"
                        className="font-playfair text-5xl md:text-7xl text-white leading-tight mb-4"
                        style={{ fontWeight: 800 }}
                    >
                        Get in{" "}
                        <em className="font-playfair italic font-normal text-[#ffff7b]">
                            Touch
                        </em>
                    </h2>
                    <p className="font-mono text-xs md:text-sm text-white/60 max-w-lg mx-auto leading-relaxed font-medium">
                        Available for 3D commissions, CGI projects, web collaborations, and creative direction.
                    </p>
                </div>

                {/* ── Centered Contact Form Card ───────────────── */}
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl">
                    {submitted ? (
                        <div className="flex flex-col items-center text-center gap-6 py-8 animate-fadeIn">
                            <div className="w-14 h-14 rounded-full bg-[#ffff7b] text-[#191919] flex items-center justify-center shadow-lg">
                                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="font-playfair text-3xl text-white mb-2" style={{ fontWeight: 700 }}>
                                    Message sent successfully!
                                </h3>
                                <p className="font-mono text-xs text-white/60 leading-relaxed max-w-sm mx-auto">
                                    Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                                </p>
                            </div>
                            <button
                                onClick={() => setSubmitted(false)}
                                className="font-mono text-xs text-[#ffff7b] underline underline-offset-4 hover:text-white transition-colors"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-8" noValidate>
                            <h3
                                className="font-playfair text-2xl text-white border-b border-white/10 pb-4"
                                style={{ fontWeight: 600 }}
                            >
                                Send a message
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="c-name" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff7b] font-bold">
                                        Name
                                    </label>
                                    <input
                                        id="c-name"
                                        type="text"
                                        required
                                        placeholder="Your name"
                                        className="w-full bg-black/30 border border-white/15 rounded-xl text-white placeholder:text-white/30 px-4 py-3 focus:outline-none focus:border-[#ffff7b] transition-colors font-mono text-sm"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="c-email" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff7b] font-bold">
                                        Email
                                    </label>
                                    <input
                                        id="c-email"
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        className="w-full bg-black/30 border border-white/15 rounded-xl text-white placeholder:text-white/30 px-4 py-3 focus:outline-none focus:border-[#ffff7b] transition-colors font-mono text-sm"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="c-message" className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff7b] font-bold">
                                    Message
                                </label>
                                <textarea
                                    id="c-message"
                                    rows={5}
                                    required
                                    placeholder="Tell me about your project..."
                                    className="w-full bg-black/30 border border-white/15 rounded-xl text-white placeholder:text-white/30 px-4 py-3 focus:outline-none focus:border-[#ffff7b] transition-colors resize-none font-mono text-sm"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full sm:w-auto self-center inline-flex items-center justify-center gap-3 bg-[#ffff7b] text-[#191919] font-mono text-xs tracking-[0.2em] uppercase px-10 py-4 rounded-full hover:bg-white hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold shadow-lg mt-2"
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        Send message
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
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
