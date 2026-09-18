"use client";

import { useEffect, useRef, useState } from "react";

interface VisitorRowActionsProps {
    onOpenLogs: () => void;
    onOpenDetails: () => void;
}

export default function VisitorRowActions({ onOpenLogs, onOpenDetails }: VisitorRowActionsProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={ref}>
            <button
                onClick={() => setOpen((o) => !o)}
                className="text-ink/70 hover:text-ink px-2 py-1 rounded hover:bg-ink/10 transition-colors"
                aria-label="Actions"
            >
                •••
            </button>
            {open && (
                <div className="absolute right-0 mt-1 w-40 bg-surface border border-ink/10 rounded-lg shadow-xl z-10 overflow-hidden">
                    <button
                        onClick={() => { setOpen(false); onOpenLogs(); }}
                        className="w-full text-left text-sm text-ink px-3 py-2 hover:bg-accent/10 transition-colors"
                    >
                        Activity Logs
                    </button>
                    <button
                        onClick={() => { setOpen(false); onOpenDetails(); }}
                        className="w-full text-left text-sm text-ink px-3 py-2 hover:bg-accent/10 transition-colors"
                    >
                        Details
                    </button>
                </div>
            )}
        </div>
    );
}
