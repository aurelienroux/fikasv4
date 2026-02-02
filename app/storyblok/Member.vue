<template>
  <div v-editable="blok" class="member">
    <p class="member__title">{{ blok.title }}</p>
    <div v-if="blok.name" class="member__name">
      <StoryblokRichText :doc="blok.name" />
    </div>
  </div>
</template>

<script setup lang="ts">

interface MemberBlok {
  title?: string
  name?: unknown
}

defineProps<{ blok: MemberBlok }>()
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

}
</style>

<style lang="scss">
.member__name {
  font-family: $font-primary;
  font-size: 2rem;

  a {
    text-decoration: none;
  }

  .link-styling {
    color: $perrywinkle;
    text-decoration: none;
  }
}
</style>
