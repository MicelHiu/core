import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { backendFetch } from "@/lib/backend";

export async function GET() {
    try {
        const response = await backendFetch('/rooms');
        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            {error: 'Failed to fetch data, please try again later.'},
            {status: 500}
        );
    }
}

