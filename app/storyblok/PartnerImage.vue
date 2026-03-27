<template>
  <a v-editable="blok" :href="blok.link?.url" target="_blank" class="partner-image">
    <img
      class="partner-image__image"
      :src="resizedImageUrl"
      :alt="blok.image?.alt"
    />
  </a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { resizeImg } = useStoryblokImage()

interface PartnerImageBlok {
  image?: { filename: string; alt?: string }
  link?: { url: string }
}

const props = defineProps<{ blok: PartnerImageBlok }>()

const resizedImageUrl = computed(() => {
  if (!props.blok.image?.filename) return ''
  return resizeImg(props.blok.image.filename, 300)
})
</script>

<style lang="scss" scoped>
.partner-image {
  flex-basis: calc(30rem - 6rem);
  margin: 2rem;
  text-align: center;

  &__image {
    height: 14rem;
    max-width: 100%;
    object-fit: contain;
  }
}
</style>
