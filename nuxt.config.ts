// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/i18n",
    "@nuxtjs/google-fonts",
    [
      "@storyblok/nuxt",
      {
        accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
      },
    ],
  ],
  css: ["~/assets/scss/index.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
            @use "~/assets/scss/_variables.scss" as *;
            @use "~/assets/scss/_mixins.scss" as *;
          `,
        },
      },
    },
  },
  googleFonts: {
    families: {
      Karla: [400, 700],
      Rubik: [400, 700],
      "Covered By Your Grace": true,
    },
  },
  storyblok: {
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  },
});
