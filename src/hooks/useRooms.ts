import { useState, useEffect } from "react";
import { fetchRooms, getCategories, Room } from "@/lib/data";

interface useRoomResult {
    rooms: Room[];
    categories: string[];
    isLoading: boolean;
    error: Error | null;
}

export function useRooms(): useRoomResult {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchRooms()
            .then((roomsData) => {
                setRooms(roomsData);
                setCategories(getCategories(roomsData));
            })
            .catch((err) => {
                setError(err instanceof Error ? err : new Error(err.message || 'Room loading failed. Please try again later'));
            })
            .finally (() => setLoading(false));
    }, []);

    return { rooms, categories, isLoading, error}
}