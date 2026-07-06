export interface Room {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    frequency: number;
}

export interface RoomsAdmin {
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
}

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('Id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(price);
}

//api helper
export async function fetchProducts(): Promise<Room[]> {
    const res = await fetch('/api/rooms');
    const data: Room[] = await res.json();
    return data.map((p) => ({
        ...p,
        id: p.id,
        price: p.price,
    }));
}

export async function fetchProductById(id: string): Promise<Room | null> {
    try {
        const res = await fetch(`/api/rooms/${id}`);
        if(!res.ok) return null;
        const data: Room = await res.json();
        return {
            ...data,
            id: data.id,
            price: data.price,
        };
    } catch {
        return null;
    }
}

