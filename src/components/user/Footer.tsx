"use client";

import Link from "next/link";

export function Footer() {
    return (
        <footer className="mt-auto w-full bg-darkpurple text-pale py-10 px-8 border-lilac border-t-2">
            <div className="max-w-6xl mx-auto flex flex-row justify-between gap-4 items-center">
                <section className="flex flex-col flex-wrap">
                    <h2 className="text-3xl font-bold mb-2">CORE</h2>
                    <p className="text-md text-pale flex-wrap">
                        Play . Connect . Compete
                    </p>
                </section>
                <section className="flex flex-col">
                    <h3 className="font-semibold text-xl mb-2">Navigation</h3>
                    <nav className="flex items-center gap-4 text-pale">
                        <Link 
                            href="/dashboard"
                            className="text-md font-medium text-pale hover:text-lilac cursor-pointer"
                        >
                            Home
                        </Link>
                        <Link
                            href="/rooms"
                            className="text-md font-medium text-pale hover:text-lilac cursor-pointer"
                        >
                            Products
                        </Link>
                        <Link
                            href="/cart"
                            className="text-md font-medium text-pale hover:text-lilac cursor-pointer"
                        >
                            Cart
                        </Link>
                        <Link
                            href="/faq"
                            className="text-md font-medium text-pale hover:text-lilac cursor-pointer"
                        >
                            FAQ
                        </Link>
                    </nav>
                </section>
                <section className="flex flex-col">
                    <h3 className="font-semibold mb-2 text-xl">Contact</h3>
                    <ul className="text-md text-pale">
                        <li>📧 support@revoshop.id</li>
                        <li>📞 +62 21 1234 5678</li>
                        <li>📍 Jakarta, Indonesia</li>
                    </ul>
                </section>
            </div>
            <div className="mt-8 border-t border-purple text-center text-sm text-lilac">
                © {new Date().getFullYear()} CORE. All rights reserved.
            </div>
        </footer>
    );
}