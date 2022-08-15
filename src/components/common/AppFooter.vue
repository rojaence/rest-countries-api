<template>
  <footer class="app-footer">
    <p class="attribution">
      Coded By
      <a class="attribution__link" href="https://github.com/rojaence" target="_blank">Ronny Endara</a>
    </p>
  </footer>
</template>

<style lang="scss">
.app-footer {
  padding: 0.5rem 1rem 0.8rem;
  text-align: right;
}
.attribution {
  margin: 0;
  &__link {
    text-decoration: none;
    color: var(--main-text-color); 
    font-weight: 600;
    transition: color 0.2s ease;
    &:hover {
      color: var(--accent-color-alt);
    }
  }
}

</style>