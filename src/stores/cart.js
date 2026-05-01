import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    restaurantId: null,
    deliveryFee: 5.00
  }),

  getters: {
    cartCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: (state) => state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    total: (state) => state.items.length > 0 ? state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0) + state.deliveryFee : 0
  },

  actions: {
    addItem(item, restaurantId) {
      // If adding from a different restaurant, clear the cart first
      if (this.restaurantId && this.restaurantId !== restaurantId) {
        if (!confirm('Add from a different restaurant? This will clear your current tray.')) return;
        this.clearCart();
      }

      this.restaurantId = restaurantId;
      const existing = this.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity++;
      } else {
        this.items.push({ ...item, quantity: 1 });
      }
    },

    removeItem(itemId) {
      const index = this.items.findIndex(i => i.id === itemId);
      if (index > -1) {
        if (this.items[index].quantity > 1) {
          this.items[index].quantity--;
        } else {
          this.items.splice(index, 1);
        }
      }
      
      if (this.items.length === 0) {
        this.restaurantId = null;
      }
    },

    clearCart() {
      this.items = [];
      this.restaurantId = null;
    }
  }
});
