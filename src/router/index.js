import { createRouter, createWebHashHistory } from 'vue-router';

import AboutPlugin from '@/views/AboutPlugin.vue';
import AccessibilityViolations from '@/views/AccessibilityViolations.vue';

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
      component: AccessibilityViolations
    },
    {
      path: '/about',
      name: 'about',
      component: AboutPlugin
    },
    {
      path: '/:catchAll(.*)*',
      name: '404',
      redirect: '/'
    }
  ]
});
