"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useVisitorStats } from "@/hooks/useVisitors";

const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function VisitorsChart() {
    const year = new Date().getFullYear();
    const { stats, isLoading, error } = useVisitorStats({ groupBy: "month", year });

    const data = stats.map((s) => ({
        label: MONTH_LABELS[(s.month ?? 1) - 1],
        count: s.count,
    }));

    return (
        <div className="bg-surface border border-ink/10 shadow-sm rounded-xl p-5">
            <h3 className="text-sm font-semibold text-ink mb-4">Visitors per Month ({year})</h3>

            {isLoading && <p className="text-ink/70 text-sm">Loading...</p>}
            {error && <p className="text-red-600 dark:text-red-400 text-sm">Failed to load visitor stats.</p>}

            {!isLoading && !error && (
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={data}>
                        <CartesianGrid vertical={false} stroke="var(--ink)" strokeOpacity={0.08} />
                        <XAxis dataKey="label" stroke="var(--ink)" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="var(--ink)" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip
                            contentStyle={{ background: "var(--surface)", border: "1px solid var(--accent)", borderRadius: 8 }}
                            labelStyle={{ color: "var(--ink)" }}
                            itemStyle={{ color: "var(--ink)" }}
                        />
                        <Bar dataKey="count" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
