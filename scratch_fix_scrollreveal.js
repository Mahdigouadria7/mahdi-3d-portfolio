const fs = require('fs');

const FILE_PATH = 'src/app/projects/[slug]/page.tsx';
let c = fs.readFileSync(FILE_PATH, 'utf8');

c = c.replace(
  /<ScrollReveal( direction="[^"]+"(?: delay=\{[\d\.]+\})?) className="([^"]*(?:transition-all|transition-shadow)[^"]*)">([\s\S]*?)<\/ScrollReveal>/g,
  (match, p1, p2, p3) => {
    // p1 = direction="up" delay={0.2}
    // p2 = w-full aspect-video bg-[#0a0604] ... transition-all group
    // p3 = <LazyVideo ... />
    
    // We want ScrollReveal to keep relative and width properties, but pass the styling to the inner div.
    let outerClasses = "relative h-full";
    if (p2.includes("w-full")) outerClasses += " w-full";
    if (p2.includes("md:w-1/3")) outerClasses += " md:w-1/3";
    if (p2.includes("md:w-[60%]")) outerClasses += " md:w-[60%]";
    if (p2.includes("md:w-[45%]")) outerClasses += " md:w-[45%]";
    if (p2.includes("md:w-[50%]")) outerClasses += " md:w-[50%]";
    if (p2.includes("md:w-[40%]")) outerClasses += " md:w-[40%]";
    if (p2.includes("md:mt-16")) outerClasses += " md:mt-16";
    if (p2.includes("md:mt-8")) outerClasses += " md:mt-8";
    if (p2.includes("md:-ml-8")) outerClasses += " md:-ml-8";
    if (p2.includes("z-10")) outerClasses += " z-10";
    if (p2.includes("z-20")) outerClasses += " z-20";
    if (p2.includes("z-30")) outerClasses += " z-30";
    
    return `<ScrollReveal${p1} className="${outerClasses.trim()}">\n<div className="${p2}">\n${p3.trim()}\n</div>\n</ScrollReveal>`;
  }
);

fs.writeFileSync(FILE_PATH, c);
console.log('Fixed ScrollReveal in page.tsx');
