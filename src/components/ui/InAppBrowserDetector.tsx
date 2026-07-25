"use client";

import { useEffect, useState } from "react";

export default function InAppBrowserDetector() {
  const [isInApp, setIsInApp] = useState(false);
  const [redirectAttempted, setRedirectAttempted] = useState(false);

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
      const isAndroid = /android/i.test(ua);
      const hostPath = window.location.host + window.location.pathname + window.location.search;
      
      if (isAndroid) {
        // Highly effective Android Chrome forced redirect
        window.location.href = `intent://${hostPath}#Intent;scheme=https;package=com.android.chrome;end;`;
      } else {
        // iOS Safari workaround attempt (opening a new blank tab sometimes triggers the external browser)
        setTimeout(() => {
          window.location.assign(`googlechrome://${hostPath}`);
        }, 100);
      }

      setRedirectAttempted(true);

      // If the redirect fails (meaning the user is still on this page after 2 seconds),
      // we must show the warning because iOS Apple strictly blocks automatic breakouts.
      const timer = setTimeout(() => {
        setIsInApp(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isInApp && !redirectAttempted) return null;

  // If redirecting, show a sleek loading state instead of a warning initially
  if (redirectAttempted && !isInApp) {
      return (
        <div className="fixed inset-0 z-[9999] bg-[#0a0514] flex flex-col items-center justify-center p-8 text-center text-white">
          <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 border-2 border-fuchsia-500 animate-spin border-t-transparent mb-6"></div>
          <h2 className="font-mono text-sm tracking-[0.2em] text-fuchsia-400 animate-pulse">REDIRECTING TO SYSTEM BROWSER...</h2>
        </div>
      );
  }

  // If the automatic redirect was blocked by Apple (iOS), we fallback to the manual instruction.
  return (
    <div className="fixed inset-0 z-[9999] bg-[#0a0514]/95 backdrop-blur-3xl flex flex-col items-center justify-center p-8 text-center text-white">
      <div className="w-16 h-16 mb-6 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/50 flex items-center justify-center animate-pulse">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-fuchsia-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      
      <h2 className="font-siegra text-3xl md:text-5xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50 tracking-wider">
        REDIRECT BLOCKED
      </h2>
      
      <p className="font-mono text-xs md:text-sm text-white/70 mb-8 max-w-md leading-relaxed">
        Your social media app blocked the automatic redirect.
        <br /><br />
        Please tap the <strong className="text-fuchsia-400">three dots (...)</strong> in the top corner and select <strong className="text-white">Open in Browser</strong> to view the 3D portfolio.
      </p>

      <div className="flex gap-2 items-center text-[10px] uppercase font-mono tracking-widest text-fuchsia-500/50">
        <span className="w-1.5 h-1.5 rounded-full bg-fuchsia-500 animate-pulse"></span>
        Waiting for system browser
      </div>
    </div>
  );
}
