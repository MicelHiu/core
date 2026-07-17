"use client";

import { Navigation } from "@/components/user/Navigation";
import { useHistoryStore } from "@/store/HistoryStore";
import { formatPrice } from "@/lib/data";

export default function History() {
    // TODO API: nanti ganti jadi useSWR('/api/bookings', fetcher) untuk ambil dari server,
    // ketika sudah ada endpointnya. Struktur JSX di bawah tidak perlu berubah banyak.
    const bookings = useHistoryStore((state) => state.bookings);

    return (
        <>
            <Navigation />
            <main className="warnet-bg min-h-screen px-6 py-12">
                <h1 className="text-3xl font-bold text-pale text-center mb-10">Booking History</h1>

                {bookings.length === 0 ? (
                    <p className="text-center text-pale/70">Belum ada riwayat booking.</p>
                ) : (
                    <div className="max-w-2xl mx-auto flex flex-col gap-4">
                        {bookings.map((b) => (
                            <div
                                key={b.id}
                                className="bg-darkpurple/60 border border-lilac/40 rounded-2xl p-6 shadow-xl"
                            >
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="font-bold text-pale">{b.roomName}</h2>
                                    <span className="text-sm text-pale/60">
                                        {new Date(b.bookedAt).toLocaleDateString("id-ID")}
                                    </span>
                                </div>
                                <p className="text-sm text-pale/70">
                                    {b.date} · {b.startTime}–{b.finishTime} · {b.seats} seat(s)
                                </p>
                                <p className="text-right font-bold text-pale mt-2">
                                    {formatPrice(b.total)}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}