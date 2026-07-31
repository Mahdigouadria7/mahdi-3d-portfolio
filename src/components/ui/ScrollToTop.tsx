"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Client component that resets window & Lenis scroll position to top (0, 0) on route change.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      
      // Scroll native window immediately
      window.scrollTo(0, 0);

      // Scroll Lenis instance immediately if available
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { immediate: true });
      }
    }
  }, [pathname]);

  return null;
}
