import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

export async function POST(request: Request) {
    const body = await request.json();

    const res = await backendFetch("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: body.email }),
    });
    const data = await res.json();
    if (!res.ok) {
        const message = Array.isArray(data.message) ? data.message.join(", ") : data.message;
        return NextResponse.json({ error: message ?? "Failed to send reset link" }, { status: res.status });
    }
    return NextResponse.json(data);
}
