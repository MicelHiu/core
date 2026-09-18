import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const body = await request.json();

    const res = await backendFetch(`/users/${id}`, {
        method: "PATCH",
        body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) {
        return NextResponse.json({ error: data.message ?? "Failed to reset password" }, { status: res.status });
    }
    return NextResponse.json(data);
}
