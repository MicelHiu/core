import { useCurrentUser } from "@/hooks/useCurrentUser";
import { Skeleton } from "../dashboard/Skeleton";

export default function UserSummary({label, value}: {label:string; value?: string | number}) {
    const { user, isLoading: isUserLoading } = useCurrentUser();

    if(isUserLoading) return <Skeleton />

    const fields = [
        { label: "Name", value: user?.full_name },
        { label: "Email", value: user?.email },
    ]

    return (
        <div className="flex items-center justify-between border-b border-lilac/30 py-3">
            <span className="text-sm font-medium text-pale/70">{label}</span>
            <span className="text-base font-semibold text-pale">{value ?? "-"}</span>
        </div>
    )
}