"use client";

import { useState, useEffect, useRef } from "react";

/* ── Cursor SVG (exact style from reference video) ─────────── */
function CursorArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M2 2L8.5 15L10.5 10L15.5 8L2 2Z"
        fill="#191919"
        stroke="#191919"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Adobe Photoshop & After Effects Badges ────────────────── */
function PhotoshopIcon({ className = "w-8 h-8 md:w-9 md:h-9" }: { className?: string }) {
  return (
    <div className={`${className} bg-[#001E36] border border-[#31A8FF]/40 rounded-xl flex items-center justify-center font-sans font-bold text-[#31A8FF] text-base md:text-lg leading-none select-none shadow-sm`}>
      Ps
    </div>
  );
}

function AfterEffectsIcon({ className = "w-8 h-8 md:w-9 md:h-9" }: { className?: string }) {
  return (
    <div className={`${className} bg-[#00005B] border border-[#9999FF]/40 rounded-xl flex items-center justify-center font-sans font-bold text-[#9999FF] text-base md:text-lg leading-none select-none shadow-sm`}>
      Ae
    </div>
  );
}

/* ── Cloudinary Image URLs for User Attached Logos (Blender, Houdini, ZBrush, Three.js) ──── */
const CLOUDINARY_ICONS: Record<string, string> = {
  blender: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_200/v1784992610/portfolio/software_icons/blender.png",
  houdini: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_200/v1784992609/portfolio/software_icons/houdini.jpg",
  zbrush: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_200/v1784992611/portfolio/software_icons/zbrush.png",
  threejs: "https://res.cloudinary.com/zu63qo7h/image/upload/f_auto,q_auto,w_200/v1784992612/portfolio/software_icons/threejs.png",
};

function ToolIconRenderer({ type }: { type: string }) {
  if (type === "photoshop") return <PhotoshopIcon />;
  if (type === "aftereffects") return <AfterEffectsIcon />;

  const imageUrl = CLOUDINARY_ICONS[type];
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={type}
        className="w-9 h-9 md:w-11 md:h-11 object-contain rounded-lg pointer-events-none select-none"
      />
    );
  }

  return null;
}

/* ── Tool Data — Calibrated tight positions & text-repelling magnetic bounds ────── */
const TOOLS = [
  {
    id: "blender",
    name: "Blender 3D",
    label: "3D Modeling",
    accent: false,
    posStyle: { top: "18%", left: "18%" },
    posLabel: "right",
    tagTilt: "rotate-[-1.5deg]",
    startX: 240,
    startY: 120,
    magneticFactorX: -8,
    magneticFactorY: -6,
    floatDelay: "0s",
    icon: "blender",
  },
  {
    id: "photoshop",
    name: "Photoshop",
    label: "Graphic Design",
    accent: true,
    posStyle: { top: "2%", left: "42%" },
    posLabel: "right",
    tagTilt: "rotate-[1deg]",
    startX: 0,
    startY: 220,
    magneticFactorX: 0,
    magneticFactorY: -8,
    floatDelay: "0.8s",
    icon: "photoshop",
  },
  {
    id: "aftereffects",
    name: "After Effects",
    label: "Motion Design",
    accent: false,
    posStyle: { top: "17%", right: "18%" },
    posLabel: "left",
    tagTilt: "rotate-[2deg]",
    startX: -240,
    startY: 120,
    magneticFactorX: 8,
    magneticFactorY: -6,
    floatDelay: "1.4s",
    icon: "aftereffects",
  },
  {
    id: "threejs",
    name: "Three.js",
    label: "Web Development",
    accent: false,
    posStyle: { bottom: "24%", left: "20%" },
    posLabel: "right",
    tagTilt: "rotate-[1.5deg]",
    startX: 240,
    startY: -120,
    magneticFactorX: -8,
    magneticFactorY: 6,
    floatDelay: "2.1s",
    icon: "threejs",
  },
  {
    id: "zbrush",
    name: "ZBrush",
    label: "Digital Sculpting",
    accent: false,
    posStyle: { bottom: "2%", left: "43%" },
    posLabel: "right",
    tagTilt: "rotate-[-2deg]",
    startX: 0,
    startY: -220,
    magneticFactorX: 0,
    magneticFactorY: 8,
    floatDelay: "0.5s",
    icon: "zbrush",
  },
  {
    id: "houdini",
    name: "Houdini",
    label: "VFX & Simulation",
    accent: true,
    posStyle: { bottom: "20%", right: "20%" },
    posLabel: "left",
    tagTilt: "rotate-[-1deg]",
    startX: -240,
    startY: -120,
    magneticFactorX: 8,
    magneticFactorY: 6,
    floatDelay: "1.2s",
    icon: "houdini",
  },
];

