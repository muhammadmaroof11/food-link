<template>
  <div class="min-h-screen bg-background font-plus-jakarta antialiased selection:bg-primary/10 overflow-x-hidden">
    <!-- Desktop Navigation Sidebar -->
    <DesktopNav />

    <!-- Main Content Area -->
    <div class="lg:ml-64 flex flex-col min-h-screen relative">
      <!-- Identity Bar -->
      <header class="relative pt-6 pb-6 sm:pt-10 sm:pb-8 px-6 sm:px-12 overflow-hidden bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-[100]">
        <div class="relative z-10 flex items-center justify-between max-w-[1400px] mx-auto w-full">
          <div class="flex items-center gap-4">
             <button @click="router.back()" class="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-all active:scale-95">
              <i class="fas fa-arrow-left text-xs"></i>
            </button>
            <div>
              <p class="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-1.5">Gourmet Selection</p>
              <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter leading-none">{{ restaurant.name }}</h1>
            </div>
          </div>

          <div class="flex items-center gap-4">
             <div class="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2 w-64 group focus-within:ring-4 focus-within:ring-primary/5 transition-all">
               <i class="fas fa-magnifying-glass text-slate-300 mr-2 group-focus-within:text-primary transition-colors text-xs"></i>
               <input type="text" placeholder="Search menu..." class="bg-transparent border-none outline-none text-xs font-bold text-slate-700 placeholder:text-slate-300 w-full" />
             </div>
             <button class="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg relative">
               <i class="fas fa-shopping-basket text-sm"></i>
               <span v-if="cartCount > 0" class="absolute -top-2 -right-2 bg-primary text-white text-[8px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">{{ cartCount }}</span>
             </button>
          </div>
        </div>
      </header>

      <!-- Content Container -->
      <main class="relative z-20 flex-1 w-full pb-32 px-6 sm:px-12 max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-3 gap-8 sm:gap-12 mt-8 sm:mt-12">
        <!-- Menu Column -->
        <div class="xl:col-span-2 space-y-12">
           <!-- Restaurant Hero Area -->
           <section class="relative h-64 sm:h-96 rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white group">
             <img :src="restaurant.heroImage" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]" />
             <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 sm:p-12">
                <div class="flex flex-wrap gap-2 mb-4">
                  <span v-for="tag in restaurant.tags" :key="tag" class="bg-white/10 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-white/10">{{ tag }}</span>
                </div>
                <div class="flex items-center gap-6 text-white/80">
                   <div class="flex items-center gap-2">
                     <i class="fas fa-star text-secondary"></i>
                     <span class="font-black text-white">{{ restaurant.rating }}</span>
                     <span class="text-[10px] font-bold uppercase tracking-widest opacity-60">({{ restaurant.reviews }}+)</span>
                   </div>
                   <div class="flex items-center gap-2">
                     <i class="fas fa-clock text-primary"></i>
                     <span class="font-black text-white">{{ restaurant.deliveryTime }}</span>
                   </div>
                </div>
             </div>
           </section>

           <!-- Category Navigation -->
           <nav class="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              <button v-for="(cat, i) in menuCategories" :key="cat" 
                @click="activeCategory = i"
                :class="['px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all transform active:scale-95 border',
                  activeCategory === i ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20' : 'bg-white text-slate-400 border-slate-100 hover:border-primary/20']">
                {{ cat }}
              </button>
           </nav>

           <!-- Dishes Grid -->
           <section class="space-y-8">
             <div class="flex items-end justify-between">
                <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter">{{ menuCategories[activeCategory] }}</h2>
                <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Aesthetic Bites</p>
             </div>

             <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                <div v-for="item in filteredMenuItems" :key="item.id" class="group bg-white rounded-[2.5rem] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.06)] hover:shadow-[0_45px_100px_-30px_rgba(255,77,0,0.12)] border border-slate-100 overflow-hidden flex flex-col transition-all duration-700 p-4">
                  <div class="h-44 relative overflow-hidden rounded-[2rem] mb-6">
                    <img :src="item.image" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                    <div v-if="item.badge" class="absolute top-4 left-4 bg-secondary text-white px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg">
                      {{ item.badge }}
                    </div>
                  </div>
                  <div class="px-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 class="font-black text-lg text-slate-900 group-hover:text-primary transition-colors tracking-tight line-clamp-1 mb-2">{{ item.name }}</h4>
                      <p class="text-xs text-slate-400 font-bold leading-relaxed line-clamp-2">{{ item.description }}</p>
                    </div>
                    <div class="flex items-center justify-between mt-8 pt-6 border-t border-slate-50">
                      <span class="text-xl font-black text-slate-900">{{ item.price }} <span class="text-primary text-sm tracking-tighter">₢</span></span>
                      
                      <div v-if="getItemQty(item.id) > 0" class="flex items-center bg-slate-900 text-white rounded-2xl p-1 gap-4 shadow-xl">
                        <button @click="removeFromCart(item.id)" class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 transition-all flex items-center justify-center"><i class="fas fa-minus text-[10px]"></i></button>
                        <span class="font-black text-xs min-w-[12px] text-center">{{ getItemQty(item.id) }}</span>
                        <button @click="addToCart(item)" class="w-8 h-8 rounded-xl bg-primary hover:scale-110 transition-all flex items-center justify-center"><i class="fas fa-plus text-[10px]"></i></button>
                      </div>
                      <button v-else @click="addToCart(item)" class="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 transition-all active:scale-95">
                        <i class="fas fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
             </div>
           </section>
        </div>

        <!-- Sidebar: Cart Summary (Desktop Only) -->
        <aside class="hidden xl:block">
           <div class="sticky top-32 bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl shadow-slate-900/20 relative overflow-hidden group border border-white/10">
              <div class="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000"></div>
              
              <div class="relative z-10 flex flex-col h-full min-h-[500px]">
                 <div class="flex items-center justify-between mb-10">
                   <h3 class="text-2xl font-black tracking-tighter">Gourmet Tray</h3>
                   <div class="bg-primary px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">{{ cartCount }} Signal</div>
                 </div>

                 <div class="flex-1 space-y-6 overflow-y-auto hide-scrollbar max-h-[300px] mb-10">
                   <div v-for="item in cartStore.items" :key="item.id" class="flex justify-between items-center group">
                      <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[10px] font-black">{{ item.quantity }}x</div>
                        <span class="text-xs font-black uppercase tracking-wider text-white/90">{{ item.name }}</span>
                      </div>
                      <span class="text-sm font-black text-primary">{{ (item.price * item.quantity).toFixed(1) }} ₢</span>
                   </div>
                   <div v-if="cartStore.items.length === 0" class="flex flex-col items-center justify-center py-12 text-white/30 space-y-4">
                      <i class="fas fa-utensils text-4xl opacity-20"></i>
                      <p class="text-[10px] font-black uppercase tracking-widest">Awaiting ingredients...</p>
                   </div>
                 </div>

                 <div class="pt-8 border-t border-white/10 space-y-6">
                    <div class="flex justify-between text-[11px] font-black uppercase tracking-widest text-white/50">
                      <span>Subtotal</span>
                      <span>{{ total.toFixed(1) }} ₢</span>
                    </div>
                    <div class="flex justify-between text-2xl font-black tracking-tighter">
                      <span>Total Signal</span>
                      <span class="text-primary">{{ total.toFixed(1) }} ₢</span>
                    </div>
                    <button @click="router.push('/customer/cart-checkout')" :disabled="cartCount === 0" class="w-full py-6 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-primary hover:text-white transition-all active:scale-95 disabled:opacity-30 disabled:scale-100">
                      Initiate Checkout
                    </button>
                 </div>
              </div>
           </div>
        </aside>
      </main>
    </div>

    <!-- Mobile View Cart FAB -->
    <div v-if="cartCount > 0" class="lg:hidden fixed bottom-6 left-6 right-6 z-50">
      <button @click="router.push('/customer/cart-checkout')" class="w-full bg-slate-900 text-white rounded-2xl shadow-2xl h-16 flex items-center justify-between px-6 active:scale-95 transition-all border border-white/10">
        <div class="flex items-center gap-3">
          <div class="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center text-[10px] font-black animate-pulse">{{ cartCount }}</div>
          <span class="text-xs font-black uppercase tracking-widest">View Gourmet Tray</span>
        </div>
        <span class="text-sm font-black">{{ total.toFixed(1) }} ₢</span>
      </button>
    </div>

    <!-- Mobile Navigation -->
    <div class="lg:hidden">
      <CustomerBottomNav />
    </div>
  </div>
