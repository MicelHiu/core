"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';
import Link from 'next/link';

export default function login() {
    const [email, setEmail] =useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleLoginSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password}),
                credentials: 'include',
            });
            const data = await res.json();

            if(!res.ok) {
                throw new Error(data.error || 'Authentication Failed');
            }

            //mutate the global SWR cache key to fetch fresh session details immedietly
            await mutate('/api/auth/me', data, true);
            if(data.role === "admin") {
                router.push('/dashboard/admin')
            } else {
                router.push('/dashboard');
            }
        } catch (err) {
            throw new Error( 'Authentication failed. Please register if you are new.');
            setLoading(false);
        }
    };

    return (
        <>
            <main className="min-h-screen justify-center items-center bg-darkpurple flex flex-col">
                <section className='flex flex-col justify-center align-center w-full shadow-2xl shadow-pale p-12 gap-4 rounded-2xl max-w-md text-center bg-darkpurple text-pale'>
                    <header className='mb-6 text-center'>
                        <h1 className='text-2xl font-extrabold text-lilac'> Welcome to Core</h1>
                        <p className='text-xs text-lilac mt-1.5'>Play . Connect . Compete</p>
                    </header>

                    {/* {Error && (
                        <div className='mb-4 p-3 bg-red-500 border border-red-300 text-xs font-semibold text-red-200 rounded-xl'>
                            ⚠ {Error}
                        </div>
                    )} */}

                    <form onSubmit={handleLoginSubmit} className='flex flex-col gap-4'>
                        <div className='flex flex-row justify-center items-center gap-2 mb-4 border-b border-lilac pb-4'>
                            <label htmlFor='email' className='mb-2 block text-sm font-medium text-pale'>
                                Email Address
                            </label>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='enter your email address'
                                required
                                className='w-full rounded-lg border border-lilac px-4 py-3 outline-none transition focus:border-pale focus:ring-2 focus:ring-pale'
                            />
                        </div>

                        <div className='flex flex-row justify-center items-center gap-2 mb-4 border-lilac pb-4'>
                            <label htmlFor='password' className='mb-2 block text-sm font-medium text-pale'>
                                Password
                            </label>
                            <input 
                                type='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='enter your password'
                                required
                                className='w-full rounded-lg border border-lilac px-4 py-3 outline-none transition focus:border-pale focus:ring-2 focus:ring-pale'
                            />
                        </div>

                        <button 
                            type='submit'
                            disabled={loading}
                            className='btn-primary w-full rounded-lg bg-purple py-3 font-medium text-pale hover:bg-lilac hover:text-darkpurple cursor-pointer'
                        >
                            {loading ? "Signing in..." : "Login"}
                        </button>
                        <p className='text-pale pr-2'>
                            Don't have an account?  
                            <Link href="/login/register" className='underline px-2 hover:text-lilac'>
                                Register here!
                            </Link> 
                        </p>
                    </form>
                </section>
            </main>
        </>
    )
}