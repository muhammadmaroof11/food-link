<template>
  <div class="min-h-screen bg-[#F8FAFC] font-plus-jakarta antialiased selection:bg-slate-900/10 flex flex-col">
    <!-- Functional Header -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-[100] w-full px-6 py-4">
      <div class="max-w-[1400px] mx-auto flex justify-between items-center">
        <div>
          <h1 class="text-xl font-bold text-slate-900 tracking-tight">Rider Terminal</h1>
          <div class="flex items-center gap-2 mt-1">
            <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Connection</span>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
           <div class="hidden sm:block text-right">
             <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Wallet Balance</p>
             <p class="text-sm font-black text-slate-900">{{ authStore.profile?.wallet_balance || 0 }} Cr</p>
           </div>
           <button @click="router.push('/rider/profile')" class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
              <i class="fas fa-user"></i>
           </button>
        </div>
      </div>
    </header>

    <!-- Main Workspace -->
    <main class="flex-1 w-full pb-32 px-6 max-w-[1400px] mx-auto mt-8 space-y-10">
      
      <!-- Functional Stats Grid -->
      <section class="grid grid-cols-2 md:grid-cols-4 gap-4">
         <div v-for="stat in quickStats" :key="stat.label" class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
            <p class="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ stat.label }}</p>
            <h3 class="text-2xl font-black text-slate-900 tracking-tighter">{{ stat.value }}</h3>
         </div>
      </section>

      <!-- Priority Action: Active Mission -->
      <section v-if="activeMission" class="animate-in fade-in slide-in-from-bottom-4 duration-500">
         <div class="bg-slate-900 text-white p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div class="flex items-center gap-5">
               <div class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-xl">
                  <i class="fas fa-route text-primary"></i>
               </div>
               <div>
                  <h4 class="text-lg font-bold tracking-tight">Active Mission Detected</h4>
                  <p class="text-[10px] font-bold opacity-60 uppercase tracking-widest mt-1">Order #{{ activeMission.id.slice(0, 8) }} • {{ activeMission.restaurants?.name }}</p>
               </div>
            </div>
            <button @click="router.push(`/rider/delivery/${activeMission.id}`)" class="w-full sm:w-auto h-12 px-8 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-orange-600 transition-colors">
               Resume Navigation
            </button>
         </div>
      </section>

      <!-- Task List: Available Missions -->
      <section class="space-y-6">
         <div class="flex items-center justify-between">
            <h3 class="text-sm font-black text-slate-900 uppercase tracking-widest">Available Dispatches</h3>
            <span class="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[9px] font-black">{{ missions.length }} Found</span>
         </div>

         <div v-if="loading" class="flex flex-col items-center justify-center py-20">
            <i class="fas fa-circle-notch fa-spin text-slate-300 text-2xl mb-4"></i>
            <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Syncing Grid...</p>
         </div>

         <div v-else-if="missions.length === 0" class="bg-white border border-slate-200 rounded-3xl py-20 flex flex-col items-center justify-center text-center px-6">
            <i class="fas fa-radar text-slate-100 text-5xl mb-4"></i>
            <p class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Zero dispatch signals in your sector</p>
         </div>

         <div v-else class="grid grid-cols-1 gap-3">
            <div v-for="mission in missions" :key="mission.id" 
              class="bg-white p-5 rounded-2xl border border-slate-200 hover:border-primary/30 transition-all flex flex-col sm:flex-row items-center justify-between gap-6">
              
              <div class="flex items-center gap-5 w-full sm:w-auto">
                <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                  <i class="fas fa-box-archive"></i>
                </div>
                <div>
                  <h4 class="font-bold text-slate-900 tracking-tight">{{ mission.restaurants?.name }}</h4>
                  <p class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 line-clamp-1">To: {{ mission.profiles?.delivery_address }}</p>
                </div>
              </div>

              <div class="flex items-center gap-8 w-full sm:w-auto justify-between sm:justify-end">
                <div class="text-right">
                  <p class="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Reward</p>
                  <p class="font-black text-slate-900">{{ mission.delivery_fee || 15 }} Cr</p>
                </div>
                <button @click="handleAccept(mission.id)" class="h-11 px-6 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-primary transition-colors">
                  Accept
                </button>
              </div>
            </div>
         </div>
      </section>
    </main>

    <!-- Navigation -->
    <RiderBottomNav />
  </div>
</template>


<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { riderService } from '@/services/rider';
import { supabase } from '@/utils/supabase';
import { LocalNotifications } from '@capacitor/local-notifications';
import RiderBottomNav from '@/components/rider/RiderBottomNav.vue';

const router = useRouter();
const authStore = useAuthStore();
const missions = ref([]);
const loading = ref(true);
const activeMission = ref(null);

const quickStats = computed(() => [
  { label: 'Active Missions', value: missions.value.length, icon: 'fa-satellite', sub: 'In District Pulse' },
  { label: 'Success Rate', value: '100%', icon: 'fa-check-double', sub: 'Mission Integrity' },
  { label: 'Fuel Credits', value: authStore.profile?.wallet_balance || 0, icon: 'fa-battery-full', sub: 'Current Yield' },
  { label: 'Pilot Rating', value: '4.9', icon: 'fa-star', sub: 'Universal Rank' },
]);

const fetchData = async () => {
  try {
    const available = await riderService.getAvailableMissions();
    missions.value = available;
    
    const active = await riderService.getActiveMission(authStore.user?.id);
    activeMission.value = active;
  } catch (err) {
    console.error('Failed to fetch missions:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  fetchData();
  
  try {
    await LocalNotifications.requestPermissions();
  } catch(e) {
    console.log("LocalNotifications permission issue on Web", e);
  }

  // Listen for new dispatches
  const subscription = supabase
    .channel('available-missions')
    .on('postgres_changes', { 
      event: 'INSERT', 
      schema: 'public', 
      table: 'orders',
      filter: 'rider_id=is.null'
    }, (payload) => {
      fetchData();
      LocalNotifications.schedule({
        notifications: [{
          title: "New Dispatch Signal!",
          body: `Order #${payload.new.id.slice(0, 8)} needs a pilot.`,
          id: new Date().getTime(),
          schedule: { at: new Date(Date.now() + 1000) }
        }]
      }).catch(e => console.log('LocalNotifications schedule err', e));
    })
    .subscribe();
});

const handleAccept = async (orderId) => {
  try {
    await riderService.acceptMission(orderId, authStore.user.id);
    router.push(`/rider/delivery/${orderId}`);
  } catch (err) {
    alert('Mission Lock failed. Intercepted by another pilot.');
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
