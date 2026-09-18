import PromotionsManager from "@/components/admin/promotions/PromotionsManager";

export default function AdminPromoSettingsPage() {
    return (
        <div>
            <h1 className="text-3xl font-extrabold text-lilac">Promotion Settings</h1>
            <p className="text-pale/70 mt-2 mb-6">Manage discount and promotion rules here.</p>
            <PromotionsManager />
        </div>
    );
}
