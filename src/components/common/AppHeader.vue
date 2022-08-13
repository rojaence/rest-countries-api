<template>
  <header class="app-header">
      <h1 class="app-header__title">Where in the world?</h1>
      <button class="button transparent rounded" @click="setAppTheme()">
        <icon-theme :class="{ 'icon--outlined': !indexStore.darkMode }"></icon-theme>
        <span class="button__text">Dark Mode</span>
      </button>
  </header>
</template>

<script setup>
import { useIndexStore } from '@/stores/index'
import IconTheme from '@/components/icons/IconTheme.vue'
import ThemeProvider from '@/services/ThemeProvider'

const indexStore = useIndexStore();
const themeProvider = new ThemeProvider();

const setAppTheme = () => {
  if (themeProvider.setDarkMode() === false) {
    indexStore.setDarkMode(false);
  } else {
    indexStore.setDarkMode(true);
  }
}
</script>

<style lang="scss">
.app-header {
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: space-between;
  position: sticky;
  background-color: var(--primary-bg-color);
  top: 0;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  transition: var(--fade-transition);
  z-index: 100;
  height: 30px;
  &__title {
    margin: 0;
    font-size: 1rem;
    font-weight: 800;
    color: var(--main-txt-color);
  }
  @media screen and (min-width: 768px) {
    padding: 1rem 3rem;
    &__title {
      font-size: 1.2rem;
    }
  }
}
</style>