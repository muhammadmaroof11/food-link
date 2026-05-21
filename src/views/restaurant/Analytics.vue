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
            <p class="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-1.5">Financial Terminal</p>
            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-none">Earnings Analysis</h1>
          </div>
          
          <div class="flex items-center gap-4">
             <div class="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-2xl p-1 gap-1">
               <button v-for="filter in timeFilters" :key="filter.label" @click="setTimeFilter(filter.label)"
                 :class="['px-6 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all', 
                   activeTimeFilter === filter.label ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:text-primary']">
                 {{ filter.label }}
               </button>
             </div>
             <button class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary shadow-sm">
               <i class="fas fa-download"></i>
             </button>
          </div>
        </div>
      </header>

      <!-- Content Container -->
      <main class="relative z-20 flex-1 w-full pb-32 px-6 sm:px-12 max-w-[1400px] mx-auto space-y-12 mt-12 sm:mt-16">
        
        <!-- KPI Cards -->
        <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <div v-for="kpi in kpiCards" :key="kpi.label" class="group bg-white p-8 rounded-[2.5rem] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.06)] hover:shadow-[0_45px_100px_-30px_rgba(255,77,0,0.12)] border border-slate-100 transition-all duration-500 relative overflow-hidden">
             <div class="absolute -right-8 -top-8 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
             
             <div class="relative z-10 space-y-6">
                <div class="flex justify-between items-start">
                  <div class="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xl group-hover:bg-primary transition-colors">
                     <i :class="['fas', kpi.icon, 'text-xl']"></i>
                  </div>
                  <div :class="['flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest', kpi.trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500']">
                     <i :class="['fas', kpi.trend > 0 ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down']"></i>
                     {{ kpi.trend }}%
                  </div>
                </div>
                <div>
                   <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ kpi.label }}</p>
                   <h3 class="text-3xl font-black text-slate-900 tracking-tighter">{{ kpi.value }}</h3>
                </div>
             </div>
           </div>
        </section>

        <!-- Revenue Visualization -->
        <section class="bg-slate-900 p-8 sm:p-12 rounded-[3.5rem] shadow-2xl shadow-slate-900/20 relative overflow-hidden group border border-white/10 text-white">
           <div class="absolute -right-40 -top-40 w-96 h-96 bg-primary/20 rounded-full blur-[120px] group-hover:scale-150 transition-transform duration-[2000ms]"></div>
           
           <div class="relative z-10 flex flex-col xl:flex-row gap-12 sm:items-end h-full">
              <div class="xl:w-1/3 space-y-6">
                 <h3 class="text-3xl font-black tracking-tighter">Gross Signal Revenue</h3>
                 <p class="text-xs text-white/50 font-bold leading-relaxed">Daily spectral analysis of high-volume gourmet transactions across your merchant terminal.</p>
                 <div class="pt-6">
                    <span class="text-[9px] font-black uppercase tracking-widest text-primary">Peak Performance</span>
                    <h4 class="text-2xl font-black tracking-tight mt-2">+24.2% Growth Signal</h4>
                 </div>
              </div>
              
              <!-- Custom Stylized Chart -->
              <div class="flex-1 flex items-end justify-between gap-2 sm:gap-6 h-64 border-b border-white/10 pb-2">
                 <div v-for="bar in chartBars" :key="bar.label" 
                   class="flex-1 flex flex-col items-center gap-4 group/bar cursor-pointer">
                    <div class="w-full relative flex flex-col justify-end h-48">
                       <div class="bg-white/10 w-full rounded-t-xl group-hover/bar:bg-primary/20 transition-all absolute inset-0" :style="`height: ${bar.height}%`"></div>
                       <div v-if="bar.isHighlighted" class="bg-primary w-full rounded-t-xl shadow-primary-glow animate-pulse px-1" :style="`height: ${bar.height-20}%`"></div>
                    </div>
                    <span class="text-[9px] font-black uppercase tracking-widest text-white/30 group-hover/bar:text-white transition-colors">{{ bar.label }}</span>
                 </div>
              </div>
           </div>
        </section>

        <!-- Top dishes -->
        <section class="space-y-8">
           <div class="flex items-end justify-between">
              <h3 class="text-2xl font-black text-slate-900 tracking-tighter">High-Volume Dishes</h3>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Spectral Performance</p>
           </div>

           <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.06)] overflow-hidden">
              <div class="overflow-x-auto">
                 <table class="w-full text-left">
                    <thead>
                       <tr class="bg-slate-50/50 border-b border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          <th class="px-10 py-6">Ingredient Protocol</th>
                          <th class="px-10 py-6">Units Dispatched</th>
                          <th class="px-10 py-6 text-right">Revenue Signal</th>
                          <th class="px-10 py-6 text-right">Growth delta</th>
                       </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-50">
                       <tr v-for="dish in topDishes" :key="dish.name" class="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                          <td class="px-10 py-6 flex items-center gap-4">
                             <div class="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden group-hover:scale-110 transition-transform">
                                <img :src="dish.image" class="w-full h-full object-cover" />
                             </div>
                             <span class="font-black text-slate-900 tracking-tight">{{ dish.name }}</span>
                          </td>
                          <td class="px-10 py-6">
                             <span class="text-xs font-bold text-slate-500">{{ dish.unitsSold }} Transmitted</span>
                          </td>
                          <td class="px-10 py-6 text-right font-black text-slate-900">{{ dish.revenue }} <span class="text-primary tracking-tighter">₢</span></td>
                          <td class="px-10 py-6 text-right" :class="dish.trend > 0 ? 'text-emerald-500' : 'text-red-500'">
                             <span class="text-[10px] font-black uppercase tracking-widest flex items-center justify-end gap-2">
                                <i :class="['fas', dish.trend > 0 ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down']"></i>
                                {{ Math.abs(dish.trend) }}%
                             </span>
                          </td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>
        </section>

      </main>
    </div>

    <!-- Mobile Bottom Nav -->
    <RestaurantBottomNav class="lg:hidden" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getDishPlaceholder } from '@/utils/placeholders';
