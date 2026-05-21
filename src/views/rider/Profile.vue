<template>
  <ion-page>
  <div class="bg-surface text-on-surface font-['Plus_Jakarta_Sans'] min-h-screen pb-24 md:pb-8 flex flex-col antialiased">
    <!-- Header -->
    <RiderMobileHeader />

    <main class="flex-1 overflow-y-auto mt-16 md:mt-0">
      <!-- Mobile Profile Header -->
      <div class="bg-primary text-on-primary pt-8 pb-8 px-4 rounded-b-[2rem] shadow-sm relative mb-8">
        <div class="flex items-center justify-between mb-6">
          <span class="text-xl font-bold tracking-tight">Profile</span>
          <button class="bg-white/20 p-2 rounded-full backdrop-blur-sm active:scale-95 transition-transform hover:bg-white/30">
            <i class="fas fa-cog"></i>
          </button>
        </div>
        
        <div class="flex flex-col items-center text-center">
          <div class="relative mb-4">
            <div class="w-24 h-24 rounded-full border-4 border-primary bg-slate-200 overflow-hidden shadow-md">
              <img :alt="profile.name" class="w-full h-full object-cover" :src="profile.avatar" />
            </div>
            <div class="absolute -bottom-2 -right-2 bg-secondary text-on-secondary text-xs font-bold px-2 py-1 rounded-full border-2 border-white dark:border-slate-900 flex items-center shadow-sm">
              <i class="fas fa-star text-[12px] mr-1"></i>
              {{ profile.rating }}
            </div>
          </div>
          <h1 class="text-2xl font-bold mb-1">{{ profile.name }}</h1>
          <p class="text-sm text-primary-container mb-4 font-medium">{{ profile.tier }} Courier • Joined {{ profile.joinDate }}</p>
          <div class="flex space-x-2">
            <span v-for="badge in profile.badges" :key="badge" class="bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/30">{{ badge }}</span>
          </div>
        </div>
      </div>

      <div class="px-4 md:px-6 max-w-container-max mx-auto space-y-6">
        
        <!-- Performance Overview Grid -->
        <section>
          <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Performance Overview</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="stat in performanceStats" :key="stat.label" class="bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4 shadow-[0px_2px_8px_rgba(0,0,0,0.05)]">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400">{{ stat.label }}</span>
                <i :class="['fas', stat.icon, stat.iconColor]"></i>
              </div>
              <div class="text-2xl font-bold text-slate-900 dark:text-white mb-1">{{ stat.value }}</div>
              <div :class="['text-xs font-medium flex items-center', stat.changeColor]">
                <i :class="['fas text-[12px] mr-1', stat.changeIcon === 'trending_up' ? 'fa-chart-line' : 'fa-chart-line']"></i>
                {{ stat.changeText }}
              </div>
            </div>
          </div>
        </section>

        <!-- Milestones Section (Progress Bars) -->
        <section>
          <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Milestones</h2>
          <div class="bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.05)] space-y-6">
            <div v-for="milestone in milestones" :key="milestone.title">
              <div class="flex justify-between items-end mb-2">
                <div>
                  <div class="text-base font-bold text-slate-900 dark:text-white">{{ milestone.title }}</div>
                  <div class="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">{{ milestone.subtitle }}</div>
                </div>
                <div :class="['text-sm font-bold', milestone.color]">{{ milestone.progress }} / {{ milestone.target }}</div>
              </div>
              <div class="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div :class="['h-full rounded-full', milestone.barColor]" :style="`width: ${milestone.percent}%`"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- Achievements / Badges Bento Grid -->
        <section>
          <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-4">Achievements</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div v-for="ach in achievements" :key="ach.name" 
              :class="['rounded-xl p-4 flex flex-col items-center text-center justify-center aspect-square shadow-sm border', 
                ach.locked ? 'bg-slate-50 dark:bg-slate-800 border-gray-200 dark:border-gray-700 opacity-60' : `${ach.bg} ${ach.borderColor}`]">
              <div :class="['w-12 h-12 rounded-full flex items-center justify-center mb-3', ach.locked ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400' : `${ach.iconBg} text-white`]">
                <i :class="['fas text-xl', ach.icon]"></i>
              </div>
              <div class="text-sm font-bold text-slate-900 dark:text-white mb-1">{{ ach.name }}</div>
              <div class="text-xs font-medium text-slate-500 dark:text-slate-400">{{ ach.desc }}</div>
            </div>
          </div>
        </section>

        <!-- Actions List -->
        <section class="pb-6">
          <div class="bg-white dark:bg-slate-900 border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden shadow-[0px_2px_8px_rgba(0,0,0,0.05)]">
            <div v-for="(action, i) in actions" :key="action.label" 
              :class="['p-4 flex items-center justify-between transition-colors cursor-pointer',
                i < actions.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : '',
                action.danger ? 'hover:bg-red-50 dark:hover:bg-red-900/10' : 'hover:bg-gray-50 dark:hover:bg-slate-800']">
              <div class="flex items-center space-x-3">
                <i :class="['fas w-6 text-center', action.danger ? 'text-red-600 dark:text-red-500' : 'text-slate-500 dark:text-slate-400', action.icon]"></i>
                <span :class="['text-base font-bold', action.danger ? 'text-red-600 dark:text-red-500' : 'text-slate-900 dark:text-white']">{{ action.label }}</span>
              </div>
              <i v-if="!action.danger" class="fas fa-chevron-right text-slate-400"></i>
            </div>
          </div>
        </section>

      </div>
    </main>

    <!-- Bottom Nav -->
    <RiderBottomNav />
  </div>
  </ion-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonPage } from '@ionic/vue';
