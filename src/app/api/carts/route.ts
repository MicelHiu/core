import { backendFetch } from "@/lib/backend";
import { getSessionToken } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
    const token = await getSessionToken();
    if (!token) {
        return NextResponse.json({ error: "No session detected" }, { status: 401 });
    }

    const res = await backendFetch("/carts/current", {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}

export async function POST(request: Request) {
    const token = await getSessionToken();
    if (!token) {
        return NextResponse.json({ error: "No session detected" }, { status: 401 });
    }

    const body = await request.json();
    const res = await backendFetch("/carts", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}
