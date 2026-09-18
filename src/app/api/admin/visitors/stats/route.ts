import { backendFetch } from "@/lib/backend";
import { getSessionToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const token = await getSessionToken();
    if (!token) {
        return NextResponse.json({ error: "No session detected" }, { status: 401 });
    }

    const query = request.nextUrl.searchParams.toString();
    const res = await backendFetch(`/visitors/stats${query ? `?${query}` : ""}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}
