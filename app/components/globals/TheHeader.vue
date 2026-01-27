<template>
  <header class="header" :class="{ full: !windowTop }">
    <div class="header-container">
      <NuxtLink class="logo" :to="localePath('/')" @click="closeMenu">
        <UILogosLogo />
      </NuxtLink>

      <div class="menu">
        <!-- dropdown links layout -->
        <GlobalsDropDown
          v-for="(dropdown, index) in navData?.dropdowns"
          :key="index"
          :title="dropdown.text"
        >
          <li v-for="(link, indexText) in dropdown.links" :key="indexText">
            <a
              v-if="link.link.linktype === 'url'"
              class="menu-sublink"
              :href="link.link.cached_url"
              target="_blank"
            >
              {{ link.text }}
            </a>
            <NuxtLink
              v-else
              class="menu-sublink"
              :to="correctUrl(link.link.cached_url)"
            >
              {{ link.text }}
            </NuxtLink>
          </li>
        </GlobalsDropDown>

        <!-- single links layout -->
        <NuxtLink
          v-for="(link, index) in navData?.links"
          :key="index + '-link'"
          class="menu-link"
          :to="correctUrl(link.link.cached_url)"
        >
          {{ link.text }}
        </NuxtLink>
      </div>

      <!-- lang switcher -->
      <NuxtLink class="btn-lang" :to="switchLocalePath(switchLocale)">
        {{ switchLocale }}
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
const { locale } = useI18n();
const localePath = useLocalePath();
const switchLocalePath = useSwitchLocalePath();
const { navData, correctUrl } = useNavigation();

const windowTop = ref(true);

const switchLocale = computed(() => (locale.value === "fr" ? "en" : "fr"));

function closeMenu() {
  // placeholder
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

function handleScroll() {
  windowTop.value = window.scrollY === 0;
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

    &-sublink {
      color: $white;
      display: block;
      font-size: 1.4rem;
      font-weight: normal;
      padding: 1rem 2rem;
      position: relative;
      text-decoration: none;

      &::after {
        background-color: $white;
        bottom: 0;
        content: "";
        display: block;
        height: 2px;
        left: 0;
        position: absolute;
        width: 20px;
      }

      &:hover {
        color: $charcoal-grey;
        background: $white;
      }
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

  .menu-sublink.router-link-exact-active {
    background: $white;
    color: $charcoal-grey;
  }
}
</style>
