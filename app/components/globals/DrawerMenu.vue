<template>
  <div class="drawer">
    <div class="title" @click="open = !open">
      {{ title }}
      <UIIconsIconDrawer :class="{ open }" />
    </div>
    <div class="container" :class="{ open }">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();

const open = ref(false);
</script>

<style lang="scss" scoped>
.title {
  padding: 1.5rem 0;
  display: flex;
  justify-content: space-between;
}

.container {
  display: flex;
  flex-direction: column;
  height: 0;
  overflow: hidden;

  &.open {
    height: initial;
  }
}

.menu-sublink {
  color: $white;
  font-size: 1.4rem;
  font-weight: normal;
  padding: 1.5rem 4rem;
  text-decoration: none;
}
</style>
