"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/user/Navigation";
import { CartCard } from "@/components/user/cart/CartCard";
import { useCarts } from "@/hooks/useCarts";
import { fetchRooms, Room } from "@/lib/data";
import { deleteCartItem } from "@/lib/dataRoute";

export default function Cart() {
    const { carts, isLoading, mutate } = useCarts();
    const [rooms, setRooms] = useState<Room[]>([]);
    const [removingId, setRemovingId] = useState<string | null>(null);
    const [removeError, setRemoveError] = useState<string | null>(null);

    useEffect(() => {
        fetchRooms().then(setRooms).catch(() => setRooms([]));
    }, []);

    const handleRemove = async (id: string) => {
        if (!confirm("Remove this item from your cart?")) return;
        setRemoveError(null);
        setRemovingId(id);
        try {
            await deleteCartItem(id);
            await mutate();
        } catch (err) {
            setRemoveError(err instanceof Error ? err.message : "Failed to remove cart item. Please try again.");
        } finally {
            setRemovingId(null);
        }
    };

    if (isLoading) {
        return (
            <>
                <Navigation />
                <main className="warnet-bg min-h-screen px-6 py-12">
                    <p className="text-center text-ink/70">Loading cart...</p>
                </main>
            </>
        );
    }

    return (
        <>
            <Navigation />
            <main className="warnet-bg min-h-screen px-4 sm:px-6 py-12">
                <h1 className="text-3xl font-bold text-ink text-center mb-10">Your Cart</h1>

                {removeError && <p className="text-center text-sm text-red-600 dark:text-red-400 mb-6">{removeError}</p>}

                {carts.length === 0 ? (
                    <p className="text-center text-ink/70">Your cart is empty.</p>
                ) : (
                    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {carts.map((item) => (
                            <CartCard
                                key={item.id}
                                item={item}
                                room={rooms.find((r) => r.id === item.room_id)}
                                onRemove={() => handleRemove(item.id)}
                                removing={removingId === item.id}
                            />
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}
