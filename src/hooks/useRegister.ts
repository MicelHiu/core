import { RegisterForm, registerUser } from "@/lib/auth";
import { useState } from "react";

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