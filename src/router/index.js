import { createRouter, createWebHistory } from 'vue-router'
import { useCountriesStore } from '@/stores/countries'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'World',
      component: () => import('../views/World.vue')
    },
    {
      path: '/details/:cca3',
      name: 'CountryDetail',
      props: true,
      component: () => import('../views/CountryDetail.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/PageNotFound.vue')
    },
    {
      path: '/home',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const countriesStore = useCountriesStore()
  if (to.name === 'CountryDetail') {
    if (!countriesStore.hasCountries) {
      return router.push('/');
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
