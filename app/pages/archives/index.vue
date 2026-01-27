<template>
  <div>
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();

// French (default): "archives" | English: "en/archives"
const slug = locale.value === "en" ? "en/archives" : "archives";

const { story } = await useAsyncStoryblok(slug, {
  api: {
    version: "draft",
  },
  bridge: {},
});
</script>
