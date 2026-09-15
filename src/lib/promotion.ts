//promo

import { backendFetch } from "./backend";

export interface DiscountFromApi {
    id: string;
    name: string;
    value: string; // Prisma Decimal dikirim sbg string via JSON
    valid_until: string;
    valid_from: string;
}

export async function getPromotions(): Promise<DiscountFromApi[]> {
    const res = await backendFetch("/discounts");
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