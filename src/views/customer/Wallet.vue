<template>
  <div class="min-h-screen bg-background font-plus-jakarta antialiased selection:bg-primary/10 overflow-x-hidden">
    <!-- Desktop Navigation Sidebar -->
    <DesktopNav />

    <!-- Main Content Area -->
    <div class="lg:ml-64 flex flex-col min-h-screen relative">
      <!-- Identity Bar -->
      <header class="relative pt-6 pb-6 sm:pt-10 sm:pb-8 px-6 sm:px-12 overflow-hidden bg-white">
        <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 animate-pulse"></div>
        
        <div class="relative z-10 flex justify-between items-center max-w-[1400px] mx-auto w-full">
          <div>
            <p class="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-1.5">Financial Terminal</p>
            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-none">Your Wallet</h1>
          </div>
        </div>
      </header>

      <!-- Content Container -->
      <main class="relative z-20 flex-1 w-full pb-32 px-6 sm:px-12 max-w-[1400px] mx-auto space-y-12 mt-8">
        
        <!-- Balance Card -->
        <section class="bg-slate-900 p-10 sm:p-14 rounded-[3.5rem] shadow-2xl shadow-slate-900/20 relative overflow-hidden group border border-white/10 text-white">
           <div class="absolute -right-40 -top-40 w-96 h-96 bg-primary/30 rounded-full blur-[120px] group-hover:scale-150 transition-transform duration-[2000ms]"></div>
           
           <div class="relative z-10 flex flex-col md:flex-row justify-between md:items-end gap-10">
              <div class="space-y-4">
                 <p class="text-white/50 text-[10px] font-black uppercase tracking-[0.3em]">Available Gourmet Credits</p>
                 <h3 class="text-5xl sm:text-7xl font-black tracking-tighter">{{ formatAmount(authStore.profile?.wallet_balance || 0) }}<span class="text-primary text-2xl tracking-tight">.00 ₢</span></h3>
                 <div class="flex items-center gap-3">
                    <span class="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest">
                       Secure Terminal Active
                    </span>
                 </div>
              </div>
              <button @click="showReloadModal = true" class="px-10 py-5 bg-white text-slate-900 rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-primary hover:text-white transition-all active:scale-95">
                 Reload Credits
              </button>
           </div>
        </section>

        <!-- History -->
        <section class="space-y-8">
           <div class="flex items-end justify-between border-b border-slate-100 pb-6">
              <h3 class="text-2xl font-black text-slate-900 tracking-tighter">Transaction Signal</h3>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Spectral Registry</p>
           </div>

           <div v-if="loading" class="flex flex-col items-center justify-center py-20 opacity-30">
              <i class="fas fa-spinner fa-spin text-4xl mb-4"></i>
              <p class="text-[10px] font-black uppercase tracking-[0.3em]">Syncing Registry...</p>
           </div>

           <div v-else-if="transactions.length === 0" class="flex flex-col items-center justify-center py-20 opacity-20 border-2 border-dashed border-slate-100 rounded-[3rem]">
              <i class="fas fa-receipt text-4xl mb-4"></i>
              <p class="text-[10px] font-black uppercase tracking-[0.4em]">Empty Registry Hub</p>
           </div>

           <div v-else class="space-y-6">
              <div v-for="tx in transactions" :key="tx.id" class="group bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.06)] hover:shadow-[0_45px_100px_-30px_rgba(255,77,0,0.12)] border border-slate-100 transition-all duration-700 flex items-center justify-between cursor-pointer overflow-hidden relative">
                 <div class="absolute -right-8 -top-8 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
                 
                 <div class="flex items-center gap-6 relative z-10">
                    <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition-transform', tx.amount < 0 ? 'bg-slate-50 text-slate-400' : 'bg-primary/5 text-primary']">
                       <i :class="['fas', tx.amount < 0 ? 'fa-arrow-up' : 'fa-arrow-down']"></i>
                    </div>
                    <div>
                       <h4 class="font-black text-slate-900 group-hover:text-primary transition-colors tracking-tight">{{ tx.title }}</h4>
                       <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{{ new Date(tx.created_at).toLocaleString() }}</p>
                    </div>
                 </div>

                 <div class="text-right relative z-10">
                    <p :class="['text-xl font-black tracking-tighter', tx.amount < 0 ? 'text-slate-400' : 'text-slate-900']">
                       {{ tx.amount > 0 ? '+' : '' }}{{ tx.amount }} <span class="text-primary text-xs">₢</span>
                    </p>
                 </div>
              </div>
           </div>
        </section>

        <!-- Refuel Modal -->
        <div v-if="showReloadModal" class="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          <div @click="showReloadModal = false" class="absolute inset-0 bg-slate-900/60 backdrop-blur-md"></div>
          
          <div class="relative bg-white w-full max-w-lg rounded-[3rem] shadow-2xl p-10 sm:p-12 space-y-10 animate-in fade-in zoom-in duration-300">
            <div class="text-center">
              <h3 class="text-3xl font-black text-slate-900 tracking-tighter">Refuel Credits</h3>
              <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Injection Magnitude Selection</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <button v-for="amt in [50, 100, 250, 500]" :key="amt" 
                @click="reloadAmount = amt"
                :class="['h-20 rounded-2xl border-2 font-black transition-all flex flex-col items-center justify-center', reloadAmount === amt ? 'border-primary bg-primary/5 text-primary' : 'border-slate-100 text-slate-400 hover:border-slate-200']">
                <span class="text-xl tracking-tighter">{{ amt }} ₢</span>
                <span class="text-[8px] uppercase tracking-widest opacity-60">Select</span>
              </button>
            </div>

            <button @click="handleReload" class="w-full h-16 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-primary transition-all active:scale-95">
              Initiate Injection ({{ reloadAmount }} ₢)
            </button>
          </div>
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
import { useAuthStore } from '@/stores/auth';
import { supabase } from '@/utils/supabase';
import DesktopNav from '@/components/customer/DesktopNav.vue';
import CustomerBottomNav from '@/components/customer/CustomerBottomNav.vue';

const authStore = useAuthStore();
const transactions = ref([]);
const loading = ref(true);
const showReloadModal = ref(false);
const reloadAmount = ref(100);

const fetchTransactions = async () => {
  try {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', authStore.user.id)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    transactions.value = data;
  } catch (err) {
    console.error('Failed to fetch transactions:', err);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchTransactions();
});

const handleReload = async () => {
  try {
    const { error } = await supabase
      .from('transactions')
      .insert([{
        user_id: authStore.user.id,
        type: 'topup',
        amount: reloadAmount.value,
        title: 'Credit Injection via Terminal'
      }]);
    
    if (error) throw error;
    
    // Refresh data
    await authStore.fetchProfile(); // Refresh balance in store
    await fetchTransactions();
    showReloadModal.value = false;
    alert('Financial Signal Received. Credits Injected.');
  } catch (err) {
    alert('Injection failed. Link unstable.');
  }
};

const formatAmount = (amt) => {
  return new Intl.NumberFormat().format(amt);
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
