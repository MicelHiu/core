import { backendFetch } from "./backend";

//rooms
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

export async function fetchRooms(): Promise<Room[]> {
    const res = await backendFetch('/rooms');
    const data: Room[] = await res.json();
    return data.map((p) => ({
        ...p,
        id: p.id,
        price: p.price,
    }));
}

export async function fetchRoomById(id: string): Promise<Room | null> {
    try {
        const res = await backendFetch(`/rooms/${id}`);
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

export async function fetchCategories(): Promise<string[]> {
    const products = await fetchRooms();
    const categories = [...new Set(products.map((p) => p.category))];
    return categories;
}

