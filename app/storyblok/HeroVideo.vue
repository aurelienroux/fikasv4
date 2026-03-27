<template>
  <div v-editable="blok" class="hero-video">
    <div
      v-if="!blok.video_id"
      class="image-container"
      :style="{ backgroundImage: `url('${blok.image?.filename}')` }"
    ></div>
    <div v-else class="video-container">
      <!-- Mobile: thumbnail until click -->
      <div v-if="!mobileActivated" class="video-mobile facade" @click="mobileActivated = true">
        <img
          :src="thumbnailUrl"
          :alt="blok.title || 'Video'"
          class="facade__img"
        />
        <div class="facade__play" aria-label="Lire la vidéo">&#9654;</div>
      </div>
      <iframe
        v-else
        class="video-mobile"
        width="640"
        height="360"
        :src="videoLinkMobile"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; loop"
        allowfullscreen
        title="Vidéo Fikas Festival"
      />
      <!-- Desktop: thumbnail then auto-swap after load -->
      <img
        v-if="!desktopActivated"
        :src="thumbnailUrl"
        :alt="blok.title || 'Video'"
        class="video-desktop facade__img"
      />
      <iframe
        v-else
        class="video-desktop"
        width="640"
        height="360"
        :src="videoLinkDesktop"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; loop"
        allowfullscreen
        title="Vidéo Fikas Festival"
      />
    </div>
    <div class="overlay">
      <h1 class="seo-title">{{ blok.title }}</h1>
      <a href="#layout" aria-label="Défiler vers le contenu">
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

const mobileActivated = ref(false)
const desktopActivated = ref(false)

const thumbnailUrl = computed(() =>
  `https://img.youtube.com/vi/${props.blok.video_id}/maxresdefault.jpg`
)

const videoLinkMobile = computed(() =>
  `https://www.youtube.com/embed/${props.blok.video_id}?showinfo=0&autoplay=1&mute=1&modestbranding=1&controls=1&loop=1&playlist=${props.blok.video_id}`
)

const videoLinkDesktop = computed(() =>
  `https://www.youtube.com/embed/${props.blok.video_id}?showinfo=0&autoplay=1&mute=1&modestbranding=1&controls=0&loop=1&playlist=${props.blok.video_id}`
)

onMounted(() => {
  // Delay desktop iframe load until after page is interactive
  setTimeout(() => {
    desktopActivated.value = true
  }, 3000)
})
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

.facade {
  cursor: pointer;
  position: relative;

  &__img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }

  &__play {
    align-items: center;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    color: $white;
    display: flex;
    font-size: 3rem;
    height: 6rem;
    justify-content: center;
    left: 50%;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 6rem;
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
