<template>
  <aside class="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-slate-100 p-8 z-[100] font-plus-jakarta antialiased">
    <div class="flex items-center gap-3 mb-16 cursor-pointer" @click="router.push('/restaurant/dashboard')">
      <img src="@/assets/branding/logo.png" class="w-10 h-10 object-contain" alt="FoodLink Logo" />
      <h1 class="text-2xl font-black tracking-tighter text-slate-900 uppercase">Merchant</h1>
    </div>

    <nav class="space-y-4 flex-1">
      <div 
        v-for="item in navItems" 
        :key="item.path" 
        @click="router.push(item.path)"
        :class="['group flex items-center gap-4 px-6 py-4 rounded-2xl cursor-pointer transition-all duration-300', 
          $route.path === item.path ? 'bg-primary/5 text-primary shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600']"
      >
        <div 
          :class="['w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300', 
            $route.path === item.path ? 'bg-white shadow-md text-primary' : 'bg-slate-50 text-slate-400 group-hover:bg-white group-hover:shadow-sm']"
        >
          <i :class="item.icon" class="text-base"></i>
        </div>
        <span class="font-black text-[10px] uppercase tracking-widest">{{ item.name }}</span>
      </div>
    </nav>

    <div class="mt-auto space-y-4">
       <div @click="handleLogout" class="flex items-center gap-4 px-6 py-4 rounded-[1.5rem] cursor-pointer transition-all font-black text-[10px] uppercase tracking-widest text-red-400 hover:bg-red-50 hover:text-red-600">
          <i class="fas fa-sign-out-alt"></i>
          Terminal Exit
       </div>

       <div class="bg-slate-50 p-6 rounded-3xl border border-slate-100 relative overflow-hidden group">
          <p class="text-[9px] font-black text-primary uppercase tracking-[0.2em] mb-2">Protocol Status</p>
          <div class="flex items-center gap-2">
             <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
             <span class="text-[10px] font-black text-slate-900 uppercase">Master Signal Active</span>
          </div>
       </div>
    </div>
  </aside>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
  router.push('/');
};

const navItems = [
  { name: 'Order Pulse', path: '/restaurant/dashboard', icon: 'fas fa-th-large' },
  { name: 'Transmission Logs', path: '/restaurant/orders', icon: 'fas fa-clipboard-list' },
  { name: 'Menu Registry', path: '/restaurant/menu-management', icon: 'fas fa-utensils' },
  { name: 'Earnings Log', path: '/restaurant/analytics', icon: 'fas fa-chart-pie' },
  { name: 'Profile Hub', path: '/restaurant/profile', icon: 'fas fa-user-gear' }
];
</script>
