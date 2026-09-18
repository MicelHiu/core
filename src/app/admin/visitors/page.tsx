import VisitorStatusCards from "@/components/admin/visitors/VisitorStatusCards";
import VisitorsTable from "@/components/admin/visitors/VisitorsTable";

export default function AdminVisitorsPage() {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-extrabold text-lilac">Visitors</h1>
                <p className="text-pale/70 mt-2">List of site visitors/users.</p>
            </div>
            <VisitorStatusCards />
            <VisitorsTable />
        </div>
    );
}
