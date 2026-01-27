<template>
  <div>
    <GlobalsTheHeaderMobile />
    <GlobalsTheHeader />
    <slot />
    <GlobalsTheFooter />
  </div>
</template>

<script setup lang="ts">
const storyblokApi = useStoryblokApi();
const navDataFR = useState<any>("nav-data-fr", () => null);
const navDataEN = useState<any>("nav-data-en", () => null);

// Fetch navigation data for both locales
await useAsyncData("navigation", async () => {
  const [responseFR, responseEN] = await Promise.all([
    storyblokApi.get("cdn/stories/navigation", { version: "draft" }),
    storyblokApi.get("cdn/stories/navigation", {
      version: "draft",
      language: "en",
    }),
  ]);

  navDataFR.value = responseFR.data.story.content;
  navDataEN.value = responseEN.data.story.content;

  return true;
});
</script>

<style>
/* Global base styles */
html {
  font-size: 10px;
  scroll-behavior: smooth;
}

body.body-fixed {
  position: fixed;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

img {
  max-width: 100%;
}
</style>
