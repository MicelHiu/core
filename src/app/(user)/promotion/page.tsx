"use client";

import { Skeleton } from "@/components/user/dashboard/Skeleton";
import { Navigation } from "@/components/user/Navigation";
import { PromoCard } from "@/components/user/promotion/PromoCard";
import { usePromotions } from "@/hooks/usePromotions";

export default function Promotion() {
    const {promotions, isLoading, error} = usePromotions();

    if(isLoading) {
        return <Skeleton />
    }

    if(error) {
        return <p className="text-center text-red-400">Promotions failed to load. Please try again later...</p>
    }
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