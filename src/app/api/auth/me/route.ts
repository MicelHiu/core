import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SessionData } from "@/lib/auth";
import { backendFetch } from "@/lib/backend";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json(
                {error: 'No active session found'},
                {status: 401}
            );
        }
        const {token} = JSON.parse(sessionCookie.value);

        const res = await backendFetch("/users/current", {
            headers: {Authorization: `Bearer ${token}`},
        });
        return NextResponse.json(await res.json(), {status: res.status});
    } catch (error) {
        return NextResponse.json(
            {error: 'Failed to fetch session'},
            {status: 500}
        );
    }
}