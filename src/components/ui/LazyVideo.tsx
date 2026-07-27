"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
  allowControls?: boolean;
}

/**
 * LazyVideo: High-performance video player with rock-solid desktop & mobile playback,
 * interactive sound controls (mute/unmute), and play/pause toggle.
 */
export default function LazyVideo({ src, className = "", allowControls = true }: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const v = videoRef.current;
    v.muted = true;

    const playVideo = () => {
      v.play().catch(() => {
        // Retry playing on user interaction or scroll
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !userPaused) {
            playVideo();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(v);

    // Initial attempt to play once mounted
    playVideo();

    return () => observer.disconnect();
  }, [src, userPaused]);

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setUserPaused(false);
      } else {
        videoRef.current.pause();
        setUserPaused(true);
      }
    }
  };

  return (
    <div className="relative w-full h-full group/video overflow-hidden bg-[#121214]">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onClick={togglePlay}
        className={`${className} cursor-pointer w-full h-full object-cover`}
      />

      {/* Floating Interactive Audio Toggle Button */}
      {allowControls && (
        <div className="absolute bottom-4 right-4 z-30 pointer-events-auto">
          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider transition-all duration-300 backdrop-blur-md border border-white/20 shadow-xl ${
              isMuted
                ? "bg-black/70 text-white/80 hover:bg-black/90 hover:text-white hover:border-[#ffff7b]"
                : "bg-[#ffff7b] text-[#191919] border-[#ffff7b] shadow-[0_0_15px_rgba(255,255,123,0.5)]"
            }`}
          >
            {isMuted ? (
              <>
                {/* Muted Speaker Icon */}
                <svg className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
                <span>UNMUTE SOUND</span>
              </>
            ) : (
              <>
                {/* Active Playing Sound Waves Icon */}
                <svg className="w-4 h-4 text-[#191919] animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                <span>SOUND ON</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Floating Play Overlay Status when User Explicitly Pauses */}
      {userPaused && (
        <div
          onClick={togglePlay}
          className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center cursor-pointer z-20"
        >
          <div className="w-14 h-14 rounded-full bg-[#ffff7b] text-[#191919] flex items-center justify-center shadow-2xl scale-110">
            <svg className="w-6 h-6 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
