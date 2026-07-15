"use client";
import useSWR from "swr";
import { AuthUser } from "@/lib/auth";

const fetcher = (url: string) => 
    fetch(url).then((res) => {
        if(!res.ok) throw new Error(String(res.status));
        return res.json();
    });

export function useCurrentUser() {
    const { data: user, isLoading, error } = useSWR<AuthUser>('/api/auth/me', fetcher, {
        shouldRetryOnError: false,
        onErrorRetry: (error) => {
            if(error.status === 401) return;
        },
    });

    return { user, isLoggedIn: !!user, isLoading, error};
}