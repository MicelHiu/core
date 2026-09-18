import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const user = await getAdminUser();
    if (!user) redirect("/login");

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-bg">
            <Sidebar />
            <main className="flex-1 min-w-0 p-4 md:p-8 text-ink">{children}</main>
        </div>
    );
}
