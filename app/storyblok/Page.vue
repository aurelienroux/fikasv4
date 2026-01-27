<template>
  <div v-editable="blok">
    <StoryblokComponent
      v-for="item in blok.body"
      :key="item._uid"
      :blok="item"
    />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
defineProps<{
  blok: {
    body?: Array<{ _uid: string; component: string }>
  }
}>()
</script>
