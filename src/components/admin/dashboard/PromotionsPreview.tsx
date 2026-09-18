"use client";

import Link from "next/link";
import { usePromotions } from "@/hooks/usePromotions";
import { formatPrice } from "@/lib/data";

function isActive(validFrom: string, validUntil: string) {
    const now = Date.now();
    return new Date(validFrom).getTime() <= now && now <= new Date(validUntil).getTime();
}

export default function PromotionsPreview() {
    const { promotions, isLoading, error } = usePromotions();

    return (
        <div className="bg-purple-light/10 border border-lilac/20 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-pale">Available Promotions</h3>
                <Link
                    href="/admin/promoSettings"
                    className="text-xs font-medium text-lilac hover:text-pale transition-colors"
                >
                    See all promotions →
                </Link>
            </div>

            {isLoading && <p className="text-pale/60 text-sm">Loading...</p>}
            {error && <p className="text-red-400 text-sm">Failed to load promotions.</p>}

            {!isLoading && !error && (
                promotions.length === 0 ? (
                    <p className="text-pale/60 text-sm">No promotions available.</p>
                ) : (
                    <ul className="flex flex-col divide-y divide-lilac/10">
                        {promotions.map((promo) => {
                            const active = isActive(promo.valid_from, promo.valid_until);
                            return (
                                <li key={promo.id} className="flex items-center justify-between py-3">
                                    <div>
                                        <p className="text-pale font-medium text-sm">{promo.name}</p>
                                        <p className="text-pale/60 text-xs mt-0.5">
                                            {new Date(promo.valid_from).toLocaleDateString("id-ID")} –{" "}
                                            {new Date(promo.valid_until).toLocaleDateString("id-ID")}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-lilac text-sm font-semibold">{formatPrice(promo.value)}</span>
                                        <span
                                            className={`text-[10px] font-medium px-2 py-1 rounded-full ${
                                                active
                                                    ? "bg-lilac/20 text-lilac"
                                                    : "bg-pale/10 text-pale/50"
                                            }`}
                                        >
                                            {active ? "Active" : "Inactive"}
                                        </span>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                )
            )}
        </div>
    );
}
