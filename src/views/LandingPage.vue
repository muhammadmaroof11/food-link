<template>
  <div class="min-h-screen bg-white font-plus-jakarta antialiased selection:bg-primary/10 overflow-x-hidden relative">
    
    <!-- Floating Luxury Header -->
    <header class="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-12 py-3 sm:py-5">
       <nav class="max-w-[1400px] mx-auto bg-white/70 backdrop-blur-3xl rounded-2xl sm:rounded-[2rem] border border-white/40 px-5 sm:px-8 py-2.5 sm:py-3 flex items-center justify-between shadow-[0_20px_50px_-15px_rgba(0,0,0,0.08)]">
          <div class="flex items-center gap-3 cursor-pointer shrink-0" @click="scrollToTop">
             <img src="@/assets/branding/logo.png" class="w-10 h-10 object-contain" alt="FoodLink Logo" />
             <span class="text-base sm:text-lg font-black tracking-tighter text-slate-900 uppercase">FoodLink</span>
          </div>

          <!-- Desktop Links -->
          <div class="hidden lg:flex items-center gap-8 xl:gap-12">
             <a href="#about" class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">About</a>
             <router-link to="/experience" class="text-[9px] font-black uppercase tracking-widest text-primary hover:scale-110 transition-transform">Experience</router-link>
             <a href="#portals" class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Portals</a>
             <a href="#" class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Careers</a>
             <router-link to="/contact" class="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-primary transition-colors">Contact Us</router-link>
          </div>

          <div class="flex items-center gap-3">
             <button @click="router.push('/customer/dashboard')" class="bg-slate-900 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all active:scale-95 shadow-xl shrink-0">
                Launch App
             </button>
             <button class="lg:hidden w-8 h-8 flex items-center justify-center text-slate-900">
                <i class="fas fa-bars-staggered text-sm"></i>
             </button>
          </div>
       </nav>
    </header>

    <!-- Hero Section -->
    <section class="min-h-screen relative overflow-hidden flex items-center pt-24 pb-12 sm:pt-32">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0 pointer-events-none">
        <img src="@/assets/branding/landing_hero.png" alt="Gourmet Food" class="w-full h-full object-cover scale-105 animate-slow-zoom opacity-90" />
        <div class="absolute inset-0 bg-gradient-to-r from-white via-white/70 to-transparent"></div>
        <div class="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div class="container mx-auto px-6 sm:px-12 relative z-10">
        <div class="max-w-[90rem] mx-auto">
          <div class="max-w-4xl space-y-8 sm:space-y-10">
            <div class="space-y-4">
               <div class="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-lg border border-primary/10">
                  <span class="w-1 h-1 rounded-full bg-primary animate-pulse"></span>
                  <span class="text-[8px] font-black uppercase tracking-[0.3em] text-primary">Live Network Active</span>
               </div>
               <h2 class="text-[clamp(3rem,10vw,8rem)] font-black text-slate-900 tracking-[-0.05em] leading-[0.85] sm:leading-[0.8]">
                 Gourmet <br/>
                 <span class="text-primary tracking-[-0.07em]">Network.</span>
               </h2>
            </div>

            <p class="text-lg sm:text-xl text-slate-500 font-bold max-w-xl leading-relaxed">
              Delivering artisan flavors directly to your doorstep. Premium food delivery for the modern palate.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 pt-4">
               <button @click="router.push('/customer/dashboard')" class="px-8 sm:px-10 py-4 sm:py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[9px] sm:text-[10px] shadow-2xl shadow-primary/30 hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-4 group">
                  Order Now
                  <i class="fas fa-arrow-right group-hover:translate-x-2 transition-transform"></i>
               </button>
               <button @click="scrollToAbout" class="px-8 sm:px-10 py-4 sm:py-5 bg-white text-slate-900 border-2 border-slate-900 rounded-2xl font-black uppercase tracking-widest text-[9px] sm:text-[10px] hover:bg-slate-900 hover:text-white transition-all active:scale-95 shadow-xl">
                  Learn More
               </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Ribbon -->
    <div class="bg-slate-900 py-8 sm:py-12 relative overflow-hidden">
       <div class="max-w-[1400px] mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-white relative z-10">
          <div v-for="stat in stats" :key="stat.label" class="flex flex-col group items-center lg:items-start">
             <span class="text-primary text-[8px] font-black uppercase tracking-[0.4em] mb-2 opacity-50">{{ stat.label }}</span>
             <span class="text-2xl sm:text-4xl font-black tracking-tighter group-hover:text-primary transition-colors duration-500">{{ stat.value }}</span>
          </div>
       </div>
    </div>

    <!-- About Section -->
    <section id="about" class="py-20 sm:py-40 relative bg-white overflow-hidden">
       <div class="container mx-auto px-6 sm:px-12">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
             <div class="relative order-2 lg:order-1">
                <div class="aspect-square rounded-[2.5rem] sm:rounded-[4rem] bg-slate-100 overflow-hidden shadow-2xl relative z-10 group border-8 border-white">
                   <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-1000" />
                </div>
                <div class="absolute -left-12 -bottom-12 w-48 h-48 bg-primary/5 rounded-full blur-[80px] -z-0"></div>
             </div>
             
             <div class="space-y-8 order-1 lg:order-2">
                <div class="space-y-3">
                   <span class="text-[9px] font-black uppercase tracking-[0.5em] text-primary">Excellence</span>
                   <h3 class="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-none">Beyond <br/> Satisfaction.</h3>
                </div>
                <p class="text-base sm:text-lg text-slate-400 font-bold leading-relaxed max-w-lg">
                   We don't just deliver food; we deliver gourmet experiences. Our network is a premium network of high-caliber chefs and reliable delivery.
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                   <div v-for="feature in features" :key="feature.title" class="space-y-2 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-2xl transition-all group group cursor-default">
                      <div class="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                         <i :class="['fas', feature.icon, 'text-xs']"></i>
                      </div>
                      <h4 class="font-black text-slate-900 uppercase text-[9px] tracking-widest">{{ feature.title }}</h4>
                      <p class="text-[10px] text-slate-400 font-bold leading-relaxed">{{ feature.desc }}</p>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>

    <!-- Portal Section - REFINED Support CARDS -->
    <section id="portals" class="py-20 sm:py-40 bg-slate-950 relative overflow-hidden">
       <div class="container mx-auto px-6 sm:px-12 relative z-10 text-center">
          <div class="max-w-2xl mx-auto mb-16 sm:mb-24 space-y-4">
             <span class="text-[9px] font-black uppercase tracking-[0.6em] text-primary">Get Started</span>
             <h3 class="text-3xl sm:text-6xl font-black text-white tracking-tighter">Choose Portal</h3>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-10 max-w-[1200px] mx-auto font-plus-jakarta">
             <!-- Portal Cards -->
             <div v-for="portal in portals" :key="portal.name" 
               @click="router.push(portal.path)" 
               :class="['group p-8 sm:p-12 rounded-[2.5rem] sm:rounded-[3.5rem] shadow-2xl transition-all duration-700 cursor-pointer text-left flex flex-col justify-between h-[380px] sm:h-[480px] relative overflow-hidden', 
                portal.dark ? 'bg-slate-900 text-white' : 'bg-white text-slate-900 border border-white/10']">
                
                <div class="absolute -right-20 -top-20 w-48 h-48 rounded-full blur-[80px] transition-transform duration-[2000ms] group-hover:scale-150" :class="portal.accent"></div>
                
                <div class="relative z-10 group-hover:-translate-y-2 transition-transform duration-500">
                   <div :class="['w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-xl sm:text-2xl mb-8 sm:mb-10 transition-all shadow-lg', portal.iconClass]">
                      <i :class="['fas', portal.icon]"></i>
                   </div>
                   <h4 :class="['text-2xl sm:text-3xl font-black tracking-tighter mb-3 sm:mb-4 uppercase', portal.name === 'Merchant' ? 'text-white' : 'text-black']">{{ portal.name }}</h4>
                   <p class="font-bold text-sm sm:text-base leading-relaxed opacity-50">{{ portal.desc }}</p>
                </div>
                
                <div :class="['flex items-center justify-between pt-8 border-t relative z-10', portal.dark ? 'border-white/10' : 'border-slate-50']">
                   <span class="text-[9px] font-black uppercase tracking-[0.4em]" :class="portal.textAccent">Enter Portal</span>
                   <div :class="['w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all shadow-md', portal.btnClass]">
                      <i class="fas fa-arrow-right text-xs"></i>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>

    <!-- Mega Footer -->
    <footer class="bg-white pt-20 sm:pt-40 pb-10 border-t border-slate-100">
       <div class="container mx-auto px-6 sm:px-12">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 sm:gap-16 mb-24 sm:mb-32">
             <div class="lg:col-span-2 space-y-8">
                <div class="flex items-center gap-3">
                   <img src="@/assets/branding/logo.png" class="w-10 h-10 object-contain" />
                   <span class="text-xl font-black tracking-tighter text-slate-900 uppercase">FoodLink</span>
                </div>
                <p class="text-slate-400 font-bold text-base leading-relaxed max-w-sm">
                   Precision food delivery protocols for a high-fidelity culinary ecosystem. Redefining how the world connects with artisan flavor.
                </p>
                <div class="flex gap-4">
                   <div v-for="i in 4" :key="i" class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 hover:bg-primary hover:text-white transition-all cursor-pointer shadow-sm">
                      <i :class="['fab', ['fa-twitter', 'fa-instagram', 'fa-linkedin-in', 'fa-github'][i-1], 'text-base']"></i>
                   </div>
                </div>
             </div>

             <div v-for="col in footerLinks" :key="col.title" class="space-y-6">
                <h5 class="text-[9px] font-black uppercase tracking-[0.4em] text-slate-900">{{ col.title }}</h5>
                <ul class="space-y-3">
                   <li v-for="link in col.links" :key="link" class="text-slate-400 font-bold text-[13px] hover:text-primary transition-colors cursor-pointer block">
                      {{ link }}
                   </li>
                </ul>
             </div>
          </div>

          <div class="pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-6">
             <p class="text-[9px] font-bold text-slate-300 uppercase tracking-[0.5em]">Systems Synced © 2023. FoodLink Platform.</p>
             <div class="flex flex-wrap justify-center gap-8">
                <span v-for="legal in ['Privacy', 'Terms', 'Legal']" :key="legal" class="text-[8px] font-black text-slate-400 uppercase tracking-widest hover:text-primary cursor-pointer transition-colors">
                   {{ legal }}
                </span>
             </div>
          </div>
       </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const scrollToAbout = () => {
  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
};

