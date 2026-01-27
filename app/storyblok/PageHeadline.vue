<template>
  <div class="headline" v-editable="blok">
    <p class="headline__paragraph" v-html="richtext"></p>
    <NuxtLink
      v-if="blok.show_button && linkUrl"
      class="headline__button"
      :to="linkUrl"
    >
      <UIButtonsBtn>{{ blok.button_text }}</UIButtonsBtn>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  blok: {
    text?: any
    show_button?: boolean
    link?: { cached_url: string }
    button_text?: string
  }
}>()

const richtext = computed(() => {
  if (!props.blok.text) return ''
  return renderRichText(props.blok.text)
})

const linkUrl = computed(() => {
  const url = props.blok.link?.cached_url
  if (!url) return ''
  if (url.startsWith('http') || url.startsWith('/')) return url
  return '/' + url
})
</script>

<style lang="scss" scoped>
.headline {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 4rem 0;

  &__paragraph {
    color: $charcoal-grey;
    font-family: $font-primary;
    font-size: 2.4rem;
    line-height: 1.33;
    max-width: 120rem;
    padding: 2rem;
    position: relative;
  }

  &__button {
    padding: 2rem 3rem;
  }
}
</style>
