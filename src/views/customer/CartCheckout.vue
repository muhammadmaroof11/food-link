<template>
  <div class="min-h-screen bg-background font-plus-jakarta antialiased selection:bg-primary/10 overflow-x-hidden">
    <!-- Desktop Navigation Sidebar -->
    <DesktopNav />

    <!-- Main Content Area -->
    <div class="lg:ml-64 flex flex-col min-h-screen relative">
      <!-- Identity Bar -->
      <header class="relative pt-6 pb-6 sm:pt-10 sm:pb-8 px-6 sm:px-12 overflow-hidden bg-white">
        <!-- Appetizing Decor -->
        <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 animate-pulse"></div>
        
        <div class="relative z-10 flex items-center justify-between max-w-[1400px] mx-auto w-full">
          <div class="flex items-center gap-4">
             <button @click="router.back()" class="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all active:scale-95">
              <i class="fas fa-arrow-left text-xs"></i>
            </button>
            <div>
              <p class="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-1.5">Secure Checkout</p>
              <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-none">Confirm Gourmet Order</h1>
            </div>
          </div>
        </div>
      </header>

      <!-- Content Container -->
      <main class="relative z-20 flex-1 w-full pb-48 px-6 sm:px-12 max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8 sm:gap-10">
        <!-- Main Column: Cart & Details -->
        <div class="xl:col-span-2 space-y-8 sm:space-y-12">
          <!-- Delivery Hub -->
          <section class="space-y-6">
            <h2 class="text-xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
              <i class="fas fa-map-location-dot text-primary/40"></i>
              Port Coordinates
            </h2>
            <div class="bg-white p-8 rounded-[2.5rem] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.06)] border border-slate-100 flex items-start gap-6 group cursor-pointer hover:border-primary/20 transition-all">
               <div class="w-14 h-14 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 transition-transform">
                 <i class="fas fa-house text-xl"></i>
               </div>
               <div class="flex-1">
                 <h3 class="font-black text-lg text-slate-900 mb-1">Primary Residence (Home)</h3>
                 <p class="text-slate-400 font-bold text-sm leading-relaxed">123 Luxury Avenue, Burj Khalifa District, Downtown Dubai</p>
               </div>
               <button class="w-10 h-10 rounded-xl bg-slate-50 text-slate-300 flex items-center justify-center hover:text-primary transition-colors">
                 <i class="fas fa-pen-to-square text-xs"></i>
               </button>
            </div>
          </section>

          <!-- Order Summary -->
          <section class="space-y-6">
            <h2 class="text-xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
              <i class="fas fa-receipt text-primary/40"></i>
              Gourmet Selection
            </h2>
            <div class="bg-white p-8 rounded-[2.5rem] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.06)] border border-slate-100 space-y-6">
              <div v-for="item in cartItems" :key="item.id" class="flex justify-between items-center group">
                 <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 font-black text-xs group-hover:bg-primary/5 group-hover:text-primary transition-all">
                      {{ item.quantity }}x
                    </div>
                    <div>
                      <h4 class="font-black text-slate-900 text-sm tracking-tight">{{ item.name }}</h4>
                      <p v-if="item.is_flash_sale" class="text-[9px] font-black text-emerald-500 uppercase tracking-widest mt-0.5">Flash Sale Applied</p>
                    </div>
                  </div>
                  <span class="font-black text-slate-900 tracking-tight">{{ (item.price * item.quantity).toFixed(1) }} ₢</span>
               </div>
               <div v-if="cartItems.length === 0" class="py-10 text-center">
                  <p class="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">No items detected in tray</p>
               </div>
            </div>
          </section>

          <!-- Payment Hub -->
          <section class="space-y-6">
            <h2 class="text-xl font-black text-slate-900 tracking-tighter flex items-center gap-3">
              <i class="fas fa-shield-check text-primary/40"></i>
              Payment Protocol
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Wallet Option -->
              <div @click="paymentMethod = 'wallet'" :class="['p-8 rounded-[2rem] border-2 transition-all cursor-pointer group shadow-sm flex flex-col justify-between h-40', 
                paymentMethod === 'wallet' ? 'border-primary bg-primary/5 shadow-primary/10' : 'border-slate-50 bg-white hover:border-slate-200']">
                 <div class="flex justify-between items-start">
                   <div :class="['w-12 h-12 rounded-xl flex items-center justify-center transition-all', paymentMethod === 'wallet' ? 'bg-primary text-white shadow-xl' : 'bg-slate-50 text-slate-400 group-hover:text-primary']">
                      <i class="fas fa-wallet text-lg"></i>
                   </div>
                   <div :class="['w-6 h-6 rounded-full border-2 flex items-center justify-center p-1', paymentMethod === 'wallet' ? 'border-primary bg-primary' : 'border-slate-200']">
                     <div v-if="paymentMethod === 'wallet'" class="w-full h-full rounded-full bg-white"></div>
                   </div>
                 </div>
                  <div>
                    <p :class="['font-black text-sm uppercase tracking-widest', paymentMethod === 'wallet' ? 'text-primary' : 'text-slate-800']">FoodLink Wallet</p>
                    <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Balance: {{ user?.wallet_balance || '0.00' }} ₢</p>
                  </div>
              </div>

              <!-- COD Option -->
              <div @click="paymentMethod = 'cod'" :class="['p-8 rounded-[2rem] border-2 transition-all cursor-pointer group shadow-sm flex flex-col justify-between h-40', 
                paymentMethod === 'cod' ? 'border-slate-900 bg-slate-900 text-white shadow-slate-900/20' : 'border-slate-50 bg-white hover:border-slate-200']">
                 <div class="flex justify-between items-start">
                   <div :class="['w-12 h-12 rounded-xl flex items-center justify-center transition-all', paymentMethod === 'cod' ? 'bg-white text-slate-900 shadow-xl' : 'bg-slate-50 text-slate-400 group-hover:text-slate-900']">
                      <i class="fas fa-money-bill-transfer text-lg"></i>
                   </div>
                   <div :class="['w-6 h-6 rounded-full border-2 flex items-center justify-center p-1', paymentMethod === 'cod' ? 'border-white bg-white' : 'border-slate-200']">
                     <div v-if="paymentMethod === 'cod'" class="w-full h-full rounded-full bg-slate-900"></div>
                   </div>
                 </div>
                 <div>
                   <p :class="['font-black text-sm uppercase tracking-widest', paymentMethod === 'cod' ? 'text-white' : 'text-slate-800']">Delivery Cash</p>
                   <p class="text-[10px] font-bold text-slate-400/70 uppercase tracking-widest mt-1">Pay at your port</p>
                 </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Sidebar: Order Breakdown -->
        <div class="space-y-8">
           <section class="sticky top-12">
             <div class="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
               <div class="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
               
               <h3 class="text-2xl font-black tracking-tighter mb-8 relative z-10">Total Signal</h3>
               
               <div class="space-y-6 mb-10 relative z-10">
                 <div class="flex justify-between items-center text-sm font-bold text-white/50">
                    <span class="uppercase tracking-widest">Subtotal</span>
                    <span class="text-white">{{ totalCost }} ₢</span>
                 </div>
                 <div class="flex justify-between items-center text-sm font-bold text-white/50">
                    <span class="uppercase tracking-widest">Port Fee</span>
                    <span class="text-white">{{ cartStore.deliveryFee }} ₢</span>
                 </div>
                 <div class="pt-6 border-t border-white/10 flex justify-between items-center">
                    <span class="text-lg font-black uppercase tracking-tighter">Grand Total</span>
                    <span class="text-3xl font-black text-primary tracking-tighter">{{ totalCost }} ₢</span>
                 </div>
               </div>

                <!-- Booking/Rewards Breakdown -->
                <div class="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4 mb-8">
                   <div class="flex justify-between text-[11px] font-black uppercase tracking-widest text-primary">
                     <span>Port Delivery Signal</span>
                     <span>{{ cartStore.deliveryFee.toFixed(1) }} ₢</span>
                   </div>
                   <div v-if="error" class="text-red-400 text-[9px] font-black uppercase tracking-widest text-center py-2 animate-pulse">
                     {{ error }}
                   </div>
                </div>

                <button @click="handlePlaceOrder" :disabled="isProcessing || cartItems.length === 0" class="w-full py-6 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-primary hover:text-white transition-all active:scale-95 group relative z-10 disabled:opacity-50">
                  <span v-if="!isProcessing">Finalize Gourmet Order</span>
                  <span v-else class="flex items-center justify-center gap-3">
                    <i class="fas fa-spinner fa-spin"></i>
                    Encoding Transaction...
                  </span>
                </button>
                <p class="text-[9px] text-center text-white/40 font-black uppercase tracking-widest mt-6">Encrypted via FoodLink Secure Labs</p>
              </div>
           </section>
        </div>
      </main>
    </div>

    <!-- Mobile Navigation -->
    <div class="lg:hidden">
      <CustomerBottomNav />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import DesktopNav from '@/components/customer/DesktopNav.vue';
