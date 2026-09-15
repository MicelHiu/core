const BACKEND_URL = process.env.BACKEND_API_URL ?? "https://core-backend-production-d8cd.up.railway.app";

export async function backendFetch(path: string, options: RequestInit = {}) {
    const res = await fetch(`${BACKEND_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options.headers ?? {}),
        },
    });
    return res;
}