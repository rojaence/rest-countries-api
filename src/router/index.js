import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'World',
      component: () => import('../views/World.vue')
    },
    {
      path: '/countrydetail',
      name: 'CountryDetail',
      component: () => import('../views/CountryDetail.vue')
    }
  ]
})

export default router
