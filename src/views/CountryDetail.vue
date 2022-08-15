<template>
  <section class="details-view">
    <div class="bar-wrapper">
      <div class="header-options">
        <router-link class="button button--small button--link elevation-2" :to="{ name: 'World' }">
          <icon name="arrow"></icon>
          <span>Back</span>
        </router-link>
      </div>
    </div>
    <div class="container country-data" ref="detailsContainer">     
        <country-card :key="countryData.cca3" :data="countryData" :dense="false"></country-card>
    </div>
  </section>
</template>

<script setup>
import { RouterLink, useRoute } from 'vue-router'
import { computed, ref, watch } from 'vue'
import { useCountriesStore } from '@/stores/countries'
import CountryCard from '@/components/CountryCard.vue'

const props = defineProps({
  cca3: {
    type: String,
    default: ''
  },
});

const countriesStore = useCountriesStore();
const route = useRoute();
const detailsContainer = ref(null);

const countryData = computed(() => {
  if (route.params.cca3) {
    return countriesStore.getCountryData(route.params.cca3);
  } else {
    return null;
  }
})

watch(() => props.cca3, (value) => {
  if (value && detailsContainer.value) {
    detailsContainer.value.animate([
      { opacity: 0 },
      { opacity: 1 },
    ], {
      duration: 200,
    })
  }
})
</script>

<style lang="scss" scoped>
.details-view {
  padding-top: 1rem;
}
.country-data, .header-options {
  max-width: 1440px;
  margin: 0 auto;
}

.country-data {
  padding-top: 3rem;
  box-sizing: border-box;
}

.header-options {
  z-index: 95;
  padding: 1rem;
  box-sizing: border-box;
  transition: var(--fade-transition);
}
</style>