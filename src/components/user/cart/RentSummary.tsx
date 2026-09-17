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
        <section className="max-w-md bg-darkpurple/60 border border-lilac/40 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-pale mb-6 text-center">Order Summary</h2>
            <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                    <span className="text-pale/70">Room Type</span>
                    <span className="font-semibold text-pale">{roomName}</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-pale/70">Price</span>
                    <span className="font-semibold text-pale">{formatPrice(price)}/hour</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-pale/70">Seats</span>
                    <span className="font-semibold text-pale">{seats}</span>
                </div>

                <div className="flex justify-between text-sm">
                    <span className="text-pale/70">Hour</span>
                    <span className="font-semibold text-pale">{duration}</span>
                </div>

                {!!discountValue && (
                    <div className="flex justify-between text-sm">
                        <span className="text-pale/70">Discount{discountName ? ` (${discountName})`: ""}</span>
                        <span className="font-semibold text-lilac">-{formatPrice(discountValue)}</span>
                    </div>
                )}
                <hr className="border-lilac/30 my-2" />

                <div className="flex justify-between">
                    <span className="font-bold text-pale">Total</span>
                    <span className="font-bold text-pale">{formatPrice(total)}</span>
                </div>
            </div>
        </section>
    )
}