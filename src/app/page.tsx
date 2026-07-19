"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TubesCursor from "@/components/TubesCursor";
import HomeSection from "@/components/sections/HomeSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import GamesSection from "@/components/sections/GamesSection";
import ContactSection from "@/components/sections/ContactSection";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FRAME_COUNT = 240;

const currentFrame = (index: number) =>
  `/models/Man_with_glowing_eyes_frames/frame_${index.toString().padStart(5, '0')}.webp`;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const images: HTMLImageElement[] = [];
    const imageSeq = { frame: 1 }; // Start at frame 1
    let loadedCount = 0;

    // Preload images
    let canvasSized = false;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
        
        // Size canvas from the first successfully loaded image
        if (!canvasSized && img.naturalWidth > 0) {
          canvasSized = true;
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };
      images.push(img);
    }

    const render = () => {
      // frame might be a float if we don't snap, so we round it
      const frameIndex = Math.round(imageSeq.frame) - 1; // 0-indexed array
      const img = images[frameIndex];
      if (img && img.complete && img.naturalWidth > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
      }
    };

    gsap.to(imageSeq, {
      frame: FRAME_COUNT,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: render, // render on every scroll tick
      },
    });

    // Ensure first frame renders
    if (images[0] && images[0].complete) {
      render();
    } else {
      const firstImage = new Image();
      firstImage.src = currentFrame(1);
      firstImage.onload = () => {
        if (!canvasSized) {
          canvasSized = true;
          canvas.width = firstImage.naturalWidth;
          canvas.height = firstImage.naturalHeight;
        }
        context.drawImage(firstImage, 0, 0, canvas.width, canvas.height);
      };
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <main className="relative bg-[#0a0514] text-white overflow-x-hidden min-h-screen">
      <TubesCursor />

      {/* Fixed Background Container */}
      <div 
        ref={containerRef}
        className="fixed inset-0 w-full h-full bg-[#0a0514] pointer-events-none"
      >
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
          style={{ mixBlendMode: 'screen' }}
        />
        <div ref={overlayRef} className="absolute inset-0 bg-black opacity-0 pointer-events-none z-10"></div>

        {/* Global Edge Gradients for Typography Contrast */}
        <div className="absolute inset-y-0 left-0 w-1/3 md:w-1/4 bg-gradient-to-r from-black/80 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-1/3 md:w-1/4 bg-gradient-to-l from-black/80 to-transparent z-10 pointer-events-none"></div>

        {/* Global Vertical Grid Lines */}
        <div className="absolute inset-0 grid grid-cols-4 pointer-events-none z-10">
            <div className="border-r border-dashed border-white/10 h-full w-full"></div>
            <div className="border-r border-dashed border-white/10 h-full w-full"></div>
            <div className="border-r border-dashed border-white/10 h-full w-full"></div>
            <div className="h-full w-full"></div>
        </div>
      </div>



      {/* Vertical Content Stacking */}
      <div className="flex flex-col w-full relative z-20">
        <div className="w-full relative min-h-screen">
           <HomeSection isDriving={false} onDriveStart={() => {}} />
        </div>
        <div className="w-full relative min-h-screen">
           <ProjectsSection />
        </div>
        <div className="w-full relative min-h-screen">
           <GamesSection />
        </div>
        <div className="w-full relative min-h-screen">
           <ContactSection />
        </div>
      </div>
    </main>
  );
}
