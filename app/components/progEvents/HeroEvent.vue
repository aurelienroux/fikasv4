<template>
  <div class="hero">
    <div
      class="hero__image"
      :style="{ backgroundImage: `url('${story?.content?.image?.filename}')` }"
    />

    <h1 class="hero__title">
      {{ story?.content?.title }}
    </h1>
  </div>
</template>

<script setup lang="ts">
interface Story {
  content?: {
    image?: { filename: string };
    title?: string;
  };
}

defineProps<{
  story?: Story;
}>();
</script>

<style lang="scss" scoped>
.hero {
  align-items: flex-end;
  display: flex;
  height: 40rem;
  justify-content: center;
  position: relative;

  @include for-tablet-landscape-up {
    height: 60rem;
  }

  &__image {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    display: inline-block;
    height: 100%;
    position: absolute;
    width: 100%;

    &:before {
      background-color: $white;
      content: "";
      display: inline-block;
      height: 100%;
      opacity: 0.25;
      width: 100%;
    }
  }

  &__title {
    color: $white;
    font-family: $font-secondary;
    font-size: 3rem;
    font-weight: 600;
    margin-bottom: 4rem;
    z-index: 10;
    padding: 0 2rem;
    text-align: center;
    max-width: 120rem;

    @include for-tablet-landscape-up {
      font-size: 6rem;
      margin-bottom: 8rem;
    }
  }
}
</style>
