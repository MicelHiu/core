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