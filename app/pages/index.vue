<template>
  <div>
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();

// French (default): "home" | English: "en/home"
const slug = locale.value === "en" ? "en/home" : "home";

const { story } = await useAsyncStoryblok(slug, {
  api: {
    version: "draft",
  },
  bridge: {},
});
</script>
