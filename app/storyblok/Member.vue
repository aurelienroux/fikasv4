<template>
  <div v-editable="blok" class="member">
    <p class="member__title">{{ blok.title }}</p>
    <div class="member__name" v-html="richtext"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { renderRichText } from '@storyblok/vue'

interface MemberBlok {
  title?: string
  name?: unknown
}

const props = defineProps<{ blok: MemberBlok }>()

const richtext = computed(() =>
  props.blok.name ? renderRichText(props.blok.name as Parameters<typeof renderRichText>[0]) : ''
)
</script>

<style lang="scss" scoped>
.member {
  flex-basis: 100%;
  margin-bottom: 2.5rem;
  padding-right: 2rem;

  @include for-tablet-portrait-up {
    flex-basis: 50%;
  }

  &__title {
    color: $aqua-blue;
    font-family: $font-secondary;
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  &__name {
    font-family: $font-primary;
    font-size: 2rem;
  }
}
</style>

<style lang="scss">
.member__name {
  a {
    text-decoration: none;
  }

  .link-styling {
    color: $perrywinkle;
    text-decoration: none;
  }
}
</style>
