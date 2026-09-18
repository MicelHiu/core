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
    stockToday: number;
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

export function formatDateTime(iso: string) {
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    const date = `${pad(d.getDate())}-${pad(d.getMonth() + 1)}-${d.getFullYear()}`;
    const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`;
    return `${date} ${time}`;
}

interface BackendRoom {
    id: string;
    name: string;
    description: string;
    price: string | number;
    image: string;
    type: string;
    stock: number;
    stock_today: number;
}

function mapBackendRoom(p: BackendRoom): Room {
    return {
        id: p.id,
        name: p.name,
        description: p.description,
        price: Number(p.price),
        image: p.image,
        category: p.type,
        frequency: p.stock,
        stockToday: p.stock_today,
    };
}

export async function fetchRooms(): Promise<Room[]> {
    const res = await backendFetch('/rooms');
    const data: BackendRoom[] = await res.json();
    return data.map(mapBackendRoom);
}

export async function fetchRoomById(id: string): Promise<Room | null> {
    try {
        const res = await backendFetch(`/rooms/${id}`);
        if(!res.ok) return null;
        const data: BackendRoom = await res.json();
        return mapBackendRoom(data);
    } catch {
        return null;
    }
}

export function getCategories(rooms: Room[]): string[] {
    return [...new Set(rooms.map((p) => p.category))];
}

