<template>
  <div class="archive">
    <div class="archive__selector">
      <h2 class="title">
        {{ selectedYear }}
        <div class="layout-bar"></div>
      </h2>
      <div class="archive__container">
        <img
          class="archive__image"
          :src="resizeImg(selectedYearImage.filename)"
          :alt="selectedYearImage.alt"
        />
        <div class="archive__buttons">
          <button
            v-for="(year, index) in blok.components"
            :key="index"
            class="archive__button"
            :class="{ active: year.title === selectedYear }"
            @click="selectYear(year.title, year.image)"
          >
            {{ year.title }}
          </button>
        </div>
      </div>
    </div>
    <ArchivesArchiveYear
      v-for="(year, index) in blok.components"
      :key="index"
      :data="year"
      :selected="selectedYear"
    />
  </div>
</template>

<script setup lang="ts">
interface YearImage {
  filename: string
  alt: string
}

interface YearComponent {
  title: string
  image: YearImage
}

const props = defineProps<{
  blok: {
    components: YearComponent[]
  }
}>()

const selectedYear = ref(props.blok.components[0].title)
const selectedYearImage = ref<YearImage>(props.blok.components[0].image)

const selectYear = (year: string, yearImage: YearImage) => {
  selectedYear.value = year
  selectedYearImage.value = yearImage
}

const resizeImg = (originalUrl: string): string => {
  return originalUrl.replace(
    'https://a.storyblok.com',
    'https://img2.storyblok.com/200x0'
  )
}
</script>

<style lang="scss" scoped>
.archive {
  max-width: 120rem;
  padding: 4rem 2rem;
  position: relative;
  width: 100%;

  &__container {
    align-items: flex-start;
    display: flex;
    justify-content: space-between;

    @include for-tablet-portrait-up {
      justify-content: flex-start;
    }
  }

  &__buttons {
    order: 0;
    display: flex;
    flex-direction: column;

    @include for-tablet-landscape-up {
      flex-direction: row;
      order: 1;
    }
  }

  &__button {
    background: transparent;
    border: none;
    border-left: 2px solid $light-teal;
    color: $perrywinkle;
    cursor: pointer;
    font-family: $font-secondary;
    font-size: 3rem;
    padding: 1.6rem 2rem;

    @include for-tablet-landscape-up {
      border: none;
      border-bottom: 2px solid $light-teal;
    }

    &.active {
      border: none;
      border-left: 4px solid $aqua-blue;
      color: $very-light-purple;
      font-weight: bold;

      @include for-tablet-landscape-up {
        border: none;
        border-bottom: 4px solid $aqua-blue;
      }
    }
  }

  &__image {
    max-width: 18rem;
    order: 1;

    @include for-tablet-landscape-up {
      margin-right: 2rem;
      order: 0;
    }
  }
}

.title {
  color: $aqua-blue;
  font-family: $font-secondary;
  font-size: 4rem;
  font-weight: 600;
  margin-bottom: 2rem;
  position: relative;
  text-transform: uppercase;

  .layout-bar {
    background-color: $light-teal;
    bottom: -1rem;
    height: 0.2rem;
    left: 0;
    position: absolute;
    width: 8rem;
  }
}
</style>
