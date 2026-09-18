"use client";
import useSWR from "swr";

const fetcher = (url: string) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
    });

interface AdminBookingEntry {
    room_id: string;
}

interface RoomEntry {
    id: string;
    name: string;
}

export interface RoomBookingCount {
    room: string;
    bookings: number;
}

export function useRoomBookingStats() {
    const { data: bookings, isLoading: bookingsLoading, error: bookingsError } = useSWR<AdminBookingEntry[]>(
        "/api/admin/bookings",
        fetcher
    );
    const { data: rooms, isLoading: roomsLoading, error: roomsError } = useSWR<RoomEntry[]>(
        "/api/rooms",
        fetcher
    );

    const isLoading = bookingsLoading || roomsLoading;
    const error = bookingsError ?? roomsError;

    let stats: RoomBookingCount[] = [];
    if (bookings && rooms) {
        const roomNameById = new Map(rooms.map((room) => [room.id, room.name]));
        const countByRoom = new Map<string, number>();
        for (const booking of bookings) {
            countByRoom.set(booking.room_id, (countByRoom.get(booking.room_id) ?? 0) + 1);
        }
        stats = Array.from(countByRoom.entries())
            .map(([roomId, count]) => ({
                room: roomNameById.get(roomId) ?? roomId,
                bookings: count,
            }))
            .sort((a, b) => b.bookings - a.bookings);
    }

    return { stats, isLoading, error };
}
