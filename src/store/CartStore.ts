import { Room } from "@/lib/data";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = Room & {
  seats: number;
  start: string;   // contoh: "08:00"
  finish: string;  // contoh: "10:00"
  hours: number;
};

export type BookingInfo = {
  name: string;
  email: string;
  phone: string;
};

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  bookingInfo: BookingInfo | null;

  addToCart: (room: Room) => void;
  removeFromCart: (roomId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  updateSeats: (roomId: string, seats: number) => void;
  updateSchedule: (roomId: string, start: string, finish: string) => void;
  setBookingInfo: (info: BookingInfo) => void;
  openCart: () => void;
  closeCart: () => void;
}

function calculateHours(start: string, finish: string): number {
  if (!start || !finish) return 0;
  const [startH] = start.split(":").map(Number);
  const [finishH] = finish.split(":").map(Number);
  const diff = finishH - startH;
  return diff > 0 ? diff : 0;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      bookingInfo: null,

      addToCart: (room) => {
        const items = get().items;
        const existing = items.find((item) => item.id === room.id);
        if (existing) {
          set({
            items: items.map((item) =>
              item.id === room.id ? { ...item, seats: item.seats + 1 } : item
            ),
          });
        } else {
          set({
            items: [...items, { ...room, seats: 1, start: "", finish: "", hours: 0 }],
          });
        }
      },

      removeFromCart: (roomId) => {
        set({
          items: get().items.filter((item) => item.id !== roomId),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getCartTotal: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.seats * item.hours, 0);
      },

      updateSeats: (roomId, seats) => {
        if (seats < 1) return;
        set({
          items: get().items.map((item) =>
            item.id === roomId ? { ...item, seats } : item
          ),
        });
      },

      updateSchedule: (roomId, start, finish) => {
        set({
          items: get().items.map((item) =>
            item.id === roomId
              ? { ...item, start, finish, hours: calculateHours(start, finish) }
              : item
          ),
        });
      },

      setBookingInfo: (info) => set({ bookingInfo: info }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
    }),
    {
      name: "core_cart",
    }
  )
);