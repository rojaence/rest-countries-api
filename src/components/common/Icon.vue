<template>
  <component
    :is="iconComponent"
    role="img"
    class="icon"
    :class="{ 'icon--outline': outline, 'icon--error': color === 'error' }"
    :height="size"
    :width="size"
    viewBox="0 0 24 24"
  >
  </component>
</template>

<script setup>
import { computed } from 'vue'
import IconSearch from '@/components/icons/IconSearch.vue'
import IconAlert from '@/components/icons/IconAlert.vue'
import IconChevron from '@/components/icons/IconChevron.vue'
import IconRefresh from '@/components/icons/IconRefresh.vue'
import IconTheme from '@/components/icons/IconTheme.vue'
import IconArrow from '@/components/icons/IconArrow.vue'
import IconClose from '@/components/icons/IconClose.vue'

const icons = {
  search: IconSearch,
  alert: IconAlert,
  chevron: IconChevron,
  refresh: IconRefresh,
  theme: IconTheme,
  arrow: IconArrow,
  close: IconClose,
}

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    default: 20,
  },
  outline: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    required: false,
  }
});

const iconComponent = computed(() => {
  if (icons[props.name]) {
    return icons[props.name];
  } else {
    return IconSearch;
  }
})

</script>

<style lang="scss" scoped>
.icon {
  fill: var(--icon-bg-color);
  stroke: none;
  &--outline {
    fill: none;
    stroke: var(--icon-bg-color);
    stroke-width: 2px;
  }
  &--error {
    fill: var(--error-color);
  }
}
</style>
