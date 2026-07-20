import { Promo } from "@/components/user/promotion/PromoCard";

// TODO API: nanti ganti file ini jadi fetch dari backend, misal:
//   export async function getPromotions() {
//     const res = await fetch(`${process.env.API_URL}/promotions`);
//     return res.json();
//   }
// dan di page.tsx tinggal ganti PROMOTIONS jadi hasil fetch/useSWR

export const PROMOTIONS: Promo[] = [
    {
        id: "newbie",
        title: "Newbie",
        discount: 30,
        description: "Diskon untuk member baru",
    },
    {
        id: "all-night",
        title: "All Night",
        discount: 50,
        description: "Booking di atas jam 22.00",
    },
];