type CancelConfirmPopupProps = {
    points: number;
    onConfirm: () => void;
    onClose: () => void;
};

export function CancelConfirmPopup({ points, onConfirm, onClose }: CancelConfirmPopupProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-surface rounded-2xl p-10 text-center shadow-2xl max-w-sm w-full mx-4">
                <div className="text-5xl mb-4">⚠️</div>
                <h2 className="text-accent text-2xl font-bold mb-2">Cancel Booking?</h2>
                <p className="text-ink text-sm mb-6">Are you sure? You will lose {points} points.</p>
                <div className="flex gap-4 justify-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-full border border-accent/40 text-ink font-semibold hover:bg-tint/20 transition cursor-pointer"
                    >
                        Keep Booking
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:brightness-90 transition cursor-pointer"
                    >
                        Yes, Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
