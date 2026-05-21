import { supabase } from '../utils/supabase';

export const menuService = {
  /**
   * Get all menu items across all restaurants
   */
  async getAllItems() {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*, restaurants(name)')
      .eq('is_available', true);
    
    if (error) throw error;
    return data;
  },

  /**
   * Get menu items for a specific restaurant
   */
  async getItemsByRestaurant(restaurantId) {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .eq('is_available', true);

    if (error) throw error;
    return data;
  },

  /**
   * Add a new menu item (Merchant only)
   */
  async addItem(itemData) {
    const { data, error } = await supabase
      .from('menu_items')
      .insert([itemData])
      .select();
    
    if (error) throw error;
    return data;
  },

  /**
   * Update a menu item
   */
  async updateItem(id, updates) {
    const { data, error } = await supabase
      .from('menu_items')
      .update(updates)
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data;
  },

  /**
   * Delete a menu item
   */
  async deleteItem(id) {
    const { error } = await supabase
      .from('menu_items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  }
};
