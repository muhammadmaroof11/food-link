<template>
  <div :class="[themeStore.appMode, 'min-h-screen', 'font-plus-jakarta']">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.applyTheme();
});
</script>

<style>
/* Global resets if needed */
body {
  margin: 0;
  padding: 0;
  background-color: var(--color-background);
}
</style>
