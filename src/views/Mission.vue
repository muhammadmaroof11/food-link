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
                <span class="text-[10px] font-black uppercase tracking-[0.4em] text-primary">Our Core Values</span>
             </div>
             <h1 class="text-[clamp(3.5rem,10vw,8rem)] font-black text-slate-900 tracking-[-0.05em] leading-[0.85] uppercase">
                Connecting <br/>
                <span class="text-primary tracking-[-0.07em] italic">The World.</span>
             </h1>
             <p class="text-xl sm:text-2xl text-slate-500 font-bold max-w-2xl leading-relaxed">
                Our mission is to redefine the global culinary ecosystem through precision delivery, uncompromising quality, and a commitment to health.
             </p>
          </div>
       </div>
    </section>

    <!-- Purity & Health Section -->
    <section class="py-20 sm:py-40 bg-white">
       <div class="container mx-auto px-6 sm:px-12">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
             <div class="space-y-12">
                <div class="space-y-4">
                   <h2 class="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter uppercase italic">The Purity <br/>Protocol.</h2>
                   <p class="text-lg text-slate-400 font-bold leading-relaxed max-w-lg">
                      Hygiene and health are the cornerstones of our operations. We maintain medical-grade standards across our entire supply chain.
                   </p>
                </div>
                <div class="space-y-8">
                   <div v-for="standard in standards" :key="standard.title" class="flex gap-6 group">
                      <div class="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                         <i :class="['fas', standard.icon, 'text-xl']"></i>
                      </div>
                      <div class="space-y-1">
                         <h4 class="font-black text-slate-900 uppercase text-sm tracking-widest">{{ standard.title }}</h4>
                         <p class="text-slate-400 font-bold text-sm leading-relaxed max-w-md">{{ standard.desc }}</p>
                      </div>
                   </div>
                </div>
             </div>
             <div class="relative">
                <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800" class="rounded-[3rem] shadow-2xl" />
                <div class="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl -z-10"></div>
             </div>
          </div>
       </div>
    </section>

    <!-- Global Vision Section -->
    <section class="py-20 sm:py-40 bg-slate-900 text-white overflow-hidden relative">
       <div class="container mx-auto px-6 sm:px-12 relative z-10">
          <div class="text-center max-w-3xl mx-auto space-y-8">
             <h3 class="text-5xl sm:text-8xl font-white tracking-tighter leading-none uppercase">Global Impact.</h3>
             <p class="text-lg text-white/50 font-bold leading-relaxed">
                By 2030, we aim to eliminate food waste in our network and provide high-fidelity culinary access to every corner of the globe.
             </p>
             <div class="grid grid-cols-2 gap-8 pt-12">
                <div v-for="stat in stats" :key="stat.label" class="p-8 bg-white/5 rounded-[2.5rem] border border-white/10">
                   <div class="text-primary text-4xl sm:text-6xl font-black mb-2 tracking-tighter">{{ stat.value }}</div>
                   <div class="text-[10px] font-black uppercase tracking-widest opacity-40">{{ stat.label }}</div>
                </div>
             </div>
          </div>
       </div>
    </section>

    <!-- Final Call -->
    <section class="py-20 sm:py-40 bg-white text-center">
       <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto space-y-12">
             <h3 class="text-5xl sm:text-8xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">Join the <br/> Revolution.</h3>
             <div class="flex gap-4 justify-center">
                <button @click="$router.push('/signup')" class="px-12 py-6 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 transition-all">Start Your Journey</button>
             </div>
          </div>
       </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 border-t border-slate-100 text-center">
       <p class="text-[9px] font-black text-slate-300 uppercase tracking-[0.5em]">FoodLink Mission Protocol © 2023</p>
    </footer>

  </div>
</template>

<script setup>
import Navbar from '@/components/common/Navbar.vue';

const standards = [
  { title: 'Aseptic Logistics', icon: 'fa-vial-virus', desc: 'Medical-grade cleanliness protocols in every kitchen and delivery unit.' },
  { title: 'Nutritional Analysis', icon: 'fa-dna', desc: 'Macro-optimized ingredients verified for purity and freshness.' },
  { title: 'Sustainability', icon: 'fa-leaf', desc: '100% compostable packaging and zero-waste logistics by 2025.' }
];

const stats = [
  { label: 'Carbon Reduction', value: '45%' },
  { label: 'Global Cities', value: '250+' }
];
</script>

<style scoped>
/* Custom animations or styles if needed */
</style>
