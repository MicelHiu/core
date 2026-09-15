import { backendFetch } from "@/lib/backend";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
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
        const res = await backendFetch('/discounts', {
            headers: {Authorization: 'Bearer ${token'},
        });
        const data = await res.json();
        return NextResponse.json(data, {status: res.status}); 
    } catch (error) {
        return NextResponse.json(
            {error: 'Failed to fetch data, please try again later'},
            {status: 500}
        );
    }
}