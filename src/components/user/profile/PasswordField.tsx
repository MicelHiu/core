import { useState } from "react";

export function PasswordField({ value }: { value?: string }) {
    const [visible, setVisible] = useState(false);

    return (
        <div className="flex items-center justify-between border-b border-lilac/30 py-3">
            <span className="text-sm font-medium text-pale/70">Password</span>
            <div className="flex items-center gap-2">
                <span className="text-base font-semibold text-pale">
                    {visible ? value ?? "-" : "•".repeat(value?.length ?? 8)}
                </span>
                <button
                    type="button"
                    onClick={() => setVisible((v) => !v)}
                    className="text-pale/70 hover:text-lilac transition-colors cursor-pointer"
                    aria-label={visible ? "Hide password" : "Show password"}
                >
                    {visible ? (
                        // eye-off icon
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                            <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                            <line x1="2" y1="2" x2="22" y2="22" />
                        </svg>
                    ) : (
                        // eye icon
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>
                    )}
                </button>
            </div>
        </div>
    );
}