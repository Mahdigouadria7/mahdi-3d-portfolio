# Nico Studio Design System Guide

> Reference: `https://fromnicostudio.fr/`
> Design Specification & Component System for 3D/CGI & Editorial Portfolios.

---

## 🎨 1. Color Palette & Contrast System

| Token | Hex / Value | Usage & Application |
|---|---|---|
| `--nico-cream` | `#fffef3` | Primary warm editorial background for light sections (About, Process, FAQ, Testimonials) |
| `--nico-dark` | `#191919` | High-contrast dark background for Hero, Services, Contact, and Project Cards |
| `--nico-yellow` | `#ffff7b` | Signature electric accent color for ticker bars, badge buttons, and CTA banner |
| `--nico-muted` | `#2b2b2b` / `rgba(25,25,25,0.7)` | High-contrast body text for readable copy on light backgrounds |
| `--nico-border` | `rgba(25,25,25,0.12)` / `rgba(255,255,255,0.12)` | Subtle section separator lines and divider borders |

### Rhythm & Section Contrast Flow
To maintain visual momentum and eliminate monotony, sections alternate between light and dark surfaces:
1. **Hero**: Dark `#0a0514` + 3D Canvas
2. **Ticker Bar**: Electric Yellow `#ffff7b`
3. **About Section**: Cream `#fffef3`
4. **Tools Marquee**: Cream `#fffef3`
5. **Projects Section**: Pure White `#ffffff` background with Dark `#191919` cards
6. **Services & Skills**: Dark `#191919` background with neon accent tags
7. **Process Section**: Cream `#fffef3`
8. **Floating Tools Section**: Cream `#fffef3`
9. **Testimonials Section**: Cream `#fffef3` with pure white cards
10. **CTA Banner**: Full-width Electric Yellow `#ffff7b`
11. **FAQ Section**: Cream `#fffef3`
12. **Contact Section**: Dark `#191919` with yellow submit action

---

## 🖋️ 2. Typography Rules

### Font Families
- **Display Headlines**: `Playfair Display` (`font-playfair`, serif)
  - Weights: `700` (Bold), `800` (Extra Bold)
  - Style: Mixed regular with `italic` (weight `400`) for key emphasized words (e.g. *Projects*, *Skills*, *Touch*, *together*).
- **Body & Tech Metadata**: `Space Grotesk` (`font-tech`) or `Geist Mono` (`font-mono`)
  - Tracking: `tracking-[0.25em]` to `tracking-[0.3em]` for uppercase section badges and metadata labels.

---

## 🧱 3. Component Specifications

### A. Horizontal Projects Track (`ProjectsSection.tsx`)
- **Container**: `bg-white`
- **Masking**: `maskImage: linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)`
  - *Critical Rule*: `transparent` at edges hides cards offscreen, `black` preserves full visibility in center.
- **Card Size**: `clamp(260px, 28vw, 340px)` portrait orientation.
- **Scroll Behavior**: Smooth wheel delta to horizontal scroll conversion using lerp.

### B. Numbered Services List (`GamesSection.tsx`)
- **Surface**: Dark `#191919`
- **Rows**: Divide-y borders `rgba(255,255,255,0.1)`
- **Hover Action**: Title transitions to `italic`, arrow icon scales `translate-x-1`.

### C. Sticky Process Steps (`ProcessSection.tsx`)
- **Layout**: 2-column grid (`[340px_1fr]`)
- **Left Column**: `sticky top-24` headline & CTA
- **Right Column**: Numbered steps (`01.`, `02.`, etc.) with description and green `✓` objective statement.

### D. Spinning CTA Badge (`CTABannerSection.tsx`)
- **Background**: Full `#ffff7b`
- **Badge**: SVG `<textPath>` wrapping `"MAHDI GOUADRIA • 3D DESIGNER • CGI ARTIST • "` continuously rotating with CSS `.animate-spin-slow` (`20s linear infinite`).

### E. FAQ Accordion (`FAQSection.tsx`)
- **Toggle**: Expanding item flips `+` icon 45 deg into `×` with dark fill.
- **Title State**: Question text turns `italic` when active or hovered.

---

## 🚀 4. How to Reuse in Future Projects

1. Ensure `Playfair Display` is imported in `layout.tsx` with `variable: "--font-playfair"`.
2. Include the CSS variables (`--nico-cream`, `--nico-yellow`, `--nico-dark`) in `globals.css`.
3. Include helper utilities: `.animate-spin-slow`, `.animate-marquee`, `.hide-scrollbar`, `.animate-fadeIn`.
4. Import components from `@/components/sections/` in `page.tsx`.
