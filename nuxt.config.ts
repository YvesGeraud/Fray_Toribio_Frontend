export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@nuxt/eslint'],
  css: ['~/assets/css/main.css'],

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api',
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: 'es-MX' },
      title: 'Colegio Fray Toribio de Benavente | Secundaria General',
      meta: [
        { name: 'description', content: 'Conoce el Colegio Fray Toribio de Benavente en Xicohtzinco, Tlaxcala. Secundaria General, vida escolar e información de admisiones. CCT 29PES0084Y.' },
        { name: 'theme-color', content: '#174789' },
      ],
    },
  },
  nitro: {
    publicAssets: [
      {
        dir: 'public',
        maxAge: 0,
      },
    ],
    routeRules: {
      '/**': {
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Strict-Transport-Security': 'max-age=63072000',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
        },
      },
    },
  },
})
