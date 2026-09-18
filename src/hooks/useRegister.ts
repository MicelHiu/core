import type { RegisterForm } from "@/lib/auth";
import { useState } from "react";

// lewat API route Next (/api/auth/register), bukan langsung ke backend,
// karena lib/auth.ts pakai next/headers (server only)
async function registerUser(user: RegisterForm) {
    const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
    });
    const result = await res.json();
    if (!res.ok) {
        // Nest kirim { message }, API route Next kirim { error }
        const message = Array.isArray(result.message) ? result.message.join(", ") : result.message;
        return { error: message ?? result.error ?? "Registration failed" };
    }
    return result;
}

interface useRegisterResult {
    register: (form: RegisterForm) => Promise<boolean>;
    loading: boolean;
    error: string | null;
}

export function useRegister(): useRegisterResult {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const register = async (form: RegisterForm): Promise<boolean> => {
        setError(null);
        setLoading(true);
        try {
            const result = await registerUser(form);
            if(result.error) throw new Error(result.error);
            return true;
        } catch (err: any) {
            setError(err.message || 'Registration failed. Please try again');
            return false;
        } finally {
            setLoading(false);
        }
    };
    return { register, loading, error };
}