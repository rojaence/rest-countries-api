<script setup>
import { RouterView } from 'vue-router'
import { onBeforeMount } from 'vue'
import { useIndexStore } from '@/stores/index'
import AppHeader from './components/common/AppHeader.vue'
import AppFooter from './components/common/AppFooter.vue'
import ThemeProvider from '@/services/ThemeProvider'

const indexStore = useIndexStore();
const themeProvider = new ThemeProvider();

onBeforeMount(() => {
  if (themeProvider.setThemeOnInit() === false) {
    indexStore.setDarkMode(false);
  } else {
    indexStore.setDarkMode(true);
  }
});
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
