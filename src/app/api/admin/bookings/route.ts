import { backendFetch } from "@/lib/backend";
import { getSessionToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const token = await getSessionToken();
    if (!token) {
        return NextResponse.json({ error: "No session detected" }, { status: 401 });
    }

    const res = await backendFetch("/bookings", {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}
