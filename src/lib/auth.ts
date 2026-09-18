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

export async function getAdminUser(): Promise<AuthUser | null> {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");
    if (!session) return null;

    try {
        const { user }: SessionData = JSON.parse(session.value);
        return user?.role === "admin" ? user : null;
    } catch {
        return null;
    }
}

