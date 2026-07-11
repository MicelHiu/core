import { Navigation } from "../Navigation";

interface RoomNotFoundProps {
    error: string|null;
}

export function RoomNotFound({ error }: RoomNotFoundProps) {
    return (
        <>
            <Navigation />
            <main className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-red-500">{error}</p>
            </main>
        </>
    );
}