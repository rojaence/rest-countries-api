<template>
  <section class="container world-view">
    <div class="filter-options">
      <input-text class="filter-options__search" :clearable="true" :hint="'Search for a country...'" @change-value="setNameValue">
        <template #icon>
          <icon-search></icon-search>
        </template>
      </input-text>
      <input-select class="filter-options__select" @change-value="setRegionValue" :selected-value="regionItems[0]" :items="regionItems" ref="regionSelectInput"></input-select>
      <icon-refresh class="button button--icon filter-options__refresh elevation-3" @click="countriesStore.getCountries()">Obtener regiones</icon-refresh>
    </div>
    <div class="countries-gallery">
        <li class="countries-gallery__list fade-transition" v-if="countriesStore.hasCountries && !countriesStore.loadingData" :class=" { 'countries-gallery__list--has-data': countriesStore.hasCountries }">
          <country-card 
            v-for="(item, index) in filteredCountryItems" 
              :key="index"
              :data="item"
              :dense="true"
            >
          </country-card>
        </li>
        <spinner v-if="countriesStore.loadingData"></spinner>
        <div class="no-data" v-if="filteredCountryItems.length === 0 && !countriesStore.loadingData">
          <icon-alert class="no-data__icon"></icon-alert>
          <span class="no-data__text">No data found</span>
        </div>
    </div>
  </section>
</template>

<script>
import { RouterLink } from 'vue-router'
import { computed, onBeforeMount, ref } from 'vue'
import { useCountriesStore } from '@/stores/countries'
import InputSelect from '@/components/InputSelect.vue'
import InputText from '@/components/InputText.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconAlert from '@/components/icons/IconAlert.vue'
import IconRefresh from '@/components/icons/IconRefresh.vue'
import Spinner from '@/components/common/Spinner.vue'
import CountryCard from '@/components/CountryCard.vue'

export default {
  name: 'World',  
  components: {
    'router-link': RouterLink,
    'input-select': InputSelect,
    'icon-search': IconSearch,
    'input-text': InputText,
    'spinner': Spinner,
    'icon-alert': IconAlert,
    'country-card': CountryCard,
    'icon-refresh': IconRefresh
  },
  setup() {
    const countriesStore = useCountriesStore();
    const filteredName = ref('');
    const selectedRegion = ref('all');

    const setRegionValue = (value) => {
      if (value === 'All regions') {
        selectedRegion.value = 'all';
      } else {
        selectedRegion.value = value;
      }
    }

    const setNameValue = async (value) => {
      filteredName.value = value;
    }

    const regionItems = computed(() => {
      let items = [];
      items.push('All regions')
      countriesStore.regions.forEach(region => {
        items.push(region);
      });
      return items;
    })

    const filteredCountryItems = computed(() => {
      let data = countriesStore.filterCountries({ countryName: filteredName.value, region: selectedRegion.value });
      return data;
    })

    onBeforeMount(async () => {
      countriesStore.getCountries()
      .catch(error => {
        console.log(error);
      })
    })

    return { countriesStore, regionItems, filteredName, selectedRegion, setRegionValue, setNameValue, filteredCountryItems }
  }
}
</script>

<style lang="scss">
.filter-options {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, auto);
  grid-template-areas: 
    "search search"
    "select refresh";
  row-gap: 3rem;
  column-gap: 1rem;
  &__search {
    grid-area: search;
  }
  &__select {
    grid-area: select;
  }
  &__refresh {
    grid-area: refresh;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1fr repeat(2, auto);
    grid-template-rows: 1fr;
    grid-template-areas: 
      "search select refresh";
    &__select {
      justify-self: flex-end;
    }
  }
  @media screen and (min-width: 1024px) {
    column-gap: 3rem;
  }
  position: sticky;
  top: 60px;
  z-index: 95;
  background-color: var(--main-bg-color);
  padding: 1rem 0;
}

.countries-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 2rem 0 1rem;
  &__list {
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 4rem;
    &--has-data {
      width: 100%;
    }
    @media screen and (min-width: 768px) {
      width: 100%;
      &--has-data {
        width: 100%;
      }
    }
  }
} 

.no-data {
  font-size: 1.4rem;
  opacity: 0.7;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  &__icon {
    opacity: 0.5;
    width: 128px;
    height: 128px;
  }

}
</style>