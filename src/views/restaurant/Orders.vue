<template>
  <div class="min-h-screen bg-background font-plus-jakarta antialiased selection:bg-primary/10 overflow-x-hidden flex">
    <!-- Desktop Sidebar -->
    <RestaurantSidebar class="hidden lg:flex" />

    <!-- Main Hub -->
    <div class="flex-1 flex flex-col min-h-screen relative lg:ml-64 bg-white">
      <!-- Identity Bar -->
      <header class="relative pt-6 pb-6 sm:pt-10 sm:pb-8 px-6 sm:px-12 overflow-hidden bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-[100] w-full">
        <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 animate-pulse"></div>
        
        <div class="relative z-10 flex justify-between items-center max-w-[1400px] mx-auto w-full">
          <div>
            <p class="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-1.5">Master Registry</p>
            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-none">Order History</h1>
          </div>
          
          <div class="flex items-center gap-4">
             <div class="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-6 py-2.5 w-64 group focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                <i class="fas fa-magnifying-glass text-slate-300 mr-3 text-xs group-focus-within:text-primary transition-colors"></i>
                <input type="text" placeholder="Search Master ID..." class="bg-transparent border-none outline-none text-xs font-black text-slate-700 placeholder:text-slate-300 w-full" />
             </div>
             <button class="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary shadow-sm active:scale-95 transition-all relative">
                <i class="fas fa-filter"></i>
                <span class="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
             </button>
          </div>
        </div>
      </header>

      <!-- Content Container -->
      <main class="relative z-20 flex-1 w-full pb-32 px-6 sm:px-12 max-w-[1400px] mx-auto space-y-16 mt-12 sm:mt-16">
        
        <div v-if="loading" class="flex flex-col items-center justify-center py-20 opacity-30">
          <i class="fas fa-spinner fa-spin text-4xl mb-4"></i>
          <p class="text-[10px] font-black uppercase tracking-[0.3em]">Syncing Order Pulse...</p>
        </div>

        <template v-else>
          <!-- Live Signals (Active Orders) -->
          <section class="space-y-8">
            <div class="flex items-end justify-between border-b border-slate-50 pb-6">
              <h3 class="text-2xl font-black text-slate-900 tracking-tighter">Live Pulse</h3>
              <p class="text-[10px] font-black text-primary uppercase tracking-widest">{{ liveOrders.length }} Active Signals</p>
            </div>

            <div class="grid grid-cols-1 gap-6">
              <div v-for="order in liveOrders" :key="order.id" class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:shadow-xl hover:border-primary/20 transition-all duration-500">
                <div class="flex items-center gap-6 w-full md:w-auto">
                  <div :class="['w-16 h-16 rounded-[1.8rem] flex items-center justify-center text-xl shadow-inner', getStatusBadge(order.status)]">
                    <i class="fas" :class="order.status === 'pending' ? 'fa-clock' : 'fa-fire-burner'"></i>
                  </div>
                  <div>
                    <div class="flex items-center gap-3 mb-1">
                      <p class="font-black text-slate-900 tracking-tight text-lg">Order #{{ order.id.slice(0, 8) }}</p>
                      <span class="px-3 py-1 rounded-lg bg-slate-50 text-[8px] font-black uppercase tracking-widest text-slate-400 border border-slate-100">{{ order.status }}</span>
                    </div>
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest">{{ order.profiles?.full_name || 'Guest User' }} • {{ order.order_items?.length }} Ingredients</p>
                  </div>
                </div>

                <div class="flex items-center gap-10 w-full md:w-auto justify-between md:justify-end">
                  <div class="text-right">
                    <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Total Yield</p>
                    <p class="text-xl font-black text-slate-900 tracking-tighter">{{ order.total_amount }} <span class="text-primary">₢</span></p>
                  </div>

                  <div class="flex items-center gap-3">
                    <button v-if="order.status === 'pending'" @click="handleStatusUpdate(order.id, 'confirmed')" class="h-14 px-8 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-primary transition-all shadow-xl">
                      Accept Signal
                    </button>
                    <button v-if="order.status === 'confirmed'" @click="handleStatusUpdate(order.id, 'preparing')" class="h-14 px-8 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl shadow-primary/20">
                      Start Prep
                    </button>
                    <button v-if="order.status === 'preparing'" @click="handleStatusUpdate(order.id, 'on_the_way')" class="h-14 px-8 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all shadow-xl">
                      Dispatch Rider
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="liveOrders.length === 0" class="flex flex-col items-center justify-center py-20 opacity-20 border-2 border-dashed border-slate-100 rounded-[3rem]">
                <i class="fas fa-satellite-dish text-4xl mb-4"></i>
                <p class="text-[10px] font-black uppercase tracking-[0.4em]">No Incoming Signals</p>
              </div>
            </div>
          </section>

          <!-- Transmission Archive (Past Orders) -->
          <section class="space-y-8 opacity-60 hover:opacity-100 transition-opacity">
            <div class="flex items-end justify-between border-b border-slate-50 pb-6">
              <h3 class="text-2xl font-black text-slate-900 tracking-tighter">Transmission Logs</h3>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">{{ pastOrders.length }} Total Dispatches</p>
            </div>

            <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
               <div class="overflow-x-auto">
                  <table class="w-full text-left">
                     <thead>
                        <tr class="bg-slate-50/50 border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <th class="px-10 py-6">Magnitude</th>
                           <th class="px-10 py-6">Target Entity</th>
                           <th class="px-10 py-6">Status</th>
                           <th class="px-10 py-6 text-right">Yield</th>
                        </tr>
                     </thead>
                     <tbody class="divide-y divide-slate-50">
                        <tr v-for="order in pastOrders" :key="order.id" class="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                           <td class="px-10 py-6">
                              <p class="font-black text-slate-900 tracking-tight text-xs">#{{ order.id.slice(0, 8) }}</p>
                              <p class="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">{{ new Date(order.created_at).toLocaleDateString() }}</p>
                           </td>
                           <td class="px-10 py-6">
                              <p class="text-xs font-black text-slate-900">{{ order.profiles?.full_name }}</p>
                           </td>
                           <td class="px-10 py-6">
                              <span :class="['px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest', order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600']">
                                {{ order.status }}
                              </span>
                           </td>
                           <td class="px-10 py-6 text-right">
                              <span class="text-xs font-black text-slate-900 tracking-tighter">{{ order.total_amount }} <span class="text-primary">₢</span></span>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
          </section>
        </template>
      </main>
    </div>

    <!-- Mobile Bottom Nav -->
    <RestaurantBottomNav class="lg:hidden" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { orderService } from '@/services/order';
