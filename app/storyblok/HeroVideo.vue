<template>
  <div v-editable="blok" class="hero-video">
    <div
      v-if="!blok.video_id"
      class="image-container"
      :style="{ backgroundImage: `url('${blok.image?.filename}')` }"
    ></div>
    <div v-else class="video-container">
      <iframe
        class="video-mobile"
        width="640"
        height="360"
        :src="videoLinkMobile"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; loop"
        allowfullscreen
      >
      </iframe>
      <iframe
        class="video-desktop"
        width="640"
        height="360"
        :src="videoLinkDesktop"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; loop"
        allowfullscreen
      >
      </iframe>
    </div>
    <div class="overlay">
      <h1 class="seo-title">{{ blok.title }}</h1>
      <a href="#layout">
        <UIIconsIconVideoScroll class="video-scroll" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  blok: {
    video_id?: string
    image?: { filename: string }
    title?: string
  }
}>()

const videoLinkMobile = computed(() =>
  `https://www.youtube.com/embed/${props.blok.video_id}?showinfo=0&autoplay=0&mute=1&modestbranding=1&controls=1&loop=1&playlist=${props.blok.video_id}`
)

const videoLinkDesktop = computed(() =>
  `https://www.youtube.com/embed/${props.blok.video_id}?showinfo=0&autoplay=1&mute=1&modestbranding=1&controls=0&loop=1&playlist=${props.blok.video_id}`
)
</script>

<style lang="scss" scoped>
.hero-video {
  height: 34rem;
  margin-top: 6rem;
  overflow: hidden;
  width: 100%;

  @include for-tablet-landscape-up {
    margin-top: 0;
    height: 100vh;
  }
}

.image-container {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 34rem;
  width: 100%;

  @include for-tablet-landscape-up {
    height: 100%;
  }
}

.video-container {
  background: $black;
  height: 34rem;
  position: relative;
  width: 100%;

  @include for-tablet-landscape-up {
    height: 100%;
  }
}

.video-mobile {
  bottom: 0;
  display: initial;
  height: 34rem;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transform: scale(1.6);
  width: 100%;

  @include for-tablet-landscape-up {
    display: none;
  }
}

.video-desktop {
  bottom: 0;
  display: none;
  height: 100%;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transform: scale(1.6);
  width: 100%;

  @include for-tablet-landscape-up {
    display: initial;
  }
}

.overlay {
  align-items: flex-end;
  bottom: 0;
  display: none;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;

  @include for-tablet-landscape-up {
    display: flex;
  }
}

.seo-title {
  position: absolute;
  bottom: 1000rem;
}

.video-scroll {
  cursor: pointer;
  margin: 4rem;

  display: none;
  @include for-tablet-landscape-up {
    display: initial;
  }
}
</style>
