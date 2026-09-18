"use client";
import useSWR from "swr";

const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
    });

export interface ActivityLogEntry {
    id: string;
    booking_code: string;
    admin_id: string;
    status: string;
    note: string | null;
    created_at: string;
    users: {
        full_name: string;
        nickname: string;
    };
}

export function useActivityLogs(code: string | null) {
    const key = code ? `/api/admin/bookings/${code}/activity-logs` : null;
    const { data, isLoading, error, mutate } = useSWR<ActivityLogEntry[]>(key, fetcher);

    async function changeStatus(payload: { status: string; note?: string }) {
        if (!code) return;
        const res = await fetch(`/api/bookings/${code}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message ?? "Failed to update status");
        await mutate();
        return data;
    }

    return { logs: data ?? [], isLoading, error, changeStatus };
}
