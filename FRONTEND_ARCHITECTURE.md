# FoodLink — Front-End Architecture & Development Blueprint

This document defines the professional standard for the FoodLink front-end. It is designed to take the creative energy of beginner designs and "super-power" them into a scalable, modular, and high-performance Vue 3 application.

---

## 1. The "Super-Power" Tech Stack
- **Framework:** Vue 3 (Composition API)
- **Styling:** Tailwind CSS v4 (CSS-First Approach)
- **State Management:** Pinia (Modular stores)
- **Backend:** Appwrite (Auth, Databases, Realtime, Storage)
- **Navigation:** Vue Router 4 (Role-based guards)
- **Icons:** Font Awesome 6 + Lucide Vue Next

---

## 2. Professional Project Structure
We move away from "all-in-one" files. Every page is a collection of reusable components.

```text
src/
├── assets/             # Raw images, SVG icons, global styles
├── components/         # Shared components used across multiple modules
│   ├── ui/             # Atomic components (Buttons, Inputs, Cards, Badges)
│   ├── shared/         # Complex shared components (Navbar, Sidebar, Footer)
│   └── modals/         # Global dialogs and popups
├── services/           # API interaction logic (Appwrite SDK calls)
│   ├── AuthService.js
│   ├── OrderService.js
│   └── TransactionService.js
├── stores/             # Pinia stores (The application "brain")
│   ├── auth.js         # User state, role, and profile
│   ├── cart.js         # Shopping cart logic (Customer only)
│   ├── orders.js       # Active orders & history (Real-time)
│   └── ui.js           # Theme toggles, sidebar state, notifications
├── theme/              # Design System
│   └── variables.css   # The "Source of Truth" for colors and fonts
├── utils/              # Helper functions (Formatters, Validators, Appwrite config)
├── views/              # Page components (Broken down by Role)
│   ├── auth/           # Login, Register, Password Reset
│   ├── customer/       # Dashboard, Browse, Restaurant Profile, Checkout
│   ├── restaurant/     # Menu Mgmt, Order Queue, Analytics
│   ├── rider/          # Delivery Queue, Wallet, Profile
│   └── admin/          # Platform Stats, User Mgmt, Settlements
├── App.vue             # Root component (Handles global layouts)
└── main.js             # Entry point
```

---

## 3. Design System "Manifesto" (The Super-Power Command)
To make beginner designs look premium, we don't change their colors; we **scale** them.

### Rule 1: The 60-30-10 Color Rule
- **60% Primary Surface**: White/Light-Grey (`#ffffff` / `#f9f9fc`). Keeps things clean.
- **30% Secondary/Interactive**: Their chosen Primary color (e.g., Orange/Red).
- **10% Accents/Success**: Their secondary colors (e.g., Yellow/Green).

### Rule 2: Typography Hierarchy
Instead of arbitrary sizes, use standard scales:
- **Display**: Plus Jakarta Sans (Extra Bold, 32px+)
- **Body**: Plus Jakarta Sans (Regular/Medium, 14px-16px)

### Rule 3: The "Glass & Shadow" Effect
Make elements feel "alive" by using:
- **Shadows**: Soft, multi-layered shadows instead of flat borders.
- **Glassmorphism**: 80% opacity backgrounds with `backdrop-filter: blur(16px)` for headers and cards.

---

## 4. Module & Page Blueprints

### A. Customer Module (The Eater)
| Page | Key Components | Appwrite Link |
|------|----------------|---------------|
| **Browse / Home** | `CategoryGrid`, `PromoCarousel`, `RestaurantCardList` | `categories`, `promos`, `restaurants` |
| **Restaurant Profile** | `MenuCategorySection`, `MenuItemCard`, `CartPreview` | `menu_items` |
| **Checkout** | `OrderSummary`, `AddressSelector`, `WalletPayment` | `orders` (Create), `users` (Wallet) |
| **Order Status** | `RealtimeTracker`, `RiderContactCard`, `StatusStepper` | `orders` (Realtime) |
| **Wallet** | `BalanceCard`, `TransactionHistory`, `TopUpModal` | `transactions`, `users` |

### B. Restaurant Module (The Kitchen)
| Page | Key Components | Appwrite Link |
|------|----------------|---------------|
| **Order Queue** | `LiveOrderCard`, `StatusActions`, `KitchenTimer` | `orders` (Filter: `restaurant_id`) |
| **Menu Manager** | `CategoryGroup`, `EditItemModal`, `AvailabilityToggle` | `menu_items` (CRUD) |
| **Analytics** | `RevenueChart`, `PopularItemsList`, `LevelBadge` | `orders` (Aggregation) |

### C. Rider Module (The Hero)
| Page | Key Components | Appwrite Link |
|------|----------------|---------------|
| **Duty Map** | `AvailableOrdersList`, `AcceptOrderButton`, `EarningsSummary` | `orders` (Status: `ready_for_pickup`) |
| **Delivery Flow** | `NavigationHelper`, `CustomerContact`, `ProofOfDelivery` | `orders` (Status: Update) |
| **Earnings** | `DailyStats`, `PayoutHistory`, `LevelProgress` | `transactions` |

---

## 5. State Management (Pinia)
The UI should be **reactive**. If a rider accepts an order, the customer's phone should "ping" instantly.

### `auth.js`
```javascript
export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null, // From users collection
    role: null, // 'customer', 'rider', etc.
    isAuthenticated: false
  })
});
```

### `cart.js`
```javascript
export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    restaurantId: null,
  }),
  getters: {
    totalPrice: (state) => state.items.reduce((sum, i) => sum + i.price, 0)
  }
});
```

---

## 6. Backend Integration (The "Adaptation" Layer)
Based on the `backend_setup_guide.md`, here is how you handle data:

1. **Authentication**: Use `AuthService.js` to wrap Appwrite Auth. On login, immediately fetch the corresponding document from the `users` collection to get the `role` and `wallet_balance`.
2. **Order Flow**:
   - Customer creates `order` document.
   - Appwrite Function (or frontend listener) triggers the "Order Pending" status for the restaurant.
   - Use **Realtime Subscriptions** (`client.subscribe`) in a global layout or Pinia store to listen for status changes.
3. **Wallet**: Every transaction must create a document in the `transactions` collection. Never just update the `wallet_balance` directly without a record.

---

## 7. How to "Super-Power" Beginner Designs
When you see an unstructured page from a beginner, follow these steps:

1. **Extract Colors**: Put their colors in `variables.css` under `--color-primary`.
2. **Extract Assets**: Upload their images to the `foodlink_images` bucket.
3. **Refactor Layout**: 
   - Wrap their design in a `src/components/shared/BaseLayout.vue`.
   - Break their one big file into `<Header />`, `<MainContent />`, and `<Sidebar />`.
   - Convert their inline styles to Tailwind classes.
4. **Add Logic**: 
   - Replace hardcoded text with `{{ store.data }}`.
   - Replace manual buttons with reusable `<AppButton />`.

---

**Remember:** A structured project is a fast project. By following this blueprint, you are building a platform that doesn't just look good, but works reliably at scale.
