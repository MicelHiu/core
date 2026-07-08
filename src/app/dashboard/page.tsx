"use client";

import { Navigation } from "@/components/Navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchRooms, fetchCategories, formatPrice, Room } from "@/lib/data";
import Image from "next/image";
import useSWR from "swr";
import { AuthUser } from "@/lib/auth";

const fetcher = (url: string) => 
    fetch(url).then((res) => {
        if(!res.ok) throw new Error(String(res.status));
        return res.json();
});
    
export default function UserDashboard() {
    const [slide, setSlide] = useState(0);
    const [roomList, setRoomList] = useState<Room[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const { data: user, isLoading } = useSWR<AuthUser>('/api/auth/me', fetcher, {
        shouldRetryOnError: false,
        onErrorRetry: (error) => {
            if(error.status === 401) return;
        },
    });
    const isLoggedIn = !!user;

    const featured = roomList.slice(0,4);

    useEffect(() => {
        Promise.all([fetchRooms(), fetchCategories()])
            .then(([rooms, cats]) => {
                setRoomList(rooms);
                setCategories(cats);
            })
            .catch((err) => {
                setError(err instanceof Error ? err : new Error(err.message || 'Room loading failed. Please try again later'));
            })
            .finally (() => setIsPageLoading(false));
    }, []);

    //auto rotate slider setiap 3 detik
    useEffect(() => {
        if(featured.length === 0) return;
        const timer = setInterval(() => {
            setSlide((prev) => (prev + 1) % featured.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [featured.length]);

    if (isLoading || isPageLoading) {
        return (
            <>
                <main className="container text-center py-24 min-h-screen min-w-screen">
                    <p className="text-sm animate-pulse">Setting up the environment, please wait a moment...</p>
                </main>
            </>
        )
    }

    return (
        <>
            <main className="flex flex-col min-h-screen">
                <section className="w-full py-16 px-6 text-center">
                    <h1 className="text-5xl font-bold">Hello {isLoggedIn ? `${user.nickname}` : "Guest"}, Welcome to CORE</h1>
                    <p>Your space to play, connect, and compete.</p>
                </section>

                {/* hero slider */}
                <section className="relative w-full overflow-hidden" style={{height: 300}}>
                    {featured.map((room, i) => (
                        <div
                            key={room.id}
                            className={`absolute inset-0 flex transititon-opacity duration-700 ${i === slide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                        >
                            <Image
                                src={room.image}
                                alt={room.name}
                                className="w-1/2 object-cover"
                                width={800}
                                height={700}
                            />
                            <div className="w-1/2 flex flex-col justify-center px-12 gap-3 bg-purple">
                                <span className="text-xs font-semibold uppercase tracking-widest">
                                    {room.category}
                                </span>
                                <h2 className="text-2xl font-bold">{room.name}</h2>
                                <p className="text-sm line-clamp-3">{room.description}</p>
                                <p className="text-xl font-bold">{formatPrice(room.price)}</p>
                                <Link 
                                    href={`/rooms/${room.id}`}
                                    className="mt-2 w-fit text-sm px-6 py-2 rounded-full hover:opasity-700 transition"
                                >
                                    More Details →
                                </Link>
                            </div>
                        </div>
                    ))};
                    {/* dot indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                        {featured.map((_, i) => (
                            <button 
                                key={i}
                                onClick={() => setSlide(i)}
                                className={`w-2 h-2 rounded-full transition-all ${i === slide ? "bg-lilac" : "bg-darkpurple"}`}
                            />
                        ))}
                    </div>
                </section>

                {/* produk per kategori */}

            </main>
        </>
    )
}