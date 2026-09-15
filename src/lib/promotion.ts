import { Promo } from "@/components/user/promotion/PromoCard";

interface DiscountFromApi {
    id: string;
    name: string;
    value: string; // Prisma Decimal dikirim sbg string via JSON
    valid_until: string;
}

export async function getPromotions(): Promise<Promo[]> {
    const res = await fetch("/api/discounts");
    if (!res.ok) throw new Error("Failed to fetch discounts");

    const data: DiscountFromApi[] = await res.json();

    return data.map((d) => ({
        id: d.id,
        title: d.name,
        discount: Number(d.value),
        validUntil: d.valid_until,
    }));
}