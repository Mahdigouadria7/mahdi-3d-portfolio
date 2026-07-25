"use client";

import { useState, useEffect, useRef } from "react";

/* ── Cursor SVG (exact style from reference video) ─────────── */
function CursorArrow({ className = "" }: { className?: string }) {
  return (
    <svg
      width="18"
      height="18"
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

/* ── Custom Software Vector Icons ────────────────────────── */
function BlenderIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 208" fill="none">
      <path fill="#EA7600" d="M110 50.8L165.7 0l18.4 20.3-51 46.5L110 50.8z" />
      <path fill="#EA7600" d="M149.3 75.3l106.7-36.2 6.5 26.6-96.6 32.8-16.6-23.2z" />
      <path fill="#EA7600" d="M128 64c44.2 0 80 35.8 80 80s-35.8 80-80 80-80-35.8-80-80 35.8-80 80-80z" />
      <circle fill="#224775" cx="128" cy="144" r="44" />
      <circle fill="#FFF" cx="128" cy="144" r="20" />
    </svg>
  );
}

function PhotoshopIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} bg-[#001E36] border border-[#31A8FF]/40 rounded-xl flex items-center justify-center font-sans font-bold text-[#31A8FF] text-base leading-none select-none shadow-sm`}>
      Ps
    </div>
  );
}

function AfterEffectsIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <div className={`${className} bg-[#00005B] border border-[#9999FF]/40 rounded-xl flex items-center justify-center font-sans font-bold text-[#9999FF] text-base leading-none select-none shadow-sm`}>
      Ae
    </div>
  );
}

function ThreeJsIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#191919" strokeWidth="1.8" strokeLinejoin="round">
      <path d="M12 2L2 19h20L12 2z" />
      <path d="M12 2v17" />
      <path d="M7 11.5h10" />
    </svg>
  );
}

function HoudiniIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#FF5500" />
      <path d="M8 8v8M16 8v8M8 12h8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ZBrushIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#1e1e1e" />
      <path d="M6 7h12L7 17h11" stroke="#E63946" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ToolIconRenderer({ type }: { type: string }) {
  switch (type) {
    case "blender":
      return <BlenderIcon />;
    case "photoshop":
      return <PhotoshopIcon />;
    case "aftereffects":
      return <AfterEffectsIcon />;
    case "threejs":
      return <ThreeJsIcon />;
    case "houdini":
      return <HoudiniIcon />;
    case "zbrush":
      return <ZBrushIcon />;
    default:
      return null;
  }
}

/* ── Tool data with explosion vectors ─────────────────────────── */
const TOOLS = [
  {
    id: "blender",
    name: "Blender 3D",
    label: "3D Modeling",
    accent: false,
    posStyle: { top: "8%", left: "5%" },
    posLabel: "right",
    startX: 380,
    startY: 200,
    floatDelay: "0s",
    icon: "blender",
  },
  {
    id: "photoshop",
    name: "Photoshop",
    label: "Graphic Design",
    accent: true,
    posStyle: { top: "4%", left: "37%" },
    posLabel: "right",
    startX: 0,
    startY: 260,
    floatDelay: "0.8s",
    icon: "photoshop",
  },
  {
    id: "aftereffects",
    name: "After Effects",
    label: "Motion Design",
    accent: false,
    posStyle: { top: "10%", right: "5%" },
    posLabel: "left",
    startX: -380,
    startY: 200,
    floatDelay: "1.4s",
    icon: "aftereffects",
  },
  {
    id: "threejs",
    name: "Three.js",
    label: "Web Development",
    accent: false,
    posStyle: { bottom: "20%", left: "5%" },
    posLabel: "right",
    startX: 380,
    startY: -200,
    floatDelay: "2.1s",
    icon: "threejs",
  },
  {
    id: "zbrush",
    name: "ZBrush",
    label: "Digital Sculpting",
    accent: false,
    posStyle: { bottom: "4%", left: "37%" },
    posLabel: "right",
    startX: 0,
    startY: -260,
    floatDelay: "0.5s",
    icon: "zbrush",
  },
  {
    id: "houdini",
    name: "Houdini",
    label: "VFX & Simulation",
    accent: true,
    posStyle: { bottom: "16%", right: "6%" },
    posLabel: "left",
    startX: -380,
    startY: -200,
    floatDelay: "1.2s",
    icon: "houdini",
  },
];

