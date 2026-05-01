import { supabase } from '../utils/supabase';

export const riderService = {
  /**
   * Get available orders for pickup (Rider-less orders)
   */
  async getAvailableMissions() {
    const { data, error } = await supabase
      .from('orders')
      .select('*, restaurants(name, address), profiles(full_name, delivery_address)')
      .is('rider_id', null)
      .eq('status', 'preparing')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  /**
   * Accept a delivery mission
   */
  async acceptMission(orderId, riderId) {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        rider_id: riderId,
        status: 'on_the_way',
        updated_at: new Date()
      })
      .eq('id', orderId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  /**
   * Get current active mission for a rider
   */
  async getActiveMission(riderId) {
    const { data, error } = await supabase
      .from('orders')
      .select('*, restaurants(*), profiles(*)')
      .eq('rider_id', riderId)
      .eq('status', 'on_the_way')
      .maybeSingle();
    
    if (error) throw error;
    return data;
  },

  /**
   * Complete a delivery
   */
  async completeDelivery(orderId, deliveryFee) {
    const { data, error } = await supabase
      .from('orders')
      .update({ 
        status: 'delivered',
        updated_at: new Date()
      })
      .eq('id', orderId)
      .select()
      .single();
    
    if (error) throw error;

    // Record earning transaction for the rider
    const { error: txError } = await supabase
      .from('transactions')
      .insert([{
        user_id: data.rider_id,
        type: 'reward',
        amount: deliveryFee,
        title: `Delivery Fee: Order #${orderId.slice(0, 8)}`,
        reference_id: orderId
      }]);

    if (txError) throw txError;

    return data;
  }
};
