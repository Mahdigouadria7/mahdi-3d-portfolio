"use client";

import { useEffect, useState } from "react";

interface TopNavProps {
    currentPage: number;
    labels: string[];
    onNavigate: (page: number) => void;
}

export default function TopNav({ currentPage, labels, onNavigate }: TopNavProps) {
    const [timeString, setTimeString] = useState<string>("");

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setTimeString(
                now.toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: true,
                })
            );
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="fixed top-6 left-0 w-full px-6 md:px-12 flex justify-between items-center z-50 pointer-events-none">
            {/* Left Nav Pill */}
            <div className="flex flex-row gap-6 md:gap-10 px-6 md:px-8 py-3 bg-black/60 backdrop-blur-xl rounded-full border border-white/15 shadow-lg shadow-black/50 pointer-events-auto">
                {labels.map((label, i) => {
                    const isActive = i === currentPage;
                    return (
                        <button
                            key={label}
                            onClick={() => onNavigate(i)}
                            className={`relative text-xs md:text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                                isActive 
                                    ? "text-fuchsia-400 drop-shadow-[0_0_8px_rgba(217,70,239,0.5)]" 
                                    : "text-white/60 hover:text-white"
                            }`}
                        >
                            {label}
                        </button>
                    );
                })}
            </div>

            {/* Right Live Timezone Badge (Adrian Valera Style) */}
            <div className="hidden md:flex items-center gap-3 px-5 py-2.5 bg-black/60 backdrop-blur-xl rounded-full border border-white/15 text-xs font-mono text-white/80 pointer-events-auto shadow-lg shadow-black/50">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-white/40 tracking-wider">AVAILABLE FOR WORK</span>
                <span className="text-white/20">|</span>
                <span className="text-fuchsia-400 font-semibold tracking-wider">{timeString || "LOCAL TIME"}</span>
            </div>
        </nav>
    );
}

