# FoodLink Project Documentation

## Architecture Overview

FoodLink is built on a modern Vue 3 stack using Vite and TailwindCSS, integrated tightly with Supabase for backend services (Auth, Database, Realtime, Storage).

### Key Directories

- **`src/views/`**: Contains all page-level components, organized by role (`customer`, `restaurant`, `rider`, `admin`) and public pages.
- **`src/components/`**: Reusable UI components.
- **`src/services/`**: API wrappers interacting with Supabase (`auth.js`, `restaurant.js`, `order.js`, etc.).
- **`src/stores/`**: Pinia stores for global state management (`auth.js`, `cart.js`).
- **`src/utils/`**: Helper utilities (e.g., `placeholders.js`, `imageOptimizer.js`).

## Authentication & Roles

The system uses Supabase Authentication. Each user has a corresponding record in the `profiles` table which defines their role:
- `customer`
- `restaurant`
- `rider`
- `admin`

Routes in `src/router/index.js` are protected by navigation guards that check the user's authentication status and role before granting access to specific portals.

## Database Schema (Supabase)

The core PostgreSQL schema revolves around:
- **`profiles`**: User data and roles.
- **`restaurants`**: Merchant details, linked to an owner profile.
- **`menu_items`**: Dishes belonging to a restaurant.
- **`orders` & `order_items`**: Transactional data linking customers, restaurants, and riders.
- **`transactions`**: Financial ledger for the wallet system.

*For the complete schema, refer to `supabase_schema.sql`.*

## Setting Up Locally

1. Install dependencies: `npm install`
2. Connect to Supabase: Ensure your `.env` contains `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
3. Run the development server: `npm run dev`
4. To build for production: `npm run build`

## Commercial Status

This project is proprietary and built for commercial sale. Unauthorized distribution or use is prohibited.
