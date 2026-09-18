# Overview
CORE is a gaming lounge (warnet) booking platform. It lets customers browse available PC and PS rooms, add a time slot to their cart, apply a promo, and confirm a booking — then track that booking's status or cancel it from their history. Admins get a separate dashboard to manage rooms, promotions, and visitor check-ins.

# Features Implemented
## GUEST
1. Dashboard (`/dashboard`)= Landing page with a rotating hero slider and rooms grouped by category (PC / PS) for quick browsing.
2. Room Detail = Full room specs and pricing.
3. Promotions (`/promotion`) = Browse currently active discounts available to apply at checkout.
4. Contact (`/contact`) = Give information about admin's phone number, email, openn hour, and gps location.

## AUTH
Authentication (`/login`, `/login/register`) = Sign up and sign in, with a forgot-password flow that emails a secure, time-limited reset link.

## USER
1. Dashboard (`/dashboard`)= Landing page with a rotating hero slider and rooms grouped by category (PC / PS) for quick browsing.
2. Room Detail & Booking = Full room specs and pricing, with an "Add to Cart" flow to start a booking.
3. Cart & Checkout (`/cart`, `/cart/[id]`) = Manage cart items, apply an active promo, then confirm the booking with guest details.
4. Booking History (`/history`, `/history/[id]`) = Track past and current bookings, and cancel a booking while it's still `confirmed`.
5. Promotions (`/promotion`) = Browse currently active discounts available to apply at checkout.
6. Profile (`/profile`) = View the logged-in user's basic account information and role.

## ADMIN
1. Admin Dashboard (`/admin/dashboard`) = Overview charts of visitor traffic and room booking activity.
2. Admin Visitors (`/admin/visitors`) = Search and filter visitors/bookings by status, check them in, and review activity logs.
3. Admin Rooms (`/admin/rooms`) = Create, edit, and delete rooms available for booking.
4. Admin Promotion Settings (`/admin/promoSettings`) = Create, activate/deactivate, and delete discount promotions.

# Roles
There are 3 roles you can use to simulate this app:

1. Guest = no login needed.
   notes: Can browse the Dashboard and Room Detail pages, but must log in to book a room.

2. Admin = `micelasatu@gmail.com` (email) / `micel1234` (password)
   notes: Full access, including the admin dashboard, rooms, promotions, and visitors management.

3. Customer = `mikhael@gmail.com` (email) / `mikel123` (password) 
   notes: Can access booking, cart, history, promotions, and profile — no access to `/admin/*`.

# Technology Used
- Frontend    : Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, SWR, Recharts
- Backend     : NestJS 11, Prisma 7, PostgreSQL
- Deploy      : Frontend on Vercel, Backend on Railway
- URL         : https://core-six-gold.vercel.app


# Getting Started (DEV)
First, run the development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
