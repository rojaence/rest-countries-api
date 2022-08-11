<template>
  <div class="error-connection">
    <div class="error-connection__content">
      <icon-close-outline class="error-connection__icon"></icon-close-outline>
      <div class="error-connection__text">
        <p>Network Error!</p>
        <p>Please try again later</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconCloseOutline from '@/components/icons/IconCloseOutline.vue'
</script>

<style lang="scss" scoped>
.error-connection {
  user-select: none;
  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  &__icon {
    fill: var(--error-color);
    width: 200px;
    height: 200px;
  }
  &__text {
    text-align: center;
    p {
      margin: 0.5rem 0;
      font-size: 1.5rem;
      opacity: 0.7;
      font-weight: 600;
    }
  }
}
</style>