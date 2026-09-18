import VisitorsChart from "@/components/admin/dashboard/VisitorsChart";
import RoomBookingChart from "@/components/admin/dashboard/RoomBookingChart";
import VisitorsPreview from "@/components/admin/dashboard/VisitorsPreview";
import PromotionsPreview from "@/components/admin/dashboard/PromotionsPreview";

export default function AdminDashboardPage() {
    return (
        <div className="flex flex-col gap-10">
            <div>
                <h1 className="text-3xl font-extrabold text-lilac">Dashboard</h1>
                <p className="text-pale/70 mt-2">Overview of platform activity.</p>
            </div>

            <section>
                <h2 className="text-xl font-bold text-lilac mb-4">Statistics</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <VisitorsChart />
                    <RoomBookingChart />
                </div>
            </section>

            <section>
                <h2 className="text-xl font-bold text-lilac mb-4">Today&apos;s Visitors</h2>
                <VisitorsPreview />
            </section>

            <section>
                <h2 className="text-xl font-bold text-lilac mb-4">Promotions</h2>
                <PromotionsPreview />
            </section>
        </div>
    );
}
