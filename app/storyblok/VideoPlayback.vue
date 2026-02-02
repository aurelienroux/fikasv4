<template>
  <div v-editable="blok" class="player">
    <h2 class="player__title">
      {{ blok.title }}
      <div class="layout-bar"></div>
    </h2>
    <div class="player__container">
      <iframe
        class="player__video"
        width="640"
        height="588"
        :src="videoLink"
        frameborder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
      <div class="player__bg"></div>
    </div>
    <NuxtLink
      v-if="blok.show_button"
      class="button"
      :to="`/${blok.link?.cached_url || ''}`"
    >
      {{ blok.button_text }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  blok: {
    title?: string
    video_id?: string
    show_button?: boolean
    button_text?: string
    link?: { cached_url?: string }
  }
}>()

const videoLink = computed(
  () =>
    `https://www.youtube.com/embed/${props.blok.video_id}?showinfo=0&autoplay=0&mute=0&modestbranding=1&controls=1&loop=0`
)
</script>

<style lang="scss" scoped>
.player {
  max-width: 120rem;
  padding: 7rem 2rem;
  position: relative;
  width: 100%;
  text-align: center;

  &__title {
    color: $aqua-blue;
    font-family: $font-secondary;
    font-size: 4rem;
    font-weight: 600;
    margin-bottom: 4rem;
    position: relative;
    text-align: left;
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
    display: grid;
    grid-template-columns: 4rem 1fr 4rem;
    grid-template-rows: 4rem 25rem 4rem;

    @include for-tablet-portrait-up {
      display: grid;
      grid-template-columns: 8rem 1fr 16rem;
      grid-template-rows: 8rem 50rem 8rem;
    }
  }

  &__video {
    grid-column-end: 3;
    grid-column-start: 1;
    grid-row-end: 3;
    grid-row-start: 1;
    height: 100%;
    max-height: 58rem;
    width: 100%;
    z-index: 10;
  }

  &__bg {
    background: $very-light-purple;
    grid-column-end: -1;
    grid-column-start: 2;
    grid-row-end: -1;
    grid-row-start: 2;
  }

  .button {
    background: transparent;
    border-radius: 3rem;
    border: solid 0.2rem $perrywinkle;
    color: $perrywinkle;
    cursor: pointer;
    display: inline-block;
    font-family: $font-secondary;
    font-size: 1.4rem;
    font-weight: 700;
    margin: 8rem 0;
    padding: 2rem 3rem;
    position: relative;
    text-decoration: none;
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
}
</style>
