import Image from "next/image";
import Link from "next/link";
import { formatPrice, Room } from "@/lib/data";
import { CartEntry } from "@/lib/dataRoute";

interface CartCardProps {
    item: CartEntry;
    room?: Room;
}

export function CartCard({ item, room }: CartCardProps) {
    return (
        <Link
            href={`/cart/${item.id}`}
            className="group border border-accent/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md bg-surface hover:bg-tint/20 hover:scale-105 transition"
        >
            {room?.image && (
                <Image
                    src={room.image}
                    alt={room.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
            )}
            <div className="p-4">
                <span className="text-xs font-semibold uppercase tracking-widest">{room?.category ?? item.room_id}</span>
                <h3 className="font-semibold text-sm line-clamp-1">{room?.name ?? item.room_id}</h3>
                <p className="font-bold mt-2">{formatPrice(room?.price ?? 0)}/hour</p>
                <p className="text-ink/60 text-xs mt-1">{item.quantity} seat(s)</p>
            </div>
        </Link>
    );
}
