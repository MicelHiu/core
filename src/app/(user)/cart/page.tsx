"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/user/Navigation";
import { CartCard } from "@/components/user/cart/CartCard";
import { useCarts } from "@/hooks/useCarts";
import { fetchRooms, Room } from "@/lib/data";

export default function Cart() {
    const { carts, isLoading } = useCarts();
    const [rooms, setRooms] = useState<Room[]>([]);

    useEffect(() => {
        fetchRooms().then(setRooms).catch(() => setRooms([]));
    }, []);

    if (isLoading) {
        return (
            <>
                <Navigation />
                <main className="warnet-bg min-h-screen px-6 py-12">
                    <p className="text-center text-pale/70">Memuat cart...</p>
                </main>
            </>
        );
    }

    return (
        <>
            <Navigation />
            <main className="warnet-bg min-h-screen px-6 py-12">
                <h1 className="text-3xl font-bold text-pale text-center mb-10">Your Cart</h1>

                {carts.length === 0 ? (
                    <p className="text-center text-pale/70">Cart kamu masih kosong.</p>
                ) : (
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6">
                        {carts.map((item) => (
                            <CartCard
                                key={item.id}
                                item={item}
                                room={rooms.find((r) => r.id === item.room_id)}
                            />
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}
