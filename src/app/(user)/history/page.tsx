"use client";

import { Navigation } from "@/components/user/Navigation";
import { useBookings } from "@/hooks/useBookings";
import { formatPrice } from "@/lib/data";
import Link from "next/link";

export default function History() {
    const { bookings, isLoading } = useBookings();

    return (
        <>
            <Navigation />
            <main className="warnet-bg min-h-screen px-6 py-12">
                <h1 className="text-3xl font-bold text-ink text-center mb-10">Booking History</h1>

                {isLoading ? (
                    <p className="text-center text-ink/70">Loading...</p>
                ) : bookings.length === 0 ? (
                    <p className="text-center text-ink/70">No booking history yet.</p>
                ) : (
                    <div className="max-w-2xl mx-auto flex flex-col gap-4">
                        {bookings.map((b) => (
                            <Link
                                key={b.code}
                                href={`/history/${b.code}`}
                                className="bg-surface/60 border border-accent/40 rounded-2xl p-6 shadow-xl hover:bg-tint/20 transition"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="font-bold text-ink">{b.rooms?.name ?? b.room_id}</h2>
                                    <span className="text-xs uppercase font-semibold text-accent">{b.status}</span>
                                </div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-ink/60">
                                        {new Date(b.created_at).toLocaleDateString("id-ID")}
                                    </span>
                                    <span className="text-xs text-ink/40">{b.code}</span>
                                </div>
                                <p className="text-sm text-ink/70">
                                    {new Date(b.date_play).toLocaleDateString("id-ID")} · {b.time_start.slice(0, 5)}–{b.time_end.slice(0, 5)} · {b.quantity} seat(s)
                                </p>
                                <p className="text-right font-bold text-ink mt-2">
                                    {formatPrice(Number(b.total_price))}
                                </p>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}
