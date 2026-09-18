"use client";

import { useVisitors } from "@/hooks/useVisitors";

function todayISODate() {
    return new Date().toISOString().slice(0, 10);
}

const STATUSES = ["confirmed", "ongoing", "completed", "canceled"] as const;

export default function VisitorStatusCards() {
    const today = todayISODate();
    const { visitors, isLoading, error } = useVisitors({ from: today, to: today });

    const countByStatus = new Map<string, number>();
    for (const v of visitors) {
        countByStatus.set(v.bookings.status, (countByStatus.get(v.bookings.status) ?? 0) + 1);
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATUSES.map((status) => (
                <div key={status} className="bg-purple-light/10 border border-lilac/20 rounded-xl p-5">
                    <p className="text-sm font-semibold text-pale capitalize">{status}</p>
                    <p className="text-3xl font-extrabold text-lilac mt-2">
                        {isLoading ? "-" : error ? "!" : countByStatus.get(status) ?? 0}
                    </p>
                    <p className="text-xs text-pale/60 mt-1">visitors today</p>
                </div>
            ))}
        </div>
    );
}
