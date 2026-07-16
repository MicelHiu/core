export function RentSummary() {
    const HOURS = Array.from({ length: 24 }, (_, i) => {
    const hour = i + 1;
    return `${String(hour).padStart(2, "0")}.00`;
    });
    
    return (
        <section className="max-w-md bg-darkpurple/60 border border-lilac/40 rounded-2xl p-8 shadow-xl">
            <h2 className="text-2xl font-bold text-pale mb06 text-center">Order Summary</h2>
            <div className="flex flex-col justify-between">
                <p className="font-bold">Room Type: <span className="text-base p-4 font-medium">PC REGULAR</span></p>

                <p className="font-bold">Price: <span className="text-base p-4 font-medium">Rp10.000</span></p>

                <p className="font-bold">Seats: <span className="text-base p-4 font-medium">1</span></p>

                <p className="font-bold">Hour: <span className="text-base p-4 font-medium">2</span></p>
                <hr/>
                <p className="font-bold">Total:<span className="text-base p-4 font-medium">Rp20,000</span></p>
            </div>
        </section>
    )
}