-- FoodLink Presentation Seeding Script (V2 - Error Free)
-- Purpose: Populate visuals for the Customer Dashboard
-- =============================================================

-- 1. CLEANUP (PURGE ALL CURRENT DATA)
DO $$ 
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'transactions') THEN
        TRUNCATE public.transactions CASCADE;
    END IF;
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'order_items') THEN
        TRUNCATE public.order_items, public.orders, public.menu_items, public.restaurants, public.profiles CASCADE;
    END IF;
END $$;

-- 2. SEED RESTAURANTS (Visuals for Dashboard)
-- Note: image_url is set to NULL to allow the frontend to use dynamic proprietary placeholders.
INSERT INTO public.restaurants (id, name, cuisine, description, rating, is_open, image_url, level)
VALUES 
('11111111-1111-1111-1111-111111111111', 'The Wagyu Terminal', 'Gourmet Steakhouse', 'Elite A5 cuts processed at terminal speeds.', 5.0, true, NULL, 'Gourmet Master'),
('22222222-2222-2222-2222-222222222222', 'Kyoto Pulse', 'Japanese Fusion', 'High-fidelity sushi and rare omakase signals.', 4.9, true, NULL, 'District Favorite'),
('33333333-3333-3333-3333-333333333333', 'Neo-Napoli', 'Modern Italian', 'Quantum-fired crusts and artisanal toppings.', 4.8, true, NULL, 'Rising Star'),
('44444444-4444-4444-4444-444444444444', 'Midnight Brew', 'Craft Coffee', 'Caffeine payloads for the late-night pilots.', 4.7, true, NULL, 'Local Legend');

-- 3. SEED MENU ITEMS (Visuals for Search/Menu)
-- Note: image_url is set to NULL to allow the frontend to use dynamic proprietary placeholders.
INSERT INTO public.menu_items (restaurant_id, name, description, price, category, image_url)
VALUES 
-- Wagyu Terminal
('11111111-1111-1111-1111-111111111111', 'Signature A5 Smash', 'Double Wagyu, truffle aioli, gold-leaf brioche.', 45.00, 'Main', NULL),
('11111111-1111-1111-1111-111111111111', 'Quantum Ribeye', 'Dry-aged for 45 days, smoked with hickory signals.', 85.00, 'Main', NULL),
-- Kyoto Pulse
('22222222-2222-2222-2222-222222222222', 'Electric Eel Roll', 'Torched unagi, spicy mayo, pop-rocks finish.', 32.00, 'Sushi', NULL),
('22222222-2222-2222-2222-222222222222', 'Neon Sashimi Set', 'Premium cuts of Toro, Hamachi, and Sake.', 55.00, 'Sushi', NULL),
-- Neo-Napoli
('33333333-3333-3333-3333-333333333333', 'Carbonara Protocol', 'Fresh fettuccine, guanciale, pecorino, pepper.', 28.00, 'Pasta', NULL),
-- Midnight Brew
('44444444-4444-4444-4444-444444444444', 'System Crash Espresso', 'Quad-shot for the dedicated developer.', 8.50, 'Coffee', NULL);

-- 4. INSTRUCTIONS FOR LIVE DEMO MISSION
-- ======================================
-- To show a "Live Order" on your dashboard during the presentation:
-- 1. Sign up as mmaroof341@gmail.com
-- 2. Run the command below (Replacing YOUR_EMAIL with mmaroof341@gmail.com)

/*
DO $$ 
DECLARE
    user_id UUID;
    rest_id UUID;
BEGIN
    SELECT id INTO user_id FROM profiles WHERE email = 'mmaroof341@gmail.com';
    SELECT id INTO rest_id FROM restaurants WHERE name = 'The Wagyu Terminal';
    
    INSERT INTO public.orders (customer_id, restaurant_id, status, total_amount, estimated_arrival)
    VALUES (user_id, rest_id, 'preparing', 53.50, NOW() + INTERVAL '15 minutes');
END $$;
*/