import RestaurantSidebar from '@/components/restaurant/RestaurantSidebar.vue';
import RestaurantBottomNav from '@/components/restaurant/RestaurantBottomNav.vue';

const router = useRouter();
const activeTimeFilter = ref('30D');

const timeFilters = ref([
  { label: '7D' },
  { label: '30D' },
  { label: '3M' },
]);

const setTimeFilter = (label) => {
  activeTimeFilter.value = label;
};

const kpiCards = ref([
  { label: 'Total Revenue Terminal', value: '24,592 ₢', icon: 'fa-vault', trend: 12.5 },
  { label: 'Master Order Flow', value: '1,284', icon: 'fa-receipt', trend: 8.2 },
  { label: 'Order Spectrum Value', value: '19.15 ₢', icon: 'fa-chart-pie', trend: -1.4 },
]);

const chartBars = ref([
  { label: 'Mon', height: 40, isHighlighted: false },
  { label: 'Tue', height: 65, isHighlighted: false },
  { label: 'Wed', height: 55, isHighlighted: false },
  { label: 'Thu', height: 80, isHighlighted: true },
  { label: 'Fri', height: 45, isHighlighted: false },
  { label: 'Sat', height: 90, isHighlighted: false },
  { label: 'Sun', height: 75, isHighlighted: false },
]);

const topDishes = ref([
  { name: 'Classic Double Burger Labs', unitsSold: 342, revenue: '4,104', trend: 14, image: getDishPlaceholder('Classic Double Burger Labs') },
  { name: 'Pepperoni Artisan Pizza', unitsSold: 289, revenue: '5,202', trend: 8, image: getDishPlaceholder('Pepperoni Artisan Pizza') },
  { name: 'Avocado Quinoa Signal Bowl', unitsSold: 156, revenue: '2,184', trend: -2, image: getDishPlaceholder('Avocado Quinoa Signal Bowl') },
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
