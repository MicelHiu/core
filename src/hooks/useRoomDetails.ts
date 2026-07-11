import { useState, useEffect } from "react";
import { fetchRoomById, Room } from "@/lib/data";

interface useRoomDetailResult {
    room: Room | undefined;
    isLoading: boolean;
    error: string | null;
}

export function useRoomDetail(id: string): useRoomDetailResult {
    const [room, setRoom] = useState<Room | undefined> (undefined);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null> (null);

    useEffect(() => {
        setIsLoading(true);
        fetchRoomById(id).then((data) => {
            if(!data) setError ("Room not found.");
            else setRoom(data);
        })
        .catch(() => setError("Room loading failed. Please try again"))
        .finally(() => setIsLoading(false));
    }, [id]);

    return { room, isLoading, error };
}