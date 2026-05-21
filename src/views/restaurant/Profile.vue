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
            <p class="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-1.5">Terminal Identity</p>
            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-none">Merchant Profile</h1>
          </div>
          
          <button v-if="vendor" @click="handleSave" class="px-8 py-3 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-2xl hover:bg-primary transition-all">
            Update Signal
          </button>
        </div>
      </header>

      <!-- Content Container -->
      <main class="relative z-20 flex-1 w-full pb-32 px-6 sm:px-12 max-w-[1400px] mx-auto space-y-12 mt-12 sm:mt-16">
        
        <div v-if="loading" class="flex flex-col items-center justify-center py-20 opacity-30">
          <i class="fas fa-spinner fa-spin text-4xl mb-4"></i>
          <p class="text-[10px] font-black uppercase tracking-[0.3em]">Syncing Terminal...</p>
        </div>

        <div v-else-if="!vendor" class="max-w-2xl mx-auto bg-white p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 space-y-10">
          <div class="text-center">
            <h2 class="text-3xl font-black text-slate-900 tracking-tighter mb-4">Onboard Your Node</h2>
            <p class="text-xs text-slate-400 font-bold uppercase tracking-widest">Initialize your gourmet presence in the district.</p>
          </div>

          <div class="space-y-6">
            <div class="space-y-2">
              <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Restaurant Name</label>
              <input v-model="form.name" type="text" placeholder="e.g. The Saffron Hub" class="w-full h-16 bg-slate-50 rounded-2xl px-6 font-black text-slate-900 text-sm outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
            </div>
            <div class="space-y-2">
              <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Cuisine Expertise</label>
              <input v-model="form.cuisine" type="text" placeholder="e.g. North Indian, Street Food" class="w-full h-16 bg-slate-50 rounded-2xl px-6 font-black text-slate-900 text-sm outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
            </div>
            <div class="space-y-2">
              <label class="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">HQ Address</label>
              <input v-model="form.address" type="text" placeholder="e.g. Level 4, Gourmet Plaza" class="w-full h-16 bg-slate-50 rounded-2xl px-6 font-black text-slate-900 text-sm outline-none focus:ring-4 focus:ring-primary/5 transition-all" />
            </div>
            <button @click="handleSave" class="w-full h-16 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all active:scale-95">
              Activate Merchant Signal
            </button>
          </div>
        </div>

        <template v-else>
          <!-- Profile Header -->
          <section class="bg-white p-8 sm:p-12 rounded-[3.5rem] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col md:flex-row gap-10 items-center md:items-start relative overflow-hidden group">
            <div class="absolute -right-20 -bottom-20 w-64 h-64 bg-primary/5 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000"></div>
            
            <div class="relative">
                <div class="w-28 h-28 sm:w-40 sm:h-40 rounded-[2.8rem] bg-slate-100 overflow-hidden ring-4 ring-white shadow-2xl relative z-10 transition-transform group-hover:scale-105">
                  <img :src="vendor.image_url || getRestaurantPlaceholder(vendor.name)" alt="Restaurant" class="w-full h-full object-cover" />
                </div>
                <div class="absolute -bottom-2 -right-2 w-12 h-12 bg-emerald-500 rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-xl animate-pulse z-20">
                  <i class="fas fa-check"></i>
                </div>
            </div>

            <div class="flex-1 text-center md:text-left space-y-4">
                <div class="flex flex-col md:flex-row md:items-center gap-4">
                  <h2 class="text-3xl sm:text-5xl font-black text-slate-900 tracking-tighter">{{ vendor.name }}</h2>
                  <span :class="['px-5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm self-center md:self-auto', getLevelColor(vendor.level)]">
                      {{ vendor.level }} Partner
                  </span>
                </div>
                <p class="text-slate-400 font-bold uppercase tracking-widest text-xs sm:text-sm">{{ vendor.cuisine }} • Gourmet District Hub • Since 2024</p>
                
                <div class="pt-6 grid grid-cols-2 lg:grid-cols-3 gap-6 max-w-2xl">
                  <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Response Time</p>
                      <p class="text-sm font-black text-slate-900 tracking-tight">12.5m Peak</p>
                  </div>
                  <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">Accuracy Magnitude</p>
                      <p class="text-sm font-black text-slate-900 tracking-tight">99.2% Signal</p>
                  </div>
                </div>
            </div>
          </section>

          <!-- Configuration & Settings -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <!-- Order Configuration -->
              <section class="space-y-8">
                <h3 class="text-2xl font-black text-slate-900 tracking-tighter px-4">Terminal Configuration</h3>
                <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.06)] p-8 sm:p-10 space-y-8">
                    <div class="space-y-4">
                      <label class="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Internal Preparation Buffer</label>
                      <div class="relative group">
                          <select class="w-full h-16 bg-slate-50 border-none rounded-2xl px-6 font-black text-slate-900 text-sm tracking-tighter outline-none focus:ring-4 focus:ring-primary/5 appearance-none cursor-pointer">
                            <option>10 - 15 mins (Tactical)</option>
                            <option>15 - 20 mins (Standard)</option>
                            <option>20 - 30 mins (High Intensity)</option>
                          </select>
                          <i class="fas fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-primary transition-colors"></i>
                      </div>
                    </div>

                    <div class="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-primary/20 transition-all">
                      <div class="flex items-center gap-6">
                          <div class="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-primary shadow-sm">
                            <i class="fas fa-bell"></i>
                          </div>
                          <div>
                            <p class="text-sm font-black text-slate-900 tracking-tight">Signal Notifications</p>
                            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Audio/Tactile Alerts</p>
                          </div>
                      </div>
                      <div class="w-14 h-8 bg-slate-200 rounded-full relative p-1 cursor-pointer">
                          <div class="w-6 h-6 bg-white rounded-full shadow-lg absolute right-1"></div>
                      </div>
                    </div>
                </div>
              </section>

              <!-- Danger Zone -->
              <section class="space-y-8">
                <h3 class="text-2xl font-black text-slate-900 tracking-tighter px-4">Signal Authority</h3>
                <div class="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.06)] p-8 sm:p-10 flex flex-col justify-between">
                    <div class="space-y-6">
                      <p class="text-xs text-slate-400 font-bold leading-relaxed">Closing the merchant terminal will immediately cease all incoming gourmet signals from the customer grid. Only proceed during scheduled downtime.</p>
                      
                      <div class="bg-red-50 p-8 rounded-[2rem] border border-red-100/50 group cursor-pointer hover:bg-red-500 transition-all duration-500">
                          <div class="flex items-center justify-between text-red-500 group-hover:text-white transition-colors">
                            <div class="flex items-center gap-6">
                                <div class="w-12 h-12 rounded-xl bg-white text-red-400 flex items-center justify-center shadow-sm">
                                  <i class="fas fa-power-off"></i>
                                </div>
                                <span class="font-black text-sm uppercase tracking-widest">Terminate Signal</span>
                            </div>
                            <i class="fas fa-arrow-right animate-bounce-x"></i>
                          </div>
                      </div>
                    </div>

                    <button class="mt-8 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-primary transition-colors">
                      Security Lock Protocols
                    </button>
                </div>
              </section>
          </div>
        </template>
      </main>
    </div>

    <!-- Mobile Bottom Nav -->
    <RestaurantBottomNav class="lg:hidden" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { restaurantService } from '@/services/restaurant';
