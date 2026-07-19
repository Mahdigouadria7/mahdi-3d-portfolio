"use client";

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface ScrollRevealProps {
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    delay?: number;
    duration?: number;
    distance?: number;
    className?: string;
    threshold?: string; // e.g. "top 85%"
}

export default function ScrollReveal({ 
    children, 
    direction = 'up',
    delay = 0,
    duration = 1.2, // slightly longer for smoothness
    distance = 50,
    className = "",
    threshold = "top 85%"
}: ScrollRevealProps) {
    const elementRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const el = elementRef.current;
        if (!el) return;

        let x = 0;
        let y = 0;

        switch(direction) {
            case 'up': y = distance; break;
            case 'down': y = -distance; break;
            case 'left': x = distance; break;
            case 'right': x = -distance; break;
            case 'none': break;
        }

        gsap.fromTo(el, 
            { 
                opacity: 0, 
                x: x, 
                y: y 
            },
            {
                opacity: 1,
                x: 0,
                y: 0,
                duration: duration,
                delay: delay,
                ease: "power2.out",
                force3D: true,
                scrollTrigger: {
                    trigger: el,
                    start: threshold,
                    toggleActions: "play none none reverse",
                }
            }
        );

        // Force ScrollTrigger to recalculate after DOM paints on navigation
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

    }, { dependencies: [direction, delay, duration, distance, threshold], scope: elementRef });

    return (
        <div 
            ref={elementRef} 
            className={`opacity-0 ${className}`} 
            style={{ willChange: 'transform, opacity' }}
        >
            {children}
        </div>
    );
}
