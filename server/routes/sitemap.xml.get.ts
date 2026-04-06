const POPULAR_PACKAGES = [
  'react', 'vue', 'angular', 'svelte', 'next', 'nuxt',
  'express', 'fastify', 'hono', 'koa',
  'lodash', 'axios', 'zod', 'prisma', 'drizzle-orm',
  'tailwindcss', 'typescript', 'eslint', 'prettier', 'vitest', 'jest',
  'react-router', 'react-hook-form', 'zustand', 'jotai',
  'webpack', 'vite', 'esbuild', 'rollup',
  'socket.io', 'mongoose', 'pg', 'redis', 'ioredis',
  'chalk', 'commander', 'dotenv', 'winston', 'pino',
  'laravel/framework', 'symfony/console', 'monolog/monolog',
  'guzzlehttp/guzzle', 'phpunit/phpunit', 'doctrine/orm',
]

const BASE_URL = 'https://pkglens.com'

export default defineEventHandler((event) => {
  const today = new Date().toISOString().split('T')[0]

  const staticPages = [
    { loc: '/', changefreq: 'daily', priority: '1.0' },
    { loc: '/scan', changefreq: 'weekly', priority: '0.7' },
  ]

  const packagePages = POPULAR_PACKAGES.map((name) => ({
    loc: `/package/${encodeURIComponent(name)}`,
    changefreq: 'daily',
    priority: '0.8',
  }))

  const urls = [...staticPages, ...packagePages]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>
    <loc>${BASE_URL}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`

  setResponseHeaders(event, {
    'Content-Type': 'application/xml',
    'Cache-Control': 'public, max-age=3600',
  })

  return xml
})
