"use client";

interface TopNavProps {
    currentPage: number;
    labels: string[];
    onNavigate: (page: number) => void;
}

export default function TopNav({ currentPage, labels, onNavigate }: TopNavProps) {
    return (
        <nav className="fixed top-6 left-0 w-full px-6 md:px-12 flex justify-between items-center z-50 mix-blend-difference pointer-events-none">
            {/* Left Nav Pill */}
            <div className="flex flex-row gap-6 md:gap-10 px-6 md:px-8 py-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 pointer-events-auto">
                {labels.map((label, i) => {
                    const isActive = i === currentPage;
                    return (
                        <button
                            key={label}
                            onClick={() => onNavigate(i)}
                            className={`relative text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                                isActive ? "text-white" : "text-white/60 hover:text-white"
                            }`}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>


        </nav>
    );
}
