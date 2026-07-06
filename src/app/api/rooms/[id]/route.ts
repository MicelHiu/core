import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const MOCK_API = "https://6a48f516a033dcb98d651649.mockapi.io/rooms";

export async function GET(
    request: Request, 
    { params }: {params: Promise<{ id: string }> }
) {
    const {id} = await params;
    const res = await fetch(`${MOCK_API}/${id}`);
    if(!res.ok) {
        return NextResponse.json({ error: 'Not found'}, {status: 404});
    }

    const data = await res.json();
    return NextResponse.json(data);
}

