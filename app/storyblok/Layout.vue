<template>
  <div id="layout" class="layout" v-editable="blok">
    <div class="layout__bar"></div>
    <img
      class="layout__image layout__image--top"
      src="~/assets/images/bg1.svg"
      alt="layout decoration"
    />
    <img
      class="layout__image layout__image--bottom"
      src="~/assets/images/bg1.svg"
      alt="layout decoration"
    />
    <StoryblokComponent
      v-for="item in blok.components"
      :key="item._uid"
      :blok="item"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  blok: {
    components?: Array<{ _uid: string; component: string }>
  }
}>()
</script>

<style lang="scss" scoped>
.layout {
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;

  &__bar {
    background-color: $light-teal;
    height: 8rem;
    width: 0.5rem;

    @include for-tablet-landscape-up {
      width: 0.2rem;
    }
  }

  &__image {
    max-width: 60rem;
    position: absolute;
    width: 75%;
    z-index: -1;

    @include for-tablet-portrait-up {
      width: 50%;
    }

    @include for-desktop-up {
      width: 33%;
    }

    &--top {
      left: 0;
      top: 8rem;
    }

    &--bottom {
      bottom: 35rem;
      right: 0;
    }
  }
}
</style>
