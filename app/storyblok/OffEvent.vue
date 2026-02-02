<template>
  <div v-editable="blok" class="event">
    <div
      class="event__image"
      :style="{ backgroundImage: `url('${blok.image?.filename}')` }"
    ></div>
    <div class="event__bg"></div>
    <div class="event__content">
      <p v-if="blok.date" class="event__date">{{ formattedDate }}</p>
      <p class="event__title">{{ blok.title }}</p>
      <p class="event__time">{{ blok.time }} - {{ blok.location }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface OffEventBlok {
  image?: { filename: string }
  date?: string
  title?: string
  time?: string
  location?: string
}

const props = defineProps<{ blok: OffEventBlok }>()

const { locale } = useI18n()

const formattedDate = computed(() => {
  if (!props.blok.date) return ''

  // Parse date from "YYYY/MM/DD" or "YYYY//MM/DD" format
  const dateStr = props.blok.date.replace(/\/+/g, '-')
  const date = new Date(dateStr)

  // Format as "DD MMMM YYYY" using native Intl.DateTimeFormat
  return new Intl.DateTimeFormat(locale.value === 'en' ? 'en-GB' : 'fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
})
</script>

<style lang="scss" scoped>
.event {
  display: grid;
  flex-basis: 50%;
  grid-template-columns: 5rem 1fr 2.4rem;
  grid-template-rows: 14rem 7rem 1fr auto;
  margin-bottom: 8rem;

  @include for-tablet-landscape-up {
    flex-basis: 33%;
  }

  &__image {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    grid-column-end: 3;
    grid-column-start: 1;
    grid-row-end: 3;
    grid-row-start: 1;
    z-index: 10;
  }

  &__bg {
    background: $very-light-purple;
    grid-column-end: 4;
    grid-column-start: 2;
    grid-row-end: 4;
    grid-row-start: 2;
  }

  &__content {
    padding: 2rem;
    grid-column-end: 4;
    grid-column-start: 2;
    grid-row-end: 4;
    grid-row-start: 3;
  }

  &__date {
    color: $white;
    font-family: $font-secondary;
    font-size: 2.4rem;
    font-weight: bold;
    line-height: 1.4;
  }

  &__title,
  &__time {
    color: $charcoal-grey;
    font-family: $font-primary;
    font-size: 2rem;
    line-height: 1.3;
  }

  &__title {
    font-weight: 700;
  }

  &__link {
    display: block;
    margin-top: 2rem;
    font-family: $font-secondary;
    font-size: 1.4rem;
    text-align: right;
    color: $white;
    text-transform: uppercase;
    text-decoration: none;
  }

  &__tickets {
    align-self: center;
    grid-column-end: 4;
    grid-column-start: 2;
    grid-row-end: 5;
    grid-row-start: 4;
    justify-self: flex-start;
    margin: 2rem;

    a {
      text-decoration: none;
      color: $white;
    }
  }
}
</style>
