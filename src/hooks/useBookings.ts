"use client";
import useSWR from "swr";
import { BookingEntry } from "@/lib/dataRoute";

const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
    });

export function useBookings() {
    const { data: bookings, isLoading, error, mutate } = useSWR<BookingEntry[]>(
        "/api/bookings/current",
        fetcher
    );

    return { bookings: bookings ?? [], isLoading, error, mutate };
}

export function useBooking(code: string) {
    const { data: booking, isLoading, error, mutate } = useSWR<BookingEntry>(
        code ? `/api/bookings/${code}` : null,
        fetcher
    );

    return { booking, isLoading, error, mutate };
}
