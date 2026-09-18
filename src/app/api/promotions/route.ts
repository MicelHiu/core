import { backendFetch } from "@/lib/backend";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    const headers: Record<string, string> = {};
     if (session) {
        const { token } = JSON.parse(session.value);
        headers.Authorization = `Bearer ${token}`;
    }

    try {
        const res = await backendFetch('/discounts', { headers });
        const data = await res.json();
        return NextResponse.json(data, {status: res.status});
    } catch (error) {
        return NextResponse.json(
            {error: 'Failed to fetch data, please try again later'},
            {status: 500}
        );
    }
}

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const session = cookieStore.get('session');
    if(!session) {
        return NextResponse.json(
            {error: 'No session detected'},
            {status: 401}
        );
    }
    const {token} = JSON.parse(session.value);

    try {
        const body = await request.json();
        const res = await backendFetch('/discounts', {
            method: 'POST',
            headers: {Authorization: `Bearer ${token}`},
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return NextResponse.json(data, {status: res.status});
    } catch (error) {
        return NextResponse.json(
            {error: 'Failed to create promotion, please try again later'},
            {status: 500}
        );
    }
}