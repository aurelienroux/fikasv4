<template>
  <div v-editable="blok" class="pinkblock">
    <div class="cover"></div>
    <div class="pinkblock__container">
      <p class="pinkblock__title">{{ blok.title }}</p>
      <p class="pinkblock__text">{{ blok.text }}</p>
      <NuxtLink
        v-if="blok.button_text"
        :to="correctUrl(blok.button_link?.cached_url || '')"
      >
        <UIButtonsBtn btn-style="button--full">{{
          blok.button_text
        }}</UIButtonsBtn>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { correctUrl } = useNavigation();

interface PinkblockBlok {
  title?: string;
  text?: string;
  button_text?: string;
  button_link?: { cached_url: string };
}

defineProps<{ blok: PinkblockBlok }>();
</script>

<style lang="scss" scoped>
.pinkblock {
  background-color: $very-light-purple;
  margin: 7rem 0;
  padding: 8rem 2rem;
  position: relative;
  width: 100%;

  .cover {
    background-image: url("~/assets/images/bg2.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    bottom: 0;
    height: 100%;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 100%;
  }

  &__container {
    background-color: $white;
    margin: 0 auto;
    max-width: 120rem;
    padding: 8rem 3rem;
    position: relative;
    text-align: center;

    @include for-tablet-landscape-up {
      padding: 8rem 6rem;
    }
  }

  &__title {
    color: $aqua-blue;
    font-family: $font-secondary;
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 2rem;
    text-transform: uppercase;
  }

  &__text {
    color: $charcoal-grey;
    font-family: $font-primary;
    font-size: 20px;
    font-style: normal;
    line-height: 1.4;
    margin-bottom: 2rem;
  }
}
</style>
