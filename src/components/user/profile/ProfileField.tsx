import { Profile } from "@/lib/dataRoute";

interface ProfileProps {
    profile: Profile;
}

export function ProfileField({ label, value }: { label: string; value?: string | number }) {
    return (
        <div className="flex items-center justify-between border-b border-accent/30 py-3">
            <span className="text-sm font-medium text-ink/70">{label}</span>
            <span className="text-base font-semibold text-ink">{value ?? "-"}</span>
        </div>
    );
}

