"use client";
import { useRef, MouseEvent, ReactNode } from "react";

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    glowColor?: string;
    intensity?: number;
}

/**
 * TiltCard — 3D perspective tilt + mouse-follow spotlight effect.
 * Inspired by the Behance reference card interactions.
 */
export default function TiltCard({
    children,
    className = "",
    glowColor = "rgba(217,70,239,0.12)",
    intensity = 10,
}: TiltCardProps) {
    const cardRef  = useRef<HTMLDivElement>(null);
    const glowRef  = useRef<HTMLDivElement>(null);
    const frameRef = useRef<number | null>(null);

    const onMove = (e: MouseEvent<HTMLDivElement>) => {
        if (frameRef.current) return; // throttle to rAF
        frameRef.current = requestAnimationFrame(() => {
            frameRef.current = null;
            const card = cardRef.current;
            if (!card) return;

            const rect   = card.getBoundingClientRect();
            const x      = e.clientX - rect.left;
            const y      = e.clientY - rect.top;
            const cx     = rect.width  / 2;
            const cy     = rect.height / 2;
            const rotX   = ((y - cy) / cy) * -intensity;
            const rotY   = ((x - cx) / cx) *  intensity;

            card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;

            if (glowRef.current) {
                glowRef.current.style.background =
                    `radial-gradient(280px circle at ${x}px ${y}px, ${glowColor}, transparent 75%)`;
            }
        });
    };

    const onLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
        if (glowRef.current) glowRef.current.style.background = "transparent";
    };

    return (
        <div
            ref={cardRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className={`relative ${className}`}
            style={{ transformStyle: "preserve-3d", willChange: "transform", transition: "transform 0.15s ease-out" }}
        >
            {/* Mouse-follow radial spotlight */}
            <div
                ref={glowRef}
                className="absolute inset-0 pointer-events-none z-10 rounded-[inherit]"
                style={{ transition: "background 0.05s ease" }}
            />
            {children}
        </div>
    );
}
