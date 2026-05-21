<template>
  <div class="min-h-screen bg-background font-plus-jakarta antialiased selection:bg-primary/10 overflow-x-hidden">
    <!-- Desktop Navigation Sidebar -->
    <DesktopNav />

    <!-- Main Content Area -->
    <div class="lg:ml-64 flex flex-col min-h-screen relative">
      <!-- Identity Bar -->
      <header class="relative pt-6 pb-6 sm:pt-10 sm:pb-8 px-6 sm:px-12 overflow-hidden bg-white">
        <!-- Appetizing Decor -->
        <div class="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 animate-pulse"></div>
        
        <div class="relative z-10 flex justify-between items-center max-w-[1400px] mx-auto w-full">
          <div>
            <p class="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-primary mb-1.5">Gourmet Profile</p>
            <h1 class="text-2xl sm:text-4xl font-black text-slate-900 tracking-tighter leading-none">Your Identity</h1>
          </div>
          
          <button class="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-primary shadow-sm hover:border-primary/20 transition-all active:scale-95">
            <i class="fas fa-cog"></i>
          </button>
        </div>
      </header>

      <!-- Content Container -->
      <main class="relative z-20 flex-1 w-full pb-32 px-6 sm:px-12 max-w-[1400px] mx-auto space-y-8 sm:space-y-12">
        <!-- Profile Header & Gamification Level -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 sm:gap-10">
          <div class="xl:col-span-2 bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col sm:flex-row items-center sm:items-start gap-8 relative overflow-hidden group">
             <div class="absolute -right-16 -bottom-16 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
             
             <div class="relative group/avatar">
                 <div class="w-24 h-24 sm:w-32 sm:h-32 rounded-[2.2rem] bg-slate-100 overflow-hidden ring-4 ring-white shadow-2xl relative z-10 transition-all group-hover/avatar:scale-95">
                   <img :src="user?.avatar_url || getPersonPlaceholder(user?.full_name || 'User')" alt="User" class="w-full h-full object-cover" />
                   <div v-if="uploading" class="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center text-white">
                      <i class="fas fa-spinner fa-spin"></i>
                   </div>
                   <label class="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/0 group-hover/avatar:bg-black/40 transition-all opacity-0 group-hover/avatar:opacity-100">
                      <input type="file" @change="handleAvatarUpload" accept="image/*" class="hidden" />
                      <i class="fas fa-camera text-white text-xl"></i>
                   </label>
                 </div>
                 <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-lg animate-pulse z-20">
                   <i class="fas fa-check text-xs"></i>
                 </div>
              </div>

             <div class="flex-1 text-center sm:text-left relative z-10">
                <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                  <h2 class="font-black text-2xl sm:text-4xl text-slate-900 tracking-tighter">{{ user?.full_name || 'Alex Mercer' }}</h2>
                  <div v-if="user" :class="['px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border self-center sm:self-auto', getLevelColor(user.level)]">
                    {{ user.level }}
                  </div>
                </div>
                <p class="text-slate-400 font-bold text-xs sm:text-sm uppercase tracking-widest mb-6">Dubai Marina, UAE • Gourmet Member Since 2024</p>
                
                <!-- Gamification Progress -->
                <div v-if="user" class="space-y-4">
                  <div class="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span class="text-slate-500">Tier Progress</span>
                    <span v-if="nextLevelTarget" class="text-primary">{{ progressToNextLevel.toFixed(0) }}% to Next Tier</span>
                    <span v-else class="text-primary">Max Tier Reached!</span>
                  </div>
                  <div class="w-full bg-slate-50 rounded-full h-3 overflow-hidden border border-slate-100 shadow-inner">
                    <div class="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-[2000ms] ease-out shadow-lg shadow-primary/20" :style="{ width: `${progressToNextLevel}%` }"></div>
                  </div>
                  <div class="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest">
                    <span>₢{{ user.lifetime_credits_earned }} Earned</span>
                    <span v-if="nextLevelTarget">Goal: ₢{{ nextLevelTarget }}</span>
                  </div>
                </div>
             </div>
          </div>

          <!-- Wallet Quick Glance -->
          <div class="bg-slate-900 text-white p-8 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-slate-900/20 relative overflow-hidden group border border-white/10 flex flex-col justify-between">
            <div class="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] translate-x-10 -translate-y-10 group-hover:scale-150 transition-transform duration-1000"></div>
            <div>
              <p class="text-white/50 font-black uppercase tracking-[0.2em] mb-4 text-[10px]">Credits Available</p>
              <h2 class="text-4xl sm:text-5xl font-black tracking-tighter mb-8 relative z-10 text-white">{{ user?.wallet_balance || '0.00' }} <span class="text-2xl font-black text-primary">₢</span></h2>
            </div>
            <button class="w-full py-5 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary hover:text-white transition-all shadow-xl active:scale-95 relative z-10">
              Reload Credits
            </button>
          </div>
        </div>

        <!-- Menu Strategy Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          <!-- Account Management -->
          <section class="space-y-6">
            <h3 class="text-xl font-black text-slate-900 tracking-tighter px-2">Manage Account</h3>
            <div class="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden p-2">
              <div v-for="(item, idx) in accountMenu" :key="idx" class="flex items-center justify-between p-6 sm:p-8 hover:bg-slate-50 cursor-pointer transition-all rounded-[1.8rem] group">
                <div class="flex items-center gap-6">
                  <div class="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors shadow-sm">
                    <i :class="item.icon" class="text-lg"></i>
                  </div>
                  <div>
                    <span class="font-black text-sm uppercase tracking-widest text-slate-800">{{ item.label }}</span>
                    <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">{{ item.desc }}</p>
                  </div>
                </div>
                <i class="fas fa-chevron-right text-slate-200 group-hover:text-primary transition-all"></i>
              </div>
            </div>
          </section>

          <!-- Preferences & Security -->
          <section class="space-y-6">
             <h3 class="text-xl font-black text-slate-900 tracking-tighter px-2">Preferences</h3>
             <div class="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden p-2">
                <div v-for="(item, idx) in prefMenu" :key="idx" class="flex items-center justify-between p-6 sm:p-8 hover:bg-slate-50 cursor-pointer transition-all rounded-[1.8rem] group">
                  <div class="flex items-center gap-6">
                    <div class="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-primary transition-colors shadow-sm">
                      <i :class="item.icon" class="text-lg"></i>
                    </div>
                    <div>
                      <span class="font-black text-sm uppercase tracking-widest text-slate-800">{{ item.label }}</span>
                      <p class="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-1">{{ item.desc }}</p>
                    </div>
                  </div>
                  <i class="fas fa-chevron-right text-slate-200 group-hover:text-primary transition-all"></i>
                </div>

                <!-- Danger Zone -->
                <div @click="logout" class="flex items-center justify-between p-6 sm:p-8 hover:bg-red-50 cursor-pointer transition-all rounded-[1.8rem] group border-t border-slate-50 mt-2">
                  <div class="flex items-center gap-6 text-red-500">
                    <div class="w-12 h-12 rounded-2xl bg-white border border-red-100 flex items-center justify-center text-red-400">
                      <i class="fas fa-sign-out-alt text-lg"></i>
                    </div>
                    <div>
                      <span class="font-black text-sm uppercase tracking-widest">Terminate Session</span>
                      <p class="text-[9px] text-red-300 font-bold uppercase tracking-widest mt-1">Logout of all gourmet portals</p>
                    </div>
                  </div>
                </div>
             </div>
          </section>
        </div>
      </main>
    </div>

    <!-- Mobile Navigation -->
    <div class="lg:hidden">
      <CustomerBottomNav />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { getPersonPlaceholder } from '@/utils/placeholders';
