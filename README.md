# Overview
CORE is a gaming lounge (warnet) booking platform. It lets customers browse available PC and PS rooms, add a time slot to their cart, apply a promo, and confirm a booking — then track that booking's status or cancel it from their history. Admins get a separate dashboard to manage rooms, promotions, and visitor check-ins.

# Roles
There are 3 roles you can use to simulate this app:

1. Guest = no login needed.
   notes: Can browse the Dashboard, Room Detail pages, Promo pages, and contact page. However, they still need to log in to book a room.

2. Admin = `micelasatu@gmail.com` (email) / `micel1234` (password)
   notes: Full access, including the admin dashboard, rooms, promotions, and visitors management.

3. Customer = `mikhael@gmail.com` (email) / `mikel123` (password) -- for dummy data (you can also make your own account by using register feature)
   notes: Can access booking, cart, history, promotions, and profile — no access to `/admin/*`.

# Features Implemented
## THEME - following your windoows settings
1. Light
   ![light](public/images/guest-dashboard.png)
2. Dark
   ![dark](public/images/darktheme.png)

## GUEST ROLE
1. Dashboard (`/dashboard`)= Landing page with a rotating hero slider and rooms grouped by category (PC / PS) for quick browsing.
   ![guest-dashboard](public/images/guest-dashboard.png)
2. Room Detail = Full room specs and pricing.
   ![guest-roomdetail](public/images/guest-roomdetail.png)
3. Promotions (`/promotion`) = Browse currently active discounts available to apply at checkout.
   ![guest-promo](public/images/guest-promo.png)
4. Contact (`/contact`) = Give information about admin's phone number, email, openn hour, and gps location about the place.
   ![guest-contact](public/images/guest-contact.png)

## AUTH
Authentication (`/login`, `/login/register`) = Sign up and sign in, with a forgot-password flow that emails a secure, time-limited reset link.
 ![login](public/images/login.png) ![register](public/images/register.png)

## USER ROLE
1. Dashboard (`/dashboard`)= Landing page with a rotating hero slider and rooms grouped by category (PC / PS) for quick browsing.
   ![user-dashboard](public/images/user-dashboard.png)
2. Room Detail & Booking = Full room specs and pricing, with an "Add to Cart" flow to start a booking.
   ![user-roomdetail](public/images/user-roomdetail.png)
3. Cart & Checkout (`/cart`, `/cart/[id]`) = Manage cart items, apply an active promo, then confirm the booking with guest details.
   ![user-cart](public/images//user-cart.png)
   ![user-booking](public/images/user-booking.png)
4. Booking History (`/history`, `/history/[id]`) = Track past and current bookings, and cancel a booking while it's still `confirmed`.
   ![user-history](public/images/user-history.png)
   ![user-historydetail](public/images/user-bookingdetail.png)
5. Promotions (`/promotion`) = Browse currently active discounts available to apply at checkout.
   ![user-promo](public/images/user-promo.png)
6. Profile (`/profile`) = View the logged-in user's basic account information and role.
   ![user-profile](public/images/user-profile.png)
7. Contact (`/contact`) = Give information about admin's phone number, email, openn hour, and gps location about the place.
   ![guest-contact](public/images/user-contact.png)

## ADMIN ROLE
1. Admin Dashboard (`/admin/dashboard`) = Overview charts of visitor traffic and room booking activity.
   ![admin-dashboard](public/images/admin-dashboard.png)
2. Admin Visitors (`/admin/visitors`) = Search and filter visitors/bookings by status, check them in, and review activity logs.
   ![admin-visitors](public/images/admin-visitors.png)
3. Admin Rooms (`/admin/rooms`) = Create, edit, and delete rooms available for booking.
   ![admin-rooms](public/images/admin-rooms.png)
4. Admin Promotion Settings (`/admin/promoSettings`) = Create, activate/deactivate, and delete discount promotions.
   ![admin-promo](public/images/admin-promo.png)

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
