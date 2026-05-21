# Asset Management Guide

As a premium application, the aesthetic and visual fidelity of FoodLink is critical. This guide outlines how assets are managed across the platform.

## Placeholder System

The project uses a dynamic SVG placeholder utility (`src/utils/placeholders.js`) to generate fallback images when real assets are not available. This ensures the UI remains visually stunning even during development or when a merchant hasn't uploaded a photo.

Available Placeholder Generators:
- `getRestaurantPlaceholder(name)`: Generates a dark, sleek background for merchants.
- `getDishPlaceholder(name)`: Generates a vibrant, food-oriented background for menu items.
- `getCategoryPlaceholder(name)`: Generates a placeholder for district categories (e.g., Burgers, Healthy).
- `getPersonPlaceholder(name)`: Generates a placeholder for user avatars.

## Supabase Storage

Real assets (like user-uploaded menu items and restaurant covers) should be stored in the Supabase Storage bucket named `foodlink-assets`.

### Structure
- `/merchants/menu-items/` - High-fidelity images of dishes.
- `/merchants/covers/` - Restaurant banner images.
- `/avatars/` - User profile pictures.

### Indian Food Assets
A set of premium Indian food images is hosted in the Supabase bucket for demo purposes. These can be accessed via `INDIAN_FOOD_ASSETS` in `placeholders.js`.

## Image Optimization

All uploaded images should be intercepted by `src/utils/imageOptimizer.js` before being sent to Supabase. This ensures:
- Conversion to WebP format for fast loading.
- Resolution scaling (e.g., max width 800px).
- Compression for bandwidth savings.

## Commercial Note

The placeholders and provided demo assets are included to facilitate the sale of the project. Buyers must replace them with their own licensed content before public launch if necessary.
