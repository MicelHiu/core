"use client";

import { useState } from "react";
import { useVisitors } from "@/hooks/useVisitors";

function todayISODate() {
    return new Date().toISOString().slice(0, 10);
}

function startOfMonthISODate() {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1).toISOString().slice(0, 10);
}

function endOfMonthISODate() {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).toISOString().slice(0, 10);
}

const STATUSES = ["confirmed", "ongoing", "completed", "canceled"] as const;

type RangeMode = "all" | "today" | "month";

const RANGE_OPTIONS: { mode: RangeMode; label: string; caption: string }[] = [
    { mode: "all", label: "All", caption: "visitors" },
    { mode: "today", label: "Today", caption: "visitors today" },
    { mode: "month", label: "This Month", caption: "visitors this month" },
];

export default function VisitorStatusCards() {
    const [mode, setMode] = useState<RangeMode>("today");

    const range =
        mode === "all"
            ? {}
            : mode === "month"
                ? { from: startOfMonthISODate(), to: endOfMonthISODate() }
                : { from: todayISODate(), to: todayISODate() };

    const { visitors, isLoading, error } = useVisitors(range);
    const caption = RANGE_OPTIONS.find((o) => o.mode === mode)?.caption ?? "visitors";

    const countByStatus = new Map<string, number>();
    for (const v of visitors) {
        countByStatus.set(v.bookings.status, (countByStatus.get(v.bookings.status) ?? 0) + 1);
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 flex-wrap">
                {RANGE_OPTIONS.map((option) => (
                    <button
                        key={option.mode}
                        onClick={() => setMode(option.mode)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                            mode === option.mode ? "bg-lilac/20 text-lilac" : "bg-pale/10 text-pale/50"
                        }`}
                    >
                        {option.label}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {STATUSES.map((status) => (
                    <div key={status} className="bg-purple-light/10 border border-lilac/20 rounded-xl p-5">
                        <p className="text-sm font-semibold text-pale capitalize">{status}</p>
                        <p className="text-3xl font-extrabold text-lilac mt-2">
                            {isLoading ? "-" : error ? "!" : countByStatus.get(status) ?? 0}
                        </p>
                        <p className="text-xs text-pale/60 mt-1">{caption}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
