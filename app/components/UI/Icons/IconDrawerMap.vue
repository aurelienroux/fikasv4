<template>
  <div class="icon" :class="{ open: iconStyle }">
    <div class="bar bar--one"></div>
    <div class="bar bar--two"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  iconStyle?: boolean
}>()
</script>

<style lang="scss" scoped>
.icon {
  height: 4rem;
  position: relative;
  width: 4rem;

  & .bar {
    background-color: $white;
    border-radius: 0.1rem;
    position: absolute;
    transition: 0.3s;
  }

  .bar--one {
    height: 0.8rem;
    top: calc(50% - 0.4rem);
    width: 4rem;
  }

  .bar--two {
    height: 4rem;
    left: calc(50% - 0.4rem);
    width: 0.8rem;
  }

  &.open .bar--two {
    display: none;
  }
}
</style>
