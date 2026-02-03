<template>
  <header class="header-mobile">
    <div class="top">
      <NuxtLink :to="localePath('/')" @click="closeMenu">
        <UILogosLogo />
      </NuxtLink>
      <UIIconsIconMenu :icon-style="openMenu" @click="displayMenu" />
    </div>

    <div class="menu" :class="{ open: openMenu }">
      <!-- dropdown links layout -->
      <GlobalsDrawerMenu
        v-for="(dropdown, index) in navData?.dropdowns"
        :key="index"
        :title="dropdown.text"
      >
        <NuxtLink
          v-for="(link, indexText) in dropdown.links"
          :key="indexText"
          class="menu-sublink"
          :to="correctUrl(link.link.cached_url)"
          @click="closeMenu"
        >
          {{ link.text }}
        </NuxtLink>
      </GlobalsDrawerMenu>

      <!-- single links layout -->
      <NuxtLink
        v-for="(link, index) in navData?.links"
        :key="index + '-link'"
        class="menu-link"
        :to="correctUrl(link.link.cached_url)"
        @click="closeMenu"
      >
        {{ link.text }}
      </NuxtLink>

      <!-- lang switcher -->
      <NuxtLink
        class="btn-lang"
        :to="switchLocalePath(switchLocale)"
        @click="closeMenu"
      >
        {{ switchLocale }}
      </NuxtLink>

      <!-- newsletter -->
      <div class="news">
        <UIButtonsBtn btn-style="button--full" @click="openNewsletter">
          {{ t("newsletter.subscription") }}
        </UIButtonsBtn>
      </div>

      <!-- social -->
      <div class="social">
        <UIButtonsBtnFacebook />
        <UIButtonsBtnInsta />
        <UIButtonsBtnYoutube />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const { navData, correctUrl } = useNavigation();
const { toggleNewsletter } = useMenu();

const openMenu = ref(false);

const switchLocale = computed(() => (locale.value === "fr" ? "en" : "fr"));

function displayMenu() {
  openMenu.value = !openMenu.value;
}

function closeMenu() {
  openMenu.value = false;
}

function openNewsletter() {
  toggleNewsletter();
  closeMenu();
}

// Lock body scroll when menu is open
useHead({
  bodyAttrs: {
    class: computed(() => (openMenu.value ? "body-fixed" : "")),
  },
});
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

  & .news {
    display: block;
    margin: 4rem 0;
    text-align: center;
  }

  & .social {
    display: flex;
    justify-content: center;

    a {
      margin: 0 2rem;
    }
  }
}

.menu-sublink {
  color: $white;
  font-size: 1.4rem;
  font-weight: normal;
  padding: 1.5rem 4rem;
  text-decoration: none;
  display: block;
}
</style>
