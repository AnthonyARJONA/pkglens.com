// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  future: {
    compatibilityVersion: 4,
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'pkglens — see inside your packages',
      meta: [
        { name: 'description', content: 'Analyze any npm or Composer package in one view: bundle size, dependencies, vulnerabilities, license, maintenance health & alternatives.' },
        { name: 'theme-color', content: '#1a1b26' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'pkglens' },
        // Open Graph
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'pkglens' },
        { property: 'og:title', content: 'pkglens — see inside your packages' },
        { property: 'og:description', content: 'Analyze any npm or Composer package in one view: bundle size, dependencies, vulnerabilities, license, maintenance health & alternatives.' },
        { property: 'og:url', content: 'https://pkglens.com' },
        { property: 'og:image', content: 'https://pkglens.com/og-image.png' },
        { property: 'og:image:type', content: 'image/svg+xml' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:locale', content: 'en_US' },
        // Twitter Card
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'pkglens — see inside your packages' },
        { name: 'twitter:description', content: 'Analyze any npm or Composer package in one view: bundle size, dependencies, vulnerabilities, license, maintenance health & alternatives.' },
        { name: 'twitter:image', content: 'https://pkglens.com/og-image.png' },
      ],
      link: [
        { rel: 'canonical', href: 'https://pkglens.com' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap' },
      ],
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            'name': 'pkglens',
            'url': 'https://pkglens.com',
            'description': 'Analyze any npm or Composer package: bundle size, dependencies, vulnerabilities, license, maintenance health & alternatives.',
            'applicationCategory': 'DeveloperApplication',
            'operatingSystem': 'All',
            'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': 'USD' },
            'potentialAction': {
              '@type': 'SearchAction',
              'target': { '@type': 'EntryPoint', 'urlTemplate': 'https://pkglens.com/package/{search_term_string}' },
              'query-input': 'required name=search_term_string',
            },
          }),
        },
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

  nitro: {
    compressPublicAssets: true,
  },

  runtimeConfig: {
    githubToken: process.env.GITHUB_TOKEN || '',
    public: {
      siteUrl: 'https://pkglens.com',
    },
  },
})
