import Image from "next/image";
import Link from "next/link";
import { formatPrice, Room } from "@/lib/data";
import { CartEntry } from "@/lib/dataRoute";

interface CartCardProps {
    item: CartEntry;
    room?: Room;
    onRemove?: () => void;
    removing?: boolean;
}

export function CartCard({ item, room, onRemove, removing }: CartCardProps) {
    return (
        // tombol Remove di luar <Link> supaya tidak ada elemen interaktif bersarang
        <div className="relative group">
            <Link
                href={`/cart/${item.id}`}
                className="block h-full border border-accent/20 rounded-xl overflow-hidden shadow-sm hover:shadow-md bg-surface hover:bg-tint/20 group-hover:scale-105 transition"
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
            {onRemove && (
                <button
                    onClick={onRemove}
                    disabled={removing}
                    aria-label={`Remove ${room?.name ?? "item"} from cart`}
                    className="absolute top-2 right-2 z-10 rounded-full bg-surface/90 px-3 py-1 text-xs font-semibold text-red-600 dark:text-red-400 shadow hover:bg-red-500/10 transition cursor-pointer disabled:opacity-50 group-hover:scale-105"
                >
                    {removing ? "Removing..." : "Remove"}
                </button>
            )}
        </div>
    );
}
