interface DashboardGreetingProps {
    nickname?: string;
}

export function Greeting({ nickname }: DashboardGreetingProps) {
    return (
        <section className="w-full py-16 px-6 text-center">
            <h1 className="text-5xl font-bold">
                Hello {nickname ?? "Guest"}, Welcome to CORE
            </h1>
            <p>Your space to play, connect, and compete.</p>
        </section>
    );
}