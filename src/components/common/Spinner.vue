<template>
  <div class="spinner"></div>
</template>

<style lang="scss" scoped>

.spinner {
  display: grid;
  place-items: center;
  position: relative;
  width: 150px;
  height: 150px;
  background-image: radial-gradient(circle at center, var(--accent-color) 40%, transparent 50%);
  border-radius: 50%;
  &:after, &:before {
    content: "";
    position: absolute;
    border: 8px solid var(--accent-color);
    border-radius: 50%;
  }
  &:after {
    width: 150px;
    height: 150px;
    border-color: var(--accent-color) transparent var(--accent-color) transparent;
    animation: dual-ring 1s linear infinite;
  }
  &:before {
    width: 120px;
    height: 120px;
    border-color: transparent var(--accent-color) transparent var(--accent-color);
    animation: dual-ring-reverse 0.8s linear infinite;
  }
}


@keyframes dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes dual-ring-reverse {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
</style>