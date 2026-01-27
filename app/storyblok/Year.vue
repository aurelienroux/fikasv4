<template>
  <div v-editable="blok" class="year">
    <div
      class="year__image"
      :style="{ backgroundImage: `url('${blok.image?.filename}')` }"
    ></div>
    <div class="year__bg"></div>
    <a class="year__content" :href="linkUrl">
      <p class="year__number">{{ blok.year }}</p>
      <p class="year__archives">
        {{ t('edition.archives') }}
        <UIIconsIconMore />
      </p>
    </a>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  blok: {
    image?: { filename: string }
    link?: { cached_url: string }
    year?: string | number
  }
}>()

const { t } = useI18n()

const linkUrl = computed(() => {
  const url = props.blok.link?.cached_url
  if (!url) return '#'
  if (url.startsWith('http') || url.startsWith('/')) return url
  return '/' + url
})
</script>

<style lang="scss" scoped>
.year {
  display: grid;
  flex-basis: 33.3333%;
  grid-template-columns: 2rem repeat(20, 1fr) 2rem;
  grid-template-rows: repeat(20, 2.7rem);
  margin: 0 auto 5rem;

  &__image {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    grid-column-end: -2;
    grid-column-start: 2;
    grid-row-end: -4;
    grid-row-start: 1;
    z-index: 2;
  }

  &__bg {
    background: $very-light-purple;
    grid-column-end: -1;
    grid-column-start: 3;
    grid-row-end: -1;
    grid-row-start: 16;
    z-index: 1;
  }

  &__content {
    align-self: center;
    color: $white;
    font-family: $font-secondary;
    grid-column-end: -2;
    grid-column-start: 3;
    grid-row-end: -1;
    grid-row-start: 18;
    justify-self: end;
    text-decoration: none;
    z-index: 2;
  }

  &__number {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: right;
  }

  &__archives {
    font-size: 1.4rem;
    height: 2.2rem;
    text-align: right;
    text-transform: uppercase;
  }
}
</style>
