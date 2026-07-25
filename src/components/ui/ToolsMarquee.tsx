"use client";

const TOOLS = [
  { name: "3DS MAX", icon: "⬡" },
  { name: "REDSHIFT", icon: "◈" },
  { name: "BLENDER", icon: "◉" },
  { name: "CINEMA 4D", icon: "◐" },
  { name: "HOUDINI", icon: "⬟" },
  { name: "ZBRUSH", icon: "◆" },
  { name: "UNREAL ENGINE", icon: "⬢" },
  { name: "AFTER EFFECTS", icon: "◇" },
  { name: "PREMIERE PRO", icon: "◈" },
  { name: "SUBSTANCE 3D", icon: "⬡" },
  { name: "MARVELOUS DESIGNER", icon: "◉" },
  { name: "CHAOS VANTAGE", icon: "◐" },
];

// Duplicate so the loop is seamless
const ITEMS = [...TOOLS, ...TOOLS];

export default function ToolsMarquee() {
  return (
    <section className="relative w-full py-5 md:py-6 overflow-hidden pointer-events-none select-none" style={{ background: 'var(--nico-cream)' }}>
      {/* Top separator line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-[#191919]/10" />
      {/* Bottom separator line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#191919]/10" />

      {/* Edge fades — exactly like Nico Studio's masked marquee */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          maskImage: "linear-gradient(to right, #fffef3 0%, transparent 10%, transparent 90%, #fffef3 100%)",
          WebkitMaskImage: "linear-gradient(to right, #fffef3 0%, transparent 10%, transparent 90%, #fffef3 100%)",
          background: "transparent",
        }}
      />

      {/* The scrolling track */}
      <div className="marquee-track flex overflow-hidden">
        <div className="animate-marquee flex flex-row items-center gap-0 whitespace-nowrap">
          {ITEMS.map((tool, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2.5 px-6 md:px-8 text-[10px] md:text-xs font-mono tracking-[0.25em] uppercase text-[#191919]/30 hover:text-[#191919]/70 transition-colors duration-300"
            >
              <span className="text-fuchsia-500/40 text-[8px]">{tool.icon}</span>
              {tool.name}
              <span className="text-white/10 ml-2">·</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
