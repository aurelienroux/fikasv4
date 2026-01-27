<template>
  <header class="header" :class="{ full: !windowTop }">
    <div class="header-container">
      <NuxtLink class="logo" :to="localePath('/')" @click="closeMenu">
        <UILogosLogo />
      </NuxtLink>

      <div class="menu">
        <NuxtLink
          v-for="(link, index) in navLinks"
          :key="index"
          class="menu-link"
          :to="link.to"
        >
          {{ link.text }}
        </NuxtLink>
      </div>

      <NuxtLink class="btn-lang" :to="switchLocalePath(switchLocale)">
        {{ switchLocale }}
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const windowTop = ref(true)

const switchLocale = computed(() => (locale.value === 'fr' ? 'en' : 'fr'))

// Placeholder nav links - will be replaced with Storyblok data later
const navLinks = [
  { to: '/', text: 'Accueil' },
  { to: '/programmation', text: 'Programmation' },
  { to: '/festival', text: 'Festival' },
]

function closeMenu() {
  // placeholder
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  windowTop.value = window.scrollY === 0
}
</script>

<style lang="scss" scoped>
.header {
  align-items: center;
  background-color: transparent;
  color: $white;
  display: none;
  font-family: $font-secondary;
  font-size: 1.8rem;
  font-weight: bold;
  height: 8rem;
  position: fixed;
  width: 100%;
  z-index: 100;
  transition: 0.3s;

  &.full {
    background-color: $aqua-blue;
  }

  @include for-desktop-up {
    display: initial;
  }

  &-container {
    display: flex;
    height: 100%;
    margin: 0 auto;
    max-width: 120rem;
    padding: 0 2rem;
    position: relative;
    width: 100%;
  }

  .logo {
    align-items: center;
    display: flex;
    margin-right: 2rem;
  }

  & .menu {
    align-items: stretch;
    display: flex;
    flex: 1;

    &-link {
      align-items: center;
      color: $white;
      cursor: pointer;
      display: flex;
      height: 100%;
      padding: 0 2rem;
      position: relative;
      text-decoration: none;
    }

    &-active {
      border-bottom: 2px solid $white;
    }
  }

  & .btn-lang {
    align-items: center;
    background: transparent;
    color: $white;
    display: flex;
    padding: 0 2rem;
    position: relative;
    right: -2rem;
    text-decoration: none;
    text-transform: uppercase;
  }
}
</style>