import { optimizeImage } from '@/utils/imageOptimizer';
import { supabase } from '@/utils/supabase';
import DesktopNav from '@/components/customer/DesktopNav.vue';
import CustomerBottomNav from '@/components/customer/CustomerBottomNav.vue';

const router = useRouter();
const authStore = useAuthStore();
const uploading = ref(false);

const user = computed(() => authStore.profile);

onMounted(async () => {
  await authStore.fetchProfile();
});

const handleAvatarUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  uploading.value = true;
  try {
    // 1. Optimize
    const optimizedFile = await optimizeImage(file, 400, 0.8);

    // 2. Upload to Supabase Storage
    const filePath = `merchants/profiles/${authStore.user.id}-${Date.now()}.webp`;
    const { error: uploadError } = await supabase.storage
      .from('foodlink-assets')
      .upload(filePath, optimizedFile);

    if (uploadError) throw uploadError;

    // 3. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('foodlink-assets')
      .getPublicUrl(filePath);

    // 4. Update Profile
    await authStore.updateProfile({ avatar_url: publicUrl });
    alert('Identity Signal Updated. Avatar Lock Successful.');
  } catch (err) {
    console.error('Upload failed:', err);
    alert('Signal transmission failed.');
  } finally {
    uploading.value = false;
  }
};

const accountMenu = [
  { label: 'Signal Logs', desc: 'Transaction History', icon: 'fas fa-receipt' },
  { label: 'Port Coordinates', desc: 'Saved Addresses', icon: 'fas fa-map-location-dot' },
  { label: 'Payment Hub', desc: 'Methods & Cards', icon: 'fas fa-credit-card' },
];

const prefMenu = [
  { label: 'Tactical Notifications', desc: 'Alerts & Sounds', icon: 'fas fa-bell' },
  { label: 'Aesthetics', desc: 'Dark / Light / Hunger Mode', icon: 'fas fa-palette' },
  { label: 'Security Protocols', desc: 'Password & MFA', icon: 'fas fa-shield-halved' },
];

const progressToNextLevel = computed(() => {
  if (!user.value) return 0;
  const credits = user.value.lifetime_credits_earned || 0;
  if (credits < 500) return (credits / 500) * 100;
  if (credits < 2000) return ((credits - 500) / 1500) * 100;
  if (credits < 5000) return ((credits - 2000) / 3000) * 100;
  return 100;
});

const nextLevelTarget = computed(() => {
  if (!user.value) return 0;
  const credits = user.value.lifetime_credits_earned || 0;
  if (credits < 500) return 500;
  if (credits < 2000) return 2000;
  if (credits < 5000) return 5000;
  return null;
});

const getLevelColor = (level) => {
  switch(level) {
    case 'Bronze': return 'text-orange-600 bg-orange-50 border-orange-100';
    case 'Silver': return 'text-slate-500 bg-slate-50 border-slate-100';
    case 'Gold': return 'text-amber-500 bg-amber-50 border-amber-100';
    case 'Platinum': return 'text-primary bg-primary/5 border-primary/10';
    default: return 'text-slate-400 bg-slate-50 border-slate-100';
  }
}

const logout = async () => {
    await authStore.logout();
    router.push('/login');
}
</script>
