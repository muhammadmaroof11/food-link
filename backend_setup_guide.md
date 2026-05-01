# FoodLink — Supabase Backend Setup Guide

> **Last Updated:** April 29, 2026
> **Architecture:** Supabase (PostgreSQL) + Vue 3 (Vite)

---

## 1. Project Prerequisites

1. **Supabase Project**: Ensure your project is active at [supabase.com](https://supabase.com).
   - **Project Ref:** `gdlajlppsngulemzzeok`
2. **Environment Variables**: Your `.env` must contain:
   ```env
   VITE_SUPABASE_URL=https://gdlajlppsngulemzzeok.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_r1Q4YL7FPukGc6RRcFwRGg_13FwDU2F
   ```

---

## 2. Database Initialization

### 2A. Run Master Schema
Execute the contents of `supabase_schema.sql` in your Supabase **SQL Editor**. This creates:
- `profiles`: User identities and roles.
- `restaurants`: Merchant registry.
- `menu_items`: Gourmet dish repository.
- `orders`: Transactional lifecycle.
- `order_items`: Line-item details.

### 2B. Run Auth Trigger
Execute the following to automate profile creation during sign-up:
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
```

---

## 3. Current Implementation Status

| Feature | Status | Service File |
|---------|--------|--------------|
| **Authentication** | ✅ Functional | `src/services/auth.js` |
| **User Profile Sync** | ✅ Functional | `src/stores/auth.js` |
| **Restaurant Fetching**| ✅ Functional | `src/services/restaurant.js` |
| **Menu Registry** | ✅ Service Ready | `src/services/menu.js` |
| **Real-time Orders** | ⏳ Pending | `src/services/order.js` |
| **Wallet Sync** | ⏳ Pending | TBD |

---

## 4. Remaining Mission Objectives (TODO)

### 🚩 1. Merchant Onboarding Flow
- **Goal**: Allow users with the `restaurant` role to create their entry in the `restaurants` table.
- **Location**: `src/views/restaurant/Profile.vue` needs to be connected to `restaurantService.upsert()`.

### 🚩 2. Data Population
- **Goal**: Add initial gourmet data to the platform.
- **Action**: You can use the Merchant dashboard (once connected) or run manual `INSERT` queries for testing.

### 🚩 3. Cart & Checkout Engine
- **Goal**: Convert the local Pinia cart into a Supabase `orders` entry.
- **Action**: Build `src/services/order.js` to handle the multi-table insert (`orders` + `order_items`).

### 🚩 4. Real-time Tracking HUD
- **Goal**: Update the `LiveTracking.vue` component to listen for `orders` status changes via Supabase Realtime.

---

## 5. Security Protocols (RLS)

- **Public**: Can view `restaurants` and `menu_items`.
- **Authenticated**: Can view their own `profiles` and `orders`.
- **Merchants**: Can update their own `restaurants` and `menu_items`.
- **Admins**: Full access to all spectral data.

To update policies, use the **Authentication → Policies** tab in the Supabase Dashboard.
