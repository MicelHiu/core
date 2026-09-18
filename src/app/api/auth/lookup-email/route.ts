import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    if (!email) {
        return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const res = await backendFetch(`/auth/lookup-email?email=${encodeURIComponent(email)}`);
    const data = await res.json();
    if (!res.ok) {
        return NextResponse.json({ error: data.message ?? "Email not found" }, { status: res.status });
    }
    return NextResponse.json(data);
}
