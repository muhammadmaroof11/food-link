<template>
  <div class="min-h-screen bg-background font-plus-jakarta antialiased selection:bg-primary/10 overflow-hidden flex flex-col relative">
    
    <!-- Top HUD Interface -->
    <header class="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center pointer-events-none">
      <button @click="router.back()" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl text-slate-900 pointer-events-auto hover:bg-slate-50 border border-white/20 active:scale-90 transition-all">
        <i class="fas fa-times"></i>
      </button>
      
      <div class="bg-slate-900 px-6 py-2.5 rounded-2xl shadow-2xl pointer-events-auto border border-white/10 flex items-center gap-4">
        <div class="flex flex-col">
           <span class="text-[8px] font-black uppercase tracking-[0.2em] text-primary">Active Mission</span>
           <span class="text-xs font-black text-white tracking-tighter">Order #{{ task.orderId }}</span>
        </div>
        <div class="w-[2px] h-6 bg-white/10"></div>
        <div class="flex items-center gap-2">
           <span class="flex h-1.5 w-1.5 relative">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
          </span>
          <span class="text-[9px] font-black uppercase tracking-widest text-emerald-400">{{ task.status }}</span>
        </div>
      </div>

      <button class="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl text-slate-900 pointer-events-auto hover:bg-slate-50 border border-white/20 active:scale-90 transition-all">
        <i class="fas fa-headset"></i>
      </button>
    </header>

    <!-- Map Canvas Overlay (Stylized) -->
    <main class="flex-1 bg-slate-200 relative overflow-hidden">
       <div class="absolute inset-0 bg-gradient-to-b from-black/5 to-transparent pointer-events-none"></div>
       <div class="absolute inset-2 sm:inset-4 rounded-[2rem] sm:rounded-[3rem] border-4 border-white/20 shadow-inner overflow-hidden">
          <!-- Real Map Container -->
          <div id="mission-map" class="absolute inset-0 z-10"></div>
          
          <div v-if="loading" class="absolute inset-0 z-20 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center">
             <i class="fas fa-satellite fa-spin text-4xl text-primary mb-4"></i>
             <p class="text-[10px] font-black uppercase tracking-[0.3em]">Locking Mission Signal...</p>
          </div>
       </div>
    </main>

    <!-- Bottom Mission Terminal -->
    <div v-if="task" class="relative z-50 bg-white rounded-t-[3rem] shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)] border-t border-slate-100 pb-10">
       <div class="w-12 h-1.5 bg-slate-100 rounded-full mx-auto my-6"></div>
       
       <div class="px-8 sm:px-12 space-y-8">
          <!-- Mission HUD -->
          <div class="flex justify-between items-end border-b border-slate-50 pb-8">
             <div>
               <p class="text-[9px] font-black text-primary uppercase tracking-[0.3em] mb-2">ETA Protocol</p>
               <h3 class="text-4xl font-black text-slate-900 tracking-tighter leading-none">12 min <span class="text-slate-300 text-lg">/ 2.4 km</span></h3>
             </div>
             <div class="flex gap-4">
               <button class="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center border border-slate-100 hover:text-primary transition-all active:scale-90">
                 <i class="fas fa-phone"></i>
               </button>
               <button class="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20 hover:scale-110 transition-all active:scale-95">
                 <i class="fas fa-location-arrow"></i>
               </button>
             </div>
          </div>

          <!-- Port Details -->
          <div class="space-y-6">
             <div class="flex gap-6 items-start relative pb-6 border-b border-slate-50">
               <div class="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary text-lg flex-shrink-0">
                 <i class="fas fa-store"></i>
               </div>
               <div>
                  <h4 class="font-black text-slate-900 text-sm tracking-tight mb-1">{{ task.restaurants?.name }}</h4>
                  <p class="text-xs text-slate-400 font-bold">{{ task.restaurants?.address }}</p>
               </div>
             </div>

             <div class="flex gap-6 items-start">
               <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 text-lg flex-shrink-0">
                 <i class="fas fa-map-location-dot"></i>
               </div>
               <div>
                  <h4 class="font-black text-slate-900 text-sm tracking-tight mb-1">{{ task.profiles?.full_name }}</h4>
                  <p class="text-xs text-slate-400 font-bold mb-3">{{ task.profiles?.delivery_address || task.delivery_address }}</p>
               </div>
             </div>
          </div>

          <!-- Reward Stream -->
          <div class="bg-slate-900 p-8 rounded-[2rem] flex justify-between items-center shadow-2xl shadow-slate-900/20 text-white">
             <div>
               <p class="text-[9px] font-black uppercase tracking-widest text-white/50 mb-1">Contract Value</p>
               <h4 class="text-2xl font-black text-primary tracking-tighter">{{ task.delivery_fee || 15 }} ₢</h4>
             </div>
             <div class="text-right">
                <p class="text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-1">Verified Payload</p>
                <div class="flex items-center gap-2 justify-end">
                   <div v-for="i in 3" :key="i" class="w-1 h-1 bg-white/20 rounded-full"></div>
                </div>
             </div>
          </div>

          <!-- Critical Action -->
          <button @click="handleComplete" class="w-full h-16 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4">
             Confirm Mission Success
             <i class="fas fa-arrow-right animate-bounce-x"></i>
          </button>
       </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { riderService } from '@/services/rider';
import { supabase } from '@/utils/supabase';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const route = useRoute();
const router = useRouter();
const orderId = route.params.id;

const loading = ref(true);
const task = ref(null);
const map = ref(null);

const fetchData = async () => {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*, restaurants(*), profiles(*)')
      .eq('id', orderId)
      .single();
    
    if (error) throw error;
    task.value = data;
    initMap();
  } catch (err) {
    console.error('Failed to fetch mission:', err);
    router.push('/rider/dashboard');
  } finally {
    loading.value = false;
  }
};

const initMap = () => {
  // Simulate coordinates for Mumbai base (can be updated to dynamic lat/lng if available)
  const restCoord = [19.0760, 72.8777]; 
  const custCoord = [19.0860, 72.8877];

  setTimeout(() => {
    const mapElement = document.getElementById('mission-map');
    if (!mapElement) return;

    map.value = L.map('mission-map', { zoomControl: false }).setView(restCoord, 14);
    
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map.value);

    const restIcon = L.divIcon({
      html: '<div class="w-10 h-10 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white"><i class="fas fa-utensils text-sm"></i></div>',
      className: 'custom-div-icon',
      iconSize: [40, 40]
    });

    const custIcon = L.divIcon({
      html: '<div class="w-10 h-10 bg-slate-900 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white"><i class="fas fa-house-user text-sm"></i></div>',
      className: 'custom-div-icon',
      iconSize: [40, 40]
    });

    L.marker(restCoord, { icon: restIcon }).addTo(map.value).bindPopup('Restaurant');
    L.marker(custCoord, { icon: custIcon }).addTo(map.value).bindPopup('Customer');

    L.polyline([restCoord, custCoord], { color: '#ff4d00', weight: 4, opacity: 0.5, dashArray: '10, 10' }).addTo(map.value);
  }, 300);
};

onMounted(() => {
  fetchData();
});

onUnmounted(() => {
  if (map.value) map.value.remove();
});

const handleComplete = async () => {
  try {
    const fee = task.value.delivery_fee || 15;
    await riderService.completeDelivery(orderId, fee);
    alert('Mission Successful. Credits Transferred.');
    router.push('/rider/dashboard');
  } catch (err) {
    alert('Signal transmission failed.');
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
