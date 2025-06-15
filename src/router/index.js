import { createRouter, createWebHashHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/violations'
    },
    {
      path: '/violations',
      name: 'violations',
      component: () => import('@/views/AccessibilityViolations.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/PluginSettings.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutPlugin.vue')
    },
    {
      path: '/:catchAll(.*)*',
      name: '404',
      redirect: '/'
    }
  ]
});
