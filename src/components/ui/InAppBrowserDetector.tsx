"use client";

import { useEffect, useState } from "react";

export default function InAppBrowserDetector() {
  const [isRedirecting, setIsRedirecting] = useState(false);

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
      const isIOS = /ipad|iphone|ipod/i.test(ua);
      const hostPath = window.location.host + window.location.pathname + window.location.search;
      
      if (isAndroid) {
        // Highly effective Android Chrome forced redirect
        setIsRedirecting(true);
        window.location.href = `intent://${hostPath}#Intent;scheme=https;package=com.android.chrome;end;`;
        
        // If Android fails to redirect after a few seconds, let it load naturally
        setTimeout(() => setIsRedirecting(false), 2000);
      } else if (isIOS) {
        // On iOS (iPhone/iPad), in-app browsers use Safari WebKit natively.
        // We will just let it open naturally without any warnings or redirects.
        return;
      }
    }
  }, []);

  // Show a sleek loading state while attempting Android redirect
  if (isRedirecting) {
      return (
        <div className="fixed inset-0 z-[9999] bg-[#0a0514] flex flex-col items-center justify-center p-8 text-center text-white">
          <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 border-2 border-fuchsia-500 animate-spin border-t-transparent mb-6"></div>
          <h2 className="font-mono text-sm tracking-[0.2em] text-fuchsia-400 animate-pulse">REDIRECTING...</h2>
        </div>
      );
  }

  // Otherwise, render nothing so the website loads naturally!
  return null;
}
