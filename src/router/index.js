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
    /* {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    } */
  ]
})

router.beforeEach((to) => {
  const countriesStore = useCountriesStore()
  if (to.name === 'CountryDetail') {
    if (!countriesStore.hasCountries) {
      return router.push('/');
    }
  }
})

export default router
