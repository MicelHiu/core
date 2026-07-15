"use client";

import { useState } from "react";
import { Skeleton } from "@/components/user/dashboard/Skeleton";
import { Navigation } from "@/components/user/Navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { ProfileField } from "@/components/user/profile/ProfileField";
import { PasswordField } from "@/components/user/profile/PasswordField";

export default function Profile() {
    const { user, isLoading: isUserLoading } = useCurrentUser();

    if (isUserLoading) return <Skeleton />;

    const fields = [
        { label: "ID", value: user?.id_user },
        { label: "Full Name", value: user?.full_name },
        { label: "Nickname", value: user?.nickname },
        { label: "Email", value: user?.email },
        { label: "Role", value: user?.role },
        { label: "Points", value: user?.points },
    ];

    return (
        <>
            <Navigation />
            <main className="warnet-bg min-h-screen flex items-center justify-center px-4 py-16">
                <section className="w-full max-w-md bg-darkpurple/60 border border-lilac/40 rounded-2xl p-8 shadow-xl">
                    <h2 className="text-2xl font-bold text-pale mb-6 text-center">My Profile</h2>
                    <div className="flex flex-col">
                        {fields.map((f) => (
                            <ProfileField key={f.label} {...f} />
                        ))}
                        <PasswordField value={user?.password} />
                    </div>
                </section>
            </main>
        </>
    );
}