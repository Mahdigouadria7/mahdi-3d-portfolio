"use client";
import { useEffect, useRef, useState } from "react";
import ProjectModel from "@/components/3d/ProjectModel";
import ScrollReveal from "@/components/ui/ScrollReveal";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
    const pointerDownRef = useRef({ x: 0, y: 0, time: 0 });

    const handlePointerDownCard = (e: React.PointerEvent) => {
        pointerDownRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
    };

    const handleNavigation = (e: React.MouseEvent, slug: string) => {
        const dx = Math.abs(e.clientX - pointerDownRef.current.x);
        const dy = Math.abs(e.clientY - pointerDownRef.current.y);
        const dt = Date.now() - pointerDownRef.current.time;

        // If the user moved the mouse more than 10 pixels or held it for more than 400ms,
        // they are interacting with the 3D model or dragging the track, not clicking the card.
        // Relaxed constraints for mobile taps.
        if (dx > 10 || dy > 10 || dt > 400) {
            e.preventDefault();
            return;
        }

        e.preventDefault();
        
        setSelectedSlug(slug);

        // Standard Next.js client-side navigation
        router.push(`/projects/${slug}`);
    };

    // Smooth scrolling state
    const targetScroll = useRef(0);
    const currentScroll = useRef(0);
    const lastScroll = useRef(0); // For calculating actual velocity
    const isAnimating = useRef(false);

    // Text physics state
    const textTargetShift = useRef(0);
    const textCurrentShift = useRef(0);
    const textVelocity = useRef(0);
    const thresholdRef = useRef(0); // Dynamic threshold

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        // Calculate exact pixel distance between text and first card
        const updateThreshold = () => {
            if (textRef.current && trackRef.current && trackRef.current.children.length > 0) {
                const oldTransform = textRef.current.style.transform;
                textRef.current.style.transform = 'none';
                
                const oldScroll = container.scrollLeft;
                container.scrollLeft = 0;
                
                const textRight = textRef.current.getBoundingClientRect().right;
                const cardLeft = (trackRef.current.children[0] as HTMLElement).getBoundingClientRect().left;
                
                // Set threshold so they exactly touch (with an 8px visual buffer)
                thresholdRef.current = Math.max(0, cardLeft - textRight - 8);
                
                container.scrollLeft = oldScroll;
                textRef.current.style.transform = oldTransform;
            }
        };
        updateThreshold();
        window.addEventListener('resize', updateThreshold);

        targetScroll.current = container.scrollLeft;
        currentScroll.current = container.scrollLeft;
        lastScroll.current = container.scrollLeft;

        const lerp = (start: number, end: number, factor: number) => {
            return start + (end - start) * factor;
        };

        const animate = () => {
            if (!container) return;
            
            let needsNextFrame = false;

            // 1. Container Scroll Lerp (Lower factor = heavier, smoother glide)
            if (Math.abs(targetScroll.current - currentScroll.current) > 0.5) {
                currentScroll.current = lerp(currentScroll.current, targetScroll.current, 0.04);
                container.scrollLeft = currentScroll.current;
                needsNextFrame = true;
            } else if (currentScroll.current !== targetScroll.current) {
                currentScroll.current = targetScroll.current;
                container.scrollLeft = currentScroll.current;
            }

            // Calculate actual velocity for the WOW skew effect
            const actualVelocity = currentScroll.current - lastScroll.current;
            lastScroll.current = currentScroll.current;

            if (trackRef.current) {
                // Apply a dynamic inertia skew based on how fast the track is moving
                const skew = actualVelocity * 0.15;
                const clampedSkew = Math.max(-12, Math.min(12, skew));
                
                // Only update DOM if necessary to prevent layout thrashing
                if (Math.abs(clampedSkew) > 0.01) {
                    trackRef.current.style.transform = `skewX(${clampedSkew}deg)`;
                    needsNextFrame = true;
                } else if (trackRef.current.style.transform !== 'skewX(0deg)') {
                    trackRef.current.style.transform = 'skewX(0deg)';
                }
            }

            // 2. Text Spring Physics (Tuned for more liquid bounce)
            const tension = 0.08; 
            const friction = 0.82; 
            
            const prevShift = textCurrentShift.current;

            textVelocity.current += (textTargetShift.current - textCurrentShift.current) * tension;
            textVelocity.current *= friction;
            textCurrentShift.current += textVelocity.current;

            // ONE-WAY SOLID WALL CONSTRAINT:
            // Prevents the spring from lagging behind the card when pushed (prevents overlap)
            if (textCurrentShift.current < textTargetShift.current) {
                textCurrentShift.current = textTargetShift.current;
                textVelocity.current = 0; // Nullify velocity so it acts rigidly when pushed
            }

            if (Math.abs(textVelocity.current) > 0.05 || Math.abs(textTargetShift.current - textCurrentShift.current) > 0.05) {
                needsNextFrame = true;
            } else {
                textCurrentShift.current = textTargetShift.current;
                textVelocity.current = 0;
            }

            // ALWAYS update DOM if the shift value changed this frame
            if (prevShift !== textCurrentShift.current) {
                if (textRef.current) {
                    const shift = textCurrentShift.current;
                    textRef.current.style.transform = `translateX(-${shift}px)`;
                    
                    if (shift <= 0) {
                        textRef.current.style.maskImage = 'none';
                        textRef.current.style.webkitMaskImage = 'none';
                    } else {
                        // Dynamically determine the padding to create a perfect edge fade
                        const padding = window.innerWidth >= 768 ? 48 : 24;
                        textRef.current.style.maskImage = `linear-gradient(to right, transparent ${shift}px, black ${shift + padding}px)`;
                        textRef.current.style.webkitMaskImage = `linear-gradient(to right, transparent ${shift}px, black ${shift + padding}px)`;
                    }
                }
            }

            if (needsNextFrame) {
                requestAnimationFrame(animate);
            } else {
                isAnimating.current = false;
            }
        };

        const onWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                e.preventDefault();
                
                const maxScroll = container.scrollWidth - container.clientWidth;
                // Higher multiplier (2.5) means less scrolling required for massive fluid glides
                targetScroll.current = Math.max(0, Math.min(targetScroll.current + e.deltaY * 2.5, maxScroll));
                
                if (!isAnimating.current) {
                    isAnimating.current = true;
                    requestAnimationFrame(animate);
                }
            }
        };

        const onScroll = () => {
            const scrollLeft = container.scrollLeft;
            
            // Keep our lerp targets in sync if the user scrolls natively (e.g. mobile touch swipe)
            if (!isAnimating.current) {
                targetScroll.current = scrollLeft;
                currentScroll.current = scrollLeft;
            }

            textTargetShift.current = Math.max(0, scrollLeft - thresholdRef.current);

            if (!isAnimating.current) {
                isAnimating.current = true;
                requestAnimationFrame(animate);
            }
        };

        // Drag to scroll logic
        const isDragging = { current: false };
        const startX = { current: 0 };
        const scrollLeftRef = { current: 0 };

        const onPointerDown = (e: PointerEvent) => {
            isDragging.current = true;
            startX.current = e.pageX - container.offsetLeft;
            scrollLeftRef.current = targetScroll.current;
            container.style.cursor = 'grabbing';
            container.style.userSelect = 'none';
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!isDragging.current) return;
            e.preventDefault(); 
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX.current) * 2;
            const maxScroll = container.scrollWidth - container.clientWidth;
            targetScroll.current = Math.max(0, Math.min(scrollLeftRef.current - walk, maxScroll));

            if (!isAnimating.current) {
                isAnimating.current = true;
                requestAnimationFrame(animate);
            }
        };

        const onPointerUpOrLeave = () => {
            isDragging.current = false;
            container.style.cursor = 'ew-resize';
            container.style.userSelect = 'auto';
        };

        // passive: false is required to be able to preventDefault()
        container.addEventListener('wheel', onWheel, { passive: false });
        container.addEventListener('scroll', onScroll);
        container.addEventListener('pointerdown', onPointerDown);
        container.addEventListener('pointermove', onPointerMove);
        container.addEventListener('pointerup', onPointerUpOrLeave);
        container.addEventListener('pointercancel', onPointerUpOrLeave);

        // Reset scroll when section leaves viewport
        const section = container.closest('section');
        let observer: IntersectionObserver | null = null;
        if (section) {
            observer = new IntersectionObserver((entries) => {
                if (!entries[0].isIntersecting) {
                    // Instantly reset everything
                    container.scrollLeft = 0;
                    targetScroll.current = 0;
                    currentScroll.current = 0;
                    
                    textTargetShift.current = 0;
                    textCurrentShift.current = 0;
                    textVelocity.current = 0;

                    if (textRef.current) {
                        textRef.current.style.transform = `translateX(0px)`;
                        textRef.current.style.maskImage = 'none';
                        textRef.current.style.webkitMaskImage = 'none';
                    }
                    if (trackRef.current) {
                        trackRef.current.style.transform = 'skewX(0deg)';
                    }
                }
            }, { threshold: 0 });
            observer.observe(section);
        }

        return () => {
            if (observer) observer.disconnect();
            container.removeEventListener('wheel', onWheel);
            container.removeEventListener('scroll', onScroll);
            container.removeEventListener('pointerdown', onPointerDown);
            container.removeEventListener('pointermove', onPointerMove);
            container.removeEventListener('pointerup', onPointerUpOrLeave);
            container.removeEventListener('pointercancel', onPointerUpOrLeave);
        };
    }, []);

    return (
        <section className="relative w-full h-screen flex-shrink-0 flex items-center justify-center p-0 md:p-12 overflow-hidden pointer-events-none">
            
            <div className="max-w-[1400px] w-full mx-auto relative z-10 pointer-events-auto flex flex-col h-full justify-center">
                
                {/* Upper Scroll Area (Empty space to allow vertical page scroll) */}
                <div className="h-16 md:h-24 w-full flex-shrink-0 cursor-ns-resize"></div>

                {/* Separated Scroll Part */}
                <div className="w-full bg-transparent relative flex items-center h-[500px] md:h-[600px] my-auto">
                    
                    {/* Left Side: Massive Typography (Fixed within the box) */}
                    <div 
                        ref={textRef}
                        className="flex flex-col w-[85vw] md:w-max flex-shrink-0 pl-6 md:pl-12 z-20 pointer-events-none absolute left-0 transition-none"
                    >
                        <div className="flex items-center gap-3 mb-2 md:mb-4">
                            <span className="font-mono text-[10px] font-bold tracking-widest text-fuchsia-400 border border-fuchsia-500/30 bg-fuchsia-500/10 px-2.5 py-0.5">01</span>
                            <div className="flex items-center gap-0">
                                <div className="w-6 h-[2px] bg-fuchsia-500" />
                                <div className="w-6 h-[2px] bg-fuchsia-500/40" />
                            </div>
                            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/40">
                                Selected Work
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-siegra font-black tracking-widest text-white uppercase leading-none drop-shadow-2xl">
                            FEATURED<br/>PROJECTS
                        </h2>
                        {/* Dual-gradient Accent Line */}
                        <div className="w-16 md:w-24 h-[2px] bg-gradient-to-r from-fuchsia-500 to-cyan-500 mt-4 mb-4 md:mt-6 md:mb-6" />
                        <p className="text-white/60 text-xs md:text-base leading-relaxed max-w-[250px] md:max-w-xs font-cyber">
                            A curated selection of 3D, interactive, and real-time web projects — each built from scratch with precision and intent.
                        </p>
                        <div className="mt-8 md:mt-12 text-2xl md:text-5xl font-black text-white/90">
                            01
                        </div>
                    </div>

                    {/* Right Side: Horizontal Native Scrolling Dark Cards */}
                    <div 
                        ref={scrollContainerRef}
                        className="flex-1 h-full overflow-x-auto overflow-y-hidden hide-scrollbar cursor-ew-resize absolute inset-0 z-10 flex items-center"
                        style={{
                            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                            touchAction: 'pan-y'
                        }}
                    >
                        {/* Single row of cards: reduced gap-x and reduced horizontal width */}
                        <div ref={trackRef} className="flex flex-row gap-x-4 w-max h-auto py-16 pr-12 md:pr-24 pl-[85vw] md:pl-[700px] items-center">
                            {projects.map((project, i) => {
                                const isSelected = selectedSlug === project.slug;
                                const isOtherSelected = selectedSlug !== null && !isSelected;

                                return (
                                    <ScrollReveal 
                                        key={project.slug} 
                                        direction="up" 
                                        delay={0.2 + (i * 0.15)} // Staggered delay!
                                        className={`flex-shrink-0 ${isOtherSelected ? 'pointer-events-none' : ''}`}
                                    >
                                        <a 
                                            href={`/projects/${project.slug}`} 
                                            onClick={(e) => handleNavigation(e, project.slug)}
                                            onPointerDown={handlePointerDownCard}
                                            className={`block transition-[opacity,transform] duration-300 select-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-fuchsia-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${isOtherSelected ? 'opacity-0 scale-90' : ''} ${isSelected ? 'z-50' : ''}`}
                                            draggable={false}
                                            onDragStart={(e) => e.preventDefault()}
                                        >                                         {/* Per-card accent setup */}
                                        {(() => {
                                            const acc = project.accent ?? 'fuchsia';
                                            const palettes: Record<string, { bar: string; cat: string; activeClasses: string; hoverClasses: string }> = {
                                                fuchsia: { bar: 'bg-fuchsia-500', cat: 'text-fuchsia-400', activeClasses: 'border-fuchsia-400/80 bg-fuchsia-400/10', hoverClasses: 'hover:border-fuchsia-400/60' },
                                                cyan:    { bar: 'bg-cyan-500',    cat: 'text-cyan-400',    activeClasses: 'border-cyan-400/80 bg-cyan-400/10',    hoverClasses: 'hover:border-cyan-400/60'    },
                                                violet:  { bar: 'bg-violet-500',  cat: 'text-violet-400',  activeClasses: 'border-violet-400/80 bg-violet-400/10',  hoverClasses: 'hover:border-violet-400/60'  },
                                                amber:   { bar: 'bg-amber-500',   cat: 'text-amber-400',   activeClasses: 'border-amber-400/80 bg-amber-400/10',   hoverClasses: 'hover:border-amber-400/60'   },
                                                rose:    { bar: 'bg-rose-500',    cat: 'text-rose-400',    activeClasses: 'border-rose-400/80 bg-rose-400/10',    hoverClasses: 'hover:border-rose-400/60'    },
                                                emerald: { bar: 'bg-emerald-500', cat: 'text-emerald-400', activeClasses: 'border-emerald-400/80 bg-emerald-400/10', hoverClasses: 'hover:border-emerald-400/60' },
                                            };
                                            const p = palettes[acc] ?? palettes.fuchsia;
                                            return (
                                        <article
                                            className={`card-glitch group relative flex flex-col items-center text-center overflow-hidden h-[400px] w-[300px] md:h-[500px] md:w-[400px] bg-black/60 backdrop-blur-xl rounded-2xl border border-white/15 shadow-xl shadow-black/80 transition-all duration-300 ${
                                                isSelected
                                                    ? p.activeClasses
                                                    : p.hoverClasses
                                            }`}
                                            style={{ '--glitch-delay': `-${(i * 3.7) % 8}s` } as React.CSSProperties}
                                        >
                                            {/* Accent top bar */}
                                            <div className={`absolute top-0 left-0 right-0 h-[2px] ${p.bar} opacity-70 z-30`} />

                                            {/* Corner brackets */}
                                            <span className="absolute top-1 left-1 w-3 h-3 border-t border-l border-white/20 z-30" />
                                            <span className="absolute top-1 right-1 w-3 h-3 border-t border-r border-white/20 z-30" />
                                            <span className="absolute bottom-1 left-1 w-3 h-3 border-b border-l border-white/20 z-30" />
                                            <span className="absolute bottom-1 right-1 w-3 h-3 border-b border-r border-white/20 z-30" />

                                            {/* Index number */}
                                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[150px] md:text-[200px] font-mono font-black text-white/[0.025] select-none pointer-events-none z-0 leading-none group-hover:scale-105 ${isSelected ? 'opacity-0' : 'transition-all duration-500'}`}>
                                                {String(i + 1).padStart(2, '0')}
                                            </div>

                                            {/* 3D Model Background */}
                                            <div 
                                                style={{ viewTransitionName: `project-model-${project.slug}` }}
                                                className={`absolute inset-0 z-10 ${isSelected ? 'opacity-100' : 'opacity-60 transition-opacity duration-500 group-hover:opacity-95'}`}
                                            >
                                                {(project.slug === "trionda-ball-wc-2026" || project.slug === "redbull-gold-concept") && (
                                                    <ProjectModel index={i} />
                                                )}
                                            </div>
                                             {/* Top label row */}
                                            <div className={`relative z-20 pointer-events-none flex flex-col items-center justify-between h-full w-full overflow-hidden ${isSelected ? 'opacity-0' : 'transition-opacity duration-300 opacity-100'}`}>
                                                <div className="w-full pt-8 md:pt-10 px-6 md:px-8 flex items-center justify-between pointer-events-auto cursor-pointer">
                                                    <span className={`font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] ${p.cat} drop-shadow-md`}>
                                                        {project.category}
                                                    </span>
                                                    <span className="font-mono text-[10px] md:text-xs text-white/40 tracking-widest">
                                                        {project.timeline}
                                                    </span>
                                                </div>

                                                {/* Bottom info strip */}
                                                <div className="w-full pb-6 md:pb-8 px-6 md:px-8 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-auto cursor-pointer">
                                                    <h3 className="font-siegra text-lg md:text-xl font-bold text-white tracking-wider uppercase drop-shadow-lg text-left mb-2">
                                                        {project.title}
                                                    </h3>
                                                    <p className="font-cyber text-white/50 text-xs leading-relaxed text-left line-clamp-2">
                                                        {project.description}
                                                    </p>
                                                    {/* Client + role row */}
                                                    <div className="flex items-center justify-between mt-3">
                                                        <span className="font-mono text-[9px] text-white/25 uppercase tracking-widest">{project.client}</span>
                                                        <span className={`font-mono text-[9px] ${p.cat} opacity-60 group-hover:opacity-100 transition-opacity`}>VIEW →</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </article>
                                            );
                                        })()}
                                        </a>
                                    </ScrollReveal>
                                );
                            })}
                        </div>
                    </div>

                </div>

                {/* Bottom Scroll Area (Empty space to allow vertical page scroll) */}
                <div className="h-16 md:h-24 w-full flex-shrink-0 cursor-ns-resize"></div>

            </div>
        </section>
    );
}
