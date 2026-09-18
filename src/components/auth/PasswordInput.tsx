"use client";

import { useState } from "react";

interface PasswordInputProps {
    id?: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    required?: boolean;
    autoComplete?: string;
}

export function PasswordInput({ id, value, onChange, placeholder, className, required, autoComplete = "off" }: PasswordInputProps) {
    const [show, setShow] = useState(false);

    return (
        <div className="relative w-full">
            <input
                id={id}
                type={show ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
                className={className}
            />
            <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/60 hover:text-ink cursor-pointer"
                tabIndex={-1}
            >
                {show ? "🙈" : "👁"}
            </button>
        </div>
    );
}
