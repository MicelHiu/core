import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";
import { getSessionToken } from "@/lib/auth";

export async function GET() {
    try {
        const response = await backendFetch('/rooms');
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            {error: 'Failed to fetch data, please try again later.'},
            {status: 500}
        );
    }
}

export async function POST(request: Request) {
    const token = await getSessionToken();
    if (!token) {
        return NextResponse.json({ error: "No session detected" }, { status: 401 });
    }

    const body = await request.json();
    const res = await backendFetch('/rooms', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}

