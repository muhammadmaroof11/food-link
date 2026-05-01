import { defineStore } from 'pinia';
import { authService } from '../services/auth';
import { supabase } from '../utils/supabase';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    profile: null,
    loading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    userRole: (state) => state.profile?.role || 'customer',
    isAdmin: (state) => state.profile?.role === 'admin',
    isRestaurant: (state) => state.profile?.role === 'restaurant',
    isRider: (state) => state.profile?.role === 'rider'
  },

  actions: {
    async initialize() {
      this.loading = true;
      try {
        const data = await authService.getCurrentUser();
        if (data) {
          this.user = data;
          this.profile = data.profile;
        }
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async login(email, password) {
      this.loading = true;
      this.error = null;
      try {
        const data = await authService.signIn(email, password);
        await this.initialize();
        return data;
      } catch (err) {
        this.error = err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async register(email, password, fullName, role) {
      this.loading = true;
      this.error = null;
      try {
        const data = await authService.signUp(email, password, fullName, role);
        return data;
      } catch (err) {
        this.error = err.message;
        throw err;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        await authService.signOut();
        this.user = null;
        this.profile = null;
      } catch (err) {
        this.error = err.message;
      }
    },

    async deductBalance(amount) {
      if (!this.profile) return;
      const newBalance = parseFloat(this.profile.wallet_balance) - amount;
      
      const { data, error } = await supabase
        .from('profiles')
        .update({ wallet_balance: newBalance })
        .eq('id', this.user.id)
        .select()
        .single();
      
      if (error) throw error;
      this.profile.wallet_balance = newBalance;
      return data;
    },

    async fetchProfile() {
      if (!this.user) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', this.user.id)
        .single();
      
      if (error) throw error;
      this.profile = data;
    },

    async updateProfile(updates) {
      if (!this.user) return;
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', this.user.id)
        .select()
        .single();
      
      if (error) throw error;
      this.profile = data;
      return data;
    }
  }
});
