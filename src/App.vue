<script>
import { RouterLink, RouterView } from 'vue-router'
import { useIndexStore } from '@/stores/index'
import AppHeader from './components/common/AppHeader.vue'
import AppFooter from './components/common/AppFooter.vue'

export default {
  name: 'App',
  setup() {
    const indexStore = useIndexStore();
    return { indexStore }
  },
  components: {
    RouterLink,
    RouterView,
    'app-header': AppHeader,
    'app-footer': AppFooter,
  },
  methods: {
    selectThemeOnInit() {
      if (localStorage.getItem("RestCountriesApiDarkMode")) {
        let value = localStorage.getItem("RestCountriesApiDarkMode");
        if (value === "true") {
          this.selectDarkMode(true);
          this.indexStore.setDarkMode(true);
        } else {
          this.selectDarkMode(false);
          this.indexStore.setDarkMode(false);
        }
      } else {
        this.selectDarkMode(false);
        this.indexStore.setDarkMode(false);
      }
    },
    selectDarkMode(value) {
      value ? 
      document.documentElement.classList.add("theme--dark")
      : 
      document.documentElement.classList.remove("theme--dark")
    },
  },
  beforeMount() {
    document.documentElement.classList.add("theme")
    this.selectThemeOnInit();
  },
}

</script>

<template>
  <app-header></app-header>
  <main class="main">
    <RouterView />
  </main>
  <app-footer></app-footer>
</template>
