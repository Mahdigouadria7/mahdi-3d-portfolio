"use client";

import { useEffect } from "react";

export default function SecurityWrapper({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Disable Right-Click (Context Menu) globally
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
        };

        // Disable Keyboard Shortcuts commonly used for DevTools/Inspection
        const handleKeyDown = (e: KeyboardEvent) => {
            // F12
            if (e.key === "F12") {
                e.preventDefault();
            }
            // Ctrl+Shift+I / Cmd+Option+I (Inspect)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "i") {
                e.preventDefault();
            }
            // Ctrl+Shift+J / Cmd+Option+J (Console)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "j") {
                e.preventDefault();
            }
            // Ctrl+Shift+C / Cmd+Option+C (Inspect Element selection tool)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "c") {
                e.preventDefault();
            }
            // Ctrl+U / Cmd+Option+U (View Source)
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "u") {
                e.preventDefault();
            }
            // Ctrl+S / Cmd+S (Save Webpage)
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
                e.preventDefault();
            }
        };

        // Disable Dragging on all images and videos globally
        const handleDragStart = (e: DragEvent) => {
            if (e.target instanceof HTMLImageElement || e.target instanceof HTMLVideoElement) {
                e.preventDefault();
            }
        };

        window.addEventListener("contextmenu", handleContextMenu);
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("dragstart", handleDragStart);

        return () => {
            window.removeEventListener("contextmenu", handleContextMenu);
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("dragstart", handleDragStart);
        };
    }, []);

    // Wrap the entire app in a div that prevents text selection globally (adds friction)
    return (
        <div className="select-none pointer-events-auto">
            {children}
        </div>
    );
}
