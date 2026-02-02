<template>
  <div v-editable="blok" class="greenblock">
    <div class="greenblock__bg">
      <div class="cover"></div>
    </div>
    <div class="content">
      <div
        class="content__image"
        :style="{ backgroundImage: `url('${blok.image?.filename}')` }"
      ></div>
      <h2 class="content__title">{{ blok.title }}</h2>
      <p class="content__text">{{ blok.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface GreenblockBlok {
  image: { filename: string }
  title: string
  text: string
}

defineProps<{ blok: GreenblockBlok }>()
</script>

<style lang="scss" scoped>
.greenblock {
  margin: 4rem 0;
  position: relative;
  width: 100%;

  &__bg {
    background: $light-teal;
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 15rem;
    width: 100%;

    @include for-tablet-landscape-up {
      top: 7rem;
    }

    .cover {
      background-image: url('~/assets/images/bg2.svg');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      height: 100%;
      width: 100%;
    }
  }
}

.content {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 25rem auto auto;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 2rem;

  @include for-tablet-landscape-up {
    grid-template-columns: 1fr 75px 75px 1.75fr;
    grid-template-rows: 10rem auto auto 6rem auto;
  }

  &__image {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    grid-column-end: -1;
    grid-column-start: 1;
    grid-row-end: 2;
    grid-row-start: 1;
    position: relative;

    @include for-tablet-landscape-up {
      grid-column-end: 3;
      grid-column-start: 1;
      grid-row-end: 5;
      grid-row-start: 1;
    }
  }

  &__title {
    color: $white;
    font-family: $font-tertiary;
    font-size: 7.5rem;
    grid-column-end: -1;
    grid-column-start: 1;
    grid-row-end: 3;
    grid-row-start: 2;
    margin: 2rem 0;
    position: relative;
    text-transform: uppercase;

    @include for-tablet-landscape-up {
      grid-column-end: 4;
      grid-column-start: 2;
      grid-row-end: 3;
      grid-row-start: 2;
    }
  }

  &__text {
    color: $charcoal-grey;
    font-family: $font-tertiary;
    font-size: 3.6rem;
    font-weight: normal;
    grid-column-end: -1;
    grid-column-start: 1;
    grid-row-end: 4;
    grid-row-start: 3;
    line-height: 1.2;
    margin-bottom: 5rem;
    position: relative;

    @include for-tablet-landscape-up {
      grid-column-end: 5;
      grid-column-start: 4;
      grid-row-end: 4;
      grid-row-start: 6;
    }
  }
}
</style>
