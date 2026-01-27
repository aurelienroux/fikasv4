<template>
  <div class="icon" :class="{ open: iconStyle }">
    <div class="bar bar--one"></div>
    <div class="bar bar--two"></div>
    <div class="bar bar--three"></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  iconStyle?: boolean
}>()
</script>

<style lang="scss" scoped>
.icon {
  height: 2rem;
  width: 2rem;

  & .bar {
    background-color: $perrywinkle;
    border-radius: 0.1rem;
    height: 0.5rem;
    transition: 0.3s;
    width: 2rem;
  }

  .bar--one,
  .bar--two {
    margin-bottom: 0.3rem;
  }

  &.open .bar--one,
  &.open .bar--three {
    left: 0.1rem;
    position: relative;
    width: 2.6rem;
  }

  &.open .bar--one {
    top: -0.2rem;
    transform-origin: top left;
    transform: rotate(45deg);
  }

  &.open .bar--two {
    display: none;
  }

  &.open .bar--three {
    top: 0.7rem;
    transform-origin: bottom left;
    transform: rotate(-45deg);
  }
}
</style>
