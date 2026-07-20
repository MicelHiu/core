export interface Promo {
    id: string;
    title: string;
    discount: number; //dalam persen
    description?: string;
    validUntil?: string;
}

interface PromoCardProps {
    promo: Promo;
}

export function PromoCard({ promo }: PromoCardProps) {
    return (
        <section className="border border-lilac/40 bg-darkpurple/60 rounded-xl p-6 flex items-center justify-between shadow-sm hover:shadow-md hover:border-lilac transition">
            <div>
                <h3 className="font-semibold text-pale">{promo.title}</h3>
                {promo.description && (
                    <p className="text-pale/60 text-sm mt-1">{promo.description}</p>
                )}
                {promo.validUntil && (
                    <p className="text-pale/40 text-xs mt-1">Valid until: {promo.validUntil}</p>
                )}
            </div>
            <span className="text-2xl font-bold text-lilac shrink-0 ml-4">
                {promo.discount}%
            </span>
        </section>
    );
}