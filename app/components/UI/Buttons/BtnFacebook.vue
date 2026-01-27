<template>
  <a
    class="link"
    :class="btnStyle"
    href="https://www.facebook.com/fikasfest/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg viewBox="0 0 40 40">
      <path
        class="st0"
        d="M20,0C8.95,0,0,8.95,0,20c0,11.05,8.95,20,20,20c11.05,0,20-8.95,20-20C40,8.95,31.05,0,20,0z M25.19,13.32
	l-1.88,0c-1.48,0-1.76,0.7-1.76,1.73v2.27h3.52l-0.46,3.56h-3.06V30h-3.67v-9.12h-3.07v-3.56h3.07V14.7c0-3.04,1.86-4.7,4.57-4.7
	c1.3,0,2.42,0.1,2.74,0.14V13.32z"
      />
    </svg>
  </a>
</template>

<script setup lang="ts">
defineProps<{
  btnStyle?: string;
}>();
</script>

<style lang="scss" scoped>
.link {
  background: $white;
  border-radius: 100%;
  display: inline-block;
  height: 4rem;
  width: 4rem;

  svg {
    fill: $perrywinkle;
  }

  &--footer {
    background: $topaz;

    svg {
      fill: $white;
    }
  }
}
</style>
