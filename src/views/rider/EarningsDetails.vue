<template>
  <div class="min-h-screen bg-background font-plus-jakarta antialiased selection:bg-primary/10 overflow-x-hidden flex flex-col relative">
    
    <!-- Identity Bar -->
    <header class="relative pt-6 pb-6 sm:pt-10 sm:pb-8 px-6 sm:px-12 overflow-hidden bg-white/80 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-[100] w-full">
      <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 animate-pulse"></div>
      
      <div class="relative z-10 flex items-center gap-6 max-w-[1400px] mx-auto w-full">
        <button @click="router.back()" class="w-12 h-12 flex items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-sm text-slate-400 hover:text-primary transition-all active:scale-90">
           <i class="fas fa-arrow-left"></i>
        </button>
        <div>
          <p class="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-1.5">Financial Log</p>
          <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-none">Credit Analytics</h1>
        </div>
      </div>
    </header>

    <!-- Content Container -->
    <main class="relative z-20 flex-1 w-full pb-32 px-6 sm:px-12 max-w-[1400px] mx-auto space-y-12 mt-12 sm:mt-16">
      
      <!-- Balance Card -->
      <section class="bg-slate-900 p-10 sm:p-14 rounded-[3.5rem] shadow-2xl shadow-slate-900/20 relative overflow-hidden group border border-white/10 text-white">
         <div class="absolute -right-40 -top-40 w-96 h-96 bg-primary/30 rounded-full blur-[120px] group-hover:scale-150 transition-transform duration-[2000ms]"></div>
         
         <div class="relative z-10 flex flex-col md:flex-row justify-between md:items-end gap-10">
            <div class="space-y-4">
               <p class="text-white/50 text-[10px] font-black uppercase tracking-[0.3em]">Available Terminal Credits</p>
               <h3 class="text-5xl sm:text-7xl font-black tracking-tighter">342.00 <span class="text-primary text-2xl tracking-tight">₢</span></h3>
               <div class="flex items-center gap-3">
                 <span class="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-xl text-[9px] font-black uppercase tracking-widest">
                   Next Signal: 24h
                 </span>
               </div>
            </div>
            <button class="px-10 py-5 bg-white text-slate-900 rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-primary hover:text-white transition-all active:scale-95">
               Initiate Cash Out
            </button>
         </div>
      </section>

      <!-- History -->
      <section class="space-y-8">
         <div class="flex items-end justify-between border-b border-slate-100 pb-6">
            <h3 class="text-2xl font-black text-slate-900 tracking-tighter">Transmission Registry</h3>
            <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Spectral History</p>
         </div>

         <div class="grid grid-cols-1 gap-6">
            <div v-for="tx in recentTransactions" :key="tx.id" 
              class="group bg-white p-6 sm:p-8 rounded-[2.5rem] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.06)] hover:shadow-[0_45px_100px_-30px_rgba(255,77,0,0.12)] border border-slate-100 transition-all duration-700 flex items-center justify-between cursor-pointer overflow-hidden relative">
              <div class="absolute -right-8 -top-8 w-20 h-20 bg-primary/5 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
              
              <div class="flex items-center gap-6 relative z-10">
                <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center text-lg shadow-lg group-hover:scale-110 transition-transform', iconBgClass(tx.type)]">
                  <i :class="['fas', iconName(tx.type)]"></i>
                </div>
                <div>
                  <h4 class="font-black text-slate-900 group-hover:text-primary transition-colors tracking-tight">{{ tx.title }}</h4>
                  <p class="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">{{ tx.time }}</p>
                </div>
              </div>

              <div class="text-right relative z-10">
                <p :class="['text-xl font-black tracking-tighter', tx.amount > 0 ? 'text-slate-900' : 'text-slate-400']">
                   {{ tx.amount > 0 ? '+' : '' }}{{ tx.amount }} <span class="text-primary text-xs">₢</span>
                </p>
                <div class="flex justify-end gap-1 mt-1">
                   <div v-for="i in 3" :key="i" :class="['w-1 h-1 rounded-full', tx.amount > 0 ? 'bg-emerald-500' : 'bg-slate-200']"></div>
                </div>
              </div>
            </div>
         </div>
      </section>
    </main>

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const recentTransactions = ref([
  { id: 1, title: 'Mission Complete #8821', time: 'Today, 2:30 PM', amount: 12.0, type: 'delivery' },
  { id: 2, title: 'Mission Complete #8820', time: 'Today, 1:15 PM', amount: 9.0, type: 'delivery' },
  { id: 3, title: 'Weekly Signal Payout', time: 'Yesterday', amount: -450.0, type: 'payout' },
  { id: 4, title: 'Mission Complete #8815', time: '2 days ago', amount: 14.0, type: 'delivery' },
  { id: 5, title: 'Tip Signal #8815', time: '2 days ago', amount: 5.0, type: 'tip' },
]);

const iconBgClass = (type) => {
  if (type === 'delivery') return 'bg-primary/5 text-primary';
  if (type === 'payout') return 'bg-slate-900 text-white';
  if (type === 'tip') return 'bg-emerald-50 text-emerald-500';
  return 'bg-slate-50 text-slate-600';
};

const iconName = (type) => {
  if (type === 'delivery') return 'fa-motorcycle';
  if (type === 'payout') return 'fa-university';
  if (type === 'tip') return 'fa-hand-holding-heart';
  return 'fa-file-invoice-dollar';
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
