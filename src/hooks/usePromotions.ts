"use client";
import useSWR from "swr";
import { DiscountFromApi, getPromotions } from "@/lib/dataRoute";

const fetcher = () => getPromotions();

interface usePromotionsResult {
    promotions: DiscountFromApi[];
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
}

export function usePromotions(): usePromotionsResult {
    const { data: promotions, isLoading, error, mutate } = useSWR<DiscountFromApi[]>(
        "/api/promotions",
        fetcher
    );

    return {
        promotions: promotions ?? [],
        isLoading,
        error: error ?? null,
        refetch: () => mutate(),
    };
}
