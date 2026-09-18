import { formatPrice } from "@/lib/data";

type RentSummaryProps = {
    roomName: string;
    price: number;
    seats: number;
    duration: number;
    total: number;
    discountName?: string;
    discountValue?: number;
}

export function RentSummary({roomName, price, seats, duration, total, discountName, discountValue}: RentSummaryProps) {
    return (
        <section className="max-w-md bg-surface/60 border border-accent/40 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-ink mb-6 text-center">Order Summary</h2>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                    <span className="text-ink/70">Room Type</span>
                    <span className="font-semibold text-ink">{roomName}</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-ink/70">Price</span>
                    <span className="font-semibold text-ink">{formatPrice(price)}/hour</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-ink/70">Seats</span>
                    <span className="font-semibold text-ink">{seats}</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-ink/70">Hours</span>
                    <span className="font-semibold text-ink">{duration}</span>
                </div>

                {!!discountValue && (
                    <div className="flex justify-between text-sm">
                        <span className="text-ink/70">Discount{discountName ? ` (${discountName})`: ""}</span>
                        <span className="font-semibold text-accent">-{formatPrice(discountValue)}</span>
                    </div>
                )}
                <hr className="border-accent/30 my-2" />

                <div className="flex justify-between">
                    <span className="font-bold text-ink">Total</span>
                    <span className="font-bold text-ink">{formatPrice(total)}</span>
                </div>
            </div>
        </section>
    )
}
