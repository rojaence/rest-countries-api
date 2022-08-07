<template>
  <div tabindex="0" class="field field--small field-select elevation-2" @focusout="toggleList(false)">
    <span id="search-region" class="field__input" v-text="selectedItem" @click="toggleList(!open)"></span>
    <label class="field__label" @click="toggleList(!open)">
      <icon-chevron :class="{ 'rotate-transition' : true, 'rotate-transition--active' : open}"></icon-chevron>
    </label>
    <ul class="field-select__list elevation-2" :class="{ 'field-select__list--active': open }">
      <li class="field-select__item" :class="{ 'field-select__item--selected': item === selectedItem }" v-for="(item, index) in items" :key="index" @click="selectRegion(item)">
        {{ item }}
      </li>
      <span class="field-select__no-data" v-if="items.length === 0">No data</span>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import IconChevron from '@/components/icons/IconChevron.vue'

export default {
  name: 'InputSelect',
  props: {
    items: {
      type: Array,
      default: []
    },
    selectedValue: {
      type: String,
      required: false,
      default: ''
    }
  },
  components: {
    'icon-chevron': IconChevron
  },
  setup(props, { emit }) {
    const open = ref(false);
    const selectedItem = ref('');
    
    const toggleList = (value) => {
      open.value = value;
    };

    const selectRegion = (item) => {      
      selectedItem.value = item;
      emit('change-value', item);
      toggleList(false);
    };

    const resetValue = () => {
      props.selectedValue = '';
      selectedItem.value = props.items[0];
    }

    onMounted(() => {
      selectedItem.value = props.selectedValue;
    });

    return {
      open,
      selectedItem,
      selectRegion,
      toggleList,
    }
  },
}
</script>

<style lang="scss" scoped>
.field-select, .icon, .field__label {
  cursor: pointer;
  user-select: none;
}
.field__label {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem 0 .5rem;
}

.field__input {
  display: flex;
  align-items: center;
  padding-left: 1.5rem;
  border-radius: 5px 0 0 5px;
}

.field-select {
  gap: 0;
  padding: 0;
  position: relative;
  outline: none;
  &__no-data {
    opacity: 0.6;
    font-size: 0.8rem;
    padding: 0.5rem 1.5rem;
  }
  &__list {
    position: absolute;
    list-style: none;
    padding: 1rem 0;
    box-sizing: border-box;
    margin: 0;
    background-color: inherit;
    top: 110%;
    width: 100%;
    left: 0;
    opacity: 0;
    transform: scaleY(0);
    transform-origin: top;
    transition: opacity 100ms ease-in-out;
    border-radius: 5px;
    z-index: 90;
    &--active {
      opacity: 1;
      transform: scaleY(1);
    }
  }
  &__item {
    padding: 0.5rem 1.5rem;
    user-select: none;
    font-weight: 600;
    cursor: pointer;
    &:hover {
      background-color: var(--btn-hover-color);
    }
    &--selected{
      background-color: var(--active-color) !important;
    }
  }
}
</style>