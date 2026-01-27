<template>
  <div class="edition" v-editable="blok">
    <h2 class="title">
      {{ blok.title }}
      <div class="layout-bar"></div>
    </h2>
    <div class="year-container">
      <StoryblokComponent
        v-for="year in blok.years"
        :key="year._uid"
        :blok="year"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  blok: {
    title?: string
    years?: Array<{ _uid: string; component: string }>
  }
}>()
</script>

<style lang="scss" scoped>
.edition {
  max-width: 120rem;
  margin: 0 auto;
  padding: 4rem 2rem;
  position: relative;
  width: 100%;
}

.year-container {
  @include for-tablet-landscape-up {
    display: flex;
    flex-wrap: wrap;
  }
}

.title {
  color: $aqua-blue;
  font-family: $font-secondary;
  font-size: 4rem;
  font-weight: 600;
  margin-bottom: 4rem;
  padding: 0 2rem;
  position: relative;
  text-transform: uppercase;

  .layout-bar {
    background-color: $light-teal;
    bottom: -1rem;
    height: 0.2rem;
    left: 2rem;
    position: absolute;
    width: 8rem;
  }
}
</style>
