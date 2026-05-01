<template>
  <header class="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-12 py-3 sm:py-5 pointer-events-none">
     <nav class="max-w-[1400px] mx-auto bg-white/70 backdrop-blur-3xl rounded-2xl sm:rounded-[2rem] border border-white/40 px-5 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)] pointer-events-auto">
        <div class="flex items-center gap-3 cursor-pointer shrink-0" @click="$router.push('/')">
           <img src="@/assets/branding/logo.png" class="w-10 h-10 object-contain" alt="FoodLink Logo" />
           <span class="text-base sm:text-lg font-black tracking-tighter text-slate-900 uppercase">FoodLink</span>
        </div>

        <!-- Desktop Navigation Links -->
        <div class="hidden lg:flex items-center gap-8 xl:gap-12">
           <router-link to="/" class="text-[9px] font-black uppercase tracking-widest transition-colors" :class="route.path === '/' ? 'text-primary' : 'text-slate-400 hover:text-primary'">About</router-link>
           <router-link to="/mission" class="text-[9px] font-black uppercase tracking-widest transition-colors" :class="route.path === '/mission' ? 'text-primary' : 'text-slate-400 hover:text-primary'">Our Mission</router-link>
           <button @click="navigateToPortals" class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Portals</button>
           <router-link to="/careers" class="text-[9px] font-black uppercase tracking-widest transition-colors" :class="route.path === '/careers' ? 'text-primary' : 'text-slate-400 hover:text-primary'">Careers</router-link>
           <router-link to="/contact" class="text-[9px] font-black uppercase tracking-widest transition-colors" :class="route.path === '/contact' ? 'text-primary' : 'text-slate-400 hover:text-primary'">Contact Us</router-link>
        </div>

        <div class="flex items-center gap-3">
           <button @click="$router.push('/customer/dashboard')" class="hidden sm:block bg-slate-900 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all active:scale-95 shadow-xl shrink-0">
              Launch App
           </button>
           <button @click="isMenuOpen = !isMenuOpen" class="lg:hidden w-10 h-10 flex items-center justify-center text-slate-900 bg-slate-50 rounded-xl hover:bg-primary hover:text-white transition-all">
              <i :class="['fas', isMenuOpen ? 'fa-xmark' : 'fa-bars-staggered', 'text-sm']"></i>
           </button>
        </div>
     </nav>

     <!-- Mobile Menu Overlay -->
     <div v-if="isMenuOpen" class="fixed inset-0 top-24 z-[90] px-4 lg:hidden pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-300">
        <div class="bg-white/90 backdrop-blur-3xl rounded-[2.5rem] border border-slate-100 p-10 shadow-2xl flex flex-col gap-8">
           <router-link v-for="link in navLinks" :key="link.path" :to="link.path" @click="isMenuOpen = false" class="text-xl font-black uppercase tracking-widest text-slate-900 hover:text-primary transition-colors border-b border-slate-50 pb-4">
              {{ link.name }}
           </router-link>
           <button @click="navigateToPortalsMobile" class="text-xl font-black uppercase tracking-widest text-left text-slate-900 hover:text-primary transition-colors border-b border-slate-50 pb-4">Portals</button>
           <button @click="$router.push('/customer/dashboard'); isMenuOpen = false" class="w-full py-6 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl">Launch Application</button>
        </div>
     </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const isMenuOpen = ref(false);

const navLinks = [
  { name: 'About', path: '/' },
  { name: 'Our Mission', path: '/mission' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact Us', path: '/contact' }
];

const navigateToPortals = async () => {
  if (route.path !== '/') {
    await router.push('/');
    setTimeout(() => {
      document.getElementById('portals')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  } else {
    document.getElementById('portals')?.scrollIntoView({ behavior: 'smooth' });
  }
};

const navigateToPortalsMobile = () => {
  isMenuOpen.value = false;
  navigateToPortals();
};
</script>
