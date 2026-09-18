"use client";

import { useState } from "react";
import { useVisitors } from "@/hooks/useVisitors";
import VisitorRowActions from "./VisitorRowActions";
import ActivityLogsModal from "./ActivityLogsModal";
import BookingDetailsModal from "./BookingDetailsModal";

function todayISODate() {
    return new Date().toISOString().slice(0, 10);
}

function daysAgoISODate(days: number) {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString().slice(0, 10);
}

const STATUSES = ["confirmed", "ongoing", "completed", "canceled"] as const;

export default function VisitorsTable() {
    const [from, setFrom] = useState(daysAgoISODate(30));
    const [to, setTo] = useState(todayISODate());
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const { visitors, isLoading, error, refetch } = useVisitors({ from, to });

    const [logsFor, setLogsFor] = useState<{ code: string; status: string } | null>(null);
    const [detailsFor, setDetailsFor] = useState<string | null>(null);

    const countByStatus = new Map<string, number>();
    for (const v of visitors) {
        countByStatus.set(v.bookings.status, (countByStatus.get(v.bookings.status) ?? 0) + 1);
    }

    const filteredVisitors = statusFilter === "all"
        ? visitors
        : visitors.filter((v) => v.bookings.status === statusFilter);

    return (
        <div className="bg-purple-light/10 border border-lilac/20 rounded-xl p-5">
            <div className="flex items-center gap-4 mb-4">
                <label className="text-xs text-pale/60 flex items-center gap-2">
                    From
                    <input
                        type="date"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                        className="bg-purple-light/20 border border-lilac/20 rounded px-2 py-1 text-pale text-xs"
                    />
                </label>
                <label className="text-xs text-pale/60 flex items-center gap-2">
                    To
                    <input
                        type="date"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        className="bg-purple-light/20 border border-lilac/20 rounded px-2 py-1 text-pale text-xs"
                    />
                </label>
            </div>

            <div className="flex items-center gap-2 mb-4 flex-wrap">
                <button
                    onClick={() => setStatusFilter("all")}
                    className={`text-xs font-medium px-3 py-1.5 rounded-full transition-colors ${
                        statusFilter === "all" ? "bg-lilac/20 text-lilac" : "bg-pale/10 text-pale/50"
                    }`}
                >
                    All ({visitors.length})
                </button>
                {STATUSES.map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-full capitalize transition-colors ${
                            statusFilter === status ? "bg-lilac/20 text-lilac" : "bg-pale/10 text-pale/50"
                        }`}
                    >
                        {status} ({countByStatus.get(status) ?? 0})
                    </button>
                ))}
            </div>

            {isLoading && <p className="text-pale/60 text-sm">Loading...</p>}
            {error && <p className="text-red-400 text-sm">Failed to load visitors.</p>}

            {!isLoading && !error && (
                filteredVisitors.length === 0 ? (
                    <p className="text-pale/60 text-sm">No visitors in this range.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="border-b border-lilac/20 text-pale/60">
                                    <th className="py-2 pr-4 font-medium">User ID</th>
                                    <th className="py-2 pr-4 font-medium">Guest Name</th>
                                    <th className="py-2 pr-4 font-medium">Booking Code</th>
                                    <th className="py-2 pr-4 font-medium">Status</th>
                                    <th className="py-2 pr-4 font-medium">Checked In</th>
                                    <th className="py-2 pr-4 font-medium">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredVisitors.map((v) => (
                                    <tr key={v.id} className="border-b border-lilac/10 text-pale">
                                        <td className="py-2 pr-4 truncate max-w-[160px]">{v.user_id}</td>
                                        <td className="py-2 pr-4">{v.guest_name}</td>
                                        <td className="py-2 pr-4">{v.booking_code}</td>
                                        <td className="py-2 pr-4 capitalize">{v.bookings.status}</td>
                                        <td className="py-2 pr-4">{new Date(v.checked_in).toLocaleString("id-ID")}</td>
                                        <td className="py-2 pr-4">
                                            <VisitorRowActions
                                                onOpenLogs={() => setLogsFor({ code: v.booking_code, status: v.bookings.status })}
                                                onOpenDetails={() => setDetailsFor(v.booking_code)}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            )}

            {logsFor && (
                <ActivityLogsModal
                    bookingCode={logsFor.code}
                    currentStatus={logsFor.status}
                    onClose={() => setLogsFor(null)}
                    onStatusChanged={refetch}
                />
            )}

            {detailsFor && (
                <BookingDetailsModal
                    bookingCode={detailsFor}
                    onClose={() => setDetailsFor(null)}
                />
            )}
        </div>
    );
}
