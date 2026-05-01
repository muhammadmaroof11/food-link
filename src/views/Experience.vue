<template>
  <div class="min-h-[500vh] bg-slate-950 font-plus-jakarta relative selection:bg-primary/20">
    
    <!-- 3D Cinematic Canvas -->
    <div class="fixed inset-0 z-0 h-screen w-full pointer-events-none">
      <TresCanvas alpha shadows power-preference="high-performance">
        <TresPerspectiveCamera :position="[0, 2, 8]" :fov="45" />
        <TresDirectionalLight :position="[5, 10, 5]" :intensity="3" cast-shadow />
        <TresAmbientLight :intensity="0.5" />
        
        <!-- Mock Exploded Burger (Placeholders for GLB) -->
        <!-- Bun Top -->
        <TresMesh :position="[0, 2 + (smoothProgress * 8), 0]" cast-shadow>
          <TresSphereGeometry :args="[1.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]" />
          <TresMeshStandardMaterial color="#D4A373" :roughness="0.4" />
        </TresMesh>

        <!-- Lettuce -->
        <TresMesh :position="[0, 1 + (smoothProgress * 4), 0]" :rotation="[0, smoothProgress * 2, 0]" cast-shadow>
          <TresCylinderGeometry :args="[1.1, 1.1, 0.1, 32]" />
          <TresMeshStandardMaterial color="#4D7C0F" :roughness="0.8" />
        </TresMesh>

        <!-- Tomato -->
        <TresMesh :position="[0, 0.5 + (smoothProgress * 1), 0]" :rotation="[0, -smoothProgress, 0]" cast-shadow>
          <TresCylinderGeometry :args="[1, 1, 0.1, 32]" />
          <TresMeshStandardMaterial color="#EF4444" :roughness="0.5" />
        </TresMesh>

        <!-- Patty -->
        <TresMesh :position="[0, 0, 0]" cast-shadow>
          <TresCylinderGeometry :args="[1.1, 1.1, 0.4, 32]" />
          <TresMeshStandardMaterial color="#543310" :roughness="1" />
        </TresMesh>

        <!-- Bun Bottom -->
        <TresMesh :position="[0, -1 - (smoothProgress * 2), 0]" cast-shadow>
          <TresCylinderGeometry :args="[1.2, 1.2, 0.3, 32]" />
          <TresMeshStandardMaterial color="#D4A373" :roughness="0.4" />
        </TresMesh>

        <!-- Floor Shadow Catcher -->
        <TresMesh :rotation="[-Math.PI / 2, 0, 0]" :position="[0, -4, 0]" receive-shadow>
          <TresPlaneGeometry :args="[20, 20]" />
          <TresShadowMaterial :opacity="0.2" />
        </TresMesh>
      </TresCanvas>
    </div>

    <!-- Interface & Narrative Overlays -->
    <div class="relative z-10">
      <!-- Section 1: Intro -->
      <section class="h-screen flex items-center px-12 sm:px-24">
        <div class="max-w-4xl space-y-6">
           <span class="text-[10px] font-black uppercase tracking-[0.6em] text-primary">High Fidelity Experience</span>
           <h2 class="text-7xl sm:text-9xl font-black text-white tracking-tighter leading-[0.8] uppercase">The <br/><span class="text-primary">Anatomy.</span></h2>
           <p class="text-slate-400 font-bold text-lg max-w-sm leading-relaxed">Scroll to deconstruct the perfect gourmet formation.</p>
        </div>
      </section>

      <!-- Section 2: Freshness -->
      <section class="h-screen flex items-center justify-end px-12 sm:px-24 text-right">
        <div class="max-w-2xl space-y-6 bg-slate-950/40 backdrop-blur-xl p-12 rounded-[3rem] border border-white/5">
           <h3 class="text-4xl sm:text-6xl font-black text-white tracking-tighter leading-none uppercase">Precision <br/> Sourcing.</h3>
           <p class="text-slate-400 font-bold text-base leading-relaxed">Every layer is a result of calculated sourcing from the region's top organic nodes.</p>
        </div>
      </section>

      <!-- Section 3: Assembly -->
      <section class="h-screen flex items-center px-12 sm:px-24">
        <div class="max-w-2xl space-y-6 bg-slate-950/40 backdrop-blur-xl p-12 rounded-[3rem] border border-white/5">
           <h3 class="text-4xl sm:text-6xl font-black text-white tracking-tighter leading-none uppercase">Seamless <br/> Integration.</h3>
           <p class="text-slate-400 font-bold text-base leading-relaxed">Integrated flavors that synchronize perfectly at terminal velocity.</p>
        </div>
      </section>

      <!-- Section 4: Call to Action -->
      <section class="h-screen flex items-center justify-center text-center px-12 sm:px-24">
        <div class="max-w-4xl space-y-10">
           <h3 class="text-5xl sm:text-8xl font-black text-white tracking-tighter leading-none uppercase">Ready to <br/> Experience?</h3>
           <button @click="$router.push('/customer/dashboard')" class="px-12 py-6 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all">Launch Dashboard</button>
        </div>
      </section>
    </div>

    <!-- Back to Grid Button -->
    <button @click="$router.push('/')" class="fixed top-8 left-8 z-[100] w-12 h-12 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all group">
       <i class="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
    </button>
  </div>
</template>

<script setup>
import { TresCanvas } from '@tresjs/core';
import { usePhysicsScroll } from '@/composables/usePhysicsScroll';

const { smoothProgress } = usePhysicsScroll();
</script>

<style scoped>
/* High-end transitions for content */
section {
  pointer-events: none;
}
section > div {
  pointer-events: auto;
}
</style>