import CustomerBottomNav from '@/components/customer/CustomerBottomNav.vue';
import { useAuthStore } from '@/stores/auth';
import { useCartStore } from '@/stores/cart';
import { orderService } from '@/services/order';

const router = useRouter();
const authStore = useAuthStore();
const cartStore = useCartStore();

const paymentMethod = ref('wallet');
const isProcessing = ref(false);
const error = ref('');

const user = computed(() => authStore.profile);
const cartItems = computed(() => cartStore.items);
const totalCost = computed(() => cartStore.total);

const handlePlaceOrder = async () => {
  if (!user.value) return router.push('/login');
  if (cartItems.value.length === 0) return;

  if (parseFloat(user.value.wallet_balance) < totalCost.value) {
    error.value = 'Insufficient Spectral Credits. Please top up your wallet.';
    return;
  }

  isProcessing.value = true;
  error.value = '';

  try {
    // 1. Deduct Balance
    await authStore.deductBalance(totalCost.value);

    // 2. Prepare Order Data
    const orderData = {
      customer_id: authStore.user.id,
      restaurant_id: cartStore.restaurantId,
      total_amount: totalCost.value,
      delivery_fee: cartStore.deliveryFee,
      status: 'pending'
    };

    // 3. Place Order via Service
    const order = await orderService.placeOrder(orderData, cartItems.value);

    // 4. Clear Cart and Redirect
    cartStore.clearCart();
    router.push({ path: '/customer/live-tracking', query: { id: order.id } });

  } catch (err) {
    console.error('Checkout error:', err);
    error.value = 'Transmission Failed. Protocol aborted.';
  } finally {
    isProcessing.value = false;
  }
};
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
