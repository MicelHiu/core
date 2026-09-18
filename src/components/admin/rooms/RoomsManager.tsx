"use client";

import { useState } from "react";
import { useAdminRooms } from "@/hooks/useAdminRooms";
import { AdminRoom, RoomType, createRoom, deleteRoom, updateRoom } from "@/lib/dataRoute";
import { formatPrice } from "@/lib/data";

const inputClass = "bg-bg border border-ink/15 rounded px-2 py-1 text-ink text-sm";

const emptyForm = {
    id: "",
    name: "",
    description: "",
    price: "",
    image: "",
    type: "PC" as RoomType,
    stock: "",
};

export default function RoomsManager() {
    const { rooms, isLoading, error, refetch } = useAdminRooms();
    const [form, setForm] = useState(emptyForm);
    // null = mode tambah, selain itu = id room yang sedang diedit
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formError, setFormError] = useState<string | null>(null);
    const [listError, setListError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    function setField<K extends keyof typeof emptyForm>(key: K, value: (typeof emptyForm)[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    function startEdit(room: AdminRoom) {
        setEditingId(room.id);
        setFormError(null);
        setForm({
            id: room.id,
            name: room.name,
            description: room.description,
            price: String(Number(room.price)),
            image: room.image,
            type: room.type,
            stock: String(room.stock),
        });
    }

    function resetForm() {
        setEditingId(null);
        setForm(emptyForm);
        setFormError(null);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setFormError(null);
        setSubmitting(true);
        const payload = {
            name: form.name,
            description: form.description,
            price: Number(form.price),
            image: form.image,
            type: form.type,
            stock: Number(form.stock),
        };
        try {
            if (editingId) {
                await updateRoom(editingId, payload);
            } else {
                await createRoom({ id: form.id, ...payload });
            }
            resetForm();
            refetch();
        } catch (err) {
            setFormError(err instanceof Error ? err.message : "Failed to save room");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete(room: AdminRoom) {
        if (!confirm(`Delete "${room.name}"?`)) return;
        setListError(null);
        try {
            await deleteRoom(room.id);
            if (editingId === room.id) resetForm();
            refetch();
        } catch (err) {
            setListError(err instanceof Error ? err.message : "Failed to delete room");
        }
    }

    return (
        <div className="flex flex-col gap-6">
            <form
                onSubmit={handleSubmit}
                className="bg-surface border border-ink/10 shadow-sm rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end"
            >
                <h2 className="sm:col-span-2 lg:col-span-4 text-sm font-semibold text-ink">
                    {editingId ? `Edit room: ${editingId}` : "Add a new room"}
                </h2>
                <label className="text-xs text-ink/70 flex flex-col gap-1">
                    ID
                    <input
                        required
                        disabled={!!editingId}
                        value={form.id}
                        onChange={(e) => setField("id", e.target.value.toLowerCase())}
                        placeholder="e.g. pc-vip-01"
                        className={`${inputClass} disabled:opacity-60`}
                    />
                </label>
                <label className="text-xs text-ink/70 flex flex-col gap-1">
                    Name
                    <input required value={form.name} onChange={(e) => setField("name", e.target.value)} className={inputClass} />
                </label>
                <label className="text-xs text-ink/70 flex flex-col gap-1">
                    Type
                    <select value={form.type} onChange={(e) => setField("type", e.target.value as RoomType)} className={inputClass}>
                        <option value="PC">PC</option>
                        <option value="PS">PS</option>
                    </select>
                </label>
                <label className="text-xs text-ink/70 flex flex-col gap-1">
                    Price / hour (IDR)
                    <input
                        required
                        type="number"
                        min={0}
                        value={form.price}
                        onChange={(e) => setField("price", e.target.value)}
                        className={inputClass}
                    />
                </label>
                <label className="text-xs text-ink/70 flex flex-col gap-1">
                    Seats
                    <input
                        required
                        type="number"
                        min={0}
                        step={1}
                        value={form.stock}
                        onChange={(e) => setField("stock", e.target.value)}
                        className={inputClass}
                    />
                </label>
                <label className="text-xs text-ink/70 flex flex-col gap-1 sm:col-span-2 lg:col-span-3">
                    Image URL
                    <input
                        required
                        type="url"
                        value={form.image}
                        onChange={(e) => setField("image", e.target.value)}
                        placeholder="https://..."
                        className={inputClass}
                    />
                </label>
                <label className="text-xs text-ink/70 flex flex-col gap-1 sm:col-span-2 lg:col-span-4">
                    Description
                    <textarea
                        required
                        rows={2}
                        value={form.description}
                        onChange={(e) => setField("description", e.target.value)}
                        className={inputClass}
                    />
                </label>
                <div className="sm:col-span-2 lg:col-span-4 flex gap-3">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-cta text-cta-ink font-medium text-sm py-2 rounded-lg hover:brightness-90 transition-colors disabled:opacity-50"
                    >
                        {submitting ? "Saving..." : editingId ? "Save Changes" : "Add Room"}
                    </button>
                    {editingId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-4 text-sm font-medium rounded-lg border border-ink/15 text-ink/70 hover:text-ink transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>
                {formError && <p className="sm:col-span-2 lg:col-span-4 text-red-600 dark:text-red-400 text-sm">{formError}</p>}
            </form>

            <div className="bg-surface border border-ink/10 shadow-sm rounded-xl p-5">
                {isLoading && <p className="text-ink/70 text-sm">Loading...</p>}
                {error && <p className="text-red-600 dark:text-red-400 text-sm">Failed to load rooms.</p>}
                {listError && <p className="text-red-600 dark:text-red-400 text-sm mb-3">{listError}</p>}

                {!isLoading && !error && (
                    rooms.length === 0 ? (
                        <p className="text-ink/70 text-sm">No rooms yet.</p>
                    ) : (
                        <ul className="flex flex-col divide-y divide-ink/10">
                            {rooms.map((room) => (
                                <li key={room.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-3 gap-3">
                                    <div className="flex items-center gap-3 min-w-0">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={room.image} alt="" className="w-14 h-14 rounded-lg object-cover shrink-0 bg-bg" />
                                        <div className="min-w-0">
                                            <p className="text-ink font-medium text-sm truncate">{room.name}</p>
                                            <p className="text-ink/70 text-xs mt-0.5">
                                                {room.id} · {room.type} · {room.stock} seat(s)
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-accent text-sm font-semibold">{formatPrice(Number(room.price))}/hour</span>
                                        <button
                                            onClick={() => startEdit(room)}
                                            className="text-[10px] font-medium px-2 py-1 rounded-full bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(room)}
                                            className="text-[10px] font-medium px-2 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )
                )}
            </div>
        </div>
    );
}
