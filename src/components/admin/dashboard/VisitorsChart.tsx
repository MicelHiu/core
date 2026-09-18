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
        <div className="bg-purple-light/10 border border-lilac/20 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-pale mb-4">Visitors per Month ({year})</h3>

            {isLoading && <p className="text-pale/60 text-sm">Loading...</p>}
            {error && <p className="text-red-400 text-sm">Failed to load visitor stats.</p>}

            {!isLoading && !error && (
                <ResponsiveContainer width="100%" height={260}>
                    <BarChart data={data}>
                        <CartesianGrid vertical={false} stroke="#7546e8" strokeOpacity={0.15} />
                        <XAxis dataKey="label" stroke="#c8b3f6" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#c8b3f6" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip
                            contentStyle={{ background: "#0d0e20", border: "1px solid #7546e8", borderRadius: 8 }}
                            labelStyle={{ color: "#c8b3f6" }}
                            itemStyle={{ color: "#c8b3f6" }}
                        />
                        <Bar dataKey="count" fill="#7546e8" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
