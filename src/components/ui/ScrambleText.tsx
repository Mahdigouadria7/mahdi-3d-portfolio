"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const CHARS = "ABCDEFGHJKLNPQRSTUVXYZ0123456789+=-_";

export default function ScrambleText({ text, className = "" }: { text: string, className?: string }) {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scramble = useCallback(() => {
        let iteration = 0;
        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText(
                text.split("").map((char, index) => {
                    // Don't scramble spaces
                    if (char === " ") return " ";
                    
                    if (index < iteration) {
                        return text[index];
                    }
                    return CHARS[Math.floor(Math.random() * CHARS.length)];
                }).join("")
            );

            if (iteration >= text.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }
            
            iteration += 1 / 2; // Speed of reveal
        }, 30);
    }, [text]);

    useEffect(() => {
        scramble();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [scramble]);

    return (
        <span 
            onMouseEnter={scramble}
            className={`inline-block relative ${className}`}
        >
            {/* Invisible original text maintains strict layout width */}
            <span className="opacity-0 pointer-events-none whitespace-pre-wrap">{text}</span>
            {/* Absolute scrambled text inherits alignment and bounds */}
            <span className="absolute inset-0 w-full h-full text-inherit whitespace-pre-wrap">{displayText}</span>
        </span>
    );
}
