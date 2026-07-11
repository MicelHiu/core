"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Room, formatPrice } from "@/lib/data";
import { useCartStore } from "@/store/CartStore";

interface RoomInfoProps {
    room: Room;
    isLoggedIn: boolean;
}

export function RoomInfo({ room, isLoggedIn }: RoomInfoProps) {
    const router = useRouter();
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAddToCart = () => {
        if(!isLoggedIn) {
            router.push("/login");
            return;
        }
        addToCart(room);
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
                        className="mt-4 w-fit bg-purple text-pale px-8 py-3 rounded-full hover:bg-lilac hover:text-darkpurple transition text-sm font-semibold cursor-pointer"
                    >
                        {isLoggedIn ? "Book Room" : "Login to Book"}
                    </button>
                </div>
            </div>
        </main>
    );
}