export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname
  const isBadge = path.startsWith('/api/badge/')
  const host = getRequestHeader(event, 'host') || ''
  const isLocalhost = host.startsWith('localhost') || host.startsWith('127.0.0.1')

  setResponseHeaders(event, {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': isBadge ? 'ALLOWALL' : 'DENY',
    'X-XSS-Protection': '0',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    // 'unsafe-inline' required for Nuxt SSR hydration scripts and styles
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://registry.npmjs.org https://api.npmjs.org https://repo.packagist.org https://packagist.org",
  })

  if (!isLocalhost) {
    setResponseHeader(event, 'Strict-Transport-Security', 'max-age=31536000; includeSubDomains')
  }

  if (isBadge) {
    setResponseHeader(event, 'Access-Control-Allow-Origin', '*')
  }
})
