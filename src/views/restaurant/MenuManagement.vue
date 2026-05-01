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
            <p class="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-1.5">Inventory Terminal</p>
            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-none">Menu Registry</h1>
          </div>
          
          <div class="flex items-center gap-4">
             <div class="hidden md:flex items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2 w-64 group focus-within:ring-4 focus-within:ring-primary/5 transition-all">
               <i class="fas fa-magnifying-glass text-slate-300 mr-2 group-focus-within:text-primary transition-colors text-xs"></i>
               <input type="text" placeholder="Search registry..." class="bg-transparent border-none outline-none text-xs font-bold text-slate-700 placeholder:text-slate-300 w-full" />
             </div>
              <button @click="showAddModal = true" class="px-6 py-3 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                <i class="fas fa-plus"></i>
                New Ingredient
              </button>
           </div>
        </div>
      </header>

      <!-- Content Container -->
      <main class="relative z-20 flex-1 w-full pb-32 px-6 sm:px-12 max-w-[1400px] mx-auto space-y-16 mt-12 sm:mt-16">
        
        <div v-if="loading" class="flex flex-col items-center justify-center py-20 opacity-30">
          <i class="fas fa-spinner fa-spin text-4xl mb-4"></i>
          <p class="text-[10px] font-black uppercase tracking-[0.3em]">Syncing Registry...</p>
        </div>

        <template v-else>
          <section v-for="category in menuCategories" :key="category.name" class="space-y-8">
            <div class="flex items-end justify-between border-b border-slate-100 pb-6">
                <div class="flex items-center gap-4">
                  <h2 class="text-2xl font-black text-slate-900 tracking-tighter">{{ category.name }}</h2>
                  <span class="bg-slate-900 text-white px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest">{{ category.items.length }} Signal</span>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                <article v-for="dish in category.items" :key="dish.id" 
                  :class="['group bg-white rounded-[2.5rem] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.06)] hover:shadow-[0_45px_100px_-30px_rgba(255,77,0,0.12)] border border-slate-100 transition-all duration-700 p-4', !dish.is_available && 'opacity-60 saturate-50']">
                  
                  <div class="h-44 relative overflow-hidden rounded-[2rem] mb-6">
                    <img :src="dish.image_url || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=400'" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                    <div v-if="!dish.is_available" class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center">
                      <span class="text-[10px] font-black text-white uppercase tracking-[0.2em] animate-pulse">Out of Service</span>
                    </div>
                    <div class="absolute top-4 right-4 bg-white/95 px-3 py-1.5 rounded-xl text-[10px] font-black text-slate-900 shadow-xl">
                      {{ dish.price }} <span class="text-primary tracking-tighter">₢</span>
                    </div>
                  </div>

                  <div class="px-2">
                    <div class="flex justify-between items-start mb-4">
                      <h4 class="font-black text-lg text-slate-900 group-hover:text-primary transition-colors tracking-tight line-clamp-1">{{ dish.name }}</h4>
                      <button @click="deleteDish(dish.id)" class="text-slate-300 hover:text-red-500 transition-colors">
                        <i class="fas fa-trash-can text-xs"></i>
                      </button>
                    </div>
                    
                    <p class="text-xs text-slate-400 font-bold leading-relaxed line-clamp-2 mb-8">{{ dish.description }}</p>
                    
                    <div class="flex items-center justify-between pt-6 border-t border-slate-50">
                      <div class="flex items-center gap-3">
                        <div :class="['w-2 h-2 rounded-full', dish.is_available ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300']"></div>
                        <span class="text-[9px] font-black uppercase tracking-widest text-slate-400">{{ dish.is_available ? 'Live' : 'Offline' }}</span>
                      </div>
                      
                      <!-- Toggle Signal -->
                      <button @click="toggleAvailability(dish)" :class="['w-12 h-6 rounded-full p-1 transition-all flex items-center', dish.is_available ? 'bg-primary' : 'bg-slate-100']">
                        <div :class="['w-4 h-4 rounded-full bg-white shadow-sm transition-all', dish.is_available ? 'translate-x-6' : 'translate-x-0']"></div>
                      </button>
                    </div>
                  </div>
                </article>
            </div>
          </section>

          <div v-if="items.length === 0" class="flex flex-col items-center justify-center py-32 opacity-20 space-y-4">
            <i class="fas fa-box-open text-6xl"></i>
            <p class="text-[10px] font-black uppercase tracking-[0.4em]">Empty Registry Hub</p>
          </div>
        </template>

      </main>
    </div>

    <!-- Add Item Modal -->
    <div v-if="showAddModal" class="fixed inset-0 z-[1000] flex items-center justify-center p-6">
      <div @click="showAddModal = false" class="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
      
      <div class="relative bg-white w-full max-w-xl rounded-[3rem] shadow-2xl p-10 sm:p-12 space-y-8 animate-in fade-in zoom-in duration-300">
        <div class="text-center">
          <h3 class="text-3xl font-black text-slate-900 tracking-tighter">New Ingredient Registry</h3>
          <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Initialize dish in the gourmet grid</p>
        </div>

        <div class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Dish Name</label>
              <input v-model="newItem.name" type="text" placeholder="e.g. Biryani" class="w-full h-14 bg-slate-50 rounded-2xl px-6 font-black text-slate-900 text-xs outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
            </div>
            <div class="space-y-2">
              <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Category</label>
              <select v-model="newItem.category" class="w-full h-14 bg-slate-50 rounded-2xl px-6 font-black text-slate-900 text-xs outline-none focus:ring-4 focus:ring-primary/5 transition-all appearance-none">
                 <option>Main Course</option>
                 <option>Appetizers</option>
                 <option>Desserts</option>
                 <option>Beverages</option>
              </select>
            </div>
          </div>

          <div class="space-y-2">
            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Price (₢)</label>
            <input v-model.number="newItem.price" type="number" placeholder="24.50" class="w-full h-14 bg-slate-50 rounded-2xl px-6 font-black text-slate-900 text-xs outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
          </div>

          <div class="space-y-2">
            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Description</label>
            <textarea v-model="newItem.description" placeholder="Aromatic basmati rice with spice infusion..." class="w-full h-24 bg-slate-50 rounded-2xl p-6 font-black text-slate-900 text-xs outline-none focus:ring-4 focus:ring-primary/5 transition-all resize-none"></textarea>
          </div>

          <div class="space-y-2">
            <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Gourmet Asset (WebP Optimized)</label>
            <div class="relative group/upload h-32 rounded-[2rem] border-2 border-dashed border-slate-100 bg-slate-50 hover:bg-slate-100 hover:border-primary/20 transition-all flex items-center justify-center overflow-hidden">
               <input type="file" @change="handleFileUpload" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer z-10" />
               <div v-if="uploading" class="text-center">
                  <i class="fas fa-spinner fa-spin text-primary mb-2"></i>
                  <p class="text-[8px] font-black uppercase tracking-widest">Optimizing Signal...</p>
               </div>
               <div v-else-if="newItem.image_url" class="absolute inset-0">
                  <img :src="newItem.image_url" class="w-full h-full object-cover opacity-40" />
                  <div class="absolute inset-0 flex items-center justify-center">
                    <i class="fas fa-check-circle text-primary text-2xl"></i>
                  </div>
               </div>
               <div v-else class="text-center">
                  <i class="fas fa-cloud-arrow-up text-slate-300 text-xl mb-2 group-hover/upload:text-primary transition-colors"></i>
                  <p class="text-[8px] font-black uppercase tracking-widest text-slate-400">Drop Visual Signal Here</p>
               </div>
            </div>
          </div>

          <div class="flex gap-4 pt-4">
            <button @click="showAddModal = false" class="flex-1 h-16 bg-slate-50 text-slate-400 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-100 transition-all">
              Abort
            </button>
            <button @click="handleAddItem" :disabled="uploading || !newItem.image_url" class="flex-[2] h-16 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:scale-100">
              Authorize Dish
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div class="lg:hidden">
      <RestaurantBottomNav />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { menuService } from '@/services/menu';
