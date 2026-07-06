import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const MOCK_API = "https://6a48f516a033dcb98d651649.mockapi.io/rooms";

export async function GET() {
    try {
        const response = await fetch(MOCK_API);
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            {error: 'Failed to fetch data, please try again later.'},
            {status: 500}
        );
    }
}

