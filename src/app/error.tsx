"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error("Segment Error:", error);
    }, [error]);

    return (
        <>
            <main className="flex-1 w-full max-w-md mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
                <div className="bg-surface border border-accent rounded-xl p-8 w-full">
                    <span className="text-4xl">⚠️</span>
                    <h1 className="mt-4 text-2xl font-bold text-ink">
                        Something went wrong!
                    </h1>
                    <p className="mt-2 text-sm text-red-600 font-medium">
                        {error.message || "An unexpected error occurred during rendering."}
                    </p>
                    <div className="mt-8 flex gap-4 justify-center">
                        <button
                        onClick={() => reset()}
                        className="px-5 py-2.5 bg-cta hover:brightness-90 text-sm font-semibold text-cta-ink rounded-lg transition-colors cursor-pointer"
                        >
                            Try Again
                        </button>
                        <Link
                            href="/dashboard"
                            className="px-5 py-2.5 bg-cta hover:brightness-90  border border-accent text-sm font-semibold text-cta-ink rounded-lg transition-colors"
                        >
                            Go Home
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
}