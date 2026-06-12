"use client"

import Link from 'next/link';

export default function register() {
    return (
        <>
            <main className="min-h-screen justify-center items-center bg-darkpurple flex flex-col">
                <section className='flex flex-col justify-center align-center w-full shadow-2xl shadow-pale p-12 gap-4 rounded-2xl max-w-md text-center bg-darkpurple text-pale'>
                    <header className='mb-6 text-center'>
                        <h1 className='text-2xl font-extrabold text-lilac'> Welcome to Core</h1>
                        <p className='text-xs text-lilac mt-1.5'>Play . Connect . Compete</p>
                    </header>

                    {/* {error && (
                        <div className='mb-4 p-3 bg-red-500 border border-red-300 text-xs font-semibold text-red-200 rounded-xl'>
                            ⚠ {error}
                        </div>
                    )} */}

                    <form /* onSubmit={handleLoginSubmit} */ className='flex flex-col gap-4'>
                        <div className='flex flex-row justify-center items-center gap-2 mb-4 border-b border-lilac pb-4'>
                            <label htmlFor='email' className='mb-2 block text-sm font-medium text-pale'>
                                Full Name
                            </label>
                            <input
                                type='full name'
                                /* value={email} */
                                /* onChange={(e) => setEmail(e.target.value)} */
                                placeholder='enter your full name'
                                required
                                className='w-full rounded-lg border border-lilac px-4 py-3 outline-none transition focus:border-pale focus:ring-2 focus:ring-pale'
                            />
                        </div>

                        <div className='flex flex-row justify-center items-center gap-2 mb-4 border-lilac pb-4'>
                            <label htmlFor='password' className='mb-2 block text-sm font-medium text-pale'>
                                Nickname
                            </label>
                            <input 
                                type='nickname'
                                /* value={password}
                                onChange={(e) => setPassword(e.target.value)} */
                                placeholder='what should we call you?'
                                required
                                className='w-full rounded-lg border border-lilac px-4 py-3 outline-none transition focus:border-pale focus:ring-2 focus:ring-pale'
                            />
                        </div>

                        <div className='flex flex-row justify-center items-center gap-2 mb-4 border-lilac pb-4'>
                            <label htmlFor='password' className='mb-2 block text-sm font-medium text-pale'>
                                Email Address
                            </label>
                            <input 
                                type='email'
                                /* value={password}
                                onChange={(e) => setPassword(e.target.value)} */
                                placeholder='enter your email address'
                                required
                                className='w-full rounded-lg border border-lilac px-4 py-3 outline-none transition focus:border-pale focus:ring-2 focus:ring-pale'
                            />
                        </div>

                        <div className='flex flex-row justify-center items-center gap-2 mb-4 border-lilac pb-4'>
                            <label htmlFor='password' className='mb-2 block text-sm font-medium text-pale'>
                                Phone Number
                            </label>
                            <input 
                                type='phone_number'
                                /* value={password}
                                onChange={(e) => setPassword(e.target.value)} */
                                placeholder='08********'
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
                                /* value={password}
                                onChange={(e) => setPassword(e.target.value)} */
                                placeholder='Make your own password'
                                required
                                className='w-full rounded-lg border border-lilac px-4 py-3 outline-none transition focus:border-pale focus:ring-2 focus:ring-pale'
                            />
                        </div>

                        <button 
                            type='submit'
                            /* disabled={loading} */
                            className='btn-primary w-full rounded-lg bg-purple py-3 font-medium text-pale hover:bg-lilac hover:text-darkpurple cursor-pointer'
                        >
                            Register
                        </button>
                        <p className='text-pale pr-2'>
                            Already have an account? Back to
                            <Link href="/login" className='underline px-2 hover:text-lilac'>
                                Login
                            </Link> 
                        </p>
                    </form>
                </section>
            </main>
        </>
    )
}