"use client";

import { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
    children: React.ReactNode;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    delay?: number;
    duration?: number;
    distance?: number;
    className?: string;
    threshold?: string; // e.g. "0.1" for 10%
}

export default function ScrollReveal({ 
    children, 
    direction = 'up',
    delay = 0,
    duration = 1.2,
    distance = 50,
    className = "",
    threshold = "0.1"
}: ScrollRevealProps) {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Stop observing once visible
                    if (elementRef.current) {
                        observer.unobserve(elementRef.current);
                    }
                }
            },
            {
                root: null,
                rootMargin: '0px',
                threshold: parseFloat(threshold) || 0.1,
            }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current);
            }
        };
    }, [threshold]);

    let transform = 'none';
    if (!isVisible) {
        switch(direction) {
            case 'up': transform = `translateY(${distance}px)`; break;
            case 'down': transform = `translateY(-${distance}px)`; break;
            case 'left': transform = `translateX(${distance}px)`; break;
            case 'right': transform = `translateX(-${distance}px)`; break;
            case 'none': transform = 'none'; break;
        }
    }

    return (
        <div 
            ref={elementRef} 
            className={className} 
            style={{ 
                opacity: isVisible ? 1 : 0,
                transform: transform,
                transition: `opacity ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
                willChange: 'transform, opacity'
            }}
        >
            {children}
        </div>
    );
}
