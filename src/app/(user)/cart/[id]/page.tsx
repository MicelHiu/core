"use client";

import { RentSummary } from "@/components/user/cart/RentSummary";
import UserSummary from "@/components/user/cart/UserSummary";
import { CompletePopUp } from "@/components/user/cart/CompletePopUp";
import { Navigation } from "@/components/user/Navigation";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCarts";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { updateCartItem, createBooking } from "@/lib/dataRoute";
import { fetchRoomById, Room } from "@/lib/data";
import { mutate } from "swr";

export default function CartDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [showThanks, setShowThanks] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { cart, isLoading } = useCart(id);
    const { user } = useCurrentUser();
    const [room, setRoom] = useState<Room | null>(null);

    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [date, setDate] = useState("");
    const [seatsInput, setSeatsInput] = useState("1");
    const [startTime, setStartTime] = useState("08:00");
    const [finishTime, setFinishTime] = useState("10:00");

    useEffect(() => {
        if (user) {
            setName(user.full_name ?? "");
            setContact(user.contact ?? "");
        }
    }, [user]);

    useEffect(() => {
        if (!cart) return;
        setSeatsInput(String(cart.quantity));
        setDate(cart.date_play.slice(0, 10));
        setStartTime(cart.time_start.slice(0, 5));
        setFinishTime(cart.time_end.slice(0, 5));
        fetchRoomById(cart.room_id).then(setRoom).catch(() => setRoom(null));
    }, [cart]);

    const seats = Math.max(1, parseInt(seatsInput, 10) || 1);

    const duration = (() => {
        const toHour = (t: string) => parseInt(t.split(":")[0], 10);
        const diff = toHour(finishTime) - toHour(startTime);
        return diff > 0 ? diff : 0;
    })();

    if (isLoading) {
        return (
            <>
                <Navigation />
                <main className="warnet-bg min-h-screen flex items-center justify-center px-6 py-12">
                    <p className="text-pale/70">Memuat...</p>
                </main>
            </>
        );
    }

    if (!cart) {
        return (
            <>
                <Navigation />
                <main className="warnet-bg min-h-screen flex flex-col items-center justify-center px-6 py-12 gap-4">
                    <p className="text-pale/70">Item tidak ditemukan di cart.</p>
                    <Link href="/cart" className="text-lilac hover:underline">
                        ← Back to Cart
                    </Link>
                </main>
            </>
        );
    }

    const price = room ? Number(room.price) : 0;
    const total = price * seats * duration;
    const isFormValid = name.trim() && contact.trim() && date && duration > 0;

    const handleBooked = async () => {
        setIsSubmitting(true);
        try {
            await updateCartItem(cart.id, {
                quantity: seats,
                date_play: date,
                time_start: startTime,
                time_end: finishTime,
            });
            await createBooking({
                cart_id: cart.id,
                guest_name: name,
                guest_contact: contact,
            });
            mutate('/api/carts');
            setShowThanks(true);
        } catch (err) {
            alert(err instanceof Error ? err.message : "Gagal konfirmasi booking, coba lagi.");
        } finally {
            setIsSubmitting(false);
        }
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
                                    lang="en-CA"
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
                                    value={seatsInput}
                                    onChange={(e) => setSeatsInput(e.target.value)}
                                    onBlur={() => setSeatsInput(String(seats))}
                                    className="rounded-lg bg-darkpurple border border-lilac/40 px-3 py-2 text-pale"
                                />
                            </label>

                            <div className="flex gap-4">
                                <label className="flex flex-col gap-1 text-sm text-pale/70 flex-1">
                                    Start
                                    <input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="rounded-lg bg-darkpurple border border-lilac/40 px-3 py-2 text-pale"
                                    />
                                </label>

                                <label className="flex flex-col gap-1 text-sm text-pale/70 flex-1">
                                    Finish
                                    <input
                                        type="time"
                                        value={finishTime}
                                        onChange={(e) => setFinishTime(e.target.value)}
                                        className="rounded-lg bg-darkpurple border border-lilac/40 px-3 py-2 text-pale"
                                    />
                                </label>
                            </div>

                            {duration === 0 && (
                                <p className="text-sm text-red-400">Finish time harus lebih besar dari start time.</p>
                            )}
                        </section>
                    </div>

                    <div className="flex flex-col gap-6">
                        <RentSummary
                            roomName={room?.name ?? cart.room_id}
                            price={price}
                            seats={seats}
                            duration={duration}
                            total={total}
                        />

                        <button
                            onClick={handleBooked}
                            disabled={!isFormValid || isSubmitting}
                            className="w-full bg-lilac hover:bg-purple disabled:opacity-40 disabled:cursor-not-allowed text-darkpurple font-bold py-3 rounded-full transition"
                        >
                            {isSubmitting ? "Processing..." : "Confirm Booking"}
                        </button>
                    </div>
                </div>
            </main>

            {showThanks && <CompletePopUp />}
        </>
    );
}
