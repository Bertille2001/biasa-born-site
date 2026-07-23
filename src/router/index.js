import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/inscription', component: () => import('../views/InscriptionView.vue') },
    { path: '/communaute', component: () => import('../views/CommunauteView.vue') },
    { path: '/entraide', component: () => import('../views/EntraideView.vue') },
    { path: '/contact', component: () => import('../views/ContactView.vue') },
    { path: '/admin', component: () => import('../views/AdminView.vue') },
  ],
  scrollBehavior() { return { top: 0 } }
})

export default router
