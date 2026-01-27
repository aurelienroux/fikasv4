<template>
  <header class="header-mobile">
    <div class="top">
      <NuxtLink :to="localePath('/')" @click="closeMenu">
        <UILogosLogo />
      </NuxtLink>
      <button class="menu-toggle" @click="displayMenu">
        <span v-if="!openMenu">☰</span>
        <span v-else>✕</span>
      </button>
    </div>

    <div class="menu" :class="{ open: openMenu }">
      <NuxtLink
        v-for="(link, index) in navLinks"
        :key="index"
        class="menu-link"
        :to="link.to"
        @click="closeMenu"
      >
        {{ link.text }}
      </NuxtLink>

      <NuxtLink
        class="btn-lang"
        :to="switchLocalePath(switchLocale)"
        @click="closeMenu"
      >
        {{ switchLocale }}
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const openMenu = ref(false)

const switchLocale = computed(() => (locale.value === 'fr' ? 'en' : 'fr'))

// Placeholder nav links - will be replaced with Storyblok data later
const navLinks = [
  { to: '/', text: 'Accueil' },
  { to: '/programmation', text: 'Programmation' },
  { to: '/festival', text: 'Festival' },
]

function displayMenu() {
  openMenu.value = !openMenu.value
}

function closeMenu() {
  openMenu.value = false
}
</script>

<style lang="scss" scoped>
.header-mobile {
  color: $white;
  font-family: $font-secondary;
  font-size: 1.8rem;
  font-weight: bold;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  @include for-desktop-up {
    display: none;
  }

  & .top {
    background-color: $aqua-blue;
    border: none;
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    position: relative;
    width: 100%;
    z-index: 10;
  }

  & .menu-toggle {
    background: transparent;
    border: none;
    color: $white;
    cursor: pointer;
    font-size: 2.4rem;
  }

  & .menu {
    background-color: $aqua-blue;
    border: none;
    bottom: 0;
    height: 100vh;
    left: -100%;
    padding: 2rem;
    position: absolute;
    top: 6rem;
    transition: 0.3s;
    width: 100%;
    z-index: 5;

    &.open {
      left: 0;
    }
  }

  & .menu-link,
  & .btn-lang {
    color: $white;
    padding: 1.5rem 0;
  }

  & .menu-link {
    display: block;
    text-decoration: none;
  }

  & .btn-lang {
    display: inline-block;
    text-decoration: none;
    text-transform: uppercase;
    width: 100%;
  }
}
</style>
