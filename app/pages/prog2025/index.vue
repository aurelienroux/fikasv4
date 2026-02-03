<template>
  <main class="container">
    <StoryblokComponent v-if="story" :blok="story.content" />
  </main>
</template>

<script setup lang="ts">
const { locale } = useI18n();

const language = locale.value === "fr" ? undefined : locale.value;

const { story } = await useAsyncStoryblok("prog2025", {
  api: { version: "draft", language },
  bridge: {},
});
</script>
