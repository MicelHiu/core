import { formatPrice } from "@/lib/data";
import { DiscountFromApi } from "@/lib/dataRoute";

interface PromoUsedCardProps {
    selectedPromo: DiscountFromApi | null;
    onClick: () => void;
    onRemove?: () => void;
}

export function PromoUsedCard({selectedPromo, onClick, onRemove }: PromoUsedCardProps) {
    return (
        <div className="max-w-md w-full bg-surface/60 border border-accent/40 rounded-2xl p-6 shadow-xl hover:border-accent transition flex items-center justify-between">
            <button onClick={onClick} className="text-left flex-1 cursor-pointer">
                <p className="text-ink/60 text-xs mb-1">Promo</p>
                    {selectedPromo ? (
                        <>
                            <p className="font-semibold text-ink">{selectedPromo.name}</p>
                            <p className="text-accent text-sm font-bold">{formatPrice(selectedPromo.value)}</p>
                        </>
                    ) : (
                        <p className="font-semibold text-ink/70">Choose a promo</p>
                    )}
            </button>
            <div className="flex items-center gap-3">
                {selectedPromo && onRemove && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove();
                        }}
                        className="text-ink/60 hover:text-red-400 text-sm font-semibold cursor-pointer"
                    >
                        Remove
                    </button>
                )}
                <button onClick={onClick} className="text-ink/60 text-xl cursor-pointer">›</button>
            </div>
        </div>
    );
}