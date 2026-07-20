import { Navigation } from "@/components/user/Navigation"
import { PromoCard } from "@/components/user/promotion/PromoCard"
import { PROMOTIONS } from "@/lib/promotion"

export default function Promotion() {
    return (
        <>
            <Navigation />
            <main className="warnet-bg min-h-screen flex flex-col px-6 py-12">
                <h1 className="text-3xl font-bold text-pale text-center mb-8">Promo</h1>

                <div className="max-w-2xl w-full mx-auto flex-1 overflow-y-auto max-h-[60vh] flex flex-col gap-4 pr-2">
                    {PROMOTIONS.length === 0 ? (
                        <p className="text-center text-pale/70">No promo available right now.</p>
                    ) : (
                        PROMOTIONS.map((promo) => (
                            <PromoCard key={promo.id} promo={promo} />
                        ))
                    )}
                </div>
            </main>
        </>
    )
}