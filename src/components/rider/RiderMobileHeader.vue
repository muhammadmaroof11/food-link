<template>
  <header class="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-white dark:bg-slate-900 shadow-sm dark:shadow-none border-b border-gray-200 dark:border-gray-800 transition-colors">
    <div class="flex items-center gap-2 cursor-pointer" @click="$router.push('/rider/dashboard')">
      <img src="@/assets/branding/logo.png" class="w-7 h-7 object-contain" />
      <div class="text-lg font-black text-slate-900 tracking-tighter uppercase font-plus-jakarta antialiased">
        FoodLink <span class="text-primary">Rider</span>
      </div>
    </div>
    <div class="flex items-center gap-4">
      <button class="text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-full p-1 active:scale-95 duration-150 relative">
        <i class="fas fa-bell"></i>
        <span class="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full border border-white"></span>
      </button>
      <button @click="$router.push('/rider/profile')" class="text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-full p-1 active:scale-95 duration-150">
        <i class="fas fa-user-circle"></i>
      </button>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>
