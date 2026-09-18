"use client";
import useSWR from "swr";
import { AdminRoom, getAdminRooms } from "@/lib/dataRoute";

export function useAdminRooms() {
    const { data: rooms, isLoading, error, mutate } = useSWR<AdminRoom[]>("/api/rooms", getAdminRooms);

    return {
        rooms: rooms ?? [],
        isLoading,
        error: error ?? null,
        refetch: () => mutate(),
    };
}
