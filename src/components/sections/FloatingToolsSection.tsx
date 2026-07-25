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

/* ── Tool data — custom scroll parallax vectors & floating delays ─────── */
const TOOLS = [
  {
    id: "3dsmax",
    name: "3DS Max",
    label: "3D Modeling",
    accent: false,
    pos: "top-[8%] left-[4%]",
    posLabel: "right",
    parallaxY: -80, // moves UP as scroll down
    parallaxX: -40, // moves LEFT
    floatDelay: "0s",
  },
  {
    id: "redshift",
    name: "Redshift",
    label: "GPU Rendering",
    accent: true,
    pos: "top-[4%] left-[36%]",
    posLabel: "right",
    parallaxY: 60,  // moves DOWN as scroll down
    parallaxX: 30,
    floatDelay: "0.8s",
  },
  {
    id: "cinema4d",
    name: "Cinema 4D",
    label: "Motion Design",
    accent: false,
    pos: "top-[10%] right-[5%]",
    posLabel: "left",
    parallaxY: -90,
    parallaxX: 50,
    floatDelay: "1.4s",
  },
  {
    id: "blender",
    name: "Blender",
    label: "Open Source 3D",
    accent: false,
    pos: "bottom-[20%] left-[5%]",
    posLabel: "right",
    parallaxY: 70,
    parallaxX: -35,
    floatDelay: "2.1s",
  },
  {
    id: "houdini",
    name: "Houdini",
    label: "VFX & Simulation",
    accent: true,
    pos: "bottom-[16%] right-[7%]",
    posLabel: "left",
    parallaxY: -65,
    parallaxX: 45,
    floatDelay: "1.2s",
  },
  {
    id: "zbrush",
    name: "ZBrush",
    label: "Digital Sculpting",
    accent: false,
    pos: "bottom-[4%] left-[38%]",
    posLabel: "right",
    parallaxY: 50,
    parallaxX: -20,
    floatDelay: "0.5s",
  },
];

/* ── Single Floating Tool card with Scroll Parallax & Idle Float ─────────── */
function ToolCard({
  tool,
  scrollProgress,
}: {
  tool: (typeof TOOLS)[number];
  scrollProgress: number;
}) {
  const [hovered, setHovered] = useState(false);

  // Parallax offset based on scroll progress (centered around 0.5)
  const factor = (scrollProgress - 0.5) * 2; // -1 to +1
  const offsetY = factor * tool.parallaxY;
  const offsetX = factor * tool.parallaxX;

  return (
    <div
      className={`absolute ${tool.pos} z-20 transition-transform duration-500 ease-out`}
      style={{
        transform: `translate3d(${offsetX}px, ${offsetY}px, 0px)`,
      }}
    >
      {/* Inner float wrapper for continuous sine-wave idle movement */}
      <div
        className={`flex items-center gap-2 transition-all duration-300 ${
          hovered ? "scale-110 -translate-y-1" : "scale-100"
        }`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          animation: `floatingTool 5s ease-in-out infinite`,
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
            hovered ? "shadow-2xl border-black/15" : "shadow-md"
          }`}
        >
          <span className="font-playfair font-black text-xl md:text-2xl text-[#191919] italic select-none">
            {tool.name.charAt(0)}
          </span>
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
            <span className="font-playfair font-black text-lg text-[#191919] italic">
              {tool.name.charAt(0)}
            </span>
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

/* ── Main Section with Scroll Listener ─────────────────────────────────── */
export default function FloatingToolsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0.5);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate 0 to 1 progress as section scrolls through window
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
      {/* Custom Keyframe for idle float */}
      <style jsx global>{`
        @keyframes floatingTool {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(1deg);
          }
        }
      `}</style>

      {/* ── Desktop Layout ───────────────────────────────── */}
      <div
        className="hidden md:block relative w-full"
        style={{ minHeight: "85vh" }}
      >
        {/* Absolute floating tools with scroll parallax */}
        {TOOLS.map((tool) => (
          <ToolCard key={tool.id} tool={tool} scrollProgress={scrollProgress} />
        ))}

        {/* Central headline — centered with subtle parallax zoom */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-8">
          <div
            className="text-center max-w-2xl transition-transform duration-700 ease-out"
            style={{
              transform: `translateY(${(scrollProgress - 0.5) * -20}px)`,
            }}
          >
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
