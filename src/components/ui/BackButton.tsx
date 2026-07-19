"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import ScrambleText from "./ScrambleText";

export default function BackButton() {
    const router = useRouter();

    const handleBack = (e: React.MouseEvent) => {
        e.preventDefault();
        
        if (!document.startViewTransition) {
            router.push("/");
            return;
        }

        document.startViewTransition(() => {
            return new Promise<void>((resolve) => {
                router.push("/");
                
                const checkUrl = setInterval(() => {
                    if (window.location.pathname === "/") {
                        clearInterval(checkUrl);
                        setTimeout(resolve, 100);
                    }
                }, 50);

                setTimeout(() => {
                    clearInterval(checkUrl);
                    resolve();
                }, 3000);
            });
        });
    };

    return (
        <Link 
            href="/" 
            onClick={handleBack}
            className="pointer-events-auto relative flex items-center justify-center w-24 h-24 group cursor-pointer"
        >
            {/* Outer Faded Circle */}
            <div className="absolute inset-0 rounded-full border border-white/20 group-hover:border-red-500/50 group-hover:scale-110 transition-all duration-500"></div>
            
            {/* Inner Solid Circle */}
            <div className="absolute inset-2 rounded-full border border-white/40 group-hover:border-red-500 transition-colors duration-500"></div>
            
            {/* Vertical Dashed Line (Crosshair) */}
            <div className="absolute top-[-20px] bottom-[-20px] left-1/2 w-[1px] border-l border-dashed border-white/40 group-hover:border-red-500 transition-colors duration-500 transform -translate-x-1/2"></div>
            
            {/* Text on transparent background */}
            <div className="relative z-10 px-3 py-1">
                <span className="font-tech text-sm font-bold tracking-[0.2em] uppercase text-white group-hover:text-red-500 transition-colors">
                    <ScrambleText text="BACK" />
                </span>
            </div>
        </Link>
    );
}
