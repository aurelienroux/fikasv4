<template>
  <div>
    <StoryblokComponent v-if="story" :blok="story.content" />
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n();

// French (default): "invites" | English: "en/invites"
const slug = locale.value === "en" ? "en/invites" : "invites";

const { story } = await useAsyncStoryblok(slug, {
  api: {
    version: "draft",
  },
  bridge: {},
});
</script>
