"use client";
import useSWR from "swr";

const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
    });

export interface VisitorStat {
    month?: number;
    day?: number;
    year?: number;
    count: number;
}

export interface VisitorEntry {
    id: string;
    booking_code: string;
    user_id: string;
    guest_name: string;
    checked_in: string | null;
    created_at: string;
    bookings: {
        code: string;
        room_id: string;
        date_play: string;
        status: string;
    };
}

export function useVisitorStats(params: { groupBy: "day" | "month" | "year"; year: number }) {
    const query = new URLSearchParams({
        groupBy: params.groupBy,
        year: String(params.year),
    }).toString();

    const { data: stats, isLoading, error } = useSWR<VisitorStat[]>(
        `/api/admin/visitors/stats?${query}`,
        fetcher
    );

    return { stats: stats ?? [], isLoading, error };
}

export function useVisitors(params: { from?: string; to?: string; search?: string }) {
    const entries: [string, string][] = [];
    if (params.from) entries.push(["from", params.from]);
    if (params.to) entries.push(["to", params.to]);
    if (params.search) entries.push(["search", params.search]);
    const query = new URLSearchParams(entries).toString();

    const { data: visitors, isLoading, error, mutate } = useSWR<VisitorEntry[]>(
        `/api/admin/visitors${query ? `?${query}` : ""}`,
        fetcher
    );

    return { visitors: visitors ?? [], isLoading, error, refetch: () => mutate() };
}
