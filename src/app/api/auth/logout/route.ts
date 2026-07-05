import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore  = await cookies();
        cookieStore.set('session', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: 'strict',
            path: '/',
            maxAge: 0,
        });
        return NextResponse.json({
            success: true, message: 'Logged out successfully'
        });
    } catch (error) {
        return NextResponse.json(
            {error: 'Failed to Logout'},
            {status: 500}
        );
    }
}