-- FoodLink Master Schema (Supabase)
-- ==========================================

-- SECTION 1: CORE TABLES
-- ==========================================

-- 1. Profiles Table (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    email TEXT UNIQUE,
    role TEXT CHECK (role IN ('customer', 'restaurant', 'rider', 'admin')) DEFAULT 'customer',
    avatar_url TEXT,
    wallet_balance DECIMAL(12,2) DEFAULT 0.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Restaurants Table
CREATE TABLE IF NOT EXISTS restaurants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    cuisine TEXT,
    description TEXT,
    image_url TEXT,
    is_open BOOLEAN DEFAULT true,
    rating DECIMAL(3,2) DEFAULT 0.0,
    address TEXT,
    level TEXT DEFAULT 'Rising Star',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Menu Items Table
CREATE TABLE IF NOT EXISTS menu_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    category TEXT,
    is_available BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    restaurant_id UUID REFERENCES restaurants(id) ON DELETE SET NULL,
    rider_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    status TEXT CHECK (status IN ('pending', 'confirmed', 'preparing', 'on_the_way', 'delivered', 'cancelled')) DEFAULT 'pending',
    total_amount DECIMAL(12,2) NOT NULL,
    delivery_fee DECIMAL(10,2) DEFAULT 0.00,
    service_fee DECIMAL(10,2) DEFAULT 0.00,
    delivery_address TEXT,
    estimated_arrival TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    menu_item_id UUID REFERENCES menu_items(id) ON DELETE SET NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price DECIMAL(10,2) NOT NULL
);

-- SECTION 2: AUTOMATION (TRIGGERS)
-- ==========================================

-- 1. Automatic Profile Creation
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

-- Trigger for Profile Creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Updated At Auto-Update
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- SECTION 3: SECURITY (RLS)
-- ==========================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Public can view restaurants" ON restaurants;
CREATE POLICY "Public can view restaurants" ON restaurants FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view menu items" ON menu_items;
CREATE POLICY "Public can view menu items" ON menu_items FOR SELECT USING (true);

DROP POLICY IF EXISTS "Customers can view own orders" ON orders;
CREATE POLICY "Customers can view own orders" ON orders FOR SELECT USING (auth.uid() = customer_id);

DROP POLICY IF EXISTS "Restaurants can view assigned orders" ON orders;
CREATE POLICY "Restaurants can view assigned orders" ON orders FOR SELECT USING (EXISTS (
    SELECT 1 FROM restaurants WHERE restaurants.id = orders.restaurant_id AND restaurants.owner_id = auth.uid()
));

DROP POLICY IF EXISTS "Riders can view assigned orders" ON orders;
CREATE POLICY "Riders can view assigned orders" ON orders FOR SELECT USING (auth.uid() = rider_id);

-- SECTION 4: SEED DATA (THE THIRD STEP)
-- ==========================================

-- Insert a sample restaurant (Owner-less for now, until you create a merchant user)
INSERT INTO public.restaurants (name, cuisine, description, rating, is_open, image_url)
VALUES 
('Artisan Burger Co.', 'Gourmet Burgers', 'The finest beef in the district.', 4.9, true, 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800'),
('Bella Cucina', 'Italian', 'Authentic wood-fired pizza and handmade pasta.', 4.8, true, 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800'),
('Sushi Signal', 'Japanese', 'High-fidelity sushi and sashimi.', 4.7, true, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=800');

-- Insert sample menu items for the first restaurant
-- Note: We use a subquery to get the ID of the first restaurant
DO $$
DECLARE
    rest_id UUID;
BEGIN
    SELECT id INTO rest_id FROM restaurants WHERE name = 'Artisan Burger Co.' LIMIT 1;
    
    INSERT INTO public.menu_items (restaurant_id, name, description, price, category, image_url)
    VALUES 
    (rest_id, 'Signature Smash', 'Double Wagyu beef, truffle mayo, aged cheddar.', 24.50, 'Burgers', 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=400'),
    (rest_id, 'Truffle Fries', 'Hand-cut fries with parmesan and white truffle oil.', 12.00, 'Sides', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=400');
END $$;

-- SECTION 5: TRANSACTIONS (Financial Ledger)
-- ==========================================

CREATE TABLE IF NOT EXISTS transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT CHECK (type IN ('topup', 'order_payment', 'refund', 'reward')) NOT NULL,
    amount DECIMAL(12,2) NOT NULL,
    title TEXT NOT NULL,
    reference_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

DROP POLICY IF EXISTS "Users can view own transactions" ON transactions;
CREATE POLICY "Users can view own transactions" ON transactions FOR SELECT USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_wallet_balance()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE profiles 
    SET wallet_balance = wallet_balance + NEW.amount
    WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_transaction_inserted ON transactions;
CREATE TRIGGER on_transaction_inserted
  AFTER INSERT ON transactions
  FOR EACH ROW EXECUTE PROCEDURE update_wallet_balance();
