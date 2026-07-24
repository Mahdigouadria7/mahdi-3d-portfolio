"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
}

/**
 * LazyVideo: Only starts loading/playing when the element enters the viewport.
 * On mobile this prevents all 5 videos from competing for network bandwidth on page load.
 */
export default function LazyVideo({ src, className = "" }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect(); // Only trigger once
          }
        });
      },
      {
        rootMargin: "300px", // Pre-load well before viewport on mobile
        threshold: 0,        // Trigger the moment ANY pixel enters
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isInView && videoRef.current) {
      videoRef.current.src = src;
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Autoplay blocked by browser policy — silently fail
      });
    }
  }, [isInView, src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      preload="none"
      className={className}
    />
  );
}
