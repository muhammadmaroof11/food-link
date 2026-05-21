<template>
  <div class="min-h-screen bg-white font-plus-jakarta antialiased selection:bg-primary/10 overflow-x-hidden relative">
    
    <Navbar />

    <!-- Hero Section -->
    <section class="min-h-[80vh] relative overflow-hidden flex items-center pt-24 pb-20 sm:pt-40 sm:pb-32 bg-white">
       <!-- Abstract Bg -->
       <div class="absolute inset-0 z-0 pointer-events-none">
          <div class="absolute right-0 top-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-32 -mt-32"></div>
       </div>

       <div class="container mx-auto px-6 sm:px-12 relative z-10">
          <div class="max-w-4xl space-y-8 sm:space-y-10">
             <div class="inline-flex items-center gap-3 px-4 py-2 bg-primary/5 rounded-full border border-primary/10">
                <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span class="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Careers @ FoodLink</span>
             </div>
             <h1 class="text-[clamp(3.5rem,10vw,8rem)] font-black text-slate-900 tracking-[-0.05em] leading-[0.85] uppercase">
                We Value <br/><span class="text-primary italic tracking-[-0.07em]">Our Team.</span>
             </h1>
             <p class="text-xl sm:text-2xl text-slate-500 font-bold max-w-2xl leading-relaxed">
                At FoodLink, our team is our most valuable asset. We are building the future of gourmet logistics, and we want you to be a part of it.
             </p>
          </div>
       </div>
    </section>

    <!-- Culture Section -->
    <section class="py-20 sm:py-40 bg-white">
       <div class="container mx-auto px-6 sm:px-12">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
             <div class="space-y-12">
                <div class="space-y-4">
                   <h2 class="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter uppercase italic">Why Join <br/> The Mission?</h2>
                   <p class="text-lg text-slate-400 font-bold leading-relaxed max-w-lg">
                      We foster an environment of innovation, creativity, and mutual respect. We believe that a happy team delivers the best flavors.
                   </p>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                   <div v-for="benefit in benefits" :key="benefit.title" class="space-y-3">
                      <div class="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-primary">
                         <i :class="['fas', benefit.icon]"></i>
                      </div>
                      <h4 class="font-black text-slate-900 uppercase text-xs tracking-widest">{{ benefit.title }}</h4>
                      <p class="text-slate-400 font-bold text-xs leading-relaxed">{{ benefit.desc }}</p>
                   </div>
                </div>
             </div>
             <div class="relative">
                <img :src="getCategoryPlaceholder('Careers')" class="rounded-[3rem] shadow-2xl" />
                <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
             </div>
          </div>
       </div>
    </section>

    <!-- Open Positions -->
    <section class="py-20 sm:py-40 bg-slate-50">
       <div class="container mx-auto px-6 sm:px-12">
          <div class="max-w-2xl mb-16 sm:mb-24 space-y-4">
             <span class="text-[9px] font-black uppercase tracking-[0.5em] text-primary">Join Us</span>
             <h3 class="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter uppercase italic">Open <br/>Positions.</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div v-for="job in jobs" :key="job.title" class="group bg-white p-8 sm:p-12 rounded-[2.5rem] border border-slate-100 hover:border-primary/20 hover:shadow-2xl transition-all flex flex-col justify-between">
                <div class="space-y-6">
                   <div class="flex items-center justify-between">
                      <span class="px-4 py-1.5 bg-slate-50 rounded-full text-[8px] font-black uppercase tracking-widest text-slate-400">{{ job.department }}</span>
                      <span class="text-[10px] font-bold text-primary">{{ job.type }}</span>
                   </div>
                   <h4 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none group-hover:text-primary transition-colors">{{ job.title }}</h4>
                   <p class="text-slate-400 font-bold text-sm leading-relaxed">{{ job.desc }}</p>
                </div>
                <div class="pt-10 flex items-center justify-between">
                   <div class="flex items-center gap-2 text-slate-300">
                      <i class="fas fa-location-dot text-xs"></i>
                      <span class="text-[10px] font-black uppercase tracking-widest">{{ job.location }}</span>
                   </div>
                   <button class="w-12 h-12 rounded-xl bg-slate-900 text-white group-hover:bg-primary transition-all flex items-center justify-center">
                      <i class="fas fa-arrow-right text-xs"></i>
                   </button>
                </div>
             </div>
          </div>
       </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 border-t border-slate-100 text-center">
       <p class="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">FoodLink Talent Acquisition Protocol © 2023</p>
    </footer>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { getCategoryPlaceholder } from '@/utils/placeholders';
import Navbar from '@/components/common/Navbar.vue';

const benefits = [
  { title: 'Global Remote', icon: 'fa-globe', desc: 'Work from anywhere in the world with our remote-first policy.' },
  { title: 'Equity Options', icon: 'fa-chart-pie', desc: 'Own a piece of the future with our comprehensive equity plan.' },
  { title: 'Health & Wellness', icon: 'fa-heart-pulse', desc: 'Premium health insurance and wellness stipends for you and your family.' },
  { title: 'Learning Budget', icon: 'fa-graduation-cap', desc: 'Annual budget for courses, conferences, and books.' }
];

const jobs = [
  { 
    title: 'Senior IT Manager', 
    department: 'Technology', 
    type: 'Full-time', 
    location: 'Dubai / Remote',
    desc: 'Lead our infrastructure scaling and ensure the high-fidelity uptime of our gourmet network.'
  },
  { 
    title: 'Gourmet Content Writer', 
    department: 'Marketing', 
    type: 'Contract', 
    location: 'Remote',
    desc: 'Craft the narrative of our artisan flavors and engage our global community of foodies.'
  },
  { 
    title: 'Logistics Protocol Engineer', 
    department: 'Operations', 
    type: 'Full-time', 
    location: 'Singapore',
    desc: 'Optimize our smart routing algorithms to ensure peak flavor performance and delivery speed.'
  },
  { 
    title: 'Customer Success Lead', 
    department: 'Support', 
    type: 'Full-time', 
    location: 'Remote',
    desc: 'Manage our high-fidelity support module and ensure every diner signal is perfectly received.'
  }
];
</script>