import { restaurantService } from '@/services/restaurant';
import { optimizeImage } from '@/utils/imageOptimizer';
import { supabase } from '@/utils/supabase';
import RestaurantSidebar from '@/components/restaurant/RestaurantSidebar.vue';
import RestaurantBottomNav from '@/components/restaurant/RestaurantBottomNav.vue';

const authStore = useAuthStore();
const loading = ref(true);
const items = ref([]);
const restaurant = ref(null);
const showAddModal = ref(false);
const uploading = ref(false);

const newItem = ref({
  name: '',
  description: '',
  price: 0,
  category: 'Main Course',
  image_url: ''
});

const menuCategories = computed(() => {
  const cats = {};
  items.value.forEach(item => {
    const cat = item.category || 'Other';
    if (!cats[cat]) cats[cat] = [];
    cats[cat].push(item);
  });
  return Object.keys(cats).map(name => ({ name, items: cats[name] }));
});

const fetchData = async () => {
  try {
    const res = await restaurantService.getRestaurantByUserId(authStore.user.id);
    restaurant.value = res;
    if (res) {
      items.value = await menuService.getMenuItems(res.id);
    }
  } catch (err) {
    console.error('Failed to fetch menu:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  uploading.value = true;
  try {
    const optimizedFile = await optimizeImage(file, 800, 0.8);
    const filePath = `merchants/menu-items/${authStore.user.id}-${Date.now()}.webp`;
    const { error: uploadError } = await supabase.storage
      .from('foodlink-assets')
      .upload(filePath, optimizedFile);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('foodlink-assets')
      .getPublicUrl(filePath);

    newItem.value.image_url = publicUrl;
  } catch (err) {
    alert('Image upload failed');
  } finally {
    uploading.value = false;
  }
};

const handleAddItem = async () => {
  if (!newItem.value.name || !newItem.value.price) return;
  try {
    await menuService.addMenuItem({
      ...newItem.value,
      restaurant_id: restaurant.value.id,
      is_available: true
    });
    showAddModal.value = false;
    newItem.value = { name: '', description: '', price: 0, category: 'Main Course', image_url: '' };
    fetchData();
  } catch (err) {
    alert('Failed to add item to grid');
  }
};

const toggleAvailability = async (item) => {
  try {
    await menuService.updateMenuItem(item.id, { is_available: !item.is_available });
    fetchData();
  } catch (err) {
    alert('Signal toggle failed');
  }
};

const deleteDish = async (id) => {
  if (!confirm('De-authorize this ingredient from the grid?')) return;
  try {
    await menuService.deleteMenuItem(id);
    fetchData();
  } catch (err) {
    alert('Delete signal failed');
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
