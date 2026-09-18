import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

export async function POST(request: Request) {
    const body = await request.json();

    const res = await backendFetch("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token: body.token, password: body.password }),
    });
    const data = await res.json();
    if (!res.ok) {
        const message = Array.isArray(data.message) ? data.message.join(", ") : data.message;
        return NextResponse.json({ error: message ?? "Failed to reset password" }, { status: res.status });
    }
    return NextResponse.json(data);
}
