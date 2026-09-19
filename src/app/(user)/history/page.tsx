"use client";

import { useState } from "react";
import { Navigation } from "@/components/user/Navigation";
import { useBookings } from "@/hooks/useBookings";
import { formatPrice } from "@/lib/data";
import Link from "next/link";

type TypeFilter = "ALL" | "PC" | "PS";

export default function History() {
    const { bookings, isLoading } = useBookings();
    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState<TypeFilter>("ALL");

    const filteredBookings = bookings.filter((b) => {
        const matchesType = typeFilter === "ALL" || b.rooms?.type === typeFilter;
        const q = search.trim().toLowerCase();
        const matchesSearch =
            !q ||
            b.rooms?.name?.toLowerCase().includes(q) ||
            b.code.toLowerCase().includes(q);
        return matchesType && matchesSearch;
    });

    return (
        <>
            <Navigation />
            <main className="warnet-bg min-h-screen px-6 py-12">
                <h1 className="text-3xl font-bold text-ink text-center mb-10">Booking History</h1>

                <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3 mb-8">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search room or booking code..."
                        className="flex-1 rounded-lg bg-surface border border-accent/40 px-3 py-2 text-ink"
                    />
                    <div className="flex gap-2">
                        {(["ALL", "PC", "PS"] as TypeFilter[]).map((t) => (
                            <button
                                key={t}
                                onClick={() => setTypeFilter(t)}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition cursor-pointer ${
                                    typeFilter === t
                                        ? "bg-cta text-cta-ink border-cta"
                                        : "bg-surface border-accent/40 text-ink hover:bg-tint/20"
                                }`}
                            >
                                {t === "ALL" ? "All" : t}
                            </button>
                        ))}
                    </div>
                </div>

                {isLoading ? (
                    <p className="text-center text-ink/70">Loading...</p>
                ) : bookings.length === 0 ? (
                    <p className="text-center text-ink/70">No booking history yet.</p>
                ) : filteredBookings.length === 0 ? (
                    <p className="text-center text-ink/70">No bookings match your search/filter.</p>
                ) : (
                    <div className="max-w-2xl mx-auto flex flex-col gap-4">
                        {filteredBookings.map((b) => (
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
                                <p className="text-sm text-accent font-semibold mt-1">
                                    +{b.points_earned} points
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
