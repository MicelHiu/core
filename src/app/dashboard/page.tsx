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
                    
                </section>
            </main>
        </>
    )
}