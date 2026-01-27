<template>
  <div class="scroll-top" @click="scrollToTop">
    <IconVideoScroll />
  </div>
</template>

<script setup lang="ts">
import IconVideoScroll from "../Icons/IconVideoScroll.vue";

defineProps<{
  btnStyle?: string;
}>();

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<style lang="scss" scoped>
.scroll-top {
  align-items: center;
  background-color: $perrywinkle;
  border-radius: 50%;
  cursor: pointer;
  display: inline-flex;
  height: 6rem;
  justify-content: center;
  width: 6rem;

  .icon {
    transform: rotate(180deg);
    width: 3rem;
  }
}
</style>