const stats = [
  { label: 'Total Deliveries', value: '1.2M+' },
  { label: 'Restaurants', value: '14,000+' },
  { label: 'On-Time Rate', value: '99.9%' },
  { label: 'Active Users', value: '45k+' }
];

const features = [
  { title: 'Smart Routing', icon: 'fa-route', desc: 'AI-driven pathways for food freshness.' },
  { title: 'Top Rated', icon: 'fa-award', desc: 'Hand-selected and quality verified.' },
  { title: 'Secure Payment', icon: 'fa-shield-halved', desc: 'Bank-grade transaction security.' },
  { title: 'Live Tracking', icon: 'fa-satellite', desc: 'Precision tracking in real-time.' }
];

const portals = [
  { 
    name: 'Diner Hub', 
    path: '/customer/dashboard', 
    icon: 'fa-burger', 
    desc: 'Precision orders from artisan kitchens.',
    accent: 'bg-primary/10',
    iconClass: 'bg-slate-50 text-slate-900 group-hover:bg-primary group-hover:text-white',
    textAccent: 'text-primary',
    btnClass: 'bg-slate-50 text-slate-300 group-hover:bg-primary group-hover:text-white',
    dark: false
  },
  { 
    name: 'Merchant', 
    path: '/restaurant/dashboard', 
    icon: 'fa-store', 
    desc: 'Universal kitchen control. Scale gourmet globally.',
    accent: 'bg-white/20',
    iconClass: 'bg-white/10 text-white',
    textAccent: 'text-white',
    btnClass: 'bg-white/10 text-white group-hover:bg-white group-hover:text-primary',
    dark: true 
  },
  { 
    name: 'Command', 
    path: '/admin/dashboard', 
    icon: 'fa-shield-halved', 
    desc: 'Global ecosystem governance and monitoring.',
    accent: 'bg-emerald-500/10',
    iconClass: 'bg-slate-50 text-slate-900 group-hover:bg-emerald-500 group-hover:text-white',
    textAccent: 'text-emerald-500',
    btnClass: 'bg-slate-50 text-slate-300 group-hover:bg-emerald-500 group-hover:text-white',
    dark: false
  }
];

const footerLinks = [
  { title: 'Our Story', links: ['Our Standards', 'Top Quality', 'Fleet Academy', 'Partner with Us'] },
  { title: 'Excellence', links: ['Careers Hub', 'Innovation', 'Latest News', 'Investor Relations'] },
  { title: 'Support', links: ['Customer Desk', 'Merchant Support', 'System Status', 'Safety Gear'] }
];
</script>

<style scoped>
@keyframes slow-zoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}
.animate-slow-zoom {
  animation: slow-zoom 20s linear infinite alternate;
}
</style>
