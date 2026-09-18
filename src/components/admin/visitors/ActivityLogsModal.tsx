"use client";

import { useState } from "react";
import { useActivityLogs } from "@/hooks/useActivityLogs";

interface ActivityLogsModalProps {
    bookingCode: string;
    currentStatus: string;
    onClose: () => void;
    onStatusChanged?: () => void;
}

const NEXT_STATUS: Record<string, string[]> = {
    confirmed: ["ongoing", "canceled"],
    ongoing: ["completed"],
    completed: [],
    canceled: [],
};

export default function ActivityLogsModal({ bookingCode, currentStatus, onClose, onStatusChanged }: ActivityLogsModalProps) {
    const { logs, isLoading, error, changeStatus } = useActivityLogs(bookingCode);
    const [status, setStatus] = useState("");
    const [note, setNote] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const availableStatuses = NEXT_STATUS[currentStatus] ?? [];

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!status) return;
        setFormError(null);
        setSubmitting(true);
        try {
            await changeStatus({ status, note: note || undefined });
            setStatus("");
            setNote("");
            onStatusChanged?.();
        } catch (err) {
            setFormError(err instanceof Error ? err.message : "Failed to add activity");
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-darkpurple rounded-2xl p-8 shadow-2xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-lilac">Activity Logs</h2>
                    <button onClick={onClose} className="text-pale/60 hover:text-pale text-xl">×</button>
                </div>

                {isLoading && <p className="text-pale/60 text-sm">Loading...</p>}
                {error && <p className="text-red-400 text-sm">Failed to load activity logs.</p>}

                {!isLoading && !error && (
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="border-b border-lilac/20 text-pale/60">
                                    <th className="py-2 pr-4 font-medium">Date</th>
                                    <th className="py-2 pr-4 font-medium">Status</th>
                                    <th className="py-2 pr-4 font-medium">Note</th>
                                    <th className="py-2 pr-4 font-medium">User</th>
                                </tr>
                            </thead>
                            <tbody>
                                {logs.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-3 text-pale/60">No activity yet.</td>
                                    </tr>
                                ) : (
                                    logs.map((log) => (
                                        <tr key={log.id} className="border-b border-lilac/10 text-pale">
                                            <td className="py-2 pr-4">{new Date(log.created_at).toLocaleString("id-ID")}</td>
                                            <td className="py-2 pr-4 capitalize">{log.status}</td>
                                            <td className="py-2 pr-4">{log.note || "-"}</td>
                                            <td className="py-2 pr-4">{log.users?.full_name ?? "-"}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {availableStatuses.length === 0 ? (
                    <p className="text-pale/60 text-sm">No further status changes available.</p>
                ) : (
                    <form onSubmit={handleSubmit} className="flex items-center gap-3 flex-wrap">
                        <select
                            required
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="bg-purple-light/20 border border-lilac/20 rounded px-2 py-1 text-pale text-sm"
                        >
                            <option value="" disabled className="bg-darkpurple text-pale/60">Activity Type</option>
                            {availableStatuses.map((s) => (
                                <option key={s} value={s} className="bg-darkpurple text-pale capitalize">{s}</option>
                            ))}
                        </select>
                        <input
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Type Note Here..."
                            className="bg-purple-light/20 border border-lilac/20 rounded px-2 py-1 text-pale text-sm flex-1 min-w-[180px]"
                        />
                        <button
                            type="submit"
                            disabled={submitting}
                            className="bg-lilac/20 text-lilac font-medium text-sm px-4 py-1.5 rounded-lg hover:bg-lilac/30 transition-colors disabled:opacity-50"
                        >
                            {submitting ? "Saving..." : "+ Activity"}
                        </button>
                        {formError && <p className="text-red-400 text-sm w-full">{formError}</p>}
                    </form>
                )}
            </div>
        </div>
    );
}
