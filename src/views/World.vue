<template>
  <section class="container world-view">
    <div class="filter-options">
      <input-text class="filter-options__search" :clearable="true" :hint="'Search for a country...'" @change-value="setNameValue">
        <template #icon>
          <icon-search></icon-search>
        </template>
      </input-text>
      <input-select class="filter-options__select" @change-value="setRegionValue" :selected-value="regionItems[0]" :items="regionItems" ref="regionSelectInput"></input-select>
      <icon-refresh class="button button--icon filter-options__refresh elevation-3" @click="getCountriesItems">Obtener regiones</icon-refresh>
    </div>
    <div class="countries-gallery">
        <TransitionGroup name="list-transition" tag="ul" class="countries-gallery__list">
            <li class="countries-gallery__item" v-for="(item, index) in filteredCountries.splice(0, 10)" :key="index">
                <country-card @click="showItemDetails(item)" :data="item" :dense="true"></country-card>
            </li>
        </TransitionGroup>
      <div class="no-data" v-if="filteredCountries.length === 0 && !countriesStore.loadingData" :class="{ 'no-data--show' : filteredCountries.length === 0 }">
        <icon-alert class="no-data__icon"></icon-alert>
        <span class="no-data__text">No data found</span>
      </div>
      <spinner v-if="countriesStore.loadingData"></spinner>
      <error-connection v-if="countriesStore.errorConnection"></error-connection>
    </div>
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { computed, onBeforeMount, ref } from 'vue'
import { useCountriesStore } from '@/stores/countries'
import InputSelect from '@/components/InputSelect.vue'
import InputText from '@/components/InputText.vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconAlert from '@/components/icons/IconAlert.vue'
import IconRefresh from '@/components/icons/IconRefresh.vue'
import Spinner from '@/components/common/Spinner.vue'
import CountryCard from '@/components/CountryCard.vue'
import ErrorConnection from '@/components/ErrorConnection.vue'

const countriesStore = useCountriesStore();
const filteredName = ref('');
const selectedRegion = ref('all');
const router = useRouter();

const setRegionValue = (value) => {
  if (value === 'All regions') {
    selectedRegion.value = 'all';
  } else {
    selectedRegion.value = value;
  }
}

const getCountriesItems = async () =>{
  if (countriesStore.loadingData) {
    return;
  }
  try {
    await countriesStore.getCountries();
    countriesStore.errorConnection = false;
  } catch(error) {
    countriesStore.errorConnection = true;
  }
}

const setNameValue = (value) => {
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

const showItemDetails = (item) => {
  router.push({ 
    name: 'CountryDetail',
    params: {
      cca3: item.cca3
    }
    })
};

const filteredCountries = computed(() => {
  let data = countriesStore.countries.slice().sort((a, b) => {
    if(a.name.common < b.name.common) return -1;
    if(a.name.common > b.name.common) return 1;
    return 0;
  });
  let countryName = filteredName.value || '';
  let region = selectedRegion.value || 'all';
    if (!countryName && !region || !countryName && region === 'all') {
      return data;
    } else if (countryName && !region) {
      return data.filter(c => c.name.common.toLowerCase().trim().includes(countryName.toLowerCase().trim()));
    } else if (!countryName && region) {
      return data.filter(c => c.region.toLowerCase().trim().includes(region.toLowerCase().trim()));
    } else if (countryName && region === 'all') {
      return data.filter(c => c.name.common.toLowerCase().trim().includes(countryName.toLowerCase().trim()));
    } else {
      return data.filter(c => c.name.common.toLowerCase().trim().includes(countryName.toLowerCase().trim()) && c.region.toLowerCase().trim().includes(region.toLowerCase().trim()));
    }
});

onBeforeMount(() => {
  if (!countriesStore.hasCountries) getCountriesItems();
})
</script>

<style lang="scss">
.world-view {
  padding: 1rem 0;
}
.filter-options {
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  position: sticky;
  top: 60px;
  z-index: 95;
  background-color: var(--main-bg-color);
  padding: 1rem;
  box-sizing: border-box;
  transition: var(--fade-transition);
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
}

.countries-gallery {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 390px;
  position: relative;
  box-sizing: border-box;
  &__list {
    padding: 1rem;
    box-sizing: border-box;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 300px));
    justify-content: center;
    gap: 4rem;
    transition: opacity .2s ease-out;
    @media screen and (min-width: 768px) {
      width: 100%;
    }
    &--hide {
      opacity: 0;
    }
    &--show {
      opacity: 1;
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
  position: absolute;
  &__icon {
    opacity: 0.5;
    width: 128px;
    height: 128px;
  }
  &--show {
    animation: fade-in-show 0.2s ease-in-out;
  }
}
</style>