<template>
  <div v-editable="blok" class="events">
    <ProgEvent v-for="event in events" :key="event.uuid" :blok="event" />
  </div>
</template>

<script setup lang="ts">
interface ProgEventsBlok {
  _uid?: string;
  component?: string;
}

defineProps<{
  blok: ProgEventsBlok;
}>();

const { locale } = useI18n();
const storyblokApi = useStoryblokApi();

const eventsPrefix = locale.value === "en" ? "en/evenements" : "evenements";

const { data: events } = await useAsyncData("prog-events", async () => {
  const response = await storyblokApi.get("cdn/stories", {
    version: "published",
    per_page: 100,
    starts_with: eventsPrefix,
    sort_by: "content.date:asc,content.time:asc",
  });
  return response.data.stories;
});
</script>

<style lang="scss" scoped>
.events {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 120rem;
  padding: 4rem 2rem 7rem;
  position: relative;
  width: 100%;

  @include for-tablet-portrait-up {
    flex-direction: row;
  }
}
</style>
