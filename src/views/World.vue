<template>
  <section class="world-view">
    <div class="bar-wrapper">
      <div class="filter-options">
        <input-text class="filter-options__search" :clearable="true" :hint="'Search for a country...'" :limit="250" @change-value="setNameValue">
          <template #icon>
            <icon name="search"></icon>
          </template>
        </input-text>
        <input-select 
          class="filter-options__select" @change-value="setRegionValue" :selected-value="regionItems[0]" :items="regionItems" ref="regionSelectInput"></input-select>
        <icon name="refresh" class="button button--icon filter-options__refresh elevation-3" @click="getCountriesItems"></icon>
        <div class="control">
          <div class="control__actions">
            <icon name="chevron" class="button button--icon transparent icon--left" :class="{ 'button--disabled': initialIndex === 0 }" @click="prevPage()"></icon>
            <icon name="chevron" class="button button--icon transparent icon--right" :class="{ 'button--disabled': finalIndex >= filteredCountries.length }" @click="nextPage()"></icon>
          </div>
          <span class="control__pagination">{{ pagination }}</span>
        </div>
      </div>
    </div>
    <div class="countries-gallery">
      <transition-group class="countries-gallery__list" ref="countriesList" tag="ul" name="list-transition">
        <li class="countries-gallery__item" v-for="(item, index) in filteredCountries.slice(initialIndex, finalIndex)" :key="index">      
          <country-card @click="showItemDetails(item)" :data="item" :dense="true"></country-card>
        </li>
      </transition-group>
      <div class="no-data" v-if="filteredCountries.length === 0 && !countriesStore.loadingData && !countriesStore.errorConnection" :class="{ 'no-data--show' : filteredCountries.length === 0 }">
        <icon name="alert" class="no-data__icon" :size="128"></icon>
        <span class="no-data__text">No results for "{{ filteredName }}"</span>
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
import Spinner from '@/components/Spinner.vue'
import CountryCard from '@/components/CountryCard.vue'
import ErrorConnection from '@/components/ErrorConnection.vue'

const initialIndex = ref(0);
const maxPageItems = 32;
const finalIndex = ref(0);

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
  if (countriesStore.loadingData) return;
  try {
    await countriesStore.getCountries();
  } catch (error) {
    countriesStore.errorConnection = true;
  } finally {
    countriesStore.loadingData = false;
  }
}

const setNameValue = (value) => {
  filteredName.value = value;
}

const regionItems = computed(() => {
  let items = [];
  items.push('All regions');
  if (countriesStore.regions.length > 0) {
    countriesStore.regions.forEach(region => {
      items.push(region);
    });
  }
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
  resetPagination();
  let data = countriesStore.countries.slice();
  let countryName = filteredName.value || '';
  let region = selectedRegion.value || 'all';
  if (!countryName && !region || !countryName && region === 'all') {
    return data;
  } else if (countryName && !region) {
    return data.filter(c => c.name.common.toLowerCase().trim().includes(countryName.toLowerCase().trim()))
  } else if (!countryName && region) {
    return data.filter(c => c.region.toLowerCase().trim().includes(region.toLowerCase().trim()))
  } else if (countryName && region === 'all') {
    return data.filter(c => c.name.common.toLowerCase().trim().includes(countryName.toLowerCase().trim())
    || ((c.capital && c.capital[0].toLowerCase().trim().includes(countryName.toLowerCase().trim()))));
  } else {
    return data.filter(c => (
    c.name.common.toLowerCase().trim().includes(countryName.toLowerCase().trim()) 
    && c.region.toLowerCase().trim().includes(region.toLowerCase().trim()))
    || 
    ((c.capital && c.capital[0].toLowerCase().trim().includes(countryName.toLowerCase().trim())))
    && c.region.toLowerCase().trim().includes(region.toLowerCase().trim()))
  }
});

const pagination = computed(() => {
  let dataLength = filteredCountries.value.length;
  if (dataLength > 0) {
    if (initialIndex.value === 0) {
      finalIndex.value = dataLength < maxPageItems ? dataLength : maxPageItems;
    }
    if (finalIndex.value > dataLength) return `${initialIndex.value + 1} - ${dataLength} of ${dataLength}`;
    return `${initialIndex.value + 1} - ${finalIndex.value} of ${dataLength}`;
  }
  else return `-`;
});

const prevPage = () => {
  if (initialIndex.value === 0 || filteredCountries.value.length === 0) return;
  initialIndex.value -= maxPageItems;
  finalIndex.value -= maxPageItems;
}

const nextPage = () => {
  let dataLength = filteredCountries.value.length;
  if (dataLength === 0 || finalIndex.value === dataLength) return;
  if (initialIndex.value + maxPageItems < dataLength) {
    initialIndex.value += maxPageItems;
    finalIndex.value += maxPageItems;
  }
}

const resetPagination = () => {
  initialIndex.value = 0;
  finalIndex.value = 0;
}

onBeforeMount(() => {
  if (!countriesStore.hasCountries) getCountriesItems();
})
</script>

<style lang="scss">
.world-view {
  padding-top: 1rem;
}

.filter-options {
  max-width: 1440px;
  margin: 0 auto;
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  padding: 1rem 1rem .5rem;
  box-sizing: border-box;
  transition: var(--fade-transition);
  grid-template-areas: 
    "search search"
    "select refresh"
    "controls controls";
  row-gap: .8rem;
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
    grid-template-areas: 
      "search select refresh"
      "controls controls controls";
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
  max-width: 1440px;
  margin: 0 auto;
  &__list {
    padding: 1rem 1rem 1rem;
    box-sizing: border-box;
    list-style: none;
    display: grid;
    margin: 0;
    grid-template-columns: repeat(auto-fill, minmax(300px, 320px));
    justify-content: center;
    gap: 3rem;
    transition: opacity .1s ease-out;
    opacity: 1;
    max-width: 100%;
    @media screen and (min-width: 768px) {
      width: 100%;
    }
    &--hide {
      opacity: 0;
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
  max-width: 500px;
  padding: 1rem;
  &__icon {
    opacity: 0.5;
  }
  &__text {
    display: grid;
    text-align: center;
    word-break: break-word;
  }
  &--show {
    animation: fade-in-show 0.2s ease-in-out;
  }
}

.control {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    padding: 0 1rem;
    border-bottom: 1px solid var(--border-color);
    user-select: none;
    &__actions {
      display: flex;
      align-items: center;
      gap: .5rem;
    }
    &__pagination {
      font-weight: 600;
    }
  .icon--left {
    transform: rotate(90deg);
  }

  .icon--right {
    transform: rotate(-90deg);
  }

  .button {
    height: 28px;
    width: 28px;
    padding: 2px;
  }
}
</style>