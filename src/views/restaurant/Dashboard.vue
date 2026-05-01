<template>
  <div class="min-h-screen bg-[#F1F5F9] font-plus-jakarta antialiased selection:bg-slate-900/10 flex">
    <!-- Functional Sidebar -->
    <RestaurantSidebar class="hidden lg:flex" />

    <!-- Terminal Hub -->
    <div class="flex-1 flex flex-col min-h-screen relative lg:ml-64 bg-[#F1F5F9]">
      <!-- Header Bar -->
      <header class="bg-white border-b border-slate-200 sticky top-0 z-[100] w-full px-6 py-5">
        <div class="max-w-[1400px] mx-auto flex justify-between items-center">
          <div>
            <h1 class="text-xl font-black text-slate-900 tracking-tight uppercase">Terminal Registry</h1>
            <div class="flex items-center gap-2 mt-1">
              <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span class="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Signal: Online</span>
            </div>
          </div>
          
          <button @click="router.push('/restaurant/profile')" class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
             <i class="fas fa-store"></i>
          </button>
        </div>
      </header>

      <!-- Workspace Container -->
      <main class="flex-1 w-full pb-32 px-6 max-w-[1400px] mx-auto mt-8 space-y-8">
        
        <!-- Utility Stats Bar -->
        <section class="grid grid-cols-2 md:grid-cols-4 gap-4">
           <div v-for="stat in dashStats" :key="stat.label" class="bg-white p-6 rounded-2xl border border-slate-200">
             <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ stat.label }}</p>
             <h3 class="text-2xl font-black text-slate-900 tracking-tighter">{{ stat.value }}</h3>
           </div>
           <button @click="router.push('/restaurant/menu-management')" class="bg-slate-900 text-white p-6 rounded-2xl flex items-center justify-between group hover:bg-primary transition-colors">
              <span class="text-[10px] font-black uppercase tracking-widest">Update Menu</span>
              <i class="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
           </button>
        </section>

        <!-- Command Queue: Incoming Signals -->
        <section class="space-y-6">
           <div class="flex items-center justify-between">
              <h3 class="text-xs font-black text-slate-500 uppercase tracking-[0.3em]">Incoming Pulse Queue</h3>
              <span class="bg-red-100 text-red-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse">Critical Signal</span>
           </div>

           <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div v-for="order in incomingOrders" :key="order.id" class="bg-white p-6 rounded-3xl border border-slate-200 hover:border-primary/20 transition-all flex flex-col justify-between space-y-6">
                
                <div class="flex justify-between items-start">
                  <div>
                    <p class="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{{ order.id }}</p>
                    <h4 class="text-2xl font-black text-slate-900 tracking-tight">{{ order.customer }}</h4>
                  </div>
                  <div class="text-right">
                     <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Payload Value</p>
                     <p class="text-lg font-black text-slate-900">{{ order.total }} Cr</p>
                  </div>
                </div>

                <div class="space-y-2">
                  <div v-for="item in order.items" :key="item.name" class="flex justify-between items-center bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl">
                     <span class="text-xs font-bold text-slate-700">{{ item.qty }}x {{ item.name }}</span>
                     <span class="text-[9px] font-black text-slate-400 uppercase tracking-widest">Ready</span>
                  </div>
                  <div v-if="order.note" class="bg-amber-50 border border-amber-100 p-3 rounded-xl">
                    <p class="text-[10px] font-bold text-amber-700">SIGNAL NOTE: "{{ order.note }}"</p>
                  </div>
                </div>

                <div class="flex gap-3 pt-4 border-t border-slate-50">
                   <button class="flex-1 h-12 bg-slate-100 text-slate-500 rounded-xl font-black uppercase tracking-widest text-[9px] hover:text-red-500 transition-colors">Abort</button>
                   <button class="flex-[2] h-12 bg-primary text-white rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-orange-600 transition-colors shadow-lg shadow-primary/10">Lock Mission</button>
                </div>
              </div>
           </div>
        </section>
      </main>
    </div>

    <!-- Navigation -->
    <div class="lg:hidden">
      <RestaurantBottomNav />
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import RestaurantSidebar from '@/components/restaurant/RestaurantSidebar.vue';
import RestaurantBottomNav from '@/components/restaurant/RestaurantBottomNav.vue';

const router = useRouter();

const dashStats = ref([
  { label: 'Total Volume', value: '142 Orders', icon: 'fa-receipt', change: '12%' },
  { label: 'Daily Credits', value: '2,845 ₢', icon: 'fa-coins', change: '8%' },
]);

const incomingOrders = ref([
  {
    id: 'ORD-8829',
    customer: 'Sarah Jenkins',
    total: 42.50,
    isNew: true,
    items: [
      { name: 'Truffle Burger with Fries', qty: 2 },
      { name: 'Vanilla Milkshake Artisan', qty: 1 },
    ],
    note: 'No pickles on one burger please.'
  },
  {
    id: 'ORD-8830',
    customer: 'Michael Chang',
    total: 18.00,
    isNew: false,
    items: [
      { name: 'Spicy Chicken Sandwich', qty: 1 },
    ],
    note: ''
  }
]);
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
