import RoomsManager from "@/components/admin/rooms/RoomsManager";

export default function AdminRoomsPage() {
    return (
        <div>
            <h1 className="text-3xl font-extrabold text-ink">Rooms</h1>
            <p className="text-ink/70 mt-2 mb-6">Add, edit, and remove rooms available for booking.</p>
            <RoomsManager />
        </div>
    );
}
