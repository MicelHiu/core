"use client";

import { RentSummary } from "@/components/user/cart/RentSummary"
import UserSummary from "@/components/user/cart/UserSummary"
import { Navigation } from "@/components/user/Navigation"
import { useState, useMemo } from "react";
import { useCartStore } from "@/store/CartStore";

const DEMO_ROOM = { name: "PC Regular", price: 10000 };

export default function Cart() {
    const [showThanks, setShowThanks] = useState(false);
    const {items} = useCartStore();
    const room = items[0] ?? DEMO_ROOM;

    const [useProfile, setUseProfile] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [contact, setContact] = useState<string>("");
    const [date, setDate] = useState<string>("");

    const [seats, setSeats] = useState<number>(1);
    const [startTime, setStartTime] = useState("08.00");
    const [finishTime, setFinishTime] = useState<string>("10.00");

    const duration = useMemo(() => {
        const toHour = (t:string) => parseInt(t.split(".")[0], 10);
        const diff = toHour(finishTime) - toHour(startTime);
        return diff > 0 ? diff : 0;
    }, [startTime, finishTime]);

    const total = room.price * seats * duration;

    const handleBooked = () => {
        const payload = { name, email, contact, date, room: room.name, price: room.price, seats, startTime, finishTime, duration, total};
        console.log("Booking payload (statik, belum masuk DB):", payload);
        setShowThanks(true);
    }
    
    return (
        <>
            <Navigation />
            <main className="warnet-bg min-h-screen px-6 py-12">
                <h1 className="text-3xl font-bold text-pale text-center mb-10">Booking Summary</h1>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <UserSummary label="" />
                    <RentSummary />
                </div>
                
            </main>
        </>
    )
}