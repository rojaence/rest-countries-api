<template>
  <header class="app-header">
    <h1 class="app-header__title">Where in the world?</h1>
    <button class="button transparent rounded" @click="setAppTheme()">
      <icon-theme :class="{ 'icon--outlined': !indexStore.darkMode }"></icon-theme>
      <span class="button__text">Dark Mode</span>
    </button>
  </header>
</template>

<script>
import { RouterLink } from 'vue-router'
import { useIndexStore } from '@/stores/index'
import IconTheme from '@/components/icons/IconTheme.vue'
import IconEarth from '@/components/icons/IconEarth.vue'
import ThemeProvider from '@/services/ThemeProvider'

export default {
  name: 'AppHeader',
  setup() {
    const indexStore = useIndexStore();
    const themeProvider = new ThemeProvider();
    return { indexStore, themeProvider }
  },
  components: {
    RouterLink,
    'icon-theme': IconTheme,
    'icon-earth': IconEarth,
  },
  methods: {
    setAppTheme() {
      if (this.themeProvider.setDarkMode() === false) {
        this.indexStore.setDarkMode(false);
      } else {
        this.indexStore.setDarkMode(true);
      }
    }
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
  &__title {
    margin: 0;
    font-size: 0.8rem;
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