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
INSERT INTO public.restaurants (id, name, cuisine, description, rating, is_open, image_url, level)
VALUES 
('11111111-1111-1111-1111-111111111111', 'The Wagyu Terminal', 'Gourmet Steakhouse', 'Elite A5 cuts processed at terminal speeds.', 5.0, true, 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&q=80&w=800', 'Gourmet Master'),
('22222222-2222-2222-2222-222222222222', 'Kyoto Pulse', 'Japanese Fusion', 'High-fidelity sushi and rare omakase signals.', 4.9, true, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800', 'District Favorite'),
('33333333-3333-3333-3333-333333333333', 'Neo-Napoli', 'Modern Italian', 'Quantum-fired crusts and artisanal toppings.', 4.8, true, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800', 'Rising Star'),
('44444444-4444-4444-4444-444444444444', 'Midnight Brew', 'Craft Coffee', 'Caffeine payloads for the late-night pilots.', 4.7, true, 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800', 'Local Legend');

-- 3. SEED MENU ITEMS (Visuals for Search/Menu)
INSERT INTO public.menu_items (restaurant_id, name, description, price, category, image_url)
VALUES 
-- Wagyu Terminal
('11111111-1111-1111-1111-111111111111', 'Signature A5 Smash', 'Double Wagyu, truffle aioli, gold-leaf brioche.', 45.00, 'Main', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=400'),
('11111111-1111-1111-1111-111111111111', 'Quantum Ribeye', 'Dry-aged for 45 days, smoked with hickory signals.', 85.00, 'Main', 'https://images.unsplash.com/photo-1546241072-48010ad2862c?auto=format&fit=crop&q=80&w=400'),
-- Kyoto Pulse
('22222222-2222-2222-2222-222222222222', 'Electric Eel Roll', 'Torched unagi, spicy mayo, pop-rocks finish.', 32.00, 'Sushi', 'https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&q=80&w=400'),
('22222222-2222-2222-2222-222222222222', 'Neon Sashimi Set', 'Premium cuts of Toro, Hamachi, and Sake.', 55.00, 'Sushi', 'https://images.unsplash.com/photo-1534422298391-e4f8c170db06?auto=format&fit=crop&q=80&w=400'),
-- Neo-Napoli
('33333333-3333-3333-3333-333333333333', 'Carbonara Protocol', 'Fresh fettuccine, guanciale, pecorino, pepper.', 28.00, 'Pasta', 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=400'),
-- Midnight Brew
('44444444-4444-4444-4444-444444444444', 'System Crash Espresso', 'Quad-shot for the dedicated developer.', 8.50, 'Coffee', 'https://images.unsplash.com/photo-1510707577719-5d6878021f47?auto=format&fit=crop&q=80&w=400');

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
