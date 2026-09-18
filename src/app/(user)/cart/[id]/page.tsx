"use client";

import { RentSummary } from "@/components/user/cart/RentSummary";
import UserSummary from "@/components/user/cart/UserSummary";
import { CompletePopUp } from "@/components/user/cart/CompletePopUp";
import { ErrorPopUp } from "@/components/user/cart/ErrorPopUp";
import { Navigation } from "@/components/user/Navigation";
import { use, useState } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/useCarts";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { updateCartItem, createBooking, DiscountFromApi } from "@/lib/dataRoute";
import { fetchRoomById, Room } from "@/lib/data";
import { mutate } from "swr";
import { usePromotions } from "@/hooks/usePromotions";
import { PromoUsedCard } from "@/components/user/cart/PromoUsedCard";
import { PromoPickerPopup } from "@/components/user/cart/PromoPicker";
import { useBookingForm } from "@/hooks/useBookingForm";
import { useEffect } from "react";

const HOUR_OPTIONS = Array.from({ length: 16 }, (_, i) => {
    const hour = String(i + 8).padStart(2, "0"); // 08:00 s.d. 23:00
    return `${hour}:00`;
});

export default function CartDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [showThanks, setShowThanks] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const { cart, isLoading } = useCart(id);
    const { user } = useCurrentUser();
    const [room, setRoom] = useState<Room | null>(null);

    const { form, update, seats, duration } = useBookingForm(cart, user);

    const [showPromoPopUp, setShoowPromoPopUp] = useState(false);
    const { promotions, isLoading: isPromosLoading } = usePromotions();
    const selectedPromo = promotions.find((p) => p.id === cart?.discount_id) ?? null;

    useEffect(() => {
        if (!cart) return;
        fetchRoomById(cart.room_id).then(setRoom).catch(() => setRoom(null));
    }, [cart]);

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

    if (!cart) {
        return (
            <>
                <Navigation />
                <main className="warnet-bg min-h-screen flex flex-col items-center justify-center px-6 py-12 gap-4">
                    <p className="text-ink/70">Item not found in your cart.</p>
                    <Link href="/cart" className="text-accent hover:underline">
                        ← Back to Cart
                    </Link>
                </main>
            </>
        );
    }

    const price = room ? Number(room.price) : 0;
    const total = price * seats * duration;
    const discountValue = selectedPromo ? Number(selectedPromo.value) : 0;
    const finalTotal = Math.max(0, total - discountValue);
    const isFormValid = form.name.trim() && form.contact.trim() && form.date && duration > 0;

    const handleBooked = async () => {
        setIsSubmitting(true);
        try {
            await updateCartItem(cart.id, {
                quantity: seats,
                date_play: form.date,
                time_start: form.startTime,
                time_end: form.finishTime,
            });
            await createBooking({
                cart_id: cart.id,
                guest_name: form.name,
                guest_contact: form.contact,
            });
            mutate('/api/carts');
            setShowThanks(true);
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : "Failed to confirm booking. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSelectPromo = async (promo: DiscountFromApi) => {
        try {
            await updateCartItem(cart.id, { discount_id: promo.id });
            mutate(`/api/carts/${id}`);
            setShoowPromoPopUp(false);
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : "Failed to apply promo. Please try again.");
        }
    };

    const handleRemovePromo = async () => {
        try {
            await updateCartItem(cart.id, { discount_id: null });
            mutate(`/api/carts/${id}`);
        } catch (err) {
            setErrorMessage(err instanceof Error ? err.message : "Failed to remove promo. Please try again.");
        }
    };

    return (
        <>
            <Navigation />
            <main className="warnet-bg min-h-screen px-6 py-12">
                <h1 className="text-3xl font-bold text-ink text-center mb-10">Booking Summary</h1>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="flex flex-col gap-6">
                        <UserSummary />

                        <section className="bg-surface/60 border border-accent/40 rounded-2xl p-8 shadow-xl flex flex-col gap-4">
                            <h2 className="text-2xl font-bold text-ink text-center mb-2">Booking Details</h2>

                            <label className="flex flex-col gap-1 text-sm text-ink/70">
                                Name
                                <input
                                    value={form.name}
                                    onChange={(e) => update("name", e.target.value)}
                                    className="rounded-lg bg-surface border border-accent/40 px-3 py-2 text-ink"
                                    placeholder="Your name"
                                />
                            </label>

                            <label className="flex flex-col gap-1 text-sm text-ink/70">
                                Contact
                                <input
                                    value={form.contact}
                                    onChange={(e) => update("contact", e.target.value)}
                                    className="rounded-lg bg-surface border border-accent/40 px-3 py-2 text-ink"
                                    placeholder="08xxxxxxxxxx"
                                />
                            </label>

                            <label className="flex flex-col gap-1 text-sm text-ink/70">
                                Date
                                <input
                                    type="date"
                                    lang="en-CA"
                                    value={form.date}
                                    onChange={(e) => update("date", e.target.value)}
                                    className="rounded-lg bg-surface border border-accent/40 px-3 py-2 text-ink"
                                />
                            </label>

                            <label className="flex flex-col gap-1 text-sm text-ink/70">
                                Seats
                                <input
                                    type="number"
                                    min={1}
                                    value={form.seatsInput}
                                    onChange={(e) => update("seatsInput", e.target.value)}
                                    onBlur={() => update("seatsInput", String(seats))}
                                    className="rounded-lg bg-surface border border-accent/40 px-3 py-2 text-ink"
                                />
                            </label>

                            <div className="flex gap-4">
                                <label className="flex flex-col gap-1 text-sm text-ink/70 flex-1">
                                    Start
                                    <select
                                        value={form.startTime}
                                        onChange={(e) => update("startTime", e.target.value)}
                                        className="rounded-lg bg-surface border border-accent/40 px-3 py-2 text-ink"
                                    >
                                        {HOUR_OPTIONS.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </label>

                                <label className="flex flex-col gap-1 text-sm text-ink/70 flex-1">
                                    Finish
                                    <select
                                        value={form.finishTime}
                                        onChange={(e) => update("finishTime", e.target.value)}
                                        className="rounded-lg bg-surface border border-accent/40 px-3 py-2 text-ink"
                                    >
                                        {HOUR_OPTIONS.map((t) => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            {duration === 0 && (
                                <p className="text-sm text-red-400">Finish time must be later than start time.</p>
                            )}
                        </section>
                    </div>

                    <div className="flex flex-col gap-6">
                        <RentSummary
                            roomName={room?.name ?? cart.room_id}
                            price={price}
                            seats={seats}
                            duration={duration}
                            total={finalTotal}
                            discountName={selectedPromo?.name}
                            discountValue={discountValue}
                        />

                        <PromoUsedCard
                            selectedPromo={selectedPromo}
                            onClick={() => setShoowPromoPopUp(true)}
                            onRemove={handleRemovePromo}
                        />

                        <button
                            onClick={handleBooked}
                            disabled={!isFormValid || isSubmitting}
                            className="w-full bg-cta hover:brightness-90 disabled:opacity-40 disabled:cursor-not-allowed text-cta-ink font-bold py-3 rounded-full transition"
                        >
                            {isSubmitting ? "Processing..." : "Confirm Booking"}
                        </button>
                    </div>
                </div>
            </main>

            {showPromoPopUp && (
                <PromoPickerPopup
                    promos={promotions}
                    selectedId={cart.discount_id}
                    isLoading={isPromosLoading}
                    onSelect={handleSelectPromo}
                    onClose={() => setShoowPromoPopUp(false)}
                />
            )}

            {showThanks && <CompletePopUp />}
            {errorMessage && (
                <ErrorPopUp message={errorMessage} onClose={() => setErrorMessage(null)} />
            )}
        </>
    );
}