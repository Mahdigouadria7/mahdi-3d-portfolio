"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

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
            title="Return to All Projects"
            className="pointer-events-auto flex items-center justify-center gap-2.5 bg-[#141414]/85 backdrop-blur-xl border border-white/20 hover:border-[#ffff7b] text-white hover:text-[#ffff7b] p-3 md:px-5 md:py-2.5 rounded-full shadow-2xl transition-all duration-300 group cursor-pointer"
        >
            <span className="w-6 h-6 rounded-full bg-[#ffff7b] text-[#141414] flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover:-translate-x-0.5 transition-transform">
                ←
            </span>
            <span className="hidden md:inline font-mono text-xs font-bold tracking-wider uppercase">
                ALL PROJECTS
            </span>
        </Link>
    );
}
