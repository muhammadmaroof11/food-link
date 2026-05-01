<template>
  <div class="h-screen bg-[#F8FAFC] font-plus-jakarta antialiased selection:bg-primary/10 overflow-hidden flex">
    <!-- Slim Admin Sidebar -->
    <AdminSidebar />

    <!-- Main Hub -->
    <div class="flex-1 flex flex-col h-screen relative bg-[#F8FAFC]">
      <!-- Compact Header -->
      <header class="bg-white border-b border-slate-200 sticky top-0 z-[100] w-full px-6 py-4">
        <div class="max-w-[1600px] mx-auto flex justify-between items-center">
          <div>
            <h1 class="text-xl font-black text-slate-900 tracking-tight uppercase">System Configuration</h1>
            <div class="flex items-center gap-2 mt-1">
              <div class="w-1.5 h-1.5 rounded-full bg-primary"></div>
              <span class="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Platform Core Management</span>
            </div>
          </div>
          
          <button @click="saveSettings" class="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest text-[9px] shadow-lg hover:bg-emerald-500 transition-all flex items-center gap-2">
             <i class="fas fa-save text-[10px]"></i>
             Save Changes
          </button>
        </div>
      </header>

      <!-- Content Container (Zero Scroll) -->
      <main class="flex-1 w-full p-6 max-w-[1600px] mx-auto flex flex-col gap-6 overflow-y-auto custom-scrollbar pb-12">
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
           <!-- Fee Structure -->
           <section class="space-y-4">
              <div class="flex items-end justify-between border-b border-slate-100 pb-3">
                 <h3 class="text-lg font-black text-slate-900 tracking-tight uppercase">Fee Structure</h3>
              </div>
              
              <div class="space-y-3">
                 <div v-for="field in feeFields" :key="field.key" class="group bg-white p-4 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                    <label class="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ field.label }}</label>
                    <div class="flex items-center gap-4">
                       <input :type="field.type" v-model="settings[field.key]" class="w-full bg-transparent border-none outline-none text-xl font-black text-slate-900 tracking-tighter" />
                       <span class="text-primary font-black text-sm">{{ field.suffix || 'Cr' }}</span>
                    </div>
                 </div>
              </div>
           </section>

           <!-- Wallet Configuration -->
           <section class="space-y-4">
              <div class="flex items-end justify-between border-b border-slate-100 pb-3">
                 <h3 class="text-lg font-black text-slate-900 tracking-tight uppercase">Wallet & Credits</h3>
              </div>
              
              <div class="space-y-3">
                 <div v-for="field in creditFields" :key="field.key" class="group bg-white p-4 rounded-2xl border border-slate-200 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                    <label class="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{{ field.label }}</label>
                    <div class="flex items-center gap-4">
                       <input :type="field.type" v-model="settings[field.key]" class="w-full bg-transparent border-none outline-none text-xl font-black text-slate-900 tracking-tighter" />
                    </div>
                    <p v-if="field.hint" class="text-[8px] font-bold text-slate-300 uppercase tracking-widest mt-1">{{ field.hint }}</p>
                 </div>
              </div>
           </section>
        </div>

        <!-- Reward Tiers -->
        <section class="space-y-4">
           <div class="flex items-end justify-between border-b border-slate-100 pb-3">
              <h3 class="text-lg font-black text-slate-900 tracking-tight uppercase">Loyalty Tiers</h3>
           </div>

           <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div v-for="tier in gamificationTiers" :key="tier.name" 
                class="group bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all hover:border-primary/20">
                <div class="flex flex-col gap-4">
                   <div :class="['w-9 h-9 rounded-xl flex items-center justify-center text-sm shadow-md', tier.bg, tier.color]">
                      <i class="fas fa-crown"></i>
                   </div>
                   <div>
                      <h4 class="text-sm font-black text-slate-900 tracking-tight">{{ tier.name }}</h4>
                      <p class="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{{ tier.requirement }}</p>
                   </div>
                   <div class="pt-3 border-t border-slate-50 flex items-end justify-between">
                      <span class="text-xl font-black text-slate-900 tracking-tighter">{{ tier.cashback }}%</span>
                      <span class="text-[8px] font-black text-primary uppercase tracking-widest">Rewards</span>
                   </div>
                </div>
              </div>
           </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';

const settings = reactive({
  platformFee: 15,
  deliveryFee: 5,
  bookingFeePercent: 10,
  creditRate: 1,
  minWalletLoad: 50,
  maxWalletLoad: 10000,
});

const feeFields = ref([
  { key: 'platformFee', label: 'Platform Commission (%)', type: 'number', suffix: '%' },
  { key: 'deliveryFee', label: 'Base Delivery Fee', type: 'number', suffix: 'Cr' },
  { key: 'bookingFeePercent', label: 'Service Fee (%)', type: 'number', suffix: '%' },
]);

const creditFields = ref([
  { key: 'creditRate', label: 'Currency Conversion Rate', type: 'number', hint: 'Value of 1 Credit in USD' },
  { key: 'minWalletLoad', label: 'Minimum Deposit', type: 'number' },
  { key: 'maxWalletLoad', label: 'Maximum Deposit', type: 'number' },
]);

const gamificationTiers = ref([
  { name: 'Bronze', requirement: 'New Member', cashback: 3, bg: 'bg-primary/5', color: 'text-primary' },
  { name: 'Silver', requirement: 'Loyal Diner', cashback: 5, bg: 'bg-slate-100', color: 'text-slate-600' },
  { name: 'Gold', requirement: 'Elite Status', cashback: 8, bg: 'bg-yellow-50', color: 'text-yellow-600' },
  { name: 'Platinum', requirement: 'Ambassador', cashback: 12, bg: 'bg-slate-900', color: 'text-white' },
]);

const saveSettings = () => {
  alert('Global settings updated successfully.');
};
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
</style>
