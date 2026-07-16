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
                
                
            </nav>

            { isLoggedIn ? (
                <div className="flex flex-row gap-8">
                    <Link 
                        href="/cart"
                        className="text-sm font-medium text-pale hover:text-lilac cursor-pointer"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
                                fill="currentColor"
                            />
                            <path
                                d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
                                fill="currentColor"
                            />
                            <path
                                d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
                                fill="currentColor"
                            />
                        </svg>
                    </Link>
                    <Link
                        href="/profile"
                        className="text-sm font-medium text-pale hover:text-lilac cursor-pointer"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z"
                                fill="currentColor"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z"
                                fill="currentColor"
                            />
                        </svg>
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