import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const user = await getAdminUser();
    if (!user) redirect("/login");

    return (
        <div className="min-h-screen flex bg-darkpurple">
            <Sidebar />
            <main className="flex-1 p-8 text-pale">{children}</main>
        </div>
    );
}
