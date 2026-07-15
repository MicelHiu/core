export function ProfileField({ label, value }: { label: string; value?: string | number }) {
    return (
        <div className="flex items-center justify-between border-b border-lilac/30 py-3">
            <span className="text-sm font-medium text-pale/70">{label}</span>
            <span className="text-base font-semibold text-pale">{value ?? "-"}</span>
        </div>
    );
}

