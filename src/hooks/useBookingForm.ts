import { useEffect, useRef, useState } from "react";
import { CartEntry } from "@/lib/dataRoute";

export interface BookingForm {
    name: string;
    contact: string;
    date: string;
    seatsInput: string;
    startTime: string;
    finishTime: string;
}

const initialForm: BookingForm = {
    name: "",
    contact: "",
    date: "",
    seatsInput: "1",
    startTime: "08:00",
    finishTime: "10:00",
};

export function useBookingForm(cart: CartEntry | undefined, user: { full_name?: string; contact?: string } | undefined) {
    const [form, setForm] = useState<BookingForm>(initialForm);
    const seededCartId = useRef<string | null>(null);

    const update = <K extends keyof BookingForm>(key: K, value: BookingForm[K]) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    useEffect(() => {
        if (!user) return;
        setForm((prev) => ({
            ...prev,
            name: user.full_name ?? "",
            contact: user.contact ?? "",
        }));
    }, [user]);

    useEffect(() => {
        if (!cart) return;
        if (seededCartId.current === cart.id) return;
        seededCartId.current = cart.id;
        setForm((prev) => ({
            ...prev,
            seatsInput: String(cart.quantity),
            date: cart.date_play.slice(0, 10),
            startTime: cart.time_start.slice(0, 5),
            finishTime: cart.time_end.slice(0, 5),
        }));
    }, [cart]);

    const seats = Math.max(1, parseInt(form.seatsInput, 10) || 1);

    const duration = (() => {
        const toHour = (t: string) => parseInt(t.split(":")[0], 10);
        const diff = toHour(form.finishTime) - toHour(form.startTime);
        return diff > 0 ? diff : 0;
    })();

    return { form, update, seats, duration };
}