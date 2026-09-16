import { formatPrice } from "@/lib/data";
import { DiscountFromApi } from "@/lib/dataRoute";

interface PromoCardProps {
    promo: DiscountFromApi;
}

export function PromoCard({ promo }: PromoCardProps) {
    return (
        <section className="border border-lilac/40 bg-darkpurple/60 rounded-xl p-6 flex items-center justify-between shadow-sm hover:shadow-md hover:border-lilac transition">
            <div>
                <h3 className="font-semibold text-pale">{promo.name}</h3>
                {promo.id && (
                    <p className="text-pale/60 text-sm mt-1">{promo.id}</p>
                )}
                {promo.valid_from && (
                    <p className="text-pale/40 text-xs mt-1">From: {promo.valid_from}</p>
                )}
                {promo.valid_until && (
                    <p className="text-pale/40 text-xs mt-1">Valid until: {promo.valid_until}</p>
                )}
            </div>
            <span className="text-2xl font-bold text-lilac shrink-0 ml-4">
                {formatPrice(promo.value)}
            </span>
        </section>
    );
}