import { restaurantService } from '@/services/restaurant';
import RestaurantSidebar from '@/components/restaurant/RestaurantSidebar.vue';
import RestaurantBottomNav from '@/components/restaurant/RestaurantBottomNav.vue';

const authStore = useAuthStore();
const restaurant = ref(null);
const orders = ref([]);
const loading = ref(true);

const liveOrders = computed(() => orders.value.filter(o => ['pending', 'confirmed', 'preparing', 'on_the_way'].includes(o.status)));
const pastOrders = computed(() => orders.value.filter(o => ['delivered', 'cancelled'].includes(o.status)));

const fetchData = async () => {
  try {
    const resData = await restaurantService.getByOwnerId(authStore.user.id);
    if (resData) {
      restaurant.value = resData;
      const orderData = await orderService.getRestaurantOrders(resData.id);
      orders.value = orderData;
    }
  } catch (err) {
    console.error('Failed to fetch orders:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();

  // Realtime subscription for new orders
  const subscription = supabase
    .channel('merchant-orders')
    .on('postgres_changes', { 
      event: '*', 
      schema: 'public', 
      table: 'orders',
      filter: `restaurant_id=eq.${restaurant.value?.id}`
    }, () => {
      fetchData(); // Refresh the list on any change
    })
    .subscribe();

  onUnmounted(() => supabase.removeChannel(subscription));
});

const handleStatusUpdate = async (orderId, status) => {
  try {
    await orderService.updateStatus(orderId, status);
    // Local update
    const order = orders.value.find(o => o.id === orderId);
    if (order) order.status = status;
  } catch (err) {
    alert('Signal transmission failed.');
  }
};

const getStatusBadge = (status) => {
  switch(status) {
    case 'pending': return 'bg-amber-500 text-white animate-pulse';
    case 'confirmed': return 'bg-blue-500 text-white';
    case 'preparing': return 'bg-primary text-white';
    case 'on_the_way': return 'bg-emerald-500 text-white';
    default: return 'bg-slate-100 text-slate-400';
  }
};

import { supabase } from '@/utils/supabase';
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
