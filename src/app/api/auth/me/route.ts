import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { SessionData } from "@/lib/auth";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie || !sessionCookie.value) {
            return NextResponse.json(
                {error: 'No active session found'},
                {status: 401}
            );
        }

        const sessionData: SessionData = JSON.parse(sessionCookie.value);
        return NextResponse.json(sessionData.user);
    } catch (error) {
        return NextResponse.json(
            {error: 'Failed to fetch session'},
            {status: 500}
        );
    }
}