<template>
  <div class="full-event">
    <ProgEventsHeroEvent :story="story" />

    <div class="layout">
      <div class="layout-bar"></div>
      <img src="~/assets/images/bg1.svg" alt="layout decoration" />

      <div class="container">
        <ProgEventsBands
          :bands="story?.content?.eventBands"
          :description="story?.content?.description"
        />
        <ProgEventsDetails :story="story" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { locale } = useI18n();

const slug =
  locale.value === "en"
    ? `en/evenements/${route.params.id}`
    : `evenements/${route.params.id}`;

const { story } = await useAsyncStoryblok(slug, {
  api: {
    version: "draft",
  },
  bridge: {},
});

useSeoMeta({
  title: () => `Fikas - ${story.value?.name}`,
  ogTitle: () => story.value?.name,
  ogImage: () => story.value?.content?.image?.filename,
  ogUrl: () => useRequestURL().href,
  ogType: "website",
});
</script>

<style lang="scss" scoped>
.full-event {
  .layout {
    align-items: center;
    display: flex;
    flex-direction: column;
    position: relative;

    &-bar {
      background-color: $light-teal;
      height: 8rem;
      width: 0.5rem;

      @include for-tablet-landscape-up {
        width: 0.2rem;
      }
    }

    img {
      left: 0;
      max-width: 60rem;
      position: absolute;
      top: 8rem;
      width: 75%;

      @include for-tablet-portrait-up {
        width: 50%;
      }

      @include for-desktop-up {
        width: 33%;
      }
    }
  }

  .container {
    display: flex;
    flex-direction: column;
    max-width: 120rem;
    padding: 7rem 2rem 0;
    position: relative;
    width: 100%;

    @include for-tablet-landscape-up {
      flex-direction: row;
    }
  }
}
</style>
