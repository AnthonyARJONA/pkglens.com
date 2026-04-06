export default defineEventHandler((event) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#1a1b26"/>
  <text x="600" y="230" text-anchor="middle" font-family="system-ui,sans-serif" font-size="72" font-weight="800" letter-spacing="-2">
    <tspan fill="#7aa2f7">pkg</tspan><tspan fill="#8890b0" font-weight="500">lens</tspan>
  </text>
  <text x="600" y="290" text-anchor="middle" font-family="system-ui,sans-serif" font-size="24" fill="#8890b0">
    See inside any package
  </text>
  <text x="600" y="370" text-anchor="middle" font-family="system-ui,sans-serif" font-size="18" fill="#c0caf5">
    Bundle size · Dependencies · Vulnerabilities · License · Health
  </text>
  <text x="600" y="420" text-anchor="middle" font-family="system-ui,sans-serif" font-size="16" fill="#7aa2f7">
    npm &amp; Composer packages
  </text>
  <rect x="100" y="580" width="1000" height="3" rx="1.5" fill="#3a3b55"/>
  <text x="600" y="610" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" fill="#8890b0">
    pkglens.com
  </text>
</svg>`

  setResponseHeaders(event, {
    'Content-Type': 'image/svg+xml',
    'Cache-Control': 'public, max-age=86400',
  })

  return svg
})
