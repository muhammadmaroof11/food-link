import { ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';

/**
 * usePhysicsScroll
 * Maps window scroll to a 0-1 range with GSAP-powered spring smoothing.
 */
export function usePhysicsScroll() {
  const scrollProgress = ref(0);
  const smoothProgress = ref(0);

  const update = () => {
    const winScroll = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    
    // Safety check for empty/short pages
    if (height <= 0) {
      scrollProgress.value = 0;
      smoothProgress.value = 0;
      return;
    }

    const scrolled = Math.min(Math.max(winScroll / height, 0), 1);
    scrollProgress.value = scrolled;

    // Apply "Antigravity" Damping:
    // This creates the high-end feel of the 3D parts floating/following the scroll.
    gsap.to(smoothProgress, {
      value: scrolled,
      duration: 1.5, // Long duration for that luxury, fluid feel
      ease: "power3.out", // Natural deceleration
      overwrite: true
    });
  };

  onMounted(() => {
    window.addEventListener('scroll', update);
    // Initial call
    update();
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', update);
  });

  return { 
    scrollProgress, 
    smoothProgress 
  };
}
