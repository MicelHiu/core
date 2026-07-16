"use client";

import { RentSummary } from "@/components/user/cart/RentSummary"
import UserSummary from "@/components/user/cart/UserSummary"
import { Navigation } from "@/components/user/Navigation"
import { useCurrentUser } from "@/hooks/useCurrentUser"

export default function Cart() {
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