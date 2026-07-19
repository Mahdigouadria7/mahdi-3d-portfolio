"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface LightboxImageProps {
    src: string;
    alt: string;
    className?: string;
}

export default function LightboxImage({ src, alt, className = "" }: LightboxImageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
            // Prevent scrolling when lightbox is open
            document.body.style.overflow = "hidden";
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <>
            <div className={`relative cursor-pointer ${className}`} onClick={() => setIsOpen(true)}>
                <Image 
                    src={src} 
                    alt={alt} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                />
            </div>

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
                        <Image 
                            src={src} 
                            alt={alt} 
                            fill
                            sizes="100vw"
                            className="object-contain shadow-2xl" 
                            priority
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
