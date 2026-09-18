import { formatPrice, formatDateTime } from "@/lib/data";
import { DiscountFromApi } from "@/lib/dataRoute";

interface PromoCardProps {
    promo: DiscountFromApi;
}

export function PromoCard({ promo }: PromoCardProps) {
    return (
        <section className="border border-accent/40 bg-surface/60 rounded-xl p-6 flex items-center justify-between shadow-sm hover:shadow-md hover:border-accent transition">
            <div>
                <h3 className="font-semibold text-ink">{promo.name}</h3>
                {promo.id && (
                    <p className="text-ink/60 text-sm mt-1">{promo.id}</p>
                )}
                {promo.valid_from && (
                    <p className="text-ink/40 text-xs mt-1">From: {formatDateTime(promo.valid_from)}</p>
                )}
                {promo.valid_until && (
                    <p className="text-ink/40 text-xs mt-1">Valid until: {formatDateTime(promo.valid_until)}</p>
                )}
            </div>
            <span className="text-2xl font-bold text-accent shrink-0 ml-4">
                {formatPrice(promo.value)}
            </span>
        </section>
    );
}