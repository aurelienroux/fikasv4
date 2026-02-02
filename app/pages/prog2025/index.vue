<template>
  <main class="container">
    <StoryblokComponent v-if="story" :blok="story.content" />
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n();

// French (default): "prog2025" | English: "en/prog2025"
const slug = locale.value === "en" ? "en/prog2025" : "prog2025";

const { story } = await useAsyncStoryblok(slug, {
  api: { version: "draft" },
  bridge: {},
});
</script>
