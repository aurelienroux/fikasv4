<template>
  <div
    class="menu-link"
    @mouseenter="showLinks = true"
    @mouseleave="showLinks = false"
  >
    {{ title }}
    <UIIconsIconMenuDrop />
    <ul class="menu-dropdown" :class="{ show: showLinks }">
      <slot />
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();

const showLinks = ref(false);
</script>

<style lang="scss" scoped>
.menu-link {
  align-items: center;
  color: $white;
  cursor: pointer;
  display: flex;
  height: 100%;
  padding: 0 2rem;
  position: relative;
  text-decoration: none;
}

.menu-dropdown {
  background-color: $aqua-blue;
  display: none;
  left: 0;
  list-style-type: none;
  padding: 0;
  position: absolute;
  top: 100%;
  width: 100%;

  &.show {
    display: block;
  }
}
</style>
