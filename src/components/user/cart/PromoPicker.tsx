import { formatPrice, formatDateTime } from "@/lib/data";
import { DiscountFromApi } from "@/lib/dataRoute";

interface PromoPickerProps {
    promos: DiscountFromApi[];
    selectedId: string | null;
    isLoading: boolean;
    onSelect: (promo: DiscountFromApi) => void;
    onClose: () => void;
}

export function PromoPickerPopup({ promos, selectedId, isLoading, onSelect, onClose }: PromoPickerProps) {
    return (
        <div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-darkpurple rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lilac text-xl font-bold">Choose your Voucher</h2>
                    <button
                        onClick={onClose}
                        className="text-pale/60 hover:text-pale text-xl leading-none cursor-pointer"
                    >
                        ×
                    </button>
                </div>

                {isLoading && (
                    <p className="text-pale/60 text-sm text-center py-6">Memuat promo...</p>
                )}

                {!isLoading && promos.length === 0 && (
                    <p className="text-pale/60 text-sm text-center py-6">Belum ada promo tersedia.</p>
                )}

                <div className="flex flex-col gap-3">
                    {promos.map((promo) => {
                        const isSelected = promo.id === selectedId;
                        return (
                            <button
                                key={promo.id}
                                onClick={() => onSelect(promo)}
                                className={`text-left border rounded-xl p-4 flex items-center justify-between transition cursor-pointer ${
                                    isSelected
                                        ? "border-lilac bg-lilac/10"
                                        : "border-lilac/40 bg-darkpurple/60 hover:border-lilac"
                                }`}
                            >
                                <div>
                                    <h3 className="font-semibold text-pale">{promo.name}</h3>
                                    {promo.valid_until && (
                                        <p className="text-pale/40 text-xs mt-1">Valid until: {formatDateTime(promo.valid_until)}</p>
                                    )}
                                </div>
                                <span className="text-lg font-bold text-lilac shrink-0 ml-4">
                                    {formatPrice(promo.value)}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}