import { NextResponse } from "next/server";
import { backendFetch } from "@/lib/backend";

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

