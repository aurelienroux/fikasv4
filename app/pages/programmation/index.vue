<template>
  <div>
    <StoryblokComponent v-if="story" :blok="story.content" :events="events" />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const storyblokApi = useStoryblokApi();

const language = locale.value === "fr" ? undefined : locale.value;

// Fetch story and events in parallel
const [storyResponse, eventsResponse] = await Promise.all([
  useAsyncStoryblok("programmation", {
    api: {
      version: "draft",
      language,
    },
    bridge: {},
  }),
  storyblokApi.get("cdn/stories", {
    version: "draft",
    language,
    starts_with: "evenements",
    sort_by: "content.date:asc",
  }),
]);

const story = storyResponse.story;
const events = eventsResponse.data.stories;
</script>
