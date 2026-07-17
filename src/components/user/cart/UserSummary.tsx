import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Skeleton } from "../dashboard/Skeleton";

export default function UserSummary() {
    const { user, isLoading: isUserLoading } = useCurrentUser();

    if(isUserLoading) return <Skeleton />

    const fields = [
        { label: "Name", value: user?.full_name },
        { label: "Email", value: user?.email },
    ]

    return (
        <section className="max-w-md bg-darkpurple/60 border border-lilac/40 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-pale mb-6 text-center">Your Info</h2>
            {fields.map((fields) => (
                <div key={fields.label} className="flex items-center justify-between border-b border-lilac/30 py-3">
                    <span className="text-sm font-medium text-pale/70">{fields.label}</span>
                    <span className="text-base font-semibold text-pale">{fields.value ?? "-"}</span>
                </div>
            ))}
        </section>
    )
}