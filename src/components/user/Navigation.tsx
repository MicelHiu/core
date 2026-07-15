"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useSWR, { mutate } from "swr";
import { AuthUser } from "@/lib/auth";
import { useState } from "react";

const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if(!res.ok) throw new Error(String(res.status));
        return res.json();
    });

export function Navigation() {
    const router = useRouter();
    const [error, setError] = useState<string | null> (null);

    const { data: user } = useSWR<AuthUser>("/api/auth/me", fetcher, {
        shouldRetryOnError: false,
    });
    
    const isLoggedIn = !!user;

    const handleSignOut = async() => {
        try {
            await fetch("/api/auth/logout", {method: "POST"});
            await mutate("/api/auth/me", null, false);
            router.push("/dashboard");
        } catch (error) {
            setError("Failed to sign out. Please try again.");
        }
    }

    return (
        <header className="bg-darkpurple relative flex flex-row items-center justify-between w-full border-b border-lilac px-8 py-2">
            <h1 className="font-bold text-pale text-2xl">CORE</h1>

            <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-8 text-pale">
                <Link 
                    href="/dashboard"
                    className="text-sm font-medium text-pale hover:text-lilac cursor-pointer"
                >
                    Home
                </Link>
                <Link 
                    href="/promotion"
                    className="text-sm font-medium text-pale hover:text-lilac cursor-pointer"
                >
                    Promo
                </Link>
                <Link 
                    href="/contact"
                    className="text-sm font-medium text-pale hover:text-lilac cursor-pointer"
                >
                    Contact Us
                </Link>
                <Link 
                    href="/cart"
                    className="text-sm font-medium text-pale hover:text-lilac cursor-pointer"
                >
                    Cart
                </Link>
            </nav>

            { isLoggedIn ? (
                <div className="flex flex-row gap-8">
                    <Link
                        href="/profile"
                        className="text-sm font-medium text-pale hover:text-lilac cursor-pointer"
                    >
                        Profile
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="text-sm font-medium text-pale hover:text-lilac cursor-pointer"
                    >
                        Logout
                    </button>
                </div>
            ) : (
                <Link
                    href="/login"
                    className="text-sm font-medium text-pale hover:text-lilac cursor-pointer"
                >
                    Login
                </Link>
            )}

            {error && (
                <div className="fixed inset-0 bg-pale flex items-center justify-center z-50" onClick={() => setError(null)}>
                    <div className="bg-white rounded-lg p-6 w-80 shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <h3 className="font-semibold text-lg mb-2 text-darkpurple">
                            Something went wrong:
                        </h3>
                        <p className="text-sm text-darkpurple mb-4">{error}</p>
                        <button
                            onClick={() => setError(null)}
                            className="w-full bg-lilac hover:bg-purple text-darkpurple py-2 rounded-md"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}