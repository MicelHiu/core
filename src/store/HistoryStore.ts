import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface BookingHistoryItem {
    id: string; // pakai crypto.randomUUID() untuk sekarang
    roomName: string;
    price: number;
    seats: number;
    startTime: string;
    finishTime: string;
    duration: number;
    total: number;
    name: string;
    email: string;
    contact: string;
    date: string;
    bookedAt: string; //ISO timestamp, buat sorting nanti
}

interface HistoryStore {
    bookings: BookingHistoryItem[];
    addBooking: (booking: Omit<BookingHistoryItem, "id"|"bookedAt">) => void;
}

export const useHistoryStore = create<HistoryStore>()(
    persist(
        (set, get) => ({
            bookings: [],

            addBooking: (booking) => {
                //TODO API: nanti isi function ini jadi:
                //   const res = await fetch("/api/bookings", { method: "POST", body: JSON.stringify(booking) });
                //   const saved = await res.json();
                //   set({ bookings: [saved, ...get().bookings] });
                // dan addBooking jadi async.
                const newBooking: BookingHistoryItem = {
                    ...booking,
                    id: crypto.randomUUID(),
                    bookedAt: new Date().toISOString(),
                };
                set({ bookings: [newBooking, ...get().bookings] });
            },
        }),
        {
            name: "core_history", //key di localStorage
        }
    )
);