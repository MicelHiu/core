import { backendFetch } from "@/lib/backend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();
    //validasi input
    if(!body.full_name || !body.nickname || !body.email || !body.contact || !body.password) {
        return NextResponse.json(
            {error: "Data Incomplete, please fill all required fields."},
            {status: 400}
        );
    }

    const res = await backendFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, {status: res.status});
}