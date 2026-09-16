"use client";
import useSWR from "swr";
import { CartEntry } from "@/lib/dataRoute";

const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
    });

export function useCarts() {
    const { data: carts, isLoading, error, mutate } = useSWR<CartEntry[]>("/api/carts", fetcher);

    return { carts: carts ?? [], isLoading, error, mutate };
}

export function useCart(id: string) {
    const { data: cart, isLoading, error, mutate } = useSWR<CartEntry>(
        id ? `/api/carts/${id}` : null,
        fetcher
    );

    return { cart, isLoading, error, mutate };
}
