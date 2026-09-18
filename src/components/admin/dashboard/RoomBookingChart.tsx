"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useRoomBookingStats } from "@/hooks/useAdminBookings";

export default function RoomBookingChart() {
    const { stats, isLoading, error } = useRoomBookingStats();

    return (
        <div className="bg-purple-light/10 border border-lilac/20 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-pale">Most Booked Rooms</h3>
            </div>

            {isLoading && <p className="text-pale/60 text-sm">Loading...</p>}
            {error && <p className="text-red-400 text-sm">Failed to load room booking stats.</p>}

            {!isLoading && !error && (
                stats.length === 0 ? (
                    <p className="text-pale/60 text-sm">No bookings yet.</p>
                ) : (
                    <ResponsiveContainer width="100%" height={260}>
                        <BarChart data={stats}>
                            <CartesianGrid vertical={false} stroke="#7546e8" strokeOpacity={0.15} />
                            <XAxis dataKey="room" stroke="#c8b3f6" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="#c8b3f6" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                            <Tooltip
                                contentStyle={{ background: "#0d0e20", border: "1px solid #7546e8", borderRadius: 8 }}
                                labelStyle={{ color: "#c8b3f6" }}
                                itemStyle={{ color: "#c8b3f6" }}
                            />
                            <Bar dataKey="bookings" fill="#7546e8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                )
            )}
        </div>
    );
}
