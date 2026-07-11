"use client";

import { Navigation } from "@/components/user/Navigation";
import { Footer } from "@/components/user/Footer";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRooms } from "@/hooks/useRooms";
import { Greeting } from "@/components/user/dashboard/Greeting";
import { Skeleton } from "@/components/user/dashboard/Skeleton";
import { HeroSlider } from "@/components/user/dashboard/HeroSlider";
import { CategorySection } from "@/components/user/dashboard/CategorySection";

export default function UserDashboard() {
    const { user, isLoading: isUserLoading } = useCurrentUser();
    const { rooms, categories, isLoading: isRoomsLoading } = useRooms();

    if (isUserLoading || isRoomsLoading) {
        return <Skeleton />
    }

    const featured = rooms.slice(0,4);

    return (
        <>
            <Navigation />
            <main className="flex flex-col min-h-screen">
                <Greeting nickname={user?.nickname}/>
                <HeroSlider rooms={featured} />
                {categories.map((category) => (
                    <CategorySection key={category} category={category} rooms={rooms} />
                ))}
            </main>
            <Footer />
        </>
    )
}