"use client";

import { useEffect, useState } from "react";

export default function InAppBrowserDetector() {
  const [isInApp, setIsInApp] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    
    // Check for common in-app browsers
    const rules = [
      'FBAV', // Facebook
      'Instagram',
      'Snapchat',
      'Line',
      'LinkedIn',
      'Twitter',
      'MicroMessenger', // WeChat
      'TikTok',
    ];

    const isMatch = rules.some((rule) => ua.includes(rule));

    if (isMatch) {
      setIsInApp(true);
    }
  }, []);

  if (!isInApp) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0514]/95 backdrop-blur-3xl flex flex-col items-center justify-center p-8 text-center text-white">
      <div className="w-16 h-16 mb-6 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/50 flex items-center justify-center animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-fuchsia-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <h2 className="font-siegra text-3xl md:text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 tracking-wider">
        RESTRICTED BROWSER
      </h2>
      
      <p className="font-mono text-xs md:text-sm text-white/70 mb-8 max-w-md leading-relaxed">
        This high-performance 3D portfolio cannot run inside social media apps. 
        <br /><br />
        Please tap the <strong className="text-fuchsia-400">three dots (...)</strong> in the top corner of your screen and select <strong className="text-white">Open in Browser</strong> (Safari or Chrome) to initiate the experience.
      </p>

      <div className="flex gap-2 items-center text-[10px] uppercase font-mono tracking-widest text-fuchsia-500/50">
        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse"></span>
        Waiting for system browser
      </div>
    </div>
  );
}
