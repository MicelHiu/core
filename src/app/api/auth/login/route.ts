import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { AuthUser, SessionData } from "@/lib/auth";
import { error } from "console";
import { match } from "assert";
import { backendFetch } from "@/lib/backend";

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json(
                {message: "Email and password are required."},
                {status: 400}
            );
        }

        //1. login ke be = dpt token
        const loginRes = await backendFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify({email, password}),
        });
        if(!loginRes.ok) {
            const err = await loginRes.json();
            return NextResponse.json(
                {error: err.message ?? "Wrong email or password"},
                {status: loginRes.status}
            );
        }
        const { access_token } = await loginRes.json();

        //2. pakai token itu buat ambil data user
        const meRes = await backendFetch("/users/current", {
            headers: {Authorization: `Bearer ${access_token}`},
        });
        if(!meRes.ok) {
            return NextResponse.json(
                {error: "Failed to fetch user data after login."},
                {status: meRes.status}
            )
        }
        const user = await meRes.json();

        //3. simpan token di cookie httpOnly
        const cookieStore = await cookies();
        cookieStore.set("session", JSON.stringify({ user, token: access_token }), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60,
        });
        return NextResponse.json(user);
    } catch (error) {
        return NextResponse.json(
            {error: "An error occurred while logging in."},
            {status: 500}
        );
    }
}