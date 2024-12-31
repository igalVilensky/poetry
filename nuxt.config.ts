// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    "@/assets/css/tailwind.css",
    "@fortawesome/fontawesome-free/css/all.min.css",
  ],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {}, // Include Tailwind as a PostCSS plugin
      autoprefixer: {}, // Include Autoprefixer for CSS
    },
  },
});
