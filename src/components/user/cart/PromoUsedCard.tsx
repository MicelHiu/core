import { formatPrice } from "@/lib/data";
import { DiscountFromApi } from "@/lib/dataRoute";

interface PromoUsedCardProps {
    selectedPromo: DiscountFromApi | null;
    onClick: () => void;
}

export function PromoUsedCard({selectedPromo, onClick }: PromoUsedCardProps) {
    return (
        <button
            onClick={onClick}
            className="max-w-md w-full text-left bg-darkpurple/60 border border-lilac/40 rounded-2xl p-6 shadow-xl hover:border-lilac transition cursor-pointer flex items-center justify-between"
        >
            <div>
                <p className="text-pale/60 text-xs mb-1">Promo</p>
                    {selectedPromo ? (
                        <>
                            <p className="font-semibold text-pale">{selectedPromo.name}</p>
                            <p className="text-lilac text-sm font-bold">{formatPrice(selectedPromo.value)}</p>
                        </>
                    ) : (
                        <p className="font-semibold text-pale/70">Pilih promo</p>
                    )}
            </div>
            <span className="text-pale/60 text-xl">›</span>
        </button>
    );
}