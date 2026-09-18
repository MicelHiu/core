"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Room, formatPrice } from "@/lib/data";
import { createCartItem } from "@/lib/dataRoute";
import { useToast } from "@/hooks/useToast";
import { Toast } from "../Toast";
import { mutate } from "swr";

interface RoomInfoProps {
    room: Room;
    isLoggedIn: boolean;
}

export function RoomInfo({ room, isLoggedIn }: RoomInfoProps) {
    const router = useRouter();
    const { message, showToast } = useToast();
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            router.push("/login");
            return;
        }

        setIsAdding(true);
        try {
            const today = new Date().toISOString().slice(0, 10);
            await createCartItem({
                room_id: room.id,
                quantity: 1,
                date_play: today,
                time_start: "08:00",
                time_end: "10:00",
            });
            mutate('/api/carts');
            showToast(`${room.name} added to cart!`);
        } catch {
            showToast("Failed to add to cart. Please try again.");
        } finally {
            setIsAdding(false);
        }
    }

    return (
        <main className="max-w-5xl w-full px-6 py-12 min-h-screen mx-auto align-center">
            <button
                onClick={() => router.back()}
                className=" mb-8 flex items-center gap-1 cursor-pointer hover:underline"
            >
                ← Back
            </button>

            <div className="flex flex-col md:flex-row gap-12">
                <Image
                    src={room.image}
                    alt={room.name}
                    className="w-full md:w-1/2 h-80 object-cover rounded-2xl shadow"
                    width={600}
                    height={400}
                />
                <div className="flex flex-col justify-center gap-4">
                    <span className="text-xs font-semibold uppercase tracking-widest ">
                        category: {room.category}
                    </span>
                    <h1 className="text-3xl font-bold">{room.name}</h1>
                    <p className="text-sm leading-relaxed">{room.description}</p>
                    <p className="text-2xl font-bold">{formatPrice(room.price)}/hour</p>
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className="mt-4 w-fit bg-cta text-cta-ink px-8 py-3 rounded-full hover:brightness-90 transition text-sm font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {!isLoggedIn ? "Login to Book" : isAdding ? "Adding..." : "Book Room"}
                    </button>
                </div>
            </div>
            <Toast message={message} />
        </main>
    );
}