"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/user/Navigation";
import { PromoCard } from "@/components/user/promotion/PromoCard";
import { Promo } from "@/components/user/promotion/PromoCard";
import { getPromotions } from "@/lib/promotion";

export default function Promotion() {
    const [promotions, setPromotions] = useState<Promo[]>([]);

    useEffect(() => {
        getPromotions()
            .then(setPromotions)
            .catch(() => setPromotions([]));
    }, []);

    return (
        <>
            <Navigation />
            <main className="warnet-bg min-h-screen flex flex-col px-6 py-12">
                <h1 className="text-3xl font-bold text-pale text-center mb-8">Promo</h1>

                <div className="max-w-2xl w-full mx-auto flex-1 overflow-y-auto max-h-[60vh] flex flex-col gap-4 pr-2">
                    {promotions.length === 0 ? (
                        <p className="text-center text-pale/70">No promo available right now.</p>
                    ) : (
                        promotions.map((promo) => (
                            <PromoCard key={promo.id} promo={promo} />
                        ))
                    )}
                </div>
            </main>
        </>
    );
}