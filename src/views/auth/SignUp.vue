<template>
  <div class="min-h-screen lg:h-screen bg-white font-plus-jakarta antialiased selection:bg-primary/10 overflow-hidden flex">
    
    <!-- Left Column: Visual (Desktop Only) -->
    <div class="hidden lg:flex flex-1 bg-slate-950 relative overflow-hidden flex-col justify-center p-20">
       <div class="absolute inset-0 z-0">
          <img :src="bgImage" class="w-full h-full object-cover opacity-30 mix-blend-overlay scale-110" />
          <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/40 to-transparent"></div>
       </div>
       
       <div class="relative z-10 space-y-10">
          <div @click="router.push('/')" class="w-20 h-20 bg-white rounded-3xl p-4 flex items-center justify-center shadow-2xl cursor-pointer hover:rotate-6 transition-transform">
             <img src="@/assets/branding/logo.png" class="w-full h-full object-contain" />
          </div>
          <div class="space-y-4">
             <h1 class="text-6xl font-black text-white tracking-tighter leading-none uppercase" v-html="theme.headline.replace(' ', '<br/>')"></h1>
             <p class="text-slate-400 text-lg font-bold max-w-sm leading-relaxed">
                {{ theme.subtitle }}
             </p>
          </div>
       </div>

       <div class="absolute bottom-12 left-20 z-10">
          <div class="flex items-center gap-4 text-white/30 text-[9px] font-black uppercase tracking-[0.4em]">
             <span>Secure Access</span>
             <span class="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
             <span>Protected Data</span>
          </div>
       </div>
    </div>

    <!-- Right Column: Signup Form -->
    <div class="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 relative bg-[#F8FAFC] overflow-y-auto lg:overflow-hidden">
      <!-- Mobile Logo -->
      <div class="lg:hidden absolute top-8 left-8 flex items-center gap-3">
         <img src="@/assets/branding/logo.png" class="w-8 h-8 object-contain" />
         <span class="text-lg font-black tracking-tighter text-slate-900 uppercase">FoodLink</span>
      </div>

      <div class="max-w-xl w-full mx-auto space-y-8">
        <div>
           <h2 class="text-4xl font-black text-slate-900 tracking-tighter">Create Account</h2>
           <p class="text-slate-500 font-bold mt-2">Choose your role and set up your profile.</p>
        </div>
        
        <form @submit.prevent="handleSignUp" class="space-y-6">
           <!-- Role Selector -->
           <div class="space-y-3" v-if="!hasFixedRole">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 ml-1">Account Role</label>
              <div class="grid grid-cols-3 gap-3">
                 <div v-for="r in roles" :key="r.id" 
                   @click="role = r.id"
                   :class="['p-4 rounded-2xl border-2 transition-all cursor-pointer text-center group/role', 
                     role === r.id ? 'border-primary bg-primary/5' : 'border-white bg-white hover:border-slate-200 shadow-sm']">
                    <i :class="['fas', r.icon, role === r.id ? 'text-primary' : 'text-slate-300', 'text-lg mb-1.5 transition-colors']"></i>
                    <p :class="['text-[8px] font-black uppercase tracking-widest', role === r.id ? 'text-primary' : 'text-slate-500']">{{ r.label }}</p>
                 </div>
              </div>
           </div>

           <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-2">
                 <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 ml-1">Full Name</label>
                 <input type="text" v-model="fullName" placeholder="John Doe" class="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl px-6 font-bold text-slate-900 text-sm tracking-tight outline-none focus:border-primary/20 transition-all shadow-sm" required />
              </div>
              <div class="space-y-2">
                 <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 ml-1">Email Address</label>
                 <input type="email" v-model="email" placeholder="you@example.com" class="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl px-6 font-bold text-slate-900 text-sm tracking-tight outline-none focus:border-primary/20 transition-all shadow-sm" required />
              </div>
           </div>

           <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 ml-1">Create Password</label>
              <input type="password" v-model="password" placeholder="••••••••" class="w-full h-14 bg-white border-2 border-slate-100 rounded-2xl px-6 font-bold text-slate-900 text-sm tracking-tight outline-none focus:border-primary/20 transition-all shadow-sm" required />
           </div>

           <p v-if="error" class="text-red-500 text-[10px] font-black uppercase tracking-widest text-center">{{ error }}</p>

           <button type="submit" :disabled="loading" :class="[theme.buttonClass, 'w-full h-16 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-4 group disabled:opacity-70']">
              <span v-if="!loading">Create Account</span>
              <i v-else class="fas fa-spinner fa-spin"></i>
              <i v-if="!loading" class="fas fa-check-circle text-[10px] group-hover:scale-110 transition-transform"></i>
           </button>
        </form>

        <div class="pt-6 border-t border-slate-200 text-center">
           <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Already have an account?</p>
           <router-link to="/login" class="text-[11px] font-black text-primary uppercase tracking-widest hover:text-slate-900 transition-colors">Sign In Instead</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

import bgRider from '@/assets/branding/auth_bg_rider.png';
import bgMerchant from '@/assets/branding/auth_bg_merchant.png';
import bgDiner from '@/assets/branding/auth_bg_diner.png';
import bgAdmin from '@/assets/branding/auth_bg_admin.png';
import bgDefault from '@/assets/branding/landing_hero.png';

const router = useRouter();
const authStore = useAuthStore();

const target = import.meta.env.VITE_APP_TARGET || 'web';

const bgImage = target === 'rider' ? bgRider :
                target === 'merchant' ? bgMerchant :
                target === 'admin' ? bgAdmin :
                target === 'diner' ? bgDiner : bgDefault;

const theme = {
  rider: {
    headline: 'Rider Fleet.',
    subtitle: 'Deliver happiness on your own schedule.',
    buttonClass: 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/30'
  },
  merchant: {
    headline: 'Merchant Hub.',
    subtitle: 'Grow your business and manage orders seamlessly.',
    buttonClass: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30'
  },
  admin: {
    headline: 'Command Center.',
    subtitle: 'Manage operations and oversee the network.',
    buttonClass: 'bg-slate-800 hover:bg-slate-900 shadow-slate-800/30'
  },
  diner: {
    headline: 'Gourmet Portal.',
    subtitle: 'Discover and order the best food in town.',
    buttonClass: 'bg-primary hover:bg-primary/90 shadow-primary/30'
  },
  web: {
    headline: 'Join the Network.',
    subtitle: 'Connect with the district\'s elite culinary circuit and logistics fleet.',
    buttonClass: 'bg-slate-900 hover:bg-primary'
  }
}[target];

const hasFixedRole = target !== 'web';
const defaultRole = target === 'web' ? 'customer' : (target === 'diner' ? 'customer' : target === 'merchant' ? 'restaurant' : target);

const fullName = ref('');
const email = ref('');
const password = ref('');
const role = ref(defaultRole);
const loading = ref(false);
const error = ref('');

const roles = [
  { id: 'customer', label: 'Diner', icon: 'fa-user' },
  { id: 'restaurant', label: 'Merchant', icon: 'fa-store' },
  { id: 'rider', label: 'Rider', icon: 'fa-motorcycle' }
];

const handleSignUp = async () => {
  loading.value = true;
  error.value = '';
  try {
    await authStore.register(email.value, password.value, fullName.value, role.value);
    alert('Account created! Please check your email to verify your profile.');
    router.push('/login');
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>
