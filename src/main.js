import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic (Commented out to prevent layout locks) */
/* import '@ionic/vue/css/normalize.css'; */
/* import '@ionic/vue/css/structure.css'; */
/* import '@ionic/vue/css/typography.css'; */

/* Optional CSS utils */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode (Disabled for Light-First Aesthetic)
 */

/* import '@ionic/vue/css/palettes/dark.always.css'; */
/* import '@ionic/vue/css/palettes/dark.class.css'; */
/* import '@ionic/vue/css/palettes/dark.system.css'; */

/* Theme variables */
import './theme/variables.css';

/* Font Awesome Free */
import '@fortawesome/fontawesome-free/css/all.css';

import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)
  .use(pinia)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
});
