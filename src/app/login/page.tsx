"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mutate } from 'swr';
import Link from 'next/link';
import { backendFetch } from '@/lib/backend';
import { PasswordInput } from '@/components/auth/PasswordInput';
import { ForgotPasswordModal } from '@/components/auth/ForgotPasswordModal';

export default function login() {
    const [email, setEmail] =useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const router = useRouter();

    const handleLoginSubmit = async (e: any) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password }),
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Authentication Failed');
            }

            //mutate the global SWR cache key to fetch fresh session details immedietly
            await mutate('/api/auth/me', data, true);
            router.push(data.role === 'admin' ? '/admin/dashboard' : '/dashboard');
        } catch (err: any) {
            setError(err.message || 'Authentication failed. Please register if you are new');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <main className="min-h-screen justify-center items-center bg-surface flex flex-col">
                <section className='flex flex-col justify-center align-center w-full shadow-2xl shadow-accent/30 p-12 gap-4 rounded-2xl max-w-md text-center bg-surface text-ink'>
                    <header className='mb-6 text-center'>
                        <h1 className='text-2xl font-extrabold text-accent'> Welcome to Core</h1>
                        <p className='text-xs text-accent mt-1.5'>Play . Connect . Compete</p>
                    </header>

                    {error && (
                        <div className='mb-4 p-3 bg-red-500 border border-red-300 text-xs font-semibold text-red-200 rounded-xl'>
                            ⚠ {error}
                        </div>
                    )}

                    <form onSubmit={handleLoginSubmit} className='flex flex-col gap-4' autoComplete='off'>
                        <div className='flex flex-row justify-center items-center gap-2 mb-4 border-b border-accent pb-4'>
                            <label htmlFor='email' className='mb-2 block text-sm font-medium text-ink'>
                                Email Address
                            </label>
                            <input
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='enter your email address'
                                required
                                autoComplete='off'
                                className='w-full rounded-lg border border-accent px-4 py-3 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent'
                            />
                        </div>

                        <div className='flex flex-row justify-center items-center gap-2 mb-4 border-accent pb-4'>
                            <label htmlFor='password' className='mb-2 block text-sm font-medium text-ink'>
                                Password
                            </label>
                            <PasswordInput
                                value={password}
                                onChange={setPassword}
                                placeholder='enter your password'
                                required
                                className='w-full rounded-lg border border-accent px-4 py-3 pr-10 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent'
                            />
                        </div>

                        <button 
                            type='submit'
                            disabled={loading}
                            className='btn-primary w-full rounded-lg bg-cta py-3 font-medium text-cta-ink hover:brightness-90 cursor-pointer'
                        >
                            {loading ? "Signing in..." : "Login"}
                        </button>
                        <p className='text-ink pr-2'>
                            Don't have an account?  
                            <Link href="/login/register" className='underline px-2 hover:text-accent'>
                                Register here!
                            </Link>
                        </p>
                        <button
                            type="button"
                            onClick={() => setShowForgotPassword(true)}
                            className="text-sm text-ink/70 hover:text-accent underline cursor-pointer"
                        >
                            Forgot Password?
                        </button>
                    </form>
                </section>
            </main>
            {showForgotPassword && <ForgotPasswordModal onClose={() => setShowForgotPassword(false)} />}
        </>
    )
}