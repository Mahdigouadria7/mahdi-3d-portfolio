"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

interface LightboxImageProps {
    src: string;
    alt: string;
    className?: string;
}

export default function LightboxImage({ src, alt, className = "" }: LightboxImageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isInView, setIsInView] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mount guard for portals
    useEffect(() => {
        setMounted(true);
    }, []);

    // IntersectionObserver: only start loading the image when it enters the viewport.
    // rootMargin of 200px pre-loads it just before the user scrolls to it.
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "200px", threshold: 0 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // Close lightbox on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    const handleLoad = useCallback(() => setIsLoaded(true), []);

    return (
        <>
            {/* Thumbnail */}
            <div
                ref={containerRef}
                className={`relative cursor-pointer overflow-hidden ${className}`}
                onClick={() => setIsOpen(true)}
            >
                {/* Shimmer placeholder — visible until image finishes loading */}
                <div
                    className={`absolute inset-0 bg-white/5 transition-opacity duration-500 ${isLoaded ? "opacity-0" : "opacity-100"}`}
                    style={{
                        background: "linear-gradient(90deg, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 75%)",
                        backgroundSize: "200% 100%",
                        animation: isLoaded ? "none" : "shimmer 1.4s infinite",
                    }}
                />

                {/* Actual image — only renders src after entering viewport */}
                {isInView && (
                    // eslint-disable-next-line @next/next-no-img-element
                    <img
                        src={src}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        onLoad={handleLoad}
                        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                        style={{ display: "block" }}
                    />
                )}
            </div>

            {/* Lightbox portal — full resolution on demand */}
            {mounted && isOpen && createPortal(
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-12 cursor-zoom-out animate-in fade-in duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    <div
                        className="relative w-full h-full max-w-[90vw] max-h-[90vh] flex items-center justify-center cursor-zoom-out animate-in zoom-in-95 duration-300"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsOpen(false);
                        }}
                    >
                        {/* eslint-disable-next-line @next/next-no-img-element */}
                        <img
                            src={src}
                            alt={alt}
                            decoding="async"
                            className="max-w-full max-h-full object-contain shadow-2xl"
                            style={{ display: "block" }}
                        />
                    </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>,
                document.body
            )}
        </>
    );
}
