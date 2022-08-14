<template>
  <div class="error-connection">
    <div class="error-connection__content">
      <icon name="alert" color="error" size="200"></icon>
      <div class="error-connection__text">
        <p>Network Error!</p>
        <p>Please try again later</p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-connection {
  user-select: none;
  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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