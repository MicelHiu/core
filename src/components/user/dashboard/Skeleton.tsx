import { Navigation } from "@/components/user/Navigation";

export function Skeleton() {
    return (
        <>
            <Navigation />
            <main className="container text-center py-24 min-h-screen min-w-screen">
                <p className="text-sm animate-pulse">
                    Setting up the environment, please wait a moment...
                </p>
            </main>
        </>
    );
}