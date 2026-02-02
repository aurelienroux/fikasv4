<template>
  <div v-editable="blok" class="event">
    <div
      class="event__image"
      :style="{ backgroundImage: `url('${blok.content.thumbnail?.filename}')` }"
    />

    <div class="event__bg"></div>

    <NuxtLink class="event__link" :to="`/${blok.full_slug}`">
      <p v-if="blok.content.date" class="event__date">{{ formattedDate }}</p>
      <p class="event__category">{{ blok.content.category }}</p>
      <p class="event__title">{{ blok.content.title }}</p>
      <p class="event__time">
        {{ blok.content.time }} - {{ blok.content.location }}
      </p>

      <p class="event__more">
        {{ t("programmation.more") }}
        <UIIconsIconMore />
      </p>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
interface ProgEventBlok {
  full_slug: string;
  content: {
    thumbnail?: { filename: string };
    date?: string;
    category?: string;
    title?: string;
    time?: string;
    location?: string;
  };
}

const props = defineProps<{
  blok: ProgEventBlok;
}>();

const { locale, t } = useI18n();

const formattedDate = computed(() => {
  if (!props.blok.content.date) return "";

  // Date format: "2025-11-05 00:00" - extract date part only
  const datePart = props.blok.content.date.split(" ")[0];

  if (!datePart) return "";

  const [year, month, day] = datePart.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  return new Intl.DateTimeFormat(locale.value === "en" ? "en-GB" : "fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
});
</script>

<style lang="scss" scoped>
.event {
  display: grid;
  flex-basis: 50%;
  grid-template-columns: 5rem 1fr 2.4rem;
  grid-template-rows: 14rem 7rem 1fr;
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

  &__link {
    padding: 2rem;
    grid-column-end: 4;
    grid-column-start: 2;
    grid-row-end: 4;
    grid-row-start: 3;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    text-decoration: none;

    &:hover .event__more {
      transform: translateX(-1rem);
      transition: 0.3s;
    }
  }

  &__category {
    background-color: $perrywinkle;
    display: inline-block;
    margin-bottom: 5px;
    padding: 5px 8px;
    border-radius: 4px;
    font-family: $font-secondary;
    color: $white;
    font-size: 1.2rem;
  }

  &__bg {
    background: $very-light-purple;
    grid-column-end: 4;
    grid-column-start: 2;
    grid-row-end: 4;
    grid-row-start: 2;
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

  &__time {
    flex: 1;
  }

  &__title {
    font-weight: 700;
  }

  &__more {
    width: 100%;
    display: block;
    margin-top: 2rem;
    font-family: $font-secondary;
    font-size: 1.4rem;
    text-align: right;
    color: $white;
    text-transform: uppercase;
  }
}
</style>
