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
            <p class="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-1.5">Discovery Hub</p>
            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-none">Find Your Vibe</h1>
          </div>
          
          <div class="flex items-center gap-4">
             <div class="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2.5 w-80 group focus-within:ring-4 focus-within:ring-primary/5 transition-all">
              <i class="fas fa-magnifying-glass text-slate-300 mr-3 group-focus-within:text-primary transition-colors"></i>
              <input type="text" placeholder="Search gourmet..." v-model="searchQuery" class="bg-transparent border-none outline-none text-sm font-bold text-slate-700 placeholder:text-slate-300 w-full" />
            </div>
            <button class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all">
              <i class="fas fa-sliders text-sm"></i>
            </button>
          </div>
        </div>
      </header>

      <!-- Content Container -->
      <main class="relative z-20 flex-1 w-full pb-32 px-6 sm:px-12 max-w-[1400px] mx-auto space-y-8 sm:space-y-12">
        <!-- Dynamic Category Chips -->
        <section class="overflow-x-auto hide-scrollbar -mx-6 px-6">
          <div class="flex space-x-4 pb-2 w-max">
            <button v-for="(chip, i) in categoryChips" :key="chip.label"
              :class="['px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap flex items-center gap-3 transition-all transform active:scale-95',
                i === activeChip ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-white text-slate-400 border border-slate-100 shadow-sm hover:bg-slate-50']"
              @click="activeChip = i">
              <i :class="['fas', `fa-${chip.icon}`]"></i>
              <span>{{ chip.label }}</span>
            </button>
          </div>
        </section>

        <!-- Quick Filters -->
        <div class="flex flex-wrap gap-3">
          <button v-for="filter in quickFilters" :key="filter.label" class="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 font-bold text-[10px] uppercase tracking-widest hover:border-primary/20 hover:text-primary transition-all active:scale-95">
            <span>{{ filter.label }}</span>
            <i v-if="filter.icon" :class="['fas', `fa-${filter.icon}`, 'text-[8px]']"></i>
          </button>
        </div>

        <!-- Search Results Count -->
        <div class="flex items-center justify-between">
          <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter">Found {{ searchResults.length }} matching results</h2>
        </div>

        <!-- Dynamic Results Grid -->
        <section class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 sm:gap-10">
          <article v-for="result in searchResults" :key="result.id" 
            class="group bg-white rounded-[2.5rem] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.06)] hover:shadow-[0_45px_100px_-30px_rgba(255,77,0,0.12)] border border-slate-100 overflow-hidden flex flex-col transition-all duration-700 cursor-pointer p-4" 
            @click="router.push('/customer/restaurant-menu')">
            
            <div class="h-48 sm:h-56 relative overflow-hidden rounded-[2rem]">
              <img :alt="result.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" :src="result.image"/>
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              
              <div class="absolute top-4 right-4 flex flex-col gap-2">
                <div class="bg-white/95 backdrop-blur-sm px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-xl">
                  <i class="fas fa-star text-secondary text-xs"></i>
                  <span class="font-black text-[10px] text-slate-900">{{ result.rating }}</span>
                </div>
              </div>

              <!-- Top Badges -->
              <div class="absolute top-4 left-4 flex flex-col gap-2">
                <div v-if="result.cashback" class="bg-emerald-500 text-white px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
                  <i class="fas fa-tag"></i>
                  +{{ result.cashback }}% Reward
                </div>
                <div v-if="result.badge" :class="['px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg', result.badgeClass]">
                  {{ result.badge }}
                </div>
              </div>
            </div>

            <div class="p-6">
              <h3 class="text-xl font-black text-slate-900 group-hover:text-primary transition-colors tracking-tighter leading-tight line-clamp-1 mb-2">{{ result.name }}</h3>
              <p class="text-[9px] text-slate-400 font-bold tracking-widest uppercase mb-6">{{ result.cuisine }}</p>
              
              <div class="flex items-center justify-between pt-6 border-t border-slate-50">
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    <i class="fas fa-clock text-primary/40"></i>
                    <span>{{ result.deliveryTime }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    <i class="fas fa-map-location-dot text-primary/40"></i>
                    <span>{{ result.distance }}</span>
                  </div>
                </div>
                <button class="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                  <i class="fas fa-arrow-right text-xs"></i>
                </button>
              </div>
            </div>
          </article>
        </section>
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
import { useRouter } from 'vue-router';
import DesktopNav from '@/components/customer/DesktopNav.vue';
import CustomerBottomNav from '@/components/customer/CustomerBottomNav.vue';

const router = useRouter();
const searchQuery = ref('');
const activeChip = ref(0);

const categoryChips = ref([
  { label: 'Fast Food', icon: 'burger' },
  { label: 'Healthy', icon: 'leaf' },
  { label: 'Desserts', icon: 'ice-cream' },
  { label: 'Pizza', icon: 'pizza-slice' },
  { label: 'Asian', icon: 'bowl-rice' },
]);

const quickFilters = ref([
  { label: 'Sort Price', icon: 'chevron-down' },
  { label: 'Rating 4.5+', icon: 'star' },
  { label: 'Near Me', icon: 'location-crosshairs' },
  { label: 'Free Delivery', icon: null },
]);

const searchResults = ref([
  {
    id: 1,
    name: 'Burger Joint Central',
    cuisine: 'American • Burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800',
    rating: 4.8,
    deliveryTime: '15-25 min',
    distance: '1.2 mi',
    badge: 'Free Delivery',
    badgeClass: 'bg-slate-900 text-white',
    cashback: 15,
  },
  {
    id: 2,
    name: 'Green Bowl Cafe',
    cuisine: 'Healthy • Vegan',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    rating: 4.6,
    deliveryTime: '20-35 min',
    distance: '2.5 mi',
    badge: null,
    badgeClass: '',
    cashback: 0,
  },
  {
    id: 3,
    name: "Luigi's Oven",
    cuisine: 'Italian • Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    rating: 4.9,
    deliveryTime: '30-45 min',
    distance: '3.8 mi',
    badge: '-20% Off',
    badgeClass: 'bg-primary text-white',
    cashback: 10,
  },
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
