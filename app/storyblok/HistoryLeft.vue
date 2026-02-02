<script setup lang="ts">
interface HistoryLeftBlok {
  year: string
  image: { filename: string; alt?: string }
  text: string
}

defineProps<{ blok: HistoryLeftBlok }>()
</script>

<template>
  <div v-editable="blok" class="hleft">
    <div class="hleft__image">
      <div
        class="hleft__cover"
        :style="{ backgroundImage: `url('${blok.image.filename}')` }"
      ></div>
      <div class="hleft__year">
        {{ blok.year }}
      </div>
    </div>
    <div class="hleft__text">
      {{ blok.text }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hleft {
  display: flex;
  flex-direction: column;
  margin-bottom: 8rem;

  @include for-tablet-landscape-up {
    flex-direction: row;
  }

  &__image,
  &__text {
    flex: 1;
  }

  &__image {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 22.5rem;

    @include for-tablet-portrait-up {
      grid-template-rows: 35rem;
    }

    @include for-tablet-landscape-up {
      grid-template-rows: 45rem;
    }
  }

  &__cover {
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    grid-column-end: 3;
    grid-column-start: 1;
    grid-row-end: -1;
    grid-row-start: 1;
  }

  &__year {
    color: $very-light-purple;
    font-family: $font-secondary;
    font-size: 6.5rem;
    font-weight: bold;
    grid-column-end: -1;
    grid-column-start: 2;
    grid-row-end: -1;
    grid-row-start: 1;
    margin-top: 8rem;

    @include for-tablet-portrait-up {
      font-size: 10rem;
    }
  }

  &__text {
    color: $charcoal-grey;
    font-family: $font-primary;
    font-size: 20px;
    line-height: 1.4;
    padding-top: 2rem;

    @include for-tablet-landscape-up {
      padding-left: 2.5rem;
      padding-top: 19rem;
    }
  }
}
</style>
