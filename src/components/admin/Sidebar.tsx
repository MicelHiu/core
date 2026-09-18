"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H11V11H3V3Z" fill="currentColor" />
                <path d="M13 3H21V11H13V3Z" fill="currentColor" />
                <path d="M3 13H11V21H3V13Z" fill="currentColor" />
                <path d="M13 13H21V21H13V13Z" fill="currentColor" />
            </svg>
        ),
    },
    {
        label: "Visitors",
        href: "/admin/visitors",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12ZM12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
    {
        label: "Promotion Settings",
        href: "/admin/promoSettings",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 4H12L22 14L14 22L4 12V4ZM8 9C8.55228 9 9 8.55228 9 8C9 7.44772 8.55228 7 8 7C7.44772 7 7 7.44772 7 8C7 8.55228 7.44772 9 8 9Z"
                    fill="currentColor"
                />
            </svg>
        ),
    },
];

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push("/login");
    }

    return (
        <aside className="w-64 shrink-0 bg-darkpurple border-r border-lilac/20 flex flex-col">
            <div className="px-6 py-6 border-b border-lilac/20">
                <h1 className="text-xl font-extrabold text-lilac">Admin</h1>
                <p className="text-xs text-pale/60 mt-1">Core Management</p>
            </div>

            <nav className="flex flex-col gap-1 p-4">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                                isActive
                                    ? "bg-purple-light/20 text-lilac"
                                    : "text-pale/70 hover:text-pale hover:bg-purple-light/10"
                            }`}
                        >
                            {item.icon}
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            <div className="mt-auto p-4 border-t border-lilac/20">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-pale/70 hover:text-pale hover:bg-red-500/10 transition-colors"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Logout
                </button>
            </div>
        </aside>
    );
}
