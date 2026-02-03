<template>
  <div
    v-if="showBanner"
    v-editable="blok"
    class="cookies"
  >
    <p>
      {{ blok.content }}
      <NuxtLink v-if="blok.link?.cached_url" :to="blok.link.cached_url">
        {{ blok.policy }}
      </NuxtLink>
    </p>

    <button class="button" @click="consentAndCreateCookie">
      {{ t('cookies.accept') }}
    </button>
    <button class="button" @click="hideCookiesConsent">
      {{ t('cookies.decline') }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  blok: {
    content?: string
    link?: { cached_url: string }
    policy?: string
  }
}>()

const { t } = useI18n()
const { displayCookiesConsentFromStore, hideCookiesConsent, consentAndCreateCookie, hasCookieConsent } = useCookiesConsent()

const showBanner = computed(() => {
  return displayCookiesConsentFromStore.value && !hasCookieConsent.value
})
</script>

<style lang="scss" scoped>
.cookies {
  position: fixed;
  right: 20px;
  bottom: 20px;
  left: 20px;
  z-index: 1000;
  font-family: $font-primary;
  padding: 1.5rem 2.5rem;
  font-size: 1.4rem;
  border-radius: 15px;
  line-height: 1.3;
  background-color: $very-light-purple;

  @include for-tablet-portrait-up {
    left: inherit;
    max-width: 400px;
  }
}

.button {
  border: 0.2rem solid $topaz;
  border-radius: 100px;
  margin: 20px 20px 10px 0;
  background: $white;
  padding: 10px 20px;
  font-weight: 700;
  color: $topaz;
  cursor: pointer;
}
</style>