</template>

import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import DesktopNav from '@/components/customer/DesktopNav.vue';
import CustomerBottomNav from '@/components/customer/CustomerBottomNav.vue';
import { restaurantService } from '@/services/restaurant';
import { useCartStore } from '@/stores/cart';

const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();

const restaurant = ref(null);
const menuItems = ref([]);
const loading = ref(true);
const activeCategory = ref(0);

const menuCategories = computed(() => {
  const cats = [...new Set(menuItems.value.map(item => item.category))];
  return cats.length > 0 ? cats : ['General'];
});

const fetchMenu = async () => {
  const restaurantId = route.params.id;
  if (!restaurantId) return;

  try {
    const data = await restaurantService.getById(restaurantId);
    restaurant.value = {
      id: data.id,
      name: data.name,
      heroImage: data.image_url || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1200',
      tags: [data.cuisine || 'Gourmet', 'Premium', '₢₢₢'],
      rating: data.rating || 5.0,
      reviews: 500,
      deliveryTime: '25-35 min',
    };
    
    menuItems.value = data.menu_items.map(item => ({
      ...item,
      image: item.image_url || 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=400'
    }));
  } catch (err) {
    console.error('Failed to fetch menu:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchMenu();
});

const filteredMenuItems = computed(() => {
  if (menuItems.value.length === 0) return [];
  const cat = menuCategories.value[activeCategory.value];
  return menuItems.value.filter(item => item.category === cat);
});

// Helper to get item qty from cart
const getItemQty = (itemId) => {
  const item = cartStore.items.find(i => i.id === itemId);
  return item ? item.quantity : 0;
};

const addToCart = (item) => {
  cartStore.addItem(item, restaurant.value.id);
};

const removeFromCart = (itemId) => {
  cartStore.removeItem(itemId);
};

const cartCount = computed(() => cartStore.cartCount);
const total = computed(() => cartStore.total);
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
