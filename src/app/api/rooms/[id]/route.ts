import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";
import { getSessionToken } from "@/lib/auth";

export async function GET(
    request: Request,
    { params }: {params: Promise<{ id: string }> }
) {
    const {id} = await params;
    const res = await backendFetch(`/rooms/${id}`);
    if(!res.ok) {
        return NextResponse.json({ error: 'Not found'}, {status: 404});
    }

    const data = await res.json();
    return NextResponse.json(data);
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const token = await getSessionToken();
    if (!token) {
        return NextResponse.json({ error: "No session detected" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const res = await backendFetch(`/rooms/${id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const token = await getSessionToken();
    if (!token) {
        return NextResponse.json({ error: "No session detected" }, { status: 401 });
    }

    const { id } = await params;
    const res = await backendFetch(`/rooms/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}
