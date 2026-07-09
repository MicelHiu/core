"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Navigation } from "@/components/user/Navigation";
import { Footer } from "@/components/user/Footer";
import { fetchRoomById, formatPrice, Room } from "@/lib/data";
import Image from "next/image";
import useSWR from "swr";
import { AuthUser } from "@/lib/auth";

const fetcher = (url:string) => fetch(url).then((res) => {
    if(!res.ok) throw new Error(String(res.status));
    return res.json();
});

export default function RoomDetailPage({ params } : {params: Promise<{id: string}>}) {
    const {id} = use(params);
    const router = useRouter();

    const [room, setRoom] = useState<Room | undefined> (undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<String | null> (null);

    const { data: user } = useSWR<AuthUser>("/api/auth/me", fetcher, {
        shouldRetryOnError: false,
        onErrorRetry: (error) => {
            if (error.status === 401) return; // ← abaikan 401
        },
    });
    const isLoggedIn = !!user;

    useEffect(() => {
        fetchRoomById(id).then((data) => {
            if(!data) setError ("Room not found.");
            else setRoom(data);
        })
        .catch(() => setError("Room loading failed. Please try again"))
        .finally(() => setLoading(false));
    }, [id]);

    if(loading) {
        return (
            <>
                <Navigation />
                <main className="flex items-center justify-center min-h-screen">
                    <p className="animate-pulse text-pale">Loading...</p>
                </main>
            </>
        );
    }

    if(!room) {
        return (
            <>
                <Navigation />
                <main className="flex flex-col items-center justify-center min-h-screen">
                    <p className="text-red-500">{error}</p>
                </main>
            </>
        );
    }

    return (
        <>
            <Navigation />
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
                        {/* <button
                        onClick={handleAddToCart}
                        className="mt-4 w-fit bg-black text-white px-8 py-3 rounded-full hover:bg-gray-200 hover:text-black transition text-sm font-semibold cursor-pointer"
                        >
                            Rent Room
                        </button> */}
                    </div>
                </div>
            </main>
        </>
    )
}