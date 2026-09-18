"use client";

import { use } from "react";
import Link from "next/link";
import { Navigation } from "@/components/user/Navigation";
import { useBooking } from "@/hooks/useBookings";
import { formatPrice } from "@/lib/data";

export default function HistoryDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id: code } = use(params);
    const { booking, isLoading } = useBooking(code);

    if (isLoading) {
        return (
            <>
                <Navigation />
                <main className="warnet-bg min-h-screen flex items-center justify-center px-6 py-12">
                    <p className="text-ink/70">Loading...</p>
                </main>
            </>
        );
    }

    if (!booking) {
        return (
            <>
                <Navigation />
                <main className="warnet-bg min-h-screen flex flex-col items-center justify-center px-6 py-12 gap-4">
                    <p className="text-ink/70">Booking not found.</p>
                    <Link href="/history" className="text-accent hover:underline">
                        ← Back to History
                    </Link>
                </main>
            </>
        );
    }

    return (
        <>
            <Navigation />
            <main className="warnet-bg min-h-screen px-6 py-12">
                <Link href="/history" className="mb-8 flex items-center gap-1 hover:underline text-ink/70 max-w-md mx-auto">
                    ← Back
                </Link>

                <section className="max-w-md mx-auto bg-surface/60 border border-accent/40 rounded-2xl p-8 shadow-xl flex flex-col gap-3">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-2xl font-bold text-ink">{booking.rooms?.name ?? booking.room_id}</h1>
                        <span className="text-xs uppercase font-semibold text-accent">{booking.status}</span>
                    </div>

                    <p className="text-sm text-ink/60">Code: {booking.code}</p>

                    <hr className="border-accent/30 my-2" />

                    <div className="flex justify-between text-sm">
                        <span className="text-ink/70">Guest</span>
                        <span className="font-semibold text-ink">{booking.guest_name}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-ink/70">Contact</span>
                        <span className="font-semibold text-ink">{booking.guest_contact}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-ink/70">Date</span>
                        <span className="font-semibold text-ink">{new Date(booking.date_play).toLocaleDateString("id-ID")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-ink/70">Time</span>
                        <span className="font-semibold text-ink">{booking.time_start.slice(0, 5)}–{booking.time_end.slice(0, 5)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-ink/70">Seats</span>
                        <span className="font-semibold text-ink">{booking.quantity}</span>
                    </div>

                    <hr className="border-accent/30 my-2" />

                    <div className="flex justify-between">
                        <span className="font-bold text-ink">Total</span>
                        <span className="font-bold text-ink">{formatPrice(Number(booking.total_price))}</span>
                    </div>
                </section>
            </main>
        </>
    );
}
