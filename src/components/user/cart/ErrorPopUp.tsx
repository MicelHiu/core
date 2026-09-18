interface ErrorPopUpProps {
    message: string;
    onClose: () => void;
}

export function ErrorPopUp({ message, onClose }: ErrorPopUpProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-surface rounded-2xl p-10 text-center shadow-2xl max-w-sm w-full mx-4">
                <div className="text-5xl mb-4">⚠️</div>
                <h2 className="text-accent text-2xl font-bold mb-2">Oops!</h2>
                <p className="text-ink text-sm mb-6">{message}</p>
                <button
                    onClick={onClose}
                    className="inline-block bg-cta text-cta-ink px-8 py-3 rounded-full font-semibold hover:brightness-90 transition cursor-pointer"
                >
                    OK
                </button>
            </div>
        </div>
    );
}
