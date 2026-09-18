"use client";
import useSWR from "swr";

const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
    });

export interface AdminBookingDetail {
    code: string;
    guest_name: string;
    guest_contact: string;
    date_play: string;
    time_start: string;
    time_end: string;
    quantity: number;
    unit_price: string;
    total_price: string;
    status: string;
    rooms: {
        name: string;
        type: string;
        price: string;
        image: string;
    };
    users: {
        full_name: string;
        nickname: string;
        contact: string;
        email: string;
    };
}

export function useAdminBookingDetail(code: string | null) {
    const { data, isLoading, error } = useSWR<AdminBookingDetail>(
        code ? `/api/admin/bookings/${code}` : null,
        fetcher
    );

    return { booking: data ?? null, isLoading, error };
}
