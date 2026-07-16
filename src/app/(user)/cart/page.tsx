"use client";

import { RentSummary } from "@/components/user/cart/RentSummary"
import UserSummary from "@/components/user/cart/UserSummary"
import { Navigation } from "@/components/user/Navigation"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { useState } from "react";
import { useCartStore } from "@/store/CartStore";
import { clear } from "console";

export default function Cart() {
    const [showThanks, setShowThanks] = useState(false);
    const {items, removeFromCart, clearChart, getCartTotal, updateQuantity} = useCartStore();

    const handleCheckout = () => {
        clearChart();
        setShowThanks(true);
    }
    return (
        <>
            <Navigation />
            <main>
                <UserSummary label="" />
                <RentSummary />
                
            </main>
        </>
    )
}