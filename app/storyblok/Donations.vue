<template>
  <div v-editable="blok" class="donations">
    <StoryblokComponent
      v-for="donation in blok.donations"
      :key="donation._uid"
      :blok="donation"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  blok: {
    donations?: Array<{ _uid: string; component: string }>
  }
}>()
</script>

<style lang="scss" scoped>
.donations {
  display: grid;
  grid-gap: 6rem;
  grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
  max-width: 120rem;
  padding: 4rem 2rem;
  position: relative;
  width: 100%;
}
</style>
