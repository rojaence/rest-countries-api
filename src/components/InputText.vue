<template>
  <div class="field field--large elevation-2" :class="{ 'field--clearable' : clearable }">
    <label for="search-input" class="field__label">
      <slot name="icon"></slot>
    </label>
    <input type="text" :placeholder="hint" :maxlength="limit" class="field__input" id="search-input" autocomplete="off" @input="onInput" v-model="text">
    <icon-close class="icon-close" v-if="clearable && text != ''" @click="clearText"></icon-close>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import IconClose from '@/components/icons/IconClose.vue'

const props = defineProps({
  hint: {
    type: String,
    default: ''
  },
  clearable: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: 500
  }
});

const emit = defineEmits(['change-value']);

const text = ref('');

const onInput = () => {
  emit('change-value', text.value);
}

const clearText = () => {
  text.value = '';
  emit('change-value', text.value);
}
</script>

<style lang="scss" scoped>
.icon-close {
  cursor: pointer;
  width: 24px;
  height: 24px;
  animation: fade-in 0.1s ease-in;
}
</style>