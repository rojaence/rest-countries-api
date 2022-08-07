<template>
  <article class="card elevation-2 fade-transition">
    <header class="card__header">
      <img :src="data.flags.png" alt="Country flag" class="card__flag">
    </header>
    <div class="card__body">
      <h2 class="card__title">{{ data.name.common }}</h2>
      <ul class="card__list card__list--basic-data" v-for="item in basicData" :key="item.label">
        <li class="card__item">
          <span class="card__label">{{ item.label }}:</span>
          <span class="card__value" v-if="item.label === 'Capital'">{{ item.value ? item.value[0] : '' }}</span>
          <span class="card__value" v-else-if="item.label === 'Population'">{{ item.value.toLocaleString('en-US', { minimumFractionDigits: 0 }) }}</span>
          <span class="card__value" v-else>{{ item.value }}</span>
        </li>
      </ul>
    </div>
    <footer class="card__footer" v-if="!dense">
      <div class="card__item">
        <span class="card__label">Border Countries:</span>
        <div class="card__value group">
          <span class="card__value">France</span>
          <span class="card__value">Germany</span>
          <span class="card__value">Netherlands</span>
        </div>
      </div>
    </footer>
  </article>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'CountryCard',
  props: {
    data: {
      type: Object,
      required: false
    },
    dense: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  setup(props) {
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
          { label: 'Border Countries', value: props.data.borders }
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

    return { basicData, extraData }
  }
}
</script>

<style lang="scss" scoped>
.card {
  background-color: var(--primary-bg-color);
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  &__flag {
    background-color: red;
    max-width: 100%;
    height: 200px;
    border-radius: 5px 5px 0 0;
  }
  &__body, &__footer {
    padding: 1rem 2rem;
    margin-bottom: 1.5rem;
  }
  &__list {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  &__item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  &__label {
    font-weight: 600;    
  }
  @media screen and (min-width: 768px) {
    max-width: 300px;
  }
}
</style>