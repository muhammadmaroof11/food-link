<template>
  <header class="docked full-width top-0 z-50 flex justify-between items-center px-4 h-16 w-full bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-gray-800 shadow-sm font-['Plus_Jakarta_Sans'] antialiased shrink-0">
    <div class="flex items-center gap-2 cursor-pointer" @click="$router.push('/customer/dashboard')">
      <img src="@/assets/branding/logo.png" class="w-8 h-8 object-contain" />
      <div class="text-xl font-black tracking-tight text-slate-900 uppercase">
        FoodLink
      </div>
    </div>
    <div class="flex items-center gap-4">
      <button class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-95 duration-200 rounded-full p-2 flex items-center justify-center">
        <i class="fas fa-bell"></i>
      </button>
      <button class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors active:scale-95 duration-200 rounded-full p-2 flex items-center justify-center">
        <i class="fas fa-user-circle"></i>
      </button>
    </div>
  </header>
</template>

<script setup>
// Customer Header Component
</script>
