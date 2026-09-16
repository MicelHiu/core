import { backendFetch } from "@/lib/backend";
import { getSessionToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const token = await getSessionToken();
    if (!token) {
        return NextResponse.json({ error: "No session detected" }, { status: 401 });
    }

    const body = await request.json();
    const res = await backendFetch("/bookings", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}
