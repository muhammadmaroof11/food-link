<template>
  <div class="min-h-screen bg-background font-plus-jakarta antialiased selection:bg-primary/10 overflow-hidden">
    <!-- Desktop Navigation Sidebar -->
    <DesktopNav />

    <!-- Main Content Area -->
    <div class="lg:ml-64 flex flex-col h-screen relative overflow-hidden">
      <!-- Immersive Map Canvas -->
      <div id="map-terminal" class="absolute inset-0 z-0">
        <!-- Leaflet map will mount here -->
      </div>

      <!-- Glass Header Overlay -->
      <header class="absolute top-0 left-0 right-0 p-4 sm:p-10 z-[20] flex justify-between items-center pointer-events-none">
        <button @click="router.back()" class="w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl bg-white/90 backdrop-blur-xl shadow-2xl text-slate-800 pointer-events-auto hover:bg-slate-50 transition-all active:scale-90 border border-white/20">
          <i class="fas fa-arrow-left text-sm sm:text-lg"></i>
        </button>
        <div class="bg-slate-900 px-6 py-3 rounded-2xl shadow-2xl font-black text-[10px] sm:text-xs text-white pointer-events-auto uppercase tracking-widest flex items-center gap-3 border border-white/10">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Arriving in 15 mins
        </div>
      </header>

      <!-- HUD Bottom Sheet -->
      <div class="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md rounded-t-[3rem] shadow-[0_-20px_50px_-15px_rgba(0,0,0,0.15)] z-[20] pointer-events-auto border-t border-slate-100">
        <div class="max-w-xl mx-auto p-8 sm:p-12 pb-32 lg:pb-12">
          <div class="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-10"></div>
          
          <div class="flex items-end justify-between mb-10">
            <div>
              <span class="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-2 block">Live Intelligence</span>
              <h2 class="text-2xl sm:text-4xl font-black tracking-tighter text-slate-900 leading-tight">Order Status</h2>
            </div>
            <div class="text-right">
              <p class="text-[9px] font-black text-slate-300 uppercase tracking-widest">Tracking Signal</p>
              <p class="text-xs sm:text-sm font-black text-slate-900">#FL-8829X</p>
            </div>
          </div>
          
          <!-- Status Progression -->
          <div class="space-y-8 relative">
            <div class="absolute left-5 top-5 bottom-5 w-[3px] bg-slate-50 -z-0"></div>
            
            <div class="flex items-start gap-6 group relative z-10 opacity-40">
              <div class="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-xl">
                <i class="fas fa-check text-sm"></i>
              </div>
              <div class="pt-1">
                <p class="text-sm font-black text-slate-900 leading-none">Order Dispatched</p>
                <p class="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider">Terminal validation success</p>
              </div>
            </div>

            <div class="flex items-start gap-6 group relative z-10">
              <div class="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-primary-glow animate-pulse">
                <i class="fas fa-motorcycle text-lg"></i>
              </div>
              <div class="pt-1">
                <p class="text-sm font-black text-primary leading-none uppercase tracking-widest">In Transit</p>
                <p class="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-wider">Courier mapping Gourmet District</p>
              </div>
            </div>
          </div>

          <!-- Courier Details -->
          <div class="mt-12 pt-10 border-t border-slate-50 flex items-center justify-between">
            <div class="flex items-center gap-6">
              <div class="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden shadow-lg border-2 border-white">
                <img :src="getPersonPlaceholder('Ahmed Ali')" alt="Rider" class="w-full h-full object-cover" />
              </div>
              <div>
                <p class="text-lg font-black text-slate-900 leading-none">Ahmed Ali</p>
                <div class="flex items-center gap-3 mt-2">
                  <span class="flex items-center text-[10px] font-black text-primary uppercase tracking-widest">
                    <i class="fas fa-star mr-1.5"></i>
                    4.9 Signal
                  </span>
                </div>
              </div>
            </div>
            <button class="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-primary transition-all active:scale-90 border border-slate-100">
              <i class="fas fa-phone-volume text-lg"></i>
            </button>
          </div>

          <!-- Global Confirm -->
          <div class="mt-12">
            <button @click="confirmReceived" :disabled="isConfirming" class="w-full h-16 bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl shadow-emerald-500/20 active:scale-[0.98] transition-all flex justify-center items-center gap-4 disabled:opacity-70">
              <i v-if="!isConfirming" class="fas fa-check-double text-xl"></i>
              <i v-else class="fas fa-spinner fa-spin"></i>
              {{ isConfirming ? 'Transmitting Signal...' : 'Confirm Delivery Arrival' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <div class="lg:hidden">
      <CustomerBottomNav />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { getPersonPlaceholder } from '@/utils/placeholders';
import DesktopNav from '@/components/customer/DesktopNav.vue';
import CustomerBottomNav from '@/components/customer/CustomerBottomNav.vue';
import { supabase } from '@/utils/supabase';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const router = useRouter();
const route = useRoute();

const isConfirming = ref(false);
const order = ref(null);
let map = null;

// Mock coordinates for demonstration (centered in Dubai)
const restaurantCoords = [25.1972, 55.2744]; 
const customerCoords = [25.2100, 55.2850];
const riderCoords = ref([25.2000, 55.2780]);

const orderStatus = computed(() => order.value?.status || 'pending');
const orderNumber = computed(() => order.value?.id ? `#${order.value.id.slice(0, 8).toUpperCase()}` : '#LOADING');

const initializeMap = () => {
  if (map) return;

  map = L.map('map-terminal', {
    zoomControl: false,
    attributionControl: false
  }).setView(restaurantCoords, 14);

  // CartoDB Positron - Light/Gourmet Tiles
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19
  }).addTo(map);

  // Custom Icon Config
  const createIcon = (iconClass, colorClass) => L.divIcon({
    html: `<div class="w-10 h-10 rounded-2xl ${colorClass} flex items-center justify-center text-white shadow-2xl border-2 border-white"><i class="fas ${iconClass}"></i></div>`,
    className: 'custom-map-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });

  L.marker(restaurantCoords, { icon: createIcon('fa-store', 'bg-slate-900') }).addTo(map);
  L.marker(customerCoords, { icon: createIcon('fa-house', 'bg-primary shadow-primary/30') }).addTo(map);
  
  const riderMarker = L.marker(riderCoords.value, { 
    icon: createIcon('fa-motorcycle', 'bg-emerald-500 shadow-emerald-500/20') 
  }).addTo(map);

  // Draw Route Path (Dashed)
  L.polyline([restaurantCoords, customerCoords], {
    color: '#ff4d00',
    weight: 2,
    dashArray: '8, 8',
    opacity: 0.3
  }).addTo(map);

  // Simulated Rider Movement
  const interval = setInterval(() => {
    const lat = riderCoords.value[0] + 0.00005;
    const lng = riderCoords.value[1] + 0.00005;
    riderCoords.value = [lat, lng];
    riderMarker.setLatLng(riderCoords.value);
  }, 3000);

  onUnmounted(() => clearInterval(interval));
};

const fetchOrderDetails = async () => {
  const orderId = route.query.id;
  if (!orderId) return;

  const { data, error } = await supabase
    .from('orders')
    .select('*, restaurants(name)')
    .eq('id', orderId)
    .single();
  
  if (!error) {
    order.value = data;
  }
};

onMounted(() => {
  initializeMap();
  fetchOrderDetails();

  // Listen for Realtime updates
  const subscription = supabase
    .channel('order-tracking')
    .on('postgres_changes', { 
      event: 'UPDATE', 
      schema: 'public', 
      table: 'orders',
      filter: `id=eq.${route.query.id}`
    }, (payload) => {
      order.value = payload.new;
    })
    .subscribe();

  onUnmounted(() => {
    if (map) map.remove();
    supabase.removeChannel(subscription);
  });
});

const confirmReceived = () => {
  isConfirming.value = true;
  setTimeout(() => {
    isConfirming.value = false;
    router.push('/customer/dashboard');
  }, 1500);
};
</script>

<style>
.custom-map-icon {
  background: transparent !important;
  border: none !important;
}
.leaflet-container {
  background: #f8fafc !important;
}
.shadow-primary-glow {
  box-shadow: 0 0 20px rgba(255, 77, 0, 0.4);
}
</style>
