"use client";

import { use } from "react";
import { Navigation } from "@/components/user/Navigation";
import { useRoomDetail } from "@/hooks/useRoomDetails";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { RoomDetailSkeleton } from "@/components/user/room-detail/RoomDetailSkeleton";
import { RoomNotFound } from "@/components/user/room-detail/RoomNotFound";
import { RoomInfo } from "@/components/user/room-detail/RoomInfo";

export default function RoomDetailPage({ params } : {params: Promise<{id: string}>}) {
    const {id} = use(params);
    const { room, isLoading, error } = useRoomDetail(id);
    const { isLoggedIn } = useCurrentUser();

    if (isLoading) {
        return <RoomDetailSkeleton />;
    }

    if (!room) {
        return <RoomNotFound error={error} />;
    }

    return (
        <>
            <Navigation />
            <RoomInfo room={room} isLoggedIn={isLoggedIn} />
        </>
    );
}