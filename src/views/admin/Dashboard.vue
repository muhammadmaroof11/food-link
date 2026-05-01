<template>
  <div class="h-screen bg-[#F8FAFC] font-plus-jakarta antialiased selection:bg-primary/10 overflow-hidden flex">
    <!-- Slim Admin Sidebar -->
    <AdminSidebar />

    <!-- Command HUD -->
    <div class="flex-1 flex flex-col h-screen relative bg-[#F8FAFC]">
      <!-- Compact Header -->
      <header class="bg-white border-b border-slate-200 sticky top-0 z-[100] w-full px-6 py-4">
        <div class="max-w-[1600px] mx-auto flex justify-between items-center">
          <div>
            <h1 class="text-xl font-black text-slate-900 tracking-tight uppercase">Command HUD</h1>
            <div class="flex items-center gap-2 mt-1">
              <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Live Monitoring: Active</span>
            </div>
          </div>
          
          <div class="flex items-center gap-3">
             <div class="bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 flex items-center gap-2">
                <i class="fas fa-server text-[10px] text-emerald-500"></i>
                <span class="text-[9px] font-black uppercase text-slate-500">Grid Stable</span>
             </div>
             <button class="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-primary transition-colors">
                <i class="fas fa-bell text-xs"></i>
             </button>
          </div>
        </div>
      </header>

      <!-- HUD Main Workspace (Zero Scroll) -->
      <main class="flex-1 w-full p-6 max-w-[1600px] mx-auto flex flex-col gap-6 overflow-hidden">
        
        <!-- High-Density KPI Bar -->
        <section class="grid grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
           <div v-for="kpi in kpiCards" :key="kpi.label" class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between group hover:border-primary/20 transition-all">
             <div>
                <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{{ kpi.label }}</p>
                <h3 class="text-xl font-black text-slate-900 tracking-tighter">{{ kpi.value }}<span class="text-[10px] font-bold text-emerald-500 ml-1">{{ kpi.change }}</span></h3>
             </div>
             <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                <i :class="['fas', `fa-${kpi.icon}`, 'text-sm']"></i>
             </div>
           </div>
        </section>

        <!-- Monitoring Center -->
        <div class="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
           <!-- Real-time Chart (High-Density) -->
           <section class="lg:col-span-2 bg-slate-900 rounded-[2.5rem] p-6 shadow-2xl shadow-slate-900/20 relative overflow-hidden flex flex-col min-h-0 border border-white/5">
              <div class="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 rounded-full blur-[80px]"></div>
              
              <div class="relative z-10 flex flex-col h-full gap-6">
                 <div class="flex justify-between items-center shrink-0">
                    <div>
                      <h3 class="text-xl font-black text-white tracking-tight">Platform Volume</h3>
                      <p class="text-[8px] font-black uppercase tracking-widest text-white/40 mt-1">Real-time throughput metrics</p>
                    </div>
                    <div class="flex gap-1.5">
                       <button class="px-3 py-1.5 bg-white/5 rounded-lg text-[8px] font-black uppercase text-white/60">Weekly</button>
                       <button class="px-3 py-1.5 bg-primary text-white rounded-lg text-[8px] font-black uppercase">Live</button>
                    </div>
                 </div>

                 <!-- High-Density Chart -->
                 <div class="flex-1 flex items-end justify-between gap-1.5 pb-2">
                    <div v-for="i in 24" :key="i" class="flex-1 bg-white/10 rounded-t-sm relative group/bar cursor-crosshair overflow-hidden" :style="`height: ${Math.random()*70 + 10}%`">
                       <div class="absolute inset-0 bg-primary opacity-0 group-hover/bar:opacity-100 transition-opacity"></div>
                    </div>
                 </div>
              </div>
           </section>

           <!-- Live Order Feed (High-Density Scrollable) -->
           <section class="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col min-h-0">
              <div class="p-6 border-b border-slate-100 shrink-0">
                 <h3 class="text-lg font-black text-slate-900 tracking-tight">Live Activity Feed</h3>
                 <p class="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Streaming terminal events</p>
              </div>
              
              <div class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                 <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
                    <div :class="['w-9 h-9 rounded-xl flex items-center justify-center text-xs shrink-0', activity.iconBg, activity.iconColor]">
                       <i :class="['fas', `fa-${activity.icon}`]"></i>
                    </div>
                    <div class="min-w-0">
                       <p class="text-[10px] font-black text-slate-900 group-hover:text-primary transition-colors truncate">{{ activity.title }}</p>
                       <p class="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{{ activity.time }} • Ready</p>
                    </div>
                 </div>
              </div>

              <div class="p-4 shrink-0">
                 <button class="w-full py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-primary transition-all">Global Log Viewer</button>
              </div>
           </section>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { supabase } from '@/utils/supabase';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';

const metrics = ref({
  totalUsers: 0,
  totalOrders: 0,
  totalRevenue: 0,
  totalMerchants: 0
});

const recentActivities = ref([]);
const loading = ref(true);

const kpiCards = computed(() => [
  { label: 'Active Users', value: metrics.value.totalUsers, icon: 'users', change: '+12%' },
  { label: 'Live Orders', value: metrics.value.totalOrders, icon: 'bolt', change: '+8%' },
  { label: 'Total Revenue', value: metrics.value.totalRevenue.toLocaleString() + ' Cr', icon: 'chart-line', change: '+24%' },
  { label: 'Merchants', value: metrics.value.totalMerchants, icon: 'map-pin', change: '+5%' },
]);

const fetchData = async () => {
  try {
    const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
    metrics.value.totalUsers = userCount || 0;

    const { data: orders } = await supabase.from('orders').select('total_amount, status');
    metrics.value.totalOrders = orders?.length || 0;
    metrics.value.totalRevenue = orders?.filter(o => o.status === 'delivered')
                                   .reduce((acc, curr) => acc + Number(curr.total_amount), 0) || 0;

    const { count: merchantCount } = await supabase.from('restaurants').select('*', { count: 'exact', head: true });
    metrics.value.totalMerchants = merchantCount || 0;

    const { data: logs } = await supabase
      .from('orders')
      .select('*, restaurants(name)')
      .order('created_at', { ascending: false })
      .limit(10);
    
    recentActivities.value = logs.map(l => ({
      id: l.id,
      title: `Order #${l.id.slice(0,8)} • ${l.restaurants?.name || 'Unknown'}`,
      time: new Date(l.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      icon: 'box',
      iconBg: 'bg-primary/5',
      iconColor: 'text-primary'
    }));

  } catch (err) {
    console.error('Monitoring sync failed:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E2E8F0;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #CBD5E1;
}
</style>