/* ── Single Tool Card Component with Magnetic Mouse & Scroll Explosion ───────── */
function ToolCard({
  tool,
  scrollProgress,
  mousePos,
}: {
  tool: (typeof TOOLS)[number];
  scrollProgress: number;
  mousePos: { x: number; y: number };
}) {
  const [hovered, setHovered] = useState(false);

  const rawProgress = (scrollProgress - 0.02) / 0.48;
  const clampedProgress = Math.max(0, Math.min(1, rawProgress));

  const easeProgress = 1 - Math.pow(1 - clampedProgress, 4);

  const scrollOffsetX = tool.startX * (1 - easeProgress);
  const scrollOffsetY = tool.startY * (1 - easeProgress);

  const magX = mousePos.x * tool.magneticFactorX;
  const magY = mousePos.y * tool.magneticFactorY;

  const totalX = scrollOffsetX + magX;
  const totalY = scrollOffsetY + magY;

  const scale = 0.35 + easeProgress * 0.65;
  const opacity = easeProgress;

  return (
    <div
      className="absolute z-20 pointer-events-auto transition-transform duration-500 ease-out will-change-transform"
      style={{
        ...tool.posStyle,
        transform: `translate3d(${totalX}px, ${totalY}px, 0px) scale(${hovered ? scale * 1.12 : scale})`,
        opacity: opacity,
      }}
    >
      <div
        className="flex items-center gap-2 transition-all duration-300"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          animation: `floatingTool 5.5s ease-in-out infinite`,
          animationDelay: tool.floatDelay,
        }}
      >
        {tool.posLabel === "left" && (
          <>
            <span
              className={`font-mono text-[11px] md:text-xs tracking-wide px-3.5 py-1.5 rounded-full shadow-md transition-all duration-300 whitespace-nowrap ${tool.tagTilt} ${
                tool.accent
                  ? "bg-[#ffff7b] text-[#191919] font-bold shadow-[0_4px_12px_rgba(255,255,123,0.3)]"
                  : "bg-[#191919] text-white font-medium shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
              } ${hovered ? "opacity-100 scale-105 shadow-xl" : "opacity-95 scale-100"}`}
            >
              {tool.label}
            </span>
            <CursorArrow className="flex-shrink-0 -scale-x-100 drop-shadow-sm transition-transform duration-300" />
          </>
        )}

        <div
          className={`w-14 h-14 md:w-16 md:h-16 bg-[#FBFBFA] rounded-[22px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] flex items-center justify-center border border-black/[0.04] transition-all duration-300 overflow-hidden ${
            hovered ? "shadow-[0_18px_40px_rgba(0,0,0,0.14)] border-black/10 -translate-y-1" : ""
          }`}
        >
          <ToolIconRenderer type={tool.icon} />
        </div>

        {tool.posLabel === "right" && (
          <>
            <CursorArrow className="flex-shrink-0 drop-shadow-sm transition-transform duration-300" />
            <span
              className={`font-mono text-[11px] md:text-xs tracking-wide px-3.5 py-1.5 rounded-full shadow-md transition-all duration-300 whitespace-nowrap ${tool.tagTilt} ${
                tool.accent
                  ? "bg-[#ffff7b] text-[#191919] font-bold shadow-[0_4px_12px_rgba(255,255,123,0.3)]"
                  : "bg-[#191919] text-white font-medium shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
              } ${hovered ? "opacity-100 scale-105 shadow-xl" : "opacity-95 scale-100"}`}
            >
              {tool.label}
            </span>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Mobile Stacked Grid for Phone Viewports (Sleek & Visually Appealing) ──────────────── */
function ToolGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-10">
      {TOOLS.map((tool) => (
        <div
          key={tool.id}
          className="flex items-center gap-3.5 bg-[#FBFBFA] rounded-2xl p-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-black/[0.06] transition-all duration-300"
        >
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center flex-shrink-0 border border-black/5 overflow-hidden p-1">
            <ToolIconRenderer type={tool.icon} />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <p className="font-sans text-xs sm:text-sm font-bold text-[#191919] tracking-tight leading-snug truncate">
              {tool.name}
            </p>
            <div className="mt-1">
              <span
                className={`inline-block font-sans text-[10px] font-semibold tracking-wide px-2.5 py-0.5 rounded-full ${
                  tool.accent
                    ? "bg-[#ffff7b] text-[#191919] font-bold shadow-xs"
                    : "bg-black/[0.06] text-[#444444] font-medium"
                }`}
              >
                {tool.label}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main Section with Mouse Magnetic & Scroll Explosion Listener ──────── */
export default function FloatingToolsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalDist = windowHeight + rect.height;
      const currentPos = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentPos / totalDist));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const relY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x: relX, y: relY });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full overflow-hidden"
      style={{ background: "var(--nico-cream, #f5f4ef)" }}
    >
      <style jsx global>{`
        @keyframes floatingTool {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-9px) rotate(0.8deg);
          }
        }
      `}</style>

      {/* ── Desktop Layout ───────────────────────────────── */}
      <div
        className="hidden md:block relative w-full"
        style={{ minHeight: "85vh" }}
      >
        {TOOLS.map((tool) => (
          <ToolCard
            key={tool.id}
            tool={tool}
            scrollProgress={scrollProgress}
            mousePos={mousePos}
          />
        ))}

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-8 z-10">
          <div className="text-center max-w-2xl">
            <p className="font-mono text-[10px] md:text-xs tracking-[0.35em] uppercase text-[#666] mb-6 font-semibold">
              SOFTWARE ARSENAL
            </p>
            <h2
              className="font-playfair text-5xl md:text-6xl lg:text-7xl leading-tight text-[#191919]"
              style={{ fontWeight: 700 }}
            >
              The best tools for{" "}
              <em className="font-playfair italic font-normal text-[#191919]">
                cinematic
              </em>{" "}
              3D production.
            </h2>
            <p
              className="mt-6 font-mono text-xs md:text-sm text-[#5c5c5c] tracking-wide leading-relaxed"
              style={{ maxWidth: 460, margin: "1.5rem auto 0" }}
            >
              Industry-standard tools from concept to final render — every project crafted with the right software for the job.
            </p>
          </div>
        </div>
      </div>

      {/* ── Mobile Layout ────────────────────────────────── */}
      <div className="md:hidden px-6 py-16">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#666] mb-4 text-center font-semibold">
          SOFTWARE ARSENAL
        </p>
        <h2
          className="font-playfair text-4xl leading-tight text-[#191919] mb-8 text-center"
          style={{ fontWeight: 700 }}
        >
          The best tools for{" "}
          <em className="font-playfair italic font-normal">
            cinematic
          </em>{" "}
          3D production.
        </h2>
        <ToolGrid />
        <p className="font-mono text-xs text-[#5c5c5c] tracking-wide text-center">
          Industry-standard tools from concept to final render.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#191919]/10" />
    </section>
  );
}
