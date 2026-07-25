const fs = require('fs');

const FILE_PATH = 'src/app/projects/[slug]/page.tsx';
let c = fs.readFileSync(FILE_PATH, 'utf8');

c = c.replace(
  /<ScrollReveal([^>]+)>\s*<div className="([^"]+)">/g,
  (match, p1, p2) => {
    // p1 = ScrollReveal attributes
    // p2 = inner div classes
    
    // We want to remove positioning/sizing classes from the inner div,
    // because they are now on the ScrollReveal wrapper.
    
    let innerClasses = p2
      .replace(/md:w-\[[^\]]+\]/g, '')
      .replace(/md:w-1\/3/g, '')
      .replace(/sm:w-\[[^\]]+\]/g, '') // remove sm:w-[320px] etc.
      .replace(/md:mt-\d+/g, '')
      .replace(/md:-mt-\d+/g, '')
      .replace(/md:-ml-\d+/g, '')
      .replace(/z-10/g, '')
      .replace(/z-20/g, '')
      .replace(/z-30/g, '')
      .replace(/order-1/g, '')
      .replace(/order-2/g, '')
      .replace(/md:order-1/g, '')
      .replace(/md:order-2/g, '')
      .replace(/\s+/g, ' ')
      .trim();
      
    // Ensure inner div has w-full h-full if it's the main container
    if (!innerClasses.includes("w-full")) {
        innerClasses = "w-full " + innerClasses;
    }
    
    return `<ScrollReveal${p1}>\n<div className="${innerClasses}">`;
  }
);

fs.writeFileSync(FILE_PATH, c);
console.log('Fixed inner div classes in page.tsx');
