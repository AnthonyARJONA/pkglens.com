// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  app: {
    head: {
      title: 'pkglens — see inside your packages',
      meta: [
        { name: 'description', content: 'Bundle size, dependencies, vulnerabilities, license & health — all in one view.' },
        { name: 'theme-color', content: '#1a1b26' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap' },
      ],
    },
  },

  css: [
    '~/design/tokens.css',
    '~/design/base.css',
    '~/design/utilities.css',
  ],

  components: [
    { path: '~/ui', pathPrefix: false, extensions: ['.vue'] },
  ],

  runtimeConfig: {
    githubToken: process.env.GITHUB_TOKEN || '',
  },
})
