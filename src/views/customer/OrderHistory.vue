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
        
        <div class="relative z-10 flex justify-between items-center max-w-[1400px] mx-auto w-full">
          <div>
            <p class="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-1.5">Gourmet Logs</p>
            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-none">Order History</h1>
          </div>
          
          <div class="flex items-center gap-4">
             <button class="px-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-all flex items-center gap-3">
              Sort: Recent
              <i class="fas fa-chevron-down"></i>
            </button>
          </div>
        </div>
      </header>

      <!-- Content Container -->
      <main class="relative z-20 flex-1 w-full pb-32 px-6 sm:px-12 max-w-[1400px] mx-auto space-y-6 sm:space-y-8">
        <!-- Search/Filter Orders -->
        <div class="max-w-2xl bg-white border border-slate-100 rounded-3xl p-2 flex items-center shadow-sm">
           <i class="fas fa-magnifying-glass text-slate-300 ml-6 mr-3"></i>
           <input type="text" placeholder="Search orders..." class="flex-1 bg-transparent border-none outline-none py-4 text-sm font-bold text-slate-600 placeholder:text-slate-300">
           <button class="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mr-1 shadow-lg active:scale-95 transition-all">
             <i class="fas fa-sliders text-sm"></i>
           </button>
        </div>

        <!-- Order Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div v-for="order in mockOrders" :key="order.id" class="group bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.06)] hover:shadow-[0_45px_100px_-30px_rgba(255,77,0,0.12)] border border-slate-100 transition-all duration-500 cursor-pointer relative overflow-hidden">
            <div class="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-1000"></div>
            
            <div class="relative z-10">
              <div class="flex justify-between items-start mb-6">
                <div>
                  <h3 class="font-black text-xl sm:text-2xl text-slate-900 tracking-tighter group-hover:text-primary transition-colors">{{ order.restaurant }}</h3>
                  <p class="text-[10px] sm:text-xs font-bold text-slate-400 mt-1 uppercase tracking-[0.15em]">{{ order.time }} • {{ order.total }}</p>
                </div>
                <span :class="statusClass(order.status)" class="px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border">{{ order.status }}</span>
              </div>

              <div class="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-100/50">
                <div class="flex items-center gap-3 text-slate-500 text-[11px] sm:text-sm font-bold">
                  <i class="fas fa-utensils text-primary/40"></i>
                  <span class="line-clamp-1 italic">{{ order.items.join(', ') }}</span>
                </div>
              </div>

              <div class="flex gap-3 sm:gap-4">
                <button class="flex-1 h-12 bg-white text-slate-400 rounded-xl font-black text-[10px] uppercase tracking-widest border border-slate-100 hover:text-primary hover:border-primary/20 transition-all">Rate Gourmet</button>
                <button class="flex-1 h-12 bg-primary text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all">Reorder Signal</button>
              </div>
            </div>
          </div>
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
import { ref } from 'vue';
import DesktopNav from '@/components/customer/DesktopNav.vue';
import CustomerBottomNav from '@/components/customer/CustomerBottomNav.vue';

const mockOrders = ref([
  { id: 1, restaurant: 'Burger King Artisan', time: '2 days ago', total: '35.50 ₢', status: 'Delivered', items: ['1x Whopper Meal', '1x Onion Rings'] },
  { id: 2, restaurant: 'Sushi Master Labs', time: '5 days ago', total: '42.00 ₢', status: 'Delivered', items: ['2x Salmon Roll', '1x Miso Soup'] },
  { id: 3, restaurant: 'Taco Fiesta Gourmet', time: '1 week ago', total: '28.00 ₢', status: 'Cancelled', items: ['3x Beef Tacos', '1x Nachos'] },
  { id: 4, restaurant: 'Bella Cucina Napoli', time: '2 weeks ago', total: '55.20 ₢', status: 'Delivered', items: ['1x Margherita DOC', '1x Truffle Risotto'] }
]);

const statusClass = (status) => {
  if (status === 'Delivered') return 'bg-emerald-50 text-emerald-600 border-emerald-100';
  if (status === 'Cancelled') return 'bg-red-50 text-red-600 border-red-100';
  return 'bg-slate-50 text-slate-500 border-slate-100';
};
</script>
