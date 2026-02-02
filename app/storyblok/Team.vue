<template>
  <div v-editable="blok" class="team">
    <h2 class="team__title">
      {{ blok.title }}
      <div class="layout-bar"></div>
    </h2>
    <div class="team__container">
      <StoryblokComponent v-for="member in blok.members" :key="member._uid" :blok="member" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface TeamBlok {
  title?: string
  members?: Array<{ _uid: string; component: string }>
}

defineProps<{ blok: TeamBlok }>()
</script>

<style lang="scss" scoped>
.team {
  max-width: 120rem;
  padding: 7rem 2rem;
  position: relative;
  width: 100%;

  &__title {
    color: $aqua-blue;
    font-family: $font-secondary;
    font-size: 4rem;
    font-weight: 600;
    margin-bottom: 4rem;
    position: relative;
    text-transform: uppercase;

    .layout-bar {
      background-color: $light-teal;
      bottom: -1rem;
      height: 0.2rem;
      left: 0;
      position: absolute;
      width: 8rem;
    }
  }

  &__container {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
}
</style>