/* ── Single Floating Tool Card with Smooth Scroll Explosion & Idle Float ─── */
function ToolCard({
  tool,
  scrollProgress,
}: {
  tool: (typeof TOOLS)[number];
  scrollProgress: number;
}) {
  const [hovered, setHovered] = useState(false);

  // Smooth Scroll Entrance Progress over a wider track: 0 (top of section) -> 1 (centered)
  const rawProgress = (scrollProgress - 0.02) / 0.50;
  const clampedProgress = Math.max(0, Math.min(1, rawProgress));

  // Ultra-smooth quintic ease-out for organic explosion: 1 - (1 - x)^4
  const easeProgress = 1 - Math.pow(1 - clampedProgress, 4);

  // Offset goes from center (startX, startY) -> 0 (outer resting position)
  const offsetX = tool.startX * (1 - easeProgress);
  const offsetY = tool.startY * (1 - easeProgress);

  // Scale smoothly expands from 0.35 -> 1.0
  const scale = 0.35 + easeProgress * 0.65;

  // Opacity smoothly fades in from 0 -> 1
  const opacity = easeProgress;

  return (
    <div
      className="absolute z-20 pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
      style={{
        ...tool.posStyle,
        transform: `translate3d(${offsetX}px, ${offsetY}px, 0px) scale(${hovered ? scale * 1.1 : scale})`,
        opacity: opacity,
      }}
    >
      {/* Inner float wrapper for continuous sine-wave idle movement */}
      <div
        className={`flex items-center gap-2.5 transition-all duration-300 ${
          hovered ? "-translate-y-1" : ""
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          animation: `floatingTool 5.5s ease-in-out infinite`,
          animationDelay: tool.floatDelay,
        }}
      >
        {/* Label on the left side */}
        {tool.posLabel === "left" && (
          <>
            <span
              className={`font-mono text-[11px] md:text-xs tracking-wide px-3.5 py-1.5 rounded-full shadow-md transition-all duration-300 whitespace-nowrap ${
                tool.accent
                  ? "bg-[#ffff7b] text-[#191919] font-bold"
                  : "bg-[#191919] text-white font-medium"
              } ${hovered ? "opacity-100 scale-105 shadow-xl" : "opacity-95 scale-100"}`}
            >
              {tool.label}
            </span>
            <CursorArrow className="flex-shrink-0 -scale-x-100 drop-shadow-sm" />
          </>
        )}

        {/* Icon card */}
        <div
          className={`w-13 h-13 md:w-16 md:h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center border border-black/5 transition-all duration-300 ${
            hovered ? "shadow-2xl border-black/20" : "shadow-md"
          }`}
        >
          <ToolIconRenderer type={tool.icon} />
        </div>

        {/* Label on the right side */}
        {tool.posLabel === "right" && (
          <>
            <CursorArrow className="flex-shrink-0 drop-shadow-sm" />
            <span
              className={`font-mono text-[11px] md:text-xs tracking-wide px-3.5 py-1.5 rounded-full shadow-md transition-all duration-300 whitespace-nowrap ${
                tool.accent
                  ? "bg-[#ffff7b] text-[#191919] font-bold"
                  : "bg-[#191919] text-white font-medium"
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

/* ── Mobile stacked grid for responsive phones ───────────────────────── */
function ToolGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 mb-10">
      {TOOLS.map((tool) => (
        <div
          key={tool.id}
          className="flex items-center gap-2.5 bg-white/80 rounded-xl p-3 shadow-sm border border-black/5"
        >
          <div className="w-10 h-10 bg-white rounded-xl shadow flex items-center justify-center flex-shrink-0 border border-black/5">
            <ToolIconRenderer type={tool.icon} />
          </div>
          <div className="overflow-hidden">
            <p className="font-mono text-[11px] font-bold text-[#191919] tracking-wide truncate">
              {tool.name}
            </p>
            <span
              className={`inline-block font-mono text-[9px] tracking-wide px-2 py-0.5 rounded-full mt-0.5 ${
                tool.accent
                  ? "bg-[#ffff7b] text-[#191919] font-bold"
                  : "bg-[#191919] text-white font-medium"
              }`}
            >
              {tool.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main Section with Smooth Scroll Explosion Listener ───────────────── */
export default function FloatingToolsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate 0 to 1 progress as section travels into viewport
      const totalDist = windowHeight + rect.height;
      const currentPos = windowHeight - rect.top;
      const progress = Math.max(0, Math.min(1, currentPos / totalDist));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: "var(--nico-cream, #f5f4ef)" }}
    >
      {/* Keyframes for continuous subtle idle float */}
      <style jsx global>{`
        @keyframes floatingTool {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(0.8deg);
          }
        }
      `}</style>

      {/* ── Desktop Layout ───────────────────────────────── */}
      <div
        className="hidden md:block relative w-full"
        style={{ minHeight: "85vh" }}
      >
        {/* Floating tools that start hidden at center and expand outwards on scroll */}
        {TOOLS.map((tool) => (
          <ToolCard key={tool.id} tool={tool} scrollProgress={scrollProgress} />
        ))}

        {/* Central headline */}
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
              <em
                className="font-playfair italic font-normal text-[#191919]"
              >
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

      {/* Bottom separator line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#191919]/10" />
    </section>
  );
}
