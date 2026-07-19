"use client";
import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function ContactSection() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate send — replace with real API call
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
        }, 1200);
    };

    return (
        <section
            aria-labelledby="contact-heading"
            className="relative w-full min-h-screen flex-shrink-0 flex items-center justify-center p-6 md:p-12 overflow-hidden pointer-events-none"
        >
            <div className="max-w-7xl w-full mx-auto relative z-10 pointer-events-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24 items-center">

                {/* Left Side: Typography & Vertical List */}
                <ScrollReveal direction="right" delay={0.2} className="flex flex-col">
                    <h2
                        id="contact-heading"
                        className="text-5xl md:text-7xl font-siegra font-black tracking-widest text-white uppercase leading-none drop-shadow-2xl"
                    >
                        GET IN<br/>TOUCH
                    </h2>
                    <p className="text-white/60 text-sm mt-4 font-semibold tracking-widest uppercase">
                        (Contact &amp; Socials)
                    </p>

                    {/* Vertical Links List */}
                    <nav aria-label="Social links" className="mt-12 flex flex-col">
                        <a
                            href="mailto:mahdi@example.com"
                            className="py-4 border-t border-white/10 text-red-500 font-bold tracking-widest uppercase hover:text-red-400 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                            EMAIL
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-4 border-t border-white/10 text-white font-bold tracking-widest uppercase hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                            LINKEDIN
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-4 border-t border-white/10 text-white font-bold tracking-widest uppercase hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                            X (TWITTER)
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="py-4 border-t border-b border-white/10 text-white font-bold tracking-widest uppercase hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                        >
                            INSTAGRAM
                        </a>
                    </nav>
                </ScrollReveal>

                {/* Right Side: Form Card */}
                <ScrollReveal direction="left" delay={0.4}>
                    <div className="bg-black/60 border border-white/[0.08] p-8 md:p-12 flex flex-col justify-center min-h-[500px] relative group hover:border-fuchsia-400/40 transition-all duration-300">
                        {/* HUD corner brackets */}
                        <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-fuchsia-400/40 pointer-events-none" />
                        <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-fuchsia-400/40 pointer-events-none" />
                        <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-fuchsia-400/40 pointer-events-none" />
                        <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-fuchsia-400/40 pointer-events-none" />

                        <h3 className="font-mono text-xs font-bold text-fuchsia-400/70 uppercase tracking-[0.3em] mb-8">
                        &gt; DROP A MESSAGE_<span className="animate-blink">|</span>
                        </h3>

                        {/* SUCCESS STATE */}
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center h-full gap-6 py-16 animate-fadeIn">
                                <div className="w-20 h-20 rounded-full bg-fuchsia-500/20 border-2 border-fuchsia-400 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-fuchsia-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white uppercase tracking-wider text-center">Message Sent!</h3>
                                <p className="text-white/60 text-center max-w-xs">Thanks for reaching out. I&apos;ll get back to you within 24 hours.</p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-4 px-8 py-3 border border-fuchsia-400/50 text-fuchsia-400 text-sm font-bold uppercase tracking-widest rounded-full hover:bg-fuchsia-400/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
                                >
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-2xl font-bold text-white uppercase tracking-wider mb-8 group-hover:text-fuchsia-300 transition-colors duration-500">
                                    Drop a Message
                                </h3>

                                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="contact-name" className="text-xs font-semibold tracking-widest uppercase text-white/60">
                                                Name
                                            </label>
                                            <input
                                                id="contact-name"
                                                type="text"
                                                required
                                                placeholder="Your name"
                                                className="w-full px-0 py-3 bg-transparent border-b border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-fuchsia-400 transition-all rounded-none"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label htmlFor="contact-email" className="text-xs font-semibold tracking-widest uppercase text-white/60">
                                                Email
                                            </label>
                                            <input
                                                id="contact-email"
                                                type="email"
                                                required
                                                placeholder="you@example.com"
                                                className="w-full px-0 py-3 bg-transparent border-b border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-fuchsia-400 transition-all rounded-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="contact-message" className="text-xs font-semibold tracking-widest uppercase text-white/60">
                                            Message
                                        </label>
                                        <textarea
                                            id="contact-message"
                                            rows={4}
                                            required
                                            placeholder="Tell me about your project..."
                                            className="w-full px-0 py-3 bg-transparent border-b border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-fuchsia-400 transition-all resize-none rounded-none"
                                        />
                                    </div>

                                    <div className="pt-6 flex flex-col sm:flex-row gap-4 items-start">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="relative px-10 py-3 font-mono text-[11px] font-bold tracking-[0.25em] uppercase text-fuchsia-300 border border-fuchsia-400/40 hover:border-fuchsia-400/80 hover:bg-fuchsia-500/5 hover:text-fuchsia-200 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fuchsia-400 flex items-center gap-3"
                                        >
                                            {loading ? (
                                                <>
                                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                                                    </svg>
                                                    Sending...
                                                </>
                                            ) : "Send Message"}
                                        </button>
                                    </div>
                                </form>
                            </>
                        )}

                        <div className="mt-auto pt-8 flex justify-between items-end">
                            <p className="text-white/20 text-[10px] tracking-widest uppercase">
                                &copy; {new Date().getFullYear()} Mahdi Gouadria.
                            </p>
                            <div className="text-5xl font-black text-white/10 leading-none">
                                03
                            </div>
                        </div>
                    </div>
                </ScrollReveal>

            </div>
        </section>
    );
}
