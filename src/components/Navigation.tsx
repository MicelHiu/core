"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Navigation() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    }, []);

    const handleSignOut = () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        setIsLoggedIn(false);
        router.push("/dashboard");
    }

    return (
        <header className="bg-darkpurple relative flex flex-row items-center justify-between w-full border-b border-lilac px-8 py-2">
            <h1 className="font-bold text-pale text-2xl">CORE</h1>

            <nav className="absolute left-1/2 -translate-x-1/2 flex items-center gap-4 text-pale">
                <Link 
                    href="/dashboard"
                    className="text-sm font-medium text-pale hover:text-lilac cursor-pointer"
                >
                    Home
                </Link>
                <Link 
                    href="/rooms"
                    className="text-sm font-medium text-pale hover:text-lilac cursor-pointer"
                >
                    Rooms
                </Link>
                <Link 
                    href="/history"
                    className="text-sm font-medium text-pale hover:text-lilac cursor-pointer"
                >
                    History
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
                <div>
                    <Link
                        href="/dashboard"
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
        </header>
    );
}