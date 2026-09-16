import { backendFetch } from "./backend";
import { cookies } from "next/headers";

export interface AuthUser {
    id: string;
    full_name: string;
    nickname: string;
    email: string;
    contact: string;
    password: string;
    points: number;
    role: string;
}

export interface SessionData {
    user: AuthUser;
    token: string;
}

export interface RegisterForm {
    full_name: string;
    nickname: string;
    email: string;
    contact: string;
    password: string;
}

export async function getSessionToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");
    if (!session) return null;

    try {
        const { token }: SessionData = JSON.parse(session.value);
        return token ?? null;
    } catch {
        return null;
    }
}

//api helper
//register
export async function registerUser(user: RegisterForm) {
    const payload = {
        ...user,
    }

    const res = await backendFetch('/auth/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user),
    });
    const result = await res.json();
    return {
        ...result,
    };
}

