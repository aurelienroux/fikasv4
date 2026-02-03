<template>
  <div class="bands">
    <div v-for="(band, index) in bands" :key="index" class="band">
      <h2 class="band__title">{{ band.title }}</h2>
      <p class="band__headline">{{ band.headline }}</p>
      <p class="band__description">{{ band.description }}</p>

      <div
        v-for="(review, reviewIndex) in band.reviews"
        :key="reviewIndex"
        class="band__review"
      >
        <p class="comment">{{ review.comment }}</p>
        <p class="author">{{ review.author }}</p>
      </div>

      <iframe
        v-if="band.video_id"
        class="band__video"
        width="640"
        height="388"
        :src="`https://www.youtube.com/embed/${band.video_id}?showinfo=0&autoplay=0&mute=0&modestbranding=1&controls=1&loop=0`"
        frameborder="0"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />

      <div class="band__social">
        <a
          v-if="band.spotify?.url"
          class="share__button"
          target="_blank"
          :href="band.spotify.url"
        >
          <UIIconsIconSpotify />
          Spotify
        </a>
        <a
          v-if="band.facebook?.url"
          class="share__button"
          target="_blank"
          :href="band.facebook.url"
        >
          <UIIconsIconFacebook />
          Facebook
        </a>
        <a
          v-if="band.twitter?.url"
          class="share__button"
          target="_blank"
          :href="band.twitter.url"
        >
          <UIIconsIconTwitter />
          Twitter
        </a>
        <a
          v-if="band.instagram?.url"
          class="share__button"
          target="_blank"
          :href="band.instagram.url"
        >
          <UIIconsIconInstagram />
          Instagram
        </a>
      </div>
    </div>

    <div v-if="description" class="bands__description" v-html="richtext" />
  </div>
</template>

<script setup lang="ts">
interface Review {
  comment: string;
  author: string;
}

interface SocialLink {
  url?: string;
}

interface Band {
  title: string;
  headline?: string;
  description?: string;
  reviews?: Review[];
  video_id?: string;
  spotify?: SocialLink;
  facebook?: SocialLink;
  twitter?: SocialLink;
  instagram?: SocialLink;
}

const props = defineProps<{
  bands?: Band[];
  description?: any;
}>();

const richtext = computed(() =>
  props.description ? renderRichText(props.description) : "",
);
</script>

<style lang="scss" scoped>
.bands {
  flex: 2;
  order: 1;

  @include for-tablet-landscape-up {
    order: 0;
    padding-right: 13rem;
  }

  &__description {
    color: $charcoal-grey;
    font-family: $font-primary;
    font-size: 24px;
    line-height: 1.33;
    padding: 8rem 0;
  }

  .band {
    border-bottom: 2px solid $light-teal;
    padding: 8rem 0;

    &:first-of-type {
      padding-top: 0;
    }

    &__title {
      color: $aqua-blue;
      font-family: $font-secondary;
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 3rem;
      text-transform: uppercase;
    }

    &__headline {
      font-weight: 700;
    }

    &__headline,
    &__description {
      color: var(--charcoal-grey);
      font-family: $font-primary;
      font-size: 2.4rem;
      line-height: 1.33;
    }

    &__description {
      margin-bottom: 4rem;
    }

    &__review {
      font-family: $font-primary;
      margin-bottom: 3.5rem;

      .comment {
        color: $very-light-purple;
        font-size: 3rem;
        font-style: italic;
        font-weight: bold;
      }

      .author {
        color: var(--charcoal-grey);
        font-size: 20px;
        line-height: 1.6;
      }
    }

    &__video {
      margin-bottom: 4rem;
      width: 100%;
    }

    &__social {
      font-family: $font-primary;
      font-size: 2.4rem;
      line-height: 1.33;

      a {
        color: $perrywinkle;
        margin-right: 2rem;
        text-decoration: none;
      }
    }

    .share__button {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 2rem;
      white-space: nowrap;
    }
  }
}
</style>
