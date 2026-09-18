"use client";

import Link from "next/link";

export function Footer() {
    return (
        <footer className="mt-auto w-full bg-surface text-ink py-10 px-8 border-accent border-t-2">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6 md:gap-4 items-start md:items-center">
                <section className="flex flex-col flex-wrap">
                    <h2 className="text-3xl font-bold mb-2">CORE</h2>
                    <p className="text-md text-ink flex-wrap">
                        Play . Connect . Compete
                    </p>
                </section>
                <section className="flex flex-col">
                    <h3 className="font-semibold text-xl mb-2">Navigation</h3>
                    <nav className="flex items-center gap-4 text-ink">
                        <Link 
                            href="/dashboard"
                            className="text-md font-medium text-ink hover:text-accent cursor-pointer"
                        >
                            Home
                        </Link>
                        <Link
                            href="/rooms"
                            className="text-md font-medium text-ink hover:text-accent cursor-pointer"
                        >
                            Products
                        </Link>
                        <Link
                            href="/cart"
                            className="text-md font-medium text-ink hover:text-accent cursor-pointer"
                        >
                            Cart
                        </Link>
                        <Link
                            href="/faq"
                            className="text-md font-medium text-ink hover:text-accent cursor-pointer"
                        >
                            FAQ
                        </Link>
                    </nav>
                </section>
                <section className="flex flex-col">
                    <h3 className="font-semibold mb-2 text-xl">Contact</h3>
                    <ul className="text-md text-ink">
                        <li>📧 support@revoshop.id</li>
                        <li>📞 +62 21 1234 5678</li>
                        <li>📍 Jakarta, Indonesia</li>
                    </ul>
                </section>
            </div>
            <div className="mt-8 border-t border-accent/20 text-center text-sm text-accent">
                © {new Date().getFullYear()} CORE. All rights reserved.
            </div>
        </footer>
    );
}