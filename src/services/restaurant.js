import { supabase } from '../utils/supabase';
import { cacheService } from '../utils/cache';

export const restaurantService = {
  /**
   * Get all active restaurants
   */
  async getAll() {
    const cached = cacheService.get('all_restaurants');
    if (cached) return cached;

    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('is_open', true);
    
    if (error) throw error;
    
    cacheService.set('all_restaurants', data);
    return data;
  },

  /**
   * Get restaurant by owner ID
   */
  async getByOwnerId(ownerId) {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('owner_id', ownerId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  /**
   * Create or update restaurant profile
   */
  async upsert(restaurant) {
    const { data, error } = await supabase
      .from('restaurants')
      .upsert([restaurant])
      .select();
    
    if (error) throw error;
    return data;
  }
};
