import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/LandingPage.vue')
  },
  {
    path: '/contact',
    component: () => import('../views/ContactUs.vue')
  },
  {
    path: '/experience',
    name: 'Experience',
    component: () => import('../views/Experience.vue')
  },
  {
    path: '/login',
    component: () => import('../views/auth/Login.vue')
  },
  {
    path: '/signup',
    component: () => import('../views/auth/SignUp.vue')
  },
  // Customer Module Routes (flat)
  { path: '/customer/home', component: () => import('../views/customer/Dashboard.vue'), alias: '/customer/dashboard' },
  { path: '/customer/search', component: () => import('../views/customer/SearchDiscovery.vue') },
  { path: '/customer/restaurant/:id', component: () => import('../views/customer/RestaurantMenu.vue') },
  { path: '/customer/restaurant-menu', component: () => import('../views/customer/RestaurantMenu.vue') },
  { path: '/customer/checkout', component: () => import('../views/customer/CartCheckout.vue'), alias: '/customer/cart-checkout' },
  { path: '/customer/tracking/:id', component: () => import('../views/customer/LiveTracking.vue') },
  { path: '/customer/live-tracking', component: () => import('../views/customer/LiveTracking.vue') }, 
  { path: '/customer/orders', component: () => import('../views/customer/OrderHistory.vue'), alias: '/customer/order-history' },
  { path: '/customer/wallet', component: () => import('../views/customer/Wallet.vue') },
  { path: '/customer/profile', component: () => import('../views/customer/Profile.vue') },

  // Restaurant Partner Module Routes (flat)
  { path: '/restaurant/dashboard', component: () => import('../views/restaurant/Dashboard.vue') },
  { path: '/restaurant/orders', component: () => import('../views/restaurant/Orders.vue') },
  { path: '/restaurant/menu', component: () => import('../views/restaurant/MenuManagement.vue'), alias: '/restaurant/menu-management' },
  { path: '/restaurant/analytics', component: () => import('../views/restaurant/Analytics.vue'), alias: '/restaurant/earnings' },
  { path: '/restaurant/profile', component: () => import('../views/restaurant/Profile.vue') },

  // Rider Module Routes (flat)
  { path: '/rider/dashboard', component: () => import('../views/rider/Dashboard.vue') },
  { path: '/rider/task', component: () => import('../views/rider/DeliveryTask.vue') },
  { path: '/rider/earnings', component: () => import('../views/rider/EarningsDetails.vue') },
  { path: '/rider/profile', component: () => import('../views/rider/Profile.vue') },

  // Admin Module Routes (flat)
  { path: '/admin/dashboard', component: () => import('../views/admin/Dashboard.vue') },
  { path: '/admin/users', component: () => import('../views/admin/UserManagement.vue') },
  { path: '/admin/merchants', component: () => import('../views/admin/MerchantOnboarding.vue') },
  { path: '/admin/settings', component: () => import('../views/admin/Settings.vue') }
];

import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Role-based Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  // Initialize auth state if not already done
  if (!authStore.user && !authStore.loading) {
    await authStore.initialize();
  }

  const isAuthenticated = authStore.isAuthenticated;
  const userRole = authStore.userRole;

  // Protect Dashboard routes
  if (to.path.startsWith('/admin') && userRole !== 'admin') {
    return next('/login');
  }
  if (to.path.startsWith('/restaurant') && userRole !== 'restaurant') {
    return next('/login');
  }
  if (to.path.startsWith('/rider') && userRole !== 'rider') {
    return next('/login');
  }
  if (to.path.startsWith('/customer') && !isAuthenticated) {
    return next('/login');
  }

  // Redirect if already logged in
  if ((to.path === '/login' || to.path === '/signup') && isAuthenticated) {
    if (userRole === 'admin') return next('/admin/dashboard');
    if (userRole === 'restaurant') return next('/restaurant/dashboard');
    if (userRole === 'rider') return next('/rider/dashboard');
    return next('/customer/dashboard');
  }

  next();
});

export default router;
