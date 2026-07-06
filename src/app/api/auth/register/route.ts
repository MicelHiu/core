import { NextResponse } from "next/server";

const MOCK_API = "https://6a48f516a033dcb98d651649.mockapi.io/users";

export async function POST(request: Request) {
    const body = await request.json();
    //validasi input
    if(!body.full_name || !body.nickname || !body.email || !body.contact || !body.password) {
        return NextResponse.json(
            {error: "Data Incomplete, please fill all required fields."},
            {status: 400}
        );
    }

    const res = await fetch(MOCK_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, {status: 201});
}