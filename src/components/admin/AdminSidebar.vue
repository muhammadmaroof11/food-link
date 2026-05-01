<template>
  <aside class="hidden lg:flex w-56 bg-white border-r border-slate-100 flex-col sticky top-0 h-screen p-6 z-[100] font-plus-jakarta antialiased shadow-sm">
    <div class="flex items-center gap-3 mb-10">
      <img src="@/assets/branding/logo.png" class="w-8 h-8 object-contain" alt="FoodLink Logo" />
      <h2 class="text-xl font-black text-slate-900 tracking-tighter uppercase">Admin</h2>
    </div>

    <nav class="space-y-2 flex-1">
      <div v-for="link in adminLinks" :key="link.label" @click="router.push(link.path)" 
        :class="['flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all font-black text-[9px] uppercase tracking-widest', 
          $route.path === link.path ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/20' : 'text-slate-400 hover:bg-slate-50 hover:text-primary']">
         <i :class="['fas', link.icon, 'text-xs w-4']"></i>
         {{ link.label }}
      </div>
    </nav>

    <div class="mt-auto space-y-4">
       <div @click="handleLogout" class="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all font-black text-[9px] uppercase tracking-widest text-red-400 hover:bg-red-50 hover:text-red-600">
          <i class="fas fa-sign-out-alt text-xs w-4"></i>
          Logout
       </div>

       <div class="bg-slate-50 p-4 rounded-2xl border border-slate-100 relative overflow-hidden group">
          <p class="text-[8px] font-black text-primary uppercase tracking-[0.2em] mb-2">Network Status</p>
          <div class="flex items-center gap-2">
             <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
             <span class="text-[9px] font-black text-slate-900 uppercase">Systems Online</span>
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

const adminLinks = [
  { label: 'Dashboard', icon: 'fa-chart-pie', path: '/admin/dashboard' },
  { label: 'Merchants', icon: 'fa-store', path: '/admin/merchants' },
  { label: 'Users', icon: 'fa-users', path: '/admin/users' },
  { label: 'Settings', icon: 'fa-sliders', path: '/admin/settings' },
];
</script>
