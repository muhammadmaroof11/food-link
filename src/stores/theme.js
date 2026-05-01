import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
    appMode: 'light', // 'light', 'dark'
    hungerMode: true, // Specific mode for appetizing colors
  }),
  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
      this.appMode = this.isDark ? 'dark' : 'light';
      this.applyTheme();
    },
    setTheme(mode) {
      this.appMode = mode;
      this.isDark = mode === 'dark';
      this.applyTheme();
    },
    applyTheme() {
      const root = document.documentElement;
      if (this.isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    }
  }
});
