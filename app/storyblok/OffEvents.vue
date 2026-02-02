<template>
  <div v-editable="blok" class="events">
    <StoryblokComponent
      v-for="item in blok.components"
      :key="item._uid"
      :blok="item"
    />
  </div>
</template>

<script setup lang="ts">
interface OffEventsBlok {
  components?: Array<{ _uid: string; component: string }>
}

defineProps<{ blok: OffEventsBlok }>()
</script>

<style lang="scss" scoped>
.events {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 120rem;
  padding: 4rem 2rem 7rem;
  position: relative;
  width: 100%;

  @include for-tablet-portrait-up {
    flex-direction: row;
  }
}
</style>
