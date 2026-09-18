"use client";

import { useState } from "react";
import { PasswordInput } from "./PasswordInput";

interface ForgotPasswordModalProps {
    onClose: () => void;
}

type Step = "email" | "password" | "done";

const inputClass =
    "w-full rounded-lg border border-lilac px-4 py-3 pr-10 outline-none transition focus:border-pale focus:ring-2 focus:ring-pale bg-darkpurple text-pale";

export function ForgotPasswordModal({ onClose }: ForgotPasswordModalProps) {
    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFindAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await fetch(`/api/auth/lookup-email?email=${encodeURIComponent(email)}`);
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error ?? "Email tidak ditemukan");
            }
            setUserId(data.id);
            setStep("password");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Email tidak ditemukan");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (password !== confirmPassword) {
            setError("Konfirmasi password tidak cocok.");
            return;
        }
        if (!userId) return;

        setLoading(true);
        try {
            const res = await fetch(`/api/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error ?? "Gagal reset password");
            }
            setStep("done");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Gagal reset password, coba lagi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-darkpurple rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4 text-pale"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-lilac">Forgot Password</h2>
                    <button onClick={onClose} className="text-pale/60 hover:text-pale text-xl cursor-pointer">×</button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-500 border border-red-300 text-xs font-semibold text-red-200 rounded-xl">
                        ⚠ {error}
                    </div>
                )}

                {step === "email" && (
                    <form onSubmit={handleFindAccount} className="flex flex-col gap-4">
                        <label className="flex flex-col gap-1 text-sm text-pale/70">
                            Email terdaftar
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="enter your email address"
                                required
                                className="rounded-lg border border-lilac px-4 py-3 outline-none transition focus:border-pale focus:ring-2 focus:ring-pale bg-darkpurple text-pale"
                            />
                        </label>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-purple py-3 font-medium text-pale hover:bg-lilac hover:text-darkpurple cursor-pointer disabled:opacity-50"
                        >
                            {loading ? "Mencari..." : "Cari akun"}
                        </button>
                    </form>
                )}

                {step === "password" && (
                    <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
                        <label className="flex flex-col gap-1 text-sm text-pale/70">
                            Password baru
                            <PasswordInput
                                value={password}
                                onChange={setPassword}
                                placeholder="Password baru"
                                required
                                className={inputClass}
                            />
                        </label>
                        <label className="flex flex-col gap-1 text-sm text-pale/70">
                            Konfirmasi password
                            <PasswordInput
                                value={confirmPassword}
                                onChange={setConfirmPassword}
                                placeholder="Ulangi password baru"
                                required
                                className={inputClass}
                            />
                        </label>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-purple py-3 font-medium text-pale hover:bg-lilac hover:text-darkpurple cursor-pointer disabled:opacity-50"
                        >
                            {loading ? "Menyimpan..." : "Reset Password"}
                        </button>
                    </form>
                )}

                {step === "done" && (
                    <div className="flex flex-col items-center gap-4 text-center">
                        <p className="text-pale text-sm">Password berhasil diubah, silakan login dengan password baru.</p>
                        <button
                            onClick={onClose}
                            className="w-full rounded-lg bg-purple py-3 font-medium text-pale hover:bg-lilac hover:text-darkpurple cursor-pointer"
                        >
                            Login sekarang
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