import RiderMobileHeader from '@/components/rider/RiderMobileHeader.vue';
import RiderBottomNav from '@/components/rider/RiderBottomNav.vue';
import { getPersonPlaceholder } from '@/utils/placeholders';

const router = useRouter();

// --- Mock Profile Data ---

const profile = ref({
  name: 'Alex Mercer',
  avatar: getPersonPlaceholder('Alex Mercer'),
  rating: 4.9,
  tier: 'Elite',
  joinDate: 'Jan 2023',
  badges: ['Top 5% Rider', 'Pro Status'],
});

const performanceStats = ref([
  { label: 'DELIVERIES', value: '1,248', icon: 'fa-bicycle', iconColor: 'text-primary', iconFill: true, changeIcon: 'trending_up', changeText: '+12 this week', changeColor: 'text-secondary' },
  { label: 'HOURS', value: '482h', icon: 'fa-clock', iconColor: 'text-primary', iconFill: false, changeIcon: 'trending_up', changeText: '+35h this month', changeColor: 'text-secondary' },
  { label: 'ON-TIME', value: '98%', icon: 'fa-check-circle', iconColor: 'text-secondary', iconFill: false, changeIcon: 'trending_up', changeText: 'Target: 95%', changeColor: 'text-slate-500 dark:text-slate-400' },
  { label: 'EARNINGS', value: '4,850 ₢', icon: 'fa-wallet', iconColor: 'text-primary', iconFill: false, changeIcon: 'trending_up', changeText: '+120 ₢ today', changeColor: 'text-secondary' },
]);

const milestones = ref([
  { title: 'Next Tier: Platinum', subtitle: 'Complete 1,500 deliveries', progress: '1,248', target: '1,500', percent: 83, color: 'text-primary', barColor: 'bg-primary' },
  { title: 'Weekly Goal', subtitle: 'Earn 500 ₢ this week', progress: '380 ₢', target: '500 ₢', percent: 76, color: 'text-secondary', barColor: 'bg-secondary' },
]);

const achievements = ref([
  { name: 'Speed Demon', desc: 'Avg delivery <20m', icon: 'fa-tachometer-alt', bg: 'bg-blue-50 dark:bg-blue-900/10', borderColor: 'border-blue-200 dark:border-blue-800/50', iconBg: 'bg-blue-600 dark:bg-blue-500', locked: false },
  { name: 'Customer Fav', desc: '100+ 5-star ratings', icon: 'fa-thumbs-up', bg: 'bg-primary-container/20', borderColor: 'border-primary/20', iconBg: 'bg-secondary', locked: false },
  { name: '1k Club', desc: '1,000 deliveries', icon: 'fa-award', bg: 'bg-primary-container/20', borderColor: 'border-primary/20', iconBg: 'bg-primary', locked: false },
  { name: 'Night Owl', desc: '50 late deliveries', icon: 'fa-lock', bg: '', borderColor: '', iconBg: '', locked: true },
]);

const actions = ref([
  { icon: 'fa-wallet', label: 'Payout Settings', danger: false },
  { icon: 'fa-history', label: 'Delivery History', danger: false },
  { icon: 'fa-sign-out-alt', label: 'Log Out', danger: true },
]);
</script>
