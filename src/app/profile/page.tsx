"use client";

import { Skeleton } from "@/components/user/dashboard/Skeleton";
import { Navigation } from "@/components/user/Navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";

function ProfileField({ label, value}: {label: string; value?: string | number}) {
    return (
        <p className=".-4 text-xl font-bold">
            {label}: <span className="text-xl font-semibold">{value ?? '-'}</span>
        </p>
    );
}

export default function Profile() {
    const { user, isLoading: isUserLoading } = useCurrentUser();
    if(isUserLoading) {
        return <Skeleton />
    }

    const fields = [
        {label: "ID", value: user?.id_user},
        {label: "Full Name", value: user?.full_name},
        {label: "Nickname", value: user?.nickname},
        {label: "Email", value: user?.email},
        {label: "Password", value: user?.password},
        {label: "Role", value: user?.role},
        {label: "Points", value: user?.points},
    ];

    return (
        <>
            <Navigation />
            <main className="flex min-h-screen m-20 border border-pale rounded-2xl">
                <section className="flex flex-col mx-20 my-10 items-start">
                    {fields.map((f) => (
                        <ProfileField key={f.label} {...f} />
                    ))}
                </section>
            </main>
        </>
    );
}