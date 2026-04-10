// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/google-fonts",
    [
      "@storyblok/nuxt",
      {
        accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
      },
    ],
    "@nuxtjs/i18n",
    "@nuxt/scripts",
    "@nuxtjs/sitemap",
  ],
  site: {
    url: "https://fikasfest.com",
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Fikas Festival",
      meta: [
        {
          name: "description",
          content:
            "Fikas Festival - Festival de musique et de culture scandinave à Montréal",
        },
        {
          name: "facebook-domain-verification",
          content: "0vnpgf8gu1rit17z825bbr0bs7h7b5",
        },
        {
          name: "google-site-verification",
          content: "jwuFhmAHcGsnE4qHFHuV2m-eyYZBgcvjlC7A6qEgRHc",
        },
      ],
      link: [
        { rel: "preconnect", href: "https://a.storyblok.com" },
        { rel: "preconnect", href: "https://img2.storyblok.com" },
      ],
    },
  },
  runtimeConfig: {
    public: {
      metapixelDefaultId: "", // Set via NUXT_PUBLIC_METAPIXEL_DEFAULT_ID
    },
  },
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
    display: "swap",
    families: {
      Karla: [400, 700],
      Rubik: [400, 700],
      "Covered By Your Grace": true,
    },
  },
  storyblok: {
    accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
  },
  i18n: {
    locales: [
      { code: "fr", language: "fr-FR", file: "fr.json" },
      { code: "en", language: "en-US", file: "en.json" },
    ],
    defaultLocale: "fr",
    strategy: "prefix_except_default",
    langDir: "locales",
  },
});