import { getRestaurantPlaceholder } from '@/utils/placeholders';
import RestaurantSidebar from '@/components/restaurant/RestaurantSidebar.vue';
import RestaurantBottomNav from '@/components/restaurant/RestaurantBottomNav.vue';

const authStore = useAuthStore();
const vendor = ref(null);
const loading = ref(true);
const isEditing = ref(false);

const form = ref({
  name: '',
  cuisine: '',
  description: '',
  address: ''
});

const fetchVendorProfile = async () => {
  try {
    const data = await restaurantService.getByOwnerId(authStore.user.id);
    if (data) {
      vendor.value = data;
      form.value = { ...data };
    }
  } catch (err) {
    console.error('Failed to fetch vendor:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchVendorProfile();
});

const handleSave = async () => {
  try {
    const data = await restaurantService.upsert({
      ...form.value,
      owner_id: authStore.user.id
    });
    vendor.value = data[0];
    isEditing.value = false;
    alert('Signal Updated successfully.');
  } catch (err) {
    alert('Failed to transmit update.');
  }
};

const getLevelColor = (level) => {
  switch(level) {
    case 'Rising Star': return 'text-orange-600 bg-orange-50 border-orange-100';
    case 'Pro': return 'text-blue-600 bg-blue-50 border-blue-100';
    case 'Elite': return 'text-slate-900 bg-slate-50 border-slate-900/10 shadow-sm';
    default: return 'text-slate-400 bg-slate-50 border-slate-100';
  }
};
</script>

<style scoped>
@keyframes bounce-x {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}
.animate-bounce-x {
  animation: bounce-x 1s infinite;
}
</style>
