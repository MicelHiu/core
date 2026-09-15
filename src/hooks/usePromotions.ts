import { DiscountFromApi, getPromotions } from "@/lib/promotion";
import { useEffect, useState } from "react";

interface usePromotionsResult {
    promotions: DiscountFromApi[];
    isLoading: boolean;
    error: Error | null;
}

export function usePromotions(): usePromotionsResult {
    const [promotions, setPromotions] = useState<DiscountFromApi[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);
    
    useEffect(() => {
        getPromotions()
            .then(setPromotions)
            .catch((err) => {
                setError(err instanceof Error ? err: new Error("Failed to load promotions"));
            })
            .finally(() => setLoading(false));
    }, []);

    return { promotions, isLoading, error};
}