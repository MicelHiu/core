import { Navigation } from "../Navigation";

export function RoomDetailSkeleton() {
    return (
        <>
            <Navigation />
            <main className="flex items-center justify-center min-h-screen">
                <p className="animate-pulse text-pale">Loading...</p>
            </main>
        </>
    )
}