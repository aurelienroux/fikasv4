<template>
  <a
    class="link"
    :class="btnStyle"
    href="https://www.youtube.com/channel/UClZRpUy_me2li9HSYUw1HnQ"
    target="_blank"
    rel="noopener noreferrer"
  >
    <svg viewBox="0 0 40 40">
      <g>
        <polygon class="st0" points="17.95,22.97 23.18,20 17.95,17.03 	" />
        <path
          class="st0"
          d="M20,0C8.95,0,0,8.95,0,20s8.95,20,20,20c11.05,0,20-8.95,20-20S31.05,0,20,0z M29.58,24.85
		c-0.23,0.87-0.91,1.55-1.77,1.78C26.25,27.05,20,27.05,20,27.05s-6.25,0-7.81-0.42c-0.86-0.23-1.54-0.91-1.77-1.78
		C10,23.28,10,20,10,20s0-3.28,0.42-4.85c0.23-0.87,0.91-1.55,1.77-1.78c1.56-0.42,7.81-0.42,7.81-0.42s6.25,0,7.81,0.42
		c0.86,0.23,1.54,0.91,1.77,1.78C30,16.72,30,20,30,20S30,23.28,29.58,24.85z"
        />
      </g>
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
