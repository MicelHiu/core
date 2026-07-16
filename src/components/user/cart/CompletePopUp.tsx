import Link from "next/link";

export function CompletePopUp() {
    return (
        <>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-10 text-center shadow-2xl max-w-sm w-full mx-4">
                    <div className="text-5xl mb-4">
                        🎉
                    </div>
                    <h2 className="text-black text-2xl font-bold mb-2">Thanks for shopping!</h2>
                    <p className="text-gray-500 text-sm mb-6">Your order has been placed. We'll process it shortly.</p>
                    <Link href="/dashboard" className="inline-block bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
                        Back to Home
                    </Link>
                </div>
            </div>
        </>
    )
}