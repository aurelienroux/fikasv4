<template>
  <button class="button" :class="btnStyle">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  btnStyle?: string
}>()
</script>

<style lang="scss" scoped>
.button {
  background: transparent;
  border-radius: 3rem;
  border: solid 0.2rem $perrywinkle;
  color: $perrywinkle;
  cursor: pointer;
  font-family: $font-secondary;
  font-size: 1.4rem;
  font-weight: 700;
  margin: 1rem;
  padding: 2rem 3rem;
  transition: 0.3s;

  &:hover {
    background-color: $perrywinkle;
    color: $white;
  }

  &--full {
    background-color: $perrywinkle;
    color: $white;

    &:hover {
      opacity: 0.7;
    }
  }
}
</style>
