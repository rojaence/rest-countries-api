<template>
  <article class="card" :class="[dense ? 'elevation-2 card--animation' : 'card--expand']">
    <header class="card__header">
      <img :src="data.flags.svg" alt="Country flag" class="card__flag">
    </header>
    <div class="card__body">
      <h2 class="card__title">{{ data.name.common }}</h2>
      <ul class="card__list card__list--basic-data">
        <li class="card__item"  v-for="item in basicData" :key="item.label">
          <span class="card__label">{{ item.label }}:</span>
          <span class="card__value" v-if="item.label === 'Native Name'">{{ item.value[Object.keys(item.value)[0]].common || '' }}</span>
          <span class="card__value" v-else-if="item.label === 'Capital'">{{ item.value ? item.value[0] : '' }}</span>
          <span class="card__value" v-else-if="item.label === 'Population'">{{ item.value.toLocaleString('en-US', { minimumFractionDigits: 0 }) }}</span>
          <span class="card__value" v-else>{{ item.value }}</span>
        </li>
      </ul>
      <ul class="card__list card__list--extra-data" v-if="!dense">
        <li class="card__item" v-for="item in extraData" :key="item.label">
          <span class="card__label">{{ item.label }}</span>
          <span class="card__value" v-if="item.label === 'Top Level Domain'">{{ item.value[0] || '' }}</span>
          <span class="card__value" v-if="item.label === 'Currencies'">
            {{ formatCurrencyValues(item.value) }}
          </span>
          <span class="card__value" v-if="item.label === 'Languages'">
            {{ formatLanguageValues(item.value) }}
          </span>
        </li>
      </ul>
    </div>
    <footer class="card__footer" v-if="!dense">
      <div class="card__item card__item--column" v-if="data.borders">
        <span class="card__label">Border Countries:</span>
        <div class="card__value card__value--group">
          <router-link 
            class="button button--link elevation-1" 
            :to="{ name: 'CountryDetail', params: { cca3: border.code } }"
            v-for="border in formatBorderValues(data.borders)" 
            :key="border.code">{{ border.name }}
          </router-link>
        </div>
      </div>
    </footer>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  data: {
    type: Object,
    required: false
  },
  dense: {
    type: Boolean,
    required: false,
    default: true
  }
});

const basicData = computed(() => {
  if (props.dense) {
    return [
      { label: 'Population', value: props.data.population },
      { label: 'Capital', value: props.data.capital },
      { label: 'Region', value: props.data.region }
    ]
  } else {
    return [
      { label: 'Native Name', value: props.data.name.nativeName},
      { label: 'Population', value: props.data.population },
      { label: 'Capital', value: props.data.capital },
      { label: 'Region', value: props.data.region },
    ]        
  }
})

const extraData = computed(() => {
  return [
    { label: 'Top Level Domain', value: props.data.tld },
    { label: 'Currencies', value: props.data.currencies },
    { label: 'Languages', value: props.data.languages }
  ]
})

const formatLanguageValues = (languages) => {
  return Object.values(languages).slice().sort((a, b) => {
    if (a < b) return -1
    else if (a > b) return 1
    else return 0
  }).join(', ')
};

const formatCurrencyValues = (currencies) => {
  return Object.values(currencies).slice().map(currency => currency.name).sort((a, b) => {
    if (a < b) return -1
    else if (a > b) return 1
    else return 0
  }).join(', ')
};

const formatBorderValues = (borders) => {
  return borders.slice().sort((a, b) => {
    if (a.name < b.name) return -1
    else if (a.name > b.name) return 1
    else return 0
  })
} 
</script>

<style lang="scss" scoped>
.card {
  background-color: var(--primary-bg-color);
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  user-select: none;
  height: 370px;
  transition: var(--fade-transition);
  &__title {
    font-size: var(--h2-size);
  }
  &__flag {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 5px 5px 0 0;
  }
  &__body, &__footer {
    padding: 1rem 2rem;
  }
  &__list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    &--basic-data {
      margin-top: 1.5rem;
    }
  }
  &__item {
    display: flex;
    align-items: start;
    gap: 0.5rem;
    &--column {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }
  }
  &__label {
    font-weight: 600;    
  }
  &__value {
    &--group {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 1rem 0;
    }
  }
}

.card--animation {
  transition: box-shadow 0.1s ease-out, transform 0.1s ease-out, var(--fade-transition);
  cursor: pointer;
  &:hover {
    @extend .elevation-5 !optional;
    transform: scale(1.02);
  }
  &:active {
    transform: scale(1);
    filter: var(--brightness-filter);
  }
}

.card--expand {
  height: auto;
  border-radius: 0;
  user-select: auto;
  background-color: transparent;
  .card {
    &__flag {
      height: auto;
      border-radius: 0;
    }
    &__body, &__footer {
      padding: 1rem 0;
    }
    &__list {
      &--extra-data {
        margin-top: 3rem;
      }
    }
  }

  @media screen and (min-width: 600px) {
    .card__body {
      display: grid;
      grid-template-areas: 'cardTitle cardTitle''basicData extraData';
      row-gap: 1rem;
    }
    .card__title {
      grid-area: cardTitle;
    }
    .card__list {
      margin-top: 0;
      &--basic-data {
        grid-area: basicData;
      }
      &--extra-data {
        grid-area: extraData;
      }
    }
  }

  @media screen and (min-width: 900px) {
    display: grid;
    grid-template-areas: 'cardHeader cardBody''cardHeader cardFooter';
    grid-template-columns: 0.75fr 1fr;
    gap: 0 4rem;
    align-items: center;
    .card__header {
      grid-area: cardHeader;
    }
    .card__body {
      grid-area: cardBody;
      display: grid;
      grid-template-areas: 'cardTitle cardTitle''basicData extraData';
      gap: 0 1rem;
    }
    .card__footer {
      grid-area: cardFooter;
    }
  }
}

@media screen and (min-width: 1440px) {
  .card {
    column-gap: 10rem;
  }
  .card__title {
    font-size: 1.6rem;
  }
}

.button--link {
  padding: 0.6rem 2rem;
}
</style>