//promo

import { backendFetch } from "./backend";

//promo
export interface DiscountFromApi {
    id: string;
    name: string;
    value: number; // Prisma Decimal dikirim sbg string via JSON
    valid_until: string;
    valid_from: string;
}

export async function getPromotions(): Promise<DiscountFromApi[]> {
    const res = await fetch("/api/promotions");
    if (!res.ok) throw new Error("Failed to fetch discounts");

    const data: DiscountFromApi[] = await res.json();

    return data.map((d) => ({
        id: d.id,
        name: d.name,
        value: d.value,
        valid_until: d.valid_until,
        valid_from: d.valid_from
    }));
}

//profile
export interface Profile {
    id: string;
    full_name: string;
    nickname: string;
    email: string;
    role: string;
    points: number;
    password: string;
}

export async function getProfile(): Promise<Profile[]> {
    const res = await fetch("/api/auth/me");
    if (!res.ok) throw new Error("Failed to fetch profile. Please log in again");

    const data: Profile[] = await res.json();

    return data.map((d) => ({
        id: d.id,
        full_name: d.full_name,
        nickname: d.nickname,
        email: d.email,
        role: d.role,
        points: d.points,
        password: d.password
    }));
}