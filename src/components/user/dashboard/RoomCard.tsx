import Image from "next/image";
import Link from "next/link";
import { Room, formatPrice } from "@/lib/data";

interface RoomCardProps {
    room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
    return (
        <Link 
            key={room.id} href={`/rooms/${room.id}`} className="group border border-accent/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md bg-surface hover:bg-tint/20 hover:scale-105 transition">
            <Image 
                src={room.image} 
                alt={room.name} 
                width={400} 
                height={300} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="p-4">
                <h3 className="font-semibold text-sm line-clamp-1">{room.name}</h3>
                <p className="text-ink/60 text-xs mt-1 line-clamp-2">{room.description}</p>
                <p className="font-bold mt-2">{formatPrice(room.price)}/hour</p>
                <p className="text-ink/60 text-xs mt-1">Stock today: {room.stockToday}</p>
            </div>
        </Link>
    );
}