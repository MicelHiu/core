"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useRoomBookingStats } from "@/hooks/useAdminBookings";

export default function RoomBookingChart() {
    const { stats, isLoading, error } = useRoomBookingStats();

    return (
        <div className="bg-surface border border-ink/10 shadow-sm rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-ink">Most Booked Rooms</h3>
            </div>

            {isLoading && <p className="text-ink/70 text-sm">Loading...</p>}
            {error && <p className="text-red-600 dark:text-red-400 text-sm">Failed to load room booking stats.</p>}

            {!isLoading && !error && (
                stats.length === 0 ? (
                    <p className="text-ink/70 text-sm">No bookings yet.</p>
                ) : (
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={stats}>
                            <CartesianGrid vertical={false} stroke="var(--ink)" strokeOpacity={0.08} />
                            <XAxis dataKey="room" stroke="var(--ink)" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="var(--ink)" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip
                                contentStyle={{ background: "var(--surface)", border: "1px solid var(--accent)", borderRadius: 8 }}
                                labelStyle={{ color: "var(--ink)" }}
                                itemStyle={{ color: "var(--ink)" }}
                            />
                            <Bar dataKey="bookings" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )
            )}
        </div>
    );
}
