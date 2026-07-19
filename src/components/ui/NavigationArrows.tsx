"use client";

interface NavigationArrowsProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
    labels?: string[];
}

export default function NavigationArrows({
    currentPage,
    totalPages,
    onPrev,
    onNext,
    labels = [],
}: NavigationArrowsProps) {
    return (
        <>
            {/* Page indicator dots */}
            <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-full backdrop-blur-xl bg-black/30 border border-white/10">
                {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                        key={i}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${i === currentPage
                            ? "w-8 h-3 bg-gradient-to-r from-primary to-accent"
                            : "w-3 h-3 bg-white/20 hover:bg-white/40"
                            }`}
                        aria-label={labels[i] || `Page ${i + 1}`}
                    />
                ))}
            </nav>

            {/* Left arrow */}
            {currentPage > 0 && (
                <button
                    onClick={onPrev}
                    className="fixed left-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 hover:border-primary/40 hover:shadow-[0_0_20px_rgba(138,43,226,0.3)] flex items-center justify-center transition-all duration-300 cursor-pointer group"
                    aria-label="Previous page"
                >
                    <svg
                        className="w-6 h-6 text-foreground/60 group-hover:text-primary transition-colors group-hover:-translate-x-0.5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>
            )}

            {/* Right arrow */}
            {currentPage < totalPages - 1 && (
                <button
                    onClick={onNext}
                    className="fixed right-6 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full backdrop-blur-xl bg-white/5 border border-white/10 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] flex items-center justify-center transition-all duration-300 cursor-pointer group"
                    aria-label="Next page"
                >
                    <svg
                        className="w-6 h-6 text-foreground/60 group-hover:text-accent transition-colors group-hover:translate-x-0.5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            )}


        </>
    );
}
