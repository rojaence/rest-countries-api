<script>
import { RouterLink, RouterView } from 'vue-router'
import { useIndexStore } from '@/stores/index'
import AppHeader from './components/common/AppHeader.vue'
import AppFooter from './components/common/AppFooter.vue'
import ThemeProvider from '@/services/ThemeProvider'

export default {
  name: 'App',
  setup() {
    const indexStore = useIndexStore();
    const themeProvider = new ThemeProvider();
    return { indexStore, themeProvider }
  },
  components: {
    RouterLink,
    RouterView,
    'app-header': AppHeader,
    'app-footer': AppFooter,
  },
  beforeMount() {
    if (this.themeProvider.setThemeOnInit() === false) {
      this.indexStore.setDarkMode(false);
    } else {
      this.indexStore.setDarkMode(true);
    }
  },
}
</script>

<template>
  <app-header></app-header>
  <main class="main">
    <router-view v-slot="{ Component }">
      <transition name="fade-transition" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
  <app-footer></app-footer>
</template>
