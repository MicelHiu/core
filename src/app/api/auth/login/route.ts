import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthUser, SessionData } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json(
                {message: "Email and password are required."},
                {status: 400}
            );
        }

        const response = await fetch("https://6a48f516a033dcb98d651649.mockapi.io/users", {
            method: "POST",
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                email,
                password,
                expiresInMins: 60,
            }),
        });

        if(!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                {error: errorData.message || 'Failed to Login'},
                {status: response.status}
            );
        }

        const data = await response.json();

        const authUser: AuthUser = {
            id_user: data.id,
            full_name: data.fullName,
            nickname: data.nickname,
            email: data.email,
            contact: data.contact,
            password: data.password,
            points: data.points,
            role: data.role,
        };

        const sessionData: SessionData = {
            user: authUser,
            token: data.accessToken,
        }

        const cookieStore = await cookies();
        cookieStore.set("session", JSON.stringify(sessionData), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60, // 1 hour
        });
        return NextResponse.json(authUser);
    } catch (error) {
        return NextResponse.json(
            {error: "An error occurred while logging in."},
            {status: 500}
        );
    }
}