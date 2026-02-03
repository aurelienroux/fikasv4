<template>
  <div>
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();

const language = locale.value === "fr" ? undefined : locale.value;

const { story } = await useAsyncStoryblok("contact", {
  api: {
    version: "draft",
    language,
  },
  bridge: {},
});
</script>
