"use client";

import { useRef, useEffect, useState } from "react";

const CLIENT_LOGOS = [
    { name: "Samsung",       url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994634/portfolio/clients/samsung.png",       style: { maxHeight: "44px", maxWidth: "140px" } },
    { name: "Orange",        url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994632/portfolio/clients/orange.png",        style: { maxHeight: "52px", maxWidth: "56px" } },
    { name: "Danone",        url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994624/portfolio/clients/danone.png",        style: { maxHeight: "38px", maxWidth: "110px" } },
    { name: "Yves Rocher",   url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994636/portfolio/clients/yves_rocher.png",   style: { maxHeight: "32px", maxWidth: "120px" } },
    { name: "Délice Holding",url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994627/portfolio/clients/delice.png",        style: { maxHeight: "38px", maxWidth: "110px" } },
    { name: "DanUp",         url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994625/portfolio/clients/danup.png",         style: { maxHeight: "38px", maxWidth: "110px" } },
    { name: "UBCI",          url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994635/portfolio/clients/ubci.png",          style: { maxHeight: "36px", maxWidth: "110px" } },
    { name: "Diari Express", url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994628/portfolio/clients/diari_express.png", style: { maxHeight: "56px", maxWidth: "64px" } },
    { name: "Jouda",         url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994630/portfolio/clients/jouda.png",         style: { maxHeight: "46px", maxWidth: "120px" } },
    { name: "Fourré",        url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994629/portfolio/clients/fourre.png",        style: { maxHeight: "32px", maxWidth: "110px" } },
    { name: "Papillon",      url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994632/portfolio/clients/papillon.png",      style: { maxHeight: "42px", maxWidth: "110px" } },
    { name: "DCroc",         url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994626/portfolio/clients/dcroc.png",         style: { maxHeight: "42px", maxWidth: "110px" } },
    { name: "Kif",           url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994631/portfolio/clients/kif.png",           style: { maxHeight: "42px", maxWidth: "110px" } },
    { name: "Kairna",        url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994630/portfolio/clients/kairna.png",        style: { maxHeight: "42px", maxWidth: "110px" } },
    { name: "Smile",         url: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,h_180/v1784994635/portfolio/clients/smile.png",         style: { maxHeight: "42px", maxWidth: "110px" } },
];

// Two full copies for seamless -50% loop
const ALL_LOGOS = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

const BASE_SPEED = 0.45;   // px / frame at 60 fps — gentle auto-drift
const FRICTION   = 0.935;  // inertia decay per frame (lower = slides longer)
const GAP        = 72;     // px between logos — applied as padding-right on each item

export default function LogoMarquee() {
    const trackRef   = useRef<HTMLDivElement>(null);
    const posRef     = useRef(0);          // current scroll offset in px
    const velRef     = useRef(0);          // current drag velocity in px/frame
    const dragging   = useRef(false);
    const lastX      = useRef(0);
    const lastT      = useRef(0);
    const setWidth   = useRef(0);          // width of ONE copy of the logo set
    const rafId      = useRef<number>(0);

    const [hovered, setHovered] = useState<number | null>(null);

    // ── Compute the seamless half-width after images load ──────────────
    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const measure = () => {
            // scrollWidth = both copies; half = one loop unit
            setWidth.current = track.scrollWidth / 2;
        };

        const imgs = Array.from(track.querySelectorAll("img"));
        let remaining = imgs.filter(img => !img.complete).length;
        if (remaining === 0) { measure(); }
        else {
            const onLoad = () => { remaining--; if (remaining === 0) measure(); };
            imgs.forEach(img => { if (!img.complete) img.addEventListener("load", onLoad, { once: true }); });
        }
        // Also measure on resize in case viewport changes
        const ro = new ResizeObserver(measure);
        ro.observe(track);
        return () => ro.disconnect();
    }, []);

    // ── Main rAF animation loop ────────────────────────────────────────
    useEffect(() => {
        const loop = () => {
            if (!dragging.current) {
                // Blend vel toward zero, then floor at base auto-drift
                velRef.current *= FRICTION;
                if (Math.abs(velRef.current) < BASE_SPEED) {
                    velRef.current = BASE_SPEED;
                }
            }

            posRef.current += velRef.current;

            // Seamless wrap — stay in [0, setWidth)
            if (setWidth.current > 0) {
                if (posRef.current < 0) posRef.current += setWidth.current;
                posRef.current = posRef.current % setWidth.current;
            }

            if (trackRef.current) {
                trackRef.current.style.transform = `translate3d(-${posRef.current}px, 0, 0)`;
            }

            rafId.current = requestAnimationFrame(loop);
        };

        rafId.current = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(rafId.current);
    }, []);

    // ── Drag / inertia pointer handlers ───────────────────────────────
    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        dragging.current = true;
        velRef.current   = 0;
        lastX.current    = e.clientX;
        lastT.current    = performance.now();
        try {
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        } catch {
            // Ignore pointer capture errors on older touch devices
        }
    };

    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!dragging.current) return;
        const now = performance.now();
        const dt  = Math.max(now - lastT.current, 1);
        const dx  = e.clientX - lastX.current;

        if (Math.abs(dx) > 2) {
            setHovered(null); // Clear active logo scale while dragging
        }

        // Drag: move track opposite to pointer direction (pull right → items go right)
        posRef.current -= dx;

        // Record instantaneous velocity (px/ms → px/frame@60fps)
        velRef.current  = (-dx / dt) * 16.67;

        lastX.current = e.clientX;
        lastT.current = now;
    };

    const onPointerUp = () => {
        dragging.current = false;
        // velocity keeps its sign — inertia takes over from the loop
    };

    return (
        <div
            className="w-full py-5 bg-[#141414] overflow-hidden cursor-grab active:cursor-grabbing select-none relative touch-pan-y"
            style={{
                touchAction: "pan-y",
                maskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 7%, black 93%, transparent 100%)",
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            onPointerCancel={onPointerUp}
        >
            {/* ── Track — flex row, no wrapping, width driven by content ── */}
            <div
                ref={trackRef}
                className="flex w-max will-change-transform"
                style={{ userSelect: "none" }}
            >
                {ALL_LOGOS.map((client, i) => {
                    const seed       = i % CLIENT_LOGOS.length;
                    const floatDelay = (seed * 0.37).toFixed(2);   // staggered per unique logo
                    const floatDur   = (3.2 + seed * 0.15).toFixed(2); // slightly varied durations
                    const isHovered  = hovered === i;

                    return (
                        <div
                            key={i}
                            className="flex-shrink-0 flex items-center justify-center h-14 md:h-18"
                            style={{
                                minWidth: "70px",
                                paddingRight: `${GAP}px`,
                                // Float wrapper — translateY only
                                animation: `logo-float ${floatDur}s ease-in-out infinite`,
                                animationDelay: `${floatDelay}s`,
                            }}
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            onTouchStart={() => setHovered(i)}
                            onTouchEnd={() => setTimeout(() => setHovered(null), 500)}
                            onTouchCancel={() => setHovered(null)}
                        >
                            <img
                                src={client.url}
                                alt={client.name}
                                draggable={false}
                                style={{
                                    ...client.style,
                                    // Hover scale applied to img separately so float & scale don't fight
                                    transform: isHovered ? "scale(1.28)" : "scale(1)",
                                    transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                    filter: isHovered ? "brightness(1.1)" : "brightness(1)",
                                }}
                                className="w-auto h-auto object-contain pointer-events-none"
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
