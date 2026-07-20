interface ToastProps {
    message: string | null;
}

export function Toast({message}: ToastProps) {
    if(!message) return null;

    return (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-2">
            {message}
        </div>
    );
}