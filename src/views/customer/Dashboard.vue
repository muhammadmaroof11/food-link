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
            <p class="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-1.5 transition-all">Gourmet Portal</p>
            <div class="flex items-center gap-3">
              <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-none">
                Hey, <span class="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{{ user?.full_name?.split(' ')[0] || 'Gourmet' }}</span>
              </h1>
              <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping mt-1"></div>
            </div>
          </div>
          
          <div class="flex items-center gap-4">
            <div class="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2.5 w-80 group focus-within:ring-4 focus-within:ring-primary/5 transition-all">
              <i class="fas fa-magnifying-glass text-slate-300 mr-3 group-focus-within:text-primary transition-colors"></i>
              <input type="text" placeholder="Search gourmet..." class="bg-transparent border-none outline-none text-sm font-bold text-slate-700 placeholder:text-slate-300 w-full" />
            </div>
            
            <button class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-600 shadow-sm hover:text-primary hover:border-primary/20 transition-all active:scale-95">
              <i class="fas fa-bell"></i>
            </button>
            <div @click="router.push('/customer/profile')" class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-900 overflow-hidden shadow-lg border-2 border-white shadow-primary/10 cursor-pointer active:scale-95 transition-transform group">
              <img class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" :src="user?.avatar_url || `https://ui-avatars.com/api/?name=${user?.full_name || 'User'}&background=ff4d00&color=fff`" alt="Profile" />
            </div>
          </div>
        </div>
      </header>

      <!-- Appetizing Search Hub (Mobile Focus) -->
      <section class="md:hidden px-6 mb-8 mt-2">
        <div class="relative group">
          <div class="absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/20 rounded-2xl blur opacity-25"></div>
          <div class="relative bg-white border border-slate-100 rounded-2xl flex items-center px-4 py-3.5 shadow-xl transition-all group-focus-within:ring-4 group-focus-within:ring-primary/5">
            <i class="fas fa-magnifying-glass mr-3 text-slate-300 group-focus-within:text-primary transition-colors"></i>
            <input class="bg-transparent border-none outline-none w-full text-sm font-bold text-slate-900 placeholder:text-slate-300" placeholder="What are you craving?" type="text" />
          </div>
        </div>
      </section>

      <!-- Content Container -->
      <main class="relative z-20 w-full pb-32 max-w-[1400px] mx-auto px-6 sm:px-12">
        <!-- Quick Categories -->
        <section class="mb-10 sm:mb-16">
          <div class="flex items-end justify-between mb-6">
            <div>
              <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tighter">Vibe of the day</h2>
              <p class="text-[10px] sm:text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Seasonal Selections</p>
            </div>
            <span class="text-[10px] sm:text-xs font-black uppercase text-primary tracking-widest cursor-pointer hover:underline bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10">Explore all</span>
          </div>
          
          <div class="flex gap-4 sm:gap-8 overflow-x-auto hide-scrollbar snap-x pt-2 px-1">
            <div v-for="cat in categories" :key="cat.name" class="flex flex-col items-center gap-3 snap-start group cursor-pointer min-w-[70px] sm:min-w-[90px]">
              <div class="relative">
                <div class="absolute -inset-2 bg-primary/5 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-all duration-500 scale-110"></div>
                <div class="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[2.2rem] bg-white flex items-center justify-center shadow-md border border-slate-50 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:rotate-2 group-hover:border-primary/20 transition-all duration-500 overflow-hidden relative">
                  <img :alt="cat.name" class="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" :src="cat.image"/>
                  <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-all"></div>
                </div>
              </div>
              <span class="font-black text-[9px] sm:text-[11px] text-slate-500 group-hover:text-primary transition-colors tracking-widest uppercase text-center">{{ cat.name }}</span>
            </div>
          </div>
        </section>

        <!-- Spotlight & Active Delivery -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 sm:gap-10 mb-12 sm:mb-20">
          <section class="xl:col-span-2">
            <div class="relative h-[15rem] sm:h-[22rem] rounded-[2rem] sm:rounded-[3.5rem] overflow-hidden shadow-2xl shadow-primary/10 group cursor-pointer border-4 border-white bg-slate-100">
              <img src="@/assets/branding/hero_banner.png" alt="Promo" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms] ease-out" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 sm:p-14">
                <div class="translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                  <span class="inline-flex items-center gap-2 bg-primary text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2.5 rounded-full mb-4 shadow-xl shadow-primary/20">
                    <i class="fas fa-fire animate-pulse"></i>
                    Elite Selection
                  </span>
                  <h3 class="text-3xl sm:text-5xl font-black text-white leading-none mb-6 sm:mb-8 tracking-tighter">Gourmet Logistics<br/>at <span class="text-secondary">Terminal Speed.</span></h3>
                  <button @click="router.push('/customer/search')" class="h-12 sm:h-16 px-8 sm:px-12 bg-white text-primary rounded-2xl text-[11px] sm:text-sm font-black uppercase tracking-widest shadow-2xl hover:bg-primary hover:text-white transition-all transform active:scale-95">Explore the Grid</button>
                </div>
              </div>
            </div>
          </section>

          <div class="space-y-8">
            <section v-if="activeOrder" class="h-full animate-scale-in">
              <div class="bg-slate-900 rounded-[2.5rem] p-8 h-full flex flex-col justify-between shadow-2xl shadow-slate-900/20 relative overflow-hidden group border border-white/10">
                <div class="absolute -right-20 -top-20 w-64 h-64 bg-primary/30 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
                
                <div>
                  <div class="flex items-center gap-4 mb-8">
                    <div class="w-14 h-14 rounded-[1.5rem] bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl animate-float">
                      <i class="fas fa-motorcycle text-white text-2xl"></i>
                    </div>
                    <div>
                      <p class="text-white/50 text-[10px] font-black uppercase tracking-widest mb-1">Live Mission</p>
                      <h4 class="text-white text-2xl font-black tracking-tighter">{{ activeOrder.status }}</h4>
                    </div>
                  </div>
                  <div class="space-y-4">
                    <div class="flex items-center gap-3 bg-white/5 p-4 rounded-2xl border border-white/5">
                      <div class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <p class="text-white text-xs font-bold leading-relaxed">Payload in transit to your port.</p>
                    </div>
                  </div>
                </div>
                
                <button @click="router.push('/customer/live-tracking')" class="w-full mt-8 h-14 bg-white text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-primary hover:text-white transition-all">Intercept Signal</button>
              </div>
            </section>
            <div v-else class="h-full bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200 flex flex-col items-center justify-center p-10 text-center opacity-40">
               <i class="fas fa-radar text-4xl mb-4 text-slate-300"></i>
               <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">No active missions</p>
            </div>
          </div>
        </div>

        <!-- Discover Header -->
        <section class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 class="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter">Active Merchants</h2>
            <p class="text-xs sm:text-sm font-bold text-slate-400 mt-2 flex items-center gap-2 uppercase tracking-widest">
              <span class="w-8 h-[2px] bg-primary"></span>
              Live signals from the grid
            </p>
          </div>
        </section>

        <!-- Restaurant Grid -->
        <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           <div v-for="i in 4" :key="i" class="h-80 bg-slate-50 rounded-[2.5rem] animate-pulse"></div>
        </div>

        <section v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
          <div v-for="restaurant in restaurants" :key="restaurant.id" 
            class="group relative" 
            @click="router.push(`/customer/restaurant/${restaurant.id}`)">
            
            <div class="relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.06)] hover:shadow-[0_45px_100px_-30px_rgba(255,77,0,0.15)] hover:-translate-y-3 transition-all duration-700 cursor-pointer h-full flex flex-col p-4">
              <!-- Image Area -->
              <div class="h-44 sm:h-56 relative overflow-hidden rounded-[2rem]">
                <img :alt="restaurant.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" :src="restaurant.image_url || 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800'"/>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div class="absolute top-4 right-4 flex gap-2">
                   <div class="bg-white/95 backdrop-blur-3xl px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-2xl border border-white/20">
                    <i class="fas fa-star text-secondary text-xs"></i>
                    <span class="font-black text-[10px] text-slate-900">{{ restaurant.rating || '5.0' }}</span>
                  </div>
                </div>
                
                <div class="absolute bottom-4 left-4">
                  <div class="bg-black/80 backdrop-blur-3xl px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-2xl border border-white/5">
                    <i class="fas fa-clock text-primary text-xs"></i>
                    <span class="font-black text-[10px] text-white">20-30 min</span>
                  </div>
                </div>
              </div>
              
              <div class="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 class="text-xl font-black text-slate-900 group-hover:text-primary transition-colors tracking-tighter leading-tight line-clamp-1 mb-2">{{ restaurant.name }}</h3>
                  <p class="text-[9px] text-slate-400 font-bold tracking-widest uppercase">{{ restaurant.cuisine || 'Gourmet Cuisine' }}</p>
                </div>
                
                <div class="mt-6 flex items-center justify-between pt-4 border-t border-slate-50">
                  <div class="flex flex-col">
                    <span class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</span>
                    <span :class="['text-xs font-black', restaurant.is_open ? 'text-emerald-500' : 'text-slate-300']">{{ restaurant.is_open ? 'Live Node' : 'Offline' }}</span>
                  </div>
                  <button class="w-10 h-10 rounded-xl bg-primary/5 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm">
                    <i class="fas fa-chevron-right text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div v-if="!loading && restaurants.length === 0" class="flex flex-col items-center justify-center py-32 opacity-20 space-y-4">
           <i class="fas fa-satellite-dish text-6xl"></i>
           <p class="text-[10px] font-black uppercase tracking-[0.4em]">No merchant signals detected</p>
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
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { restaurantService } from '@/services/restaurant';
import { cacheService } from '@/utils/cache';
import DesktopNav from '@/components/customer/DesktopNav.vue';
import CustomerBottomNav from '@/components/customer/CustomerBottomNav.vue';

const router = useRouter();
const authStore = useAuthStore();
const restaurants = ref([]);
const loading = ref(true);

const user = computed(() => authStore.profile);

const categories = [
  { name: 'Burgers', image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?auto=format&fit=crop&q=80&w=200' },
  { name: 'Pizza', image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=200' },
  { name: 'Sushi', image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=200' },
  { name: 'Desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=200' },
  { name: 'Coffee', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=200' },
  { name: 'Healthy', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200' },
];

const fetchData = async () => {
  try {
    const cached = cacheService.get('all_restaurants');
    if (cached) {
      restaurants.value = cached;
      loading.value = false;
    }

    const data = await restaurantService.getAll();
    restaurants.value = data;
    cacheService.set('all_restaurants', data);
  } catch (err) {
    console.error('Failed to fetch dashboard signal:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

const activeOrder = ref(null);
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
.animate-float {
  animation: float 4s ease-in-out infinite;
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-in {
  animation: scale-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
</style>
