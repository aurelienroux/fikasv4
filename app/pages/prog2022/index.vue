<template>
  <div>
    <StoryblokComponent v-if="story" :blok="story.content" :events="events" />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const storyblokApi = useStoryblokApi();

// French (default): "prog2022" | English: "en/prog2022"
const slug = locale.value === "en" ? "en/prog2022" : "prog2022";
const eventsPrefix = locale.value === "en" ? "en/evenements" : "evenements";

// Fetch story and events in parallel
const [storyResponse, eventsResponse] = await Promise.all([
  useAsyncStoryblok(slug, {
    api: {
      version: "draft",
    },
    bridge: {},
  }),
  storyblokApi.get("cdn/stories", {
    version: "published",
    per_page: 100,
    starts_with: eventsPrefix,
    sort_by: "content.date:asc,content.time:asc",
  }),
]);

const story = storyResponse.story;
const events = eventsResponse.data.stories;
</script>
