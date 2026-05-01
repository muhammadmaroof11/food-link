<template>
  <div class="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-lg pointer-events-none">
    <nav class="pointer-events-auto bg-white/95 backdrop-blur-2xl rounded-[2rem] p-2 flex items-center justify-around shadow-xl border border-slate-100 relative">
      <router-link 
        v-for="item in navItems" 
        :key="item.path" 
        :to="item.path"
        v-slot="{ isActive }"
        class="relative px-3 py-2 sm:px-6 sm:py-3 group flex-1"
      >
        <div class="relative flex flex-col items-center justify-center gap-1">
          <div 
            class="text-xl transition-all duration-300 group-hover:-translate-y-1"
            :class="isActive ? 'text-primary scale-110' : 'text-slate-300'"
          >
            <i :class="isActive ? item.activeIcon : item.icon"></i>
          </div>
          <span 
            v-if="isActive"
            class="text-[8px] font-black uppercase tracking-widest text-primary animate-scale-in"
          >
            {{ item.name }}
          </span>
        </div>
        
        <!-- Active Dot -->
        <div 
          v-if="isActive" 
          class="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary shadow-lg shadow-primary/40"
        ></div>
      </router-link>
    </nav>
  </div>
</template>

<script setup>
const navItems = [
  { name: 'Home', path: '/customer/dashboard', icon: 'fas fa-house', activeIcon: 'fas fa-house' },
  { name: 'Orders', path: '/customer/order-history', icon: 'fas fa-receipt', activeIcon: 'fas fa-file-invoice' },
  { name: 'Track', path: '/customer/live-tracking', icon: 'fas fa-location-dot', activeIcon: 'fas fa-map-location-dot' },
  { name: 'Profile', path: '/customer/profile', icon: 'fas fa-user', activeIcon: 'fas fa-user-gear' }
];
</script>

<style scoped>
@keyframes scale-in {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}
.animate-scale-in {
  animation: scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
</style>
