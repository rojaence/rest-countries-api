<template>
  <div class="field field--large elevation-2">
    <label for="search-input" class="field__label">
      <slot name="icon"></slot>
    </label>
    <input type="text" :placeholder="hint" class="field__input" id="search-input" autocomplete="off" @input="onInput" v-model="text">
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'InputText',
  props: {
    hint: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const text = ref('');

    const onInput = () => {
      emit('change-value', text.value);
    }
    return {
      onInput,
      text
    }
  }
}
</script>