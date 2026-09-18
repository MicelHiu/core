"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PasswordInput } from "@/components/auth/PasswordInput";

const inputClass =
    "w-full rounded-lg border border-accent px-4 py-3 pr-10 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent bg-surface text-ink";

function ResetPasswordForm() {
    const token = useSearchParams().get("token");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [done, setDone] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error ?? "Failed to reset password");
            }
            setDone(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <p className="text-sm text-ink/70">
                This reset link is invalid. Please request a new one from the{" "}
                <Link href="/login" className="underline hover:text-accent">login page</Link>.
            </p>
        );
    }

    if (done) {
        return (
            <div className="flex flex-col items-center gap-4">
                <p className="text-sm text-ink">Password changed successfully. Please log in with your new password.</p>
                <Link href="/login" className="w-full rounded-lg bg-cta py-3 font-medium text-cta-ink hover:brightness-90">
                    Log in now
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
            {error && (
                <div className="p-3 bg-red-500 border border-red-300 text-xs font-semibold text-red-200 rounded-xl">
                    ⚠ {error}
                </div>
            )}
            <label className="flex flex-col gap-1 text-sm text-ink/70">
                New password
                <PasswordInput value={password} onChange={setPassword} placeholder="New password" required className={inputClass} />
            </label>
            <label className="flex flex-col gap-1 text-sm text-ink/70">
                Confirm password
                <PasswordInput value={confirmPassword} onChange={setConfirmPassword} placeholder="Re-enter new password" required className={inputClass} />
            </label>
            <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-cta py-3 font-medium text-cta-ink hover:brightness-90 cursor-pointer disabled:opacity-50"
            >
                {loading ? "Saving..." : "Reset Password"}
            </button>
        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <main className="min-h-screen flex items-center justify-center bg-surface px-4">
            <section className="w-full max-w-md rounded-2xl bg-surface p-6 sm:p-12 text-center text-ink shadow-2xl shadow-accent/30 flex flex-col gap-4">
                <h1 className="text-2xl font-extrabold text-accent">Reset Password</h1>
                <Suspense fallback={<p className="text-sm text-ink/70">Loading...</p>}>
                    <ResetPasswordForm />
                </Suspense>
            </section>
        </main>
    );
}
