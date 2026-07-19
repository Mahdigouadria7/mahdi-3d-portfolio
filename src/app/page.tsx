"use client";

import { useRef, useEffect } from "react";
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

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force video to load its metadata so we know the duration
    video.load();
    video.pause();

    let scrollTrigger: ScrollTrigger | null = null;

    const initScrollTrigger = () => {
      // Don't setup until we have video duration
      if (isNaN(video.duration) || video.duration === 0) return;

      scrollTrigger = ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
        onUpdate: (self) => {
          if (video && !isNaN(video.duration)) {
            // Scrub the video time based on scroll progress
            video.currentTime = self.progress * video.duration;
          }
        },
      });
    };

    if (video.readyState >= 1) {
      initScrollTrigger();
    } else {
      video.addEventListener('loadedmetadata', initScrollTrigger);
    }

    return () => {
      if (scrollTrigger) scrollTrigger.kill();
      video.removeEventListener('loadedmetadata', initScrollTrigger);
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
        <video 
          ref={videoRef}
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover opacity-80 z-0"
          style={{ mixBlendMode: 'screen' }}
        >
          <source src="/models/Man_with_glowing_eyes_202607151730.mp4" type="video/mp4" />
        </video>
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
