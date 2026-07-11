import { Room } from "@/lib/data"; 
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = Room & {quantity: number};

interface CartStore {
    items: CartItem[];
    addToCart: (room: Room) => void;
    removeFromCart: (roomId: string) => void;
    clearCart: () => void;
    getCartTotal: () => number;
    updateQuantity: (roomId: string, qty: number) => void;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (room) => {
                const items = get().items;
                const existing = items.find((item) => item.id === room.id);
                if(existing) {
                    set({
                        items: items.map((item) => 
                            item.id === room.id 
                                ? {...item, quantity: item.quantity + 1} : item
                        ),
                    });
                } else {
                    set({
                        items: [...items, {...room, quantity: 1}]
                    });
                }
            },

            removeFromCart: (roomId) => {
                set({
                    items: get().items.filter((item) => item.id !== roomId)
                });
            },

            clearCart:() => {
                set({ items: [] });
            },

            getCartTotal:() => {
                return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            },

            updateQuantity: (roomId, qty) => {
                if(qty < 1) return;
                set({
                    items: get().items.map((item) =>
                    item.id === roomId ? {...item, quantity: qty} : item),
                });
            },
        }),
        {
            name: "core_cart",
        }
    )
);