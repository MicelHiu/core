import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const MOCK_API = "https://6a48f516a033dcb98d651649.mockapi.io/users";

export async function PUT (request: Request, {params}:{params: Promise<{id:string}>}) {
    const {id} = await params;
    const cookieStore = await cookies();
    if(!cookieStore.get('session')) return NextResponse.json(
        {error: 'No session detected'},
        {status: 401}
    );

    const body = await request.json();
    const res = await fetch(`MOCK_API/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body),
    });
    return NextResponse.json(await res.json());
}

