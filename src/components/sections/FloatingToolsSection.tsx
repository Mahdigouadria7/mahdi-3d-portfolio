"use client";

import { useState } from "react";

/* ── Cursor SVG (exact style from Nico Studio) ─────────── */
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

/* ── Tool data — icons to be replaced by user later ─────── */
const TOOLS = [
  {
    id: "3dsmax",
    name: "3DS Max",
    label: "3D Modeling",
    accent: false,
    // desktop: positioned like Nico Studio scattered layout
    pos: "top-[5%] left-[4%]",
    posLabel: "right",
  },
  {
    id: "redshift",
    name: "Redshift",
    label: "GPU Rendering",
    accent: true,
    pos: "top-[2%] left-[37%]",
    posLabel: "right",
  },
  {
    id: "cinema4d",
    name: "Cinema 4D",
    label: "Motion Design",
    accent: false,
    pos: "top-[8%] right-[5%]",
    posLabel: "left",
  },
  {
    id: "blender",
    name: "Blender",
    label: "Open Source 3D",
    accent: false,
    pos: "bottom-[22%] left-[5%]",
    posLabel: "right",
  },
  {
    id: "houdini",
    name: "Houdini",
    label: "VFX & Simulation",
    accent: true,
    pos: "bottom-[18%] right-[8%]",
    posLabel: "left",
  },
  {
    id: "zbrush",
    name: "ZBrush",
    label: "Digital Sculpting",
    accent: false,
    pos: "bottom-[5%] left-[38%]",
    posLabel: "right",
  },
];

/* ── Single Floating Tool card ─────────────────────────── */
function ToolCard({
  tool,
}: {
  tool: (typeof TOOLS)[number];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`absolute ${tool.pos} flex items-center gap-2 transition-all duration-300 ${
        hovered ? "scale-105 -translate-y-1" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Label on the left side */}
      {tool.posLabel === "left" && (
        <>
          <span
            className={`font-mono text-[11px] md:text-xs tracking-wide px-3 py-1.5 rounded-full shadow-md transition-all duration-300 whitespace-nowrap ${
              tool.accent
                ? "bg-[#ffff7b] text-[#191919]"
                : "bg-[#191919] text-white"
            } ${hovered ? "opacity-100 scale-100" : "opacity-90 scale-95"}`}
          >
            {tool.label}
          </span>
          <CursorArrow className="flex-shrink-0 -scale-x-100" />
        </>
      )}

      {/* Icon card */}
      <div
        className={`w-12 h-12 md:w-16 md:h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center transition-all duration-300 ${
          hovered ? "shadow-2xl" : "shadow-md"
        }`}
      >
        {/* Placeholder — user will replace with actual icons */}
        <span className="font-playfair font-black text-lg md:text-xl text-[#191919] italic select-none">
          {tool.name.charAt(0)}
        </span>
      </div>

      {/* Label on the right side */}
      {tool.posLabel === "right" && (
        <>
          <CursorArrow className="flex-shrink-0" />
          <span
            className={`font-mono text-[11px] md:text-xs tracking-wide px-3 py-1.5 rounded-full shadow-md transition-all duration-300 whitespace-nowrap ${
              tool.accent
                ? "bg-[#ffff7b] text-[#191919]"
                : "bg-[#191919] text-white"
            } ${hovered ? "opacity-100 scale-100" : "opacity-90 scale-95"}`}
          >
            {tool.label}
          </span>
        </>
      )}
    </div>
  );
}

/* ── Mobile stacked grid (phones can't do absolute layout) */
function ToolGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 mb-10">
      {TOOLS.map((tool) => (
        <div
          key={tool.id}
          className="flex items-center gap-2 bg-white/70 rounded-xl p-3 shadow-sm"
        >
          <div className="w-9 h-9 bg-white rounded-xl shadow flex items-center justify-center flex-shrink-0">
            <span className="font-playfair font-black text-base text-[#191919] italic">
              {tool.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-mono text-[10px] font-bold text-[#191919] tracking-wide">
              {tool.name}
            </p>
            <span
              className={`inline-block font-mono text-[9px] tracking-wide px-2 py-0.5 rounded-full mt-0.5 ${
                tool.accent
                  ? "bg-[#ffff7b] text-[#191919]"
                  : "bg-[#191919] text-white"
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

/* ── Main Section ───────────────────────────────────────── */
export default function FloatingToolsSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "var(--nico-cream)" }}
    >
      {/* ── Desktop Layout ───────────────────────────────── */}
      <div
        className="hidden md:block relative w-full"
        style={{ minHeight: "80vh" }}
      >
        {/* Absolute floating tools */}
        {TOOLS.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}

        {/* Central headline — absolutely centered */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none px-8">
          <div className="text-center max-w-2xl">
            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#5c5c5c] mb-6">
              Software Arsenal
            </p>
            <h2
              className="font-playfair text-5xl md:text-6xl lg:text-7xl leading-tight text-[#191919]"
              style={{ fontWeight: 700 }}
            >
              The best tools for{" "}
              <em
                className="font-playfair italic"
                style={{ fontWeight: 400 }}
              >
                cinematic
              </em>{" "}
              3D production.
            </h2>
            <p
              className="mt-6 font-mono text-xs md:text-sm text-[#5c5c5c] tracking-wide"
              style={{ maxWidth: 420, margin: "1.5rem auto 0" }}
            >
              Industry-standard tools from concept to final render — every project crafted with the right software for the job.
            </p>
          </div>
        </div>
      </div>

      {/* ── Mobile Layout ────────────────────────────────── */}
      <div className="md:hidden px-6 py-16">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#5c5c5c] mb-4 text-center">
          Software Arsenal
        </p>
        <h2
          className="font-playfair text-4xl leading-tight text-[#191919] mb-8 text-center"
          style={{ fontWeight: 700 }}
        >
          The best tools for{" "}
          <em className="font-playfair italic" style={{ fontWeight: 400 }}>
            cinematic
          </em>{" "}
          3D production.
        </h2>
        <ToolGrid />
        <p className="font-mono text-xs text-[#5c5c5c] tracking-wide text-center">
          Industry-standard tools from concept to final render.
        </p>
      </div>

      {/* Bottom separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#191919]/10" />
    </section>
  );
}
