<template>
<section class="error-404">
  <icon name="alert" color="error" :size="200" class="error-404__icon">
  </icon>
  <h1 class="error-404__title">404</h1>
  <h2>Page not found</h2>
    <router-link :to="{ name: 'World' }" class="button button--link elevation-1">Go to home</router-link>
</section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>
.error-404 {
  padding: 4rem 2rem;
  &__title {
    font-size: 4rem;
    margin: 0;
    font-weight: bold;
  }
  .button {
    font-size: 1.2rem;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>