<template>
  <div v-editable="blok" class="partner-text">
    <StoryblokRichText v-if="blok.text" :doc="blok.text" />
  </div>
</template>

<script setup lang="ts">
interface PartnerTextBlok {
  text?: any
}

defineProps<{ blok: PartnerTextBlok }>()
</script>

<style lang="scss" scoped>
.partner-text {
  flex-basis: calc(50% - 2rem);
  font-family: $font-primary;
  font-size: 2rem;
  margin: 1rem;
  min-width: 300px;
}
</style>

<style lang="scss">
.partner-text {
  a {
    text-decoration: none;
  }

  .link-styling {
    color: $perrywinkle;
    text-decoration: none;
  }
}
</style>
