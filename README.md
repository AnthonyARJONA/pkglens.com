# pkglens

**See inside any package.** Bundle size, dependencies, vulnerabilities, license & health — all in one view.

pkglens aggregates data from multiple sources into a single, clean dashboard for any package. Think of it as a "credit score" for open-source packages: one page tells you everything you need to know before adding a dependency.

## Why pkglens exists

The information about a package is scattered across dozens of sites. To evaluate a dependency, you currently need to check:

- **npm** for versions, downloads, dependencies
- **Bundlephobia** for bundle impact
- **Snyk / OSV** for vulnerabilities
- **GitHub** for maintenance health, stars, issues
- **License files** for legal compatibility

pkglens brings it all together in one place, with computed scores and curated alternatives — so you can make informed decisions in seconds, not minutes.

## What it shows

| Section | Data | Source |
|---------|------|--------|
| **Bundle Size** | Minified, gzipped, install size, dependency composition | Bundlephobia |
| **Dependencies** | Direct deps, peer deps, dependency tree | npm registry |
| **Security** | CVE, GHSA, severity, fixed versions (filtered by current version) | OSV.dev |
| **License** | License type, permissions (commercial use, modification, etc.) | npm registry |
| **Health** | Last release, version count, stars, issues, forks | npm + GitHub |
| **Changelog** | Release notes, version tags (major/minor/patch), date | GitHub Releases |
| **Alternatives** | Curated list of real alternatives with downloads & size comparison | Curated + npm |
| **Scores** | Security, Performance, Health — computed from all data | pkglens |

## Supported ecosystems

| Ecosystem | Status | Registry |
|-----------|--------|----------|
| **npm** (JavaScript/TypeScript) | Available | registry.npmjs.org |
| **Packagist** (PHP/Composer) | Available | packagist.org |
| **PyPI** (Python) | Available | pypi.org |
| **Cargo** (Rust) | Planned | crates.io |
| **Go Modules** | Planned | proxy.golang.org |
| **RubyGems** (Ruby) | Planned | rubygems.org |
| **NuGet** (.NET) | Planned | nuget.org |

## Architecture

pkglens is a single Nuxt 4 app (Vue 3 + Nitro server) deployed on Cloudflare Pages, with Cloudflare D1 as the cache store.

```
app/                          Server:
├── core/        (pure TS)    server/
├── presenters/  (formatting) ├── ecosystems/         (npm, pypi, packagist)
├── composables/ (use cases)  ├── enrichers/          (GitHub, OSV)
├── gateway/     ($fetch)     ├── core/cache/         (D1 + SWR + lazy cleanup)
├── ui/          (components) ├── database/d1.ts      (binding accessor)
├── design/      (CSS tokens) └── plugins/            (cloudflare-bindings)
└── pages/       (routing)
```

**Frontend** follows clean architecture: `core` (pure logic) → `presenters` (formatting) → `composables` (use cases) → `gateway` (API calls) → `ui` (components with container/view split).

**Backend** uses a single aggregated endpoint (`GET /api/pkg?name=...&ecosystem=...`) that fetches from all sources in parallel, caches in D1 with per-source TTLs, and returns one JSON payload. The frontend makes **one request** per page.

### Key design decisions

- **D1 cache with stale-while-revalidate** — 100 users requesting "react" = 1 external API call. The other 99 are served from cache.
- **Lazy cache cleanup** — 1% of cache reads trigger a background delete of expired rows. No cron, no scheduled Worker — the request itself does the gardening.
- **Circuit breaker** — If an external API fails 3 times in 5 minutes, we stop calling it for 10 minutes and serve stale data.
- **Ecosystem-based server structure** — Adding a new ecosystem = one folder under `server/ecosystems/`, one resolver, one line of registration.
- **Container/View component split** — Views are pure (props only), testable in Storybook. Containers wire composables to views.
- **Curated alternatives** — Not keyword-based garbage. Hand-picked alternatives for 900+ popular packages across the three ecosystems.

## Getting started

```bash
# Install dependencies
pnpm install

# Apply D1 migrations to the local miniflare DB
pnpm db:migrate:local

# Start dev server (D1 binding wired via nitro-cloudflare-dev)
pnpm dev

# Open http://localhost:3000
```

### Environment variables

```bash
# Optional but recommended: GitHub token for higher rate limits (5000 req/h vs 60 req/h)
# Create one at https://github.com/settings/tokens — no scopes needed
GITHUB_TOKEN=ghp_...
```

Copy `.env.example` to `.env` and fill in your values.

### Deploy to Cloudflare Pages

```bash
wrangler login                            # one-time auth
wrangler d1 create pkglens                # copy database_id into wrangler.toml
pnpm db:migrate:remote                    # apply schema to remote D1
wrangler pages secret put GITHUB_TOKEN    # set the GitHub token as a secret
pnpm deploy                               # build + push to Cloudflare Pages
```

## Tech stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Nuxt 4 | SSR + server routes in one project |
| Frontend | Vue 3 | Composition API, reactive, lightweight |
| Server | Nitro (H3) on Cloudflare Workers | Edge runtime, global low latency |
| Cache | Cloudflare D1 | SQLite-compatible, zero infra, 5GB free |
| Hosting | Cloudflare Pages | Free tier, global CDN, SSL, atomic deploys |
| Styling | CSS custom properties | No dependency, design tokens centralized |
| Package manager | pnpm | Fast, strict, disk-efficient |

## API

### `GET /api/pkg?name=...&ecosystem=npm|pypi|packagist`

Returns aggregated data for a package. All external sources are fetched in parallel and cached in D1.

**Response:**

```json
{
  "meta": { "stale": false, "fetchedAt": "2026-04-05T13:19:43Z" },
  "registry": { "name": "zod", "latestVersion": "3.22.4", "license": "MIT", ... },
  "downloads": { "weekly": 8300000 },
  "bundle": { "size": 13400, "gzip": 4200, "dependencySizes": [...] },
  "vulnerabilities": [...],
  "github": { "stars": 28000, "forks": 980, "openIssues": 142, "repo": "colinhacks/zod" },
  "releases": [{ "tag": "v3.22.4", "body": "...", "publishedAt": "..." }],
  "alternatives": ["yup", "joi", "valibot", "arktype", "superstruct"],
  "scores": { "security": 95, "quality": 88, "popularity": 72, "overall": 86 }
}
```

### `GET /api/badge/:name?ecosystem=npm|pypi|packagist`

Returns an SVG badge with the composite score. Drop it in any README:

```markdown
![pkglens score](https://pkglens.com/api/badge/zod)
```

## Contributing

This project follows clean architecture principles. Before contributing, read `CLAUDE.md` for the full set of code rules and conventions.

## License

MIT
