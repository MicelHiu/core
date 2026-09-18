"use client";

import { useState } from "react";

interface ForgotPasswordModalProps {
    onClose: () => void;
}

export function ForgotPasswordModal({ onClose }: ForgotPasswordModalProps) {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSendLink = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error ?? "Failed to send reset link");
            }
            setSent(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to send reset link. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-surface rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4 text-ink"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-accent">Forgot Password</h2>
                    <button onClick={onClose} className="text-ink/60 hover:text-ink text-xl cursor-pointer">×</button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500 border border-red-300 text-xs font-semibold text-red-200 rounded-xl">
                        ⚠ {error}
                    </div>
                )}

                {!sent ? (
                    <form onSubmit={handleSendLink} className="flex flex-col gap-4">
                        <label className="flex flex-col gap-1 text-sm text-ink/70">
                            Registered email
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                required
                                className="rounded-lg border border-accent px-4 py-3 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent bg-surface text-ink"
                            />
                        </label>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-cta py-3 font-medium text-cta-ink hover:brightness-90 cursor-pointer disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send reset link"}
                        </button>
                    </form>
                ) : (
                    <div className="flex flex-col items-center gap-4 text-center">
                        <p className="text-ink text-sm">
                            If <span className="font-semibold">{email}</span> is registered, we&apos;ve sent a link to reset your password. The link is valid for 15 minutes.
                        </p>
                        <button
                            onClick={onClose}
                            className="w-full rounded-lg bg-cta py-3 font-medium text-cta-ink hover:brightness-90 cursor-pointer"
                        >
                            Back to login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
