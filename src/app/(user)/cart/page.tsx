"use client";

import { RentSummary } from "@/components/user/cart/RentSummary";
import UserSummary from "@/components/user/cart/UserSummary";
import { CompletePopUp } from "@/components/user/cart/CompletePopUp";
import { Navigation } from "@/components/user/Navigation";
import { useState, useMemo } from "react";
import { useCartStore } from "@/store/CartStore";
import { useHistoryStore } from "@/store/HistoryStore";

const DEMO_ROOM = { name: "PC Regular", price: 10000 };

const HOURS = Array.from({ length: 24 }, (_, i) => {
    const hour = i + 1;
    return `${String(hour).padStart(2, "0")}.00`;
});

export default function Cart() {
    const [showThanks, setShowThanks] = useState(false);
    const { items } = useCartStore();
    const addBooking = useHistoryStore((state) => state.addBooking);
    const room = items[0] ?? DEMO_ROOM;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [date, setDate] = useState("");

    const [seats, setSeats] = useState(1);
    const [startTime, setStartTime] = useState("08.00");
    const [finishTime, setFinishTime] = useState("10.00");

    const duration = useMemo(() => {
        const toHour = (t: string) => parseInt(t.split(".")[0], 10);
        const diff = toHour(finishTime) - toHour(startTime);
        return diff > 0 ? diff : 0;
    }, [startTime, finishTime]);

    const total = room.price * seats * duration;

    const isFormValid = name.trim() && email.trim() && contact.trim() && date && duration > 0;

    const handleBooked = () => {
        // TODO API: kalau nanti sudah ada endpoint booking, ini bisa jadi:
        //   await fetch("/api/bookings", { method: "POST", body: JSON.stringify(payload) })
        // baru setelah res.ok, panggil addBooking / setShowThanks.
        addBooking({
            roomName: room.name,
            price: room.price,
            seats,
            startTime,
            finishTime,
            duration,
            total,
            name,
            email,
            contact,
            date,
        });
        setShowThanks(true);
    };

    return (
        <>
            <Navigation />
            <main className="warnet-bg min-h-screen px-6 py-12">
                <h1 className="text-3xl font-bold text-pale text-center mb-10">Booking Summary</h1>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="flex flex-col gap-6">
                        <UserSummary />

                        <section className="bg-darkpurple/60 border border-lilac/40 rounded-2xl p-8 shadow-xl flex flex-col gap-4">
                            <h2 className="text-2xl font-bold text-pale text-center mb-2">Booking Details</h2>

                            <label className="flex flex-col gap-1 text-sm text-pale/70">
                                Name
                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="rounded-lg bg-darkpurple border border-lilac/40 px-3 py-2 text-pale"
                                    placeholder="Your name"
                                />
                            </label>

                            <label className="flex flex-col gap-1 text-sm text-pale/70">
                                Email
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="rounded-lg bg-darkpurple border border-lilac/40 px-3 py-2 text-pale"
                                    placeholder="you@example.com"
                                />
                            </label>

                            <label className="flex flex-col gap-1 text-sm text-pale/70">
                                Contact
                                <input
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}
                                    className="rounded-lg bg-darkpurple border border-lilac/40 px-3 py-2 text-pale"
                                    placeholder="08xxxxxxxxxx"
                                />
                            </label>

                            <label className="flex flex-col gap-1 text-sm text-pale/70">
                                Date
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="rounded-lg bg-darkpurple border border-lilac/40 px-3 py-2 text-pale"
                                />
                            </label>

                            <label className="flex flex-col gap-1 text-sm text-pale/70">
                                Seats
                                <input
                                    type="number"
                                    min={1}
                                    value={seats}
                                    onChange={(e) => setSeats(Math.max(1, Number(e.target.value)))}
                                    className="rounded-lg bg-darkpurple border border-lilac/40 px-3 py-2 text-pale"
                                />
                            </label>

                            <div className="flex gap-4">
                                <label className="flex flex-col gap-1 text-sm text-pale/70 flex-1">
                                    Start
                                    <select
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="rounded-lg bg-darkpurple border border-lilac/40 px-3 py-2 text-pale"
                                    >
                                        {HOURS.map((h) => (
                                            <option key={h} value={h}>{h}</option>
                                        ))}
                                    </select>
                                </label>

                                <label className="flex flex-col gap-1 text-sm text-pale/70 flex-1">
                                    Finish
                                    <select
                                        value={finishTime}
                                        onChange={(e) => setFinishTime(e.target.value)}
                                        className="rounded-lg bg-darkpurple border border-lilac/40 px-3 py-2 text-pale"
                                    >
                                        {HOURS.map((h) => (
                                            <option key={h} value={h}>{h}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            {duration === 0 && (
                                <p className="text-sm text-red-400">Finish time harus lebih besar dari start time.</p>
                            )}
                        </section>
                    </div>

                    <div className="flex flex-col gap-6">
                        <RentSummary
                            roomName={room.name}
                            price={room.price}
                            seats={seats}
                            duration={duration}
                            total={total}
                        />

                        <button
                            onClick={handleBooked}
                            disabled={!isFormValid}
                            className="w-full bg-lilac hover:bg-purple disabled:opacity-40 disabled:cursor-not-allowed text-darkpurple font-bold py-3 rounded-full transition"
                        >
                            Confirm Booking
                        </button>
                    </div>
                </div>
            </main>

            {showThanks && <CompletePopUp />}
        </>
    );
}