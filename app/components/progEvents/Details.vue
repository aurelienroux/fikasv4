<template>
  <div class="details-container">
    <div class="details">
      <p class="details__date">{{ formattedDate }}</p>
      <p class="details__time">{{ story?.content?.time }}</p>
      <p class="details__location">{{ story?.content?.location }}</p>
      <div v-if="story?.content?.prices" class="details__prices">
        <StoryblokRichText :doc="story.content.prices" />
      </div>
      <a
        v-if="story?.content?.tickets?.url"
        class="tickets"
        :href="story.content.tickets.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        <UIButtonsBtn btn-style="button--full">
          {{ t("programmation.tickets") }}
        </UIButtonsBtn>
      </a>
      <a
        v-if="story?.content?.facebookEvent?.url"
        class="facebook-link"
        :href="story.content.facebookEvent.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ t("programmation.facebookEvent") }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Story {
  content?: {
    date?: string;
    time?: string;
    location?: string;
    prices?: any;
    tickets?: { url?: string };
    facebookEvent?: { url?: string };
  };
}

const props = defineProps<{
  story?: Story;
}>();

const { locale, t } = useI18n();

const formattedDate = computed(() => {
  if (!props.story?.content?.date) return "";

  // Date format from Storyblok: "YYYY/MM/DD" or "YYYY-MM-DD"
  const dateStr = props.story.content.date.replace(/\//g, "-").split(" ")[0];

  if (!dateStr) return;

  const [year, month, day] = dateStr.split("-");
  const date = new Date(Number(year), Number(month) - 1, Number(day));

  return new Intl.DateTimeFormat(locale.value === "en" ? "en-GB" : "fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
});

</script>

<style lang="scss" scoped>
.details-container {
  flex: 1;
  margin-bottom: 8rem;
  order: 0;

  @include for-tablet-landscape-up {
    order: 1;
  }

  .details {
    background-color: $light-teal;
    background-image: url("~/assets/images/bg2.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    padding: 2.5rem;

    &__date,
    &__time,
    &__prices {
      color: $charcoal-grey;
      font-family: $font-primary;
      font-size: 3rem;
    }

    &__date {
      font-weight: 600;
    }

    &__location {
      color: $perrywinkle;
      font-family: $font-primary;
      font-size: 3rem;
      padding: 1.5rem 0;
    }

    &__prices {
      font-size: 2.4rem;
    }

    .tickets {
      display: block;
      left: -1rem;
      margin-top: 1rem;
      position: relative;
    }

    .facebook-link {
      color: $perrywinkle;
      display: block;
      font-family: $font-secondary;
      font-size: 1.4rem;
      margin-top: 2rem;
      text-transform: uppercase;
    }
  }
}
</style>
