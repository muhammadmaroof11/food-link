<template>
  <div class="min-h-screen lg:h-screen bg-white font-plus-jakarta antialiased selection:bg-primary/10 overflow-hidden flex">
    
    <!-- Left Column: Visual & Branding (Desktop Only) -->
    <div class="hidden lg:flex flex-1 bg-slate-950 relative overflow-hidden flex-col justify-center p-20">
       <div class="absolute inset-0 z-0">
          <img src="@/assets/branding/landing_hero.png" class="w-full h-full object-cover opacity-40 mix-blend-luminosity" />
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
       </div>
       
       <div class="relative z-10 space-y-8">
          <div @click="router.push('/')" class="w-20 h-20 bg-white rounded-3xl p-4 flex items-center justify-center shadow-2xl cursor-pointer hover:scale-105 transition-transform">
             <img src="@/assets/branding/logo.png" class="w-full h-full object-contain" />
          </div>
          <div class="space-y-4">
             <h1 class="text-6xl font-black text-white tracking-tighter leading-none uppercase">Gourmet <br/> Portal.</h1>
             <p class="text-slate-400 text-lg font-bold max-w-md leading-relaxed">
                Log in to access your premium food delivery service.
             </p>
          </div>
       </div>

       <div class="absolute bottom-12 left-20 z-10">
          <p class="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em]">FoodLink Logistics Network © 2023</p>
       </div>
    </div>

    <!-- Right Column: Login Form -->
    <div class="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12 relative bg-[#F8FAFC]">
      <!-- Mobile Logo -->
      <div class="lg:hidden absolute top-8 left-8 flex items-center gap-3">
         <img src="@/assets/branding/logo.png" class="w-8 h-8 object-contain" />
         <span class="text-lg font-black tracking-tighter text-slate-900 uppercase">FoodLink</span>
      </div>

      <div class="max-w-md w-full mx-auto space-y-10">
        <div>
           <h2 class="text-4xl font-black text-slate-900 tracking-tighter">Welcome Back</h2>
           <p class="text-slate-500 font-bold mt-2">Enter your credentials to log in.</p>
        </div>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
           <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 ml-1">Email Address</label>
              <div class="relative">
                 <i class="fas fa-envelope absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"></i>
                 <input type="email" v-model="email" placeholder="you@example.com" class="w-full h-16 bg-white border-2 border-slate-100 rounded-2xl pl-14 pr-6 font-bold text-slate-900 text-sm tracking-tight outline-none focus:border-primary/20 transition-all shadow-sm" required />
              </div>
           </div>

           <div class="space-y-2">
              <label class="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 ml-1">Your Password</label>
              <div class="relative">
                 <i class="fas fa-lock absolute left-6 top-1/2 -translate-y-1/2 text-slate-400"></i>
                 <input type="password" v-model="password" placeholder="••••••••" class="w-full h-16 bg-white border-2 border-slate-100 rounded-2xl pl-14 pr-6 font-bold text-slate-900 text-sm tracking-tight outline-none focus:border-primary/20 transition-all shadow-sm" required />
              </div>
           </div>

           <p v-if="error" class="text-red-500 text-[10px] font-black uppercase tracking-widest text-center">{{ error }}</p>

           <button type="submit" :disabled="loading" class="w-full h-16 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[11px] shadow-2xl hover:bg-primary transition-all active:scale-[0.98] flex items-center justify-center gap-4 group disabled:opacity-70">
              <span v-if="!loading">Login to Account</span>
              <i v-else class="fas fa-spinner fa-spin"></i>
              <i v-if="!loading" class="fas fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
           </button>
        </form>

        <div class="pt-8 border-t border-slate-200 text-center">
           <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Need a new account?</p>
           <router-link to="/signup" class="text-[11px] font-black text-primary uppercase tracking-widest hover:text-slate-900 transition-colors">Create an Account</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const handleLogin = async () => {
  loading.value = true;
  error.value = '';
  try {
    await authStore.login(email.value, password.value);
    
    // Redirect based on role
    const role = authStore.userRole;
    if (role === 'admin') router.push('/admin/dashboard');
    else if (role === 'restaurant') router.push('/restaurant/dashboard');
    else if (role === 'rider') router.push('/rider/dashboard');
    else router.push('/customer/dashboard');
    
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};
</script>
