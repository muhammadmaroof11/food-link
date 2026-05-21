import { supabase } from '../utils/supabase';

export const orderService = {
  /**
   * Place a new order with multiple items
   */
  async placeOrder(orderData, items) {
    // 1. Create the Order Entry
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .select()
      .single();
    
    if (orderError) throw orderError;

    // 2. Prepare Order Items
    const orderItems = items.map(item => ({
      order_id: order.id,
      menu_item_id: item.id,
      quantity: item.qty,
      unit_price: item.price
    }));

    // 3. Insert Order Items
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);
    
    if (itemsError) throw itemsError;

    return order;
  },

  /**
   * Get orders for a customer
   */
  async getCustomerOrders(customerId) {
    const { data, error } = await supabase
      .from('orders')
      .select('*, restaurants(name), order_items(*, menu_items(name))')
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
  /**
   * Get orders for a specific restaurant
   */
  async getRestaurantOrders(restaurantId) {
    const { data, error } = await supabase
      .from('orders')
      .select('*, profiles(full_name, email), order_items(*, menu_items(name))')
      .eq('restaurant_id', restaurantId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  /**
   * Update order status (Merchant/Rider/Admin only)
   */
  async updateStatus(orderId, status) {
    const { data, error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date() })
      .eq('id', orderId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
