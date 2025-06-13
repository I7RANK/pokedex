// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "nuxt-svgo-loader"],
  app: {
    head: {
      title: "Pokedex",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "https://res.cloudinary.com/dnmjkesyn/image/upload/q_auto:best/v1749764680/9114966f-19d1-4062-9c7a-f774007b2594.png",
        },
      ],
    },
  },
});
