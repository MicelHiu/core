
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useRegister } from '@/hooks/useRegister';
import { PasswordInput } from '@/components/auth/PasswordInput';

export default function register() {
    const [full_name, setFullName] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [contact, setContact] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const { register, loading, error } = useRegister();
    const router = useRouter();

    const handleRegisterSubmit = async (e: any) => {
        e.preventDefault();
        const success = await register({ full_name, nickname, email, contact, password });
        if (success) {
            router.push('/login');
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

                    <form onSubmit={handleRegisterSubmit} className='flex flex-col gap-4'>
                        <div className='flex flex-row justify-center items-center gap-2 mb-4 border-b border-accent pb-4'>
                            <label htmlFor='full_name' className='mb-2 block text-sm font-medium text-ink'>
                                Full Name
                            </label>
                            <input
                                id='full_name'
                                type='text'
                                value={full_name}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder='enter your full name'
                                required
                                className='w-full rounded-lg border border-accent px-4 py-3 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent'
                            />
                        </div>

                        <div className='flex flex-row justify-center items-center gap-2 mb-4 border-accent pb-4'>
                            <label htmlFor='nickname' className='mb-2 block text-sm font-medium text-ink'>
                                Nickname
                            </label>
                            <input
                                id='nickname'
                                type='text'
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                placeholder='what should we call you?'
                                required
                                className='w-full rounded-lg border border-accent px-4 py-3 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent'
                            />
                        </div>

                        <div className='flex flex-row justify-center items-center gap-2 mb-4 border-accent pb-4'>
                            <label htmlFor='email' className='mb-2 block text-sm font-medium text-ink'>
                                Email Address
                            </label>
                            <input
                                id='email'
                                type='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder='enter your email address'
                                required
                                className='w-full rounded-lg border border-accent px-4 py-3 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent'
                            />
                        </div>

                        <div className='flex flex-row justify-center items-center gap-2 mb-4 border-accent pb-4'>
                            <label htmlFor='contact' className='mb-2 block text-sm font-medium text-ink'>
                                Phone Number
                            </label>
                            <input
                                id='contact'
                                type='tel'
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                placeholder='08********'
                                required
                                className='w-full rounded-lg border border-accent px-4 py-3 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent'
                            />
                        </div>

                        <div className='flex flex-row justify-center items-center gap-2 mb-4 border-accent pb-4'>
                            <label htmlFor='password' className='mb-2 block text-sm font-medium text-ink'>
                                Password
                            </label>
                            <PasswordInput
                                id='password'
                                value={password}
                                onChange={setPassword}
                                placeholder='Make your own password'
                                required
                                className='w-full rounded-lg border border-accent px-4 py-3 pr-10 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent'
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={loading}
                            className='btn-primary w-full rounded-lg bg-cta py-3 font-medium text-cta-ink hover:brightness-90 cursor-pointer'
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                        <p className='text-ink pr-2'>
                            Already have an account? Back to
                            <Link href="/login" className='underline px-2 hover:text-accent'>
                                Login
                            </Link>
                        </p>
                    </form>
                </section>
            </main>
        </>
    )
}