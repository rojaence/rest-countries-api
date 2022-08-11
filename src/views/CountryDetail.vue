<template>
  <section class="details-view container">
    <div class="header-options">
      <router-link class="button button--small button--link elevation-2" :to="{ name: 'World' }">
        <icon-arrow></icon-arrow>
        <span>Back</span>
      </router-link>
    </div>
    <div class="container country-data">
      <country-card :data="countryData" v-if="countryData" :dense="false"></country-card>
    </div>
  </section>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed } from 'vue'
import { useCountriesStore } from '@/stores/countries'
import CountryCard from '@/components/CountryCard.vue'
import IconArrow from '@/components/icons/IconArrow.vue'

const props = defineProps({
  cca3: {
    type: String,
    default: ''
  },
});

const countriesStore = useCountriesStore();
const route = useRoute();

const countryData = computed(() => {
  if (route.params.cca3) {
    return countriesStore.getCountryData(route.params.cca3);
  } else {
    return null;
  }
})
</script>

<style lang="scss" scoped>
.details-view {
  padding: 1rem;
}

.country-data {
  padding-top: 3rem;
}

.header-options {
  width: 100%;
  position: sticky;
  top: 60px;
  z-index: 95;
  background-color: var(--main-bg-color);
  padding: 1rem;
  box-sizing: border-box;
  transition: var(--fade-transition);
}
</style>