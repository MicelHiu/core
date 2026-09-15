import { backendFetch } from "@/lib/backend";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");
    if (!session) {
        return NextResponse.json({ error: "No session detected" }, { status: 401 });
    }
    const { token } = JSON.parse(session.value);

    const res = await backendFetch("/users/current", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return NextResponse.json(await res.json(), { status: res.status });
}

