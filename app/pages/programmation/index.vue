<template>
  <div>
    <StoryblokComponent v-if="story" :blok="story.content" :events="events" />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const storyblokApi = useStoryblokApi();

// French (default): "programmation" | English: "en/programmation"
const slug = locale.value === "en" ? "en/programmation" : "programmation";
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
    version: "draft",
    starts_with: eventsPrefix,
    sort_by: "content.date:asc",
  }),
]);

const story = storyResponse.story;
const events = eventsResponse.data.stories;
</script>
