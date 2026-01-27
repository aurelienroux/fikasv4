<template>
  <div>
    <GlobalsTheHeaderMobile />
    <GlobalsTheHeader />
    <slot />
    <GlobalsTheFooter />
  </div>
</template>

<script setup lang="ts"></script>

<style>
/* Global base styles */
html {
  font-size: 10px;
  scroll-behavior: smooth;
}

body.body-fixed {
  position: fixed;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

img {
  max-width: 100%;
}
</style>
