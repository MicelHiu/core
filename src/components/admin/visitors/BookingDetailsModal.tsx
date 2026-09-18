"use client";

import { useAdminBookingDetail } from "@/hooks/useAdminBookingDetail";
import { formatPrice } from "@/lib/data";

interface BookingDetailsModalProps {
    bookingCode: string;
    onClose: () => void;
}

export default function BookingDetailsModal({ bookingCode, onClose }: BookingDetailsModalProps) {
    const { booking, isLoading, error } = useAdminBookingDetail(bookingCode);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-surface border border-ink/10 rounded-2xl p-8 shadow-xl max-w-md w-full mx-4 max-h-[80vh] overflow-y-auto flex flex-col gap-3"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-ink">Booking Details</h2>
                    <button onClick={onClose} className="text-ink/70 hover:text-ink text-xl">×</button>
                </div>

                {isLoading && <p className="text-ink/70 text-sm">Loading...</p>}
                {error && <p className="text-red-600 dark:text-red-400 text-sm">Failed to load booking details.</p>}

                {booking && (
                    <>
                        <div className="flex justify-between text-sm">
                            <span className="text-ink/70">Booking Code</span>
                            <span className="font-semibold text-ink">{booking.code}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-ink/70">Status</span>
                            <span className="text-xs uppercase font-semibold text-accent">{booking.status}</span>
                        </div>

                        <hr className="border-ink/10 my-2" />

                        <div className="flex justify-between text-sm">
                            <span className="text-ink/70">Room</span>
                            <span className="font-semibold text-ink">{booking.rooms?.name} ({booking.rooms?.type})</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-ink/70">Date</span>
                            <span className="font-semibold text-ink">{new Date(booking.date_play).toLocaleDateString("id-ID")}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-ink/70">Time</span>
                            <span className="font-semibold text-ink">{booking.time_start} - {booking.time_end}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-ink/70">Quantity</span>
                            <span className="font-semibold text-ink">{booking.quantity}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-ink/70">Total Price</span>
                            <span className="font-semibold text-ink">{formatPrice(Number(booking.total_price))}</span>
                        </div>

                        <hr className="border-ink/10 my-2" />

                        <div className="flex justify-between text-sm">
                            <span className="text-ink/70">Guest Name</span>
                            <span className="font-semibold text-ink">{booking.guest_name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-ink/70">Guest Contact</span>
                            <span className="font-semibold text-ink">{booking.guest_contact}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-ink/70">Customer</span>
                            <span className="font-semibold text-ink">{booking.users?.full_name}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
