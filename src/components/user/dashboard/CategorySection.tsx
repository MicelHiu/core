import { Room } from "@/lib/data";
import { RoomCard } from "./RoomCard";

interface CategorySectionProps {
    category: string;
    rooms: Room[];
}

export function CategorySection({ category, rooms }: CategorySectionProps){
    const roomsInCategory = rooms.filter((room) => room.category === category).slice(0, 3);

    return (
        <section className="max-w-6xl mx-auto w-full px-6 py-10">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">{category}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {roomsInCategory.map((room) => (
                    <RoomCard key={room.id} room={room} />
                ))}
            </div>
        </section>
    );
}