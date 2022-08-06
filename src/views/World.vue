<template>
  <div class="filter-options">
    <input-text :hint="'Search for a country...'" @change-value="checkText">
      <template #icon>
        <icon-search></icon-search>
      </template>
    </input-text>
    <input-select @change-value="checkValue" :selected-value="regionItems[0]" :items="regionItems"></input-select>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useCountriesStore } from '@/stores/countries'
import InputSelect from '@/components/InputSelect.vue'
import InputText from '@/components/InputText.vue'
import IconSearch from '@/components/icons/IconSearch.vue'

export default {
  name: 'World',  
  components: {
    'router-link': RouterLink,
    'input-select': InputSelect,
    'icon-search': IconSearch,
    'input-text': InputText,
  },
  setup() {
    const countriesStore = useCountriesStore();

    const checkValue = (value) => {
      console.log(value);
      console.log(`checkValue: ${value}`);
      console.log(`\n`)
    }

    const checkText = (value) => {
      console.log(value);
      console.log(`checkText: ${value}`);
      console.log(`\n`)
    }

    const regionItems = computed(() => {
      let items = [];
      items.push('All regions')
      countriesStore.regions.forEach(region => {
        items.push(region);
      });
      return items;
    })
    return { countriesStore, regionItems, checkValue, checkText }
  }
}
</script>

<style lang="scss">
.filter-options {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  @media screen and (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>