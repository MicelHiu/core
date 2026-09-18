"use client";

import Link from "next/link";
import { useVisitors } from "@/hooks/useVisitors";

function todayISODate() {
    return new Date().toISOString().slice(0, 10);
}

export default function VisitorsPreview() {
    const today = todayISODate();
    const { visitors, isLoading, error } = useVisitors({ from: today, to: today });

    return (
        <div className="bg-surface border border-ink/10 shadow-sm rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-ink">Checking in today</h3>
                <Link
                    href="/admin/visitors"
                    className="text-xs font-medium text-accent hover:text-ink transition-colors"
                >
                    See all visitors →
                </Link>
            </div>

            {isLoading && <p className="text-ink/70 text-sm">Loading...</p>}
            {error && <p className="text-red-600 dark:text-red-400 text-sm">Failed to load visitors.</p>}

            {!isLoading && !error && (
                visitors.length === 0 ? (
                    <p className="text-ink/70 text-sm">No visitors checking in today.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="border-b border-ink/10 text-ink/70">
                                    <th className="py-2 pr-4 font-medium">User ID</th>
                                    <th className="py-2 pr-4 font-medium">Guest Name</th>
                                    <th className="py-2 pr-4 font-medium">Booking Code</th>
                                    <th className="py-2 pr-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {visitors.map((v) => (
                                    <tr key={v.id} className="border-b border-ink/5 text-ink">
                                        <td className="py-2 pr-4 truncate max-w-[160px]">{v.user_id}</td>
                                        <td className="py-2 pr-4">{v.guest_name}</td>
                                        <td className="py-2 pr-4">{v.booking_code}</td>
                                        <td className="py-2 pr-4 capitalize">{v.bookings.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            )}
        </div>
    );
}
