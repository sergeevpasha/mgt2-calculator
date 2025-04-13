// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  nitro: {
    preset: 'static'
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-gtag'
  ],
  gtag: {
    id: 'G-8TB235FLL2',
    config: {
      page_title: 'Mad Games Tycoon 2 Calculator',
      send_page_view: true
    }
  },
  compatibilityDate: '2025-04-10',
  runtimeConfig: {
    public: {
      openaiApiKey: process.env.OPENAI_API_KEY,
    },
  },
  app: {
    head: {
      title: 'Mad Games Tycoon 2 Calculator',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A calculator and helper tool for Mad Games Tycoon 2' },
        { name: 'theme-color', content: '#1a1f24' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/icons/favicon-48x48.png' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/icons/favicon-96x96.png' },
        { rel: 'icon', type: 'image/png', sizes: '144x144', href: '/icons/favicon-144x144.png' },
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icons/favicon-192x192.png' },
        { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/icons/favicon-512x512.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/favicon-192x192.png' },
        { rel: 'manifest', href: '/manifest.json' },
      ],
    },
  },
});
