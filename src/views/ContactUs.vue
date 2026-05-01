<template>
  <div class="min-h-screen bg-background font-plus-jakarta antialiased selection:bg-primary/10 overflow-x-hidden relative">
    
    <Navbar />

    <!-- Content -->
    <main class="min-h-screen pt-32 pb-20 px-6 overflow-hidden flex items-center justify-center relative">
       <!-- Abstract Bg -->
       <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-32 -mt-32"></div>
       <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[100px] -ml-32 -mb-32"></div>

       <div class="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10 font-plus-jakarta">
          <!-- Left: Information -->
          <div class="space-y-10">
             <div class="space-y-4">
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-lg border border-primary/10">
                   <span class="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
                   <span class="text-[8px] font-black uppercase tracking-[0.3em] text-primary">Sync Signal</span>
                </div>
                <h1 class="text-5xl sm:text-7xl font-black text-slate-900 tracking-tighter leading-none">Connect <br/> With The <span class="text-primary">Source.</span></h1>
                <p class="text-lg sm:text-xl text-slate-400 font-bold leading-relaxed max-w-md">Our high-fidelity support module is ready to capture your signal. Transmit your inquiry below.</p>
             </div>

             <div class="space-y-6">
                <div v-for="info in contactInfo" :key="info.label" class="flex items-center gap-6 group">
                   <div class="w-14 h-14 rounded-2xl bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all cursor-default">
                      <i :class="['fas', info.icon]"></i>
                   </div>
                   <div>
                      <p class="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 mb-1">{{ info.label }}</p>
                      <p class="text-lg font-black text-slate-800 tracking-tight">{{ info.value }}</p>
                   </div>
                </div>
             </div>
          </div>

          <!-- Right: Amazing Form -->
          <div class="relative">
             <div class="bg-white p-8 sm:p-14 rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 relative z-10 overflow-hidden group">
                <!-- Form Decor -->
                <div class="absolute -right-20 -top-20 w-48 h-48 bg-primary/5 rounded-full blur-[80px]"></div>
                
                <form @submit.prevent="handleSubmit" class="space-y-8 relative z-10">
                   <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div class="space-y-2">
                         <label class="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Identity Name</label>
                         <input type="text" placeholder="Gourmet Entity" class="w-full h-16 bg-slate-50 border-none rounded-2xl px-6 font-bold text-slate-900 text-sm tracking-tight outline-none focus:ring-4 focus:ring-primary/5 transition-all" required />
                      </div>
                      <div class="space-y-2">
                         <label class="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Signal Channel</label>
                         <input type="email" placeholder="node@protocol.io" class="w-full h-16 bg-slate-50 border-none rounded-2xl px-6 font-bold text-slate-900 text-sm tracking-tight outline-none focus:ring-4 focus:ring-primary/5 transition-all" required />
                      </div>
                   </div>

                   <div class="space-y-2">
                      <label class="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Inquiry Spectrum</label>
                      <div class="relative">
                         <select class="w-full h-16 bg-slate-50 border-none rounded-2xl px-6 font-bold text-slate-900 text-sm tracking-tight outline-none focus:ring-4 focus:ring-primary/5 appearance-none cursor-pointer">
                            <option>Platform Partnership</option>
                            <option>Merchant Integration</option>
                            <option>Fleet Application</option>
                            <option>Security Protocol</option>
                         </select>
                         <i class="fas fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none"></i>
                      </div>
                   </div>

                   <div class="space-y-2">
                      <label class="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Transmission Magnitude</label>
                      <textarea rows="4" placeholder="Transmit your message protocols here..." class="w-full bg-slate-50 border-none rounded-3xl p-6 font-bold text-slate-900 text-sm tracking-tight outline-none focus:ring-4 focus:ring-primary/5 transition-all resize-none"></textarea>
                   </div>

                   <button type="submit" :disabled="isTransmitting" class="w-full h-16 sm:h-20 bg-slate-900 text-white rounded-[1.8rem] font-black uppercase tracking-[0.3em] text-[10px] sm:text-xs shadow-2xl hover:bg-primary transition-all active:scale-[0.98] flex items-center justify-center gap-4 group disabled:opacity-70">
                      <span v-if="!isTransmitting">Transmit Signal</span>
                      <span v-else class="flex items-center gap-3">
                         <i class="fas fa-spinner fa-spin"></i>
                         Encoding...
                      </span>
                      <i v-if="!isTransmitting" class="fas fa-paper-plane group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform"></i>
                   </button>
                </form>

                <!-- Success Overlay (Simulated) -->
                <div v-if="showSuccess" class="absolute inset-0 bg-white/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center text-center p-10 animate-fade-in">
                   <div class="w-24 h-24 bg-emerald-500 text-white rounded-[2rem] flex items-center justify-center text-4xl shadow-2xl shadow-emerald-500/30 mb-8 animate-bounce-short">
                      <i class="fas fa-check-double"></i>
                   </div>
                   <h4 class="text-3xl font-black text-slate-900 tracking-tighter mb-4 uppercase">Signal Received</h4>
                   <p class="text-slate-400 font-bold max-w-xs">Transmission encoded successfully. Our terminal will contact your node shortly.</p>
                   <button @click="resetForm" class="mt-10 px-8 py-3 bg-slate-100 text-slate-900 rounded-xl font-black uppercase tracking-widest text-[9px] hover:bg-slate-900 hover:text-white transition-all">New Message</button>
                </div>
             </div>
          </div>
       </div>
    </main>

    <!-- Compact Footer -->
    <footer class="py-12 bg-white border-t border-slate-100">
       <div class="container mx-auto px-6 text-center">
          <p class="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">FoodLink Platform Protocols © 2023</p>
       </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from '@/components/common/Navbar.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isTransmitting = ref(false);
const showSuccess = ref(false);

const contactInfo = [
  { label: 'Tactical Node', icon: 'fa-location-dot', value: 'Downtown Dubai, UAE' },
  { label: 'Voice Channel', icon: 'fa-phone-volume', value: '+971 4 456 7890' },
  { label: 'Encryption Link', icon: 'fa-envelope-open-text', value: 'terminal@foodlink.io' },
];

const handleSubmit = () => {
  isTransmitting.value = true;
  setTimeout(() => {
    isTransmitting.value = false;
    showSuccess.value = true;
  }, 2000);
};

const resetForm = () => {
  showSuccess.value = false;
};
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out forwards;
}
@keyframes bounce-short {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-bounce-short {
  animation: bounce-short 0.6s ease-out 2;
}
</style>
