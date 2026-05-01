<template>
  <nav class="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-slate-100 p-8 z-[100]">
    <div class="flex items-center gap-3 mb-12 cursor-pointer" @click="router.push('/customer/dashboard')">
      <img src="@/assets/branding/logo.png" class="w-10 h-10 object-contain" alt="FoodLink Logo" />
      <h1 class="text-2xl font-black tracking-tighter text-slate-900 uppercase">FoodLink</h1>
    </div>

    <div class="space-y-2 flex-1">
      <router-link 
        v-for="item in navItems" 
        :key="item.path" 
        :to="item.path"
        v-slot="{ isActive }"
        class="group flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300"
        :class="isActive ? 'bg-primary/5 text-primary shadow-sm' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-600'"
      >
        <div 
          class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
          :class="isActive ? 'bg-white shadow-md text-primary' : 'bg-slate-50 text-slate-400 group-hover:bg-white group-hover:shadow-sm'"
        >
          <i :class="isActive ? item.activeIcon : item.icon" class="text-lg"></i>
        </div>
        <span class="font-bold text-sm uppercase tracking-widest">{{ item.name }}</span>
      </router-link>
    </div>

    <div class="mt-auto space-y-4">
      <div @click="handleLogout" class="flex items-center gap-4 px-6 py-4 rounded-[1.5rem] cursor-pointer transition-all font-black text-[10px] uppercase tracking-widest text-red-400 hover:bg-red-50 hover:text-red-600">
         <i class="fas fa-sign-out-alt"></i>
         Disconnect
      </div>
      
      <div class="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 relative overflow-hidden group cursor-pointer">
        <div class="absolute -right-8 -top-8 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
        <p class="text-[10px] font-black text-primary uppercase tracking-widest mb-2">Upgrade Pro</p>
        <p class="text-xs font-bold text-slate-600 mb-4 leading-relaxed">Unlock unlimited rewards and 0 delivery fees.</p>
        <button class="w-full py-3 bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm border border-slate-100 hover:bg-primary hover:text-white hover:border-primary transition-all">Learn More</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
  router.push('/');
};

const navItems = [
  { name: 'Dashboard', path: '/customer/dashboard', icon: 'fas fa-grip-vertical', activeIcon: 'fas fa-grip' },
  { name: 'History', path: '/customer/order-history', icon: 'fas fa-clock-rotate-left', activeIcon: 'fas fa-file-invoice' },
  { name: 'Live Track', path: '/customer/live-tracking', icon: 'fas fa-location-dot', activeIcon: 'fas fa-map-location-dot' },
  { name: 'Wallet', path: '/customer/wallet', icon: 'fas fa-wallet', activeIcon: 'fas fa-wallet' },
  { name: 'Profile', path: '/customer/profile', icon: 'fas fa-user', activeIcon: 'fas fa-user-gear' }
];
</script>
