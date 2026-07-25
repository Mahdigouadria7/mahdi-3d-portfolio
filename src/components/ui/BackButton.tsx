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
            className="pointer-events-auto inline-flex items-center gap-2.5 bg-[#ffff7b] text-[#141414] font-sans text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-white active:scale-95 transition-all duration-200 shadow-2xl group cursor-pointer"
        >
            <span className="w-5 h-5 rounded-full bg-[#141414] text-[#ffff7b] flex items-center justify-center text-xs group-hover:-translate-x-0.5 transition-transform flex-shrink-0">
                ←
            </span>
            <span>ALL PROJECTS</span>
        </Link>
    );
}
