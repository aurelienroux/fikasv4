<template>
  <div>
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();

// French (default): "prog-test" | English: "en/prog-test"
const slug = locale.value === "en" ? "en/prog-test" : "prog-test";

const { story } = await useAsyncStoryblok(slug, {
  api: {
    version: "draft",
  },
  bridge: {},
});
</script>
