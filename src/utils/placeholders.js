/**
 * FoodLink High-Fidelity Placeholder Utility
 * Generates dynamic high-quality placeholders and bundles local Indian food assets.
 */

// Dynamically import all webp assets from the local indian-food directory
const indianFoodModules = import.meta.glob('@/assets/indian-food/*.webp', { eager: true, import: 'default' });
export const INDIAN_FOOD_ASSETS = Object.values(indianFoodModules);

/**
 * Returns a local Indian food image, falling back to a random one if needed.
 */
export const getIndianFoodImage = (seed) => {
    if (INDIAN_FOOD_ASSETS.length === 0) return '';
    const index = seed !== undefined 
        ? Math.abs(typeof seed === 'string' ? seed.length : seed) % INDIAN_FOOD_ASSETS.length
        : Math.floor(Math.random() * INDIAN_FOOD_ASSETS.length);
    
    return INDIAN_FOOD_ASSETS[index];
};

// High-fidelity Unsplash fallbacks for general categories
const RESTAURANT_IMAGES = [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80'
];

const DISH_IMAGES = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=800&q=80'
];

const CATEGORY_IMAGES = [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
];

const getArrayImage = (array, seed) => {
    const index = Math.abs(typeof seed === 'string' ? seed.length : seed || 0) % array.length;
    return array[index];
};

/**
 * Gets a placeholder specifically for a menu item
 */
export const getDishPlaceholder = (name = 'Dish') => {
    return getArrayImage(DISH_IMAGES, name);
};

/**
 * Gets a placeholder specifically for a restaurant
 */
export const getRestaurantPlaceholder = (name = 'Restaurant') => {
    return getArrayImage(RESTAURANT_IMAGES, name);
};

/**
 * Gets a placeholder for categories (Careers, Mission, etc.)
 */
export const getCategoryPlaceholder = (name = 'Category') => {
    return getArrayImage(CATEGORY_IMAGES, name);
};

/**
 * Gets a placeholder for a person/avatar
 */
export const getPersonPlaceholder = (name = 'User') => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&color=fff&size=150`;
};
