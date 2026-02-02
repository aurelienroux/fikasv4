<script setup lang="ts">
interface HistoryRightBlok {
  year: string
  image: { filename: string; alt?: string }
  text: string
}

defineProps<{ blok: HistoryRightBlok }>()
</script>

<template>
  <div v-editable="blok" class="hright">
    <div class="hright__image">
      <div
        class="hright__cover"
        :style="{ backgroundImage: `url('${blok.image.filename}')` }"
      ></div>
      <div class="hright__year">
        {{ blok.year }}
      </div>
    </div>
    <div class="hright__text">
      {{ blok.text }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.hright {
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
      grid-template-columns: 1fr 1fr 2fr;
      grid-template-rows: 45rem;
      order: 1;
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

    @include for-tablet-landscape-up {
      font-size: 10rem;
      grid-column-end: -1;
      grid-column-start: 2;
    }
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

    @include for-tablet-landscape-up {
      grid-column-end: 3;
      grid-column-start: 1;
    }
  }

  &__text {
    color: $charcoal-grey;
    font-family: $font-primary;
    font-size: 20px;
    line-height: 1.4;
    padding-top: 2rem;

    @include for-tablet-landscape-up {
      order: 0;
      padding-right: 2.5rem;
      padding-top: 19rem;
    }
  }
}
</style>
