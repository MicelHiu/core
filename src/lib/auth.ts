export interface AuthUser {
    id_user: number;
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

//api helper
//register
export async function registerUser(user: RegisterForm) {
    const payload = {
        ...user,
    }

    const res = await fetch('/api/auth/resgister', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user),
    });
    const result = await res.json();
    return {
        ...result,
    };
}