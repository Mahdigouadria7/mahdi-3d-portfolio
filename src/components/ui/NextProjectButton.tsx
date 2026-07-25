"use client";

import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";

export default function NextProjectButton({ currentSlug }: { currentSlug: string }) {
    const router = useRouter();

    const currentIndex = projects.findIndex(p => p.slug === currentSlug);
    const nextProject = projects[(currentIndex + 1) % projects.length];

    const handleNext = (e: React.MouseEvent) => {
        e.preventDefault();
        
        if (!document.startViewTransition) {
            router.push(`/projects/${nextProject.slug}`);
            return;
        }

        document.startViewTransition(() => {
            return new Promise<void>((resolve) => {
                router.push(`/projects/${nextProject.slug}`);
                
                const checkUrl = setInterval(() => {
                    if (window.location.pathname === `/projects/${nextProject.slug}`) {
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
        <a 
            href={`/projects/${nextProject.slug}`} 
            onClick={handleNext}
            title={`Next: ${nextProject.title}`}
            className="pointer-events-auto flex items-center justify-center gap-3 bg-[#141414]/85 backdrop-blur-xl border border-white/15 hover:border-[#ffff7b]/60 p-2.5 md:px-5 md:py-2.5 rounded-full transition-all duration-300 group shadow-xl cursor-pointer"
        >
            <div className="hidden md:flex flex-col items-end min-w-0">
                <span className="font-mono text-[9px] text-[#ffff7b] uppercase tracking-widest font-semibold">NEXT</span>
                <span className="font-sans text-xs md:text-sm font-bold tracking-tight text-white group-hover:text-[#ffff7b] transition-colors truncate max-w-[160px]">
                    {nextProject.title}
                </span>
            </div>
            <span className="w-6 h-6 rounded-full bg-white/10 text-white group-hover:bg-[#ffff7b] group-hover:text-[#141414] flex items-center justify-center text-xs transition-colors font-bold flex-shrink-0">
                →
            </span>
        </a>
    );
}
