import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthUser, SessionData } from "@/lib/auth";
import { error } from "console";
import { match } from "assert";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json(
                {message: "Email and password are required."},
                {status: 400}
            );
        }

        const response = await fetch(`https://6a48f516a033dcb98d651649.mockapi.io/users?email=${encodeURIComponent(email)}`, {method: "GET"});

        if(!response.ok) {
            const errorData = await response.json();
            return NextResponse.json(
                {error: errorData.message || 'Failed to Login'},
                {status: response.status}
            );
        }

        const data = await response.json();

        if(!data || data.length === 0) {
            return NextResponse.json(
                {error: "No account detected, please sign in."},
                {status: 404}
            );
        }

        const matchedData = data.find(
            (u: any) => u.email.toLowerCase() === email.toLowerCase()
        );

        //pengecekan password -- BUTUH REVISI NANTI KALAU SUDAH ADA DB
        if(matchedData.password !== password) {
            return NextResponse.json(
                {error: "Wrong email or password"},
                {status: 401}
            )
        }
        const authUser: AuthUser = {
            id_user: matchedData.id_user,
            full_name: matchedData.full_name,
            nickname: matchedData.nickname,
            email: matchedData.email,
            contact: matchedData.contact,
            password: matchedData.password,
            points: matchedData.points,
            role: matchedData.role,
        };

        const sessionData: SessionData = {
            user: authUser,
            token: matchedData.accessToken,
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