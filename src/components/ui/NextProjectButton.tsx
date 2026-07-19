"use client";

import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import ScrambleText from "./ScrambleText";

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
            className="pointer-events-auto font-cyber text-[9px] md:text-sm font-bold tracking-wide md:tracking-[0.2em] uppercase text-white/70 hover:text-fuchsia-500 transition-colors flex flex-col items-end gap-2 group cursor-pointer max-w-full w-full md:w-auto text-right"
        >
            <ScrambleText text={nextProject.title} />
            <span className="w-8 h-[2px] bg-white/70 group-hover:bg-fuchsia-500 group-hover:w-full transition-all duration-300"></span>
        </a>
    );
}
