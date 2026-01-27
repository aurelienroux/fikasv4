<template>
  <div class="paragraph" v-editable="blok">
    <p>{{ blok.text }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  blok: {
    text?: string
  }
}>()
</script>

<style lang="scss" scoped>
.paragraph {
  margin: 4rem 0;
  padding: 4rem 2rem;
  width: 100%;

  p {
    color: $charcoal-grey;
    font-family: $font-primary;
    font-size: 2rem;
    line-height: 1.4;
    margin: 0 auto;
    max-width: 120rem;
    position: relative;

    &::before {
      background: $light-teal;
      content: '';
      display: inline-block;
      height: 8rem;
      left: -3rem;
      position: absolute;
      top: 0.8rem;
      width: 0.2rem;
    }
  }
}
</style>
