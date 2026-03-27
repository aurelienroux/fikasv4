<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
const i18nHead = useLocaleHead()
useHead(() => ({
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
}))
</script>
